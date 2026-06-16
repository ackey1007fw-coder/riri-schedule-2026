import { CalendarDays } from "lucide-react";
import { profile } from "../data/profile";
import type { SocialLink } from "../types";

const navItems = [
  { label: "次の出演", href: "#next" },
  { label: "スケジュール", href: "#schedule" },
  { label: "これまでの歩み", href: "#highlights" },
  { label: "SHOWROOM", href: "#showroom" },
  { label: "プロフィール", href: "#profile" }
];

type SiteHeaderProps = {
  socialLinks: SocialLink[];
};

export function SiteHeader({ socialLinks }: SiteHeaderProps) {
  const showroom = socialLinks.find((link) => link.kind === "showroom");

  return (
    <header className="sticky top-0 z-50 border-b border-rosefog/20 bg-porcelain/88 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="#top" className="flex items-center gap-3 text-ink">
          <span className="grid h-9 w-9 place-items-center border border-champagne/60 bg-white">
            <CalendarDays className="h-4 w-4 text-champagne" aria-hidden="true" />
          </span>
          <span>
            <span className="block font-display text-lg leading-none">
              {profile.theme}
            </span>
            <span className="mt-1 block text-[11px] font-semibold text-ink/55">
              Fan Schedule
            </span>
          </span>
        </a>

        <nav className="hidden items-center gap-5 text-sm font-semibold text-ink/70 md:flex">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className="hover:text-ink">
              {item.label}
            </a>
          ))}
        </nav>

        {showroom && (
          <a
            href={showroom.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-10 items-center justify-center border border-champagne bg-champagne px-3 text-xs font-bold text-white shadow-button transition hover:bg-[#c99a47] sm:min-h-11 sm:px-4 sm:text-sm"
          >
            SHOWROOM
          </a>
        )}
      </div>
    </header>
  );
}
