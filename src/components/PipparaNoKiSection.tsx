import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import {
  CalendarDays,
  Church,
  Drama,
  ExternalLink,
  Info,
  MapPin,
  Quote,
  Ticket,
  Users,
  X
} from "lucide-react";
import { getResponsiveImageProps } from "../lib/responsiveImage";
import { SectionHeader } from "./SectionHeader";

const pipparaTicketUrl =
  "https://tiget.net/events?q%5Bwords%5D=%E3%83%94%E3%83%83%E3%83%91%E3%83%A9%E3%81%AE%E6%A8%B9";
const pipparaPostUrl = "https://x.com/frecam2025_0306/status/2075931870681063715";
const hominTicketUrl = "https://livepocket.jp/t/aitokihomin";

const pipparaDates = [
  { date: "2026年8月18日（火）", time: "19:30" },
  { date: "2026年8月22日（土）", time: "12:00" },
  { date: "2026年8月23日（日）", time: "15:30" },
  { date: "2026年8月25日（火）", time: "14:00" },
  { date: "2026年8月28日（金）", time: "19:30" },
  { date: "2026年8月29日（土）", time: "19:30" }
];

const hominDates = [
  { date: "2026年9月11日（金）", time: "19:00" },
  { date: "2026年9月12日（土）", time: "12:00" },
  { date: "2026年9月13日（日）", time: "12:00" },
  { date: "2026年9月15日（火）", time: "18:00" }
];

type FlyerImage = {
  src: string;
  alt: string;
};

export function PipparaNoKiSection() {
  const [zoomedImage, setZoomedImage] = useState<FlyerImage | null>(null);

  const closeZoom = useCallback(() => setZoomedImage(null), []);

  useEffect(() => {
    if (!zoomedImage) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeZoom();
    };
    window.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [zoomedImage, closeZoom]);

  const pipparaFlyer: FlyerImage = {
    src: "/images/pippara-no-ki-flyer-2026.jpg",
    alt: "劇団ココア『ピッパラの樹』公演フライヤー。夏凪里季さんはA班に出演"
  };
  const hominFlyer: FlyerImage = {
    src: "/images/im-talking-about-homin-flyer-2026.jpg",
    alt: "月シア別冊第2集『I'm talking about Homin'』公演フライヤー。夏凪里季さんはA sideに出演"
  };

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

        <div className="riri-card overflow-hidden border-[#7c5a3a]/25 bg-white shadow-paper">
          {/* 装飾ライン（ステンドグラス風の細いアクセント） */}
          <div className="h-1.5 bg-[linear-gradient(90deg,#2f4a3a_0%,#6f2f3c_35%,#c9a24b_68%,#2f4a3a_100%)]" />

          <div className="grid gap-0 lg:grid-cols-[1fr_1.15fr]">
            {/* フライヤー画像 */}
            <div className="border-b border-[#7c5a3a]/15 bg-[#f0ead9] p-4 sm:p-6 lg:border-b-0 lg:border-r">
              <button
                type="button"
                onClick={() => setZoomedImage(pipparaFlyer)}
                className="group block w-full text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-champagne"
                aria-label="ピッパラの樹フライヤーを拡大表示"
              >
                <span className="relative block overflow-hidden border border-[#7c5a3a]/30 bg-white">
                  <img
                    {...getResponsiveImageProps(
                      pipparaFlyer.src,
                      "(min-width: 1024px) 45vw, 100vw"
                    )}
                    alt={pipparaFlyer.alt}
                    loading="lazy"
                    decoding="async"
                    className="block w-full object-contain"
                  />
                  <span className="pointer-events-none absolute inset-0 opacity-0 transition group-hover:opacity-100 group-focus-visible:opacity-100">
                    <span className="absolute inset-0 bg-ink/10" />
                  </span>
                </span>
                <span className="mt-2 inline-flex items-center gap-1.5 text-xs font-bold text-[#6f2f3c]">
                  タップして拡大表示
                </span>
              </button>
            </div>

            {/* 公演情報 */}
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

              <dl className="grid gap-4 border-y border-[#7c5a3a]/20 py-6 text-sm">
                <div className="flex gap-3">
                  <dt className="flex w-24 shrink-0 items-center gap-2 font-bold text-ink/60">
                    <Users className="h-4 w-4 text-[#6f2f3c]" aria-hidden="true" />
                    出演
                  </dt>
                  <dd className="text-ink/85">
                    夏凪里季（
                    <span className="font-bold text-[#6f2f3c]">A班</span>
                    ・アナスタジー・ド・ブロワ役）
                  </dd>
                </div>
                <div className="flex gap-3">
                  <dt className="flex w-24 shrink-0 items-center gap-2 font-bold text-ink/60">
                    <MapPin className="h-4 w-4 text-[#6f2f3c]" aria-hidden="true" />
                    会場
                  </dt>
                  <dd className="text-ink/85">
                    荻窪小劇場
                    <span className="mt-0.5 block text-xs text-ink/55">
                      JR・東京メトロ荻窪駅 南口より徒歩約8分
                    </span>
                  </dd>
                </div>
                <div className="flex gap-3">
                  <dt className="flex w-24 shrink-0 items-center gap-2 font-bold text-ink/60">
                    <Info className="h-4 w-4 text-[#6f2f3c]" aria-hidden="true" />
                    脚本・演出
                  </dt>
                  <dd className="text-ink/85">小谷聡一郎</dd>
                </div>
                <div className="flex gap-3">
                  <dt className="flex w-24 shrink-0 items-center gap-2 font-bold text-ink/60">
                    <Church className="h-4 w-4 text-[#6f2f3c]" aria-hidden="true" />
                    上演時間
                  </dt>
                  <dd className="text-ink/85">約100分予定</dd>
                </div>
              </dl>

              {/* あらすじ */}
              <div className="mt-6 border border-[#c9a24b]/40 bg-[#f8f3e6] p-5">
                <p className="mb-2 text-xs font-bold uppercase tracking-wide text-[#6f2f3c]">
                  あらすじ
                </p>
                <p className="text-sm leading-8 text-ink/78">
                  幼くして両親を亡くし、暗い幼少期を過ごしたチェリッシュ・オースティン。寄宿学校での友人との出会いをきっかけに、強い意志を胸に秘めるようになった彼女は、ロンドンの名家・ブロワ家で家庭教師として働くことになる。19世紀ヨーロッパを舞台に、愛と運命が交差していく物語。
                </p>
              </div>

              {/* 出演日程 */}
              <div className="mt-6">
                <p className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-[#6f2f3c]">
                  <CalendarDays className="h-4 w-4" aria-hidden="true" />
                  夏凪里季さんの出演日（全6公演）
                </p>
                <ul className="grid gap-2 sm:grid-cols-2">
                  {pipparaDates.map((entry) => (
                    <li
                      key={`${entry.date}-${entry.time}`}
                      className="flex items-center justify-between gap-2 border border-[#7c5a3a]/20 bg-white px-3 py-2 text-sm"
                    >
                      <span className="text-ink/80">{entry.date}</span>
                      <span className="font-bold text-ink">{entry.time}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-2 text-xs leading-6 text-ink/50">
                  日時はすべて日本時間です。開場は開演の30分前を予定しています。
                </p>
              </div>

              {/* チケット情報 */}
              <div className="mt-6 border border-[#7c5a3a]/25 bg-white p-5">
                <p className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-[#6f2f3c]">
                  <Ticket className="h-4 w-4" aria-hidden="true" />
                  チケット情報
                </p>
                <ul className="grid gap-1 text-sm text-ink/80">
                  <li>特典付：5,500円</li>
                  <li>一般：4,500円</li>
                  <li>全席自由席</li>
                </ul>

                <div className="mt-4 border-l-4 border-[#6f2f3c] bg-[#f8f3e6] px-4 py-3 text-sm font-bold text-[#6f2f3c]">
                  ご予約の際は、備考欄に「夏凪里季」とご記入ください。
                </div>

                <p className="mt-3 text-xs leading-6 text-ink/50">
                  7月23日の本人投稿では、残席が少なくなっている日程があると案内されています。
                </p>

                <a
                  href={pipparaTicketUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="riri-button riri-button-gold mt-4 min-h-12 w-full px-5 py-3 text-sm sm:w-auto"
                >
                  夏凪里季さん扱いで予約する
                  <ExternalLink className="h-4 w-4 shrink-0" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* 関連投稿 */}
        <div className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <article className="riri-card border-[#7c5a3a]/20 bg-white p-6 sm:p-7">
            <p className="mb-4 text-xs font-bold uppercase tracking-wide text-[#6f2f3c]">
              里季さんからのお知らせ
            </p>
            <div className="mb-4 flex items-center gap-3">
              <span className="grid h-11 w-11 shrink-0 place-items-center border border-[#c9a24b]/50 bg-[#f8f3e6] text-[#6f2f3c] font-display text-lg">
                里
              </span>
              <div className="min-w-0">
                <p className="truncate font-bold text-ink">夏凪里季</p>
                <p className="truncate text-sm text-ink/55">@frecam2025_0306</p>
              </div>
            </div>
            <p className="mb-1 text-xs text-ink/45">2026年7月11日（土）22:15</p>
            <div className="whitespace-pre-line text-sm leading-7 text-ink/82">
              {`【8月9月の出演予定】

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
④ 9月15日（火）18:00`}
            </div>
            <a
              href={pipparaPostUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="riri-button riri-button-soft mt-5 min-h-12 px-4 py-3 text-sm"
            >
              Xで元の投稿を見る
              <ExternalLink className="h-4 w-4 shrink-0" aria-hidden="true" />
            </a>
          </article>

          <div className="flex flex-col gap-6">
            {/* 本人のメッセージ */}
            <blockquote className="border border-[#c9a24b]/40 bg-[#f8f3e6] p-6">
              <Quote className="h-5 w-5 text-[#6f2f3c]" aria-hidden="true" />
              <p className="mt-3 whitespace-pre-line text-sm leading-8 text-ink/85">
                {`近々で2つの舞台ですが、どちらも疎かにしたくないし、
どちらもたくさんの人に見に来てほしいです。

見に行ってよかったと思ってもらえるように頑張りますので、
皆様ご検討よろしくお願いします`}
              </p>
            </blockquote>

            {/* 9月の次回出演（Homin' 簡易カード） */}
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
      </div>

      {zoomedImage &&
        createPortal(
          <div
            className="fixed inset-0 z-[999] grid h-[100dvh] place-items-center overscroll-contain bg-ink/90 p-4"
            role="dialog"
            aria-modal="true"
            aria-label={zoomedImage.alt}
            onClick={closeZoom}
          >
            <button
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
