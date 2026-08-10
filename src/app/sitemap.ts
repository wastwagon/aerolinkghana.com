import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/metadata";
import { getAllBlogSlugs } from "@/lib/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  const now = new Date();

  const staticRoutes = [
    "",
    "/services",
    "/book",
    "/fleet",
    "/destinations",
    "/experience",
    "/how-it-works",
    "/faq",
    "/about",
    "/corporate",
    "/contact",
    "/blog",
    "/booking/status",
  ];

  const blogRoutes = getAllBlogSlugs().map((slug) => `/blog/${slug}`);

  return [...staticRoutes, ...blogRoutes].map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency:
      path === "" || path === "/book" ? "weekly" : path.startsWith("/blog") ? "monthly" : "monthly",
    priority: path === "" ? 1 : path === "/book" ? 0.9 : path.startsWith("/blog/") ? 0.7 : 0.7,
  }));
}
