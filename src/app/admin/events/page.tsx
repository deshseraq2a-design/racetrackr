import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Plus, Trash2 } from "lucide-react";
import { db } from "@/lib/db";
import { deleteEvent } from "./actions";

export default async function AdminEventsPage() {
  const events = await db.event.findMany({ include: { distances: true }, orderBy: { eventDate: "asc" } });
  return <main className="admin-main standalone-admin"><div className="admin-topbar"><div><Link href="/admin" className="back-link"><ArrowLeft size={15} /> Dashboard</Link><h1>Events.</h1><p className="admin-subtitle">Manage the races in your public calendar.</p></div><Link className="button button--lime" href="/admin/events/new"><Plus size={17} /> Add event</Link></div><div className="admin-table"><div className="admin-table__head"><span>Event</span><span>Date</span><span>Location</span><span>Status</span><span>Actions</span></div>{events.map((event) => <div className="admin-table__row" key={event.id}><div><strong>{event.title}</strong><span>{event.eventType} · {event.distances.map((distance) => distance.name).join(", ")}</span></div><span>{event.eventDate.toISOString().slice(0, 10)}</span><span>{event.city}, {event.country}</span><span className={`table-status table-status--${event.status.toLowerCase()}`}>{event.status}</span><div className="table-actions"><Link href={`/admin/events/${event.id}/edit`} aria-label={`Edit ${event.title}`}><ArrowUpRight size={16} /></Link><form action={deleteEvent}><input type="hidden" name="id" value={event.id} /><button aria-label={`Delete ${event.title}`} type="submit"><Trash2 size={16} /></button></form></div></div>)}</div></main>;
}
