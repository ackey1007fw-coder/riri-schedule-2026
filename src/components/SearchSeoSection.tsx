import {
  ArrowRight,
  CalendarDays,
  ChevronDown,
  HelpCircle,
  Radio,
  Search,
  Sparkles
} from "lucide-react";
import { searchFaqs, searchIntents } from "../data/searchFaq";

const searchTopics = [
  {
    icon: CalendarDays,
    title: "公演情報",
    body: "#ゆかJET やBaby Shark Liveなど、最新の公演日程を確認できます。"
  },
  {
    icon: Radio,
    title: "出演歴",
    body: "CM・MV・ドラマ・舞台・ミスコンなど、幅広い活動歴をまとめています。"
  },
  {
    icon: Sparkles,
    title: "SNS・配信",
    body: "X、Instagram、TikTok、SHOWROOMの最新情報をチェックできます。"
  }
];

export function SearchSeoSection() {
  return (
    <section className="bg-white px-4 py-10 sm:px-6 lg:px-8" aria-label="サイト案内">
      <details className="group/guide mx-auto max-w-7xl border-y border-champagne/35">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-5 py-7 marker:hidden">
          <span className="flex min-w-0 items-center gap-4">
            <span className="grid h-11 w-11 shrink-0 place-items-center border border-champagne/45 bg-porcelain text-champagne">
              <Search className="h-5 w-5" aria-hidden="true" />
            </span>
            <span>
              <span className="block text-xs font-bold uppercase text-champagne">
                First Guide
              </span>
              <span className="mt-1 block font-display text-2xl leading-tight text-ink sm:text-3xl">
                はじめての方へ・このサイトでできること
              </span>
            </span>
          </span>
          <span className="grid h-11 w-11 shrink-0 place-items-center border border-rosefog/30 bg-white text-champagne">
            <ChevronDown
              className="h-5 w-5 transition group-open/guide:rotate-180"
              aria-hidden="true"
            />
          </span>
        </summary>

        <div className="border-t border-rosefog/20 pb-10 pt-8">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div>
              <h2 className="font-display text-3xl leading-tight text-ink sm:text-4xl">
                吉井優花子さんを応援するための非公式ポータル
              </h2>
              <p className="mt-5 leading-8 text-ink/70">
                舞台・CM・MV・ミスコン・SHOWROOMまで、吉井優花子さんの活動を応援する人の目線でまとめています。
                公演スケジュールもSNSも、スマホからすぐにたどれます。
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {searchTopics.map((topic) => {
                const Icon = topic.icon;

                return (
                  <div key={topic.title} className="border border-rosefog/25 bg-porcelain p-4">
                    <Icon className="mb-4 h-5 w-5 text-champagne" aria-hidden="true" />
                    <h3 className="text-sm font-bold text-ink">{topic.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-ink/65">{topic.body}</p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-10 border-t border-rosefog/20 pt-8">
            <div className="mb-5 flex items-center gap-2 text-xs font-bold uppercase text-champagne">
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
              Start Here
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {searchIntents.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="yukako-lift group flex min-h-36 flex-col justify-between border border-rosefog/25 bg-porcelain p-4 hover:border-champagne hover:bg-white"
                >
                  <span>
                    <span className="text-[11px] font-black uppercase tracking-wide text-champagne">
                      {item.label}
                    </span>
                    <span className="mt-2 block font-display text-xl leading-tight text-ink">
                      {item.title}
                    </span>
                    <span className="mt-3 block text-sm leading-7 text-ink/65">
                      {item.copy}
                    </span>
                  </span>
                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-ink">
                    見る
                    <ArrowRight
                      className="h-4 w-4 text-champagne transition group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </span>
                </a>
              ))}
            </div>
          </div>

          <div className="mt-10 grid gap-6 border-t border-rosefog/20 pt-8 lg:grid-cols-[0.55fr_1.45fr]">
            <div>
              <p className="mb-3 inline-flex items-center gap-2 text-xs font-bold uppercase text-champagne">
                <HelpCircle className="h-4 w-4" aria-hidden="true" />
                FAQ
              </p>
              <h3 className="font-display text-2xl leading-tight text-ink sm:text-3xl">
                よく探されること
              </h3>
            </div>
            <div className="divide-y divide-rosefog/20 border-y border-rosefog/20">
              {searchFaqs.map((faq) => (
                <details key={faq.question} className="group bg-white">
                  <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-4 py-4 text-left text-sm font-bold text-ink marker:hidden">
                    <span>{faq.question}</span>
                    <ArrowRight
                      className="h-4 w-4 shrink-0 text-champagne transition group-open:rotate-90"
                      aria-hidden="true"
                    />
                  </summary>
                  <div className="pb-5 pr-6">
                    <p className="text-sm leading-8 text-ink/68">{faq.answer}</p>
                    <a
                      href={faq.href}
                      className="mt-3 inline-flex items-center gap-2 text-sm font-bold text-ink underline decoration-champagne/70 underline-offset-4"
                    >
                      {faq.linkLabel}
                      <ArrowRight className="h-4 w-4 text-champagne" aria-hidden="true" />
                    </a>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </div>
      </details>
    </section>
  );
}
