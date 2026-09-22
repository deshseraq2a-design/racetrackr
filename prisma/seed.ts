import { PrismaClient, EventStatus, RegistrationStatus } from "@prisma/client";
import { events } from "../src/lib/events";

const db = new PrismaClient();

async function main() {
  for (const event of events) {
    await db.event.upsert({
      where: { slug: event.slug },
      update: { title: event.title, eventDate: new Date(`${event.date}T00:00:00Z`), status: EventStatus.PUBLISHED },
      create: {
        title: event.title,
        slug: event.slug,
        shortDescription: event.description,
        description: event.description,
        eventDate: new Date(`${event.date}T00:00:00Z`),
        country: event.country,
        countryCode: event.countryCode,
        city: event.city,
        venue: event.venue,
        organizerName: event.organizer,
        websiteUrl: event.websiteUrl,
        imageUrl: event.image,
        imageAlt: `${event.title} race course`,
        eventType: event.type,
        status: EventStatus.PUBLISHED,
        registrationStatus: event.registrationStatus === "Registration open" ? RegistrationStatus.OPEN : event.registrationStatus === "Sold out" ? RegistrationStatus.SOLD_OUT : RegistrationStatus.COMING_SOON,
        featured: Boolean(event.featured),
        distances: { create: event.distances.map((distance) => ({ name: distance.name, distance: distance.km })) },
      },
    });
  }
  console.log(`Seeded ${events.length} events.`);
}

main().finally(() => db.$disconnect());
