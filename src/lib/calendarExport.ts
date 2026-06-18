import type { ScheduleEvent } from "../types";
import { isEventPast, sortEventsAsc } from "./date";

const escapeText = (value: string) =>
  value
    .replace(/\\/g, "\\\\")
    .replace(/\r?\n/g, "\\n")
    .replace(/,/g, "\\,")
    .replace(/;/g, "\\;");

const utcStamp = (iso: string) =>
  new Date(iso)
    .toISOString()
    .replace(/[-:]/g, "")
    .replace(/\.\d{3}Z$/, "Z");

const dateStamp = (date: string) => date.replace(/-/g, "");

const nextDateStamp = (date: string) => {
  const [year, month, day] = date.split("-").map(Number);
  return new Date(Date.UTC(year, month - 1, day + 1))
    .toISOString()
    .slice(0, 10)
    .replace(/-/g, "");
};

const eventLines = (event: ScheduleEvent) => {
  const common = [
    `SUMMARY:${escapeText(event.title)}`,
    `DESCRIPTION:${escapeText(`${event.summary}\n${event.displayDate}`)}`,
    event.venue ? `LOCATION:${escapeText(event.venue)}` : null,
    event.links[0]?.url ? `URL:${event.links[0].url}` : null
  ].filter((line): line is string => Boolean(line));

  if (event.dates?.length) {
    return event.dates.flatMap((date) => [
      "BEGIN:VEVENT",
      `UID:${event.id}-${date}@riri-schedule-2026.vercel.app`,
      `DTSTAMP:${utcStamp(new Date().toISOString())}`,
      `DTSTART;VALUE=DATE:${dateStamp(date)}`,
      `DTEND;VALUE=DATE:${nextDateStamp(date)}`,
      ...common,
      "END:VEVENT"
    ]);
  }

  return [
    "BEGIN:VEVENT",
    `UID:${event.id}@riri-schedule-2026.vercel.app`,
    `DTSTAMP:${utcStamp(new Date().toISOString())}`,
    `DTSTART:${utcStamp(event.startAt)}`,
    `DTEND:${utcStamp(event.endAt ?? event.startAt)}`,
    ...common,
    "END:VEVENT"
  ];
};

export function downloadScheduleCalendar(events: ScheduleEvent[]) {
  const upcoming = sortEventsAsc(events.filter((event) => !isEventPast(event)));
  const content = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Riri Schedule 2026//Fan Schedule//JA",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "X-WR-CALNAME:夏凪里季 応援スケジュール",
    ...upcoming.flatMap(eventLines),
    "END:VCALENDAR"
  ].join("\r\n");

  const blob = new Blob([content], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = "riri-schedule-2026.ics";
  anchor.style.display = "none";
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}
