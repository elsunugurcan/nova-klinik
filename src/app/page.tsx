import Link from "next/link";
import { ArrowRight, ShieldCheck, Award, Clock, Sparkles, CalendarCheck, MapPin } from "lucide-react";
import { allDoctors, allPosts, allServices } from "@/lib/queries";
import { ServiceCard, DoctorCard } from "@/components/Cards";
import SectionHead from "@/components/SectionHead";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import Avatar from "@/components/Avatar";
import { SITE } from "@/lib/site";

export const dynamic = "force-dynamic";

const FAQS = [
  { q: "Randevu almadan gelebilir miyim?", a: "Muayene ve uygulamalar randevu ile planlanır. Online randevu sistemimizden 2 dakikada uygun saati seçebilir, WhatsApp'tan da yazabilirsiniz." },
  { q: "İlk görüşme ücretli mi?", a: "Saç ekimi ve estetik uygulamalarda ön görüşme ve analiz ücretsizdir; dermatoloji muayenesi ücretlidir." },
  { q: "Uygulamalar kimler tarafından yapılıyor?", a: "Tüm tıbbi uygulamalar uzman hekimlerimiz tarafından, Sağlık Bakanlığı onaylı cihaz ve ürünlerle yapılır." },
  { q: "Randevumu nasıl iptal ederim?", a: "Randevu kodunuz ve telefon numaranızla 'Randevu iptali' sayfasından anında iptal edebilirsiniz; 24 saat öncesine kadar ücretsizdir." },
];

export default function Home() {
  const services = allServices(), doctors = allDoctors(), posts = allPosts().slice(0, 3);
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(60%_60%_at_80%_20%,rgba(15,118,110,.14),transparent_60%),radial-gradient(40%_40%_at_10%_80%,rgba(204,251,241,.8),transparent_60%)]" />
        <div className="container-x grid items-center gap-12 py-16 md:grid-cols-[1.1fr_1fr] md:py-24">
          <div className="rise">
            <span className="chip"><ShieldCheck size={14} className="text-brand" /> Sağlık Bakanlığı ruhsatlı poliklinik</span>
            <h1 className="mt-5 font-serif text-4xl font-bold leading-[1.08] tracking-tight md:text-6xl">Cildiniz için <em className="text-brand">bilimsel</em>, sizin için doğal sonuçlar.</h1>
            <p className="mt-5 max-w-xl text-lg text-ink/65">Dermatoloji, lazer, estetik ve saç ekimi. Uzman hekim kadrosu, kişiye özel planlama ve ücretsiz kontrol randevularıyla Adana&apos;da 25 yıldır yanınızdayız.</p>
            <div className="mt-8 flex flex-wrap gap-3"><Link href="/randevu" className="btn-primary !px-6 !py-3.5 text-base"><CalendarCheck size={18} /> Online randevu al</Link><Link href="/hizmetler" className="btn-outline !px-6 !py-3.5 text-base">Hizmetleri incele <ArrowRight size={16} /></Link></div>
            <dl className="mt-10 grid grid-cols-3 gap-4">{[["25+", "Yıl deneyim"], ["12", "Uzman hekim"], ["4.9", "Google puanı"]].map(([v, l]) => <div key={l}><dt className="font-serif text-3xl font-bold text-brand">{v}</dt><dd className="text-xs text-stone2">{l}</dd></div>)}</dl>
          </div>
          <div className="relative rise" style={{ animationDelay: ".15s" }}>
            <div className="card overflow-hidden p-2"><div className="rounded-[20px] bg-gradient-to-br from-mint via-white to-teal-50 p-8">
              <div className="flex items-center justify-between"><span className="chip">Bugün müsait</span><span className="text-xs text-stone2">Çınarlı, Seyhan</span></div>
              <div className="mt-6 space-y-3">{doctors.slice(0, 3).map((d, i) => <div key={d.id} className="flex items-center gap-3 rounded-2xl bg-white/80 p-3 shadow-soft"><Avatar name={d.name} color={d.color} size={44} /><div className="min-w-0 flex-1"><div className="text-sm font-semibold">{d.title} {d.name}</div><div className="text-xs text-stone2">{d.specialty}</div></div><span className="rounded-full bg-mint px-2.5 py-1 text-xs font-semibold text-brand">{["10:30", "14:00", "16:30"][i]}</span></div>)}</div>
              <Link href="/randevu" className="btn-primary mt-5 w-full">Uygun saati seç</Link>
            </div></div>
            <div className="card absolute -left-4 -bottom-5 hidden items-center gap-3 px-4 py-3 md:flex"><Award className="text-brand" /><div className="text-xs"><b>Ücretsiz kontrol randevusu</b><br /><span className="text-stone2">Her uygulama sonrası</span></div></div>
          </div>
        </div>
      </section>

      <section className="container-x -mt-2 grid gap-4 md:grid-cols-4">
        {[[ShieldCheck, "Ruhsatlı klinik", "Sağlık Bakanlığı denetiminde"], [Award, "Uzman kadro", "Dermatolog ve plastik cerrah"], [Sparkles, "Onaylı ürün ve cihaz", "CE ve Bakanlık onaylı"], [Clock, "Aynı hafta randevu", "Online, 2 dakikada"]].map(([I, t, d]) => { const Icon = I as typeof ShieldCheck; return <div key={t as string} className="flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-soft"><Icon className="shrink-0 text-brand" size={22} /><div><div className="text-sm font-semibold">{t as string}</div><div className="text-xs text-stone2">{d as string}</div></div></div>; })}
      </section>

      <section className="container-x mt-24">
        <div className="flex flex-wrap items-end justify-between gap-4"><SectionHead eyebrow="Hizmetlerimiz" title="Uzmanlık alanlarımız" text="Her uygulama, muayene ile başlar; cilt tipinize ve beklentinize göre planlanır." /><Link href="/hizmetler" className="btn-outline">Tüm hizmetler <ArrowRight size={16} /></Link></div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{services.map((s) => <ServiceCard key={s.id} s={s} />)}</div>
      </section>

      <section className="container-x mt-24 grid items-center gap-12 md:grid-cols-2">
        <div><SectionHead eyebrow="Neden Nova?" title="Güven, şeffaflık ve takip" /><ul className="mt-6 space-y-4">{[["Muayene olmadan uygulama yok", "Her işlem öncesi hekim değerlendirmesi ve yazılı bilgilendirme."], ["Fotoğraflı ilerleme takibi", "Standart ışıkta çekilen kayıtlarla sonucu birlikte izleriz."], ["Ücretsiz kontrol", "Her uygulama sonrası kontrol randevusu ve 7/24 WhatsApp hattı."], ["Şeffaf planlama", "Seans sayısı, süre ve beklenen sonuç ilk görüşmede netleşir."]].map(([t, d]) => <li key={t} className="flex gap-3"><span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-mint text-brand"><ShieldCheck size={14} /></span><div><div className="font-semibold">{t}</div><div className="text-sm text-ink/65">{d}</div></div></li>)}</ul></div>
        <div className="card p-8"><div className="eyebrow">Süreç</div><ol className="mt-4 space-y-5">{[["Online randevu", "Hizmet, hekim ve saati 2 dakikada seçin."], ["Muayene & plan", "Cilt analizi, beklentiler ve yazılı plan."], ["Uygulama", "Uzman hekim, onaylı ürün, konforlu ortam."], ["Kontrol & takip", "Ücretsiz kontrol randevusu, fotoğraflı takip."]].map(([t, d], i) => <li key={t} className="flex gap-4"><span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand font-serif font-bold text-white">{i + 1}</span><div><div className="font-semibold">{t}</div><div className="text-sm text-ink/65">{d}</div></div></li>)}</ol></div>
      </section>

      <section className="container-x mt-24">
        <div className="flex flex-wrap items-end justify-between gap-4"><SectionHead eyebrow="Hekimlerimiz" title="Alanında uzman, deneyimli kadro" /><Link href="/hekimler" className="btn-outline">Tüm hekimler <ArrowRight size={16} /></Link></div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{doctors.map((d) => <DoctorCard key={d.id} d={d} />)}</div>
      </section>

      <section className="container-x mt-24"><SectionHead eyebrow="Danışan yorumları" title="Bize güvenenler ne diyor?" center /><div className="mt-10"><Testimonials /></div></section>

      <section className="container-x mt-24 grid gap-10 md:grid-cols-[1fr_1.2fr]">
        <div><SectionHead eyebrow="Sık sorulanlar" title="Merak edilenler" /><div className="mt-6"><FAQ items={FAQS} /></div></div>
        <div><SectionHead eyebrow="Blog" title="Hekimlerimizden rehberler" /><div className="mt-6 space-y-4">{posts.map((p) => <Link key={p.id} href={`/blog/${p.slug}`} className="card block p-5 transition hover:-translate-y-0.5"><div className="text-xs text-stone2">{new Date(p.publishedAt).toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" })} · {p.tags.join(", ")}</div><h3 className="mt-1 font-serif text-lg font-bold">{p.title}</h3><p className="mt-1 text-sm text-ink/65">{p.excerpt}</p></Link>)}</div></div>
      </section>

      <section className="container-x mt-24"><div className="card grid items-center gap-8 overflow-hidden bg-brand p-8 text-white md:grid-cols-[1.3fr_1fr] md:p-14"><div><div className="text-xs font-semibold uppercase tracking-[0.25em] text-teal-200">Randevu</div><h2 className="mt-2 font-serif text-3xl font-bold md:text-4xl">Uygun saati şimdi seçin, aynı hafta görüşelim.</h2><p className="mt-3 text-white/75">Online randevu sistemimiz hekimlerimizin güncel programını gösterir; onay SMS ile gelir.</p><div className="mt-6 flex flex-wrap gap-3"><Link href="/randevu" className="btn bg-white text-brand hover:bg-teal-50">Online randevu al</Link><a href={`https://wa.me/${SITE.whatsapp}`} className="btn border border-white/30 text-white hover:bg-white/10">WhatsApp&apos;tan yaz</a></div></div><div className="rounded-2xl bg-white/10 p-6 text-sm"><div className="flex items-start gap-2"><MapPin size={18} className="mt-0.5 shrink-0 text-teal-200" /><div>{SITE.address}<br /><span className="text-white/70">{SITE.hours}</span></div></div><div className="mt-3 flex items-center gap-2"><Clock size={18} className="text-teal-200" /> Ortalama bekleme süresi: 6 dk</div></div></div></section>
    </>
  );
}
