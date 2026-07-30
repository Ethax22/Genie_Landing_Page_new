import type { MetadataRoute } from "next";
import { META } from "@/content/copy";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/privacy", "/terms", "/refund"].map((path) => ({
    url: `${META.url}${path}`,
    lastModified: new Date(),
  }));
}
