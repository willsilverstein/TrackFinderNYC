import type { Track } from "./types";
import { MOCK_TRACKS } from "./mockData";
import { BOSTON_TRACKS } from "./bostonMockData";

export interface CityConfig {
  city: string;
  displayName: string;       // "New York City" | "Boston"
  siteName: string;          // "TrackFinderNYC" | "TrackFinderBoston"
  siteUrl: string;           // canonical base URL for this city's deployment
  mapCenter: [number, number]; // [lat, lon]
  mapZoom: number;
  tracks: Track[];
  neighborhoods: string[];   // borough / municipality names used for filtering
  metaTitle: string;
  metaDescription: string;
  ogDescription: string;
  twitterDescription: string;
  keywords: string[];
}

const CITY_CONFIGS: Record<string, CityConfig> = {
  nyc: {
    city: "nyc",
    displayName: "New York City",
    siteName: "TrackFinderNYC",
    siteUrl: "https://www.trackfindernyc.com",
    mapCenter: [40.7128, -74.006],
    mapZoom: 12,
    tracks: MOCK_TRACKS,
    neighborhoods: ["Manhattan", "Brooklyn", "Queens", "Bronx", "Staten Island"],
    metaTitle: "TrackFinderNYC – Find Public Running Tracks in NYC",
    metaDescription:
      "Find every public running track in New York City. Browse 50+ tracks across Manhattan, Brooklyn, Queens, the Bronx, and Staten Island. Filter by surface, lighting, lanes, and public access hours.",
    ogDescription:
      "Find every public running track in New York City. 50+ tracks across all five boroughs with surface, lighting, lanes, and public access hours.",
    twitterDescription:
      "Find every public running track in New York City across all five boroughs.",
    keywords: [
      "running track NYC",
      "public running track New York",
      "NYC track and field",
      "outdoor running track Manhattan",
      "running track Brooklyn",
      "running track Queens",
      "running track Bronx",
      "400m track NYC",
      "free running track New York City",
    ],
  },
  boston: {
    city: "boston",
    displayName: "Boston",
    siteName: "TrackFinderBoston",
    siteUrl: "https://boston.trackfindernyc.com",
    mapCenter: [42.3601, -71.0589],
    mapZoom: 13,
    tracks: BOSTON_TRACKS,
    neighborhoods: [
      "Cambridge", "Somerville", "Brookline",
      "South Boston", "East Boston", "Charlestown", "Roxbury",
      "Jamaica Plain", "Dorchester", "Fenway", "Allston", "Brighton",
      "Hyde Park", "Mattapan", "Roslindale", "West Roxbury",
      "Boston",
    ],
    metaTitle: "TrackFinderBoston – Find Public Running Tracks in Boston",
    metaDescription:
      "Find every public running track in Boston and the surrounding area. Browse tracks across Boston, Cambridge, Somerville, and Brookline. Filter by surface, lighting, and public access hours.",
    ogDescription:
      "Find every public running track in Boston. Tracks across Boston, Cambridge, Somerville, and Brookline with surface, lighting, and access hours.",
    twitterDescription:
      "Find every public running track in Boston, Cambridge, Somerville, and Brookline.",
    keywords: [
      "running track Boston",
      "public running track Boston",
      "Boston track and field",
      "outdoor running track Cambridge",
      "running track Somerville",
      "running track Brookline",
      "400m track Boston",
      "free running track Boston",
    ],
  },
};

export function getCityConfig(): CityConfig {
  const city = process.env.NEXT_PUBLIC_CITY ?? "nyc";
  return CITY_CONFIGS[city] ?? CITY_CONFIGS["nyc"];
}

export function getTrackById(id: string): Track | undefined {
  return getCityConfig().tracks.find((t) => t.id === id);
}
