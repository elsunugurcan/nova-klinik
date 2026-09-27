import { allServices } from "@/lib/queries";
import { ServiceCard } from "@/components/Cards";
import SectionHead from "@/components/SectionHead";
export const dynamic = "force-dynamic";
export const metadata = { title: "Hizmetler", description: "Lazer epilasyon, medikal cilt bakımı, dolgu ve botulinum, saç ekimi, leke tedavisi ve mezoterapi. Uzman hekim kontrolünde, Adana." };
export default function Page() {
  const services = allServices();
  const cats = Array.from(new Set(services.map((s) => s.category)));
  return (
    <section className="container-x py-12"><SectionHead eyebrow="Hizmetler" title="Uzmanlık alanlarımız" text="Her uygulama muayene ile başlar; cilt tipinize ve beklentinize göre planlanır, yazılı olarak bilgilendirilirsiniz." />
      <div className="mt-6 flex flex-wrap gap-2">{cats.map((c) => <a key={c} href={`#${c}`} className="chip hover:border-brand">{c}</a>)}</div>
      {cats.map((c) => <div key={c} id={c} className="mt-12 scroll-mt-24"><h2 className="font-serif text-2xl font-bold">{c}</h2><div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{services.filter((s) => s.category === c).map((s) => <ServiceCard key={s.id} s={s} />)}</div></div>)}
    </section>
  );
}
