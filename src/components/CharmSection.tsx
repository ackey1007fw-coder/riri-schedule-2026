import { charmPhotos, charmPoints } from "../data/charms";
import { getResponsiveImageProps } from "../lib/responsiveImage";

export function CharmSection() {
  return (
    <section className="bg-[linear-gradient(180deg,#fffafc,#fff4f8_55%,#ffffff)] px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div>
            <p className="mb-4 inline-flex border border-champagne/45 bg-white/70 px-3 py-2 text-xs font-bold uppercase tracking-[0.18em] text-champagne backdrop-blur">
              Riri Mood
            </p>
            <h2 className="font-display text-4xl leading-[1.15] text-ink sm:text-5xl">
              笑顔の奥に、
              <br className="hidden sm:block" />
              まっすぐな芯。
            </h2>
            <p className="mt-6 max-w-xl leading-8 text-ink/68">
              ふっと安心するやわらかさと、舞台へ向かう芯の強さ。
              里季ちゃんの空気がそのまま伝わる一枚たちです。
            </p>
          </div>

          <div className="grid grid-cols-3 items-start gap-3 sm:gap-4">
            {charmPhotos.map((photo) => (
              <figure
                key={photo.src}
                className="border border-white bg-white p-1.5 shadow-sm"
              >
                <img
                  {...getResponsiveImageProps(
                    photo.src,
                    "(min-width: 1024px) 22vw, 33vw",
                  )}
                  alt={photo.alt}
                  loading="lazy"
                  className="block w-full"
                />
              </figure>
            ))}
          </div>
        </div>

        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {charmPoints.map((point) => (
            <article
              key={point.title}
              className="border-t-2 border-champagne/50 bg-white/70 p-6 backdrop-blur transition hover:bg-white"
            >
              <span className="text-[11px] font-black uppercase tracking-[0.18em] text-champagne">
                {point.label}
              </span>
              <h3 className="mt-3 font-display text-2xl leading-tight text-ink">
                {point.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-ink/66">{point.copy}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
