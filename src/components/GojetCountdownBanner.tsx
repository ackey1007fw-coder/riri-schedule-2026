import { CalendarHeart, PartyPopper, Ticket } from "lucide-react";
import {
  gojetClosingDate,
  gojetOpeningDate,
  gojetTicketUrl,
  gojetTimetable
} from "../data/gojetTimetable";

// #ゆかJET『GO,JET!GO!GO! vol.1 Premium』への導線バナー。
// ・公演前（〜7/22）：公演まであと◯日
// ・公演期間中（7/23〜27）：本日の回（班・開演時間）
// ・7/28以降：自動で非表示
const todayKey = () =>
  new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Tokyo" }).format(new Date());

const daysUntil = (fromKey: string, toKey: string) => {
  const [fy, fm, fd] = fromKey.split("-").map(Number);
  const [ty, tm, td] = toKey.split("-").map(Number);
  return Math.round(
    (Date.UTC(ty, tm - 1, td) - Date.UTC(fy, fm - 1, fd)) / 86400000
  );
};

export function GojetCountdownBanner() {
  const today = todayKey();

  if (today > gojetClosingDate) return null;

  const todayShow = gojetTimetable.find((day) => day.date === today);

  return (
    <a
      href={gojetTicketUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="block border-b border-champagne/30 bg-gradient-to-r from-[#fbeef0] to-[#faf3e2] text-ink transition hover:brightness-[1.02]"
      aria-label={
        todayShow
          ? "本日の#ゆかJET公演情報とチケット・応援ページ"
          : "#ゆかJETの公演まであと何日かとチケット・応援ページ"
      }
    >
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-3 gap-y-1 px-4 py-2.5 text-center text-sm font-bold sm:px-6 lg:px-8">
        {todayShow ? (
          <>
            <PartyPopper className="h-4 w-4 shrink-0 text-rosefog" aria-hidden="true" />
            <span className="text-rosefog">本日の #ゆかJET</span>
            <span className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
              {todayShow.performances.map((performance) => (
                <span
                  key={`${performance.time}-${performance.team}`}
                  className="font-black"
                >
                  {performance.time}〜 {performance.team}
                </span>
              ))}
            </span>
          </>
        ) : (
          <>
            <CalendarHeart className="h-4 w-4 shrink-0 text-rosefog" aria-hidden="true" />
            <span className="text-rosefog">
              #ゆかJET『GO,JET!GO!GO! vol.1 Premium』
            </span>
            <span className="font-black">
              公演まであと{daysUntil(today, gojetOpeningDate)}日
            </span>
          </>
        )}
        <span className="hidden items-center gap-1 text-xs font-bold text-champagne underline underline-offset-4 sm:inline-flex">
          <Ticket className="h-3.5 w-3.5" aria-hidden="true" />
          チケット・応援はこちら →
        </span>
      </div>
    </a>
  );
}
