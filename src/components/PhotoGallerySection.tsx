import { useCallback, useEffect, useRef, useState } from "react";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Images,
  Instagram,
  MessageCircle,
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

function useSwipe(onLeft: () => void, onRight: () => void) {
  const startX = useRef(0);
  const startY = useRef(0);

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    startX.current = e.touches[0].clientX;
    startY.current = e.touches[0].clientY;
  }, []);

  const onTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      const dx = e.changedTouches[0].clientX - startX.current;
      const dy = e.changedTouches[0].clientY - startY.current;
      if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) {
        if (dx < 0) onLeft();
        else onRight();
      }
    },
    [onLeft, onRight],
  );

  return { onTouchStart, onTouchEnd };
}

export function PhotoGallerySection() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [loaded, setLoaded] = useState<Record<string, boolean>>({});
  const visiblePhotos = showAll ? galleryPhotos : galleryPhotos.slice(0, 12);

  const selectedPhoto =
    selectedIndex === null ? null : galleryPhotos[selectedIndex];
  const GalleryUpdateIcon =
    galleryUpdate.platform === "Instagram" ? Instagram : MessageCircle;

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

  const swipeHandlers = useSwipe(showNext, showPrevious);

  useEffect(() => {
    document.body.style.overflow = selectedIndex === null ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedIndex]);

  return (
    <section id="gallery" className="scroll-mt-24 bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
          <SectionHeader
            kicker="Photo Gallery"
            title="写真で見る Yukako"
            copy="舞台に立つ姿から、配信や日常のふとした表情まで。優花子さんのいろんな瞬間をどうぞ。"
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
          className="riri-lift mt-6 flex items-center gap-3 border border-champagne/40 bg-white px-4 py-3 text-sm font-bold text-ink hover:border-champagne hover:bg-porcelain"
        >
          <span className="grid h-9 w-9 shrink-0 place-items-center border border-champagne/50 bg-porcelain text-champagne">
            <GalleryUpdateIcon className="h-4 w-4" aria-hidden="true" />
          </span>
          <span className="min-w-0">
            <span className="block text-[11px] font-black uppercase tracking-wide text-champagne">
              New ・ {galleryUpdate.date}
            </span>
            <span className="block leading-snug">
              {galleryUpdate.note} — {galleryUpdate.platform}で見る
            </span>
          </span>
        </a>

        <div
          id="photo-selection"
          className="mt-6 columns-2 gap-4 sm:columns-3 lg:columns-4 [&>figure]:mb-4 [&>figure]:break-inside-avoid"
        >
          {visiblePhotos.map((photo, index) => (
            <figure
              key={photo.src}
              className={`photo-gallery-card riri-card overflow-hidden border-rosefog/15 bg-porcelain ${
                loaded[photo.src] ? "" : "riri-skeleton"
              }`}
            >
              <button
                type="button"
                onClick={() => openPhoto(index)}
                className="group block w-full text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-champagne"
                aria-label={`${photo.alt}を大きく表示`}
              >
                <img
                  {...getResponsiveImageProps(
                    photo.src,
                    "(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw",
                  )}
                  alt={photo.alt}
                  loading="lazy"
                  decoding="async"
                  onLoad={() =>
                    setLoaded((current) =>
                      current[photo.src] ? current : { ...current, [photo.src]: true },
                    )
                  }
                  className="photo-gallery-image block w-full"
                />
              </button>
            </figure>
          ))}
        </div>
        {galleryPhotos.length > 12 && (
          <div className="mt-7 flex justify-center">
            <button
              type="button"
              onClick={() => setShowAll((current) => !current)}
              className="riri-button riri-button-soft min-h-12 px-5 py-3 text-sm"
              aria-expanded={showAll}
              aria-controls="photo-selection"
            >
              {showAll ? (
                <ChevronUp className="h-4 w-4 text-champagne" aria-hidden="true" />
              ) : (
                <ChevronDown className="h-4 w-4 text-champagne" aria-hidden="true" />
              )}
              {showAll
                ? "写真をコンパクトに戻す"
                : `残り${galleryPhotos.length - 12}枚も見る`}
            </button>
          </div>
        )}
      </div>

      {selectedPhoto && selectedIndex !== null && (
        <div
          className="fixed inset-0 z-[999] h-[100dvh] overscroll-contain bg-ink px-3 py-4 text-white sm:px-6"
          role="dialog"
          aria-modal="true"
          aria-label="写真スライドショー"
        >
          <div className="mx-auto flex h-full max-w-6xl flex-col">
            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-champagne">
                  Yukako Photo
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

            <div
              className="relative mt-4 grid min-h-0 flex-1 place-items-center"
              onTouchStart={swipeHandlers.onTouchStart}
              onTouchEnd={swipeHandlers.onTouchEnd}
            >
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
