import {
  CalendarCheck,
  MessageCircleHeart,
  Radio,
  Ticket
} from "lucide-react";
import type { ScheduleEvent, SocialLink } from "../types";

type MobileActionDockProps = {
  nextEvent?: ScheduleEvent;
  socialLinks: SocialLink[];
};

export function MobileActionDock({
  nextEvent,
  socialLinks
}: MobileActionDockProps) {
  const ticketLink = nextEvent?.links.find((link) => link.kind === "ticket");
  const showroom = socialLinks.find((link) => link.kind === "showroom");

  const items = [
    {
      label: "次の出演",
      href: "#next",
      Icon: CalendarCheck,
      external: false,
      featured: false
    },
    {
      label: ticketLink ? "予約" : "予定",
      href: ticketLink?.url ?? "#schedule",
      Icon: Ticket,
      external: Boolean(ticketLink),
      featured: Boolean(ticketLink)
    },
    {
      label: "配信",
      href: showroom?.url ?? "#showroom",
      Icon: Radio,
      external: Boolean(showroom),
      featured: false
    },
    {
      label: "SNS",
      href: "#links",
      Icon: MessageCircleHeart,
      external: false,
      featured: false
    }
  ];

  return (
    <nav
      aria-label="応援メニュー"
      className="fixed inset-x-3 bottom-3 z-50 border border-white/80 bg-white/92 p-1.5 shadow-paper backdrop-blur-xl md:hidden"
    >
      <div className="grid grid-cols-4 gap-1">
        {items.map((item) => {
          const content = (
            <>
              <item.Icon className="h-5 w-5" aria-hidden="true" />
              <span className="text-[11px] font-bold">{item.label}</span>
            </>
          );
          const className = `flex min-h-14 flex-col items-center justify-center gap-1 border text-center transition ${
            item.featured
              ? "border-champagne bg-champagne text-white"
              : "border-transparent bg-porcelain text-ink hover:border-rosefog/40 hover:bg-white"
          }`;

          return item.external ? (
            <a
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className={className}
            >
              {content}
            </a>
          ) : (
            <a key={item.label} href={item.href} className={className}>
              {content}
            </a>
          );
        })}
      </div>
    </nav>
  );
}
