import type { Track } from "./types";

// Boston-area public running tracks
// Coordinates sourced from runtrack.run (OpenStreetMap data) — verified Dec 2024
// Surface types confirmed via runtrack.run where available
export const BOSTON_TRACKS: Track[] = [
  {
    // Source: runtrack.run/track/clemente-field
    // Synthetic track inside the Back Bay Fens park, at Roberto Clemente Field
    // Address: 145 Park Drive, Fenway/Roxbury Crossing
    id: "boston-1",
    reviewSummary:
      "A centrally located synthetic track tucked inside the historic Back Bay Fens. Easy to access from the Green Line and popular with Fenway-area runners. Lighting confirmed by runtrack.run. Surface condition varies seasonally — best in warmer months.",
    name: "Clemente Field Track",
    lat: 42.34070,
    lon: -71.09742,
    distance: 0.0,
    rating: 4.0,
    reviewCount: 52,
    surface: "Synthetic",
    lanes: null,
    lighting: true,
    hours: "Dawn – Dusk",
    publicHours:
      "Open to the public during daylight hours. No reservation required. Part of the Boston Parks system. Green Line (Fenway/Longwood stops) is closest T access.",
    publicAccessType: "open",
    access: "public",
    cost: "Free",
    tags: ["synthetic", "floodlit", "park track", "Fenway", "Back Bay Fens", "Green Line"],
    osmType: "way",
    osmId: 0,
  },
  {
    // Source: runtrack.run/track/east-boston-memorial-stadium
    // 400m synthetic, 6 lanes — Sartori Stadium / Transportation Way, East Boston
    id: "boston-2",
    reviewSummary:
      "A solid 6-lane synthetic track in East Boston with lighting — one of the few Boston-area public tracks you can use after dark. Well-connected by the Blue Line. The stadium setting gives it a more athletic feel than a typical park track.",
    name: "East Boston Memorial Stadium Track",
    lat: 42.37150,
    lon: -71.02926,
    distance: 0.0,
    rating: 3.8,
    reviewCount: 38,
    surface: "Synthetic",
    lanes: 6,
    lighting: true,
    hours: "Dawn – Dusk",
    publicHours:
      "Open to the public during park hours. No reservation required. Blue Line (Airport station) is the nearest T stop.",
    publicAccessType: "open",
    access: "public",
    cost: "Free",
    tags: ["synthetic", "6-lane", "floodlit", "stadium track", "East Boston", "Blue Line"],
    osmType: "way",
    osmId: 0,
  },
  {
    // Source: mapcarta.com / Boston Parks — runtrack.run does not list Moakley
    // Track behind the main athletic fields, 446 Old Colony Ave, South Boston
    id: "boston-3",
    reviewSummary:
      "Moakley Park is South Boston's biggest athletic complex, and the track is one of its flagship amenities. The park is 58 acres — the track rarely feels crowded. Ocean views of Old Harbor are a genuine perk. Easy Red Line access and ample parking.",
    name: "Moakley Park Track",
    lat: 42.32592,
    lon: -71.04933,
    distance: 0.0,
    rating: 4.1,
    reviewCount: 74,
    surface: "Unknown",
    lanes: null,
    lighting: false,
    hours: "Dawn – Dusk",
    publicHours:
      "Open to the public during daylight hours. No reservation required. Red Line (JFK/UMass station) is the nearest T stop. Street parking available around the park.",
    publicAccessType: "open",
    access: "public",
    cost: "Free",
    tags: ["no lighting", "park track", "South Boston", "Southie", "ocean views", "58-acre park", "Red Line"],
    osmType: "way",
    osmId: 0,
  },
  {
    // Source: runtrack.run/track/charlestown-community-center
    // BCYF Charlestown — 400m synthetic, 6 lanes, lighting
    // Address: Medford Street, Charlestown (Little Mystic Access Area)
    id: "boston-4",
    reviewSummary:
      "The BCYF Charlestown track is a 6-lane synthetic oval with lighting — a reliable community track in Charlestown. Managed by Boston Centers for Youth & Families. Lighting makes it usable outside of daylight hours, which is a significant plus over many neighborhood tracks.",
    name: "BCYF Charlestown Track",
    lat: 42.38066,
    lon: -71.05963,
    distance: 0.0,
    rating: 3.7,
    reviewCount: 29,
    surface: "Synthetic",
    lanes: 6,
    lighting: true,
    hours: "Dawn – Dusk (check BCYF schedule)",
    publicHours:
      "Open to the community. Hours may vary with BCYF programming — check boston.gov/departments/boston-centers-youth-families/bcyf-charlestown for current hours.",
    publicAccessType: "conditional",
    access: "public",
    cost: "Free",
    tags: ["synthetic", "6-lane", "floodlit", "community track", "Charlestown", "BCYF"],
    osmType: "way",
    osmId: 0,
  },
  {
    // Source: runtrack.run/track/madison-park-highschool-track
    // 400m synthetic, 8 lanes — Madison Park Court, Roxbury Crossing
    id: "boston-5",
    reviewSummary:
      "A full 8-lane synthetic track at Madison Park High School in Roxbury, right off the Orange Line. Lighting confirmed. Public access is informal — available when no school or athletic events are scheduled. The lane count makes it one of the wider public tracks in Boston.",
    name: "Madison Park High School Track",
    lat: 42.33229,
    lon: -71.08713,
    distance: 0.0,
    rating: 3.5,
    reviewCount: 21,
    surface: "Synthetic",
    lanes: 8,
    lighting: true,
    hours: "Dawn – Dusk (non-school hours)",
    publicHours:
      "Community access when school is not in session. Avoid during school hours and scheduled team practices. Orange Line (Ruggles station) is the nearest T stop.",
    publicAccessType: "conditional",
    access: "public",
    cost: "Free",
    tags: ["synthetic", "8-lane", "floodlit", "school track", "Roxbury", "Orange Line", "Ruggles"],
    osmType: "way",
    osmId: 0,
  },
  {
    // Source: runtrack.run/track/harry-downes-field
    // 400m synthetic, 6 lanes — 51 Jamaica Road, Brookline Village
    // Rated "great" quality on runtrack.run
    id: "boston-6",
    reviewSummary:
      "A highly-rated 6-lane synthetic track in Brookline Village — runtrack.run users rate it as 'great' quality. Regular users describe it as a well-maintained, uncrowded option. Dogs not permitted in the fenced track area. Dawn-to-dusk hours are consistent with Brookline Parks facilities.",
    name: "Harry Downes Field Track",
    lat: 42.32459,
    lon: -71.11870,
    distance: 0.0,
    rating: 4.2,
    reviewCount: 33,
    surface: "Synthetic",
    lanes: 6,
    lighting: true,
    hours: "Dawn – Dusk",
    publicHours:
      "Open to the public dawn to dusk. No reservation required. Note: dogs not permitted in the fenced track and field area. Brookline Parks Department facility.",
    publicAccessType: "open",
    access: "public",
    cost: "Free",
    tags: ["synthetic", "6-lane", "floodlit", "Brookline", "Dawn-Dusk", "no dogs"],
    osmType: "way",
    osmId: 0,
  },
  {
    // Source: runtrack.run/track/danehy-park-outdoor-track
    // 400m synthetic, 6 lanes, lighting — 39 Sherman Street, North Cambridge
    // Rated "ok" quality; parkrun held here every Saturday
    id: "boston-7",
    reviewSummary:
      "Danehy Park is North Cambridge's biggest athletic complex — 50 acres with a 6-lane synthetic track. Hosts a weekly parkrun every Saturday morning. Regular users describe it as generally chill and uncrowded. Alewife Red Line access is a plus. Note: no restrooms in the park.",
    name: "Danehy Park Track",
    lat: 42.38955,
    lon: -71.13659,
    distance: 0.0,
    rating: 4.1,
    reviewCount: 61,
    surface: "Synthetic",
    lanes: 6,
    lighting: true,
    hours: "Dawn – Dusk",
    publicHours:
      "Open to the public during park hours (dawn to dusk). No reservation required. Weekly parkrun every Saturday morning. Nearest T stop is Alewife (Red Line). Note: no restrooms in the park.",
    publicAccessType: "open",
    access: "public",
    cost: "Free",
    tags: ["synthetic", "6-lane", "floodlit", "park track", "Cambridge", "North Cambridge", "parkrun", "Red Line", "Alewife"],
    osmType: "way",
    osmId: 0,
  },
  {
    // Source: runtrack.run/track/henry-g-steinbrenner-stadium
    // MIT's outdoor 400m synthetic, 8 lanes — Vassar Street, Cambridgeport
    // Informally open to the public when no MIT team practices
    id: "boston-8",
    reviewSummary:
      "MIT's Steinbrenner Stadium is a full 8-lane 400m synthetic track with lighting on Vassar Street in Cambridge. One of the best-spec public-access tracks in the Boston area. Open informally when no MIT team practices are scheduled — most reliable early mornings and weekend afternoons.",
    name: "MIT Steinbrenner Stadium Track",
    lat: 42.35795,
    lon: -71.09777,
    distance: 0.0,
    rating: 4.3,
    reviewCount: 88,
    surface: "Synthetic",
    lanes: 8,
    lighting: true,
    hours: "Open when no team practice (check MIT Athletics)",
    publicHours:
      "Open informally to the public when no MIT team practices are scheduled. Early mornings and weekend afternoons are the most reliably available times. Avoid weekday late afternoons during the academic year.",
    publicAccessType: "conditional",
    access: "public",
    cost: "Free",
    tags: ["synthetic", "8-lane", "floodlit", "university track", "Cambridge", "MIT", "conditional access"],
    osmType: "way",
    osmId: 0,
  },
  {
    // Source: runtrack.run/track/dilboy-stadium
    // 400m synthetic, 8 lanes — Alewife Brook Pkwy, Davis Square, Somerville
    id: "boston-9",
    reviewSummary:
      "Dilboy Stadium is Somerville's premier athletic facility — a full 8-lane synthetic track inside a sports complex near Davis Square. One of the wider tracks in the metro area. Check Somerville Recreation's schedule before visiting as programming can limit public access.",
    name: "Dilboy Stadium Track",
    lat: 42.41200,
    lon: -71.13193,
    distance: 0.0,
    rating: 4.0,
    reviewCount: 45,
    surface: "Synthetic",
    lanes: 8,
    lighting: null,
    hours: "Dawn – Dusk (check Somerville Recreation schedule)",
    publicHours:
      "Open to the public when Somerville Recreation programs are not scheduled. Check somervillema.gov/recreation for program hours before visiting. Near Alewife Red Line station.",
    publicAccessType: "conditional",
    access: "public",
    cost: "Free",
    tags: ["synthetic", "8-lane", "stadium track", "Somerville", "Davis Square", "Red Line"],
    osmType: "way",
    osmId: 0,
  },
];
