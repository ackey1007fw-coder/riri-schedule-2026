import { Images, Sparkles } from "lucide-react";
import { galleryPhotos } from "../data/photos";
import { SectionHeader } from "./SectionHeader";

export function PhotoGallerySection() {
  return (
    <section id="gallery" className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
          <SectionHeader
            kicker="Photo Gallery"
            title="写真で見る Riri"
            copy="舞台、配信、日々の一枚。写真はそのまま、たっぷりの枚数でいろんな表情を楽しめます。"
          />
          <div className="flex flex-col gap-3 border-y border-champagne/30 py-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3 text-sm font-bold text-ink/70">
              <Images className="h-5 w-5 text-champagne" aria-hidden="true" />
              <span>Photo Selection（{galleryPhotos.length}枚）</span>
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

        <div className="mt-10 columns-2 gap-4 sm:columns-3 lg:columns-4 [&>figure]:mb-4 [&>figure]:break-inside-avoid">
          {galleryPhotos.map((photo) => (
            <figure
              key={photo.src}
              className="overflow-hidden border border-rosefog/15 bg-porcelain shadow-sm transition hover:shadow-paper"
            >
              <img
                src={photo.src}
                alt={photo.alt}
                loading="lazy"
                className="w-full transition duration-500 hover:scale-[1.02]"
              />
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
