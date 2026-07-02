import {
  gojetClosingDate,
  gojetOpeningDate,
  gojetTimetable,
  type GojetTimetableDay
} from "../data/gojetTimetable";

export const gojetTodayKey = () =>
  new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Tokyo" }).format(new Date());

export const gojetDaysUntil = (fromKey: string, toKey: string) => {
  const [fy, fm, fd] = fromKey.split("-").map(Number);
  const [ty, tm, td] = toKey.split("-").map(Number);
  return Math.round(
    (Date.UTC(ty, tm - 1, td) - Date.UTC(fy, fm - 1, fd)) / 86400000
  );
};

export type GojetStatus =
  | { phase: "before"; daysLeft: number }
  | { phase: "today"; day: GojetTimetableDay }
  | { phase: "after" };

// #ゆかJET『GO,JET!GO!GO! vol.1 Premium』の公演フェーズを判定する。
// ・公演前：あと何日か（before）
// ・公演期間中（7/23〜27）：本日の回（today）
// ・7/28以降：終了（after）
export const getGojetStatus = (today = gojetTodayKey()): GojetStatus => {
  if (today > gojetClosingDate) return { phase: "after" };

  const day = gojetTimetable.find((entry) => entry.date === today);
  if (day) return { phase: "today", day };

  return { phase: "before", daysLeft: gojetDaysUntil(today, gojetOpeningDate) };
};
