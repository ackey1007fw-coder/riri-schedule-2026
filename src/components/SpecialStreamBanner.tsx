import { useEffect, useState } from "react";
import { PartyPopper, Sparkles, Wine } from "lucide-react";
import { profile } from "../data/profile";
import { specialStream } from "../data/streamSchedule";

// 特別配信（誕生日またぎ 乾杯ライブ など）のための華やかなお知らせバナー。
// ・配信当日のあいだ〜配信が終わる頃（開始から約3.5時間後）まで表示。
// ・データ（streamSchedule.ts の specialStream）が null なら非表示。
// ・配信開始までは残り時間のカウントダウンも表示する。
const todayKey = () =>
  new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Tokyo" }).format(new Date());

const formatCountdown = (ms: number): string => {
  const totalMin = Math.floor(ms / 60000);
  const h = Math.floor(totalMin / 60);
  const m = totalMin % 60;
  if (h > 0) return `あと${h}時間${m}分`;
  if (m > 0) return `あと${m}分`;
  return "まもなく";
};

export function SpecialStreamBanner() {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 30000);
    return () => window.clearInterval(timer);
  }, []);

  if (!specialStream) return null;

  const startMs = new Date(
    `${specialStream.date}T${specialStream.time}:00+09:00`
  ).getTime();
  const endMs = startMs + 3.5 * 3600 * 1000;

  // 表示条件：配信当日（JST）のあいだ、または 開始〜終了の時間帯（日付またぎ対応）
  const isOnDay = todayKey() === specialStream.date;
  const isWithinWindow = now >= startMs - 18 * 3600 * 1000 && now <= endMs;
  if (!isOnDay && !isWithinWindow) return null;

  const beforeStart = now < startMs;
  const countdown = beforeStart ? formatCountdown(startMs - now) : null;

  return (
    <a
      href={profile.showroom.url}
      target="_blank"
      rel="noopener noreferrer"
      className="yukako-special-banner block text-ink transition hover:brightness-[1.02]"
      aria-label={`今夜${specialStream.time}から特別配信「${specialStream.title}」。SHOWROOMで待つ`}
    >
      <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center gap-1 px-4 py-2.5 text-center sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-0.5 text-sm font-black tracking-wide sm:text-base">
          <Sparkles
            className="yukako-special-twinkle h-4 w-4 text-champagne"
            aria-hidden="true"
          />
          <span className="rounded-full bg-white/55 px-2 py-0.5 text-[11px] font-black text-champagne">
            SPECIAL
          </span>
          <Wine className="h-4 w-4 text-[#c47a99]" aria-hidden="true" />
          <span>今夜 {specialStream.time}〜</span>
          <span className="text-[#b85c86]">{specialStream.title}</span>
          {countdown && (
            <span className="rounded-full bg-white/55 px-2 py-0.5 text-[11px] font-black text-ink/70">
              {countdown}
            </span>
          )}
          <PartyPopper
            className="yukako-special-twinkle h-4 w-4 text-champagne"
            aria-hidden="true"
          />
        </div>
        <div className="flex flex-wrap items-center justify-center gap-x-2 text-[12px] font-semibold text-ink/70">
          <span>{specialStream.note}</span>
          <span className="font-bold underline underline-offset-4">
            SHOWROOMで待つ →
          </span>
        </div>
      </div>
    </a>
  );
}
