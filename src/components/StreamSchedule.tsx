import { CalendarClock } from "lucide-react";
import { streamSchedule } from "../data/streamSchedule";

const partsFmt = new Intl.DateTimeFormat("ja-JP", {
  timeZone: "Asia/Tokyo",
  month: "numeric",
  day: "numeric",
  weekday: "short"
});

// JSTの今日（YYYY-MM-DD）
const todayKey = () =>
  new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Tokyo" }).format(new Date());

export function StreamSchedule() {
  const now = Date.now();
  const slots = streamSchedule
    .map((slot) => {
      const start = new Date(`${slot.date}T${slot.time}:00+09:00`);
      return { ...slot, start, ms: start.getTime() };
    })
    // 開始から約3時間は表示（配信中も残す）。それ以降は自動で非表示
    .filter((slot) => slot.ms + 3 * 3600 * 1000 > now)
    .sort((a, b) => a.ms - b.ms);

  if (slots.length === 0) {
    return null;
  }

  const today = todayKey();

  return (
    <div className="mb-12 border border-rosefog/25 bg-white p-6 sm:p-8">
      <p className="mb-5 flex items-center gap-2 text-sm font-black uppercase tracking-wide text-champagne">
        <CalendarClock className="h-4 w-4" aria-hidden="true" />
        配信予定
      </p>
      <ul className="grid gap-3">
        {slots.map((slot) => {
          const parts = partsFmt
            .formatToParts(slot.start)
            .reduce<Record<string, string>>((acc, part) => {
              acc[part.type] = part.value;
              return acc;
            }, {});
          const isToday = slot.date === today;

          return (
            <li
              key={`${slot.date}-${slot.time}`}
              className="flex flex-wrap items-center gap-x-3 gap-y-1 border-b border-rosefog/15 pb-3 last:border-0 last:pb-0"
            >
              <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-champagne" aria-hidden="true" />
              <span className="font-display text-lg text-ink">
                {parts.month}/{parts.day}（{parts.weekday}）
              </span>
              {isToday && (
                <span className="border border-rosefog/40 bg-porcelain px-2 py-0.5 text-[10px] font-black text-rosefog">
                  本日
                </span>
              )}
              <span className="text-sm font-bold text-ink/70">{slot.time} 開始</span>
              {slot.note && <span className="text-sm text-ink/55">{slot.note}</span>}
            </li>
          );
        })}
      </ul>
      <p className="mt-4 text-xs leading-6 text-ink/45">
        ※配信者の都合により、予告なく変更となる場合があります。
      </p>
    </div>
  );
}
