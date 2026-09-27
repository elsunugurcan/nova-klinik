import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ChevronRight } from "lucide-react";
import { getPost, allDoctors, allPosts } from "@/lib/queries";
import Avatar from "@/components/Avatar";
import JsonLd from "@/components/JsonLd";
import { abs } from "@/lib/site";
export const dynamic = "force-dynamic";
export function generateMetadata({ params }: { params: { slug: string } }) { const p = getPost(params.slug); return p ? { title: p.title, description: p.excerpt } : { title: "Yazı" }; }
export default function Page({ params }: { params: { slug: string } }) {
  const p = getPost(params.slug); if (!p) notFound();
  const d = allDoctors().find((x) => x.id === p.authorId); const others = allPosts().filter((x) => x.id !== p.id).slice(0, 2);
  return (
    <article className="container-x py-10"><div className="mx-auto max-w-3xl">
      <JsonLd data={{ "@context": "https://schema.org", "@type": "BlogPosting", headline: p.title, description: p.excerpt, datePublished: p.publishedAt, author: d ? { "@type": "Person", name: `${d.title} ${d.name}` } : undefined, publisher: { "@id": abs("/#clinic") }, mainEntityOfPage: abs(`/blog/${p.slug}`) }} />
      <nav className="flex items-center gap-1 text-xs text-stone2"><Link href="/">Ana sayfa</Link><ChevronRight size={12} /><Link href="/blog">Blog</Link></nav>
      <div className="mt-4 flex flex-wrap gap-1.5">{p.tags.map((t) => <span key={t} className="chip">{t}</span>)}</div>
      <h1 className="mt-3 font-serif text-4xl font-bold leading-tight">{p.title}</h1>
      {d && <Link href={`/hekimler/${d.slug}`} className="mt-5 flex items-center gap-3 text-sm"><Avatar name={d.name} color={d.color} size={40} /><span><b>{d.title} {d.name}</b><br /><span className="text-stone2">{d.specialty} · {new Date(p.publishedAt).toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" })}</span></span></Link>}
      <div className="prose-custom mt-8 text-[17px]"><ReactMarkdown remarkPlugins={[remarkGfm]}>{p.content}</ReactMarkdown></div>
      <div className="card mt-10 flex flex-wrap items-center justify-between gap-4 p-6"><div><b>Sorunuz mu var?</b><div className="text-sm text-ink/65">Muayene için uygun saati seçin, hekiminizle görüşün.</div></div><Link href="/randevu" className="btn-primary">Online randevu</Link></div>
      {others.length > 0 && <div className="mt-12"><h2 className="font-serif text-2xl font-bold">Diğer yazılar</h2><div className="mt-4 grid gap-4 sm:grid-cols-2">{others.map((o) => <Link key={o.id} href={`/blog/${o.slug}`} className="card p-5 hover:-translate-y-0.5"><div className="font-semibold">{o.title}</div><div className="mt-1 text-sm text-ink/65">{o.excerpt}</div></Link>)}</div></div>}
    </div></article>
  );
}
