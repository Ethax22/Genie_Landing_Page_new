import type { MetadataRoute } from "next";
import { META } from "@/content/copy";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/api/", "/thank-you"] },
    sitemap: `${META.url}/sitemap.xml`,
  };
}
