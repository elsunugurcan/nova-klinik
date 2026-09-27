"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X, Phone, CalendarCheck } from "lucide-react";
import Logo from "./Logo";
import { SITE } from "@/lib/site";

const links = [["/hizmetler", "Hizmetler"], ["/hekimler", "Hekimlerimiz"], ["/blog", "Blog"], ["/hakkimizda", "Hakkımızda"], ["/iletisim", "İletişim"]];

export default function Navbar() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  useEffect(() => setOpen(false), [path]);
  return (
    <header className="sticky top-0 z-40 border-b border-ink/[.06] bg-sand/85 backdrop-blur">
      <div className="container-x flex h-[72px] items-center justify-between">
        <Logo />
        <nav className="hidden items-center gap-1 lg:flex">
          {links.map(([h, l]) => <Link key={h} href={h} className={`rounded-full px-4 py-2 text-sm font-medium transition ${path.startsWith(h) ? "bg-brand/10 text-brand" : "text-ink/75 hover:bg-ink/5 hover:text-ink"}`}>{l}</Link>)}
        </nav>
        <div className="hidden items-center gap-2 lg:flex">
          <a href={`tel:${SITE.phoneHref}`} className="btn-ghost text-sm"><Phone size={16} /> {SITE.phone}</a>
          <Link href="/randevu" className="btn-primary"><CalendarCheck size={16} /> Online Randevu</Link>
        </div>
        <div className="flex items-center gap-1 lg:hidden">
          <Link href="/randevu" className="btn-primary !px-4 !py-2 text-xs">Randevu</Link>
          <button onClick={() => setOpen(!open)} className="rounded-full p-2.5" aria-label="Menü">{open ? <X /> : <Menu />}</button>
        </div>
      </div>
      {open && (
        <nav className="container-x flex flex-col gap-1 pb-4 lg:hidden">
          {links.map(([h, l]) => <Link key={h} href={h} className="rounded-xl px-4 py-3 font-medium hover:bg-ink/5">{l}</Link>)}
          <a href={`tel:${SITE.phoneHref}`} className="rounded-xl px-4 py-3 font-medium text-brand">{SITE.phone}</a>
        </nav>
      )}
    </header>
  );
}
