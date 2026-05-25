import type { MetadataRoute } from "next";
import { MOCK_TRACKS } from "@/lib/mockData";

const SITE_URL = "https://www.trackfindernyc.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const trackPages: MetadataRoute.Sitemap = MOCK_TRACKS.map((track) => ({
    url: `${SITE_URL}/track/${track.id}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    ...trackPages,
  ];
}
