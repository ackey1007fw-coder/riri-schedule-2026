import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  Armchair,
  CalendarDays,
  ChevronDown,
  Clock,
  Drama,
  ExternalLink,
  Flower2,
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
  /** 劇団ココア公式Xの当該投稿におけるA班のお席表記 */
  seat: string;
};

const pipparaStages: Stage[] = [
  { no: 1, iso: "2026-08-18T19:30:00+09:00", month: 8, day: 18, weekday: "火", time: "19:30", seat: "！" },
  { no: 2, iso: "2026-08-22T12:00:00+09:00", month: 8, day: 22, weekday: "土", time: "12:00", seat: "！" },
  { no: 3, iso: "2026-08-23T15:30:00+09:00", month: 8, day: 23, weekday: "日", time: "15:30", seat: "残り5席" },
  { no: 4, iso: "2026-08-25T14:00:00+09:00", month: 8, day: 25, weekday: "火", time: "14:00", seat: "！" },
  { no: 5, iso: "2026-08-28T19:30:00+09:00", month: 8, day: 28, weekday: "金", time: "19:30", seat: "！" },
  { no: 6, iso: "2026-08-29T19:30:00+09:00", month: 8, day: 29, weekday: "土", time: "19:30", seat: "満席" }
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
const pipparaPortraitHat: FlyerImage = {
  src: "/images/pippara-no-ki-portrait-03.jpg",
  alt: "黒いチュールをあしらった白いミニハットに手を添え、カメラに笑顔を向ける夏凪里季さん。ベージュのストライプブラウスにボウタイ、茶色の留め具がついた青緑のベスト、白いスカートというA班「アナスタジー・ド・ブロワ」の衣装姿"
};
const pipparaSelfieBackstage: FlyerImage = {
  src: "/images/gallery/g100.jpg",
  alt: "暗い舞台裏で腕を伸ばして自撮りする夏凪里季さん。黒いチュールとリボン、パールをあしらった白いミニハットを髪に留め、ベージュのストライプブラウスに大きなボウタイ、紺色のベストというA班「アナスタジー・ド・ブロワ」の衣装姿"
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
  pipparaPortraitHat,
  pipparaPortraitSub,
  pipparaMainVisual,
  rehearsalPhoto,
  { ...pipparaFlyer, alt: "劇団ココア『ピッパラの樹』出演者一覧と公演日程を掲載したフライヤー" }
];

/** 劇団ココア公式Xの座席状況投稿。日々変わるため、記号の意味と参照先だけを置く */
const seatStatus = {
  updatedAt: "2026年8月14日",
  legend: [
    { mark: "◯", text: "まだまだ予約OK" },
    { mark: "△", text: "埋まってきてます" },
    { mark: "！", text: "満席になりそう予約急いで" }
  ],
  note: "劇団ココア公式Xの8月14日の告知では、夏凪里季さん出演のA班は 8/18(火)19:30「！」／8/22(土)12:00「！」／8/23(日)15:30 残り5席／8/25(火)14:00「！」／8/28(金)19:30「！」／8/29(土)19:30 満席 です。満席回が増えているので、ご予約はお早めに。",
  url: "https://x.com/gekidan_cocoa/status/2088062591679807522"
};

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
    id: "x-2026-08-05",
    platform: "X",
    handle: "@frecam2025_0306",
    datetime: "2026年8月5日（水）08:01",
    headline: "「もっとたくさんの人に見に来て欲しい」",
    body: `#ピッパラの樹 みんな予約してくれた？
もっとたくさんの人に見に来て欲しい🥺
私はA班だよ！6公演あるからどこかお時間合う時来て欲しいな〜🌀🍃
（備考欄に夏凪里季と書いてね）`,
    quote: "6公演あるからどこかお時間合う時来て欲しいな〜",
    url: "https://x.com/frecam2025_0306/status/2084776732289388564"
  },
  {
    id: "x-2026-07-26",
    platform: "X",
    handle: "@frecam2025_0306",
    datetime: "2026年7月26日（日）22:35",
    headline: "A班、稽古初日レポート",
    body: `#ピッパラの樹 A班本日稽古初日でした✨️
改善点は山々ですが良い作品になる予感！

チケット目標まだ届いてないのに売り切れちゃいそうだから今すぐゲットして欲しいな🥹💖
いつもと違うりりが見れますヨ🫶🏻`,
    quote: "改善点は山々ですが良い作品になる予感！",
    url: "https://x.com/frecam2025_0306/status/2081372754612486194"
  },
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

/** 最新のトピック（写真つきで大きく扱う） */
const latestTopic = {
  headline: "「まだ空席あります！ そこの貴方！！」",
  datetime: "2026年8月10日（月）14:34",
  photo: pipparaSelfieBackstage,
  body: `#ピッパラの樹 みんな予約してくれたかな？？
満席が増えて来ていますが、まだ空席あります！
そこの貴方！！ぜひ会場に足を運んでくださると嬉しいです。
(固定ポストに日程、場所等も載せています!)

日程合わないな〜とかもっと応援したい！と思ってくださった方、ぜひこちらの推し花もご検討ください🙇🏻‍♀️とっても力になります🥹✨️

チケット→（りりはA班、備考欄に夏凪里季と記入お願いします）
推し花→（下の「推し花で応援を届ける」からご覧いただけます）`,
  quote: "満席が増えて来ていますが、まだ空席あります！",
  note: "劇団ココア公式Xの8月9日の座席状況を引用しての呼びかけです。",
  url: "https://x.com/frecam2025_0306/status/2086687668155695183"
};

/** 8月10日の投稿で案内された「推し花」（応援広告） */
const oshibana = {
  url: "https://oshibana.shop/theater/oshibana/24950033",
  deadlineLabel: "2026年8月29日（土）18:00まで",
  lead: "日程が合わない方・もっと応援したい方へ",
  copy: "劇場に贈るお祝いのお花とメッセージを兼ねた応援広告です。メッセージは公演期間中に会場で掲出されます。金額の種類や申し込み方法は推し花のページをご確認ください。",
  quote: "日程合わないな〜とかもっと応援したい！と思ってくださった方、ぜひこちらの推し花もご検討ください"
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
      className="scroll-mt-24 border-y border-[#7c5a3a]/20 bg-[#f8f3e6] py-14 sm:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          kicker="Stage Feature"
          title="舞台『ピッパラの樹』"
          copy="夏凪里季さんが、A班「アナスタジー・ド・ブロワ役」で出演！"
        />

        {/* 最新トピック：本人からの予約呼びかけ */}
        <article className="riri-card overflow-hidden border-[#7c5a3a]/25 bg-white shadow-paper">
          <div className="h-1.5 bg-[linear-gradient(90deg,#2f4a3a_0%,#6f2f3c_35%,#c9a24b_68%,#2f4a3a_100%)]" />
          <div className="grid gap-0 sm:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
            <div className="border-b border-[#7c5a3a]/15 bg-[#f0ead9] p-4 sm:border-b-0 sm:border-r sm:p-6">
              <button
                type="button"
                onClick={openZoom(latestTopic.photo)}
                className="group block w-full text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-champagne"
                aria-label="A班「アナスタジー・ド・ブロワ」衣装姿で舞台裏から自撮りする夏凪里季さんの写真を拡大表示"
              >
                <span className="relative block overflow-hidden border border-[#7c5a3a]/30 bg-white">
                  <img
                    {...getResponsiveImageProps(
                      latestTopic.photo.src,
                      "(min-width: 640px) 40vw, 100vw"
                    )}
                    alt={latestTopic.photo.alt}
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
                {latestTopic.headline}
              </h3>
              <p className="mt-1 text-xs text-ink/45">{latestTopic.datetime}・X</p>

              <blockquote className="mt-4 border-l-4 border-[#c9a24b] bg-[#f8f3e6] px-4 py-3">
                <Quote className="h-4 w-4 text-[#6f2f3c]" aria-hidden="true" />
                <p className="mt-2 font-display text-lg leading-8 text-ink">
                  {latestTopic.quote}
                </p>
              </blockquote>

              <div className="mt-4 whitespace-pre-line text-sm leading-7 text-ink/80">
                {latestTopic.body}
              </div>
              <p className="mt-3 text-xs leading-6 text-ink/50">{latestTopic.note}</p>

              {/* 座席状況は日々変わるので、記号の意味と公式の参照先だけを置く */}
              <div className="mt-5 border border-[#c9a24b]/40 bg-[#f8f3e6] p-4">
                <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-[#6f2f3c]">
                  <Armchair className="h-4 w-4" aria-hidden="true" />
                  座席状況の見方（{seatStatus.updatedAt}時点）
                </p>
                <ul className="mt-3 grid gap-1.5 text-sm text-ink/80 sm:grid-cols-3">
                  {seatStatus.legend.map((item) => (
                    <li key={item.mark} className="flex items-center gap-2">
                      <span className="grid h-6 w-6 shrink-0 place-items-center border border-[#6f2f3c]/30 bg-white text-xs font-bold text-[#6f2f3c]">
                        {item.mark}
                      </span>
                      {item.text}
                    </li>
                  ))}
                </ul>
                <p className="mt-3 text-xs leading-6 text-ink/60">{seatStatus.note}</p>
                <a
                  href={seatStatus.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center gap-1 text-xs font-bold text-[#6f2f3c] underline decoration-[#c9a24b] underline-offset-2"
                >
                  8月14日のお席情報を劇団ココア公式Xで見る
                  <ExternalLink className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                </a>
              </div>

              <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a
                  href={pipparaTicketUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="riri-button riri-button-gold min-h-12 px-4 py-3 text-sm"
                >
                  <Ticket className="h-4 w-4 shrink-0" aria-hidden="true" />
                  チケットを予約する
                  <ExternalLink className="h-4 w-4 shrink-0" aria-hidden="true" />
                </a>
                <a
                  href="#pippara-oshibana"
                  className="riri-button riri-button-soft min-h-12 px-4 py-3 text-sm"
                >
                  <Flower2 className="h-4 w-4 shrink-0" aria-hidden="true" />
                  推し花で応援する
                </a>
                <a
                  href={latestTopic.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="riri-button riri-button-soft min-h-12 px-4 py-3 text-sm"
                >
                  Xで投稿を見る
                  <ExternalLink className="h-4 w-4 shrink-0" aria-hidden="true" />
                </a>
              </div>
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
                  <span
                    className={`shrink-0 text-[10px] font-bold ${
                      stage.isPast ? "text-ink/40" : "text-[#6f2f3c]"
                    }`}
                  >
                    {stage.seat}
                  </span>
                  {stage.isPast && (
                    <span className="shrink-0 text-[10px] font-bold">終了</span>
                  )}
                </li>
              ))}
            </ul>
            <p className="mt-3 text-xs leading-6 text-ink/50">
              日時はすべて日本時間です。お席表記は劇団ココア公式X（2026年8月14日）の告知によります。
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
              8月10日の本人投稿では「満席が増えて来ていますが、まだ空席あります！」と予約が呼びかけられています。劇団ココア公式Xの8月14日時点では、A班の8/29(土)19:30は満席、8/23(日)15:30は残り5席、ほか4公演は「！」です。気になる日程はお早めに。
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

        {/* 推し花：日程が合わない方への応援手段（8/10の本人投稿より） */}
        <div
          id="pippara-oshibana"
          className="mt-6 scroll-mt-24 riri-card border-[#c9a24b]/50 bg-white p-5 sm:p-7"
        >
          <p className="inline-flex items-center gap-1.5 border border-[#c9a24b]/50 bg-[#f8f3e6] px-2.5 py-1 text-xs font-bold text-[#6f2f3c]">
            <Flower2 className="h-3.5 w-3.5" aria-hidden="true" />
            {oshibana.lead}
          </p>
          <h3 className="mt-3 font-display text-xl leading-tight text-ink sm:text-2xl">
            「推し花」で応援を届ける
          </h3>

          <blockquote className="mt-4 border-l-4 border-[#c9a24b] bg-[#f8f3e6] px-4 py-3">
            <p className="text-sm leading-7 text-ink/85">{oshibana.quote}</p>
            <footer className="mt-2 text-xs text-ink/50">
              夏凪里季さん（2026年8月10日・Xより）
            </footer>
          </blockquote>

          <p className="mt-4 text-sm leading-7 text-ink/80">{oshibana.copy}</p>
          <p className="mt-3 text-xs font-bold leading-6 text-[#6f2f3c]">
            受付は{oshibana.deadlineLabel}
          </p>

          <a
            href={oshibana.url}
            target="_blank"
            rel="noopener noreferrer"
            className="riri-button riri-button-soft mt-4 min-h-12 px-4 py-3 text-sm"
          >
            推し花のページを見る
            <ExternalLink className="h-4 w-4 shrink-0" aria-hidden="true" />
          </a>
        </div>

        {/* 会場までの行き方 */}
        <VenueMap
          id="pippara-venue"
          className="mt-8"
          venue="荻窪小劇場"
          note="開場は開演の30分前を予定。"
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
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
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
                      {...getResponsiveImageProps(image.src, "(min-width: 640px) 18vw, 30vw")}
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
            href="#aitoki-homin"
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
                アイトキ特集で詳しく見る
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
