import { ArrowRight, CalendarDays, HelpCircle, Radio, Search, Sparkles } from "lucide-react";
import { searchFaqs, searchIntents } from "../data/searchFaq";

const searchTopics = [
  {
    icon: CalendarDays,
    title: "出演情報",
    body: "夏凪里季さんの次の出演、舞台予定、イベント、チケット予約先を確認できます。"
  },
  {
    icon: Radio,
    title: "SHOWROOM",
    body: "SHOWROOM配信、ルーム情報、アバター、フォロー導線をまとめています。"
  },
  {
    icon: Sparkles,
    title: "フレキャン",
    body: "フレキャン2025 Entry No.306としての活動や関連リンクを見つけやすく整理しています。"
  }
];

export function SearchSeoSection() {
  return (
    <section className="bg-white px-4 py-14 sm:px-6 lg:px-8" aria-label="検索用サイト説明">
      <div className="mx-auto max-w-7xl border-y border-champagne/35 py-10">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <p className="mb-3 inline-flex items-center gap-2 text-xs font-bold uppercase text-champagne">
              <Search className="h-4 w-4" aria-hidden="true" />
              Search Guide
            </p>
            <h2 className="font-display text-3xl leading-tight text-ink sm:text-4xl">
              夏凪里季さんを応援するためのFan Schedule
            </h2>
            <p className="mt-5 leading-8 text-ink/70">
              夏凪里季さんの出演情報・舞台・フレキャン関連・SHOWROOM・SNS・
              プロフィールを、応援する人の目線でまとめたFan Schedule。
              次の予定もチケットも配信も、スマホからすぐにたどれます。
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
                className="group flex min-h-36 flex-col justify-between border border-rosefog/25 bg-porcelain p-4 transition hover:border-champagne hover:bg-white"
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
            <p className="mt-4 leading-8 text-ink/65">
              検索から来た人が、出演情報、SHOWROOM、SNS、プロフィールへすぐ進めるように整理しています。
            </p>
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
    </section>
  );
}
