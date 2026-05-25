/**
 * Root page — server component.
 * Routes to the city picker landing page or the map UI
 * depending on the NEXT_PUBLIC_CITY build-time env var.
 *
 *   NEXT_PUBLIC_CITY=landing  →  city-picker (trackfindernyc.com)
 *   NEXT_PUBLIC_CITY=nyc      →  NYC map     (www.trackfindernyc.com)
 *   NEXT_PUBLIC_CITY=boston   →  Boston map  (boston.trackfindernyc.com)
 */

import LandingPage from "@/components/LandingPage";
import MapPage from "@/components/MapPage";

export default function Page() {
  const city = process.env.NEXT_PUBLIC_CITY;
  if (!city || city === "landing") {
    return <LandingPage />;
  }
  return <MapPage />;
}
