import { Gift, Heart } from "lucide-react";
import { useEffect, useState } from "react";
import { profile } from "../data/profile";
import { getBirthdayCountdown } from "../lib/date";

// 誕生日のこの日数以内になったらトップにバナーを表示する
const SHOW_WITHIN_DAYS = 31;

const birthYear = Number(profile.birthday.slice(0, 4));

export function BirthdayBanner() {
  const [countdown, setCountdown] = useState(() =>
    getBirthdayCountdown(profile.birthdayMonthDay, new Date(), birthYear),
  );

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCountdown(
        getBirthdayCountdown(profile.birthdayMonthDay, new Date(), birthYear),
      );
    }, 1000);

    return () => window.clearInterval(timer);
  }, []);

  const isUpcoming =
    countdown.isBirthdayToday || countdown.days <= SHOW_WITHIN_DAYS;

  const ageLabel =
    countdown.turningAge === undefined
      ? ""
      : countdown.turningAge === 20
        ? "20歳（ハタチ）"
        : `${countdown.turningAge}歳`;

  if (!isUpcoming) {
    return null;
  }

  const units = [
    { label: "日", value: countdown.days },
    { label: "時間", value: countdown.hours },
    { label: "分", value: countdown.minutes },
    { label: "秒", value: countdown.seconds }
  ];

  return (
    <a
      href="#birthday"
      className="group block border-b border-champagne/40 bg-[linear-gradient(90deg,#fff4f7,#fffafc_55%,#fdf3e6)]"
    >
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-3 px-4 py-3 sm:flex-row sm:justify-between sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 text-ink">
          <span className="grid h-9 w-9 shrink-0 place-items-center border border-champagne bg-white text-champagne">
            {countdown.isBirthdayToday ? (
              <Heart className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Gift className="h-5 w-5" aria-hidden="true" />
            )}
          </span>
          <span className="min-w-0">
            <span className="block text-[11px] font-black uppercase tracking-wide text-champagne">
              RiRi Birthday
            </span>
            <span className="block font-display text-lg leading-tight sm:text-xl">
              {countdown.isBirthdayToday
                ? `Happy Birthday！${profile.birthdayLabel}${
                    ageLabel ? `・${ageLabel}` : ""
                  }🎉`
                : `${profile.birthdayLabel}${
                    ageLabel ? `・${ageLabel}` : ""
                  }まであと ${countdown.days} 日`}
            </span>
          </span>
        </div>

        {!countdown.isBirthdayToday && (
          <div className="flex items-center gap-2">
            {units.map((unit) => (
              <span
                key={unit.label}
                className="flex min-w-[52px] flex-col items-center border border-rosefog/30 bg-white/80 px-2 py-1"
              >
                <span className="font-display text-xl leading-none text-ink">
                  {String(unit.value).padStart(2, "0")}
                </span>
                <span className="mt-1 text-[10px] font-bold text-ink/55">
                  {unit.label}
                </span>
              </span>
            ))}
            <span className="ml-1 hidden text-sm font-bold text-ink/70 underline-offset-4 group-hover:underline sm:inline">
              お祝いの準備へ
            </span>
          </div>
        )}
      </div>
    </a>
  );
}
