import { Anchor, ExternalLink, GlassWater, Instagram, Ship, Sparkles } from "lucide-react";
import { nightCruise } from "../data/nightCruise";
import { getResponsiveImageProps } from "../lib/responsiveImage";

const logbookIcons = [Ship, Anchor, GlassWater];

export function NightCruiseSection() {
  return (
    <section
      id={nightCruise.id}
      className="scroll-mt-24 overflow-hidden border-y border-lavender/40 bg-[linear-gradient(170deg,#fffafc_0%,#f3f1ff_46%,#eef3fb_100%)] py-14 sm:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_0.66fr] lg:items-end">
          <div className="max-w-3xl">
            <p className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.16em] text-champagneInk">
              <Anchor className="h-4 w-4" aria-hidden="true" />
              {nightCruise.kicker} ・ {nightCruise.date}
            </p>
            <h2 className="mt-3 font-display text-3xl leading-tight text-ink sm:text-4xl">
              {nightCruise.heading}
            </h2>
            <p className="mt-4 leading-8 text-ink/70">{nightCruise.copy}</p>
          </div>

          <dl className="grid gap-2.5 sm:grid-cols-3 lg:grid-cols-1">
            {nightCruise.logbook.map((entry, index) => {
              const Icon = logbookIcons[index] ?? Sparkles;
              return (
                <div
                  key={entry.term}
                  className="riri-card flex items-start gap-3 border-lavender/50 bg-white/75 px-4 py-3"
                >
                  <span className="grid h-9 w-9 shrink-0 place-items-center border border-champagne/50 bg-porcelain text-champagne">
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <div className="min-w-0">
                    <dt className="text-[10px] font-black uppercase tracking-[0.16em] text-champagneInk">
                      {entry.term}
                    </dt>
                    <dd className="mt-0.5 text-sm font-bold leading-snug text-ink">
                      {entry.value}
                      <span className="mt-0.5 block text-xs font-medium leading-snug text-ink/55">
                        {entry.note}
                      </span>
                    </dd>
                  </div>
                </div>
              );
            })}
          </dl>
        </div>

        <article className="riri-card mt-9 grid overflow-hidden border-lavender/50 bg-[linear-gradient(150deg,#1d2440_0%,#2b2b4c_54%,#3d3057_100%)] text-white shadow-paper lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <img
            {...getResponsiveImageProps(
              nightCruise.hero.src,
              "(min-width: 1024px) 58vw, 100vw",
            )}
            alt={nightCruise.hero.alt}
            loading="lazy"
            decoding="async"
            className="block h-auto w-full"
          />

          <div className="p-6 sm:p-8 lg:p-10">
            <p className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.16em] text-champagne">
              <Sparkles className="h-4 w-4" aria-hidden="true" />
              Tokyo Bay Night View
            </p>
            <blockquote className="mt-4 whitespace-pre-line border-l-2 border-champagne pl-4 font-display text-xl leading-9 text-white sm:text-2xl">
              {nightCruise.quote}
            </blockquote>
            <p className="mt-5 leading-7 text-white/70">{nightCruise.hero.caption}</p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {nightCruise.hashtags.map((tag) => (
                <li
                  key={tag}
                  className="border border-white/20 bg-white/10 px-2.5 py-1 text-xs font-bold text-white/80"
                >
                  {tag}
                </li>
              ))}
            </ul>
          </div>
        </article>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {nightCruise.photos.map((photo) => (
            <figure
              key={photo.src}
              className="riri-card overflow-hidden border-lavender/45 bg-white/80"
            >
              <img
                {...getResponsiveImageProps(
                  photo.src,
                  "(min-width: 1024px) 24vw, (min-width: 640px) 46vw, 100vw",
                )}
                alt={photo.alt}
                loading="lazy"
                decoding="async"
                className="block h-auto w-full"
              />
              <figcaption className="px-4 py-3 text-xs leading-5 text-ink/65">
                {photo.caption}
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <a
            href={nightCruise.url}
            target="_blank"
            rel="noopener noreferrer"
            className="riri-button riri-button-gold min-h-12 px-5 py-3 text-sm"
          >
            <Instagram className="h-4 w-4" aria-hidden="true" />
            Instagramで投稿を見る
            <ExternalLink className="h-4 w-4" aria-hidden="true" />
          </a>
          <a href="#birthday" className="riri-button riri-button-soft min-h-12 px-5 py-3 text-sm">
            誕生日ディナーの思い出も見る
          </a>
          <a
            href="#gallery"
            className="inline-flex min-h-12 items-center justify-center gap-2 border border-rosefog/40 bg-porcelain px-5 py-3 text-sm font-bold text-ink transition hover:border-champagne hover:bg-white"
          >
            <Sparkles className="h-4 w-4 text-champagne" aria-hidden="true" />
            フォトギャラリーへ
          </a>
        </div>
      </div>
    </section>
  );
}
