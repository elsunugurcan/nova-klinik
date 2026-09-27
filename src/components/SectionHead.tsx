export default function SectionHead({ eyebrow, title, text, center = false }: { eyebrow: string; title: string; text?: string; center?: boolean }) {
  return <div className={center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}><div className="eyebrow">{eyebrow}</div><h2 className="mt-2 font-serif text-3xl font-bold tracking-tight md:text-4xl">{title}</h2>{text && <p className="mt-3 text-ink/65 md:text-lg">{text}</p>}</div>;
}
