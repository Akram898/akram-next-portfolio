import type { MetadataRoute } from "next";
import { getAllGuides } from "@/lib/guides";
import { site } from "@/lib/site";

/* Guide entries are generated from content/guides, not hand-listed -- a hardcoded array
   silently goes stale the first time someone publishes without editing this file.
   getAllGuides() returns published guides only, so drafts never reach the sitemap. */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: site.url, lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: `${site.url}/architecture`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${site.url}/lab`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${site.url}/guides`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
  ];

  const guideRoutes: MetadataRoute.Sitemap = getAllGuides().map((guide) => ({
    url: `${site.url}/guides/${guide.slug}`,
    lastModified: guide.updatedAt ? new Date(guide.updatedAt) : now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...guideRoutes];
}
