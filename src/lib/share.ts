import type { ScheduleEvent } from "../types";

export const SITE_URL = "https://riri-schedule-2026.vercel.app/";

// ISO日時 → Googleカレンダー用のUTCベーシック表記(YYYYMMDDTHHMMSSZ)
const toCalDate = (iso: string) =>
  new Date(iso).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");

export const googleCalendarUrl = (event: ScheduleEvent) => {
  const isDateOnly = Boolean(event.dates?.length) && !event.occurrences?.length;
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
    const startMs = new Date(event.startAt).getTime();
    let endIso = event.endAt ?? event.startAt;
    // 複数公演や長期間(24h超)のイベントは、初回ぶん(2時間)だけ登録して
    // カレンダーが何日も埋まらないようにする
    if (new Date(endIso).getTime() - startMs > 24 * 3600 * 1000) {
      endIso = new Date(startMs + 2 * 3600 * 1000).toISOString();
    }
    dates = `${toCalDate(event.startAt)}/${toCalDate(endIso)}`;
  }

  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: event.title,
    dates,
    details: `${event.summary}\n${SITE_URL}`,
  });
  if (event.venue) params.set("location", event.venue);
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
};

export const xShareUrl = (text: string, url: string) =>
  `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;

export const lineShareUrl = (url: string) =>
  `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(url)}`;

export const threadsShareUrl = (text: string, url: string) =>
  `https://www.threads.net/intent/post?text=${encodeURIComponent(`${text} ${url}`)}`;
