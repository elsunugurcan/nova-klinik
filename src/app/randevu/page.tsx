import { allDoctors, allServices } from "@/lib/queries";
import { db, schema } from "@/db";
import BookingWizard from "@/components/BookingWizard";
export const dynamic = "force-dynamic";
export const metadata = { title: "Online Randevu", description: "Hekimlerimizin güncel programından 2 dakikada randevu alın. Onay SMS ile, 24 saat öncesine kadar ücretsiz iptal." };
export default function Page({ searchParams }: { searchParams: { hizmet?: string; hekim?: string } }) {
  const links = db.select().from(schema.doctorServices).all();
  return (
    <section className="container-x py-10"><div className="max-w-2xl"><div className="eyebrow">Online randevu</div><h1 className="mt-2 font-serif text-4xl font-bold">Uygun saati seçin</h1><p className="mt-2 text-ink/65">Hekimlerimizin güncel programı gösterilir; dolu saatler otomatik kapanır.</p></div>
      <div className="mt-8"><BookingWizard services={allServices()} doctors={allDoctors()} links={links} initialService={searchParams.hizmet} initialDoctor={searchParams.hekim} /></div></section>
  );
}
