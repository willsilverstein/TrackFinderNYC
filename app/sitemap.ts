import type { MetadataRoute } from "next";
import { getCityConfig } from "@/lib/cityConfig";

export default function sitemap(): MetadataRoute.Sitemap {
  const city = getCityConfig();

  const trackPages: MetadataRoute.Sitemap = city.tracks.map((track) => ({
    url: `${city.siteUrl}/track/${track.id}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [
    {
      url: city.siteUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    ...trackPages,
  ];
}
