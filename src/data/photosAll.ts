import { galleryPhotos as archivedPhotos, type GalleryPhoto } from "./photos";

export type { GalleryPhoto };
export { galleryFeatures } from "./photos";

const hanakinKaluaPhoto: GalleryPhoto = {
  src: "/images/gallery/g133.jpg",
  alt: "公園の石畳でしゃがみ込み、黒いトップスにデニム姿で笑う夏凪里季さん。花柄のフリルウェアを着た愛犬カルアちゃんを抱きかかえている（X『おはよう華金だね』より）"
};

export const galleryPhotos: GalleryPhoto[] = [hanakinKaluaPhoto, ...archivedPhotos];

export const galleryUpdate: {
  date: string;
  platform: "X" | "Instagram" | "TikTok";
  note: string;
  url: string;
} = {
  date: "2026.9.4",
  platform: "X",
  note: "おはよう華金。公園で愛犬カルアちゃんと一緒の1枚",
  url: "https://x.com/frecam2025_0306/status/2095626890396786873"
};
