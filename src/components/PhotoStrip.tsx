import { galleryPhotos } from "../data/photos";

// トップ付近の横スクロール写真ストリップ。
// 各写真は高さを揃えて全体表示（トリミングなし）。
export function PhotoStrip() {
  return (
    <section className="border-y border-rosefog/15 bg-porcelain py-6">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="mb-3 text-[11px] font-black uppercase tracking-[0.2em] text-champagne">
          Snapshots
        </p>
        <div className="flex snap-x gap-3 overflow-x-auto pb-2 [scrollbar-width:thin]">
          {galleryPhotos.map((photo) => (
            <img
              key={photo.src}
              src={photo.src}
              alt={photo.alt}
              loading="lazy"
              className="h-52 w-auto shrink-0 snap-start border border-white bg-white object-contain shadow-sm sm:h-64"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
