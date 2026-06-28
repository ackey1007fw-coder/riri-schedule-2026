import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  CalendarDays,
  Clock3,
  Download,
  Radio,
  Sparkles
} from "lucide-react";
import { news } from "../data/news";
import { downloadScheduleCalendar } from "../lib/calendarExport";
import type { ScheduleEvent, SocialLink } from "../types";

type StreamSlot = {
  date: string;
  time: string;
  note?: string;
};

type AgendaItem = {
  id: string;
  date: string;
  time?: string;
  title: string;
  kind: "stream" | "event";
  href: string;
};

const dateKey = (date: Date) =>
  new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Tokyo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).format(date);

const dateLabel = (key: string) =>
  new Intl.DateTimeFormat("ja-JP", {
    timeZone: "Asia/Tokyo",
    month: "numeric",
    day: "numeric",
    weekday: "short"
  }).format(new Date(`${key}T12:00:00+09:00`));

const firstEventDateInRange = (
  event: ScheduleEvent,
  startKey: string,
  endKey: string,
) => {
  if (event.dates?.length) {
    return event.dates.find((date) => date >= startKey && date <= endKey);
  }
  const eventStart = event.startAt.slice(0, 10);
  const eventEnd = (event.endAt ?? event.startAt).slice(0, 10);
  if (eventEnd < startKey || eventStart > endKey) return undefined;
  return eventStart < startKey ? startKey : eventStart;
};

export function TodayDashboard({
  events,
  socialLinks
}: {
  events: ScheduleEvent[];
  socialLinks: SocialLink[];
}) {
  const [streamSlots, setStreamSlots] = useState<StreamSlot[]>([]);

  useEffect(() => {
    let active = true;
    fetch("/api/frecam-schedule")
      .then((response) => (response.ok ? response.json() : null))
      .then((data: { slots?: StreamSlot[] } | null) => {
        if (active && Array.isArray(data?.slots)) setStreamSlots(data.slots);
      })
      .catch(() => {
        if (active) setStreamSlots([]);
      });
    return () => {
      active = false;
    };
  }, []);

  const showroom =
    socialLinks.find((link) => link.kind === "showroom")?.url ??
    "https://www.showroom-live.com/room/profile?room_id=347571";

  const { todayKey, weekEndKey, agenda } = useMemo(() => {
    const today = new Date();
    const start = dateKey(today);
    const end = dateKey(new Date(today.getTime() + 6 * 86400000));

    const eventItems: AgendaItem[] = events.flatMap((event) => {
      const occurrence = firstEventDateInRange(event, start, end);
      if (!occurrence) return [];
      const isSparse = Boolean(event.dates?.length);
      return [{
        id: `event-${event.id}-${occurrence}`,
        date: occurrence,
        time: isSparse || event.category === "birthday"
          ? undefined
          : new Intl.DateTimeFormat("ja-JP", {
              timeZone: "Asia/Tokyo",
              hour: "2-digit",
              minute: "2-digit",
              hour12: false
            }).format(new Date(event.startAt)),
        title: event.shortTitle,
        kind: "event" as const,
        href: event.links[0]?.url ?? "#schedule"
      }];
    });

    const streamItems: AgendaItem[] = streamSlots
      .filter((slot) => slot.date >= start && slot.date <= end)
      .map((slot) => ({
        id: `stream-${slot.date}-${slot.time}`,
        date: slot.date,
        time: slot.time,
        title: slot.note || "SHOWROOM配信",
        kind: "stream",
        href: showroom
      }));

    return {
      todayKey: start,
      weekEndKey: end,
      agenda: [...streamItems, ...eventItems]
        .sort((a, b) => `${a.date}${a.time ?? "99:99"}`.localeCompare(`${b.date}${b.time ?? "99:99"}`))
        .slice(0, 5)
    };
  }, [events, showroom, streamSlots]);

  const todayItems = agenda.filter((item) => item.date === todayKey);
  const primary = todayItems[0] ?? agenda[0];

  return (
    <section id="today" className="scroll-mt-32 bg-porcelain px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[11px] font-black uppercase tracking-[0.18em] text-champagne">
              Today & This Week
            </p>
            <h2 className="mt-2 font-display text-4xl text-ink sm:text-5xl">
              今日、何を見ればいい？
            </h2>
          </div>
          <p className="text-sm font-bold text-ink/50">
            {dateLabel(todayKey)}〜{dateLabel(weekEndKey)}
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="yukako-card yukako-card-interactive border-champagne/50 bg-white p-5 shadow-paper sm:p-7">
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center border border-champagne/50 bg-porcelain text-champagne">
                {primary?.kind === "stream" ? (
                  <Radio className="h-5 w-5" aria-hidden="true" />
                ) : (
                  <CalendarDays className="h-5 w-5" aria-hidden="true" />
                )}
              </span>
              <div>
                <p className="text-xs font-black uppercase tracking-wide text-champagne">
                  {primary?.date === todayKey ? "Today" : "Next"}
                </p>
                <p className="text-sm font-bold text-ink/55">
                  {primary ? dateLabel(primary.date) : "予定を確認中"}
                </p>
              </div>
            </div>

            {primary ? (
              <>
                <h3 className="mt-6 font-display text-3xl leading-tight text-ink sm:text-4xl">
                  {primary.title}
                </h3>
                <p className="mt-3 flex items-center gap-2 text-sm font-bold text-ink/65">
                  <Clock3 className="h-4 w-4 text-champagne" aria-hidden="true" />
                  {primary.time ? `${primary.time} 開始` : "日程をチェック"}
                </p>
                <a
                  href={primary.href}
                  target={primary.href.startsWith("#") ? undefined : "_blank"}
                  rel={primary.href.startsWith("#") ? undefined : "noopener noreferrer"}
                  className="yukako-button yukako-button-primary mt-7 min-h-12 w-full px-5 py-3 text-sm sm:w-auto"
                >
                  {primary.kind === "stream" ? "配信を見る" : "予定の詳細を見る"}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </>
            ) : (
              <p className="mt-6 leading-8 text-ink/65">
                今週の新しい予定はまだありません。SHOWROOMやSNSで最新情報を確認できます。
              </p>
            )}
          </div>

          <div className="yukako-card yukako-card-interactive border-rosefog/25 bg-white p-5 sm:p-7">
            <p className="flex items-center gap-2 text-sm font-black text-ink">
              <Sparkles className="h-4 w-4 text-champagne" aria-hidden="true" />
              今週の応援予定
            </p>
            <ul className="mt-4 divide-y divide-rosefog/15">
              {agenda.length ? agenda.map((item) => (
                <li key={item.id}>
                  <a
                    href={item.href}
                    target={item.href.startsWith("#") ? undefined : "_blank"}
                    rel={item.href.startsWith("#") ? undefined : "noopener noreferrer"}
                    className="flex min-h-16 items-center gap-3 py-3 transition hover:text-champagne"
                  >
                    <span className="w-20 shrink-0 text-xs font-black text-champagne">
                      {item.date === todayKey ? "本日" : dateLabel(item.date)}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-bold">{item.title}</span>
                      {item.time && <span className="mt-1 block text-xs text-ink/50">{item.time} 開始</span>}
                    </span>
                    <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
                  </a>
                </li>
              )) : (
                <li className="py-5 text-sm leading-7 text-ink/55">今週の予定は確認中です。</li>
              )}
            </ul>
          </div>
        </div>

        <div className="mt-4 grid gap-4 lg:grid-cols-[1fr_auto]">
          <div className="yukako-card yukako-card-interactive border-rosefog/25 bg-white p-5">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-champagne">
              Latest Updates
            </p>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {news.slice(0, 2).map((item) => (
                <a
                  key={`${item.date}-${item.text}`}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-l-2 border-champagne pl-4 text-sm font-bold leading-6 text-ink/72 transition hover:text-champagne"
                >
                  <span className="block text-xs text-ink/40">{item.date} / {item.label}</span>
                  {item.text}
                </a>
              ))}
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:w-[420px]">
            <button
              type="button"
              onClick={() => downloadScheduleCalendar(events)}
              className="yukako-button yukako-button-soft min-h-14 px-4 py-3 text-sm"
            >
              <Download className="h-4 w-4 text-champagne" aria-hidden="true" />
              今後の予定を保存
            </button>
            <a
              href={showroom}
              target="_blank"
              rel="noopener noreferrer"
              className="yukako-button yukako-button-rose min-h-14 px-4 py-3 text-sm"
            >
              <Radio className="h-4 w-4" aria-hidden="true" />
              SHOWROOMへ
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
