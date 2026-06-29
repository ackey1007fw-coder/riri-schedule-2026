import { useState } from "react";
import { ChevronDown, ChevronUp, Crown } from "lucide-react";
import { profile } from "../data/profile";
import { Photo } from "./Photo";

const fallbackVisuals = profile.gallery.slice(0, 8).map((image, index) => ({
  name:
    [
      "舞台のまなざし",
      "表現する姿",
      "ポートレート",
      "受賞の記録",
      "全国公演",
      "クルーズの夜",
      "キャプテン",
      "Baby Shark Live"
    ][index] ?? `応援ビジュアル ${index + 1}`,
  image,
  featured: index === 0
}));

export function AvatarGallery() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [showAll, setShowAll] = useState(false);
  const initialCount = 8;
  const items =
    profile.avatars.length > 0
      ? profile.avatars
      : fallbackVisuals;
  const visibleAvatars = showAll
    ? items
    : items.slice(0, initialCount);
  const isAvatarMode = profile.avatars.length > 0;

  const animateAvatar = (index: number) => {
    setActiveIndex(null);
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => setActiveIndex(index));
    });
  };

  return (
    <div>
      <div className="mb-5 flex items-end justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase text-champagne">Avatar Gallery</p>
          <h3 className="mt-1 font-display text-3xl text-ink">
            {isAvatarMode ? "SHOWROOMアバター" : "応援ビジュアル"}
          </h3>
          {!isAvatarMode && (
            <p className="mt-2 text-sm leading-6 text-ink/60">
              SHOWROOMアバター画像は許可素材が入り次第追加。今は自己ホスト済み写真から、雰囲気が伝わるビジュアルを並べています。
            </p>
          )}
        </div>
        <span className="border border-rosefog/30 bg-white px-3 py-2 text-xs font-bold text-ink/62">
          {items.length}枚
        </span>
      </div>

      <div
        id="avatar-gallery-list"
        className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4"
      >
        {visibleAvatars.map((avatar, index) => (
          <button
            type="button"
            key={avatar.name}
            onClick={() => animateAvatar(index)}
            onAnimationEnd={() => setActiveIndex(null)}
            aria-label={
              isAvatarMode
                ? `${avatar.name}を動かす`
                : `${avatar.name}を大きく意識した写真を見る`
            }
            className={`avatar-card yukako-card group relative overflow-hidden bg-white p-3 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-champagne ${
              avatar.featured ? "border-champagne/70" : "border-rosefog/25"
            } ${activeIndex === index ? "avatar-card-active" : ""}`}
          >
            <div className={activeIndex === index ? "avatar-character-active" : ""}>
              <Photo
                src={avatar.image}
                alt={avatar.name}
                className="aspect-square border border-rosefog/15"
                imageClassName={isAvatarMode ? "object-contain p-4" : "object-cover object-top"}
                loading={index < 4 ? "eager" : "lazy"}
              />
            </div>
            <div className="mt-3 flex min-h-10 items-center justify-between gap-2">
              <p className="text-sm font-bold leading-5 text-ink">{avatar.name}</p>
              {avatar.featured && (
                <Crown className="h-4 w-4 shrink-0 text-champagne" aria-hidden="true" />
              )}
            </div>
          </button>
        ))}
      </div>

      {items.length > initialCount && (
        <div className="mt-6 flex justify-center">
          <button
            type="button"
            onClick={() => setShowAll((current) => !current)}
            className="yukako-button yukako-button-soft min-h-12 px-5 py-3 text-sm"
            aria-expanded={showAll}
            aria-controls="avatar-gallery-list"
          >
            {showAll ? (
              <ChevronUp className="h-4 w-4 text-champagne" aria-hidden="true" />
            ) : (
              <ChevronDown className="h-4 w-4 text-champagne" aria-hidden="true" />
            )}
            {showAll
              ? "アバターをコンパクトに戻す"
              : `残り${items.length - initialCount}${isAvatarMode ? "種" : "枚"}も見る`}
          </button>
        </div>
      )}
    </div>
  );
}
