import { Cake, PartyPopper, Sparkles } from "lucide-react";
import { profile } from "../data/profile";
import { getResponsiveImageProps } from "../lib/responsiveImage";

// 誕生日当日から数日間だけ、トップに「ハタチ」お祝いカードを表示する。
// ご本人のお祝い投稿（X）と振袖姿の記念ポートレートを主役にした特別演出。
const CELEBRATION_DAYS = 7; // 当日を含めて7日間
const BIRTHDAY_POST_URL =
  "https://x.com/frecam2025_0306/status/2069622787602538770";

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

  const age = jstMonthDay().year - birthYear; // 2026 - 2006 = 20

  return (
    <section
      id="birthday-celebration"
      className="border-b border-champagne/40 bg-[linear-gradient(115deg,#fff2f6,#fffafc_45%,#fdf2e4)]"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-6 px-4 py-9 sm:px-6 lg:grid-cols-[1.04fr_0.96fr] lg:gap-10 lg:px-8 lg:py-14">
        {/* テキスト */}
        <div className="order-2 lg:order-1">
          <p className="inline-flex items-center gap-2 rounded-full border border-champagne/50 bg-white/70 px-3 py-1 text-[11px] font-black uppercase tracking-[0.18em] text-champagne">
            <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
            Happy {age}th Birthday
          </p>
          <h2 className="mt-4 font-display text-4xl leading-[1.05] text-ink sm:text-5xl">
            ハタチ、おめでとう。
          </h2>
          <p className="mt-4 max-w-xl text-base leading-8 text-ink/75">
            {profile.birthdayLabel}、{profile.name}さんが{age}歳になりました。振袖姿の記念ポートレートとともに、ご本人からのうれしいご報告です。
          </p>
          <figure className="mt-5 border-l-2 border-champagne/60 pl-4">
            <blockquote className="font-display text-xl text-ink sm:text-2xl">
              「ハタチになりました㊗️🎂✨️」
            </blockquote>
            <figcaption className="mt-1 text-xs font-bold text-ink/55">
              — {profile.name}（@frecam2025_0306）・2026.6.24
            </figcaption>
          </figure>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={BIRTHDAY_POST_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="riri-button riri-button-primary min-h-12 px-5 py-3 text-sm shadow-paper"
            >
              <Cake className="h-4 w-4" aria-hidden="true" />
              お祝いの投稿を見る
            </a>
            <a
              href="#birthday"
              className="riri-button riri-button-soft min-h-12 px-5 py-3 text-sm"
            >
              <PartyPopper className="h-4 w-4 text-champagne" aria-hidden="true" />
              カウントダウンへ
            </a>
          </div>
        </div>

        {/* 写真（トリミングしない：モバイルは全体表示／PCのみ object-cover） */}
        <div className="order-1 lg:order-2">
          <figure className="riri-card overflow-hidden border-champagne/40 bg-white p-2 shadow-paper">
            <img
              {...getResponsiveImageProps(
                "/images/gallery/g53.jpg",
                "(min-width: 1024px) 45vw, 100vw",
              )}
              alt="振袖姿で赤い和傘を手に、20歳の誕生日を迎えた夏凪里季さんの記念ポートレート"
              loading="eager"
              decoding="async"
              className="block w-full rounded-sm lg:h-[480px] lg:object-cover lg:object-[50%_22%]"
            />
          </figure>
        </div>
      </div>
    </section>
  );
}
