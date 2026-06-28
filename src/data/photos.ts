export type GalleryPhoto = {
  src: string;
  alt: string;
};

export const galleryPhotos: GalleryPhoto[] = [];

export const galleryUpdate: {
  date: string;
  platform: "X" | "Instagram" | "TikTok";
  note: string;
  url: string;
} = {
  date: "2026.6",
  platform: "X",
  note: "#ゆかJET 舞台情報解禁",
  url: "https://x.com/yukako_produce/status/2070122985265197380"
};
