import { db, schema } from "@/db";
import { desc, sql } from "drizzle-orm";
import { fmtDateTR, toISODate } from "@/lib/slots";
import { setStatus } from "./actions";
export const dynamic = "force-dynamic";
const STATUSES = [["bekliyor", "Onay bekliyor"], ["onaylandi", "Onaylandı"], ["tamamlandi", "Tamamlandı"], ["iptal", "İptal"]];
const CLS: Record<string, string> = { bekliyor: "bg-amber-100 text-amber-800", onaylandi: "bg-mint text-brand", tamamlandi: "bg-ink/10", iptal: "bg-red-100 text-red-700" };
export default function Page({ searchParams }: { searchParams: { gun?: string } }) {
  const day = searchParams.gun ?? toISODate(new Date());
  const all = db.select().from(schema.appointments).orderBy(desc(schema.appointments.date), schema.appointments.time).all();
  const list = searchParams.gun === "tumu" ? all : all.filter((a) => a.date === day);
  const doctors = db.select().from(schema.doctors).all(), services = db.select().from(schema.services).all();
  const stats = db.select({ n: sql<number>`count(*)`, bekleyen: sql<number>`sum(status = 'bekliyor')` }).from(schema.appointments).get()!;
  const unread = db.select({ n: sql<number>`count(*)` }).from(schema.messages).where(sql`is_read = 0`).get()!;
  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-3">{[["Toplam randevu", stats.n], ["Onay bekleyen", stats.bekleyen ?? 0], ["Okunmamış mesaj", unread.n]].map(([a, b]) => <div key={a as string} className="card p-5"><div className="text-xs text-stone2">{a as string}</div><div className="mt-1 font-serif text-3xl font-bold">{b as number}</div></div>)}</div>
      <form className="mt-6 flex flex-wrap items-center gap-2 text-sm"><label htmlFor="gun" className="text-stone2">Gün</label><input id="gun" type="date" name="gun" defaultValue={searchParams.gun === "tumu" ? "" : day} className="input !w-auto !py-2" /><button className="btn-outline !py-2">Göster</button><a href="/admin?gun=tumu" className="btn-ghost !py-2">Tümü</a></form>
      <div className="card mt-4 overflow-x-auto"><table className="w-full text-sm"><thead className="text-left text-xs uppercase text-stone2"><tr>{["Kod", "Tarih", "Danışan", "Hekim", "Hizmet", "Durum"].map((h) => <th key={h} className="px-4 py-3">{h}</th>)}</tr></thead><tbody>
        {list.length === 0 && <tr><td colSpan={6} className="px-4 py-10 text-center text-stone2">Bu gün için randevu yok.</td></tr>}
        {list.map((a) => <tr key={a.id} className="border-t border-ink/[.06] align-top"><td className="px-4 py-3 font-mono font-semibold">{a.code}</td><td className="px-4 py-3">{fmtDateTR(a.date, { day: "numeric", month: "short" })}<br /><b>{a.time}</b> · {a.duration} dk</td><td className="px-4 py-3">{a.name}<div className="text-xs text-stone2">{a.phone}{a.email ? ` · ${a.email}` : ""}</div>{a.note && <div className="mt-1 text-xs italic text-ink/60">“{a.note}”</div>}</td><td className="px-4 py-3">{doctors.find((d) => d.id === a.doctorId)?.name}</td><td className="px-4 py-3">{services.find((s) => s.id === a.serviceId)?.name}</td><td className="px-4 py-3"><form action={async (fd) => { "use server"; await setStatus(a.id, String(fd.get("status"))); }} className="flex gap-1"><select name="status" defaultValue={a.status} className={`input !w-auto !py-1.5 text-xs ${CLS[a.status]}`}>{STATUSES.map(([v, l]) => <option key={v} value={v}>{l}</option>)}</select><button className="btn-primary !px-3 !py-1.5 text-xs">Kaydet</button></form></td></tr>)}
      </tbody></table></div>
    </div>
  );
}
