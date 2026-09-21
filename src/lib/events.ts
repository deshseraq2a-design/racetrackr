export type EventDistance = { name: string; km: number };

export type RaceEvent = {
  id: string;
  slug: string;
  title: string;
  date: string;
  city: string;
  country: string;
  countryCode: string;
  venue: string;
  type: string;
  description: string;
  distances: EventDistance[];
  registrationStatus: "Registration open" | "Coming soon" | "Sold out" | "Registration closed";
  featured?: boolean;
  image: string;
  organizer: string;
  websiteUrl?: string;
};

export const events: RaceEvent[] = [
  {
    id: "dhaka-2027",
    slug: "dhaka-marathon-2027",
    title: "Dhaka Marathon 2027",
    date: "2027-01-15",
    city: "Dhaka",
    country: "Bangladesh",
    countryCode: "BD",
    venue: "Hatirjheel Amphitheatre",
    type: "Marathon",
    description: "A bold city marathon tracing Dhaka's most memorable landmarks, with a fast, flat course and a finish beside the lake.",
    distances: [{ name: "Marathon", km: 42.195 }, { name: "Half Marathon", km: 21.1 }, { name: "10K", km: 10 }],
    registrationStatus: "Registration open",
    featured: true,
    image: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&w=1200&q=85",
    organizer: "Dhaka Running Collective",
  },
  {
    id: "coastal-10k",
    slug: "coastal-dawn-10k",
    title: "Coastal Dawn 10K",
    date: "2026-10-10",
    city: "Lisbon",
    country: "Portugal",
    countryCode: "PT",
    venue: "Praça do Comércio",
    type: "Road Race",
    description: "A sunrise road race along the Tagus waterfront, built for a quick, joyful start to the weekend.",
    distances: [{ name: "10K", km: 10 }, { name: "5K", km: 5 }],
    registrationStatus: "Registration open",
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=85",
    organizer: "Atlantic Miles",
  },
  {
    id: "blue-ridge",
    slug: "blue-ridge-trail-run",
    title: "Blue Ridge Trail Run",
    date: "2026-10-24",
    city: "Asheville",
    country: "United States",
    countryCode: "US",
    venue: "Bent Creek Experimental Forest",
    type: "Trail Run",
    description: "A technical but welcoming trail day through old-growth forest, ridgelines and crisp Appalachian air.",
    distances: [{ name: "50K", km: 50 }, { name: "Half Marathon", km: 21.1 }, { name: "10K", km: 10 }],
    registrationStatus: "Coming soon",
    featured: true,
    image: "https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=1200&q=85",
    organizer: "Blue Ridge Endurance",
  },
  {
    id: "city-lights",
    slug: "city-lights-half-marathon",
    title: "City Lights Half Marathon",
    date: "2026-11-08",
    city: "Melbourne",
    country: "Australia",
    countryCode: "AU",
    venue: "Federation Square",
    type: "Half Marathon",
    description: "Melbourne after dark: an illuminated half marathon through the riverfront, laneways and city centre.",
    distances: [{ name: "Half Marathon", km: 21.1 }, { name: "10K", km: 10 }],
    registrationStatus: "Registration open",
    image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=1200&q=85",
    organizer: "Laneway Run Co.",
  },
  {
    id: "sahara-ultra",
    slug: "sahara-sky-ultra",
    title: "Sahara Sky Ultra",
    date: "2026-12-05",
    city: "Marrakesh",
    country: "Morocco",
    countryCode: "MA",
    venue: "Agafay Desert Camp",
    type: "Ultra Marathon",
    description: "A self-supported desert ultra under vast skies, with a generous cutoff and unforgettable night finish.",
    distances: [{ name: "100K", km: 100 }, { name: "50K", km: 50 }],
    registrationStatus: "Registration open",
    image: "https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?auto=format&fit=crop&w=1200&q=85",
    organizer: "Atlas Endurance",
  },
  {
    id: "river-park-5k",
    slug: "river-park-family-5k",
    title: "River Park Family 5K",
    date: "2026-10-03",
    city: "London",
    country: "United Kingdom",
    countryCode: "GB",
    venue: "Richmond Riverside",
    type: "Fun Run",
    description: "A relaxed, inclusive 5K for friends and families, with a riverside finish and charity village.",
    distances: [{ name: "5K", km: 5 }],
    registrationStatus: "Registration open",
    image: "https://images.unsplash.com/photo-1483721310020-03333e577078?auto=format&fit=crop&w=1200&q=85",
    organizer: "Good Strides UK",
  },
];

export function getEvent(slug: string) {
  return events.find((event) => event.slug === slug);
}

export function daysUntil(date: string) {
  const today = new Date();
  const eventDate = new Date(`${date}T00:00:00`);
  return Math.max(0, Math.ceil((eventDate.getTime() - new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime()) / 86400000));
}

export function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" }).format(new Date(`${date}T00:00:00`));
}
