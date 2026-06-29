import {
  ArrowUpRight,
  ChevronDown,
  Clapperboard,
  HeartHandshake,
  Mic2,
  MonitorPlay,
  Sparkles,
  Trophy
} from "lucide-react";
import { highlights, type Highlight } from "../data/highlights";
import { getResponsiveImageProps } from "../lib/responsiveImage";
import { SectionHeader } from "./SectionHeader";

const sortedHighlights = [...highlights].sort((a, b) =>
  a.year === b.year ? 0 : Number(b.year) - Number(a.year),
);

const groups = [
  {
    title: "舞台・ミュージカル",
    copy: "舞台デビューからファミリーミュージカル、GO,JET!シリーズまで。",
    Icon: Clapperboard,
    match: (item: Highlight) =>
      item.category === "舞台" && !item.title.includes("#ゆかJET")
  },
  {
    title: "映像・CM",
    copy: "テレビ、CM、映像領域での出演記録。",
    Icon: MonitorPlay,
    match: (item: Highlight) =>
      ["TV", "CM"].includes(item.category) || item.title.includes("weather")
  },
  {
    title: "モデル・リポーター・MC",
    copy: "伝える仕事、見せる仕事で広がってきた活動。",
    Icon: Mic2,
    match: (item: Highlight) =>
      item.category === "モデル" ||
      item.title.includes("リポーター") ||
      item.title.includes("アンバサダー")
  },
  {
    title: "SHOWROOM実績",
    copy: "配信活動の原点と、日々の応援が積み上がる場所。",
    Icon: HeartHandshake,
    match: (item: Highlight) =>
      item.title.includes("ミス浴衣") || item.description.includes("SHOWROOM")
  },
  {
    title: "ミスコン・運営補佐",
    copy: "コンテストでの受賞・選出と、表舞台を支える経験。",
    Icon: Trophy,
    match: (item: Highlight) =>
      item.category === "受賞" ||
      item.title.includes("Miss") ||
      item.title.includes("ミス")
  },
  {
    title: "プロデュース",
    copy: "出演だけでなく、企画して届ける側にも立つ挑戦。",
    Icon: Sparkles,
    match: (item: Highlight) =>
      item.title.includes("#ゆかJET") || item.description.includes("プロデュース")
  }
];

const groupItems = (group: (typeof groups)[number]) =>
  sortedHighlights.filter(group.match);

export function HighlightsSection() {
  if (sortedHighlights.length === 0) {
    return null;
  }

  return (
    <section id="highlights" className="scroll-mt-24 bg-porcelain py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          kicker="Highlights"
          title="出演歴・実績"
          copy="女優・舞台人・プロデューサーとしての歩みを、活動カテゴリごとに整理しました。"
        />

        <div className="grid gap-4">
          {groups.map((group, index) => {
            const items = groupItems(group);
            if (items.length === 0) return null;
            const Icon = group.Icon;

            return (
              <details
                key={group.title}
                open={index < 2}
                className="group riri-card border-champagne/35 bg-white"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 marker:hidden sm:p-6">
                  <div className="flex items-start gap-4">
                    <span className="grid h-12 w-12 shrink-0 place-items-center border border-champagne/45 bg-porcelain text-champagne">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <span>
                      <span className="block text-xs font-bold uppercase text-champagne">
                        {items.length} records
                      </span>
                      <span className="mt-1 block font-display text-2xl text-ink sm:text-3xl">
                        {group.title}
                      </span>
                      <span className="mt-2 block text-sm leading-6 text-ink/60">
                        {group.copy}
                      </span>
                    </span>
                  </div>
                  <ChevronDown className="h-5 w-5 shrink-0 text-champagne transition group-open:rotate-180" aria-hidden="true" />
                </summary>

                <div className="grid gap-3 border-t border-rosefog/15 p-4 sm:p-5 md:grid-cols-2">
                  {items.map((item) => {
                    const links = item.links ?? (item.link ? [item.link] : []);

                    return (
                      <article
                        key={item.id}
                        className="riri-card riri-card-interactive flex min-h-36 min-w-0 flex-col border-rosefog/20 bg-porcelain p-5"
                      >
                        {item.image && (
                          <img
                            {...getResponsiveImageProps(
                              item.image,
                              "(min-width: 768px) 50vw, 100vw",
                            )}
                            alt={item.title}
                            loading="lazy"
                            className="mb-4 block w-full border border-white"
                          />
                        )}
                        <p className="flex flex-wrap items-center gap-2 text-xs font-bold text-champagne">
                          <span className="border border-champagne/40 bg-white px-2 py-0.5">
                            {item.date}
                          </span>
                          <span>{item.category}</span>
                        </p>
                        <h3 className="mt-2 font-display text-2xl leading-tight text-ink">
                          {item.title}
                        </h3>
                        <p className="mt-3 text-sm leading-7 text-ink/70">
                          {item.description}
                        </p>

                        {links.length > 0 && (
                          <div className="mt-4 flex flex-wrap gap-2">
                            {links.map((link) => (
                              <a
                                key={link.url}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 border border-rosefog/40 bg-white px-3 py-1.5 text-xs font-bold text-ink transition hover:border-champagne hover:bg-porcelain"
                              >
                                {link.label}
                                <ArrowUpRight className="h-3.5 w-3.5 text-champagne" aria-hidden="true" />
                              </a>
                            ))}
                          </div>
                        )}
                      </article>
                    );
                  })}
                </div>
              </details>
            );
          })}
        </div>
      </div>
    </section>
  );
}
