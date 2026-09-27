import { Star } from "lucide-react";
const ITEMS = [
  { name: "Ayşe D.", text: "Lazer epilasyonda 6 seans sonunda gerçekten kalıcı sonuç aldım. Her seansta cilt tipime göre ayar yapılması güven verdi.", service: "Lazer Epilasyon" },
  { name: "Burak K.", text: "Saç ekimi için üç klinik gezdim; burada planlamanın netliği ve 12 aylık takip programı karar verdirdi. 8. ayda sonuç harika.", service: "Saç Ekimi" },
  { name: "Melis A.", text: "Dudak dolgusunda 'abartı olmasın' dedim, tam istediğim gibi doğal oldu. Kontrol randevusunun ücretsiz olması da çok iyi.", service: "Dolgu" },
];
export default function Testimonials() {
  return (
    <div className="grid gap-5 md:grid-cols-3">
      {ITEMS.map((t) => <figure key={t.name} className="card p-6"><div className="flex gap-0.5 text-amber-400">{Array.from({ length: 5 }, (_, i) => <Star key={i} size={14} fill="currentColor" />)}</div><blockquote className="mt-3 text-sm text-ink/75">“{t.text}”</blockquote><figcaption className="mt-4 text-xs"><b>{t.name}</b> <span className="text-stone2">· {t.service}</span></figcaption></figure>)}
    </div>
  );
}
