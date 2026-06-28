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
    text: "吉井優花子さんの応援スケジュールサイトを公開しました",
    url: "https://yukako-schedule-2026.vercel.app/"
  },
  {
    date: "2026.6",
    label: "X",
    text: "#ゆかJET 全キャスト確定＆当日物販情報が発表されました",
    url: "https://x.com/yukako_produce/status/2070830869070377393"
  },
  {
    date: "2026.6",
    label: "X",
    text: "#ゆかJET 舞台情報が解禁されました（7/23〜27 Air studio 両国）",
    url: "https://x.com/yukako_produce/status/2070122985265197380"
  }
];
