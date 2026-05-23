import type { ScheduleEvent } from "../types";
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
  const nextId = upcomingEvents[0]?.id;

  return (
    <section id="schedule" className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          kicker="Schedule"
          title="カードとカレンダーで見る出演予定"
          copy="直近の応援先はカードで大きく、日付の流れはカレンダーで確認できます。スマホでも縦に読み進めやすい構成です。"
        />

        <div className="mb-12">
          <div className="mb-5 flex items-end justify-between gap-4 border-b border-champagne/25 pb-4">
            <div>
              <p className="text-xs font-bold uppercase text-champagne">
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
          <div className="grid gap-5">
            {upcomingEvents.map((event) => (
              <div key={event.id} id={`event-${event.id}`} className="scroll-mt-24">
                <EventCard event={event} isNext={event.id === nextId} />
              </div>
            ))}
          </div>
        </div>

        <div className="mb-12">
          <div className="mb-5 flex items-end justify-between gap-4 border-b border-rosefog/25 pb-4">
            <div>
              <p className="text-xs font-bold uppercase text-champagne">Archive</p>
              <h3 className="mt-1 font-display text-3xl text-ink">
                終了済みイベント
              </h3>
            </div>
            <span className="border border-rosefog/30 bg-porcelain px-3 py-2 text-xs font-bold text-ink/62">
              {pastEvents.length}件
            </span>
          </div>
          <div className="grid gap-5 lg:grid-cols-2">
            {pastEvents.map((event) => (
              <div key={event.id} id={`event-${event.id}`} className="scroll-mt-24">
                <EventCard event={event} compact />
              </div>
            ))}
          </div>
        </div>

        <div>
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
