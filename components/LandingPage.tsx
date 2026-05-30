"use client";

import { useEffect, useState } from "react";
import { useTheme } from "@/components/ThemeProvider";

const CITIES = [
  {
    key: "nyc",
    name: "New York City",
    tagline: "All five boroughs",
    description: "50+ public running tracks across Manhattan, Brooklyn, Queens, the Bronx, and Staten Island.",
    trackCount: 50,
    url: "https://www.trackfindernyc.com",
    emoji: "🗽",
    neighborhoods: ["Manhattan", "Brooklyn", "Queens", "Bronx", "Staten Island"],
  },
  {
    key: "boston",
    name: "Boston",
    tagline: "Greater Boston metro",
    description: "24+ public running tracks across Boston, Cambridge, Somerville, Brookline, Quincy, Milton, Dedham, and beyond.",
    trackCount: 24,
    url: "https://boston.trackfindernyc.com",
    emoji: "🦞",
    neighborhoods: ["Cambridge", "Somerville", "Brookline", "Quincy", "Medford"],
  },
  {
    key: "philadelphia",
    name: "Philadelphia",
    tagline: "City & surrounding suburbs",
    description: "29+ public running tracks across South Philly, Germantown, University City, Lower Merion, Camden NJ, Cherry Hill NJ, and more.",
    trackCount: 29,
    url: "https://philly.trackfindernyc.com",
    emoji: "🔔",
    neighborhoods: ["South Philadelphia", "Germantown", "Roxborough", "University City", "Lower Merion"],
  },
  {
    key: "dc",
    name: "Washington DC",
    tagline: "DC & metro area",
    description: "46+ public running tracks across DC, Arlington, Alexandria, McLean, Falls Church, Bethesda, Silver Spring, and beyond — including DPR's premier Banneker Field.",
    trackCount: 46,
    url: "https://dc.trackfindernyc.com",
    emoji: "🏛️",
    neighborhoods: ["Shaw", "Georgetown", "Columbia Heights", "Arlington", "Bethesda"],
  },
];

export default function LandingPage() {
  const { theme, toggle } = useTheme();
  const isDark = theme === "dark";
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-950 transition-colors">
      {/* Nav */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-gray-800">
        <div className="flex items-center gap-2">
          <svg className="w-7 h-7" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="28" height="28" rx="6" fill="#1D9E75" />
            <rect x="2" y="5" width="19" height="10" rx="5" stroke="white" strokeWidth="2.2" fill="none" />
            <circle cx="18" cy="17" r="6.5" stroke="white" strokeWidth="2.2" fill="#1D9E75" />
            <circle cx="18" cy="17" r="4.2" stroke="white" strokeWidth="1.4" strokeOpacity="0.45" fill="none" />
            <line x1="22.6" y1="21.6" x2="26" y2="25" stroke="white" strokeWidth="2.4" strokeLinecap="round" />
          </svg>
          <span className="font-bold text-gray-900 dark:text-white text-lg tracking-tight">TrackFinder</span>
        </div>
        {mounted && (
          <button
            onClick={toggle}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Toggle dark mode"
          >
            {isDark ? (
              <svg className="w-4 h-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M17.657 17.657l-.707-.707M6.343 6.343l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
              </svg>
            ) : (
              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>
        )}
      </header>

      {/* Hero */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-16">
        <div className="max-w-2xl w-full text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight leading-tight mb-4">
            Find public running tracks{" "}
            <span className="text-[#1D9E75]">near you</span>
          </h1>
          <p className="text-lg text-gray-500 dark:text-gray-400 max-w-md mx-auto">
            Every outdoor running track in your city — surfaces, lighting, lane counts, and public access hours.
          </p>
        </div>

        {/* City cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-4xl w-full">
          {CITIES.map((city) => (
            <a
              key={city.key}
              href={city.url}
              className="group relative flex flex-col gap-4 p-6 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-[#1D9E75] hover:shadow-lg hover:shadow-emerald-900/10 transition-all duration-200 cursor-pointer"
            >
              {/* Top row */}
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-2xl mb-1">{city.emoji}</div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">{city.name}</h2>
                  <p className="text-xs text-[#1D9E75] font-semibold uppercase tracking-wide mt-0.5">{city.tagline}</p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-extrabold text-gray-900 dark:text-white tabular-nums">{city.trackCount}+</div>
                  <div className="text-xs text-gray-400 dark:text-gray-500">tracks</div>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{city.description}</p>

              {/* Neighborhood chips */}
              <div className="flex flex-wrap gap-1.5">
                {city.neighborhoods.map((n) => (
                  <span
                    key={n}
                    className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400"
                  >
                    {n}
                  </span>
                ))}
                <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                  + more
                </span>
              </div>

              {/* CTA */}
              <div className="flex items-center gap-1 text-[#1D9E75] text-sm font-semibold group-hover:gap-2 transition-all">
                Explore tracks
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </a>
          ))}
        </div>

        {/* Coming soon hint */}
        <p className="mt-10 text-sm text-gray-400 dark:text-gray-600">
          More cities coming soon — Chicago, LA, Seattle, and more.
        </p>
      </main>

      {/* Footer */}
      <footer className="px-6 py-4 border-t border-gray-100 dark:border-gray-800 text-center">
        <p className="text-xs text-gray-400 dark:text-gray-600">
          Track data © OpenStreetMap contributors · Built by runners, for runners
        </p>
      </footer>
    </div>
  );
}
