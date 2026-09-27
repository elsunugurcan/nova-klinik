"use client";
import { useEffect, useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Check, ChevronLeft, ChevronRight, Clock, CalendarDays, Loader2 } from "lucide-react";
import type { Doctor, Service } from "@/db/schema";
import { bookAppointment, getAvailability, type BookingErrors } from "@/app/actions";
import { fmtDateTR, type Slot } from "@/lib/slots";
import ServiceIcon from "./ServiceIcon";
import Avatar from "./Avatar";

type Props = { services: Service[]; doctors: Doctor[]; links: { doctorId: number; serviceId: number }[]; initialService?: string; initialDoctor?: string };
const STEPS = ["Hizmet", "Hekim", "Tarih & saat", "Bilgiler"];

export default function BookingWizard({ services, doctors, links, initialService, initialDoctor }: Props) {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [service, setService] = useState<Service | null>(services.find((s) => s.slug === initialService) ?? null);
  const [doctor, setDoctor] = useState<Doctor | null>(doctors.find((d) => d.slug === initialDoctor) ?? null);
  const [dates, setDates] = useState<string[]>([]);
  const [date, setDate] = useState<string | null>(null);
  const [slots, setSlots] = useState<Slot[]>([]);
  const [time, setTime] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", email: "", note: "", kvkk: false });
  const [errors, setErrors] = useState<BookingErrors>({});
  const [pending, start] = useTransition();

  const doctorsFor = useMemo(() => (service ? doctors.filter((d) => links.some((l) => l.doctorId === d.id && l.serviceId === service.id)) : doctors), [service, doctors, links]);
  const servicesFor = useMemo(() => (doctor ? services.filter((s) => links.some((l) => l.doctorId === doctor.id && l.serviceId === s.id)) : services), [doctor, services, links]);

  // ilk adım: ön seçim varsa atla
  useEffect(() => { if (initialService && initialDoctor) setStep(2); else if (initialService || initialDoctor) setStep(initialService ? 1 : 0); }, [initialService, initialDoctor]);

  useEffect(() => {
    if (step !== 2 || !service || !doctor) return;
    let alive = true; setLoading(true);
    getAvailability(doctor.id, service.id, date ?? undefined).then((r) => { if (!alive) return; setDates(r.dates); setDate(r.date); setSlots(r.slots); setLoading(false); });
    return () => { alive = false; };
  }, [step, service, doctor, date]);

  const pick = (s: Service) => { setService(s); if (doctor && !links.some((l) => l.doctorId === doctor.id && l.serviceId === s.id)) setDoctor(null); setStep(1); };
  const pickDoctor = (d: Doctor) => { setDoctor(d); setTime(null); setDate(null); setStep(2); };
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!service || !doctor || !date || !time) return;
    start(async () => {
      const r = await bookAppointment({ serviceId: service.id, doctorId: doctor.id, date, time, name: form.name, phone: form.phone, email: form.email, note: form.note, kvkk: form.kvkk });
      if (r.ok) router.push(`/randevu/${r.code}`);
      else { setErrors(r.errors); if (r.errors.time) { setStep(2); setTime(null); setDate(null); } }
    });
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[1.35fr_1fr]">
      <div>
        <ol className="flex flex-wrap items-center gap-2 text-xs">{STEPS.map((s, i) => <li key={s} className={`flex items-center gap-2 rounded-full px-3 py-1.5 font-semibold ${i === step ? "bg-brand text-white" : i < step ? "bg-mint text-brand" : "bg-white text-stone2"}`}>{i < step ? <Check size={12} /> : <span>{i + 1}</span>} {s}</li>)}</ol>

        {step === 0 && (
          <div className="mt-6"><h2 className="font-serif text-2xl font-bold">Hangi hizmet için randevu almak istiyorsunuz?</h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">{servicesFor.map((s) => <button key={s.id} type="button" onClick={() => pick(s)} className={`card flex items-start gap-3 p-4 text-left transition hover:border-brand ${service?.id === s.id ? "!border-brand ring-2 ring-brand/20" : ""}`}><span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-mint text-brand"><ServiceIcon name={s.icon} size={18} /></span><span><span className="font-semibold">{s.name}</span><span className="mt-0.5 block text-xs text-stone2">{s.category} · {s.duration} dk</span></span></button>)}</div>
          </div>
        )}

        {step === 1 && (
          <div className="mt-6"><button type="button" onClick={() => setStep(0)} className="btn-ghost !px-2 text-xs"><ChevronLeft size={14} /> Hizmeti değiştir</button>
            <h2 className="mt-2 font-serif text-2xl font-bold">Hekim seçin</h2><p className="mt-1 text-sm text-stone2">{service?.name} için uygun hekimler</p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">{doctorsFor.map((d) => <button key={d.id} type="button" onClick={() => pickDoctor(d)} className={`card flex items-center gap-4 p-4 text-left transition hover:border-brand ${doctor?.id === d.id ? "!border-brand ring-2 ring-brand/20" : ""}`}><Avatar name={d.name} color={d.color} size={52} /><span><span className="block text-xs text-stone2">{d.title}</span><span className="font-semibold">{d.name}</span><span className="block text-xs text-ink/65">{d.specialty} · {d.experienceYears} yıl</span></span></button>)}</div>
          </div>
        )}

        {step === 2 && (
          <div className="mt-6"><button type="button" onClick={() => setStep(1)} className="btn-ghost !px-2 text-xs"><ChevronLeft size={14} /> Hekimi değiştir</button>
            <h2 className="mt-2 font-serif text-2xl font-bold">Tarih ve saat seçin</h2>
            <div className="mt-4 flex gap-2 overflow-x-auto pb-2">{dates.map((d) => { const [, , day] = d.split("-"); const on = d === date; return <button key={d} type="button" onClick={() => { setDate(d); setTime(null); }} className={`flex min-w-[68px] flex-col items-center rounded-2xl border px-3 py-2 text-xs transition ${on ? "border-brand bg-brand text-white" : "border-ink/10 bg-white hover:border-brand"}`}><span className="uppercase opacity-70">{fmtDateTR(d, { weekday: "short" })}</span><span className="text-xl font-bold">{Number(day)}</span><span className="opacity-70">{fmtDateTR(d, { month: "short" })}</span></button>; })}</div>
            {errors.time && <p className="mt-3 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{errors.time}</p>}
            <div className="mt-4 min-h-[120px]">{loading ? <div className="flex items-center gap-2 text-sm text-stone2"><Loader2 size={16} className="animate-spin" /> Uygun saatler yükleniyor…</div> : slots.length === 0 ? <p className="text-sm text-stone2">Bu gün için uygun saat yok.</p> : (
              <div className="grid grid-cols-4 gap-2 sm:grid-cols-6">{slots.map((s) => <button key={s.time} type="button" disabled={!s.available} onClick={() => setTime(s.time)} title={s.reason === "dolu" ? "Dolu" : s.reason === "gecti" ? "Geçmiş saat" : undefined} className={`rounded-xl border px-2 py-2.5 text-sm font-semibold transition ${time === s.time ? "border-brand bg-brand text-white" : s.available ? "border-ink/10 bg-white hover:border-brand" : "border-transparent bg-ink/5 text-ink/30 line-through"}`}>{s.time}</button>)}</div>
            )}</div>
            <button type="button" disabled={!time} onClick={() => setStep(3)} className="btn-primary mt-6">Devam et <ChevronRight size={16} /></button>
          </div>
        )}

        {step === 3 && (
          <form onSubmit={submit} className="mt-6"><button type="button" onClick={() => setStep(2)} className="btn-ghost !px-2 text-xs"><ChevronLeft size={14} /> Saati değiştir</button>
            <h2 className="mt-2 font-serif text-2xl font-bold">İletişim bilgileriniz</h2>
            {errors.form && <p className="mt-3 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{errors.form}</p>}
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div><label htmlFor="name" className="label">Ad Soyad</label><input id="name" className="input" aria-invalid={!!errors.name} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} autoComplete="name" />{errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}</div>
              <div><label htmlFor="phone" className="label">Telefon</label><input id="phone" className="input" aria-invalid={!!errors.phone} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="05xx xxx xx xx" inputMode="tel" autoComplete="tel" />{errors.phone && <p className="mt-1 text-xs text-red-600">{errors.phone}</p>}</div>
              <div><label htmlFor="email" className="label">E-posta (opsiyonel)</label><input id="email" className="input" type="email" aria-invalid={!!errors.email} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} autoComplete="email" />{errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}</div>
              <div><label htmlFor="note" className="label">Not (opsiyonel)</label><input id="note" className="input" value={form.note} onChange={(e) => setForm({ ...form, note: e.target.value })} placeholder="Şikâyetiniz, ilaç kullanımı, alerji…" /></div>
            </div>
            <label className="mt-4 flex items-start gap-3 text-sm"><input type="checkbox" checked={form.kvkk} onChange={(e) => setForm({ ...form, kvkk: e.target.checked })} className="mt-1 h-4 w-4 accent-brand" /><span><Link href="/kvkk" className="text-brand underline" target="_blank">KVKK aydınlatma metnini</Link> okudum; randevu ve bilgilendirme amacıyla verilerimin işlenmesini kabul ediyorum.</span></label>
            {errors.kvkk && <p className="mt-1 text-xs text-red-600">{errors.kvkk}</p>}
            <button disabled={pending} className="btn-primary mt-6 !px-8 !py-3.5 text-base">{pending ? <><Loader2 size={16} className="animate-spin" /> Kaydediliyor…</> : "Randevuyu onayla"}</button>
          </form>
        )}
      </div>

      <aside className="card h-fit p-6 lg:sticky lg:top-24">
        <div className="eyebrow">Randevu özeti</div>
        <dl className="mt-4 space-y-3 text-sm">
          <div className="flex justify-between gap-3"><dt className="text-stone2">Hizmet</dt><dd className="text-right font-semibold">{service ? `${service.name} · ${service.duration} dk` : "—"}</dd></div>
          <div className="flex justify-between gap-3"><dt className="text-stone2">Hekim</dt><dd className="text-right font-semibold">{doctor ? `${doctor.title} ${doctor.name}` : "—"}</dd></div>
          <div className="flex justify-between gap-3"><dt className="text-stone2">Tarih</dt><dd className="flex items-center gap-1 text-right font-semibold"><CalendarDays size={14} className="text-brand" />{date ? fmtDateTR(date) : "—"}</dd></div>
          <div className="flex justify-between gap-3"><dt className="text-stone2">Saat</dt><dd className="flex items-center gap-1 text-right font-semibold"><Clock size={14} className="text-brand" />{time ?? "—"}</dd></div>
        </dl>
        <ul className="mt-5 space-y-1.5 border-t border-ink/[.06] pt-4 text-xs text-stone2"><li>✓ Onay SMS ve e-posta ile gelir</li><li>✓ 24 saat öncesine kadar ücretsiz iptal</li><li>✓ Muayene öncesi ücret talep edilmez</li></ul>
      </aside>
    </div>
  );
}
