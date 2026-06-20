// トップのお知らせバーに出す更新情報（新しいものを先頭に追加）
export type NewsItem = {
  date: string; // 表示用 例: "2026.6.16"
  label: string; // 出どころ 例: "X" / "Instagram" / "お知らせ"
  text: string;
  url: string;
};

export const news: NewsItem[] = [
  {
    date: "2026.6.20",
    label: "X",
    text: "「JRさん頑張りすぎてない⁉️」過剰謝罪にゆるっとツッコミ",
    url: "https://x.com/frecam2025_0306/status/2068251058242240805"
  },
  {
    date: "2026.6.19",
    label: "X",
    text: "「麻辣湯に野菜は要らない🥬」笑顔のセルフィー",
    url: "https://x.com/frecam2025_0306/status/2067775746735820830"
  },
  {
    date: "2026.6.18",
    label: "Instagram",
    text: "新宿「レストラン アカシア」でロールキャベツシチュー",
    url: "https://www.instagram.com/p/DZuYXoLiZ2z/"
  },
  {
    date: "2026.6.16",
    label: "X",
    text: "7/19 小峰萌楓ちゃんと合同生誕祭！20歳＆23歳のお祝い・予約受付中",
    url: "https://x.com/frecam2025_0306/status/2067054398493343769"
  }
];
