import type { AnchorHTMLAttributes, ReactNode } from "react";

type Variant = "gold" | "outline" | "ink";

const variants: Record<Variant, string> = {
  gold: "bg-gold text-basalt hover:bg-gold-soft",
  outline: "border border-travertine/70 bg-basalt/40 text-travertine backdrop-blur-sm hover:border-gold hover:text-gold",
  ink: "bg-basalt text-travertine hover:bg-granite",
};

// Sharp-edged CTA. External links (wa.me, stores) open in a new tab.
export function ButtonLink({
  href,
  variant = "gold",
  icon,
  children,
  className = "",
  ...rest
}: {
  href: string;
  variant?: Variant;
  icon?: ReactNode;
  children: ReactNode;
} & AnchorHTMLAttributes<HTMLAnchorElement>) {
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`inline-flex min-h-12 items-center justify-center gap-2.5 whitespace-nowrap px-6 text-sm font-semibold uppercase tracking-[0.08em] transition-[background-color,color,border-color,transform] duration-300 active:translate-y-px ${variants[variant]} ${className}`}
      {...rest}
    >
      {icon}
      {children}
    </a>
  );
}
