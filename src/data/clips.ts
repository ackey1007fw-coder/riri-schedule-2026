// TikTokなどのショート動画クリップ（自己ホスト・ミュート自動ループで表示）。
// ・新しいものを先頭に。配列が空ならセクションは非表示。
// ・src は public/videos/ 以下のパス。url は元の投稿（タップで本編へ）。
export type VideoClip = {
  src: string; // 例: "/videos/tiktok-2026-06-23.mp4"
  platform?: "TikTok" | "Instagram"; // 省略時は TikTok 扱い
  title: string; // 見出し
  caption: string; // ひとこと
  bgm?: string; // 使用BGM（クレジット表記用）
  date: string; // 表示用 例: "2026.6.23"
  url: string; // 元の投稿URL（タップで本編へ）
};

export const clips: VideoClip[] = [
  {
    src: "/videos/tiktok-2026-06-27.mp4",
    platform: "TikTok",
    title: "階段を登ったら、、、",
    caption: "愛犬カルアちゃんが階段の上からひょっこり。つぶらな瞳がたまらない🐶",
    date: "2026.6.27",
    url: "https://vt.tiktok.com/ZSCkNCo4k/"
  },
  {
    src: "/videos/tiktok-2026-06-26.mp4",
    platform: "TikTok",
    title: "可愛い子に吹いてる風はここから？",
    caption: "ピンクのパーカーで笑う夏凪里季さん。#06 #女子大生",
    date: "2026.6.26",
    url: "https://vt.tiktok.com/ZSCMCTCn4/"
  },
  {
    src: "/videos/tiktok-2026-06-25.mp4",
    platform: "TikTok",
    title: "疲れてるんならやめれば？",
    caption: "ピンクトップでアンニュイな表情のショート動画。#06 #女子大生 #aiko",
    bgm: "aiko",
    date: "2026.6.25",
    url: "https://vt.tiktok.com/ZSCYwExgF/"
  },
  {
    src: "/videos/instagram-2026-06-23.mp4",
    platform: "Instagram",
    title: "10代最後の日",
    caption: "「思い出ありすぎて選びきれなかった📸」インスタ投稿の動画より。",
    date: "2026.6.23",
    url: "https://www.instagram.com/p/DZ7SS2gCTv_/"
  },
  {
    src: "/videos/tiktok-2026-06-23.mp4",
    platform: "TikTok",
    title: "19歳最後の日",
    caption: "ハタチになる前日のショート動画。#19歳 #女子大生",
    bgm: "真夏の果実（cover）",
    date: "2026.6.23",
    url: "https://vt.tiktok.com/ZSCdDkd6K/"
  }
];
