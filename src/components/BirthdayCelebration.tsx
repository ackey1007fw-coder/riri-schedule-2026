import { Cake } from "lucide-react";
import { profile } from "../data/profile";

// 誕生日当日から数日間だけ、トップにお祝い告知を出す。
// profile.birthdayMonthDay を参照するため、誕生日の日付はここにハードコードしない。
const CELEBRATION_DAYS = 7;
const BIRTHDAY_POST_URL = "https://x.com/mokoopy";

const birthYear = Number(profile.birthday.slice(0, 4));

const jstMonthDay = () => {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Tokyo",
    year: "numeric",
    month: "numeric",
    day: "numeric"
  })
    .formatToParts(new Date())
    .reduce<Record<string, string>>((acc, part) => {
      acc[part.type] = part.value;
      return acc;
    }, {});
  return {
    year: Number(parts.year),
    month: Number(parts.month),
    day: Number(parts.day)
  };
};

const isCelebrationWindow = () => {
  const { month, day } = jstMonthDay();
  const [bMonth, bDay] = profile.birthdayMonthDay.split("-").map(Number);
  return month === bMonth && day >= bDay && day < bDay + CELEBRATION_DAYS;
};

export function BirthdayCelebration() {
  if (!isCelebrationWindow()) return null;

  const age = jstMonthDay().year - birthYear;

  return (
    <a
      href={BIRTHDAY_POST_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="group block border-b border-champagne/40 bg-[linear-gradient(90deg,#fff5ef,#fffdf7_50%,#fdf2e4)] text-ink"
      aria-label={`${profile.name}さんの誕生日お祝い導線を見る`}
    >
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-2 gap-y-1 px-4 py-2.5 text-sm font-black tracking-wide sm:px-6 lg:px-8">
        <Cake className="h-4 w-4 text-champagne" aria-hidden="true" />
        <span>
          {profile.name}さん、{age}歳になりました！
        </span>
        <span className="text-champagne">Happy {age}th Birthday🎂🌻</span>
        <span className="text-ink/70 underline underline-offset-4 transition group-hover:text-ink">
          お祝いを見る →
        </span>
      </div>
    </a>
  );
}
