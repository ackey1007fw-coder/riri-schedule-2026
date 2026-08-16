import {
  AlertCircle,
  CalendarDays,
  CheckCircle2,
  Clock,
  ExternalLink,
  Flower2,
  MapPin,
  MessageSquare,
  Monitor,
  Ticket
} from "lucide-react";
import { getResponsiveImageProps } from "../lib/responsiveImage";
import { SectionHeader } from "./SectionHeader";

const ticketUrl = "https://livepocket.jp/t/aitokihomin";
const postUrl = "https://x.com/frecam2025_0306/status/2083525044479664564";
const organizerPostUrl = "https://x.com/kaigyacstage/status/2083523150080315892";

const performances = [
  { date: "9/11", weekday: "金", time: "19:00" },
  { date: "9/12", weekday: "土", time: "12:00" },
  { date: "9/13", weekday: "日", time: "12:00" },
  { date: "9/15", weekday: "火", time: "18:00" }
];

const supportOptions = [
  {
    name: "デジタルメッセージ花",
    price: "5,000円",
    copy: "写真とメッセージで、里季さんへの想いを大きく届けるプラン。",
    details: [
      "応援キャスト名・贈り主名・60文字程度以内のメッセージを掲載",
      "夏凪里季さんのオリジナル写真つきで1画面に表示",
      "備考欄にメッセージ・表示名・購入者氏名とフリガナを記入"
    ],
    image: "/images/aitoki-homin-digital-message-flower-2026.jpg",
    alt: "月シアのデジタルメッセージ花の表示例。花に囲まれた祝ご出演の大きな枠と出演者写真",
    url: "https://tsukitheater.base.ec/items/150226748",
    cta: "メッセージ花を購入する",
    Icon: MessageSquare
  },
  {
    name: "デジタルスタンド花",
    price: "2,000円",
    copy: "宛名と贈り主名を掲げて、シンプルに応援を残せるプラン。",
    details: [
      "宛名と贈り主名を1画面の約1/8サイズで掲載",
      "備考欄に贈り主名・購入者氏名とフリガナを記入",
      "劇場内のスクリーンまたはサイネージに表示"
    ],
    image: "/images/aitoki-homin-digital-stand-flower-2026.jpg",
    alt: "月シアのデジタルスタンド花の表示例。花束と宛名、贈り主名のカードが6枚並ぶデザイン",
    url: "https://tsukitheater.base.ec/items/150226569",
    cta: "スタンド花を購入する",
    Icon: Flower2
  }
];

export function AitokiHominSection() {
  return (
    <section
      id="aitoki-homin"
      className="scroll-mt-24 overflow-hidden bg-[linear-gradient(180deg,#fffafc_0%,#f9eef3_48%,#fffafc_100%)] py-14 sm:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          kicker="Aitoki / September Stage"
          title="月シア別冊第2集『I'm talking about Homin'』"
          copy="5月の『アイトキ』に続く月シア出演。A sideの全4公演と、劇場のスクリーンへ届けられるデジタル花をご案内します。"
        />

        <div className="grid gap-6 lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)] lg:items-stretch">
          <div className="riri-card overflow-hidden border-rosefog/30 bg-white">
            <img
              {...getResponsiveImageProps(
                "/images/im-talking-about-homin-mainvisual-a-2026.jpg",
                "(min-width: 1024px) 38vw, 100vw"
              )}
              alt="月シア別冊第2集『I'm talking about Homin'』メインビジュアルA。2026年9月11日〜15日、西荻窪 遊空間がざびぃ"
              loading="lazy"
              decoding="async"
              className="block h-auto w-full object-contain"
            />
          </div>

          <div className="riri-card flex flex-col border-rosefog/30 bg-white p-5 sm:p-7 lg:p-8">
            <div className="flex flex-wrap gap-2">
              <span className="border border-champagne/45 bg-[#fffaf0] px-3 py-1.5 text-xs font-bold text-champagneInk">
                A side
              </span>
              <span className="border border-rosefog/45 bg-blush/35 px-3 py-1.5 text-xs font-bold text-ink/72">
                全4公演
              </span>
              <span className="border border-rosefog/45 bg-blush/35 px-3 py-1.5 text-xs font-bold text-ink/72">
                アイトキ第2弾
              </span>
            </div>

            <h3 className="mt-5 font-display text-2xl leading-tight text-ink sm:text-3xl">
              里季さんの出演回
            </h3>

            <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {performances.map((stage) => (
                <div
                  key={`${stage.date}-${stage.time}`}
                  className="border border-rosefog/30 bg-porcelain px-3 py-4 text-center"
                >
                  <p className="font-display text-xl text-ink">
                    {stage.date}
                    <span className="ml-1 text-sm">({stage.weekday})</span>
                  </p>
                  <p className="mt-1 text-sm font-bold text-champagneInk">{stage.time}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 grid gap-3 border-y border-rosefog/25 py-5 text-sm text-ink/68 sm:grid-cols-2">
              <p className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-champagne" aria-hidden="true" />
                <span>西荻窪 遊空間がざびぃ</span>
              </p>
              <p className="flex items-start gap-2">
                <Ticket className="mt-0.5 h-4 w-4 shrink-0 text-champagne" aria-hidden="true" />
                <span>前売6,000円／当日6,500円</span>
              </p>
            </div>

            <p className="mt-6 leading-8 text-ink/72">
              名曲から生まれた5つの短編を届けるオムニバス公演。会場で作品を観る応援と、遠方からスクリーンへ想いを届ける応援、どちらも選べます。
            </p>

            <div className="mt-auto flex flex-col gap-3 pt-7 sm:flex-row sm:flex-wrap">
              <a
                href={ticketUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="riri-button riri-button-gold min-h-12 px-5 py-3 text-sm"
              >
                <Ticket className="h-4 w-4" aria-hidden="true" />
                公演チケットを予約する
              </a>
              <a
                href="#digital-flowers"
                className="riri-button riri-button-soft min-h-12 px-5 py-3 text-sm"
              >
                <Flower2 className="h-4 w-4" aria-hidden="true" />
                デジタル花を見る
              </a>
            </div>
          </div>
        </div>

        <div id="digital-flowers" className="scroll-mt-28 pt-10 sm:pt-14">
          <div className="riri-card overflow-hidden border-champagne/45 bg-white shadow-paper">
            <div className="border-b border-champagne/25 bg-[linear-gradient(120deg,#6f2f3c_0%,#8d4556_58%,#b36b7e_100%)] px-5 py-7 text-white sm:px-8 sm:py-9">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-white/75">
                    <Monitor className="h-4 w-4" aria-hidden="true" />
                    Digital Flower Support
                  </p>
                  <h3 className="mt-3 font-display text-2xl leading-tight sm:text-4xl">
                    会場に行けない日も、スクリーンに応援を。
                  </h3>
                  <p className="mt-3 max-w-3xl text-sm leading-7 text-white/85 sm:text-base">
                    届いた応援は劇場内のスクリーンやサイネージへ。里季さんが見て力にできる、月シアならではの応援方法です。
                  </p>
                </div>
                <div className="shrink-0 border border-white/25 bg-white/10 px-5 py-4 backdrop-blur-sm">
                  <p className="flex items-center gap-2 text-xs font-bold text-white/75">
                    <Clock className="h-4 w-4" aria-hidden="true" />
                    購入・入金期限
                  </p>
                  <time dateTime="2026-09-01T23:59:00+09:00" className="mt-1 block font-display text-xl">
                    9月1日(火) 23:59
                  </time>
                </div>
              </div>
            </div>

            <div className="p-5 sm:p-8">
              <div className="grid gap-6 lg:grid-cols-2">
                {supportOptions.map((option) => (
                  <article
                    key={option.name}
                    className="flex flex-col overflow-hidden border border-rosefog/35 bg-porcelain/45"
                  >
                    <div className="border-b border-rosefog/25 bg-white">
                      <img
                        {...getResponsiveImageProps(option.image, "(min-width: 1024px) 44vw, 100vw")}
                        alt={option.alt}
                        loading="lazy"
                        decoding="async"
                        className="block h-auto w-full object-contain"
                      />
                    </div>
                    <div className="flex flex-1 flex-col p-5 sm:p-6">
                      <div className="flex items-start justify-between gap-4">
                        <span className="grid h-11 w-11 shrink-0 place-items-center border border-champagne/45 bg-white text-champagneInk">
                          <option.Icon className="h-5 w-5" aria-hidden="true" />
                        </span>
                        <span className="font-display text-2xl text-[#6f2f3c]">{option.price}</span>
                      </div>
                      <h4 className="mt-4 font-display text-2xl text-ink">{option.name}</h4>
                      <p className="mt-2 text-sm leading-7 text-ink/68">{option.copy}</p>

                      <ul className="mt-5 grid gap-3 text-sm leading-6 text-ink/72">
                        {option.details.map((detail) => (
                          <li key={detail} className="flex items-start gap-2.5">
                            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-champagneInk" aria-hidden="true" />
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>

                      <a
                        href={option.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="riri-button riri-button-gold mt-6 min-h-12 px-5 py-3 text-sm"
                      >
                        {option.cta}
                        <ExternalLink className="h-4 w-4" aria-hidden="true" />
                      </a>
                      <p className="mt-3 text-center text-xs leading-5 text-ink/50">
                        購入ページで応援キャスト「夏凪里季」を選択してください
                      </p>
                    </div>
                  </article>
                ))}
              </div>

              <div className="mt-6 grid gap-4 border border-champagne/35 bg-[#fffaf0] p-5 sm:grid-cols-[auto_1fr] sm:items-start sm:p-6">
                <AlertCircle className="h-6 w-6 text-champagneInk" aria-hidden="true" />
                <div>
                  <h4 className="font-bold text-ink">購入前にここだけ確認</h4>
                  <ul className="mt-2 grid gap-1.5 text-sm leading-6 text-ink/68">
                    <li>備考欄は、購入画面のお支払い方法選択の下にあります。</li>
                    <li>メッセージに絵文字は使えません。すべての決済を期限までに完了してください。</li>
                    <li>デジタル商品のため発送はなく、購入後のキャンセルはできません。</li>
                    <li>会場スペースの都合により、物理的なスタンド花・楽屋花は受け付けていません。</li>
                  </ul>
                </div>
              </div>

              <div className="mt-6 flex flex-col gap-4 border-t border-rosefog/25 pt-6 lg:flex-row lg:items-center lg:justify-between">
                <p className="flex items-center gap-2 text-sm text-ink/58">
                  <CalendarDays className="h-4 w-4 shrink-0 text-champagne" aria-hidden="true" />
                  里季さん本人の告知と、KAIGYAC STAGEの販売案内を確認できます。
                </p>
                <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <a
                    href={postUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="riri-button riri-button-soft min-h-12 px-4 py-3 text-sm"
                  >
                    里季さんの告知を見る
                    <ExternalLink className="h-4 w-4" aria-hidden="true" />
                  </a>
                  <a
                    href={organizerPostUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="riri-button riri-button-soft min-h-12 px-4 py-3 text-sm"
                  >
                    KAIGYAC STAGEの案内を見る
                    <ExternalLink className="h-4 w-4" aria-hidden="true" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
