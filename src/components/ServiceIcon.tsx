import { Zap, Sparkles, Droplets, Scissors, Sun, Leaf, Stethoscope } from "lucide-react";
const MAP = { Zap, Sparkles, Droplets, Scissors, Sun, Leaf } as const;
export default function ServiceIcon({ name, size = 22, className = "" }: { name: string; size?: number; className?: string }) {
  const Icon = (MAP as Record<string, typeof Zap>)[name] ?? Stethoscope;
  return <Icon size={size} className={className} aria-hidden />;
}
