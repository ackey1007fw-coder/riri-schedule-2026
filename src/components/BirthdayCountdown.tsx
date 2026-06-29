import { Gift, Heart, PartyPopper, Sparkles } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { profile } from "../data/profile";
import { getBirthdayCountdown } from "../lib/date";
import { getResponsiveImageProps } from "../lib/responsiveImage";
import { SectionHeader } from "./SectionHeader";

const birthYear = Number(profile.birthday.slice(0, 4));

// お誕生日のこの日数以内に近づいたら、カウントダウンのセクションを表示する。
// （普段＝遠いときは丸ごと非表示。来年まで363日…といった表示を避ける）
const SHOW_WITHIN_DAYS = 60;

type Spark = {
  id: number;
  left: number;
  delay: number;
  heart: boolean;
};

export function BirthdayCountdown() {
  const [isCelebrating, setIsCelebrating] = useState(false);
  const celebrationTimer = useRef<number | null>(null);
  const [thanked, setThanked] = useState(false);
  const thankTimer = useRef<number | null>(null);
  const [countdown, setCountdown] = useState(() =>
    getBirthdayCountdown(profile.birthdayMonthDay, new Date(), birthYear),
  );
  const [sparks, setSparks] = useState<Spark[]>([]);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCountdown(
        getBirthdayCountdown(profile.birthdayMonthDay, new Date(), birthYear),
      );
    }, 1000);

    return () => window.clearInterval(timer);
  }, []);

  useEffect(
    () => () => {
      if (celebrationTimer.current !== null) {
        window.clearTimeout(celebrationTimer.current);
      }
      if (thankTimer.current !== null) {
        window.clearTimeout(thankTimer.current);
      }
    },
    [],
  );

  const celebrate = () => {
    const base = Date.now();
    const items = Array.from({ length: 14 }, (_, index) => ({
      id: base + index,
      left: 6 + Math.random() * 88,
      delay: Math.random() * 220,
      heart: index % 2 === 0
    }));

    // お礼メッセージは設定（reduced-motion）に関係なく必ず表示する手応え
    setThanked(true);
    if (thankTimer.current !== null) {
      window.clearTimeout(thankTimer.current);
    }
    thankTimer.current = window.setTimeout(() => {
      setThanked(false);
      thankTimer.current = null;
    }, 2600);

    setIsCelebrating(false);
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => setIsCelebrating(true));
    });
    if (celebrationTimer.current !== null) {
      window.clearTimeout(celebrationTimer.current);
    }
    celebrationTimer.current = window.setTimeout(() => {
      setIsCelebrating(false);
      celebrationTimer.current = null;
    }, 620);
    setSparks((current) => [...current, ...items]);
    window.setTimeout(() => {
      setSparks((current) =>
        current.filter((spark) => !items.some((item) => item.id === spark.id)),
      );
    }, 1500);
  };

  const ageLabel =
    countdown.turningAge === undefined
      ? ""
      : countdown.turningAge === 20
        ? "20歳（ハタチ）"
        : `${countdown.turningAge}歳`;

  const values = [
    { label: "日", value: countdown.days },
    { label: "時間", value: countdown.hours },
    { label: "分", value: countdown.minutes },
    { label: "秒", value: countdown.seconds }
  ];

  // お誕生日が近づいたときだけ表示（遠いときはセクションごと非表示）
  const isApproaching =
    countdown.isBirthdayToday || countdown.days <= SHOW_WITHIN_DAYS;
  if (!isApproaching) return null;

  return (
    <section id="birthday" className="scroll-mt-24 bg-porcelain py-16 sm:py-24">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.92fr_1.08fr] lg:px-8">
        <div>
          <SectionHeader
            kicker="Birthday Countdown"
            title="お誕生日までのカウントダウン"
            copy={`${profile.birthdayLabel}${
              ageLabel ? `・${ageLabel}の記念日` : ""
            }まで、あと少し。SNSやSHOWROOMで一緒にお祝いしよう。`}
          />
          <div
            className={`birthday-card riri-card riri-card-interactive relative overflow-hidden border-champagne/40 bg-white p-5 shadow-paper sm:p-6 ${
              isCelebrating ? "birthday-card-active" : ""
            }`}
          >
            <span className="birthday-glow" aria-hidden="true" />
            <div
              className="pointer-events-none absolute inset-0 z-20 overflow-hidden"
              aria-hidden="true"
            >
              {sparks.map((spark) => (
                <span
                  key={spark.id}
                  className="birthday-confetti absolute bottom-12"
                  style={{
                    left: `${spark.left}%`,
                    animationDelay: `${spark.delay}ms`
                  }}
                >
                  {spark.heart ? (
                    <Heart className="h-6 w-6 fill-rosefog text-rosefog" />
                  ) : (
                    <Sparkles className="h-6 w-6 text-champagne" />
                  )}
                </span>
              ))}
            </div>

            <div className="relative z-10">
              <div className="mb-5 flex items-center gap-3 text-champagne">
                <Gift className="h-5 w-5" aria-hidden="true" />
                <p className="text-sm font-bold">
                  {countdown.targetLabel}
                  {ageLabel ? `・${ageLabel}` : ""}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {values.map((item) => (
                  <div
                    key={item.label}
                    className="birthday-number-card rounded-md border border-rosefog/25 bg-porcelain p-4 text-center"
                  >
                    <span
                      key={item.value}
                      className="birthday-number-pop block font-display text-4xl tabular-nums text-ink sm:text-5xl"
                    >
                      {String(item.value).padStart(2, "0")}
                    </span>
                    <div className="mt-2 text-xs font-bold text-ink/55">
                      {item.label}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                <p
                  className="flex items-center gap-2 text-sm font-bold text-ink/70"
                  aria-live="polite"
                >
                  <Heart className="h-4 w-4 text-rosefog" aria-hidden="true" />
                  {thanked
                    ? "おめでとうを贈りました！🎉 ありがとう♡"
                    : countdown.isBirthdayToday
                      ? "今日はお祝い当日です。"
                      : "一緒にお祝いの準備を進めよう。"}
                </p>
                <button
                  type="button"
                  onClick={celebrate}
                  className="riri-button riri-button-soft min-h-11 rounded-md px-4 py-2 text-sm"
                  aria-label="お祝いのキラキラを贈る"
                >
                  <PartyPopper
                    className="h-4 w-4 text-champagne"
                    aria-hidden="true"
                  />
                  {thanked ? "ありがとう！" : "おめでとうを贈る"}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="columns-2 gap-3 lg:pt-16 [&>img]:mb-3 [&>img]:break-inside-avoid">
          {profile.gallery.map((src, index) => (
            <img
              key={src}
              {...getResponsiveImageProps(
                src,
                "(min-width: 1024px) 25vw, 50vw",
              )}
              alt={`${profile.name} gallery ${index + 1}`}
              loading="lazy"
              decoding="async"
              className="birthday-photo h-auto w-full rounded-md border border-white shadow-sm"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
