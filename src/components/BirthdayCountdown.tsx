import { Gift, Heart } from "lucide-react";
import { useEffect, useState } from "react";
import { profile } from "../data/profile";
import { getBirthdayCountdown } from "../lib/date";
import { SectionHeader } from "./SectionHeader";

export function BirthdayCountdown() {
  const [countdown, setCountdown] = useState(() =>
    getBirthdayCountdown(profile.birthdayMonthDay),
  );

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCountdown(getBirthdayCountdown(profile.birthdayMonthDay));
    }, 1000);

    return () => window.clearInterval(timer);
  }, []);

  const values = [
    { label: "日", value: countdown.days },
    { label: "時間", value: countdown.hours },
    { label: "分", value: countdown.minutes },
    { label: "秒", value: countdown.seconds }
  ];

  return (
    <section id="birthday" className="scroll-mt-24 bg-porcelain py-16 sm:py-24">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.92fr_1.08fr] lg:px-8">
        <div>
          <SectionHeader
            kicker="Birthday Countdown"
            title="お誕生日までのカウントダウン"
            copy={`${profile.birthdayLabel}に向けて、SNS投稿やSHOWROOMでのお祝い準備を見える場所に。`}
          />
          <div className="border border-champagne/40 bg-white p-5 shadow-paper sm:p-6">
            <div className="mb-5 flex items-center gap-3 text-champagne">
              <Gift className="h-5 w-5" aria-hidden="true" />
              <p className="text-sm font-bold">{countdown.targetLabel}</p>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {values.map((item) => (
                <div key={item.label} className="border border-rosefog/25 bg-porcelain p-4 text-center">
                  <div className="font-display text-4xl text-ink sm:text-5xl">
                    {String(item.value).padStart(2, "0")}
                  </div>
                  <div className="mt-2 text-xs font-bold text-ink/55">{item.label}</div>
                </div>
              ))}
            </div>
            <p className="mt-5 flex items-center gap-2 text-sm font-bold text-ink/70">
              <Heart className="h-4 w-4 text-rosefog" aria-hidden="true" />
              {countdown.isBirthdayToday
                ? "今日はお祝い当日です。"
                : "一緒にお祝いの準備を進めよう。"}
            </p>
          </div>
        </div>

        <div className="columns-2 gap-3 lg:pt-16 [&>img]:mb-3 [&>img]:break-inside-avoid">
          {profile.gallery.map((src, index) => (
            <img
              key={src}
              src={src}
              alt={`${profile.name} gallery ${index + 1}`}
              loading="lazy"
              className="w-full border border-white shadow-sm"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
