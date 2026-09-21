import Link from "next/link";
import { Compass, Menu, Search } from "lucide-react";

export function SiteHeader() {
  return (
    <header className="site-header">
      <Link href="/" className="brand"><span className="brand-mark"><Compass size={21} /></span><span>Race<span>Atlas</span></span></Link>
      <nav className="main-nav" aria-label="Primary navigation">
        <Link href="/events">Find Events</Link>
        <Link href="/events?type=Marathon">Marathons</Link>
        <Link href="/events?type=Half%20Marathon">Half Marathons</Link>
        <Link href="/calendar">Calendar</Link>
        <Link href="/about">About</Link>
      </nav>
      <div className="header-actions"><Link href="/events" className="icon-button" aria-label="Search events"><Search size={19} /></Link><Link href="/admin" className="header-cta">Admin <span>↗</span></Link><button className="mobile-menu" aria-label="Open menu"><Menu size={21} /></button></div>
    </header>
  );
}
