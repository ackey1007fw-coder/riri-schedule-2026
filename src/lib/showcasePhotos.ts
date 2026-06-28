import { galleryPhotos, type GalleryPhoto } from "../data/photos";

export const showcasePhotos: GalleryPhoto[] = galleryPhotos.filter(
  (photo) => photo.src.startsWith("/images/yukako-")
);

// Fisher-Yates シャッフル（呼び出しごとに新しい順序。ブラウザでページを開くたびに変わる）
export function shuffle<T>(items: readonly T[]): T[] {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// ショーケース用にランダムでn枚（重複なし）選ぶ
export function pickShowcasePhotos(n: number): GalleryPhoto[] {
  return shuffle(showcasePhotos).slice(0, n);
}
