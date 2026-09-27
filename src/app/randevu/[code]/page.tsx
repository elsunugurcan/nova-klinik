import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckCircle2, CalendarDays, Clock, MapPin, Phone } from "lucide-react";
import { db, schema } from "@/db";
import { eq } from "drizzle-orm";
import { fmtDateTR } from "@/lib/slots";
import { SITE } from "@/lib/site";
import Avatar from "@/components/Avatar";

export const dynamic = "force-dynamic";
export const metadata = { title: "Randevu onayı", robots: { index: false } };
const STATUS: Record<string, [string, string]> = { bekliyor: ["Onay bekliyor", "bg-amber-100 text-amber-800"], onaylandi: ["Onaylandı", "bg-mint text-brand"], tamamlandi: ["Tamamlandı", "bg-ink/10 text-ink"], iptal: ["İptal edildi", "bg-red-100 text-red-700"] };

export default function Page({ params }: { params: { code: string } }) {
  const a = db.select().from(schema.appointments).where(eq(schema.appointments.code, params.code)).get();
  if (!a) notFound();
  const s = db.select().from(schema.services).where(eq(schema.services.id, a.serviceId)).get()!;
  const d = db.select().from(schema.doctors).where(eq(schema.doctors.id, a.doctorId)).get()!;
  const [label, cls] = STATUS[a.status] ?? STATUS.bekliyor;
  return (
    <section className="container-x py-12"><div className="mx-auto max-w-2xl">
      <div className="card p-8 text-center"><CheckCircle2 size={56} className="mx-auto text-brand" /><h1 className="mt-4 font-serif text-3xl font-bold">Randevunuz alındı{a.name ? `, ${a.name.split(" ")[0]}` : ""}.</h1><p className="mt-2 text-ink/65">Onay mesajı <b>{a.phone}</b> numarasına SMS ile gönderildi. Randevu kodunuzu saklayın.</p><div className="mt-4 inline-flex items-center gap-3 rounded-full bg-sand px-4 py-2 text-sm">Kod <b className="font-mono text-lg">{a.code}</b><span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${cls}`}>{label}</span></div></div>
      <div className="card mt-5 grid gap-5 p-6 sm:grid-cols-2">
        <div className="flex items-center gap-3"><Avatar name={d.name} color={d.color} size={48} /><div><div className="text-xs text-stone2">{d.title}</div><div className="font-semibold">{d.name}</div><div className="text-xs text-ink/65">{s.name} · {a.duration} dk</div></div></div>
        <div className="space-y-1.5 text-sm"><div className="flex items-center gap-2"><CalendarDays size={16} className="text-brand" /> {fmtDateTR(a.date, { day: "numeric", month: "long", year: "numeric", weekday: "long" })}</div><div className="flex items-center gap-2"><Clock size={16} className="text-brand" /> {a.time}</div><div className="flex items-start gap-2"><MapPin size={16} className="mt-0.5 shrink-0 text-brand" /> {SITE.address}</div></div>
      </div>
      <div className="card mt-5 p-6 text-sm text-ink/70"><b className="text-ink">Randevu öncesi</b><ul className="mt-2 list-disc space-y-1 pl-5"><li>Lütfen 10 dakika önce gelin; ilk gelişte kimlik gerekir.</li><li>Kullandığınız ilaçları ve alerjilerinizi hekiminize bildirin.</li><li>Lazer ve cilt uygulamalarında işlem günü makyaj, krem ve parfüm kullanmayın.</li></ul></div>
      <div className="mt-6 flex flex-wrap justify-center gap-3"><Link href="/" className="btn-primary">Ana sayfa</Link><Link href="/randevu/iptal" className="btn-outline">Randevuyu iptal et</Link><a href={`tel:${SITE.phoneHref}`} className="btn-ghost"><Phone size={16} /> {SITE.phone}</a></div>
    </div></section>
  );
}
