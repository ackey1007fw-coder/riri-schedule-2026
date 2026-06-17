import type { ScheduleEvent } from "../types";

export const toDateKey = (iso: string) => iso.slice(0, 10);

export const eventStartDate = (event: ScheduleEvent) => new Date(event.startAt);

export const eventEndDate = (event: ScheduleEvent) =>
  new Date(event.endAt ?? event.startAt);

export const isEventPast = (event: ScheduleEvent, now = new Date()) =>
  eventEndDate(event).getTime() < now.getTime();

export const sortEventsAsc = (events: ScheduleEvent[]) =>
  [...events].sort(
    (a, b) => eventStartDate(a).getTime() - eventStartDate(b).getTime(),
  );

export const sortEventsDesc = (events: ScheduleEvent[]) =>
  [...events].sort(
    (a, b) => eventStartDate(b).getTime() - eventStartDate(a).getTime(),
  );

export const getMonthKeysFromEvents = (events: ScheduleEvent[]) => {
  const keys = new Set<string>();

  events.forEach((event) => {
    const start = toDateKey(event.startAt);
    const end = toDateKey(event.endAt ?? event.startAt);
    keys.add(start.slice(0, 7));
    keys.add(end.slice(0, 7));
  });

  return [...keys].sort();
};

export const getDaysInMonth = (year: number, monthIndex: number) =>
  new Date(year, monthIndex + 1, 0).getDate();

export const getCalendarCells = (monthKey: string) => {
  const [year, month] = monthKey.split("-").map(Number);
  const monthIndex = month - 1;
  const firstDay = new Date(year, monthIndex, 1).getDay();
  const totalDays = getDaysInMonth(year, monthIndex);
  const blanks = Array.from({ length: firstDay }, () => null);
  const days = Array.from({ length: totalDays }, (_, index) => index + 1);

  return [...blanks, ...days];
};

export const formatMonthTitle = (monthKey: string) => {
  const [year, month] = monthKey.split("-");
  return `${year}年 ${Number(month)}月`;
};

export const getEventsForDay = (
  events: ScheduleEvent[],
  monthKey: string,
  day: number,
) => {
  const key = `${monthKey}-${String(day).padStart(2, "0")}`;

  return events.filter((event) => {
    // 公演日が飛び飛びのイベント(dates指定)は、その日だけ表示
    if (event.dates && event.dates.length > 0) {
      return event.dates.includes(key);
    }
    const start = toDateKey(event.startAt);
    const end = toDateKey(event.endAt ?? event.startAt);
    return key >= start && key <= end;
  });
};

export type CountdownParts = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  targetYear: number;
  targetLabel: string;
  isBirthdayToday: boolean;
  /** その誕生日で迎える年齢（birthYear 指定時のみ算出） */
  turningAge?: number;
};

export const getBirthdayCountdown = (
  monthDay: string,
  now = new Date(),
  birthYear?: number,
): CountdownParts => {
  const [month, day] = monthDay.split("-").map(Number);
  const isBirthdayToday =
    now.getMonth() + 1 === month && now.getDate() === day;
  const ageAt = (year: number) =>
    birthYear === undefined ? undefined : year - birthYear;

  if (isBirthdayToday) {
    const targetYear = now.getFullYear();
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      targetYear,
      targetLabel: `${targetYear}年${month}月${day}日`,
      isBirthdayToday: true,
      turningAge: ageAt(targetYear)
    };
  }

  let target = new Date(now.getFullYear(), month - 1, day, 0, 0, 0);

  if (target.getTime() < now.getTime()) {
    target = new Date(now.getFullYear() + 1, month - 1, day, 0, 0, 0);
  }

  const diff = Math.max(target.getTime() - now.getTime(), 0);
  const secondsTotal = Math.floor(diff / 1000);
  const days = Math.floor(secondsTotal / 86400);
  const hours = Math.floor((secondsTotal % 86400) / 3600);
  const minutes = Math.floor((secondsTotal % 3600) / 60);
  const seconds = secondsTotal % 60;
  const targetYear = target.getFullYear();

  return {
    days,
    hours,
    minutes,
    seconds,
    targetYear,
    targetLabel: `${targetYear}年${month}月${day}日`,
    isBirthdayToday: false,
    turningAge: ageAt(targetYear)
  };
};
