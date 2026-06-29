import { PartyPopper } from "lucide-react";
import { profile } from "../data/profile";

// 誕生日当日（JST）だけ、ページ最上部にお祝いバナーを表示する。
const isBirthdayToday = () => {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Tokyo",
    month: "numeric",
    day: "numeric"
  })
    .formatToParts(new Date())
    .reduce<Record<string, string>>((acc, p) => {
      acc[p.type] = p.value;
      return acc;
    }, {});
  const [month, day] = profile.birthdayMonthDay.split("-").map(Number);
  return Number(parts.month) === month && Number(parts.day) === day;
};

export function BirthdayDayBanner() {
  if (!isBirthdayToday()) return null;

  return (
    <a
      href="#birthday"
      className="block bg-[linear-gradient(90deg,#f6dad2,#fbeef0_45%,#fbe7d8)] text-ink"
      aria-label="今日は夏凪里季さんのお誕生日。お祝いへ"
    >
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-2 gap-y-1 px-4 py-2.5 text-sm font-black tracking-wide sm:px-6 lg:px-8">
        <PartyPopper className="h-4 w-4 text-champagne" aria-hidden="true" />
        <span>HAPPY BIRTHDAY 夏凪里季！</span>
        <span className="text-champagne">20歳（ハタチ）おめでとう🎂🌻</span>
        <span className="text-ink/70 underline underline-offset-4">お祝いする →</span>
      </div>
    </a>
  );
}
