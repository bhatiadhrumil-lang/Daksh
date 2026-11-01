import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "accent" | "outline" | "ghost";
type ButtonSize = "sm" | "md" | "lg" | "icon";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-colors duration-200 disabled:pointer-events-none disabled:opacity-50";

const variants: Record<ButtonVariant, string> = {
  primary: "bg-ink text-white hover:bg-[#35322d]",
  accent: "bg-accent text-white hover:bg-accent-strong",
  outline: "border border-ink/15 bg-transparent text-ink hover:border-ink/40 hover:bg-white/60",
  ghost: "text-ink hover:bg-ink/5",
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-9 px-4 text-xs",
  md: "h-11 px-6 text-sm",
  lg: "h-13 px-8 text-sm",
  icon: "size-10",
};

export function buttonClass({
  variant = "primary",
  size = "md",
  className,
}: {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
}) {
  return cn(base, variants[variant], sizes[size], className);
}

export const inputClass =
  "h-12 w-full rounded-full border border-line bg-white px-5 text-sm text-ink placeholder:text-muted/70 transition-colors focus:border-accent focus:outline-none";
