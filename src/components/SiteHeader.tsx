import { useEffect, useState } from "react";
import { CalendarDays } from "lucide-react";
import { profile } from "../data/profile";
import type { SocialLink } from "../types";

const navItems = [
  { label: "公演情報", href: "#next", id: "next" },
  { label: "スケジュール", href: "#schedule", id: "schedule" },
  { label: "これまでの歩み", href: "#highlights", id: "highlights" },
  { label: "プロフィール", href: "#profile", id: "profile" },
  { label: "SNS", href: "#links", id: "links" }
];

function useActiveSection() {
  const [active, setActive] = useState("");

  useEffect(() => {
    const ids = navItems.map((item) => item.id);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) {
          setActive(visible[0].target.id);
        }
      },
      { rootMargin: "-80px 0px -40% 0px", threshold: 0 },
    );

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return active;
}

type SiteHeaderProps = {
  socialLinks: SocialLink[];
};

export function SiteHeader({ socialLinks }: SiteHeaderProps) {
  const showroom = socialLinks.find((link) => link.kind === "showroom");
  const activeSection = useActiveSection();

  return (
    <header className="sticky top-0 z-50 w-full overflow-hidden border-b border-rosefog/20 bg-porcelain/88 backdrop-blur-xl">
      <div className="mx-auto flex h-16 w-full min-w-0 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        <a href="#top" className="flex min-w-0 items-center gap-3 text-ink">
          <span className="grid h-9 w-9 shrink-0 place-items-center border border-champagne/60 bg-white">
            <CalendarDays className="h-4 w-4 text-champagne" aria-hidden="true" />
          </span>
          <span className="min-w-0">
            <span className="block truncate font-display text-base leading-none min-[430px]:text-lg">
              {profile.theme}
            </span>
            <span className="mt-1 block text-[11px] font-semibold text-ink/55">
              Fan Schedule
            </span>
          </span>
        </a>

        <nav className="hidden items-center gap-5 text-sm font-semibold text-ink/70 md:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`transition-colors ${
                activeSection === item.id
                  ? "text-champagne"
                  : "hover:text-ink"
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {showroom ? (
          <a
            href={showroom.url}
            target="_blank"
            rel="noopener noreferrer"
            className="riri-button riri-button-gold min-h-10 shrink-0 px-3 text-xs sm:min-h-11 sm:px-4 sm:text-sm"
          >
            <span className="hidden min-[430px]:inline">SHOWROOM</span>
            <span className="min-[430px]:hidden">SR</span>
          </a>
        ) : socialLinks[0] && (
          <a
            href={socialLinks[0].url}
            target="_blank"
            rel="noopener noreferrer"
            className="riri-button riri-button-gold min-h-10 shrink-0 px-3 text-xs sm:min-h-11 sm:px-4 sm:text-sm"
          >
            {socialLinks[0].label}
          </a>
        )}
      </div>
    </header>
  );
}
