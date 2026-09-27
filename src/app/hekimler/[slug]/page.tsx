import Link from "next/link";
import { notFound } from "next/navigation";
import { CalendarCheck, GraduationCap, Languages, ChevronRight } from "lucide-react";
import { getDoctor, servicesForDoctor, schedulesForDoctor } from "@/lib/queries";
import Avatar from "@/components/Avatar";
import JsonLd from "@/components/JsonLd";
import { WEEKDAYS_TR } from "@/lib/slots";
import { abs } from "@/lib/site";

export const dynamic = "force-dynamic";
export function generateMetadata({ params }: { params: { slug: string } }) { const d = getDoctor(params.slug); return d ? { title: `${d.title} ${d.name} — ${d.specialty}`, description: d.bio } : { title: "Hekim" }; }
export default function Page({ params }: { params: { slug: string } }) {
  const d = getDoctor(params.slug);
  if (!d) notFound();
  const services = servicesForDoctor(d.id), sched = schedulesForDoctor(d.id).sort((a, b) => a.weekday - b.weekday);
  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "Physician", name: `${d.title} ${d.name}`, medicalSpecialty: d.specialty, url: abs(`/hekimler/${d.slug}`), worksFor: { "@id": abs("/#clinic") }, knowsLanguage: d.languages.split(", ") }} />
      <section className="container-x py-10">
        <nav className="flex items-center gap-1 text-xs text-stone2"><Link href="/">Ana sayfa</Link><ChevronRight size={12} /><Link href="/hekimler">Hekimlerimiz</Link><ChevronRight size={12} /><span className="text-ink">{d.name}</span></nav>
        <div className="mt-6 grid gap-10 lg:grid-cols-[1.5fr_1fr]">
          <div>
            <div className="flex items-center gap-5"><Avatar name={d.name} color={d.color} size={96} /><div><div className="text-sm text-stone2">{d.title}</div><h1 className="font-serif text-4xl font-bold">{d.name}</h1><div className="mt-1 text-brand">{d.specialty} · {d.experienceYears} yıl deneyim</div></div></div>
            <p className="mt-6 text-lg text-ink/70">{d.bio}</p>
            <div className="mt-8 grid gap-5 sm:grid-cols-2"><div className="card p-5"><div className="flex items-center gap-2 font-semibold"><GraduationCap size={18} className="text-brand" /> Eğitim</div><ul className="mt-3 space-y-1.5 text-sm text-ink/70">{d.education.map((e) => <li key={e}>• {e}</li>)}</ul></div><div className="card p-5"><div className="flex items-center gap-2 font-semibold"><Languages size={18} className="text-brand" /> Diller</div><p className="mt-3 text-sm text-ink/70">{d.languages}</p></div></div>
            <h2 className="mt-10 font-serif text-2xl font-bold">Verdiği hizmetler</h2><div className="mt-4 flex flex-wrap gap-2">{services.map((s) => <Link key={s.id} href={`/hizmetler/${s.slug}`} className="chip py-2 hover:border-brand">{s.name}</Link>)}</div>
          </div>
          <aside className="card h-fit p-6 lg:sticky lg:top-24"><div className="eyebrow">Çalışma programı</div><ul className="mt-3 divide-y divide-ink/[.06] text-sm">{sched.map((s) => <li key={s.id} className="flex justify-between py-2"><span>{WEEKDAYS_TR[s.weekday]}</span><span className="font-semibold">{s.start} – {s.end}{s.breakStart ? <span className="ml-1 text-xs font-normal text-stone2">(mola {s.breakStart}–{s.breakEnd})</span> : null}</span></li>)}</ul><Link href={`/randevu?hekim=${d.slug}`} className="btn-primary mt-5 w-full"><CalendarCheck size={16} /> {d.name} ile randevu</Link></aside>
        </div>
      </section>
    </>
  );
}
