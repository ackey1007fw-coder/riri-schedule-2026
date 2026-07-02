import {
  CalendarDays,
  Clapperboard,
  HeartHandshake,
  Mic2,
  Sparkles,
  Star,
  UserRound,
  Share2
} from "lucide-react";
import { profile } from "../data/profile";
import { SectionHeader } from "./SectionHeader";

const charmCards = [
  {
    title: "心に届く声",
    copy: "やわらかく安心感のある声と、舞台・MC・歌唱で届く表現力。",
    Icon: Mic2
  },
  {
    title: "秋田の公務員から俳優へ",
    copy: "公務員として働いた経験を礎に、上京して舞台・映像へ表現の場を広げる歩み。",
    Icon: Sparkles
  },
  {
    title: "優しく楽しく柔らかく",
    copy: "リスナーや周囲を大切にする、あたたかく平和な人柄。",
    Icon: HeartHandshake
  },
  {
    title: "つくる側にも立つ表現者",
    copy: "出演だけでなく、プロデュース公演にも挑戦する行動力と責任感。",
    Icon: Star
  }
];

const guideCards = [
  { label: "まずプロフィールを見る", href: "#profile", Icon: UserRound },
  { label: "今日の配信・予定を見る", href: "#schedule", Icon: CalendarDays },
  { label: "出演・公演情報を見る", href: "#next", Icon: Clapperboard },
  { label: "SNSをフォローする", href: "#links", Icon: Share2 },
  { label: "応援方法を見る", href: "#showroom", Icon: HeartHandshake }
];

export function PortalIntroSection() {
  return (
    <section id="about" className="scroll-mt-24 bg-porcelain py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div className="yukako-card border-champagne/40 bg-white p-6 shadow-paper sm:p-8">
            <p className="gold-kicker mb-5 inline-flex px-3 py-2 text-xs font-bold uppercase">
              30 seconds
            </p>
            <h2 className="font-display text-3xl leading-tight text-ink sm:text-4xl">
              30秒でわかる吉井優花子
            </h2>
            <p className="mt-5 text-base leading-8 text-ink/74 sm:text-lg sm:leading-9">
              秋田出身。公務員として働いた経験を礎に上京し、舞台・ミュージカル・映像・モデル・MC・リポーターとして活動する俳優。やわらかな声、丁寧な言葉、人をよく見る力を武器に、観る人の心に届く表現を目指しています。2026年は出演だけでなく、プロデュース公演にも挑戦中。
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {[
                ["出身", "秋田県秋田市"],
                ["活動", "俳優・プロデューサー"],
                ["配信", profile.showroom.roomName]
              ].map(([label, value]) => (
                <div key={label} className="border border-rosefog/20 bg-porcelain px-4 py-3">
                  <p className="text-xs font-bold text-champagne">{label}</p>
                  <p className="mt-1 text-sm font-bold leading-6 text-ink/75">{value}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <SectionHeader
              kicker="Charm"
              title="応援したくなる理由"
              copy="俳優としての信頼感と、配信で伝わるやわらかい空気。その両方が吉井優花子さんの魅力です。"
            />
            <div className="grid gap-3 sm:grid-cols-2">
              {charmCards.map(({ title, copy, Icon }) => (
                <article key={title} className="yukako-card border-rosefog/20 bg-white p-5">
                  <span className="grid h-11 w-11 place-items-center rounded-full border border-champagne/45 bg-porcelain text-champagne">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 font-display text-2xl leading-tight text-ink">
                    {title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-ink/68">{copy}</p>
                </article>
              ))}
            </div>
          </div>
        </div>

        <div id="first-guide" className="mt-12 scroll-mt-24">
          <SectionHeader
            kicker="First guide"
            title="はじめての方へ"
            copy="気になったところから見られるように、入口を分けました。"
          />
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {guideCards.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                className="yukako-card yukako-card-interactive flex min-h-28 items-start gap-3 border-champagne/35 bg-white p-4"
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center border border-champagne/45 bg-porcelain text-champagne">
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </span>
                <span className="pt-1 text-sm font-bold leading-6 text-ink/78">
                  {label}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
