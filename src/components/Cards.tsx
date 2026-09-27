import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import type { Doctor, Service } from "@/db/schema";
import ServiceIcon from "./ServiceIcon";
import Avatar from "./Avatar";

export function ServiceCard({ s }: { s: Service }) {
  return (
    <Link href={`/hizmetler/${s.slug}`} className="card group flex flex-col p-6 transition hover:-translate-y-1 hover:shadow-xl">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-mint text-brand"><ServiceIcon name={s.icon} /></div>
      <div className="mt-4 text-xs font-semibold uppercase tracking-wider text-stone2">{s.category}</div>
      <h3 className="mt-1 font-serif text-xl font-bold">{s.name}</h3>
      <p className="mt-2 text-sm text-ink/65">{s.summary}</p>
      <div className="mt-auto flex items-center justify-between pt-5 text-sm"><span className="flex items-center gap-1 text-stone2"><Clock size={14} /> {s.duration} dk</span><span className="flex items-center gap-1 font-semibold text-brand">İncele <ArrowRight size={14} className="transition group-hover:translate-x-1" /></span></div>
    </Link>
  );
}
export function DoctorCard({ d }: { d: Doctor }) {
  return (
    <Link href={`/hekimler/${d.slug}`} className="card group flex items-center gap-4 p-5 transition hover:-translate-y-1 hover:shadow-xl">
      <Avatar name={d.name} color={d.color} size={64} />
      <div className="min-w-0"><div className="text-xs text-stone2">{d.title}</div><h3 className="font-serif text-lg font-bold leading-tight">{d.name}</h3><div className="mt-1 truncate text-sm text-ink/65">{d.specialty}</div><div className="mt-1 text-xs text-brand">{d.experienceYears} yıl deneyim</div></div>
    </Link>
  );
}
