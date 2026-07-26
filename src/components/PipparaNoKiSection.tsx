import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  CalendarDays,
  ChevronDown,
  Clock,
  Drama,
  ExternalLink,
  Instagram,
  MapPin,
  PenLine,
  Quote,
  Sparkles,
  Ticket,
  Users,
  X
} from "lucide-react";
import { getResponsiveImageProps } from "../lib/responsiveImage";
import { SectionHeader } from "./SectionHeader";
import { VenueMap } from "./VenueMap";

const pipparaTicketUrl =
  "https://tiget.net/events?q%5Bwords%5D=%E3%83%94%E3%83%83%E3%83%91%E3%83%A9%E3%81%AE%E6%A8%B9";

type Stage = {
  no: number;
  /** 開演時刻（日本時間） */
  iso: string;
  month: number;
  day: number;
  weekday: string;
  time: string;
};

const pipparaStages: Stage[] = [
  { no: 1, iso: "2026-08-18T19:30:00+09:00", month: 8, day: 18, weekday: "火", time: "19:30" },
  { no: 2, iso: "2026-08-22T12:00:00+09:00", month: 8, day: 22, weekday: "土", time: "12:00" },
  { no: 3, iso: "2026-08-23T15:30:00+09:00", month: 8, day: 23, weekday: "日", time: "15:30" },
  { no: 4, iso: "2026-08-25T14:00:00+09:00", month: 8, day: 25, weekday: "火", time: "14:00" },
  { no: 5, iso: "2026-08-28T19:30:00+09:00", month: 8, day: 28, weekday: "金", time: "19:30" },
  { no: 6, iso: "2026-08-29T19:30:00+09:00", month: 8, day: 29, weekday: "土", time: "19:30" }
];

type FlyerImage = {
  src: string;
  alt: string;
};

const pipparaFlyer: FlyerImage = {
  src: "/images/pippara-no-ki-flyer-2026.jpg",
  alt: "劇団ココア『ピッパラの樹』公演フライヤー。夏凪里季さんはA班に出演"
};
const hominFlyer: FlyerImage = {
  src: "/images/im-talking-about-homin-flyer-2026.jpg",
  alt: "月シア別冊第2集『I'm talking about Homin'』公演フライヤー。夏凪里季さんはA sideに出演"
};
const pipparaPortraitMain: FlyerImage = {
  src: "/images/pippara-no-ki-portrait-01.jpg",
  alt: "舞台『ピッパラの樹』の衣装姿で胸元に両手を重ねる夏凪里季さん"
};
const pipparaPortraitSub: FlyerImage = {
  src: "/images/pippara-no-ki-portrait-02.jpg",
  alt: "舞台『ピッパラの樹』の衣装姿で頬に手を添える夏凪里季さん"
};
const pipparaMainVisual: FlyerImage = {
  src: "/images/pippara-no-ki-main-visual-2026.jpg",
  alt: "鐘と青い薔薇、ヨーロッパ風建築を描いた舞台『ピッパラの樹』メインビジュアル"
};
const rehearsalPhoto: FlyerImage = {
  src: "/images/gallery/g66.jpg",
  alt: "淡いブルーグレーのシャーリングトップスで鏡越しに自撮りする夏凪里季さん（『ピッパラの樹』A班 稽古初日）"
};

const relatedImages: FlyerImage[] = [
  pipparaPortraitSub,
  pipparaMainVisual,
  { ...pipparaFlyer, alt: "劇団ココア『ピッパラの樹』出演者一覧と公演日程を掲載したフライヤー" }
];

/** 投稿本文はここに一度だけ置き、セクション内で重複表示しない */
type SnsPost = {
  id: string;
  platform: "X" | "Instagram";
  handle: string;
  datetime: string;
  headline: string;
  body: string;
  quote?: string;
  url: string;
};

const snsPosts: SnsPost[] = [
  {
    id: "x-2026-07-11",
    platform: "X",
    handle: "@frecam2025_0306",
    datetime: "2026年7月11日（土）22:15",
    headline: "8月・9月の出演予定をまとめて告知",
    body: `【8月9月の出演予定】

◎劇団ココア『ピッパラの樹』（A班）
📍荻窪小劇場
① 8月18日（火）19:30
② 8月22日（土）12:00
③ 8月23日（日）15:30
④ 8月25日（火）14:00
⑤ 8月28日（金）19:30
⑥ 8月29日（土）19:30

ご予約の際は、備考欄に「夏凪里季」とご記入ください。

◎月シア別冊第2集『I'm talking about Homin'』（A side）
📍西荻窪 遊空間がざびぃ
① 9月11日（金）19:00
② 9月12日（土）12:00
③ 9月13日（日）12:00
④ 9月15日（火）18:00`,
    quote: `近々で2つの舞台ですが、どちらも疎かにしたくないし、
どちらもたくさんの人に見に来てほしいです。

見に行ってよかったと思ってもらえるように頑張りますので、
皆様ご検討よろしくお願いします`,
    url: "https://x.com/frecam2025_0306/status/2075931870681063715"
  },
  {
    id: "instagram-role",
    platform: "Instagram",
    handle: "@__ririri__24",
    datetime: "2026年7月",
    headline: "A班「アナスタジー・ド・ブロワ役」を発表",
    body: `舞台『ピッパラの樹』

A班のアナスタジー・ド・ブロワ役を
務めさせていただきます。

初めての役柄で、今からとても楽しみです💞
大切に演じさせていただきます。

📍荻窪小劇場

① 8月18日（火）19:30
② 8月22日（土）12:00
③ 8月23日（日）15:30
④ 8月25日（火）14:00
⑤ 8月28日（金）19:30
⑥ 8月29日（土）19:30

ご予約の際は、備考欄に
「夏凪里季」
とご記入ください。`,
    url: "https://www.instagram.com/p/DbJsE5tkh7n/?igsh=NjBndms4aXlhM3d5"
  }
];

/** 最新の稽古レポート（写真つきで大きく扱う） */
const rehearsalReport = {
  datetime: "2026年7月26日（日）22:35",
  body: `#ピッパラの樹 A班本日稽古初日でした✨️
改善点は山々ですが良い作品になる予感！

チケット目標まだ届いてないのに売り切れちゃいそうだから今すぐゲットして欲しいな🥹💖
いつもと違うりりが見れますヨ🫶🏻`,
  quote: "改善点は山々ですが良い作品になる予感！",
  url: "https://x.com/frecam2025_0306/status/2081372754612486194"
};

const MS_PER_DAY = 1000 * 60 * 60 * 24;

const AccountAvatar = ({ platform }: { platform: SnsPost["platform"] }) => (
  <span
    className="grid h-10 w-10 shrink-0 place-items-center border border-[#c9a24b]/50 bg-[#f8f3e6] font-display text-lg text-[#6f2f3c]"
    aria-hidden="true"
  >
    {platform === "Instagram" ? <Instagram className="h-4 w-4" /> : "里"}
  </span>
);

export function PipparaNoKiSection() {
  const [zoomedImage, setZoomedImage] = useState<FlyerImage | null>(null);
  const zoomTriggerRef = useRef<HTMLElement | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const closeZoom = useCallback(() => setZoomedImage(null), []);

  const openZoom = useCallback(
    (image: FlyerImage) => (event: React.MouseEvent<HTMLButtonElement>) => {
      zoomTriggerRef.current = event.currentTarget;
      setZoomedImage(image);
    },
    []
  );

  useEffect(() => {
    if (!zoomedImage) return;

    closeButtonRef.current?.focus();
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeZoom();
        return;
      }
      if (event.key !== "Tab" || !dialogRef.current) return;

      const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
        'button, [href], [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
      zoomTriggerRef.current?.focus();
    };
  }, [zoomedImage, closeZoom]);

  // 「もう終わった回」と「これから行ける回」がひと目で分かるようにする
  const { stages, remaining, daysToNext } = useMemo(() => {
    const now = Date.now();
    const marked = pipparaStages.map((stage) => ({
      ...stage,
      isPast: new Date(stage.iso).getTime() < now
    }));
    const upcoming = marked.filter((stage) => !stage.isPast);
    const next = upcoming[0];

    return {
      stages: marked,
      remaining: upcoming.length,
      daysToNext: next
        ? Math.max(0, Math.ceil((new Date(next.iso).getTime() - now) / MS_PER_DAY))
        : null
    };
  }, []);

  return (
    <section
      id="pippara-no-ki"
      className="scroll-mt-24 border-y border-[#7c5a3a]/20 bg-[#f8f3e6] py-16 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          kicker="Stage Feature"
          title="舞台『ピッパラの樹』"
          copy="夏凪里季さんが、A班「アナスタジー・ド・ブロワ役」で出演！"
        />

        {/* 最新トピック：稽古レポート */}
        <article className="riri-card overflow-hidden border-[#7c5a3a]/25 bg-white shadow-paper">
          <div className="h-1.5 bg-[linear-gradient(90deg,#2f4a3a_0%,#6f2f3c_35%,#c9a24b_68%,#2f4a3a_100%)]" />
          <div className="grid gap-0 sm:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
            <div className="border-b border-[#7c5a3a]/15 bg-[#f0ead9] p-4 sm:border-b-0 sm:border-r sm:p-6">
              <button
                type="button"
                onClick={openZoom(rehearsalPhoto)}
                className="group block w-full text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-champagne"
                aria-label="稽古初日の夏凪里季さんの写真を拡大表示"
              >
                <span className="relative block overflow-hidden border border-[#7c5a3a]/30 bg-white">
                  <img
                    {...getResponsiveImageProps(
                      rehearsalPhoto.src,
                      "(min-width: 640px) 40vw, 100vw"
                    )}
                    alt={rehearsalPhoto.alt}
                    loading="lazy"
                    decoding="async"
                    className="block w-full"
                  />
                  <span className="pointer-events-none absolute inset-0 bg-ink/10 opacity-0 transition group-hover:opacity-100 group-focus-visible:opacity-100" />
                </span>
                <span className="mt-2 inline-block text-xs font-bold text-[#6f2f3c]">
                  タップして拡大表示
                </span>
              </button>
            </div>

            <div className="p-5 sm:p-7 lg:p-9">
              <p className="inline-flex items-center gap-1.5 border border-[#6f2f3c]/30 bg-[#6f2f3c] px-2.5 py-1 text-xs font-bold text-white">
                <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                最新トピック
              </p>
              <h3 className="mt-3 font-display text-2xl leading-tight text-ink sm:text-3xl">
                A班、稽古初日レポート
              </h3>
              <p className="mt-1 text-xs text-ink/45">{rehearsalReport.datetime}・X</p>

              <blockquote className="mt-4 border-l-4 border-[#c9a24b] bg-[#f8f3e6] px-4 py-3">
                <Quote className="h-4 w-4 text-[#6f2f3c]" aria-hidden="true" />
                <p className="mt-2 font-display text-lg leading-8 text-ink">
                  {rehearsalReport.quote}
                </p>
              </blockquote>

              <div className="mt-4 whitespace-pre-line text-sm leading-7 text-ink/80">
                {rehearsalReport.body}
              </div>

              <a
                href={rehearsalReport.url}
                target="_blank"
                rel="noopener noreferrer"
                className="riri-button riri-button-soft mt-5 min-h-12 px-4 py-3 text-sm"
              >
                Xで投稿を見る
                <ExternalLink className="h-4 w-4 shrink-0" aria-hidden="true" />
              </a>
            </div>
          </div>
        </article>

        {/* 公演概要 */}
        <div className="mt-8 riri-card overflow-hidden border-[#7c5a3a]/25 bg-white shadow-paper">
          <div className="grid gap-0 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
            <div className="border-b border-[#7c5a3a]/15 bg-[#f0ead9] p-4 sm:p-6 lg:border-b-0 lg:border-r">
              <button
                type="button"
                onClick={openZoom(pipparaPortraitMain)}
                className="group block w-full text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-champagne"
                aria-label="『ピッパラの樹』衣装姿の夏凪里季さんの写真を拡大表示"
              >
                <span className="relative block overflow-hidden border border-[#7c5a3a]/30 bg-white">
                  <img
                    {...getResponsiveImageProps(
                      pipparaPortraitMain.src,
                      "(min-width: 1024px) 42vw, 100vw"
                    )}
                    alt={pipparaPortraitMain.alt}
                    loading="lazy"
                    decoding="async"
                    className="block w-full"
                  />
                  <span className="pointer-events-none absolute inset-0 bg-ink/10 opacity-0 transition group-hover:opacity-100 group-focus-visible:opacity-100" />
                </span>
                <span className="mt-2 inline-block text-xs font-bold text-[#6f2f3c]">
                  タップして拡大表示
                </span>
              </button>
            </div>

            <div className="p-5 sm:p-8 lg:p-10">
              <div className="mb-6 flex items-start gap-3">
                <span className="grid h-10 w-10 shrink-0 place-items-center border border-[#c9a24b]/60 bg-[#f8f3e6] text-[#6f2f3c]">
                  <Drama className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wide text-[#6f2f3c]">
                    劇団ココア第46回公演
                  </p>
                  <h3 className="font-display text-2xl leading-tight text-ink sm:text-3xl">
                    『ピッパラの樹』
                  </h3>
                </div>
              </div>

              <dl className="grid gap-4 border-y border-[#7c5a3a]/20 py-6 text-sm sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <dt className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-ink/50">
                    <Users className="h-3.5 w-3.5 text-[#6f2f3c]" aria-hidden="true" />
                    出演
                  </dt>
                  <dd className="mt-1 text-ink/85">
                    夏凪里季（
                    <span className="font-bold text-[#6f2f3c]">A班</span>
                    ・アナスタジー・ド・ブロワ役）
                  </dd>
                </div>
                <div>
                  <dt className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-ink/50">
                    <MapPin className="h-3.5 w-3.5 text-[#6f2f3c]" aria-hidden="true" />
                    会場
                  </dt>
                  <dd className="mt-1 text-ink/85">
                    荻窪小劇場
                    <a
                      href="#pippara-venue"
                      className="mt-0.5 block text-xs font-bold text-[#6f2f3c] underline decoration-[#c9a24b] underline-offset-2"
                    >
                      地図・アクセスを見る
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-ink/50">
                    <Clock className="h-3.5 w-3.5 text-[#6f2f3c]" aria-hidden="true" />
                    上演時間
                  </dt>
                  <dd className="mt-1 text-ink/85">
                    約100分予定
                    <span className="mt-0.5 block text-xs text-ink/55">
                      開場は開演の30分前を予定
                    </span>
                  </dd>
                </div>
                <div className="sm:col-span-2">
                  <dt className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-ink/50">
                    <PenLine className="h-3.5 w-3.5 text-[#6f2f3c]" aria-hidden="true" />
                    脚本・演出
                  </dt>
                  <dd className="mt-1 text-ink/85">小谷聡一郎</dd>
                </div>
              </dl>

              <div className="mt-6 border border-[#c9a24b]/40 bg-[#f8f3e6] p-5">
                <p className="mb-2 text-xs font-bold uppercase tracking-wide text-[#6f2f3c]">
                  あらすじ
                </p>
                <p className="text-sm leading-8 text-ink/78">
                  幼くして両親を亡くし、暗い幼少期を過ごしたチェリッシュ・オースティン。寄宿学校での友人との出会いをきっかけに、強い意志を胸に秘めるようになった彼女は、ロンドンの名家・ブロワ家で家庭教師として働くことになる。19世紀ヨーロッパを舞台に、愛と運命が交差していく物語。
                </p>
              </div>

              <blockquote className="mt-6 border-l-4 border-[#6f2f3c] bg-white px-4 py-3">
                <p className="whitespace-pre-line text-sm leading-8 text-ink/85">
                  {`初めての役柄で、今からとても楽しみです。
大切に演じさせていただきます。`}
                </p>
                <footer className="mt-2 text-xs text-ink/50">
                  夏凪里季さん（Instagramより）
                </footer>
              </blockquote>
            </div>
          </div>
        </div>

        {/* 観に行くための情報：日程とチケットを1か所にまとめる */}
        <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-start">
          <div className="riri-card border-[#7c5a3a]/25 bg-white p-5 sm:p-7">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#7c5a3a]/20 pb-3">
              <h3 className="flex items-center gap-2 font-display text-xl leading-tight text-ink">
                <CalendarDays className="h-5 w-5 shrink-0 text-[#6f2f3c]" aria-hidden="true" />
                夏凪里季さんの出演日
              </h3>
              <p className="text-xs font-bold text-[#6f2f3c]">
                全6公演
                {remaining > 0 && remaining < stages.length && `／残り${remaining}公演`}
                {daysToNext !== null && (
                  <span className="ml-1 text-ink/55">
                    ・次の公演まであと{daysToNext}日
                  </span>
                )}
              </p>
            </div>

            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {stages.map((stage) => (
                <li
                  key={stage.iso}
                  className={`flex items-center gap-3 border px-3 py-2.5 text-sm ${
                    stage.isPast
                      ? "border-[#7c5a3a]/15 bg-[#f8f3e6] text-ink/40"
                      : "border-[#7c5a3a]/25 bg-white text-ink"
                  }`}
                >
                  <span
                    className={`grid h-6 w-6 shrink-0 place-items-center text-xs font-bold ${
                      stage.isPast
                        ? "bg-[#7c5a3a]/15 text-ink/40"
                        : "bg-[#6f2f3c] text-white"
                    }`}
                    aria-hidden="true"
                  >
                    {stage.no}
                  </span>
                  <span className="flex-1">
                    <span className="font-bold">
                      {stage.month}/{stage.day}
                    </span>
                    <span className="ml-1 text-xs opacity-70">（{stage.weekday}）</span>
                  </span>
                  <span className="font-bold tabular-nums">{stage.time}</span>
                  {stage.isPast && (
                    <span className="shrink-0 text-[10px] font-bold">終了</span>
                  )}
                </li>
              ))}
            </ul>
            <p className="mt-3 text-xs leading-6 text-ink/50">
              日時はすべて日本時間です。
            </p>
          </div>

          <div className="riri-card border-[#c9a24b]/50 bg-white p-5 sm:p-7">
            <h3 className="flex items-center gap-2 border-b border-[#7c5a3a]/20 pb-3 font-display text-xl leading-tight text-ink">
              <Ticket className="h-5 w-5 shrink-0 text-[#6f2f3c]" aria-hidden="true" />
              チケット
            </h3>

            <dl className="mt-4 grid gap-2 text-sm">
              <div className="flex items-baseline justify-between gap-3 border-b border-dashed border-[#7c5a3a]/20 pb-2">
                <dt className="text-ink/70">特典付</dt>
                <dd className="font-display text-lg text-ink">5,500円</dd>
              </div>
              <div className="flex items-baseline justify-between gap-3 border-b border-dashed border-[#7c5a3a]/20 pb-2">
                <dt className="text-ink/70">一般</dt>
                <dd className="font-display text-lg text-ink">4,500円</dd>
              </div>
              <div className="flex items-baseline justify-between gap-3">
                <dt className="text-ink/70">座席</dt>
                <dd className="text-ink/85">全席自由席</dd>
              </div>
            </dl>

            <p className="mt-4 border-l-4 border-[#6f2f3c] bg-[#f8f3e6] px-4 py-3 text-sm font-bold leading-7 text-[#6f2f3c]">
              ご予約の際は、備考欄に「夏凪里季」とご記入ください。
            </p>

            <p className="mt-3 text-xs leading-6 text-ink/55">
              7月26日の本人投稿では「チケット目標まだ届いてないのに売り切れちゃいそう」と案内されています。気になる日程はお早めに。
            </p>

            <a
              href={pipparaTicketUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="riri-button riri-button-gold mt-4 min-h-12 w-full px-5 py-3 text-sm"
            >
              夏凪里季さん扱いで予約する
              <ExternalLink className="h-4 w-4 shrink-0" aria-hidden="true" />
            </a>
          </div>
        </div>

        {/* 会場までの行き方 */}
        <VenueMap
          id="pippara-venue"
          className="mt-8"
          venue="荻窪小劇場"
          access="JR・東京メトロ荻窪駅 南口より徒歩約8分"
          note="開場は開演の30分前を予定。地図はGoogleマップの検索結果を表示しています。"
        />

        {/* 里季さんの投稿：本文は折りたたみにして見通しを良くする */}
        <div className="mt-8 riri-card border-[#7c5a3a]/20 bg-white p-5 sm:p-7">
          <h3 className="border-b border-[#7c5a3a]/20 pb-3 font-display text-xl leading-tight text-ink">
            これまでの告知投稿
          </h3>
          <p className="mt-3 text-sm leading-7 text-ink/60">
            日程・チケット情報は上にまとめています。ここでは元の投稿文をそのまま読めます。
          </p>

          <div className="mt-4 grid gap-3">
            {snsPosts.map((post) => (
              <details
                key={post.id}
                className="group border border-[#7c5a3a]/20 bg-[#f8f3e6] open:bg-white"
              >
                <summary className="flex cursor-pointer list-none items-center gap-3 p-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-champagne">
                  <AccountAvatar platform={post.platform} />
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-bold text-ink">{post.headline}</span>
                    <span className="mt-0.5 block truncate text-xs text-ink/50">
                      {post.datetime}・{post.platform}
                      <span className="hidden sm:inline">（{post.handle}）</span>
                    </span>
                  </span>
                  <ChevronDown
                    className="h-4 w-4 shrink-0 text-[#6f2f3c] transition group-open:rotate-180"
                    aria-hidden="true"
                  />
                </summary>

                <div className="border-t border-[#7c5a3a]/15 p-4 sm:p-5">
                  {post.quote && (
                    <blockquote className="mb-4 border border-[#c9a24b]/40 bg-[#f8f3e6] p-4">
                      <Quote className="h-4 w-4 text-[#6f2f3c]" aria-hidden="true" />
                      <p className="mt-2 whitespace-pre-line text-sm leading-8 text-ink/85">
                        {post.quote}
                      </p>
                    </blockquote>
                  )}
                  <div className="whitespace-pre-line text-sm leading-7 text-ink/80">
                    {post.body}
                  </div>
                  <a
                    href={post.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="riri-button riri-button-soft mt-4 min-h-12 px-4 py-3 text-sm"
                  >
                    {post.platform}で元の投稿を見る
                    <ExternalLink className="h-4 w-4 shrink-0" aria-hidden="true" />
                  </a>
                </div>
              </details>
            ))}
          </div>
        </div>

        {/* 関連画像と次の公演 */}
        <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-start">
          <div className="riri-card border-[#7c5a3a]/20 bg-white p-5 sm:p-6">
            <p className="mb-3 text-xs font-bold uppercase tracking-wide text-[#6f2f3c]">
              あわせて見る
            </p>
            <div className="grid grid-cols-3 gap-3">
              {relatedImages.map((image) => (
                <button
                  key={image.src}
                  type="button"
                  onClick={openZoom(image)}
                  className="group block text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-champagne"
                  aria-label={`${image.alt}を拡大表示`}
                >
                  <span className="relative block aspect-[3/4] overflow-hidden border border-[#7c5a3a]/30 bg-[#f0ead9]">
                    <img
                      {...getResponsiveImageProps(image.src, "(min-width: 640px) 22vw, 30vw")}
                      alt={image.alt}
                      loading="lazy"
                      decoding="async"
                      className="absolute inset-0 block h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                    />
                  </span>
                </button>
              ))}
            </div>
          </div>

          <a
            href="#event-aitoki-homin-2026-09"
            className="riri-card riri-lift group flex gap-4 border-[#7c5a3a]/20 bg-white p-5"
          >
            <span className="relative w-20 shrink-0 overflow-hidden border border-[#7c5a3a]/20 bg-[#f0ead9] sm:w-24">
              <img
                {...getResponsiveImageProps(hominFlyer.src, "96px")}
                alt={hominFlyer.alt}
                loading="lazy"
                decoding="async"
                className="block w-full object-contain"
              />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-xs font-bold uppercase tracking-wide text-[#6f2f3c]">
                9月の次回出演
              </span>
              <span className="mt-1 block font-display text-lg leading-tight text-ink">
                月シア別冊第2集『I'm talking about Homin'』
              </span>
              <span className="mt-1 block text-xs text-ink/55">
                A side・西荻窪 遊空間がざびぃ・9/11〜9/15 全4公演
              </span>
              <span className="mt-2 inline-flex items-center gap-1 text-xs font-bold text-[#6f2f3c]">
                スケジュールで詳しく見る
              </span>
            </span>
          </a>
        </div>
      </div>

      {zoomedImage &&
        createPortal(
          <div
            ref={dialogRef}
            className="fixed inset-0 z-[999] grid h-[100dvh] place-items-center overscroll-contain bg-ink/90 p-4"
            role="dialog"
            aria-modal="true"
            aria-label={zoomedImage.alt}
            onClick={closeZoom}
          >
            <button
              ref={closeButtonRef}
              type="button"
              onClick={closeZoom}
              className="absolute right-4 top-4 grid min-h-12 min-w-12 place-items-center border border-white/20 bg-white/10 text-white transition hover:bg-white/20"
              aria-label="閉じる"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
            <img
              {...getResponsiveImageProps(zoomedImage.src, "100vw")}
              alt={zoomedImage.alt}
              onClick={(event) => event.stopPropagation()}
              className="max-h-[86vh] w-auto max-w-full object-contain shadow-paper"
            />
          </div>,
          document.body
        )}
    </section>
  );
}
