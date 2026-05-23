"use client";

import { useEffect, useRef } from "react";
import type { Track } from "@/lib/types";

const TILE_LIGHT =
  "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const TILE_DARK =
  "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png";
const ATTR_LIGHT =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const ATTR_DARK =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/">CARTO</a>';

interface TrackMapProps {
  tracks: Track[];
  center: [number, number];
  activeTrackId?: string | null;
  onTrackClick?: (track: Track) => void;
  darkMode?: boolean;
}

export default function TrackMap({
  tracks,
  center,
  activeTrackId,
  onTrackClick,
  darkMode = false,
}: TrackMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const leafletMap = useRef<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const tileLayerRef = useRef<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const markersRef = useRef<Map<string, any>>(new Map());

  // Initialise the map once
  useEffect(() => {
    if (!mapRef.current || leafletMap.current) return;

    import("leaflet").then((L) => {
      if (!mapRef.current || leafletMap.current) return;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if ((mapRef.current as any)._leaflet_id) return;

      // Fix default icon paths broken by webpack
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        iconUrl:       "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        shadowUrl:     "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      });

      const map = L.map(mapRef.current, { center, zoom: 12, zoomControl: false });
      L.control.zoom({ position: "bottomright" }).addTo(map);

      const tile = L.tileLayer(darkMode ? TILE_DARK : TILE_LIGHT, {
        attribution: darkMode ? ATTR_DARK : ATTR_LIGHT,
        maxZoom: 19,
      });
      tile.addTo(map);
      tileLayerRef.current = tile;

      // User location dot
      const userIcon = L.divIcon({
        className: "",
        html: `<div style="
          width:14px;height:14px;
          background:#3b82f6;
          border:3px solid #fff;
          border-radius:50%;
          box-shadow:0 2px 6px rgba(0,0,0,0.4);
        "></div>`,
        iconSize: [14, 14],
        iconAnchor: [7, 7],
      });
      L.marker(center, { icon: userIcon }).addTo(map).bindPopup("<b>You are here</b>");

      leafletMap.current = map;
      addMarkers(L, map, tracks);
    });

    return () => {
      if (leafletMap.current) {
        leafletMap.current.remove();
        leafletMap.current = null;
        tileLayerRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Swap tile layer when darkMode changes
  useEffect(() => {
    if (!leafletMap.current || !tileLayerRef.current) return;
    import("leaflet").then((L) => {
      tileLayerRef.current.remove();
      const tile = L.tileLayer(darkMode ? TILE_DARK : TILE_LIGHT, {
        attribution: darkMode ? ATTR_DARK : ATTR_LIGHT,
        maxZoom: 19,
      });
      tile.addTo(leafletMap.current);
      tileLayerRef.current = tile;
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [darkMode]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function addMarkers(L: any, map: any, tracks: Track[]) {
    markersRef.current.forEach((m) => m.remove());
    markersRef.current.clear();

    tracks.forEach((track) => {
      const pinColor =
        track.publicAccessType === "conditional" ? "#d97706"
        : track.publicAccessType === "closed"    ? "#dc2626"
        : "#1D9E75";

      const borderColor = darkMode ? "#1f2937" : "#fff";

      const trackIcon = L.divIcon({
        className: "",
        html: `<div style="
          width:18px;height:18px;
          background:${pinColor};
          border:3px solid ${borderColor};
          border-radius:50%;
          box-shadow:0 2px 8px rgba(0,0,0,0.35);
          cursor:pointer;
        " title="${track.name}"></div>`,
        iconSize: [18, 18],
        iconAnchor: [9, 9],
      });

      const popupBg    = darkMode ? "#1f2937" : "#fff";
      const popupText  = darkMode ? "#f9fafb" : "#111827";
      const popupMuted = darkMode ? "#9ca3af" : "#6b7280";

      const marker = L.marker([track.lat, track.lon], { icon: trackIcon })
        .addTo(map)
        .bindPopup(
          `<div style="min-width:140px;background:${popupBg};border-radius:6px;padding:2px 0">
            <p style="font-weight:600;margin:0 0 4px;color:${popupText}">${track.name}</p>
            <p style="font-size:12px;color:${popupMuted};margin:0">${track.surface} · ${track.lanes ? track.lanes + " lanes" : "no lane info"}</p>
            <a href="/track/${track.id}" style="display:inline-block;margin-top:8px;font-size:12px;color:#1D9E75;font-weight:500;">View details →</a>
          </div>`,
          { maxWidth: 200 }
        );

      marker.on("click", () => onTrackClick?.(track));
      markersRef.current.set(track.id, marker);
    });
  }

  // Re-add markers when tracks change
  useEffect(() => {
    if (!leafletMap.current) return;
    import("leaflet").then((L) => addMarkers(L, leafletMap.current, tracks));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tracks, darkMode]);

  // Pan to active track
  useEffect(() => {
    if (!leafletMap.current || !activeTrackId) return;
    const activeTrack = tracks.find((t) => t.id === activeTrackId);
    if (activeTrack) {
      leafletMap.current.panTo([activeTrack.lat, activeTrack.lon], { animate: true });
      const marker = markersRef.current.get(activeTrackId);
      if (marker) marker.openPopup();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTrackId]);

  return <div ref={mapRef} className="w-full h-full" />;
}
