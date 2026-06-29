import { useMemo, useState } from "react";
import type { ScheduleEvent } from "../types";
import { CalendarClock, ChevronDown, Star } from "lucide-react";
import { CalendarView } from "./CalendarView";
import { EventCard } from "./EventCard";
import { SectionHeader } from "./SectionHeader";

type ScheduleSectionProps = {
  upcomingEvents: ScheduleEvent[];
  pastEvents: ScheduleEvent[];
  allEvents: ScheduleEvent[];
  monthKeys: string[];
};

type ScheduleTab = "today" | "week" | "month" | "archive";

const tokyoDateKey = (date: Date) =>
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

const hasEventInRange = (event: ScheduleEvent, startKey: string, endKey: string) =>
  eventDateKeys(event).some((key) => key >= startKey && key <= endKey);

export function ScheduleSection({
  upcomingEvents,
  pastEvents,
  allEvents,
  monthKeys
}: ScheduleSectionProps) {
  const [activeTab, setActiveTab] = useState<ScheduleTab>("today");
  const nextId = upcomingEvents[0]?.id;
  const todayKey = tokyoDateKey(new Date());
  const weekEndKey = tokyoDateKey(addDays(new Date(), 6));
  const monthKey = todayKey.slice(0, 7);

  const todayEvents = useMemo(
    () => upcomingEvents.filter((event) => hasEventInRange(event, todayKey, todayKey)),
    [todayKey, upcomingEvents],
  );
  const weekEvents = useMemo(
    () => upcomingEvents.filter((event) => hasEventInRange(event, todayKey, weekEndKey)),
    [todayKey, upcomingEvents, weekEndKey],
  );
  const monthEvents = useMemo(
    () => upcomingEvents.filter((event) => eventDateKeys(event).some((key) => key.startsWith(monthKey))),
    [monthKey, upcomingEvents],
  );
  const featuredEvents = useMemo(
    () =>
      upcomingEvents
        .filter((event) => event.id === nextId || event.isImportant || event.isNextFocus)
        .slice(0, 2),
    [nextId, upcomingEvents],
  );

  const tabs: { id: ScheduleTab; label: string; count: number; events: ScheduleEvent[] }[] = [
    { id: "today", label: "今日", count: todayEvents.length, events: todayEvents },
    { id: "week", label: "今週", count: weekEvents.length, events: weekEvents },
    { id: "month", label: "今月", count: monthEvents.length, events: monthEvents },
    { id: "archive", label: "終了した予定", count: pastEvents.length, events: pastEvents }
  ];
  const activeEvents = tabs.find((tab) => tab.id === activeTab)?.events ?? [];

  return (
    <section id="schedule" className="scroll-mt-24 bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          kicker="Schedule"
          title="今日、どこを応援する？"
          copy="直近の大事な予定を先に確認し、今日・今週・今月・活動の記録に分けて見られます。"
        />

        {featuredEvents.length > 0 && (
          <div className="mb-12">
            <div className="mb-5 flex items-end justify-between gap-4 border-b border-champagne/25 pb-4">
              <div>
                <p className="text-xs font-bold uppercase text-champagne">
                  Pick up
                </p>
                <h3 className="mt-1 font-display text-3xl text-ink">
                  直近の重要予定
                </h3>
              </div>
              <span className="inline-flex items-center gap-2 border border-champagne/40 bg-porcelain px-3 py-2 text-xs font-bold text-ink/62">
                <Star className="h-4 w-4 text-champagne" aria-hidden="true" />
                応援優先
              </span>
            </div>
            <div className="grid gap-5">
              {featuredEvents.map((event) => (
                <div key={event.id} id={`event-${event.id}`} className="scroll-mt-24">
                  <EventCard event={event} isNext={event.id === nextId} />
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mb-12">
          <div className="mb-5 flex flex-wrap gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`inline-flex min-h-11 items-center gap-2 border px-4 py-2 text-sm font-bold transition ${
                  activeTab === tab.id
                    ? "border-ink bg-ink text-white"
                    : "border-rosefog/30 bg-porcelain text-ink/72 hover:border-champagne hover:bg-white"
                }`}
              >
                {tab.label}
                <span className={activeTab === tab.id ? "text-white/70" : "text-champagne"}>
                  {tab.count}
                </span>
              </button>
            ))}
          </div>

          <div className="riri-card border-rosefog/20 bg-porcelain p-4 sm:p-5">
            <div className="mb-5 flex items-start gap-3">
              <span className="grid h-11 w-11 shrink-0 place-items-center border border-champagne/45 bg-white text-champagne">
                <CalendarClock className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <h3 className="font-display text-2xl text-ink">
                  {tabs.find((tab) => tab.id === activeTab)?.label}
                </h3>
                <p className="mt-1 text-sm leading-6 text-ink/60">
                  {activeTab === "archive"
                    ? "終了済みイベントは活動の記録として残しています。"
                    : "予定ごとの応援アクションから、今できる応援へ進めます。"}
                </p>
              </div>
            </div>

            {activeEvents.length > 0 ? (
              <div className="grid gap-5 lg:grid-cols-2">
                {activeEvents.map((event) => (
                  <div key={event.id} id={`event-${event.id}`} className="scroll-mt-24">
                    <EventCard
                      event={event}
                      isNext={event.id === nextId}
                      compact={activeTab !== "today"}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="border border-dashed border-rosefog/30 bg-white px-5 py-8 text-center">
                <p className="font-display text-2xl text-ink">該当する予定はありません</p>
                <p className="mt-3 text-sm leading-7 text-ink/62">
                  今日の予定がない日は、SHOWROOMやSNSで近況をチェックできます。
                </p>
                <div className="mt-5 flex justify-center">
                  <a href="#showroom" className="riri-button riri-button-soft min-h-12 px-5 py-3 text-sm">
                    SHOWROOMを確認する
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>

        <details className="group mb-12 border-y border-rosefog/25">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 marker:hidden">
            <div>
              <p className="text-xs font-bold uppercase text-champagne">All upcoming</p>
              <h3 className="mt-1 font-display text-3xl text-ink">今後の予定一覧</h3>
              <p className="mt-2 text-sm leading-6 text-ink/55">
                直近以外も含めて、予定をまとめて確認できます。
              </p>
            </div>
            <span className="flex shrink-0 items-center gap-2 border border-rosefog/30 bg-porcelain px-3 py-2 text-xs font-bold text-ink/62">
              {upcomingEvents.length}件
              <ChevronDown className="h-4 w-4 text-champagne transition group-open:rotate-180" aria-hidden="true" />
            </span>
          </summary>
          <div className="grid gap-5 pb-8 pt-2">
            {upcomingEvents.map((event) => (
              <EventCard key={event.id} event={event} isNext={event.id === nextId} compact />
            ))}
          </div>
        </details>

        <div id="calendar" className="scroll-mt-32">
          <div className="mb-5 flex items-end justify-between gap-4 border-b border-champagne/25 pb-4">
            <div>
              <p className="text-xs font-bold uppercase text-champagne">Calendar</p>
              <h3 className="mt-1 font-display text-3xl text-ink">
                カレンダー表示
              </h3>
            </div>
          </div>
          <CalendarView events={allEvents} monthKeys={monthKeys} />
        </div>
      </div>
    </section>
  );
}
