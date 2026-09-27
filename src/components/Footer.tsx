import Link from "next/link";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import Logo from "./Logo";
import { SITE } from "@/lib/site";
import { allServices } from "@/lib/queries";

export default function Footer() {
  const services = allServices();
  return (
    <footer className="mt-28 bg-ink text-white/80">
      <div className="container-x grid gap-10 py-16 md:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <div><Logo light /><p className="mt-4 max-w-sm text-sm text-white/60">Sağlık Bakanlığı ruhsatlı polikliniğimizde dermatoloji ve estetik uygulamaları, uzman hekim kontrolünde ve kanıta dayalı protokollerle yapılır.</p>
          <div className="mt-5 flex gap-2"><a href={`https://wa.me/${SITE.whatsapp}`} className="chip !border-white/15 !bg-white/5 !text-white/80">WhatsApp</a><Link href="/randevu" className="chip !border-white/15 !bg-white/5 !text-white/80">Online randevu</Link></div></div>
        <div><div className="mb-3 text-xs font-semibold uppercase tracking-wider text-white/40">Hizmetler</div><ul className="space-y-2 text-sm">{services.map((s) => <li key={s.id}><Link href={`/hizmetler/${s.slug}`} className="hover:text-white">{s.name}</Link></li>)}</ul></div>
        <div><div className="mb-3 text-xs font-semibold uppercase tracking-wider text-white/40">Klinik</div><ul className="space-y-2 text-sm">{[["/hekimler", "Hekimlerimiz"], ["/hakkimizda", "Hakkımızda"], ["/blog", "Blog"], ["/iletisim", "İletişim"], ["/randevu/iptal", "Randevu iptali"], ["/kvkk", "KVKK Aydınlatma"], ["/admin", "Yönetim"]].map(([h, l]) => <li key={h}><Link href={h} className="hover:text-white">{l}</Link></li>)}</ul></div>
        <div><div className="mb-3 text-xs font-semibold uppercase tracking-wider text-white/40">İletişim</div><ul className="space-y-2.5 text-sm"><li className="flex gap-2"><MapPin size={16} className="mt-0.5 shrink-0 text-teal-300" />{SITE.address}</li><li className="flex gap-2"><Phone size={16} className="text-teal-300" /><a href={`tel:${SITE.phoneHref}`}>{SITE.phone}</a></li><li className="flex gap-2"><Mail size={16} className="text-teal-300" /><a href={`mailto:${SITE.email}`}>{SITE.email}</a></li><li className="flex gap-2"><Clock size={16} className="text-teal-300" />{SITE.hours}</li></ul></div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs text-white/40">© {new Date().getFullYear()} {SITE.name} · Bu site bir konsept projedir; klinik, hekimler ve iletişim bilgileri kurgusaldır. Tasarım ve yazılım: uurstudio</div>
    </footer>
  );
}
