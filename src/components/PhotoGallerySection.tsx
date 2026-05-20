import { Images, Sparkles } from "lucide-react";
import { galleryPhotos } from "../data/photos";
import { Photo } from "./Photo";
import { SectionHeader } from "./SectionHeader";

const toneClass = {
  hero: "bg-champagne text-white",
  portrait: "bg-lavender text-ink",
  stage: "bg-ink text-white",
  casual: "bg-blush text-ink"
};

export function PhotoGallerySection() {
  const featuredPhoto = galleryPhotos.find((photo) => photo.featured) ?? galleryPhotos[0];
  const supportingPhotos = galleryPhotos.filter((photo) => photo !== featuredPhoto);

  return (
    <section id="gallery" className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
          <SectionHeader
            kicker="Photo Gallery"
            title="写真で見る Riri"
            copy="大きな写真と小さなカットを組み合わせて、出演情報の合間にも表情や雰囲気を楽しめるギャラリーです。"
          />
          <div className="flex flex-col gap-3 border-y border-champagne/30 py-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3 text-sm font-bold text-ink/70">
              <Images className="h-5 w-5 text-champagne" aria-hidden="true" />
              <span>Driveの写真から選んで差し替えできます</span>
            </div>
            <a
              href="#profile"
              className="inline-flex min-h-12 items-center justify-center gap-2 border border-rosefog/40 bg-porcelain px-5 py-3 text-sm font-bold text-ink transition hover:border-champagne hover:bg-white"
            >
              <Sparkles className="h-4 w-4 text-champagne" aria-hidden="true" />
              プロフィールへ
            </a>
          </div>
        </div>

        <div className="mt-8 grid gap-3 lg:grid-cols-[1.08fr_0.92fr]">
          <article className="group relative min-h-[520px] overflow-hidden border border-champagne/40 bg-porcelain shadow-paper sm:min-h-[620px]">
            <Photo
              src={featuredPhoto.src}
              alt={featuredPhoto.alt}
              className="absolute inset-0 h-full w-full"
              imageClassName="transition duration-500 group-hover:scale-[1.02]"
            />
            <div className="absolute inset-x-0 bottom-0 bg-[linear-gradient(180deg,transparent,rgba(49,42,46,0.78))] p-5 pt-28 text-white sm:p-7">
              <span className="inline-flex border border-white/50 bg-white/15 px-3 py-1 text-xs font-black uppercase backdrop-blur">
                {featuredPhoto.label}
              </span>
              <p className="mt-3 max-w-lg font-display text-3xl leading-tight sm:text-4xl">
                Riri Schedule 2026
              </p>
            </div>
          </article>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-2">
            {supportingPhotos.map((photo, index) => (
              <article
                key={photo.src}
                className={`group relative overflow-hidden border border-rosefog/20 bg-porcelain ${
                  index === 1 || index === 6 ? "row-span-2 min-h-[260px]" : "min-h-[170px]"
                }`}
              >
                <Photo
                  src={photo.src}
                  alt={photo.alt}
                  className="absolute inset-0 h-full w-full"
                  imageClassName="transition duration-500 group-hover:scale-[1.04]"
                />
                <div className="absolute left-3 top-3">
                  <span className={`inline-flex px-2.5 py-1 text-[11px] font-black uppercase shadow-sm ${toneClass[photo.tone]}`}>
                    {photo.label}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
