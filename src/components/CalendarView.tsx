import { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, History } from "lucide-react";
import { getCalendarCells, getEventsForDay, formatMonthTitle } from "../lib/date";
import { categoryMeta } from "../lib/eventMeta";
import type { ScheduleEvent } from "../types";

type CalendarViewProps = {
  events: ScheduleEvent[];
  monthKeys: string[];
};

const weekDays = ["日", "月", "火", "水", "木", "金", "土"];

const currentMonthKey = () => {
  const parts = new Intl.DateTimeFormat("en", {
    timeZone: "Asia/Tokyo",
    year: "numeric",
    month: "2-digit"
  }).formatToParts(new Date());
  const year = parts.find((part) => part.type === "year")?.value;
  const month = parts.find((part) => part.type === "month")?.value;
  return `${year}-${month}`;
};

export function CalendarView({ events, monthKeys }: CalendarViewProps) {
  const thisMonth = currentMonthKey();
  const availableMonthKeys = useMemo(
    () => (monthKeys.length ? monthKeys : [thisMonth]),
    [monthKeys, thisMonth],
  );
  const firstCurrentOrFutureIndex = availableMonthKeys.findIndex(
    (monthKey) => monthKey >= thisMonth,
  );
  const initialIndex =
    firstCurrentOrFutureIndex >= 0
      ? firstCurrentOrFutureIndex
      : Math.max(0, availableMonthKeys.length - 1);
  const [activeIndex, setActiveIndex] = useState(initialIndex);
  const activeMonthKey =
    availableMonthKeys[Math.min(activeIndex, availableMonthKeys.length - 1)];
  const canGoPrevious = activeIndex > 0;
  const canGoNext = activeIndex < availableMonthKeys.length - 1;
  const pastCount = availableMonthKeys.filter((monthKey) => monthKey < thisMonth).length;

  useEffect(() => {
    setActiveIndex(initialIndex);
  }, [initialIndex]);

  return (
    <div>
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2 text-sm font-bold text-ink/62">
          <History className="h-4 w-4 text-champagne" aria-hidden="true" />
          <span>
            {availableMonthKeys.length}か月分
            {pastCount ? `（過去${pastCount}か月を含む）` : ""}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setActiveIndex((current) => Math.max(0, current - 1))}
            disabled={!canGoPrevious}
            className="yukako-button yukako-button-soft min-h-10 px-4 py-2 text-xs disabled:cursor-not-allowed disabled:opacity-40 sm:text-sm"
          >
            <ChevronLeft className="h-4 w-4 text-champagne" aria-hidden="true" />
            前の月
          </button>
          <span className="min-w-28 border border-champagne/35 bg-white px-4 py-2 text-center font-display text-xl text-ink">
            {formatMonthTitle(activeMonthKey)}
          </span>
          <button
            type="button"
            onClick={() =>
              setActiveIndex((current) =>
                Math.min(availableMonthKeys.length - 1, current + 1),
              )
            }
            disabled={!canGoNext}
            className="yukako-button yukako-button-soft min-h-10 px-4 py-2 text-xs disabled:cursor-not-allowed disabled:opacity-40 sm:text-sm"
          >
            次の月
            <ChevronRight className="h-4 w-4 text-champagne" aria-hidden="true" />
          </button>
        </div>
      </div>

      <div id="schedule-calendar-months">
        {[activeMonthKey].map((monthKey) => {
          const monthEvents = events.filter((event) => {
            if (event.dates?.length) {
              return event.dates.some((date) => date.startsWith(monthKey));
            }

            const startMonth = event.startAt.slice(0, 7);
            const endMonth = (event.endAt ?? event.startAt).slice(0, 7);
            return monthKey >= startMonth && monthKey <= endMonth;
          });

          return (
            <section key={monthKey} className="yukako-card border-rosefog/25 bg-white">
          <div className="border-b border-rosefog/20 bg-porcelain px-4 py-4">
            <h3 className="font-display text-2xl text-ink">
              {formatMonthTitle(monthKey)}
            </h3>
          </div>
          <div className="divide-y divide-rosefog/15 sm:hidden">
            {monthEvents.map((event) => {
              const meta = categoryMeta[event.category];

              return (
                <a
                  key={event.id}
                  href={`#event-${event.id}`}
                  className="flex min-h-20 items-center gap-3 px-4 py-3 transition hover:bg-porcelain"
                >
                  <span className={`h-10 w-1 shrink-0 ${meta.dot}`} aria-hidden="true" />
                  <span className="min-w-0 flex-1">
                    <span className="block font-display text-lg leading-tight text-ink">
                      {event.shortTitle}
                    </span>
                    <span className="mt-1 block text-xs font-bold leading-5 text-ink/55">
                      {event.displayDate}
                    </span>
                  </span>
                </a>
              );
            })}
          </div>
          <div className="hidden grid-cols-7 border-b border-rosefog/20 bg-white text-center text-xs font-bold text-ink/55 sm:grid">
            {weekDays.map((day) => (
              <div key={day} className="py-3">
                {day}
              </div>
            ))}
          </div>
          <div className="hidden grid-cols-7 sm:grid">
            {getCalendarCells(monthKey).map((day, index) => {
              const dayEvents = day ? getEventsForDay(events, monthKey, day) : [];

              return (
                <div
                  key={`${monthKey}-${index}`}
                  className={`min-h-[74px] border-b border-r border-rosefog/15 p-1.5 sm:min-h-[92px] ${
                    dayEvents.length ? "bg-porcelain" : "bg-white"
                  }`}
                >
                  {day && (
                    <>
                      <div className="mb-1 text-xs font-bold text-ink/60">{day}</div>
                      <div className="space-y-1">
                        {dayEvents.slice(0, 2).map((event) => {
                          const meta = categoryMeta[event.category];
                          return (
                            <a
                              key={event.id}
                              href={`#event-${event.id}`}
                              className={`block truncate border px-1.5 py-1 text-[10px] font-bold leading-tight ${meta.tone}`}
                              title={event.title}
                            >
                              {event.shortTitle}
                            </a>
                          );
                        })}
                        {dayEvents.length > 2 && (
                          <span className="block text-[10px] font-bold text-champagne">
                            +{dayEvents.length - 2}
                          </span>
                        )}
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
