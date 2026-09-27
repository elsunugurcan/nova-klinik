import { ShieldCheck, HeartHandshake, Microscope, Users } from "lucide-react";
import SectionHead from "@/components/SectionHead";
import { allDoctors } from "@/lib/queries";
import { DoctorCard } from "@/components/Cards";
export const dynamic = "force-dynamic";
export const metadata = { title: "Hakkımızda", description: "Nova Klinik: 2001'den bu yana Adana'da dermatoloji ve estetik. Ruhsatlı poliklinik, uzman kadro, kanıta dayalı uygulamalar." };
export default function Page() {
  return (
    <section className="container-x py-12">
      <SectionHead eyebrow="Hakkımızda" title="2001'den bu yana Adana'da güvenilir dermatoloji ve estetik" text="Nova Klinik, tek bir dermatoloji muayenehanesi olarak başladı; bugün 12 uzman hekim, 4 lazer sistemi ve saç ekimi merkeziyle Sağlık Bakanlığı ruhsatlı bir poliklinik olarak hizmet veriyor." />
      <div className="mt-10 grid gap-5 md:grid-cols-4">{[[ShieldCheck, "Ruhsat ve denetim", "Sağlık Bakanlığı ruhsatlı poliklinik; tüm cihazlar kalibrasyonlu, ürünler onaylı."], [Microscope, "Kanıta dayalı", "Uygulamalarımız güncel dermatoloji ve estetik cerrahi literatürünü takip eder."], [HeartHandshake, "Şeffaf iletişim", "Yazılı bilgilendirme, gerçekçi beklenti, sürpriz maliyet yok."], [Users, "25.000+ danışan", "Adana ve çevre illerden, %92'si tavsiye ile geliyor."]].map(([I, t, d]) => { const Icon = I as typeof ShieldCheck; return <div key={t as string} className="card p-6"><Icon className="text-brand" /><h3 className="mt-3 font-semibold">{t as string}</h3><p className="mt-1 text-sm text-ink/65">{d as string}</p></div>; })}</div>
      <div className="mt-16"><h2 className="font-serif text-2xl font-bold">Hekimlerimiz</h2><div className="mt-5 grid gap-5 sm:grid-cols-2">{allDoctors().map((d) => <DoctorCard key={d.id} d={d} />)}</div></div>
    </section>
  );
}
