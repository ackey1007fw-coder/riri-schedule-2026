import { ArrowUpRight } from "lucide-react";
import { highlights } from "../data/highlights";
import { getResponsiveImageProps } from "../lib/responsiveImage";
import { ActHeader } from "./ActHeader";

const sortedHighlights = [...highlights].sort((a, b) =>
  a.year === b.year ? 0 : Number(b.year) - Number(a.year),
);

const years = [...new Set(sortedHighlights.map((item) => item.year))];

const isProduceItem = (title: string, description: string) =>
  title.includes("#ゆかJET") || description.includes("プロデュース");

export function HighlightsSection() {
  if (sortedHighlights.length === 0) {
    return null;
  }

  return (
    <section id="highlights" className="scroll-mt-24 bg-porcelain py-16 sm:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <ActHeader
          act={3}
          eyebrow="Highlights"
          title="これまでの歩み"
          copy="女優・舞台人・プロデューサーとしての歩みを、年ごとのタイムラインで振り返ります。"
        />

        <div className="relative border-l-2 border-champagne/40 pl-7 sm:pl-10">
          {years.map((year) => {
            const items = sortedHighlights.filter((item) => item.year === year);

            return (
              <div key={year} className="mb-12 last:mb-0">
                <p className="relative mb-6 font-display text-4xl leading-none text-ink sm:text-5xl">
                  <span
                    className="absolute -left-[39px] top-1/2 h-3.5 w-3.5 -translate-y-1/2 rounded-full border-2 border-champagne bg-porcelain sm:-left-[49px]"
                    aria-hidden="true"
                  />
                  {year}
                </p>

                <div className="space-y-6">
                  {items.map((item) => {
                    const links = item.links ?? (item.link ? [item.link] : []);
                    const isProduce = isProduceItem(item.title, item.description);

                    return (
                      <article key={item.id} className="relative">
                        <span
                          className="absolute -left-[34px] top-2 h-2 w-2 rounded-full bg-rosefog sm:-left-[44px]"
                          aria-hidden="true"
                        />
                        <div className="yukako-card yukako-card-interactive flex flex-col gap-4 border-rosefog/20 bg-white p-5 sm:flex-row">
                          {item.image && (
                            <img
                              {...getResponsiveImageProps(
                                item.image,
                                "(min-width: 640px) 160px, 100vw",
                              )}
                              alt={item.title}
                              loading="lazy"
                              className="block h-40 w-full shrink-0 border border-champagne/30 object-cover sm:h-auto sm:w-32"
                            />
                          )}
                          <div className="min-w-0 flex-1">
                            <p className="flex flex-wrap items-center gap-2 text-xs font-bold text-champagne">
                              <span className="border border-champagne/40 bg-porcelain px-2 py-0.5">
                                {item.date}
                              </span>
                              <span>{item.category}</span>
                              {isProduce && (
                                <span className="border border-rosefog/40 bg-[#fff1f6] px-2 py-0.5 text-[#8d4260]">
                                  プロデュース
                                </span>
                              )}
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
                                    className="inline-flex items-center gap-1 border border-rosefog/40 bg-porcelain px-3 py-1.5 text-xs font-bold text-ink transition hover:border-champagne hover:bg-white"
                                  >
                                    {link.label}
                                    <ArrowUpRight className="h-3.5 w-3.5 text-champagne" aria-hidden="true" />
                                  </a>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
