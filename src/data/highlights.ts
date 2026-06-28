export type Highlight = {
  id: string;
  year: string;
  date: string;
  category: string;
  title: string;
  description: string;
  image?: string;
  link?: { label: string; url: string };
  links?: { label: string; url: string }[];
};

export const highlights: Highlight[] = [
  {
    id: "yukajet-gojet-vol1-2026-07",
    year: "2026",
    date: "2026年7月",
    category: "舞台",
    title: "#ゆかJET『GO,JET!GO!GO! vol.1 Premium 〜 I LOVE YOU が言えなくて 〜』",
    description:
      "吉井優花子さんがプロデュースし、自身も出演する舞台公演。A/B/C班構成で、2026年7月23日〜27日にAir studio 両国で上演予定です。",
    links: [
      { label: "舞台情報解禁（X）", url: "https://x.com/yukako_produce/status/2070122985265197380" },
      { label: "全キャスト・物販情報（X）", url: "https://x.com/yukako_produce/status/2070830869070377393" }
    ]
  },
  {
    id: "babyshark-live-2025",
    year: "2025",
    date: "2025年〜",
    category: "舞台",
    title: "BABY SHARK LIVE! -The Hidden Treasure- 全国公演",
    description:
      "SHOWROOMプロフィールで紹介されている出演歴。ファミリーミュージカルのキャストとして、歌とダンスを届ける活動です。",
    image: "/images/yukako-babyshark-pirate.jpg"
  },
  {
    id: "mgj-2025-miss-peace",
    year: "2025",
    date: "2025年",
    category: "受賞",
    title: "Miss Grand Japan 2025 MISS PEACE賞",
    description:
      "Miss Grand Japan 2025でMISS PEACE賞を受賞。SHOWROOMプロフィールでは、2026年から代表補佐・運営マネジメントに就任したことも紹介されています。",
    image: "/images/yukako-cruise-captain.jpg"
  },
  {
    id: "miss-cosmo-japan-2024",
    year: "2024",
    date: "2024年8月",
    category: "受賞",
    title: "Miss Cosmo Japan 2024 TOP5ファイナリスト",
    description:
      "Wikipediaに掲載されている活動歴。国内最終選考で3位に選定され、配信で培った発信力を広げる機会になりました。"
  },
  {
    id: "akt-ambassador-2024",
    year: "2024",
    date: "2024年5月",
    category: "秋田",
    title: "AKT秋田テレビ アプリアンバサダー",
    description:
      "地元秋田とのつながりを活かした活動。秋田出身の表現者として、テレビやイベントにも活動の幅を広げています。"
  },
  {
    id: "tvk-weather-report-2023",
    year: "2023",
    date: "2023年4月〜9月",
    category: "TV",
    title: "テレビ神奈川『weather report』リポーター",
    description:
      "Wikipediaに掲載されている出演歴。配信だけでなく、テレビでの発信にも活動を広げました。"
  },
  {
    id: "akuma-no-namida-2022",
    year: "2022",
    date: "2022年12月",
    category: "舞台",
    title: "舞台『悪魔の涙』（舞台デビュー）",
    description:
      "東京へ活動拠点を移した後の初舞台。俳優として舞台活動を本格化していく転機になりました。"
  },
  {
    id: "miss-yukata-2021",
    year: "2021",
    date: "2021年",
    category: "受賞",
    title: "Sunny Side Project ミス浴衣コンテスト 準グランプリ",
    description:
      "秋田県で公務員として勤務していた時期に参加。準グランプリなどを受賞し、SHOWROOM配信を始めるきっかけになりました。"
  }
];
