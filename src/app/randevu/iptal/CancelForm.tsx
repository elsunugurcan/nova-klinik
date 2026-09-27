"use client";
import { useState, useTransition } from "react";
import { cancelAppointment } from "@/app/actions";
export default function CancelForm() {
  const [r, setR] = useState<{ ok: boolean; error?: string } | null>(null);
  const [pending, start] = useTransition();
  return (
    <form className="card space-y-4 p-6" onSubmit={(e) => { e.preventDefault(); const fd = new FormData(e.currentTarget); start(async () => setR(await cancelAppointment(String(fd.get("code")), String(fd.get("phone"))))); }}>
      <div><label htmlFor="code" className="label">Randevu kodu</label><input id="code" name="code" className="input font-mono uppercase" placeholder="NK-XXXXXX" required /></div>
      <div><label htmlFor="cphone" className="label">Telefon</label><input id="cphone" name="phone" className="input" placeholder="05xx xxx xx xx" required /></div>
      <button disabled={pending || r?.ok} className="btn-primary w-full">{pending ? "İptal ediliyor…" : "Randevuyu iptal et"}</button>
      {r && (r.ok ? <p className="rounded-xl bg-mint px-4 py-3 text-sm text-brand">Randevunuz iptal edildi. Yeni randevu için online sistemi kullanabilirsiniz.</p> : <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{r.error}</p>)}
    </form>
  );
}
