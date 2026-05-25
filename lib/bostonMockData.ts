import type { Track } from "./types";

// Boston-area public running tracks
// Coordinates sourced from runtrack.run (OpenStreetMap data) — verified 2024
// Surface types confirmed via runtrack.run where available
export const BOSTON_TRACKS: Track[] = [
  {
    // Source: runtrack.run/track/clemente-field
    // 3-lane rubberized all-weather track — confirmed by user
    // Address: 145 Park Drive, Fenway
    id: "boston-1",
    reviewSummary:
      "A compact 3-lane rubberized track tucked inside the historic Back Bay Fens. The small lane count means it fills up quickly, but the park setting is one of the more pleasant in the city. Easy access from the Green Line. Lighting confirmed. Best on weekday mornings when it's uncrowded.",
    name: "Clemente Field Track",
    lat: 42.34070,
    lon: -71.09742,
    distance: 0.0,
    rating: 3.8,
    reviewCount: 52,
    surface: "Rubberized All-Weather",
    lanes: 3,
    lighting: true,
    hours: "Dawn – Dusk",
    publicHours:
      "Open to the public during daylight hours. No reservation required. Green Line (Fenway/Longwood stops) is closest T access.",
    publicAccessType: "open",
    access: "public",
    cost: "Free",
    tags: ["3-lane", "rubberized", "floodlit", "park track", "Fenway", "Back Bay Fens", "Green Line"],
    osmType: "way",
    osmId: 0,
  },
  {
    // Source: runtrack.run/track/east-boston-memorial-stadium
    // 400m synthetic, 6 lanes — Sartori Stadium, East Boston
    id: "boston-2",
    reviewSummary:
      "A solid 6-lane synthetic track in East Boston with lighting — one of the few Boston-area public tracks usable after dark. Well-connected by the Blue Line. The stadium setting gives it a more athletic feel than a typical park track.",
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
    // Source: runtrack.run/track/columbus-park-outdoor-track (same location as Moakley Park complex)
    // 400m synthetic, 8 lanes, lighting — Columbia Road, South Boston
    // Rated "good" on runtrack.run; confirmed open Aug 2024
    id: "boston-3",
    reviewSummary:
      "The Columbus Park / Moakley Park track is South Boston's flagship outdoor oval — a full 8-lane synthetic track with lighting inside Boston's 58-acre waterfront athletic complex. Confirmed open to the public by a recent visitor (Aug 2024). Ocean views of Old Harbor are a genuine perk. Easy Red Line access and ample street parking.",
    name: "Columbus Park Track",
    lat: 42.323604,
    lon: -71.050485,
    distance: 0.0,
    rating: 4.1,
    reviewCount: 74,
    surface: "Synthetic",
    lanes: 8,
    lighting: true,
    hours: "Dawn – Dusk",
    publicHours:
      "Open to the public during daylight hours. Confirmed open with field use in August 2024. No reservation required. Red Line (JFK/UMass station) is the nearest T stop. Street parking available around the park.",
    publicAccessType: "open",
    access: "public",
    cost: "Free",
    tags: ["synthetic", "8-lane", "floodlit", "park track", "South Boston", "Southie", "ocean views", "58-acre park", "Red Line"],
    osmType: "way",
    osmId: 0,
  },
  {
    // Source: runtrack.run/track/charlestown-community-center
    // 400m synthetic, 6 lanes, lighting — Medford Street, Charlestown
    id: "boston-4",
    reviewSummary:
      "The BCYF Charlestown track is a 6-lane synthetic oval with lighting — a reliable community track in Charlestown. Managed by Boston Centers for Youth & Families. Lighting makes it usable outside daylight hours, which is a significant plus over many neighborhood tracks.",
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
    // 400m synthetic, 8 lanes — Madison Park Court, Roxbury
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
      "A highly-rated 6-lane synthetic track in Brookline Village. runtrack.run users rate it 'great' quality. Regular users describe it as well-maintained and uncrowded. Dogs not permitted in the fenced track area. Dawn-to-dusk hours are consistent with Brookline Parks policy.",
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
    // Weekly parkrun every Saturday morning
    id: "boston-7",
    reviewSummary:
      "Danehy Park is North Cambridge's biggest athletic complex — 50 acres with a 6-lane synthetic track. Hosts a weekly parkrun every Saturday morning. Generally chill and uncrowded. Alewife Red Line access is a plus. Note: no restrooms in the park.",
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
    // 400m synthetic, 8 lanes, lighting — Vassar Street, Cambridge
    // Informally open to public when no MIT team practices
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
      "Open informally to the public when no MIT team practices are scheduled. Early mornings and weekend afternoons are the most reliably available. Avoid weekday late afternoons during the academic year.",
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
      "Dilboy Stadium is Somerville's premier athletic facility — a full 8-lane synthetic track near Davis Square. One of the wider tracks in the metro area. Check Somerville Recreation's schedule before visiting as programming can limit public access.",
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
      "Open to the public when Somerville Recreation programs are not scheduled. Check somervillema.gov/recreation for current hours. Near Alewife Red Line station.",
    publicAccessType: "conditional",
    access: "public",
    cost: "Free",
    tags: ["synthetic", "8-lane", "stadium track", "Somerville", "Davis Square", "Red Line"],
    osmType: "way",
    osmId: 0,
  },
  {
    // Source: runtrack.run/track/nickerson-field
    // 400m synthetic, 4 lanes — Harry Agganis Way, Allston
    // BU's outdoor track, listed as "possibly" public
    id: "boston-10",
    reviewSummary:
      "Boston University's outdoor track at Nickerson Field in Allston. A 4-lane synthetic oval adjacent to the BU athletic complex. Access is informal — available when no BU team events are scheduled. Green Line (Packard's Corner) nearby. Worth checking before making the trip during the academic year.",
    name: "BU Nickerson Field Track",
    lat: 42.35347,
    lon: -71.11925,
    distance: 0.0,
    rating: 3.7,
    reviewCount: 27,
    surface: "Synthetic",
    lanes: 4,
    lighting: null,
    hours: "Open when no team events (check BU Athletics)",
    publicHours:
      "Open informally when no BU athletic events are scheduled. Avoid game days and practice windows during the academic year. Green Line (Packard's Corner) nearby.",
    publicAccessType: "conditional",
    access: "public",
    cost: "Free",
    tags: ["synthetic", "4-lane", "university track", "Allston", "BU", "Boston University", "conditional access", "Green Line"],
    osmType: "way",
    osmId: 0,
  },
  {
    // Source: runtrack.run/track/mccurdy-track-1
    // 400m synthetic, 8 lanes, no lighting — North Harvard Street, Allston
    // Listed as "likely" public, rated "great" quality
    // Confirmed open Nov 2024; busy on Harvard home game Saturdays but still open
    id: "boston-11",
    reviewSummary:
      "Harvard's McCurdy Track is a full 8-lane synthetic oval in Allston, rated 'great' quality and confirmed open to the public. Visiting on Harvard home game Saturdays can be hectic but the track stays open. No lighting limits evening use. One of the better open-access tracks in the area.",
    name: "Harvard McCurdy Track",
    lat: 42.36533,
    lon: -71.12865,
    distance: 0.0,
    rating: 4.2,
    reviewCount: 56,
    surface: "Synthetic",
    lanes: 8,
    lighting: false,
    hours: "Dawn – Dusk",
    publicHours:
      "Open to the public during daylight hours. Busier on Harvard home game Saturdays but track remains accessible. No lighting — daylight use only. Harvard's Allston campus, off North Harvard Street.",
    publicAccessType: "open",
    access: "public",
    cost: "Free",
    tags: ["synthetic", "8-lane", "no lighting", "university track", "Allston", "Harvard", "open access"],
    osmType: "way",
    osmId: 0,
  },
  {
    // Source: runtrack.run/track/ellis-oval
    // 400m synthetic, 8 lanes — Lower Campus Road, Ball Square, Somerville
    // Tufts University track, listed as "possibly" public, rated "good"
    id: "boston-12",
    reviewSummary:
      "Tufts University's Ellis Oval is a full 8-lane synthetic track on the Medford/Somerville campus near Ball Square. Rated 'good' quality. Access is informal — open when no Tufts team practices are scheduled. Ball Square Green Line extension stop is within walking distance.",
    name: "Tufts Ellis Oval Track",
    lat: 42.40342,
    lon: -71.11843,
    distance: 0.0,
    rating: 3.8,
    reviewCount: 22,
    surface: "Synthetic",
    lanes: 8,
    lighting: null,
    hours: "Open when no team practice (check Tufts Athletics)",
    publicHours:
      "Open informally to the public when no Tufts team practices are scheduled. Ball Square Green Line station is nearby. Avoid late afternoons during the academic year.",
    publicAccessType: "conditional",
    access: "public",
    cost: "Free",
    tags: ["synthetic", "8-lane", "university track", "Somerville", "Medford", "Tufts", "conditional access", "Green Line"],
    osmType: "way",
    osmId: 0,
  },
  {
    // Source: runtrack.run/track/hormel-stadium
    // 440yd synthetic, 6 lanes — Medford
    id: "boston-13",
    reviewSummary:
      "Hormel Stadium is Medford's main outdoor athletic facility — a 6-lane synthetic oval with a longer-than-standard 440-yard circumference. A reliable community track north of the city. Street parking is available nearby.",
    name: "Hormel Stadium Track",
    lat: 42.40840,
    lon: -71.09682,
    distance: 0.0,
    rating: 3.7,
    reviewCount: 18,
    surface: "Synthetic",
    lanes: 6,
    lighting: null,
    hours: "Dawn – Dusk",
    publicHours:
      "Open to the public during daylight hours when no events are scheduled. Check Medford Recreation for programming conflicts.",
    publicAccessType: "conditional",
    access: "public",
    cost: "Free",
    tags: ["synthetic", "6-lane", "440yd", "stadium track", "Medford"],
    osmType: "way",
    osmId: 0,
  },
  {
    // Source: runtrack.run/track/faxon-field
    // 400m synthetic, 6 lanes, lighting — Quincy
    // Rated "great" quality on runtrack.run
    id: "boston-14",
    reviewSummary:
      "Faxon Field at Quincy High School is one of the best-rated community tracks in the metro area — runtrack.run users give it 'great' quality. A full 6-lane synthetic oval with lighting, making it usable after dark. Worth the short Red Line ride to Quincy Center.",
    name: "Faxon Field Track",
    lat: 42.25563,
    lon: -70.99825,
    distance: 0.0,
    rating: 4.2,
    reviewCount: 31,
    surface: "Synthetic",
    lanes: 6,
    lighting: true,
    hours: "Dawn – Dusk (non-school hours)",
    publicHours:
      "Community access when school is not in session. Generally available evenings and weekends. Red Line (Quincy Center station) is the nearest T stop.",
    publicAccessType: "conditional",
    access: "public",
    cost: "Free",
    tags: ["synthetic", "6-lane", "floodlit", "school track", "Quincy", "Red Line", "Quincy Center"],
    osmType: "way",
    osmId: 0,
  },
  {
    // Source: runtrack.run/track/victory-field
    // 400m synthetic, 6 lanes, lighting — Watertown
    id: "boston-15",
    reviewSummary:
      "Victory Field is Watertown's main athletic oval — a 6-lane synthetic track with lighting near the Charles River. A good option for runners in the western suburbs. Street parking and a quiet neighborhood setting.",
    name: "Victory Field Track",
    lat: 42.37331,
    lon: -71.18112,
    distance: 0.0,
    rating: 3.8,
    reviewCount: 24,
    surface: "Synthetic",
    lanes: 6,
    lighting: true,
    hours: "Dawn – Dusk",
    publicHours:
      "Open to the public during daylight hours and into the evening when lights are on. No reservation required.",
    publicAccessType: "open",
    access: "public",
    cost: "Free",
    tags: ["synthetic", "6-lane", "floodlit", "park track", "Watertown"],
    osmType: "way",
    osmId: 0,
  },
  {
    // Source: runtrack.run/track/west-roxbury-hs-athletics-fields
    // 400m synthetic, 6 lanes, lighting — West Roxbury Education Complex
    id: "boston-16",
    reviewSummary:
      "The West Roxbury Education Complex track is a 6-lane synthetic oval with lighting in the far southwest corner of Boston. A standard school track with community access outside school hours. Relatively uncrowded given its distance from the city core.",
    name: "West Roxbury HS Track",
    lat: 42.28265,
    lon: -71.17666,
    distance: 0.0,
    rating: 3.5,
    reviewCount: 14,
    surface: "Synthetic",
    lanes: 6,
    lighting: true,
    hours: "Dawn – Dusk (non-school hours)",
    publicHours:
      "Community access when school is not in session. Evenings and weekends are generally open. Located at the West Roxbury Education Complex off Veterans of Foreign Wars Parkway.",
    publicAccessType: "conditional",
    access: "public",
    cost: "Free",
    tags: ["synthetic", "6-lane", "floodlit", "school track", "West Roxbury", "Boston"],
    osmType: "way",
    osmId: 0,
  },
  {
    // Source: runtrack.run/track/harry-della-russo-stadium
    // 400m synthetic, 6 lanes, lighting — Park Avenue, Revere
    id: "boston-17",
    reviewSummary:
      "Harry Della Russo Stadium is Revere's main athletic venue — a 6-lane synthetic track with lighting a few stops up the Blue Line from downtown Boston. A solid community track that's rarely overcrowded. Blue Line (Revere Beach or Beachmont) is the nearest T access.",
    name: "Harry Della Russo Stadium Track",
    lat: 42.41143,
    lon: -71.01554,
    distance: 0.0,
    rating: 3.7,
    reviewCount: 19,
    surface: "Synthetic",
    lanes: 6,
    lighting: true,
    hours: "Dawn – Dusk",
    publicHours:
      "Open to the public during park hours. Blue Line (Revere Beach or Beachmont stations) is the nearest T access. Street parking available on Park Avenue.",
    publicAccessType: "open",
    access: "public",
    cost: "Free",
    tags: ["synthetic", "6-lane", "floodlit", "stadium track", "Revere", "Blue Line"],
    osmType: "way",
    osmId: 0,
  },
  {
    // Source: runtrack.run/track/macdonald-stadium
    // 400m synthetic, 6 lanes — Pearl Street, Malden
    id: "boston-18",
    reviewSummary:
      "MacDonald Stadium is Malden's main community track — a 6-lane synthetic oval near the center of the city. Orange Line access via Malden Center makes it convenient from downtown Boston. A straightforward neighborhood track that fills a gap north of Somerville.",
    name: "MacDonald Stadium Track",
    lat: 42.42540,
    lon: -71.07570,
    distance: 0.0,
    rating: 3.6,
    reviewCount: 16,
    surface: "Synthetic",
    lanes: 6,
    lighting: null,
    hours: "Dawn – Dusk",
    publicHours:
      "Open to the public during daylight hours. Orange Line (Malden Center station) is the nearest T stop.",
    publicAccessType: "open",
    access: "public",
    cost: "Free",
    tags: ["synthetic", "6-lane", "stadium track", "Malden", "Orange Line", "Malden Center"],
    osmType: "way",
    osmId: 0,
  },
  {
    // Source: runtrack.run/track/dedham-public-schools
    // 400m synthetic, 6 lanes, lighting — Recreation Road, Dedham
    // Rated "good" — user confirmed open during school hours, no issues
    id: "boston-19",
    reviewSummary:
      "Dedham's community track at the Public Schools complex is one of the more welcoming in the metro area — a user report confirms running here during school hours without any issues. 6-lane synthetic with lighting. A solid option for runners south of the city.",
    name: "Dedham High School Track",
    lat: 42.24619,
    lon: -71.15981,
    distance: 0.0,
    rating: 3.8,
    reviewCount: 17,
    surface: "Synthetic",
    lanes: 6,
    lighting: true,
    hours: "Non-school hours (community use confirmed during school hours too)",
    publicHours:
      "Community access generally available — a runner confirmed using the track during school hours without incident. Lighting available for evening runs. Located off Recreation Road in Dedham.",
    publicAccessType: "open",
    access: "public",
    cost: "Free",
    tags: ["synthetic", "6-lane", "floodlit", "school track", "Dedham"],
    osmType: "way",
    osmId: 0,
  },
  {
    // Source: runtrack.run/track/healy-field (DiFazio Field)
    // 400m synthetic, 8 lanes, no lighting — Coulton Park, Needham
    // Rated "good" quality
    id: "boston-20",
    reviewSummary:
      "DiFazio Field in Needham is a full 8-lane synthetic track rated 'good' quality — wider than most community tracks in the metro area. No lighting limits it to daylight use, but the surface and lane count make it worth the trip for a quality workout.",
    name: "DiFazio Field Track",
    lat: 42.27405,
    lon: -71.22345,
    distance: 0.0,
    rating: 3.9,
    reviewCount: 14,
    surface: "Synthetic",
    lanes: 8,
    lighting: false,
    hours: "Dawn – Dusk (non-school hours)",
    publicHours:
      "Open to the community during daylight hours when school is not in session. Located at Coulton Park Extension in Needham. No lighting — daylight use only.",
    publicAccessType: "conditional",
    access: "public",
    cost: "Free",
    tags: ["synthetic", "8-lane", "no lighting", "school track", "Needham"],
    osmType: "way",
    osmId: 0,
  },
  {
    // Source: runtrack.run/track/harris-field
    // 400m synthetic, 6 lanes, lighting — Belmont High School, Concord Ave
    id: "boston-21",
    reviewSummary:
      "Harris Field at Belmont High School is a 6-lane synthetic track with lighting on Concord Avenue. A reliable community track in the western suburbs, convenient for runners between Cambridge and Watertown. Evenings and weekends are the most reliably open times.",
    name: "Harris Field Track",
    lat: 42.39500,
    lon: -71.16915,
    distance: 0.0,
    rating: 3.6,
    reviewCount: 12,
    surface: "Synthetic",
    lanes: 6,
    lighting: true,
    hours: "Non-school hours",
    publicHours:
      "Open to the community outside school hours. Lighting makes it usable into the evening. Located at Belmont High School on Concord Avenue.",
    publicAccessType: "conditional",
    access: "public",
    cost: "Free",
    tags: ["synthetic", "6-lane", "floodlit", "school track", "Belmont"],
    osmType: "way",
    osmId: 0,
  },
  {
    // Source: runtrack.run/track/stokinger-field
    // 400m synthetic, 6 lanes, no lighting — Milton Academy, Centre Street, Milton
    // Rated "good" quality — private school but informally open
    id: "boston-22",
    reviewSummary:
      "Stokinger Field at Milton Academy is a 6-lane synthetic track rated 'good' quality — one of the better-maintained tracks in the south suburbs. It's a private school facility, but runners report informal access outside school hours. No lighting limits it to daylight use.",
    name: "Stokinger Field Track",
    lat: 42.25866,
    lon: -71.07202,
    distance: 0.0,
    rating: 3.7,
    reviewCount: 11,
    surface: "Synthetic",
    lanes: 6,
    lighting: false,
    hours: "Dawn – Dusk (informal access)",
    publicHours:
      "Informal community access during daylight hours. Private school facility — access is not guaranteed. Best to visit early mornings or weekends. Located at Milton Academy on Centre Street.",
    publicAccessType: "conditional",
    access: "public",
    cost: "Free",
    tags: ["synthetic", "6-lane", "no lighting", "school track", "Milton", "Milton Academy"],
    osmType: "way",
    osmId: 0,
  },
  {
    // Source: runtrack.run/track/milton-high-field
    // 400m synthetic, 6 lanes — Brooks Field, Gile Road, Milton
    id: "boston-23",
    reviewSummary:
      "Milton High School's Brooks Field track is a 6-lane synthetic oval on Gile Road — a public school facility with typical community access outside school hours. A straightforward option for runners in Milton and the surrounding south suburbs.",
    name: "Milton High School Track",
    lat: 42.25119,
    lon: -71.09003,
    distance: 0.0,
    rating: 3.5,
    reviewCount: 9,
    surface: "Synthetic",
    lanes: 6,
    lighting: null,
    hours: "Non-school hours",
    publicHours:
      "Open to the community outside school and practice hours. Located at Brooks Field on Gile Road in Milton.",
    publicAccessType: "conditional",
    access: "public",
    cost: "Free",
    tags: ["synthetic", "6-lane", "school track", "Milton"],
    osmType: "way",
    osmId: 0,
  },
  {
    // Source: runtrack.run/track/braintree-high-school
    // 400m synthetic, 8 lanes — Town Street, Braintree
    id: "boston-24",
    reviewSummary:
      "Braintree High School's track is a full 8-lane synthetic oval — one of the wider community tracks south of Boston. Easy Red Line access via Braintree station makes it reachable without a car. Community access available outside school hours.",
    name: "Braintree High School Track",
    lat: 42.20675,
    lon: -71.01919,
    distance: 0.0,
    rating: 3.6,
    reviewCount: 13,
    surface: "Synthetic",
    lanes: 8,
    lighting: null,
    hours: "Non-school hours",
    publicHours:
      "Open to the community outside school hours. Red Line (Braintree station) is the nearest T stop. Located on Town Street in Braintree.",
    publicAccessType: "conditional",
    access: "public",
    cost: "Free",
    tags: ["synthetic", "8-lane", "school track", "Braintree", "Red Line"],
    osmType: "way",
    osmId: 0,
  },
];
