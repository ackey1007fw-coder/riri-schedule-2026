import {
  CalendarCheck,
  MessageCircleHeart,
  Radio,
  Share2,
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

  type DockItem = {
    label: string;
    Icon: typeof CalendarCheck;
    featured?: boolean;
    href: string;
    external: boolean;
  };

  const items: DockItem[] = [
    {
      label: "次の出演",
      href: "#next",
      Icon: CalendarCheck,
      external: false
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
      external: Boolean(showroom)
    },
    {
      label: "SNS",
      href: "#links",
      Icon: MessageCircleHeart,
      external: false
    },
    {
      label: "シェア",
      href: "#share",
      Icon: Share2,
      external: false
    }
  ];

  return (
    <nav
      aria-label="応援メニュー"
      className="fixed bottom-[calc(0.75rem+env(safe-area-inset-bottom))] left-2 z-[70] w-[calc(100vw-1rem)] max-w-[calc(100vw-1rem)] border border-white/80 bg-white/92 p-1 shadow-paper backdrop-blur-xl md:hidden"
    >
      <div className="grid grid-cols-5 gap-0.5">
        {items.map((item) => {
          const content = (
            <>
              <item.Icon className="h-5 w-5" aria-hidden="true" />
              <span className="whitespace-nowrap text-[9px] font-bold min-[380px]:text-[10px]">
                {item.label}
              </span>
            </>
          );
          const className = `flex min-h-[3.25rem] flex-col items-center justify-center gap-1 rounded border text-center transition min-[380px]:min-h-14 ${
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
