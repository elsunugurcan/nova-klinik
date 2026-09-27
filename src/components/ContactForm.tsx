"use client";
import { useState, useTransition } from "react";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { sendMessage, type BookingErrors } from "@/app/actions";
export default function ContactForm() {
  const [errors, setErrors] = useState<BookingErrors>({});
  const [done, setDone] = useState(false);
  const [pending, start] = useTransition();
  if (done) return <div className="card p-10 text-center"><CheckCircle2 size={48} className="mx-auto text-brand" /><h3 className="mt-3 font-serif text-2xl font-bold">Mesajınız ulaştı</h3><p className="mt-1 text-sm text-ink/65">Çalışma saatleri içinde en geç 2 saat içinde dönüş yapıyoruz.</p></div>;
  return (
    <form className="card grid gap-4 p-6 sm:grid-cols-2" onSubmit={(e) => { e.preventDefault(); const fd = new FormData(e.currentTarget); start(async () => { const r = await sendMessage({ name: fd.get("name"), email: fd.get("email"), phone: fd.get("phone"), subject: fd.get("subject"), body: fd.get("body"), kvkk: fd.get("kvkk") === "on" }); if (r.ok) setDone(true); else setErrors(r.errors); }); }}>
      <div><label htmlFor="mname" className="label">Ad Soyad</label><input id="mname" name="name" className="input" aria-invalid={!!errors.name} />{errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}</div>
      <div><label htmlFor="memail" className="label">E-posta</label><input id="memail" name="email" type="email" className="input" aria-invalid={!!errors.email} />{errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}</div>
      <div><label htmlFor="mphone" className="label">Telefon (opsiyonel)</label><input id="mphone" name="phone" className="input" /></div>
      <div><label htmlFor="msubject" className="label">Konu</label><input id="msubject" name="subject" className="input" aria-invalid={!!errors.subject} />{errors.subject && <p className="mt-1 text-xs text-red-600">{errors.subject}</p>}</div>
      <div className="sm:col-span-2"><label htmlFor="mbody" className="label">Mesaj</label><textarea id="mbody" name="body" rows={5} className="input" aria-invalid={!!errors.body} />{errors.body && <p className="mt-1 text-xs text-red-600">{errors.body}</p>}</div>
      <label className="flex items-start gap-3 text-sm sm:col-span-2"><input type="checkbox" name="kvkk" className="mt-1 h-4 w-4 accent-brand" /><span><Link href="/kvkk" className="text-brand underline" target="_blank">KVKK aydınlatma metnini</Link> okudum, kabul ediyorum.</span></label>
      {errors.kvkk && <p className="-mt-2 text-xs text-red-600 sm:col-span-2">{errors.kvkk}</p>}
      <button disabled={pending} className="btn-primary sm:col-span-2">{pending ? "Gönderiliyor…" : "Gönder"}</button>
    </form>
  );
}
