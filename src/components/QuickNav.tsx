import { useCallback, useEffect, useRef, useState } from "react";
import {
  CalendarDays,
  CalendarHeart,
  Images,
  Radio,
  Sparkles,
  UserRound,
  MessageCircle
} from "lucide-react";

const items = [
  { label: "魅力", href: "#about", id: "about", Icon: Sparkles },
  { label: "公演情報", href: "#next", id: "next", Icon: CalendarHeart },
  { label: "予定", href: "#schedule", id: "schedule", Icon: CalendarDays },
  { label: "これまでの歩み", href: "#highlights", id: "highlights", Icon: Sparkles },
  { label: "プロフィール", href: "#profile", id: "profile", Icon: UserRound },
  { label: "写真", href: "#gallery", id: "gallery", Icon: Images },
  { label: "配信", href: "#showroom", id: "showroom", Icon: Radio },
  { label: "SNS", href: "#links", id: "links", Icon: MessageCircle }
];

export function QuickNav() {
  const [active, setActive] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollActiveIntoView = useCallback((id: string) => {
    const container = scrollRef.current;
    if (!container) return;
    const link = container.querySelector(`[data-nav-id="${id}"]`) as HTMLElement | null;
    if (!link) return;
    const left = link.offsetLeft - container.offsetWidth / 2 + link.offsetWidth / 2;
    container.scrollTo({ left, behavior: "smooth" });
  }, []);

  useEffect(() => {
    const ids = items.map((item) => item.id);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) {
          const id = visible[0].target.id;
          setActive(id);
          scrollActiveIntoView(id);
        }
      },
      { rootMargin: "-100px 0px -40% 0px", threshold: 0 },
    );

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [scrollActiveIntoView]);

  return (
    <nav
      aria-label="ページ内メニュー"
      className="sticky top-16 z-40 border-b border-rosefog/20 bg-white/92 shadow-sm backdrop-blur-xl lg:hidden"
    >
      <div ref={scrollRef} className="quick-nav-scroll mx-auto max-w-7xl overflow-x-auto px-4 py-1.5 sm:px-6 lg:px-8">
        <div className="flex min-w-max items-center gap-1.5">
          {items.map(({ label, href, id, Icon }) => (
            <a
              key={href}
              href={href}
              data-nav-id={id}
              className={`quick-nav-link inline-flex min-h-10 items-center gap-2 rounded-md border px-3 py-1.5 text-xs font-bold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-champagne sm:text-sm ${
                active === id
                  ? "border-champagne/60 bg-white text-champagne"
                  : "border-rosefog/25 bg-porcelain text-ink/72 hover:border-champagne/60 hover:bg-white hover:text-ink"
              }`}
            >
              <Icon className="h-4 w-4 text-champagne" aria-hidden="true" />
              {label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
