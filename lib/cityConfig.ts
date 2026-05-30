import type { Track } from "./types";
import { MOCK_TRACKS } from "./mockData";
import { BOSTON_TRACKS } from "./bostonMockData";
import { PHILLY_TRACKS } from "./phillyMockData";
import { DC_TRACKS } from "./dcMockData";

export interface CityConfig {
  city: string;
  displayName: string;       // "New York City" | "Boston"
  siteName: string;          // "TrackFinderNYC" | "TrackFinderBoston"
  siteUrl: string;           // canonical base URL for this city's deployment
  mapCenter: [number, number]; // [lat, lon]
  mapZoom: number;
  mapBounds: [[number, number], [number, number]]; // [[swLat, swLon], [neLat, neLon]]
  minZoom: number;
  tracks: Track[];
  neighborhoods: string[];   // borough / municipality names used for filtering
  metaTitle: string;
  metaDescription: string;
  ogDescription: string;
  twitterDescription: string;
  keywords: string[];
}

const CITY_CONFIGS: Record<string, CityConfig> = {
  landing: {
    city: "landing",
    displayName: "TrackFinder",
    siteName: "TrackFinder",
    siteUrl: "https://www.trackfindernyc.com",
    mapCenter: [40.7128, -74.006],
    mapZoom: 12,
    mapBounds: [[40.477, -74.259], [40.917, -73.700]],
    minZoom: 10,
    tracks: [],
    neighborhoods: [],
    metaTitle: "TrackFinder – Find Public Running Tracks",
    metaDescription:
      "Find every public running track in New York City and Boston. Filter by surface, lighting, lanes, and public access hours. Free, no sign-up required.",
    ogDescription:
      "Find public running tracks in NYC and Boston. Surface, lighting, lane counts, and access hours for every outdoor track.",
    twitterDescription:
      "Find public running tracks in NYC and Boston.",
    keywords: [
      "public running track",
      "outdoor running track",
      "find running track",
      "running track NYC",
      "running track Boston",
      "400m track",
      "free running track",
    ],
  },
  nyc: {
    city: "nyc",
    displayName: "New York City",
    siteName: "TrackFinderNYC",
    siteUrl: "https://www.trackfindernyc.com",
    mapCenter: [40.7128, -74.006],
    mapZoom: 12,
    mapBounds: [[40.477, -74.259], [40.917, -73.700]],
    minZoom: 10,
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
  philadelphia: {
    city: "philadelphia",
    displayName: "Philadelphia",
    siteName: "TrackFinderPhilly",
    siteUrl: "https://philly.trackfindernyc.com",
    mapCenter: [40.0, -75.16],
    mapZoom: 12,
    mapBounds: [[39.87, -75.40], [40.14, -74.90]],
    minZoom: 10,
    tracks: PHILLY_TRACKS,
    neighborhoods: [
      "South Philadelphia", "North Philadelphia", "West Philadelphia",
      "Northwest Philadelphia", "Northeast Philadelphia",
      "Germantown", "Roxborough", "Chestnut Hill", "Wynnefield",
      "University City", "Lower Merion", "Abington",
      "Cheltenham", "Delaware County", "Cherry Hill", "Bensalem",
      "East Falls", "Fox Chase", "Olney",
      "Camden", "Gloucester City",
    ],
    metaTitle: "TrackFinderPhilly – Find Public Running Tracks in Philadelphia",
    metaDescription:
      "Find every public running track in Philadelphia and the surrounding area. Browse 25+ tracks across South Philly, North Philly, Germantown, Roxborough, University City, Lower Merion, Cherry Hill, and beyond. Filter by surface, lighting, and access hours.",
    ogDescription:
      "Find every public running track in the Philadelphia metro area. 25+ tracks across Philly, Lower Merion, Cheltenham, Ridley, Cherry Hill NJ, Bensalem, and beyond with surface, lighting, and access hours.",
    twitterDescription:
      "Find every public running track in Philadelphia and the surrounding metro area.",
    keywords: [
      "running track Philadelphia",
      "public running track Philly",
      "Philadelphia track and field",
      "outdoor running track West Philadelphia",
      "running track Germantown",
      "running track Roxborough",
      "running track Lower Merion",
      "running track Abington",
      "400m track Philadelphia",
      "free running track Philadelphia",
      "Penn Relays track",
    ],
  },
  boston: {
    city: "boston",
    displayName: "Boston",
    siteName: "TrackFinderBoston",
    siteUrl: "https://boston.trackfindernyc.com",
    mapCenter: [42.3601, -71.0589],
    mapZoom: 13,
    mapBounds: [[42.20, -71.25], [42.50, -70.88]],
    minZoom: 11,
    tracks: BOSTON_TRACKS,
    neighborhoods: [
      "Cambridge", "Somerville", "Brookline",
      "South Boston", "East Boston", "Charlestown", "Roxbury",
      "Jamaica Plain", "Dorchester", "Fenway", "Allston", "Brighton",
      "Hyde Park", "Mattapan", "Roslindale", "West Roxbury",
      "Medford", "Quincy", "Watertown", "Revere", "Malden",
      "Dedham", "Needham", "Belmont", "Milton", "Braintree",
      "Boston",
    ],
    metaTitle: "TrackFinderBoston – Find Public Running Tracks in Boston",
    metaDescription:
      "Find every public running track in Boston and the surrounding area. Browse 24+ tracks across Boston, Cambridge, Somerville, Brookline, Quincy, Milton, Dedham, Needham, and beyond. Filter by surface, lighting, and access hours.",
    ogDescription:
      "Find every public running track in the Boston metro area. 24+ tracks across Boston, Cambridge, Somerville, Brookline, and beyond with surface, lighting, and access hours.",
    twitterDescription:
      "Find every public running track in Boston and the surrounding metro area.",
    keywords: [
      "running track Boston",
      "public running track Boston",
      "Boston track and field",
      "outdoor running track Cambridge",
      "running track Somerville",
      "running track Brookline",
      "running track Quincy",
      "running track Medford",
      "running track Malden",
      "running track Revere",
      "400m track Boston",
      "free running track Boston",
    ],
  },
  dc: {
    city: "dc",
    displayName: "Washington DC",
    siteName: "TrackFinderDC",
    siteUrl: "https://dc.trackfindernyc.com",
    mapCenter: [38.9072, -77.0369],
    mapZoom: 12,
    mapBounds: [[38.74, -77.27], [39.08, -76.85]],
    minZoom: 10,
    tracks: DC_TRACKS,
    neighborhoods: [
      "Georgetown", "Columbia Heights", "Shaw", "Petworth",
      "Bloomingdale", "Tenleytown", "Friendship Heights",
      "Northeast DC", "Southeast DC", "Anacostia", "Congress Heights",
      "Ivy City", "Kingman Park", "Fort Totten", "Eckington",
      "Arlington", "Alexandria", "McLean", "Falls Church", "Annandale",
      "Bethesda", "Silver Spring", "Takoma Park",
      "Prince George's County", "Oxon Hill", "Fairmont Heights", "Bladensburg",
    ],
    metaTitle: "TrackFinderDC – Find Public Running Tracks in Washington DC",
    metaDescription:
      "Find every public running track in Washington DC and the metro area. Browse 46+ tracks across DC, Arlington, Alexandria, McLean, Falls Church, Bethesda, Silver Spring, and beyond. Filter by surface, lighting, and access hours.",
    ogDescription:
      "Find every public running track in the DC metro area. 46+ tracks across DC, Arlington, Alexandria, and Maryland/Virginia suburbs with surface, lighting, and access hours.",
    twitterDescription:
      "Find every public running track in Washington DC and the surrounding metro area.",
    keywords: [
      "running track Washington DC",
      "public running track DC",
      "DC track and field",
      "outdoor running track Arlington",
      "running track Alexandria",
      "running track Bethesda",
      "running track Silver Spring",
      "running track Rockville",
      "400m track Washington DC",
      "free running track DC",
      "DPR track DC",
    ],
  },
};

export function getCityConfig(): CityConfig {
  const city = process.env.NEXT_PUBLIC_CITY ?? "landing";
  return CITY_CONFIGS[city] ?? CITY_CONFIGS["landing"];
}

export function getTrackById(id: string): Track | undefined {
  return getCityConfig().tracks.find((t) => t.id === id);
}
