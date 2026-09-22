import Link from "next/link";
import { Filter, Search, SlidersHorizontal } from "lucide-react";
import { EventCard } from "@/components/EventCard";
import { listPublishedEvents } from "@/lib/event-repository";

export default async function EventsPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const params = await searchParams;
  const events = await listPublishedEvents();
  const query = typeof params.search === "string" ? params.search.toLowerCase() : "";
  const type = typeof params.type === "string" ? params.type : "";
  const country = typeof params.country === "string" ? params.country : "";
  const filtered = events.filter((event) => {
    const searchable = `${event.title} ${event.city} ${event.country} ${event.venue} ${event.organizer}`.toLowerCase();
    return (!query || searchable.includes(query)) && (!type || event.type === type || event.distances.some((distance) => distance.name === type)) && (!country || event.country === country);
  });
  const countries = [...new Set(events.map((event) => event.country))];
  const types = [...new Set(events.flatMap((event) => [event.type, ...event.distances.map((distance) => distance.name)]))];

  return <><div className="page-shell"><section className="directory-header"><div><p className="section-kicker">The starting line is here</p><h1>Find your next race.</h1><p>Search a growing calendar of races worth travelling for, from first 5Ks to finish-line ultras.</p></div><div className="results-count"><strong>{filtered.length.toString().padStart(2, "0")}</strong><span>events found</span></div></section><div className="directory-layout"><aside className="filter-panel"><div className="filter-title"><span><SlidersHorizontal size={17} /> Filters</span><Link href="/events">Clear all</Link></div><form className="filter-form"><label>Search<input name="search" defaultValue={query} placeholder="Race, city or country" /></label><label>Country<select name="country" defaultValue={country}><option value="">All countries</option>{countries.map((item) => <option key={item}>{item}</option>)}</select></label><label>Distance or type<select name="type" defaultValue={type}><option value="">Everything</option>{types.map((item) => <option key={item}>{item}</option>)}</select></label><button className="button button--dark" type="submit"><Search size={17} /> Apply filters</button></form><div className="filter-note"><Filter size={17} /><span>New events are added by our editorial team and verified before publishing.</span></div></aside><main className="results-area"><div className="results-toolbar"><span>Showing upcoming events</span><select aria-label="Sort events"><option>Soonest first</option><option>Featured first</option></select></div>{filtered.length ? <div className="event-grid">{filtered.map((event) => <EventCard key={event.id} event={event} />)}</div> : <div className="empty-state"><span className="empty-state__number">00</span><h2>No upcoming events found.</h2><p>Try changing your filters to find the right starting line.</p><Link className="button button--dark" href="/events">Clear filters</Link></div>}</main></div></div></>;
}
