import {
  CalendarDays,
  ExternalLink,
  Gift,
  MapPin,
  Moon,
  Ticket,
  Users
} from "lucide-react";
import { getResponsiveImageProps } from "../lib/responsiveImage";
import { SectionHeader } from "./SectionHeader";
import { VenueMap } from "./VenueMap";

const ririPostUrl =
  "https://x.com/frecam2025_0306/status/2101244304979329158";
const organizerPostUrl =
  "https://x.com/kaigyacstage/status/2101234845632364882";
const ticketUrl = "https://livepocket.jp/t/20matagu";

const shows = [
  {
    label: "昼の部",
    time: "13:00",
    cast: [
      "綾城実優",
      "大原富如",
      "進藤蒼",
      "中平奈緒",
      "夏凪里季",
      "星豪毅",
      "もか"
    ]
  },
  {
    label: "夕方の部",
    time: "17:00",
    cast: [
      "内龍星",
      "中平奈緒",
      "夏凪里季",
      "平川聖大",
      "星豪毅",
      "もか",
      "若松愛里"
    ]
  }
];

export function TsukiWoMataguVol20Section() {
  return (
    <section
      id="tsuki-wo-matagu"
      className="scroll-mt-24 overflow-hidden bg-[linear-gradient(180deg,#f7fbf9_0%,#eef6f3_48%,#f7fbf9_100%)] py-14 sm:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          kicker="Tsukishia / Screening Talk"
          title="月シア上映イベント『月を跨ぐ』vol.20"
          copy="『I'm talking about Homin'』の映像をキャストと一緒に見て、裏話を語るトークショーです。里季さんは昼の部・夕方の部のどちらにも出演します。"
        />

        <div className="grid gap-6 lg:grid-cols-[minmax(0,0.86fr)_minmax(0,1.14fr)] lg:items-stretch">
          <div className="riri-card overflow-hidden border-champagne/30 bg-white">
            <img
              {...getResponsiveImageProps(
                "/images/tsuki-wo-matagu-vol20-flyer.jpg",
                "(min-width: 1024px) 42vw, 100vw"
              )}
              alt="月シア上映イベント『月を跨ぐ』vol.20のフライヤー。2026年10月24日（土）、下北沢RBLCAFE。昼の部13:00、夕方の部17:00"
              loading="lazy"
              decoding="async"
              className="block h-auto w-full object-contain"
            />
            <p className="px-5 py-4 text-center text-xs leading-6 text-ink/50">
              フライヤーの出典：KAIGYAC STAGE（@kaigyacstage）の告知投稿
            </p>
          </div>

          <div className="riri-card flex flex-col border-champagne/30 bg-white p-5 sm:p-7 lg:p-8">
            <div className="flex flex-wrap gap-2">
              <span className="border border-champagne/45 bg-[#fffaf0] px-3 py-1.5 text-xs font-bold text-champagneInk">
                上映トークショー
              </span>
              <span className="border border-rosefog/45 bg-blush/35 px-3 py-1.5 text-xs font-bold text-ink/72">
                昼・夕両部出演
              </span>
              <span className="border border-rosefog/45 bg-blush/35 px-3 py-1.5 text-xs font-bold text-ink/72">
                9/21 18:00 チケ発
              </span>
            </div>

            <h3 className="mt-5 font-display text-2xl leading-tight text-ink sm:text-3xl">
              里季さんの出演回
            </h3>
            <p className="mt-2 text-sm leading-7 text-ink/68">
              里季さんは10月24日（土）の昼の部と夕方の部、どちらにも出演します。時刻はいずれも開演時間です。
            </p>

            <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {shows.map((show) => (
                <div
                  key={show.label}
                  className="border border-rosefog/30 bg-porcelain px-3 py-4 text-center"
                >
                  <p className="text-xs font-bold text-ink/55">{show.label}</p>
                  <p className="mt-1 font-display text-xl text-ink">
                    {show.time}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 grid gap-3 border-y border-rosefog/25 py-5 text-sm text-ink/68">
              <p className="flex items-start gap-2">
                <CalendarDays
                  className="mt-0.5 h-4 w-4 shrink-0 text-champagne"
                  aria-hidden="true"
                />
                <span>2026年10月24日（土）／下北沢RBLCAFE</span>
              </p>
              <p className="flex items-start gap-2">
                <Moon
                  className="mt-0.5 h-4 w-4 shrink-0 text-champagne"
                  aria-hidden="true"
                />
                <span>
                  月シア別冊第2集『I'm talking about Homin'』の全5話を、キャストと一緒に見て振り返る上映トークショー
                </span>
              </p>
              <p className="flex items-start gap-2">
                <Ticket
                  className="mt-0.5 h-4 w-4 shrink-0 text-champagne"
                  aria-hidden="true"
                />
                <span>チケット販売開始は9月21日（月）18:00。お席数は限られています</span>
              </p>
              <p className="flex items-start gap-2">
                <Gift
                  className="mt-0.5 h-4 w-4 shrink-0 text-champagne"
                  aria-hidden="true"
                />
                <span>
                  来場者限定：キャスト全員のサイン入りA1ポスター抽選と、イベント出演者の撮り下ろしサイン入りチェキ
                </span>
              </p>
            </div>

            <blockquote className="mt-6 border border-champagne/30 bg-porcelain/70 p-4 sm:p-5">
              <p className="mb-2 text-xs font-bold uppercase tracking-wide text-champagneInk">
                里季さんの投稿より
              </p>
              <p className="whitespace-pre-line text-sm leading-7 text-ink/80">
                {`【🌟出演情報🌟】
#月シア 上映イベント『月を跨ぐvol20』出演いたします！

アイトキホーミンの収録回を一緒に見ようというイベントです！
私たちが副音声みたいな感じでお話するよ！楽しみだねっっ！プレゼント企画もあるみたい✨️

舞台には来れなかったけどこの日なら都合合いそうという方や、もう1回みたい！見れてない作品みたい！裏話聞きたい！という方などなどお待ちしております🤲🏻

🗓10月24日(土)📍下北沢RBLCAFE

昼の部(13時回)夕方の部(17時回)どっちもいるよ✨️

お席限られてるので早めがおすすめ！(9/21の18時からチケ発です)`}
              </p>
            </blockquote>

            <div className="mt-6 grid gap-5">
              {shows.map((show) => (
                <div key={`${show.label}-cast`}>
                  <p className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-champagneInk">
                    <Users className="h-4 w-4" aria-hidden="true" />
                    {show.label}の出演
                  </p>
                  <ul className="flex flex-wrap gap-2">
                    {show.cast.map((name) => (
                      <li
                        key={`${show.label}-${name}`}
                        className={`border px-3 py-1.5 text-xs font-bold ${
                          name === "夏凪里季"
                            ? "border-champagne/55 bg-[#fffaf0] text-champagneInk"
                            : "border-rosefog/30 bg-porcelain text-ink/72"
                        }`}
                      >
                        {name}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <p className="mt-6 leading-8 text-ink/72">
              舞台に来られなかった人、もう一度見たい人、見れていない作品や裏話が気になる人に向けた上映イベントです。チケットは9月21日（月）18:00から LivePocket で販売開始です。
            </p>

            <div className="mt-auto flex flex-col gap-3 pt-7 sm:flex-row sm:flex-wrap">
              <a
                href={ticketUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="riri-button riri-button-gold min-h-12 px-5 py-3 text-sm"
              >
                チケット販売ページ（9/21 18:00〜）
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
              </a>
              <a
                href={ririPostUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="riri-button riri-button-soft min-h-12 px-5 py-3 text-sm"
              >
                里季さんの出演告知を見る
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
              </a>
              <a
                href={organizerPostUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="riri-button riri-button-soft min-h-12 px-5 py-3 text-sm"
              >
                制作の告知を見る
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <VenueMap
            venue="下北沢RBLCAFE"
            note="会場名は告知フライヤー、住所・アクセスはRBL CAFE公式サイトの記載です。"
          />
        </div>
      </div>
    </section>
  );
}
