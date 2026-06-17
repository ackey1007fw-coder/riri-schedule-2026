// トップのお知らせバーに出す更新情報（新しいものを先頭に追加）
export type NewsItem = {
  date: string; // 表示用 例: "2026.6.16"
  label: string; // 出どころ 例: "X" / "Instagram" / "お知らせ"
  text: string;
  url: string;
};

export const news: NewsItem[] = [
  {
    date: "2026.6.16",
    label: "X",
    text: "7/19 小峰萌楓ちゃんと合同生誕祭！20歳＆23歳のお祝い・予約受付中",
    url: "https://x.com/frecam2025_0306/status/2067054398493343769"
  }
];
