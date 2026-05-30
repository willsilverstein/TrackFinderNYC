import type { MetadataRoute } from "next";
import { getCityConfig } from "@/lib/cityConfig";

export default function robots(): MetadataRoute.Robots {
  const city = getCityConfig();
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${city.siteUrl}/sitemap.xml`,
  };
}
