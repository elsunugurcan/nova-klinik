import Link from "next/link";
export default function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" className={`inline-flex items-center gap-2.5 ${light ? "text-white" : "text-ink"}`} aria-label="Nova Klinik ana sayfa">
      <svg width="34" height="34" viewBox="0 0 34 34" aria-hidden><circle cx="17" cy="17" r="16" fill="#0f766e" /><path d="M10 23V11l14 12V11" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" fill="none" /><circle cx="24" cy="10" r="2.2" fill="#99f6e4" /></svg>
      <span className="font-serif text-2xl font-bold tracking-tight">Nova<span className={light ? "text-teal-200" : "text-brand"}> Klinik</span></span>
    </Link>
  );
}
