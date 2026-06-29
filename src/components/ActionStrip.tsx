import {
  ArrowUpRight,
  CalendarDays,
  CalendarHeart,
  Images,
  MessageCircleHeart,
  Send,
  Ticket
} from "lucide-react";
import type { ScheduleEvent, SocialLink } from "../types";

type ActionStripProps = {
  nextEvent?: ScheduleEvent;
  upcomingEvents: ScheduleEvent[];
  socialLinks: SocialLink[];
};

const dateKey = (date: Date) =>
  new Intl.DateTimeFormat("sv-SE", {
    timeZone: "Asia/Tokyo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).format(date);

const addDays = (date: Date, days: number) => {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
};

const eventDateKeys = (event: ScheduleEvent) =>
  event.dates && event.dates.length > 0
    ? event.dates
    : [event.startAt.slice(0, 10), (event.endAt ?? event.startAt).slice(0, 10)];

const countInRange = (events: ScheduleEvent[], startKey: string, endKey: string) =>
  events.filter((event) =>
    eventDateKeys(event).some((key) => key >= startKey && key <= endKey),
  ).length;

export function ActionStrip({
  nextEvent,
  upcomingEvents,
  socialLinks
}: ActionStripProps) {
  const ticketLink =
    nextEvent?.links.find((link) => link.kind === "ticket") ??
    nextEvent?.links[0];
  const hasTicket = ticketLink?.kind === "ticket";
  const mainSocial = socialLinks[0];
  const showroom = socialLinks.find((link) => link.kind === "showroom");
  const todayKey = dateKey(new Date());
  const weekEndKey = dateKey(addDays(new Date(), 6));
  const monthKey = todayKey.slice(0, 7);
  const todayCount = countInRange(upcomingEvents, todayKey, todayKey);
  const weekCount = countInRange(upcomingEvents, todayKey, weekEndKey);
  const monthCount = upcomingEvents.filter((event) =>
    eventDateKeys(event).some((key) => key.startsWith(monthKey)),
  ).length;

  const nextLabel = !nextEvent
    ? "スケジュール"
    : nextEvent.category === "birthday"
      ? "次の予定"
      : nextEvent.category === "event"
        ? "次のイベント"
        : "次の公演";

  const items = [
    {
      label: nextLabel,
      title: nextEvent?.shortTitle ?? "予定を見る",
      copy: nextEvent?.displayDate ?? "これからの予定をチェック。",
      href: "#next",
      Icon: CalendarDays,
      external: false
    },
    {
      label: hasTicket ? "チケット予約" : "詳細・リンク",
      title: ticketLink?.label ?? "スケジュールへ",
      copy: hasTicket
        ? "チケットの予約・詳細はこちら。"
        : "詳しくはこちらをチェック。",
      href: ticketLink?.url ?? "#schedule",
      Icon: hasTicket ? Ticket : ArrowUpRight,
      external: Boolean(ticketLink)
    },
    {
      label: "SNS",
      title: mainSocial?.handle ?? "更新をチェック",
      copy: "最新の公演情報やオフショットをチェック。",
      href: mainSocial?.url ?? "#links",
      Icon: Images,
      external: Boolean(mainSocial)
    }
  ];
  const actionGroups = [
    {
      label: "今日できる応援",
      title: todayCount ? `今日の予定 ${todayCount}件` : "SHOWROOM・SNSを確認",
      copy: todayCount
        ? "配信・出演の時間を確認して、見逃さないように準備。"
        : "予定がない日も、配信予定や最新投稿のチェックが応援になります。",
      href: todayCount ? "#schedule" : showroom?.url ?? "#showroom",
      external: !todayCount && Boolean(showroom),
      Icon: MessageCircleHeart
    },
    {
      label: "今週できる応援",
      title: weekCount ? `今週の予定 ${weekCount}件` : "Xで情報を広げる",
      copy: "公演情報・配信告知・感想投稿を見つけたら、引用やリポストで届く人を増やす。",
      href: mainSocial?.url ?? "#links",
      external: Boolean(mainSocial),
      Icon: Send
    },
    {
      label: "今月できる応援",
      title: monthCount ? `今月の予定 ${monthCount}件` : "#ゆかJETを予習",
      copy: hasTicket
        ? "チケットや配信、物販情報を早めに確認して応援の予定を組む。"
        : "公演情報を読み、気になる導線から舞台・SNS・配信へ進む。",
      href: ticketLink?.url ?? "#next",
      external: Boolean(ticketLink),
      Icon: CalendarHeart
    }
  ];

  return (
    <section className="relative z-20 bg-porcelain px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto mb-4 flex max-w-7xl items-end justify-between gap-4">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-champagne">
            Support Compass
          </p>
          <h2 className="mt-2 font-display text-2xl text-ink sm:text-3xl">
            今できる応援
          </h2>
        </div>
      </div>
      <div className="mx-auto grid max-w-7xl gap-3 sm:grid-cols-3">
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
              key={index}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="yukako-lift flex min-h-36 gap-4 border-l-4 border-champagne bg-white p-5 hover:bg-white sm:min-h-40"
            >
              {content}
            </a>
          ) : (
            <a
              key={index}
              href={item.href}
              className="yukako-lift flex min-h-36 gap-4 border-l-4 border-champagne bg-white p-5 hover:bg-white sm:min-h-40"
            >
              {content}
            </a>
          );
        })}
      </div>
      <div className="mx-auto mt-5 grid max-w-7xl gap-3 lg:grid-cols-3">
        {actionGroups.map((item) => {
          const content = (
            <>
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-champagne/45 bg-porcelain text-champagne">
                <item.Icon className="h-4 w-4" aria-hidden="true" />
              </span>
              <span>
                <span className="block text-[11px] font-black uppercase tracking-[0.14em] text-champagne">
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
              className="yukako-card yukako-card-interactive flex gap-4 border-rosefog/20 bg-white p-5"
            >
              {content}
            </a>
          ) : (
            <a
              key={item.label}
              href={item.href}
              className="yukako-card yukako-card-interactive flex gap-4 border-rosefog/20 bg-white p-5"
            >
              {content}
            </a>
          );
        })}
      </div>
    </section>
  );
}
