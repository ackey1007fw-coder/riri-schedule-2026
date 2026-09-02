import {
  CalendarDays,
  ExternalLink,
  MapPin,
  Sparkles,
  Users
} from "lucide-react";
import { getResponsiveImageProps } from "../lib/responsiveImage";
import { SectionHeader } from "./SectionHeader";
import { VenueMap } from "./VenueMap";

const ririPostUrl =
  "https://x.com/frecam2025_0306/status/2095174102634168752";
const organizerCastPostUrl =
  "https://x.com/tenjikukiji/status/2095073990658445630";
const organizerAccountUrl = "https://x.com/tenjikukiji";

const dayShows = [
  { label: "第一回", time: "12:00〜13:00" },
  { label: "第二回", time: "15:30〜16:30" },
  { label: "第三回", time: "18:30〜19:30" }
];

const sundayCast = [
  "橋本悠希",
  "澤田奏音",
  "小松穂葉",
  "長城祝華",
  "夏凪里季",
  "上杉夏穂",
  "紅葉美緒",
  "石原健太郎"
];

export function TenjikuVol28Section() {
  return (
    <section
      id="tenjiku-vol28"
      className="scroll-mt-24 overflow-hidden bg-[linear-gradient(180deg,#fffaf4_0%,#f7efe6_48%,#fffaf4_100%)] py-14 sm:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          kicker="Tenjiku / October Stage"
          title="『天竺生地』vol.28"
          copy="稽古なしの即興劇に初挑戦。里季さんの出演日は2026年10月11日（日）、会場は池袋西口GEKIBAです。"
        />

        <div className="grid gap-6 lg:grid-cols-[minmax(0,0.86fr)_minmax(0,1.14fr)] lg:items-stretch">
          <div className="riri-card overflow-hidden border-champagne/30 bg-white">
            <img
              {...getResponsiveImageProps(
                "/images/tenjiku-vol28-flyer.jpg",
                "(min-width: 1024px) 42vw, 100vw"
              )}
              alt="『天竺生地』vol.28の公演フライヤー。2026年10月10日〜11日、池袋西口GEKIBA。MCは斎藤このむと緑川睦"
              loading="lazy"
              decoding="async"
              className="block h-auto w-full object-contain"
            />
          </div>

          <div className="riri-card flex flex-col border-champagne/30 bg-white p-5 sm:p-7 lg:p-8">
            <div className="flex flex-wrap gap-2">
              <span className="border border-champagne/45 bg-[#fffaf0] px-3 py-1.5 text-xs font-bold text-champagneInk">
                即興劇
              </span>
              <span className="border border-rosefog/45 bg-blush/35 px-3 py-1.5 text-xs font-bold text-ink/72">
                初挑戦
              </span>
              <span className="border border-rosefog/45 bg-blush/35 px-3 py-1.5 text-xs font-bold text-ink/72">
                10月11日（日）
              </span>
            </div>

            <h3 className="mt-5 font-display text-2xl leading-tight text-ink sm:text-3xl">
              里季さんの出演日
            </h3>
            <p className="mt-2 text-sm leading-7 text-ink/68">
              キャスト発表第一弾では、出演者は日付単位で案内されています。どの回への出演かは、現時点では確認できていません。
            </p>

            <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
              {dayShows.map((show) => (
                <div
                  key={show.label}
                  className="border border-rosefog/30 bg-porcelain px-3 py-4 text-center"
                >
                  <p className="text-xs font-bold text-ink/55">{show.label}</p>
                  <p className="mt-1 font-display text-xl text-ink">{show.time}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 grid gap-3 border-y border-rosefog/25 py-5 text-sm text-ink/68">
              <p className="flex items-start gap-2">
                <CalendarDays
                  className="mt-0.5 h-4 w-4 shrink-0 text-champagne"
                  aria-hidden="true"
                />
                <span>2026年10月11日（日）／池袋西口GEKIBA</span>
              </p>
              <p className="flex items-start gap-2">
                <MapPin
                  className="mt-0.5 h-4 w-4 shrink-0 text-champagne"
                  aria-hidden="true"
                />
                <span>MC：斎藤このむ・緑川睦（天竺）</span>
              </p>
              <p className="flex items-start gap-2">
                <Sparkles
                  className="mt-0.5 h-4 w-4 shrink-0 text-champagne"
                  aria-hidden="true"
                />
                <span>即興劇のあとトークショーがあり、その場でMVPを決める勝負形式</span>
              </p>
            </div>

            <blockquote className="mt-6 border border-champagne/30 bg-porcelain/70 p-4 sm:p-5">
              <p className="mb-2 text-xs font-bold uppercase tracking-wide text-champagneInk">
                里季さんの投稿より
              </p>
              <p className="whitespace-pre-line text-sm leading-7 text-ink/80">
                {`【🌟出演情報🌟】

天竺生地vol.28
出演させていただきます！

🗓10月11日(日)📍池袋西口GEKIBA

稽古なしの即興劇！初挑戦でドキドキですが頑張りますの皆さんよろしくお願いします🤲🏻`}
              </p>
            </blockquote>

            <div className="mt-6">
              <p className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-champagneInk">
                <Users className="h-4 w-4" aria-hidden="true" />
                10月11日（日）のキャスト（発表第一弾）
              </p>
              <ul className="flex flex-wrap gap-2">
                {sundayCast.map((name) => (
                  <li
                    key={name}
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

            <p className="mt-6 leading-8 text-ink/72">
              天竺生地は、出演者を「生地」と見立てて合わせることでひとつの作品を完成させる即興劇。主な活動衣装はジャージです。チケット情報は、確認でき次第こちらに掲載します。
            </p>

            <div className="mt-auto flex flex-col gap-3 pt-7 sm:flex-row sm:flex-wrap">
              <a
                href={ririPostUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="riri-button riri-button-gold min-h-12 px-5 py-3 text-sm"
              >
                里季さんの出演告知を見る
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
              </a>
              <a
                href={organizerCastPostUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="riri-button riri-button-soft min-h-12 px-5 py-3 text-sm"
              >
                キャスト発表を見る
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
              </a>
              <a
                href={organizerAccountUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="riri-button riri-button-soft min-h-12 px-5 py-3 text-sm"
              >
                天竺生地のX
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,0.42fr)_minmax(0,1.58fr)] lg:items-stretch">
          <div className="riri-card overflow-hidden border-champagne/30 bg-white p-5 sm:p-6">
            <img
              {...getResponsiveImageProps(
                "/images/tenjiku-vol28-logo.jpg",
                "(min-width: 1024px) 24vw, 100vw"
              )}
              alt="演劇ユニット天竺のロゴ。橙色の筆文字と、黒いジャージ姿のちびキャラ2人"
              loading="lazy"
              decoding="async"
              className="mx-auto block h-auto w-full max-w-xs object-contain"
            />
            <p className="mt-4 text-center text-xs leading-6 text-ink/50">
              フライヤー・ロゴの出典：天竺生地（@tenjikukiji）のキャスト発表投稿
            </p>
          </div>

          <VenueMap
            venue="池袋西口GEKIBA"
            note="フライヤー記載の住所・アクセスで地図を表示しています。"
          />
        </div>
      </div>
    </section>
  );
}
