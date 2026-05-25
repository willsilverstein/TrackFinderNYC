"use client";

import dynamic from "next/dynamic";
import { useEffect, useMemo, useState } from "react";
import TrackCard from "@/components/TrackCard";
import { useTheme } from "@/components/ThemeProvider";
import { getCityConfig } from "@/lib/cityConfig";
import { computeScore } from "@/lib/scoring";
import type { Track } from "@/lib/types";

// Leaflet must never run on the server
const TrackMap = dynamic(() => import("@/components/TrackMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-800">
      <div className="flex flex-col items-center gap-3 text-gray-500 dark:text-gray-400">
        <div className="w-8 h-8 border-2 border-[#1D9E75] border-t-transparent rounded-full animate-spin" />
        <span className="text-sm">Loading map…</span>
      </div>
    </div>
  ),
});

const cityConfig = getCityConfig();
const DEFAULT_CENTER: [number, number] = cityConfig.mapCenter;

type GeoState = "idle" | "requesting" | "granted" | "denied";
type AccessFilter = "all" | "open" | "conditional" | "closed";
type SortBy = "distance" | "rating" | "name" | "borough";

const BOROUGH_ORDER: Record<string, number> = {
  Bronx: 0,
  Brooklyn: 1,
  Manhattan: 2,
  Queens: 3,
  "Staten Island": 4,
};

function getBorough(tags: string[]): string {
  const boroughs = ["Bronx", "Brooklyn", "Manhattan", "Queens", "Staten Island"];
  // 1. Exact borough tag match
  for (const b of boroughs) {
    if (tags.some((t) => t === b)) return b;
  }
  // 2. Substring match — catches "South Bronx", "SE Queens", "West Brooklyn", etc.
  const joined = " " + tags.join(" ") + " ";
  for (const b of boroughs) {
    if (joined.includes(b)) return b;
  }
  // 3. Manhattan neighbourhood fallback for tags that use no borough name at all
  const manhattanNeighbourhoods = [
    "lower east side", "les", "harlem", "inwood", "washington heights",
    "east harlem", "randalls island", "upper west side", "upper east side",
    "midtown", "tribeca", "soho", "financial district",
    "battery park", "hell's kitchen", "morningside", "two bridges",
    "nolita", "noho", "gramercy", "murray hill", "kips bay",
  ];
  const lower = tags.map((t) => t.toLowerCase());
  if (manhattanNeighbourhoods.some((n) => lower.some((t) => t.includes(n)))) return "Manhattan";
  return "Unknown";
}

function haversineMi(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 3958.8;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

// Reverse geocode using Nominatim (free, no API key)
async function reverseGeocode(lat: number, lon: number): Promise<string> {
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=10`,
      { headers: { "Accept-Language": "en" } }
    );
    const data = await res.json();
    const addr = data.address ?? {};
    // Prefer neighbourhood → suburb → city → town → county
    return (
      addr.neighbourhood ??
      addr.suburb ??
      addr.city ??
      addr.town ??
      addr.county ??
      "Unknown location"
    );
  } catch {
    return "Unknown location";
  }
}

const FILTER_OPTIONS: { value: AccessFilter; label: string; color: string; dot: string }[] = [
  { value: "all",         label: "All",        color: "#6b7280", dot: "#9ca3af" },
  { value: "open",        label: "Open",       color: "#15803d", dot: "#1D9E75" },
  { value: "conditional", label: "Restricted", color: "#92400e", dot: "#f59e0b" },
  { value: "closed",      label: "Closed",     color: "#991b1b", dot: "#ef4444" },
];

export default function MapPage() {
  const { theme, toggle } = useTheme();
  const isDark = theme === "dark";

  const [center, setCenter] = useState<[number, number]>(DEFAULT_CENTER);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [geoState, setGeoState] = useState<GeoState>("idle");
  const [locationLabel, setLocationLabel] = useState<string>(cityConfig.displayName);
  const [tracks] = useState<Track[]>(cityConfig.tracks);
  const [activeTrackId, setActiveTrackId] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth >= 768 : true
  );
  const [accessFilter, setAccessFilter] = useState<AccessFilter>("all");
  const [sortBy, setSortBy] = useState<SortBy>("distance");

  // Request geolocation, then reverse-geocode the result
  useEffect(() => {
    if (!navigator.geolocation) { setGeoState("denied"); return; }
    setGeoState("requesting");
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;
        setCenter([lat, lon]);
        setUserLocation([lat, lon]);
        setGeoState("granted");
        const label = await reverseGeocode(lat, lon);
        setLocationLabel(label);
      },
      () => {
        setGeoState("denied");
        setLocationLabel("NYC area");
      },
      { timeout: 10_000, maximumAge: 60_000 }
    );
  }, []);

  const displayTracks = useMemo(() => {
    let list = tracks.map((t) => ({
      track: t,
      distanceMi: haversineMi(center[0], center[1], t.lat, t.lon),
    }));

    if (accessFilter !== "all") {
      list = list.filter(({ track }) => track.publicAccessType === accessFilter);
    }

    list.sort((a, b) => {
      if (sortBy === "distance") return a.distanceMi - b.distanceMi;
      if (sortBy === "rating")   return computeScore(b.track).composite - computeScore(a.track).composite;
      if (sortBy === "borough") {
        const bA = getBorough(a.track.tags);
        const bB = getBorough(b.track.tags);
        const diff = (BOROUGH_ORDER[bA] ?? 99) - (BOROUGH_ORDER[bB] ?? 99);
        if (diff !== 0) return diff;
        return a.distanceMi - b.distanceMi; // tiebreak by distance within borough
      }
      return a.track.name.localeCompare(b.track.name);
    });

    return list;
  }, [tracks, center, accessFilter, sortBy]);

  const counts = useMemo(() => ({
    all:         tracks.length,
    open:        tracks.filter((t) => t.publicAccessType === "open").length,
    conditional: tracks.filter((t) => t.publicAccessType === "conditional").length,
    closed:      tracks.filter((t) => t.publicAccessType === "closed").length,
  }), [tracks]);

  return (
    <div className="flex flex-col h-screen h-[100dvh] overflow-hidden bg-white dark:bg-gray-900">
      {/* ── Header ── */}
      <header className="flex-shrink-0 h-14 flex items-center justify-between px-4 border-b border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-900 z-10">
        <div className="flex items-center gap-2">
          <svg className="w-7 h-7" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Green rounded-square background */}
            <rect width="28" height="28" rx="6" fill="#1D9E75" />
            {/* Track oval — stadium shape centered slightly left/up */}
            <rect x="2" y="5" width="19" height="10" rx="5" stroke="white" strokeWidth="2.2" fill="none" />
            {/* Magnifying glass lens — sits over the right portion of the track */}
            <circle cx="18" cy="17" r="6.5" stroke="white" strokeWidth="2.2" fill="#1D9E75" />
            {/* Inner ring of lens (gives depth, stays readable) */}
            <circle cx="18" cy="17" r="4.2" stroke="white" strokeWidth="1.4" strokeOpacity="0.45" fill="none" />
            {/* Magnifying glass handle — bottom-right */}
            <line x1="22.6" y1="21.6" x2="26" y2="25" stroke="white" strokeWidth="2.4" strokeLinecap="round" />
          </svg>
          <span className="font-bold text-gray-900 dark:text-white text-lg tracking-tight">TrackFinderNYC</span>
        </div>

        <div className="flex items-center gap-2">
          {geoState === "requesting" && (
            <span className="text-xs text-gray-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
              Locating…
            </span>
          )}
          {geoState === "granted" && (
            <span className="text-xs text-[#1D9E75] flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1D9E75]" />
              Location active
            </span>
          )}
          {geoState === "denied" && (
            <span className="text-xs text-gray-400 dark:text-gray-500 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-gray-300 dark:bg-gray-600" />
              Location off · NYC fallback
            </span>
          )}

          {/* Dark mode toggle */}
          <button
            onClick={toggle}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Toggle dark mode"
          >
            {isDark ? (
              // Sun icon
              <svg className="w-4 h-4 text-gray-400 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M17.657 17.657l-.707-.707M6.343 6.343l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
              </svg>
            ) : (
              // Moon icon
              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>

          <button
            onClick={() => setSidebarOpen((v) => !v)}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors md:hidden"
            aria-label="Toggle list"
          >
            <svg className="w-5 h-5 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d={sidebarOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>
      </header>

      {/* ── Body ── */}
      <div className="flex flex-1 overflow-hidden">
        {/* ── Map ── */}
        <div className="relative flex-1 min-w-0">
          <TrackMap
            tracks={displayTracks.map(({ track }) => track)}
            center={center}
            userLocation={userLocation}
            activeTrackId={activeTrackId}
            onTrackClick={(t) => setActiveTrackId(t.id)}
            darkMode={isDark}
            mapBounds={cityConfig.mapBounds}
            minZoom={cityConfig.minZoom}
          />
          {/* Dynamic location badge */}
          <div className="absolute top-3 right-3 z-10 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-medium text-gray-600 dark:text-gray-300 shadow">
            {geoState === "requesting" ? (
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                Locating…
              </span>
            ) : (
              locationLabel
            )}
          </div>
        </div>

        {/* ── Sidebar ── */}
        <aside
          className={`
            bg-white dark:bg-gray-900 border-l border-gray-100 dark:border-gray-700
            transition-all duration-300
            ${sidebarOpen ? "w-full md:w-80" : "w-0"}
            ${sidebarOpen ? "absolute inset-0 md:relative" : ""}
            md:block z-20 md:z-auto
          `}
          style={{
            height: "calc(100vh - 56px)",
            display: "flex",
            flexDirection: "column",
            flexShrink: 0,
            overflow: "hidden",
          }}
        >
          {/* Sidebar header */}
          <div style={{ flexShrink: 0 }} className="px-4 pt-3 pb-2 border-b border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <h2 className="font-semibold text-gray-900 dark:text-white text-sm">Nearby Tracks</h2>
                <span className="text-xs text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-gray-800 rounded-full px-2 py-0.5 font-medium">
                  {displayTracks.length}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-[10px] text-gray-400 dark:text-gray-500 uppercase tracking-wide">Sort</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortBy)}
                  className="text-xs text-gray-700 dark:text-gray-200 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded px-1.5 py-0.5 focus:outline-none focus:ring-1 focus:ring-[#1D9E75]"
                >
                  <option value="distance">Distance</option>
                  <option value="rating">Score</option>
                  <option value="name">A – Z</option>
                  <option value="borough">Borough</option>
                </select>
              </div>
              <button
                onClick={() => setSidebarOpen(false)}
                className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors md:hidden"
              >
                <svg className="w-4 h-4 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Filter pills */}
            <div className="flex gap-1.5 flex-wrap">
              {FILTER_OPTIONS.map(({ value, label, color, dot }) => {
                const count = value === "all" ? counts.all : counts[value as keyof typeof counts];
                const isActive = accessFilter === value;
                return (
                  <button
                    key={value}
                    onClick={() => setAccessFilter(value)}
                    className="flex items-center gap-1 px-2 py-1 rounded-full text-[11px] font-medium border transition-all"
                    style={
                      isActive
                        ? { backgroundColor: color, color: "#fff", borderColor: color }
                        : {
                            backgroundColor: isDark ? "#1f2937" : "#fff",
                            color: isDark ? "#9ca3af" : "#6b7280",
                            borderColor: isDark ? "#374151" : "#e5e7eb",
                          }
                    }
                  >
                    <span className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                      style={{ backgroundColor: isActive ? "#fff" : dot }} />
                    {label}
                    <span className="ml-0.5 text-[10px]" style={{ opacity: isActive ? 0.8 : 1 }}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Track list */}
          <div className="sidebar-scroll" style={{ flex: "1 1 0px", minHeight: 0, overflowY: "auto" }}>
            {displayTracks.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full gap-3 text-gray-400 dark:text-gray-600 py-16">
                <svg className="w-10 h-10 text-gray-200 dark:text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                    d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
                <p className="text-sm">No tracks match this filter.</p>
              </div>
            ) : sortBy === "borough" ? (
              (() => {
                let lastBorough = "";
                return displayTracks.map(({ track, distanceMi }) => {
                  const borough = getBorough(track.tags);
                  const showHeader = borough !== lastBorough;
                  lastBorough = borough;
                  return (
                    <div key={track.id}>
                      {showHeader && (
                        <div className="sticky top-0 z-10 px-4 py-1.5 bg-gray-50 dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700">
                          <span className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">
                            {borough}
                          </span>
                        </div>
                      )}
                      <TrackCard
                        track={track}
                        isActive={track.id === activeTrackId}
                        distanceMi={distanceMi}
                        onClick={() => {
                          setActiveTrackId(track.id);
                          setSidebarOpen(false);
                        }}
                      />
                    </div>
                  );
                });
              })()
            ) : (
              displayTracks.map(({ track, distanceMi }) => (
                <TrackCard
                  key={track.id}
                  track={track}
                  isActive={track.id === activeTrackId}
                  distanceMi={distanceMi}
                  onClick={() => {
                    setActiveTrackId(track.id);
                    setSidebarOpen(false);
                  }}
                />
              ))
            )}
          </div>

          {/* Footer */}
          <div style={{ flexShrink: 0 }} className="px-4 py-2.5 border-t border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
            <p className="text-[11px] text-gray-400 dark:text-gray-500 text-center">
              Track data © OpenStreetMap contributors
            </p>
          </div>
        </aside>

        {/* Mobile FAB */}
        {!sidebarOpen && (
          <button
            onClick={() => setSidebarOpen(true)}
            className="md:hidden absolute bottom-6 right-4 z-20 flex items-center gap-2 bg-[#1D9E75] text-white text-sm font-semibold px-4 py-2.5 rounded-full shadow-lg"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            {tracks.length} tracks
          </button>
        )}
      </div>
    </div>
  );
}
