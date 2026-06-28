export type NewsItem = {
  date: string;
  label: string;
  text: string;
  url: string;
};

export const news: NewsItem[] = [
  {
    date: "2026.6.30",
    label: "お知らせ",
    text: "吉井優花子さんの活動を追いかけるファンサイトを公開しました",
    url: "https://yukako-schedule-2026.vercel.app/"
  },
  {
    date: "2026.6",
    label: "X",
    text: "全キャスト確定＆当日物販情報が発表されました",
    url: "https://x.com/yukako_produce/status/2070830869070377393"
  }
];
