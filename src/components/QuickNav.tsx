import {
  CalendarDays,
  CalendarHeart,
  Images,
  Radio,
  Sparkles,
  UserRound
} from "lucide-react";

const items = [
  { label: "今日の応援", href: "#today", Icon: Sparkles },
  { label: "次の出演", href: "#next", Icon: CalendarHeart },
  { label: "カレンダー", href: "#calendar", Icon: CalendarDays },
  { label: "ギャラリー", href: "#gallery", Icon: Images },
  { label: "SHOWROOM", href: "#showroom", Icon: Radio },
  { label: "プロフィール", href: "#profile", Icon: UserRound }
];

export function QuickNav() {
  return (
    <nav
      aria-label="ページ内メニュー"
      className="sticky top-16 z-40 border-b border-rosefog/20 bg-white/92 shadow-sm backdrop-blur-xl lg:hidden"
    >
      <div className="quick-nav-scroll mx-auto max-w-7xl overflow-x-auto px-4 py-1.5 sm:px-6 lg:px-8">
        <div className="flex min-w-max items-center gap-1.5">
          {items.map(({ label, href, Icon }) => (
            <a
              key={href}
              href={href}
              className="quick-nav-link inline-flex min-h-10 items-center gap-2 rounded-md border border-rosefog/25 bg-porcelain px-3 py-1.5 text-xs font-bold text-ink/72 transition-colors hover:border-champagne/60 hover:bg-white hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-champagne sm:text-sm"
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
