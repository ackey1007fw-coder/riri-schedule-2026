import { ArrowDown, Images, Ticket } from "lucide-react";
import type { ScheduleEvent, SocialLink } from "../types";

type ActionStripProps = {
  nextEvent?: ScheduleEvent;
  socialLinks: SocialLink[];
};

export function ActionStrip({ nextEvent, socialLinks }: ActionStripProps) {
  const ticketLink =
    nextEvent?.links.find((link) => link.kind === "ticket") ??
    nextEvent?.links[0];
  const hasTicket = ticketLink?.kind === "ticket";
  const instagram = socialLinks.find((link) => link.kind === "instagram");

  const items = [
    {
      label: "次の出演",
      title: nextEvent?.shortTitle ?? "スケジュールを見る",
      copy: nextEvent?.displayDate ?? "これからの予定をカレンダーでチェック。",
      href: "#next",
      Icon: ArrowDown,
      external: false
    },
    {
      label: hasTicket ? "チケット予約" : "関連リンク",
      title: ticketLink?.label ?? "予約リンクを確認",
      copy: "予約や詳細は、このボタンからすぐに。",
      href: ticketLink?.url ?? "#schedule",
      Icon: Ticket,
      external: Boolean(ticketLink)
    },
    {
      label: "SNSを見る",
      title: instagram?.handle ?? "更新をチェック",
      copy: "最新の写真や告知をチェックしよう。",
      href: instagram?.url ?? "#links",
      Icon: Images,
      external: Boolean(instagram)
    }
  ];

  return (
    <section className="relative z-20 -mt-8 bg-transparent px-4 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-px overflow-hidden border border-white/70 bg-rosefog/20 shadow-paper backdrop-blur sm:grid-cols-3">
        {items.map((item, index) => {
          const content = (
            <>
              <span
                className={`flex h-12 w-12 shrink-0 items-center justify-center border ${
                  index === 1
                    ? "border-champagne bg-champagne text-white"
                    : "border-champagne/45 bg-white text-champagne"
                }`}
              >
                <item.Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <span className="min-w-0">
                <span className="block text-xs font-black uppercase text-champagne">
                  {item.label}
                </span>
                <span className="mt-1 block font-display text-xl leading-tight text-ink">
                  {item.title}
                </span>
                <span className="mt-2 block text-sm leading-6 text-ink/62">
                  {item.copy}
                </span>
              </span>
            </>
          );

          return item.external ? (
            <a
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-36 gap-4 bg-white/92 p-5 transition hover:bg-white sm:min-h-40"
            >
              {content}
            </a>
          ) : (
            <a
              key={item.label}
              href={item.href}
              className="flex min-h-36 gap-4 bg-white/92 p-5 transition hover:bg-white sm:min-h-40"
            >
              {content}
            </a>
          );
        })}
      </div>
    </section>
  );
}
