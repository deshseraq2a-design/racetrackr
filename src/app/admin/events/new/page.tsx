import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { EventForm } from "../EventForm";

export default function NewEventPage() { return <main className="admin-main standalone-admin"><Link href="/admin/events" className="back-link"><ArrowLeft size={15} /> Events</Link><div className="form-heading"><p className="section-kicker">New listing</p><h1>Add an event.</h1><p>Keep the details accurate. Every field is reviewed before publication.</p></div><EventForm /></main>; }
