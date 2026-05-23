import type { Track } from "./types";

const OVERPASS_URL = "https://overpass-api.de/api/interpreter";

interface OverpassElement {
  type: "node" | "way" | "relation";
  id: number;
  lat?: number;
  lon?: number;
  center?: { lat: number; lon: number };
  tags?: Record<string, string>;
}

interface OverpassResponse {
  elements: OverpassElement[];
}

/** Build the Overpass QL query for leisure=track within `radiusM` metres */
function buildQuery(lat: number, lon: number, radiusM = 5000): string {
  return `[out:json][timeout:25];
(
  node["leisure"="track"](around:${radiusM},${lat},${lon});
  way["leisure"="track"](around:${radiusM},${lat},${lon});
  relation["leisure"="track"](around:${radiusM},${lat},${lon});
);
out center tags;`;
}

/** Haversine distance in km */
function haversine(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function parseSurface(raw?: string): string {
  if (!raw) return "Unknown";
  const map: Record<string, string> = {
    tartan: "Tartan",
    rubber: "Rubber",
    synthetic: "Synthetic",
    asphalt: "Asphalt",
    gravel: "Gravel",
    cinder: "Cinder",
    grass: "Grass",
    clay: "Clay",
    dirt: "Dirt",
  };
  return map[raw.toLowerCase()] ?? raw;
}

function elementToTrack(
  el: OverpassElement,
  userLat: number,
  userLon: number
): Track | null {
  const lat = el.lat ?? el.center?.lat;
  const lon = el.lon ?? el.center?.lon;
  if (lat == null || lon == null) return null;

  const tags = el.tags ?? {};
  const name =
    tags.name ??
    tags["name:en"] ??
    `Track #${el.id.toString().slice(-4)}`;

  const lanesRaw = tags.lanes ? parseInt(tags.lanes, 10) : null;

  const autoTags: string[] = [];
  if (tags.surface) autoTags.push(parseSurface(tags.surface));
  if (lanesRaw) autoTags.push(`${lanesRaw}-lane`);
  if (tags.lit === "yes" || tags.lighting === "yes") autoTags.push("floodlit");
  if (tags.access === "public" || tags.access === "yes")
    autoTags.push("public");
  if (tags["surface:condition"] === "good") autoTags.push("good surface");

  const accessType = tags.access === "private" ? "closed"
    : tags.fee === "yes" ? "conditional"
    : "open";

  return {
    id: `osm-${el.type}-${el.id}`,
    name,
    lat,
    lon,
    distance: Math.round(haversine(userLat, userLon, lat, lon) * 10) / 10,
    rating: 0,
    reviewCount: 0,
    reviewSummary: "",
    surface: parseSurface(tags.surface),
    lanes: lanesRaw,
    lighting: tags.lit === "yes" || tags.lighting === "yes" || null,
    hours: tags.opening_hours ?? null,
    publicHours: tags.opening_hours ?? null,
    publicAccessType: accessType,
    access: tags.access ?? "public",
    cost: tags.fee === "yes" ? tags.charge ?? "Paid" : "Free",
    tags: autoTags,
    osmId: el.id,
    osmType: el.type,
  };
}

/**
 * Fetch tracks near [lat, lon] from the Overpass API.
 * Falls back gracefully (returns []) on network error or timeout.
 */
export async function fetchNearbyTracks(
  lat: number,
  lon: number,
  radiusM = 5000
): Promise<Track[]> {
  try {
    const query = buildQuery(lat, lon, radiusM);
    const res = await fetch(OVERPASS_URL, {
      method: "POST",
      body: `data=${encodeURIComponent(query)}`,
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      signal: AbortSignal.timeout(30_000),
    });
    if (!res.ok) throw new Error(`Overpass HTTP ${res.status}`);
    const data: OverpassResponse = await res.json();
    return data.elements
      .map((el) => elementToTrack(el, lat, lon))
      .filter((t): t is Track => t !== null)
      .sort((a, b) => (a.distance ?? 0) - (b.distance ?? 0));
  } catch (err) {
    console.warn("[overpass] fetch failed, returning empty:", err);
    return [];
  }
}
