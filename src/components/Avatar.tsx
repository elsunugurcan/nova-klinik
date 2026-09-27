export default function Avatar({ name, color, size = 64, className = "" }: { name: string; color: string; size?: number; className?: string }) {
  const initials = name.split(" ").map((p) => p[0]).slice(0, 2).join("").toLocaleUpperCase("tr-TR");
  return <div className={`flex shrink-0 items-center justify-center rounded-full font-serif font-bold text-white ${className}`} style={{ width: size, height: size, fontSize: size * 0.36, background: `linear-gradient(135deg, ${color}, ${color}99)` }} aria-hidden>{initials}</div>;
}
