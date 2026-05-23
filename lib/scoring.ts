import type { Track } from "./types";

/**
 * TrackFinderNYC Composite Score
 *
 * Five factors, each scored 0–10, combined into one composite (also 0–10).
 *
 *  Surface       25% — quality and type of running surface
 *  Accessibility 30% — how freely and reliably the public can use it
 *  Lanes         15% — width and capacity of the track
 *  Lighting      10% — evening usability
 *  Community     20% — sentiment derived from runner reviews
 */

export interface ScoreBreakdown {
  surface: number;
  accessibility: number;
  lanes: number;
  lighting: number;
  community: number;
  composite: number;
}

const WEIGHTS = {
  surface: 0.25,
  accessibility: 0.30,
  lanes: 0.15,
  lighting: 0.10,
  community: 0.20,
} as const;

function surfaceScore(track: Track): number {
  const s = (track.surface ?? "").toLowerCase();
  if (s.includes("mondo super x")) return 10;
  if (s.includes("mondo"))         return 9;
  if (s.includes("rubberized"))    return 8;
  if (s.includes("rubber"))        return 7.5;
  if (s.includes("synthetic"))     return 7;
  return 6;
}

function accessibilityScore(track: Track): number {
  if (track.publicAccessType === "closed") return 0;
  if (track.publicAccessType === "open")   return 10;

  // conditional — distinguish by cost and access certainty
  const cost = (track.cost ?? "").toLowerCase();
  if (cost.includes("$10"))  return 5; // pay-per-visit
  if (cost.includes("$25"))  return 7; // cheap annual membership

  // unconfirmed / informal community access
  if (track.tags.some((t) => t.includes("unconfirmed"))) return 4;

  // standard conditional (limited hours, free)
  return 6;
}

function lanesScore(track: Track): number {
  if (!track.lanes)      return 5;
  if (track.lanes >= 8)  return 10;
  if (track.lanes >= 6)  return 8;
  if (track.lanes >= 4)  return 6;
  return 4;
}

function lightingScore(track: Track): number {
  // Indoor tracks are inherently lit — no separate lighting field needed
  if (track.tags.some((t) => t.toLowerCase() === "indoor")) return 10;
  if (track.lighting === true)  return 10;
  if (track.lighting === null)  return 6;
  return 3;
}

function communityScore(track: Track): number {
  // Convert 0–5 stored rating to 0–10
  return track.rating * 2;
}

function round1(n: number) {
  return Math.round(n * 10) / 10;
}

export function computeScore(track: Track): ScoreBreakdown {
  const surface       = round1(surfaceScore(track));
  const accessibility = round1(accessibilityScore(track));
  const lanes         = round1(lanesScore(track));
  const lighting      = round1(lightingScore(track));
  const community     = round1(communityScore(track));

  const composite = round1(
    surface       * WEIGHTS.surface +
    accessibility * WEIGHTS.accessibility +
    lanes         * WEIGHTS.lanes +
    lighting      * WEIGHTS.lighting +
    community     * WEIGHTS.community
  );

  return { surface, accessibility, lanes, lighting, community, composite };
}

/** Returns a Tailwind-compatible hex colour for a 0–10 composite score */
export function scoreColor(score: number): string {
  if (score >= 8.5) return "#1D9E75";  // teal — excellent
  if (score >= 7.0) return "#0891b2";  // cyan — good
  if (score >= 5.5) return "#d97706";  // amber — fair
  return "#dc2626";                     // red — limited
}
