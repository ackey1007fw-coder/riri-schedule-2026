import type { EventOccurrence, ScheduleEvent } from "../types";

export const SITE_URL = "https://riri-schedule-2026.vercel.app/";

// ISO日時 → Googleカレンダー用のUTCベーシック表記(YYYYMMDDTHHMMSSZ)
const toCalDate = (iso: string) =>
  new Date(iso).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");

export const googleCalendarUrl = (
  event: ScheduleEvent,
  occurrence: EventOccurrence | undefined = event.occurrences?.[0],
) => {
  const isDateOnly = Boolean(event.dates?.length) && !occurrence;
  let dates: string;

  if (isDateOnly) {
    const day = event.dates![0];
    const [year, month, date] = day.split("-").map(Number);
    const nextDay = new Date(Date.UTC(year, month - 1, date + 1))
      .toISOString()
      .slice(0, 10)
      .replace(/-/g, "");
    dates = `${day.replace(/-/g, "")}/${nextDay}`;
  } else {
    const startIso = occurrence?.startAt ?? event.startAt;
    const startMs = new Date(startIso).getTime();
    let endIso = occurrence ? occurrence.endAt ?? startIso : event.endAt ?? startIso;
    // 複数公演や長期間(24h超)のイベントは、初回ぶん(2時間)だけ登録して
    // カレンダーが何日も埋まらないようにする
    if (!occurrence && new Date(endIso).getTime() - startMs > 24 * 3600 * 1000) {
      endIso = new Date(startMs + 2 * 3600 * 1000).toISOString();
    }
    dates = `${toCalDate(startIso)}/${toCalDate(endIso)}`;
  }

  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: occurrence?.label ? `${event.title}（${occurrence.label}）` : event.title,
    dates,
    details: `${event.summary}\n${SITE_URL}`,
  });
  if (event.venue) params.set("location", event.venue);
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
};

const calendarDateLabel = new Intl.DateTimeFormat("ja-JP", {
  timeZone: "Asia/Tokyo", month: "numeric", day: "numeric",
  hour: "2-digit", minute: "2-digit", hourCycle: "h23",
});

// Googleの作成リンクは1予定につき1本。確認済みの各回を選べるようにする。
export const googleCalendarLinks = (event: ScheduleEvent) => {
  if (event.occurrences?.length) {
    return event.occurrences.map((occurrence) => ({
      key: toCalDate(occurrence.startAt),
      label: `${occurrence.label ? `${occurrence.label} ` : ""}${calendarDateLabel.format(new Date(occurrence.startAt))}`,
      url: googleCalendarUrl(event, occurrence),
    }));
  }
  if (event.dates && event.dates.length > 1) {
    return event.dates.map((date) => ({
      key: date,
      label: date,
      url: googleCalendarUrl({ ...event, dates: [date] }),
    }));
  }
  return [{ key: event.id, label: "", url: googleCalendarUrl(event) }];
};

export const xShareUrl = (text: string, url: string) =>
  `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;

export const lineShareUrl = (url: string) =>
  `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(url)}`;

export const threadsShareUrl = (text: string, url: string) =>
  `https://www.threads.net/intent/post?text=${encodeURIComponent(`${text} ${url}`)}`;
