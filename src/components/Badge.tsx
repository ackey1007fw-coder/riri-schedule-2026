import type { EventCategory } from "../types";

type BadgeProps = {
  children: string;
  category?: EventCategory;
  strong?: boolean;
};

export function Badge({ children, category, strong = false }: BadgeProps) {
  const tone = category
    ? "border-champagne/60 bg-porcelain text-ink/72"
    : strong
      ? "border-champagne bg-ink text-champagne"
      : "border-champagne/45 bg-white text-ink/68";

  return (
    <span
      className={`inline-flex items-center border px-2.5 py-1 text-[11px] font-bold uppercase ${tone}`}
    >
      {children}
    </span>
  );
}
