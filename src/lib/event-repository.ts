import { db } from "@/lib/db";
import { events as demoEvents, type RaceEvent } from "@/lib/events";

export async function listPublishedEvents(): Promise<RaceEvent[]> {
  try {
    const stored = await db.event.findMany({ where: { status: "PUBLISHED", eventDate: { gte: new Date() } }, include: { distances: true }, orderBy: { eventDate: "asc" } });
    if (stored.length) return stored.map((event) => ({ id: event.id, slug: event.slug, title: event.title, date: event.eventDate.toISOString().slice(0, 10), city: event.city, country: event.country, countryCode: event.countryCode, venue: event.venue || "", type: event.eventType, description: event.description, distances: event.distances.map((distance) => ({ name: distance.name, km: distance.distance })), registrationStatus: event.registrationStatus === "OPEN" ? "Registration open" : event.registrationStatus === "SOLD_OUT" ? "Sold out" : event.registrationStatus === "CLOSED" ? "Registration closed" : "Coming soon", featured: event.featured, image: event.imageUrl || "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&w=1200&q=85", organizer: event.organizerName, websiteUrl: event.websiteUrl || undefined }));
  } catch { /* database fallback keeps the public experience available before setup */ }
  return demoEvents.filter((event) => new Date(`${event.date}T00:00:00`) >= new Date(new Date().toDateString()));
}

export async function getPublishedEvent(slug: string) {
  const events = await listPublishedEvents();
  return events.find((event) => event.slug === slug);
}
