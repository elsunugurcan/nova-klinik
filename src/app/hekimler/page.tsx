import { allDoctors } from "@/lib/queries";
import { DoctorCard } from "@/components/Cards";
import SectionHead from "@/components/SectionHead";
export const dynamic = "force-dynamic";
export const metadata = { title: "Hekimlerimiz", description: "Dermatoloji, plastik cerrahi ve medikal estetik alanlarında uzman hekim kadromuz." };
export default function Page() {
  return <section className="container-x py-12"><SectionHead eyebrow="Hekimlerimiz" title="Alanında uzman, deneyimli kadro" text="Tüm tıbbi uygulamalar uzman hekimlerimiz tarafından yapılır; her hekimin programı ve uzmanlık alanı online randevuda görünür." /><div className="mt-10 grid gap-5 sm:grid-cols-2">{allDoctors().map((d) => <DoctorCard key={d.id} d={d} />)}</div></section>;
}
