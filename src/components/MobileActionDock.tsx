import { useState } from "react";
import {
  CalendarCheck,
  Check,
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
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    const shareData = {
      title: "Riri Schedule 2026",
      text: "里季ちゃんの出演スケジュール＆ライブ情報まとめ📅",
      url
    };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
        return;
      }
    } catch {
      // 共有シートをキャンセルした等。コピーにフォールバックせず終了。
      return;
    }
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      // クリップボードも使えない場合は何もしない。
    }
  };

  type DockItem = {
    label: string;
    Icon: typeof CalendarCheck;
    featured?: boolean;
  } & (
    | { href: string; external: boolean; onClick?: never }
    | { onClick: () => void; href?: never; external?: never }
  );

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
      label: copied ? "コピー!" : "シェア",
      Icon: copied ? Check : Share2,
      onClick: handleShare
    }
  ];

  return (
    <nav
      aria-label="応援メニュー"
      className="fixed inset-x-3 bottom-3 z-50 rounded-md border border-white/80 bg-white/92 p-1.5 shadow-paper backdrop-blur-xl md:hidden"
    >
      <div className="grid grid-cols-5 gap-1">
        {items.map((item) => {
          const content = (
            <>
              <item.Icon className="h-5 w-5" aria-hidden="true" />
              <span className="whitespace-nowrap text-[10px] font-bold">
                {item.label}
              </span>
            </>
          );
          const className = `flex min-h-14 flex-col items-center justify-center gap-1 rounded border text-center transition ${
            item.featured
              ? "border-champagne bg-champagne text-white"
              : "border-transparent bg-porcelain text-ink hover:border-rosefog/40 hover:bg-white"
          }`;

          if ("onClick" in item && item.onClick) {
            return (
              <button
                key={item.label}
                type="button"
                onClick={item.onClick}
                className={className}
              >
                {content}
              </button>
            );
          }

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
