import Link from "next/link";
import { allPosts, allDoctors } from "@/lib/queries";
import SectionHead from "@/components/SectionHead";
import Avatar from "@/components/Avatar";
export const dynamic = "force-dynamic";
export const metadata = { title: "Blog", description: "Hekimlerimizden cilt sağlığı, lazer, estetik ve saç ekimi rehberleri." };
export default function Page() {
  const posts = allPosts(), doctors = allDoctors();
  return <section className="container-x py-12"><SectionHead eyebrow="Blog" title="Hekimlerimizden rehberler" text="Uygulama öncesi ve sonrası merak edilenler, kanıta dayalı ve sade anlatımla." /><div className="mt-10 grid gap-5 md:grid-cols-3">{posts.map((p) => { const d = doctors.find((x) => x.id === p.authorId); return <Link key={p.id} href={`/blog/${p.slug}`} className="card flex flex-col p-6 transition hover:-translate-y-1"><div className="flex flex-wrap gap-1.5">{p.tags.map((t) => <span key={t} className="chip">{t}</span>)}</div><h2 className="mt-3 font-serif text-xl font-bold">{p.title}</h2><p className="mt-2 text-sm text-ink/65">{p.excerpt}</p>{d && <div className="mt-auto flex items-center gap-2 pt-5 text-xs text-stone2"><Avatar name={d.name} color={d.color} size={28} /> {d.title} {d.name} · {new Date(p.publishedAt).toLocaleDateString("tr-TR", { day: "numeric", month: "long" })}</div>}</Link>; })}</div></section>;
}
