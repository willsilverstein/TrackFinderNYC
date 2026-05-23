"use client";

import Link from "next/link";
import { computeScore, scoreColor } from "@/lib/scoring";
import type { Track } from "@/lib/types";

interface TrackCardProps {
  track: Track;
  isActive?: boolean;
  onClick?: () => void;
  distanceMi?: number;
}

const ACCESS_CONFIG = {
  open: {
    pinColor: "#1D9E75",
    badgeBg: "#dcfce7",
    badgeText: "#15803d",
    borderColor: "#1D9E75",
    activeBg: "#f0fdf4",
    label: "Open",
  },
  conditional: {
    pinColor: "#d97706",
    badgeBg: "#fef3c7",
    badgeText: "#92400e",
    borderColor: "#f59e0b",
    activeBg: "#fffbeb",
    label: "Restricted",
  },
  closed: {
    pinColor: "#dc2626",
    badgeBg: "#fee2e2",
    badgeText: "#991b1b",
    borderColor: "#ef4444",
    activeBg: "#fef2f2",
    label: "Closed",
  },
};

export default function TrackCard({
  track,
  isActive = false,
  onClick,
  distanceMi,
}: TrackCardProps) {
  const cfg = ACCESS_CONFIG[track.publicAccessType] ?? ACCESS_CONFIG.open;
  const { composite } = computeScore(track);
  const color = scoreColor(composite);

  return (
    <Link href={`/track/${track.id}`} onClick={onClick}>
      <div
        className="group flex items-start gap-3 px-4 py-3 border-b border-gray-100 dark:border-gray-700 transition-colors cursor-pointer"
        style={
          isActive
            ? {
                backgroundColor: cfg.activeBg,
                borderLeft: `3px solid ${cfg.borderColor}`,
                paddingLeft: "13px",
              }
            : undefined
        }
        onMouseEnter={(e) => {
          if (!isActive) (e.currentTarget as HTMLDivElement).style.backgroundColor =
            document.documentElement.classList.contains("dark") ? "#1f2937" : "#f9fafb";
        }}
        onMouseLeave={(e) => {
          if (!isActive) (e.currentTarget as HTMLDivElement).style.backgroundColor = "";
        }}
      >
        {/* Color-coded map pin */}
        <div className="mt-0.5 flex-shrink-0">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-white"
            style={{ backgroundColor: cfg.pinColor }}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
        </div>

        <div className="flex-1 min-w-0">
          {/* Name + access badge */}
          <div className="flex items-start gap-2">
            <p className="font-semibold text-gray-900 dark:text-gray-100 text-sm leading-tight flex-1 min-w-0 truncate group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors">
              {track.name}
            </p>
            <span
              className="flex-shrink-0 text-[10px] font-semibold px-1.5 py-0.5 rounded-full leading-tight"
              style={{ backgroundColor: cfg.badgeBg, color: cfg.badgeText }}
            >
              {cfg.label}
            </span>
          </div>

          {/* Composite score + mini bar */}
          <div className="flex items-center gap-1.5 mt-1">
            <span className="text-xs font-bold tabular-nums" style={{ color }}>
              {composite.toFixed(1)}
            </span>
            <span className="text-[10px] text-gray-400 font-medium">/ 10</span>
            <div className="flex-1 h-1 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden max-w-[56px]">
              <div
                className="h-full rounded-full transition-all"
                style={{ width: `${composite * 10}%`, backgroundColor: color }}
              />
            </div>
          </div>

          {/* Distance + surface + lanes */}
          <div className="flex items-center gap-3 mt-1 text-xs text-gray-500 dark:text-gray-400">
            {distanceMi != null && (
              <span className="flex items-center gap-1">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                </svg>
                {distanceMi < 0.1 ? "< 0.1 mi" : `${distanceMi.toFixed(1)} mi`}
              </span>
            )}
            <span className="capitalize">{track.surface}</span>
            {track.lanes && <span>{track.lanes} lanes</span>}
          </div>

          {/* Tags */}
          {track.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {track.tags.slice(0, 3).map((tag) => (
                <span key={tag}
                  className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        <svg className="w-4 h-4 text-gray-300 flex-shrink-0 mt-1 group-hover:text-gray-400 transition-colors"
          fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </Link>
  );
}
