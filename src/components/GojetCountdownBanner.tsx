import { CalendarHeart, PartyPopper, Ticket } from "lucide-react";
import { gojetTicketUrl } from "../data/gojetTimetable";
import { getGojetStatus } from "../lib/gojetStatus";

// #ゆかJET『GO,JET!GO!GO! vol.1 Premium』への導線バナー。
// ・公演前（〜7/22）：公演まであと◯日
// ・公演期間中（7/23〜27）：本日の回（班・開演時間）
// ・7/28以降：自動で非表示
export function GojetCountdownBanner() {
  const status = getGojetStatus();

  if (status.phase === "after") return null;

  const todayShow = status.phase === "today" ? status.day : null;

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
            {todayShow.note && (
              <span className="w-full text-xs font-semibold leading-5 text-ink/62 sm:w-auto">
                {todayShow.note}
              </span>
            )}
          </>
        ) : (
          <>
            <CalendarHeart className="h-4 w-4 shrink-0 text-rosefog" aria-hidden="true" />
            <span className="text-rosefog">
              #ゆかJET『GO,JET!GO!GO! vol.1 Premium』
            </span>
            <span className="font-black">
              公演まであと{status.phase === "before" ? status.daysLeft : 0}日
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
