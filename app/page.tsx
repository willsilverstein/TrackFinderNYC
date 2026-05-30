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
import { getCityConfig } from "@/lib/cityConfig";

export default function Page() {
  const cityEnv = process.env.NEXT_PUBLIC_CITY;
  const city = getCityConfig();

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        name: city.siteName,
        url: city.siteUrl,
        description: city.metaDescription,
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: `${city.siteUrl}/?q={search_term_string}`,
          },
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "Organization",
        name: "TrackFinder",
        url: "https://www.trackfindernyc.com",
        logo: "https://www.trackfindernyc.com/og-default.png",
      },
    ],
  };

  if (!cityEnv || cityEnv === "landing") {
    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <LandingPage />
      </>
    );
  }
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <MapPage />
    </>
  );
}
