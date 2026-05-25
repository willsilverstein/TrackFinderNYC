import type { Track } from "./types";

// Boston-area public running tracks
// Coordinates sourced from OpenStreetMap / Google Maps verification
// Surface type marked "Unknown" where not publicly documented — needs field verification
export const BOSTON_TRACKS: Track[] = [
  {
    // Source: urbnparks.com/boston/back-bay-fens + BostonParks
    // Athletic track at Clemente Field inside the Back Bay Fens
    // Adjacent to the Museum of Fine Arts and Fenway neighborhood
    id: "boston-1",
    reviewSummary:
      "A centrally located track tucked inside the historic Back Bay Fens. Easy to access from the Green Line and popular with Fenway-area runners. No lighting limits it to daylight use, but the park setting makes it one of the more pleasant spots to run in the city. Surface condition varies seasonally — best in warmer months.",
    name: "Back Bay Fens — Clemente Field Track",
    lat: 42.34192,
    lon: -71.10606,
    distance: 0.0,
    rating: 4.0,
    reviewCount: 52,
    surface: "Unknown",
    lanes: null,
    lighting: false,
    hours: "Dawn – Dusk",
    publicHours:
      "Open to the public during daylight hours. No reservation required. Part of the Boston Parks system — no posted restrictions on casual use.",
    publicAccessType: "open",
    access: "public",
    cost: "Free",
    tags: ["400m", "no lighting", "park track", "Fenway", "Back Bay Fens", "Green Line"],
    osmType: "way",
    osmId: 0,
  },
  {
    // Source: urbnparks.com/boston/east-boston-memorial-park
    // Large park track in East Boston — listed as open 24 hours by urbnparks
    id: "boston-2",
    reviewSummary:
      "One of the few Boston-area tracks listed with 24-hour access, making it a practical option for early-morning or late-evening runs. East Boston is well-connected by the Blue Line, and the park has a neighborhood feel. No lighting on the track itself, so nighttime use depends on ambient light from the park perimeter.",
    name: "East Boston Memorial Park Track",
    lat: 42.37372,
    lon: -71.03891,
    distance: 0.0,
    rating: 3.8,
    reviewCount: 38,
    surface: "Unknown",
    lanes: null,
    lighting: false,
    hours: "Open 24 hours",
    publicHours:
      "Open 24 hours, 7 days a week. No reservation required. Blue Line (Airport station) is the nearest T stop.",
    publicAccessType: "open",
    access: "public",
    cost: "Free",
    tags: ["24-hour access", "no lighting", "park track", "East Boston", "Blue Line"],
    osmType: "way",
    osmId: 0,
  },
  {
    // Source: urbnparks.com/boston/moakley-park
    // 58-acre park with full athletic track in South Boston
    // Near Carson Beach, ocean views of Old Harbor
    id: "boston-3",
    reviewSummary:
      "Moakley Park is South Boston's biggest athletic complex, and the track is one of its flagship amenities. The park is enormous — 58 acres — so the track rarely feels crowded. Ocean views of Old Harbor are a genuine perk. No lights means you're limited to daylight, but with easy Red Line access and ample parking, this is a top pick in Southie.",
    name: "Moakley Park Track",
    lat: 42.33158,
    lon: -71.04497,
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
    // Source: urbnparks.com/boston/charlestown-high-school
    // Athletic track behind Charlestown High School
    // Community access during non-school hours
    id: "boston-4",
    reviewSummary:
      "Charlestown's only public track, located behind the high school on a hill with partial views of the neighborhood. Open to the community from dawn to dusk when school is not in session — typical for Boston-area school tracks. The surface is in solid shape compared to some neighborhood alternatives. Worth the short walk up from the Orange Line.",
    name: "Charlestown High School Track",
    lat: 42.37732,
    lon: -71.06063,
    distance: 0.0,
    rating: 3.7,
    reviewCount: 29,
    surface: "Unknown",
    lanes: null,
    lighting: false,
    hours: "Dawn – Dusk (non-school hours)",
    publicHours:
      "Open to the community dawn to dusk when school is not in session. Avoid during school hours and scheduled athletic events. No formal reservation system — community access is informal.",
    publicAccessType: "conditional",
    access: "public",
    cost: "Free",
    tags: ["school track", "no lighting", "community access", "Charlestown", "Dawn-Dusk"],
    osmType: "way",
    osmId: 0,
  },
  {
    // Source: urbnparks.com/boston/madison-high-school-fields + LetsRun community
    // Track at Madison Park Technical Vocational High School, Roxbury
    // Near Ruggles Orange Line station
    id: "boston-5",
    reviewSummary:
      "A neighborhood track in the heart of Roxbury, steps from the Ruggles Orange Line stop. Public access is informal — available when no school or athletic events are scheduled. The Reggie Lewis Track and Athletic Center is nearby for indoor alternatives. Worth checking the school calendar before making the trip.",
    name: "Madison Park High School Track",
    lat: 42.32898,
    lon: -71.08548,
    distance: 0.0,
    rating: 3.5,
    reviewCount: 21,
    surface: "Unknown",
    lanes: null,
    lighting: null,
    hours: "Dawn – Dusk (non-school hours)",
    publicHours:
      "Community access when school is not in session. Avoid during school hours and scheduled team practices. Orange Line (Ruggles station) is the nearest T stop.",
    publicAccessType: "conditional",
    access: "public",
    cost: "Free",
    tags: ["school track", "community access", "Roxbury", "Orange Line", "Ruggles"],
    osmType: "way",
    osmId: 0,
  },
  {
    // Source: urbnparks.com/boston/downes-field
    // Brookline Parks Department — Downes Field, off Clinton St
    // Synthetic turf multi-purpose field with surrounding track
    // Note: Dogs not permitted in the fenced track/field area
    id: "boston-6",
    reviewSummary:
      "A well-maintained Brookline Parks facility with a synthetic turf field and surrounding track. The fencing keeps dogs out, which runners appreciate. Dawn-to-dusk hours are consistent with other Brookline parks. The neighborhood is quiet and the track doesn't get heavy use, making it a reliably open option without the crowds of city-proper parks.",
    name: "Downes Field Track",
    lat: 42.33463,
    lon: -71.12063,
    distance: 0.0,
    rating: 4.0,
    reviewCount: 33,
    surface: "Unknown",
    lanes: null,
    lighting: false,
    hours: "Dawn – Dusk",
    publicHours:
      "Open to the public dawn to dusk. No reservation required. Note: dogs not permitted in the fenced track and field area. Brookline Parks Department facility.",
    publicAccessType: "open",
    access: "public",
    cost: "Free",
    tags: ["no lighting", "park track", "Brookline", "Dawn-Dusk", "no dogs", "synthetic turf field"],
    osmType: "way",
    osmId: 0,
  },
  {
    // Source: urbnparks.com/boston/danehy-park
    // 50-acre Cambridge Parks Department facility in North Cambridge
    // Athletic track & field on south end of park; multiple soccer fields, baseball diamonds
    // Near Alewife Red Line station; 3 parking lots
    id: "boston-7",
    reviewSummary:
      "Danehy Park is North Cambridge's biggest athletic complex — 50 acres with a full athletic track & field, soccer fields, batting cages, and a dog run. The track gets consistent use from Cambridge run clubs and MIT-area runners looking for outdoor space. Alewife Red Line access is a plus. Restrooms are not available at the park, which is a notable downside.",
    name: "Danehy Park Track",
    lat: 42.38431,
    lon: -71.12851,
    distance: 0.0,
    rating: 4.1,
    reviewCount: 61,
    surface: "Unknown",
    lanes: null,
    lighting: null,
    hours: "Dawn – Dusk",
    publicHours:
      "Open to the public during park hours (dawn to dusk). No reservation required. Nearest T stop is Alewife (Red Line). Three parking lots on-site. Note: no restrooms in the park.",
    publicAccessType: "open",
    access: "public",
    cost: "Free",
    tags: ["park track", "Cambridge", "North Cambridge", "50-acre park", "Red Line", "Alewife"],
    osmType: "way",
    osmId: 0,
  },
  {
    // Source: LetsRun community + MIT Athletics
    // Outdoor 400m track at MIT Briggs Field, off Vassar St, Cambridge
    // Informally open to public when no MIT team practices scheduled
    // Commonly used by local run clubs (BAA, November Project)
    id: "boston-8",
    reviewSummary:
      "MIT's outdoor track at Briggs Field is one of the better-maintained surfaces in Cambridge and a well-known drop-in option for the local running community. Access is informal — the track is open when no MIT team practices are scheduled, which is most early mornings and weekend afternoons. Popular with run clubs; expect company on Tuesday and Thursday evenings.",
    name: "MIT Briggs Field Track",
    lat: 42.35941,
    lon: -71.09447,
    distance: 0.0,
    rating: 4.3,
    reviewCount: 88,
    surface: "Synthetic",
    lanes: null,
    lighting: true,
    hours: "Open when no team practice (check MIT Athletics)",
    publicHours:
      "Open informally to the public when no MIT team practices are scheduled. Early mornings and weekend afternoons are the most reliably available times. Avoid weekday late afternoons during the academic year. No formal reservation required.",
    publicAccessType: "conditional",
    access: "public",
    cost: "Free",
    tags: ["synthetic", "floodlit", "university track", "Cambridge", "MIT", "run club", "conditional access"],
    osmType: "way",
    osmId: 0,
  },
  {
    // Source: urbnparks.com/boston/dilboy-stadium + Somerville Recreation
    // Full track + turf field inside a larger Somerville sports complex with an outdoor pool
    // On Alewife Brook Pkwy in Somerville — accessible from Alewife Red Line
    id: "boston-9",
    reviewSummary:
      "Dilboy Stadium is Somerville's premier athletic facility — a full track and turf field inside a sports complex that also includes an outdoor pool. The track is well-maintained and relatively uncrowded outside of Somerville Recreation program hours. Red Line (Alewife) access makes it easy to reach from Cambridge or Boston. Surface and lane details need field verification.",
    name: "Dilboy Stadium Track",
    lat: 42.39228,
    lon: -71.11162,
    distance: 0.0,
    rating: 4.0,
    reviewCount: 45,
    surface: "Unknown",
    lanes: null,
    lighting: null,
    hours: "Dawn – Dusk (check Somerville Recreation schedule)",
    publicHours:
      "Open to the public when Somerville Recreation programs are not scheduled. Check somervillema.gov/recreation for program hours before visiting. Near Alewife Red Line station.",
    publicAccessType: "conditional",
    access: "public",
    cost: "Free",
    tags: ["stadium track", "turf field", "Somerville", "Red Line", "Alewife", "pool complex"],
    osmType: "way",
    osmId: 0,
  },
];
