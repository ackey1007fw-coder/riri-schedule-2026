import { news as archivedNews, type NewsItem } from "./news";

export type { NewsItem };

export const news: NewsItem[] = [
  {
    date: "2026.9.4",
    label: "X",
    text: "「おはよう華金だね☀️」公園の石畳でしゃがみ、花柄のウェアを着た愛犬を抱きかかえる1枚",
    url: "https://x.com/frecam2025_0306/status/2095626890396786873"
  },
  ...archivedNews
];
