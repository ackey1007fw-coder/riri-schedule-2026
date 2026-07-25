import type { ScheduleEvent } from "../types";
import { ChevronDown } from "lucide-react";
import { CalendarView } from "./CalendarView";
import { EventCard } from "./EventCard";
import { SectionHeader } from "./SectionHeader";

type ScheduleSectionProps = {
  upcomingEvents: ScheduleEvent[];
  pastEvents: ScheduleEvent[];
  allEvents: ScheduleEvent[];
  monthKeys: string[];
};

export function ScheduleSection({
  upcomingEvents,
  pastEvents,
  allEvents,
  monthKeys
}: ScheduleSectionProps) {
  // 直近の1件は直前の NextEvent セクションで既に大きく紹介済みのため、ここでは重複させない。
  const restUpcomingEvents = upcomingEvents.slice(1);

  // 写真付きレポートカード（生誕祭レポートなど）は本文・写真が多く縦に長いため、
  // 折りたたみ式の「終了済みイベント」内には入れず、常に見える場所に単独で表示する。
  // （2カラムの圧縮グリッドに混ぜると、隣のカードとの高さ差で不自然な余白ができるため）
  const reportEvents = pastEvents.filter(
    (event) => event.gallery && event.gallery.length > 0,
  );
  const archiveEvents = pastEvents.filter(
    (event) => !(event.gallery && event.gallery.length > 0),
  );

  return (
    <section id="schedule" className="scroll-mt-24 bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          kicker="Schedule"
          title="カードとカレンダーで見る出演予定"
          copy="直近の応援先はカードで大きく、日付の流れはカレンダーで確認できます。スマホでも縦に読み進めやすい構成です。"
        />

        <div className="mb-12">
          <div className="mb-5 flex items-end justify-between gap-4 border-b border-champagne/25 pb-4">
            <div>
              <p className="text-xs font-bold uppercase text-champagneInk">
                Upcoming
              </p>
              <h3 className="mt-1 font-display text-3xl text-ink">
                今後の出演情報
              </h3>
            </div>
            <span className="border border-rosefog/30 bg-porcelain px-3 py-2 text-xs font-bold text-ink/62">
              {upcomingEvents.length}件
            </span>
          </div>
          {restUpcomingEvents.length > 0 ? (
            <div className="grid gap-5">
              {restUpcomingEvents.map((event) => (
                <div key={event.id} id={`event-${event.id}`} className="scroll-mt-24">
                  <EventCard event={event} />
                </div>
              ))}
            </div>
          ) : (
            upcomingEvents.length > 0 && (
              <p className="border border-dashed border-rosefog/30 bg-porcelain px-5 py-6 text-sm text-ink/62">
                直近の出演は、このすぐ上の「次に見るべき出演情報」でご紹介しています。
              </p>
            )
          )}
        </div>

        {reportEvents.length > 0 && (
          <div className="mb-12">
            <div className="mb-5 flex items-end justify-between gap-4 border-b border-champagne/25 pb-4">
              <div>
                <p className="text-xs font-bold uppercase text-champagneInk">
                  Report
                </p>
                <h3 className="mt-1 font-display text-3xl text-ink">
                  生誕祭レポート
                </h3>
              </div>
              <span className="border border-rosefog/30 bg-porcelain px-3 py-2 text-xs font-bold text-ink/62">
                {reportEvents.length}件
              </span>
            </div>
            <div className="grid gap-6">
              {reportEvents.map((event) => (
                <div key={event.id} id={`event-${event.id}`} className="scroll-mt-24">
                  <EventCard event={event} />
                </div>
              ))}
            </div>
          </div>
        )}

        <details className="group mb-12 border-y border-rosefog/25">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 marker:hidden">
            <div>
              <p className="text-xs font-bold uppercase text-champagneInk">Archive</p>
              <h3 className="mt-1 font-display text-3xl text-ink">
                終了済みイベント
              </h3>
              <p className="mt-2 text-sm leading-6 text-ink/55">
                これまでの出演実績を、必要なときだけ開いて確認できます。
              </p>
            </div>
            <span className="flex shrink-0 items-center gap-2 border border-rosefog/30 bg-porcelain px-3 py-2 text-xs font-bold text-ink/62">
              {archiveEvents.length}件
              <ChevronDown
                className="h-4 w-4 text-champagne transition group-open:rotate-180"
                aria-hidden="true"
              />
            </span>
          </summary>
          <div className="grid gap-5 pb-8 pt-2 lg:grid-cols-2">
            {archiveEvents.map((event) => (
              <div key={event.id} id={`event-${event.id}`} className="scroll-mt-24">
                <EventCard event={event} compact />
              </div>
            ))}
          </div>
        </details>

        <div id="calendar" className="scroll-mt-32">
          <div className="mb-5 flex items-end justify-between gap-4 border-b border-champagne/25 pb-4">
            <div>
              <p className="text-xs font-bold uppercase text-champagneInk">Calendar</p>
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
