import { galleryPhotos, type GalleryPhoto } from "../data/photos";

// ショーケース（スライドショー・マガジン・Riri Mood）でランダム表示する写真プール。
// 人物が主役でない写真（店頭・モニター・PC・トレーなど）は見栄えのため除外する。
const EXCLUDED_SRC = new Set<string>([
  "/images/gallery/g26.jpg", // レストラン店頭
  "/images/gallery/g42.jpg", // コンテストのモニター
  "/images/gallery/g46.jpg", // 撮影データ選びのノートPC
  "/images/gallery/g56.jpg" // スタバの新作トレー
]);

export const showcasePhotos: GalleryPhoto[] = galleryPhotos.filter(
  (photo) => !EXCLUDED_SRC.has(photo.src)
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
