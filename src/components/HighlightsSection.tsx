import { useState } from "react";
import {
  ArrowUpRight,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Trophy
} from "lucide-react";
import { highlights } from "../data/highlights";
import { getResponsiveImageProps } from "../lib/responsiveImage";
import { SectionHeader } from "./SectionHeader";

// 年の降順 → 同年内は配列の並び順を維持
const sortedHighlights = [...highlights].sort((a, b) =>
  a.year === b.year ? 0 : Number(b.year) - Number(a.year),
);

export function HighlightsSection() {
  const [showAll, setShowAll] = useState(false);
  const initialCount = 4;
  const visibleHighlights = showAll
    ? sortedHighlights
    : sortedHighlights.slice(0, initialCount);

  if (sortedHighlights.length === 0) {
    return null;
  }

  return (
    <section id="highlights" className="scroll-mt-24 bg-porcelain py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          kicker="Highlights"
          title="これまでの歩み"
          copy="舞台、CM、MV、ドラマ、ミスコンにSHOWROOMまで。吉井優花子さんがこれまで歩んできた道のり。"
        />

        <div id="highlight-list" className="grid gap-3 md:grid-cols-2">
          {visibleHighlights.map((item) => {
            const links = item.links ?? (item.link ? [item.link] : []);

            return (
              <article
                key={item.id}
                className="riri-card riri-card-interactive flex min-h-36 min-w-0 flex-col border-champagne/40 bg-white p-5"
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

        {sortedHighlights.length > initialCount && (
          <div className="mt-7 flex justify-center">
            <button
              type="button"
              onClick={() => setShowAll((current) => !current)}
              className="riri-button riri-button-soft min-h-12 px-5 py-3 text-sm"
              aria-expanded={showAll}
              aria-controls="highlight-list"
            >
              {showAll ? (
                <ChevronUp className="h-4 w-4 text-champagne" aria-hidden="true" />
              ) : (
                <ChevronDown className="h-4 w-4 text-champagne" aria-hidden="true" />
              )}
              {showAll
                ? "歩みをコンパクトに戻す"
                : `過去の活動をあと${sortedHighlights.length - initialCount}件見る`}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
