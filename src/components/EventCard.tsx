import Link from "next/link";
import { ArrowUpRight, CalendarDays, MapPin } from "lucide-react";
import { daysUntil, formatDate, type RaceEvent } from "@/lib/events";

export function EventCard({ event, compact = false }: { event: RaceEvent; compact?: boolean }) {
  return (
    <article className={`event-card ${compact ? "event-card--compact" : ""}`}>
      <div className="event-card__image-wrap">
        <img src={event.image} alt={`${event.title} race course`} className="event-card__image" />
        {event.featured && <span className="eyebrow-badge">Featured</span>}
        <span className="event-card__days">{daysUntil(event.date)} days to go</span>
      </div>
      <div className="event-card__body">
        <div className="event-card__meta"><span>{event.type}</span><span>{event.registrationStatus}</span></div>
        <h3><Link href={`/events/${event.slug}`}>{event.title}</Link></h3>
        <div className="event-card__line"><CalendarDays size={15} /> {formatDate(event.date)}</div>
        <div className="event-card__line"><MapPin size={15} /> {event.city}, {event.country}</div>
        <div className="event-card__footer">
          <span className="distance-text">{event.distances.slice(0, 2).map((distance) => distance.name).join(" · ")}</span>
          <Link className="text-link" href={`/events/${event.slug}`}>View event <ArrowUpRight size={15} /></Link>
        </div>
      </div>
    </article>
  );
}
