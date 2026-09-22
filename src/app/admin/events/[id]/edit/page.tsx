import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { db } from "@/lib/db";
import { EventForm } from "../../EventForm";

export default async function EditEventPage({ params }: { params: Promise<{ id: string }> }) {
  const event = await db.event.findUnique({ where: { id: (await params).id }, include: { distances: true } });
  if (!event) notFound();
  return <main className="admin-main standalone-admin"><Link href="/admin/events" className="back-link"><ArrowLeft size={15} /> Events</Link><div className="form-heading"><p className="section-kicker">Edit listing</p><h1>{event.title}.</h1><p>Update the details that runners see on Race Atlas.</p></div><EventForm event={event} /></main>;
}
