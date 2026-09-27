import { MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import SectionHead from "@/components/SectionHead";
import { SITE } from "@/lib/site";
export const metadata = { title: "İletişim", description: "Nova Klinik Adana iletişim, adres, çalışma saatleri ve mesaj formu." };
export default function Page() {
  return (
    <section className="container-x py-12"><div className="grid gap-10 md:grid-cols-[1fr_1.4fr]">
      <div><SectionHead eyebrow="İletişim" title="Bize ulaşın" text="Sorularınız için yazın; randevu almak için online sistemi kullanabilirsiniz." />
        <ul className="mt-8 space-y-4 text-sm">{[[MapPin, SITE.address], [Phone, SITE.phone], [Mail, SITE.email], [Clock, SITE.hours], [MessageCircle, "WhatsApp: 7/24 danışma hattı"]].map(([I, t]) => { const Icon = I as typeof MapPin; return <li key={t as string} className="flex items-start gap-3"><span className="rounded-xl bg-mint p-2 text-brand"><Icon size={18} /></span><span className="pt-1.5">{t as string}</span></li>; })}</ul>
        <div className="card mt-8 overflow-hidden"><div className="relative h-52 bg-[linear-gradient(135deg,#ccfbf1,#f0fdfa)]"><svg viewBox="0 0 400 200" className="absolute inset-0 h-full w-full" aria-hidden><path d="M0 120 C80 100 120 160 200 140 S320 80 400 100" stroke="#0f766e" strokeWidth="6" fill="none" opacity=".35" /><path d="M0 60 C100 70 150 30 260 50 S360 90 400 60" stroke="#0f766e" strokeWidth="3" fill="none" opacity=".2" /><circle cx="210" cy="118" r="10" fill="#0f766e" /><circle cx="210" cy="118" r="20" fill="#0f766e" opacity=".2" /></svg><div className="absolute bottom-3 left-3 rounded-xl bg-white/90 px-3 py-2 text-xs font-semibold">Çınarlı, Seyhan · Atatürk Cad. No:12</div></div></div>
      </div>
      <ContactForm />
    </div></section>
  );
}
