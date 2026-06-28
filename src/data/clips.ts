export type VideoClip = {
  src: string;
  platform?: "TikTok" | "Instagram";
  title: string;
  caption: string;
  bgm?: string;
  date: string;
  url: string;
};

export const clips: VideoClip[] = [];
