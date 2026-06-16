import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { galleryPhotos } from "../data/photos";

// トップ付近の自動送りスライドショー。
// 開いた時点で自動再生され、写真はトリミングせず全体表示（object-contain）。
const AUTO_MS = 4200;

export function Slideshow() {
  const count = galleryPhotos.length;
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);

  const go = useCallback(
    (delta: number) => setIndex((current) => (current + delta + count) % count),
    [count],
  );

  useEffect(() => {
    if (!playing || count <= 1) return;
    const reduceMotion = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduceMotion) return;

    const timer = window.setInterval(
      () => setIndex((current) => (current + 1) % count),
      AUTO_MS,
    );
    return () => window.clearInterval(timer);
  }, [playing, count]);

  if (count === 0) return null;

  const photo = galleryPhotos[index];

  return (
    <section
      aria-label="写真スライドショー"
      className="border-y border-rosefog/15 bg-porcelain py-6 sm:py-8"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-3 flex items-center justify-between gap-3">
          <p className="text-[11px] font-black uppercase tracking-[0.2em] text-champagne">
            Snapshots
          </p>
          <div className="flex items-center gap-3 text-xs font-bold text-ink/55">
            <span>
              {index + 1} / {count}
            </span>
            <button
              type="button"
              onClick={() => setPlaying((current) => !current)}
              className="grid h-9 w-9 place-items-center border border-rosefog/30 bg-white text-champagne transition hover:border-champagne"
              aria-label={playing ? "自動再生を止める" : "自動再生する"}
            >
              {playing ? (
                <Pause className="h-4 w-4" aria-hidden="true" />
              ) : (
                <Play className="h-4 w-4" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        <div className="relative grid h-[56vh] place-items-center overflow-hidden border border-white bg-white sm:h-[64vh]">
          <img
            key={index}
            src={photo.src}
            alt={photo.alt}
            loading="lazy"
            className="max-h-full w-auto max-w-full object-contain"
            style={{ animation: "riri-fade 600ms ease" }}
          />

          <button
            type="button"
            onClick={() => go(-1)}
            className="absolute left-2 grid h-11 w-11 place-items-center border border-rosefog/30 bg-white/85 text-ink backdrop-blur transition hover:bg-white sm:left-4"
            aria-label="前の写真"
          >
            <ChevronLeft className="h-5 w-5" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            className="absolute right-2 grid h-11 w-11 place-items-center border border-rosefog/30 bg-white/85 text-ink backdrop-blur transition hover:bg-white sm:right-4"
            aria-label="次の写真"
          >
            <ChevronRight className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
}
