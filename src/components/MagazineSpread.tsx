import { useState } from "react";
import { ArrowRight, CalendarDays, Camera, Radio } from "lucide-react";
import { galleryPhotos } from "../data/photos";
import { profile } from "../data/profile";
import { getResponsiveImageProps } from "../lib/responsiveImage";
import { pickShowcasePhotos } from "../lib/showcasePhotos";
import type { ScheduleEvent } from "../types";

type MagazineSpreadProps = {
  nextEvent?: ScheduleEvent;
};

const FALLBACK = [
  { src: profile.heroImage, alt: "吉井優花子さんのポートレート" },
  { src: profile.portraitImage, alt: "吉井優花子さんのポートレート" },
  { src: profile.heroImage, alt: "吉井優花子さんのポートレート" }
];

export function MagazineSpread({ nextEvent }: MagazineSpreadProps) {
  // 開くたびに3枚をランダム選出（Cover Story / 02 / 03）
  const [feature] = useState(() => {
    const picked = pickShowcasePhotos(3);
    return [0, 1, 2].map((i) => picked[i] ?? FALLBACK[i]);
  });
  const featurePhotos = feature.map((p) => p.src);
  const featureAlts = feature.map((p) => p.alt);

  return (
    <section className="bg-white py-12 sm:py-16" aria-label="Yukako Magazine">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid overflow-hidden border border-rosefog/20 bg-porcelain shadow-paper lg:grid-cols-[1.05fr_0.95fr]">
          <div className="relative border-b border-rosefog/20 bg-white lg:border-b-0 lg:border-r">
            <div className="grid gap-3 p-3 sm:grid-cols-[1.15fr_0.85fr] sm:gap-4 sm:p-4">
              <figure className="relative overflow-hidden border border-white bg-porcelain">
                <img
                  {...getResponsiveImageProps(
                    featurePhotos[0],
                    "(min-width: 1024px) 55vw, 100vw",
                  )}
                  alt={featureAlts[0]}
                  loading="lazy"
                  className="block w-full sm:h-[620px] sm:object-cover sm:object-[50%_18%]"
                />
                <figcaption className="absolute inset-x-3 bottom-3 border border-white/50 bg-white/70 px-3 py-2 text-[11px] font-black uppercase tracking-[0.18em] text-ink backdrop-blur">
                  Cover Story
                </figcaption>
              </figure>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-1 sm:gap-4">
                {featurePhotos.slice(1).map((src, index) => (
                  <figure
                    key={src}
                    className="relative overflow-hidden border border-white bg-porcelain"
                  >
                    <img
                      {...getResponsiveImageProps(
                        src,
                        "(min-width: 1024px) 28vw, 50vw",
                      )}
                      alt={featureAlts[index + 1]}
                      loading="lazy"
                      className="block w-full sm:h-[302px] sm:object-cover"
                    />
                    <span className="absolute left-3 top-3 border border-champagne/40 bg-white/75 px-2 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-champagne backdrop-blur">
                      0{index + 2}
                    </span>
                  </figure>
                ))}
              </div>
            </div>
          </div>

          <div className="relative p-6 sm:p-8 lg:p-10">
            <p className="gold-kicker inline-flex px-3 py-2 text-[11px] font-black uppercase tracking-[0.18em]">
              Yukako Schedule 2026 / Issue 06
            </p>
            <div className="mt-8 grid gap-4 border-y border-champagne/30 py-7">
              <p className="font-display text-5xl leading-none text-ink sm:text-6xl">
                Yukako
                <span className="block text-ink/45">Magazine</span>
              </p>
              <p className="max-w-xl text-sm leading-7 text-ink/68 sm:text-base sm:leading-8">
                かわいさ、舞台に向かうまっすぐさ、配信で会える近さ。次に見る場所がすぐ分かる、応援のための小さな特集ページです。
              </p>
            </div>

            <div className="mt-7 grid gap-3">
              <a
                href="#next"
                className="group flex min-h-16 items-center gap-4 border border-ink bg-ink px-4 py-3 text-white transition hover:-translate-y-0.5 hover:bg-[#4a3942]"
              >
                <CalendarDays className="h-5 w-5 shrink-0" aria-hidden="true" />
                <span className="min-w-0 flex-1">
                  <span className="block text-[11px] font-black uppercase tracking-[0.16em] text-white/55">
                    Next Appearance
                  </span>
                  <span className="block truncate text-sm font-bold">
                    {nextEvent?.shortTitle || nextEvent?.title || "次の出演を見る"}
                  </span>
                </span>
                <ArrowRight className="h-4 w-4 shrink-0 transition group-hover:translate-x-1" aria-hidden="true" />
              </a>
              <a
                href="#showroom"
                className="group flex min-h-16 items-center gap-4 border border-rosefog/30 bg-white px-4 py-3 text-ink transition hover:-translate-y-0.5 hover:border-champagne"
              >
                <Radio className="h-5 w-5 shrink-0 text-champagne" aria-hidden="true" />
                <span className="min-w-0 flex-1">
                  <span className="block text-[11px] font-black uppercase tracking-[0.16em] text-champagne">
                    Live Room
                  </span>
                  <span className="block truncate text-sm font-bold">SHOWROOMの配信予定を見る</span>
                </span>
                <ArrowRight className="h-4 w-4 shrink-0 transition group-hover:translate-x-1" aria-hidden="true" />
              </a>
              <a
                href="#gallery"
                className="group flex min-h-16 items-center gap-4 border border-rosefog/30 bg-white px-4 py-3 text-ink transition hover:-translate-y-0.5 hover:border-champagne"
              >
                <Camera className="h-5 w-5 shrink-0 text-champagne" aria-hidden="true" />
                <span className="min-w-0 flex-1">
                  <span className="block text-[11px] font-black uppercase tracking-[0.16em] text-champagne">
                    Photo Selection
                  </span>
                  <span className="block truncate text-sm font-bold">写真をスライドショーで見る</span>
                </span>
                <ArrowRight className="h-4 w-4 shrink-0 transition group-hover:translate-x-1" aria-hidden="true" />
              </a>
            </div>

            <div className="mt-8 grid grid-cols-3 border-y border-rosefog/20 py-4 text-center">
              <div>
                <p className="font-display text-2xl text-ink">{galleryPhotos.length}</p>
                <p className="text-[10px] font-black uppercase tracking-wide text-ink/45">Photos</p>
              </div>
              <div className="border-x border-rosefog/20">
                <p className="font-display text-2xl text-ink">06.24</p>
                <p className="text-[10px] font-black uppercase tracking-wide text-ink/45">Birthday</p>
              </div>
              <div>
                <p className="font-display text-2xl text-ink">SR</p>
                <p className="text-[10px] font-black uppercase tracking-wide text-ink/45">Live</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
