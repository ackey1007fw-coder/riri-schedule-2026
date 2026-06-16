import { ArrowUpRight, Sparkles, Trophy } from "lucide-react";
import { highlights } from "../data/highlights";
import { SectionHeader } from "./SectionHeader";

// 年の降順 → 同年内は配列の並び順を維持
const sortedHighlights = [...highlights].sort((a, b) =>
  a.year === b.year ? 0 : Number(b.year) - Number(a.year),
);

export function HighlightsSection() {
  if (sortedHighlights.length === 0) {
    return null;
  }

  return (
    <section id="highlights" className="scroll-mt-24 bg-porcelain py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          kicker="Highlights"
          title="これまでの歩み"
          copy="ドラマ、MV、CM、舞台に受賞まで。里季ちゃんがこれまで歩んできた道のり。"
        />

        <div className="grid gap-3 md:grid-cols-2">
          {sortedHighlights.map((item) => {
            const links = item.links ?? (item.link ? [item.link] : []);

            return (
              <article
                key={item.id}
                className="flex min-h-36 flex-col border border-champagne/40 bg-white p-5"
              >
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    className="mb-4 block w-full border border-white"
                  />
                )}
                <div className="flex items-start gap-4">
                  <span className="grid h-12 w-12 shrink-0 place-items-center border border-champagne/50 bg-porcelain text-champagne">
                    {item.category === "受賞" ? (
                      <Trophy className="h-5 w-5" aria-hidden="true" />
                    ) : (
                      <Sparkles className="h-5 w-5" aria-hidden="true" />
                    )}
                  </span>
                  <div className="min-w-0">
                    <p className="flex flex-wrap items-center gap-2 text-xs font-bold text-champagne">
                      <span className="border border-champagne/40 bg-porcelain px-2 py-0.5">
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
                  </div>
                </div>

                {links.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {links.map((link) => (
                      <a
                        key={link.url}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 border border-rosefog/40 bg-porcelain px-3 py-1.5 text-xs font-bold text-ink transition hover:border-champagne hover:bg-white"
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
      </div>
    </section>
  );
}
