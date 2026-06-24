// トップのお知らせバーに出す更新情報（新しいものを先頭に追加）
export type NewsItem = {
  date: string; // 表示用 例: "2026.6.16"
  label: string; // 出どころ 例: "X" / "Instagram" / "お知らせ"
  text: string;
  url: string;
};

export const news: NewsItem[] = [
  {
    date: "2026.6.24",
    label: "X",
    text: "「ハタチになりました㊗️🎂✨️」振袖姿で20歳の記念ポートレート🎉",
    url: "https://x.com/frecam2025_0306/status/2069622787602538770"
  },
  {
    date: "2026.6.23",
    label: "Instagram",
    text: "「10代最後の日🌟思い出ありすぎて選びきれなかった📸」18枚＋動画の思い出ポスト",
    url: "https://www.instagram.com/p/DZ7SS2gCTv_/"
  },
  {
    date: "2026.6.23",
    label: "TikTok",
    text: "「19歳最後の日」BGMは『真夏の果実（cover）』、20歳前日のショート動画",
    url: "https://vt.tiktok.com/ZSCdDkd6K/"
  },
  {
    date: "2026.6.23",
    label: "X",
    text: "「今日まではノンアルだよ🍸」20歳前日のセルフィー",
    url: "https://x.com/frecam2025_0306/status/2069259662399357205"
  },
  {
    date: "2026.6.21",
    label: "けいかさんのX",
    text: "一日店長イベントを「夏凪チェキスタッフ」としてお手伝い🍛",
    url: "https://x.com/keika_1110/status/2068738405291483258"
  },
  {
    date: "2026.6.22",
    label: "X",
    text: "「1年ぶりくらいにネイルした💅🎶」久しぶりのネイルを見せるセルフィー",
    url: "https://x.com/frecam2025_0306/status/2068981048361595335"
  },
  {
    date: "2026.6.21",
    label: "X",
    text: "「今日の夏凪☀️🍉🌻🏊」夏コーデのセルフィー",
    url: "https://x.com/frecam2025_0306/status/2068651822282408298"
  },
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
