import type { MetadataRoute } from "next";
import { META } from "@/content/copy";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/privacy", "/terms", "/refund", "/contact", "/team"].map((path) => ({
    url: `${META.url}${path}`,
    lastModified: new Date(),
  }));
}
