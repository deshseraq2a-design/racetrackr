import type { MetadataRoute } from "next";
import { db } from "@/lib/db";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const events = await db.event.findMany({ where: { status: "PUBLISHED" }, select: { slug: true, updatedAt: true } });
  return [{ url: base, changeFrequency: "daily", priority: 1 }, { url: `${base}/events`, changeFrequency: "daily", priority: 0.9 }, { url: `${base}/calendar`, changeFrequency: "weekly", priority: 0.8 }, ...events.map((event) => ({ url: `${base}/events/${event.slug}`, lastModified: event.updatedAt, changeFrequency: "weekly" as const, priority: 0.8 }))];
}
