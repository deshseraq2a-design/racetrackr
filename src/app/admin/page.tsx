import Link from "next/link";
import { ArrowUpRight, CalendarDays, CheckCircle2, CircleAlert, LayoutDashboard, Plus, Users } from "lucide-react";
import { db } from "@/lib/db";

export default async function AdminPage() {
  const [total, upcoming, featured, countries, recent] = await Promise.all([
    db.event.count(),
    db.event.count({ where: { eventDate: { gte: new Date() } } }),
    db.event.count({ where: { featured: true } }),
    db.event.findMany({ distinct: ["country"], select: { country: true } }),
    db.event.findMany({ orderBy: { createdAt: "desc" }, take: 5 }),
  ]);
  const stats = [{ label: "Total events", value: total, icon: CalendarDays }, { label: "Upcoming", value: upcoming, icon: CheckCircle2 }, { label: "Featured", value: featured, icon: LayoutDashboard }, { label: "Countries", value: countries.length, icon: Users }];
  return <div className="admin-shell"><aside className="admin-sidebar"><Link href="/" className="brand"><span className="brand-mark">RA</span><span>Race<span>Atlas</span></span></Link><p className="admin-label">Workspace</p><Link className="admin-nav active" href="/admin"><LayoutDashboard size={17} /> Overview</Link><Link className="admin-nav" href="/admin/events"><CalendarDays size={17} /> Events <span>{total}</span></Link><p className="admin-label">System</p></aside><main className="admin-main"><div className="admin-topbar"><div><p className="section-kicker">Race Atlas / Admin</p><h1>Good morning, admin.</h1></div><Link className="button button--lime" href="/admin/events/new"><Plus size={17} /> Add event</Link></div><div className="stats-grid">{stats.map(({ label, value, icon: Icon }) => <div className="stat-card" key={label}><Icon size={19} /><strong>{value.toString().padStart(2, "0")}</strong><span>{label}</span></div>)}</div><section className="admin-content-grid"><div className="admin-panel"><div className="admin-panel__header"><div><p className="section-kicker">Content overview</p><h2>Recently added</h2></div><Link href="/admin/events" className="text-link">Manage all <ArrowUpRight size={15} /></Link></div>{recent.map((event) => <div className="admin-event-row" key={event.id}><div><strong>{event.title}</strong><span>{event.city}, {event.country}</span></div><span>{event.eventDate.toISOString().slice(0, 10)}</span><span className="status-dot">{event.status}</span><Link href={`/events/${event.slug}`}><ArrowUpRight size={16} /></Link></div>)}</div><div className="admin-panel admin-panel--note"><CircleAlert size={21} /><p className="section-kicker">Editorial note</p><h2>Keep the calendar trustworthy.</h2><p>Every registration link and event detail should be checked against the organizer&apos;s official source before publishing.</p><Link href="/admin/events/new" className="text-link">Add a verified event <ArrowUpRight size={15} /></Link></div></section></main></div>;
}
