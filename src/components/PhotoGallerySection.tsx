import { useCallback, useEffect, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Images,
  Instagram,
  Pause,
  Play,
  Sparkles,
  X
} from "lucide-react";
import { galleryPhotos, galleryUpdate } from "../data/photos";
import { getResponsiveImageProps } from "../lib/responsiveImage";
import { SectionHeader } from "./SectionHeader";

const wrapIndex = (index: number) =>
  (index + galleryPhotos.length) % galleryPhotos.length;

export function PhotoGallerySection() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const selectedPhoto =
    selectedIndex === null ? null : galleryPhotos[selectedIndex];

  const openPhoto = (index: number) => {
    setSelectedIndex(index);
    setIsPlaying(true);
  };

  const closePhoto = useCallback(() => {
    setSelectedIndex(null);
    setIsPlaying(false);
  }, []);

  const showPrevious = useCallback(() => {
    setSelectedIndex((current) =>
      current === null ? current : wrapIndex(current - 1),
    );
  }, []);

  const showNext = useCallback(() => {
    setSelectedIndex((current) =>
      current === null ? current : wrapIndex(current + 1),
    );
  }, []);

  useEffect(() => {
    if (selectedIndex === null) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closePhoto();
      if (event.key === "ArrowLeft") showPrevious();
      if (event.key === "ArrowRight") showNext();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [closePhoto, selectedIndex, showNext, showPrevious]);

  useEffect(() => {
    if (selectedIndex === null || !isPlaying) return;

    const timer = window.setInterval(showNext, 3800);
    return () => window.clearInterval(timer);
  }, [isPlaying, selectedIndex, showNext]);

  useEffect(() => {
    document.body.style.overflow = selectedIndex === null ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedIndex]);

  return (
    <section id="gallery" className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
          <SectionHeader
            kicker="Photo Gallery"
            title="写真で見る Riri"
            copy="舞台に立つ姿から、配信や日常のふとした表情まで。里季ちゃんのいろんな瞬間をどうぞ。"
          />
          <div className="flex flex-col gap-3 border-y border-champagne/30 py-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3 text-sm font-bold text-ink/70">
              <Images className="h-5 w-5 text-champagne" aria-hidden="true" />
              <span>Photo Selection・{galleryPhotos.length}枚</span>
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

        <a
          href={galleryUpdate.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 flex items-center gap-3 border border-champagne/40 bg-white px-4 py-3 text-sm font-bold text-ink transition hover:border-champagne hover:bg-porcelain"
        >
          <span className="grid h-9 w-9 shrink-0 place-items-center border border-champagne/50 bg-porcelain text-champagne">
            <Instagram className="h-4 w-4" aria-hidden="true" />
          </span>
          <span className="min-w-0">
            <span className="block text-[11px] font-black uppercase tracking-wide text-champagne">
              New ・ {galleryUpdate.date}
            </span>
            <span className="block leading-snug">
              {galleryUpdate.note} — Instagramで見る
            </span>
          </span>
        </a>

        <div className="mt-6 columns-2 gap-4 sm:columns-3 lg:columns-4 [&>figure]:mb-4 [&>figure]:break-inside-avoid">
          {galleryPhotos.map((photo, index) => (
            <figure
              key={photo.src}
              className="overflow-hidden border border-rosefog/15 bg-porcelain shadow-sm transition hover:shadow-paper"
            >
              <button
                type="button"
                onClick={() => openPhoto(index)}
                className="group block w-full text-left"
                aria-label={`${photo.alt}を大きく表示`}
              >
                <img
                  {...getResponsiveImageProps(
                    photo.src,
                    "(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw",
                  )}
                  alt={photo.alt}
                  loading="lazy"
                  className="block w-full transition duration-500 group-hover:scale-[1.02]"
                />
              </button>
            </figure>
          ))}
        </div>
      </div>

      {selectedPhoto && selectedIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-ink/95 px-3 py-4 text-white sm:px-6"
          role="dialog"
          aria-modal="true"
          aria-label="写真スライドショー"
        >
          <div className="mx-auto flex h-full max-w-6xl flex-col">
            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-champagne">
                  Riri Photo
                </p>
                <p className="truncate text-sm font-semibold text-white/75">
                  {selectedPhoto.alt}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsPlaying((current) => !current)}
                  className="grid min-h-12 min-w-12 place-items-center border border-white/15 bg-white/10 text-white transition hover:bg-white/20"
                  aria-label={isPlaying ? "自動再生を止める" : "自動再生する"}
                >
                  {isPlaying ? (
                    <Pause className="h-5 w-5" aria-hidden="true" />
                  ) : (
                    <Play className="h-5 w-5" aria-hidden="true" />
                  )}
                </button>
                <button
                  type="button"
                  onClick={closePhoto}
                  className="grid min-h-12 min-w-12 place-items-center border border-white/15 bg-white/10 text-white transition hover:bg-white/20"
                  aria-label="閉じる"
                >
                  <X className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
            </div>

            <div className="relative mt-4 grid min-h-0 flex-1 place-items-center">
              <button
                type="button"
                onClick={showPrevious}
                className="absolute left-0 z-10 grid min-h-12 min-w-12 place-items-center border border-white/15 bg-ink/70 text-white transition hover:bg-ink sm:left-4"
                aria-label="前の写真"
              >
                <ChevronLeft className="h-6 w-6" aria-hidden="true" />
              </button>
              <img
                {...getResponsiveImageProps(selectedPhoto.src, "100vw")}
                alt={selectedPhoto.alt}
                className="max-h-[74vh] w-auto max-w-full object-contain shadow-paper"
              />
              <button
                type="button"
                onClick={showNext}
                className="absolute right-0 z-10 grid min-h-12 min-w-12 place-items-center border border-white/15 bg-ink/70 text-white transition hover:bg-ink sm:right-4"
                aria-label="次の写真"
              >
                <ChevronRight className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>

            <div className="mt-4 flex items-center justify-between gap-4 text-xs font-bold uppercase tracking-[0.18em] text-white/70">
              <span>
                {selectedIndex + 1} / {galleryPhotos.length}
              </span>
              <span>{isPlaying ? "Auto Play" : "Paused"}</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
