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
      "吉井優花子プロデュース公演の第1弾。A/B/C班構成で、2026年7月23日〜27日にAir studio 両国にて上演。",
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
      "Pinkfongの人気キャラクターたちと歌って踊るファミリーミュージカル。シンガーとして全国各地の公演に出演中。",
    image: "/images/yukako-babyshark-pirate.jpg"
  },
  {
    id: "mgj-2025-miss-peace",
    year: "2025",
    date: "2025年9月",
    category: "受賞",
    title: "Miss Grand Japan 2025 MISS PEACE賞",
    description:
      "ミス・グランド・ジャパン2025にて、平和的活動を積極的に行ったファイナリストに贈られるMISS PEACE賞を受賞。大会はMSCベリッシマ号で開催。",
    image: "/images/yukako-cruise-captain.jpg"
  },
  {
    id: "miss-cosmo-japan-2024",
    year: "2024",
    date: "2024年8月",
    category: "受賞",
    title: "Miss Cosmo Japan 2024 TOP5ファイナリスト",
    description:
      "審査累計ポイントランキング1位を獲得してTOP5ファイナリストに選出。国内最終選考では3位に選定されました。"
  },
  {
    id: "akt-ambassador-2024",
    year: "2024",
    date: "2024年5月",
    category: "CM",
    title: "AKT秋田テレビ アプリアンバサダー",
    description:
      "AKT秋田テレビの公式アプリ「AKTアプリ」のアンバサダーに選出。地上波テレビCMやイベントに出演しました。"
  },
  {
    id: "tvk-weather-report-2023",
    year: "2023",
    date: "2023年4月〜9月",
    category: "TV",
    title: "テレビ神奈川『weather report』リポーター",
    description:
      "2023年4月10日〜9月30日放送のテレビ神奈川『weather report』にリポーターとして出演。夏のリポーター挑戦篇にも登場しました。"
  },
  {
    id: "akuma-no-namida-2022",
    year: "2022",
    date: "2022年12月",
    category: "舞台",
    title: "舞台『悪魔の涙』（舞台デビュー）",
    description:
      "プロジェクトアクト東京の第七回公演。2022年12月8日〜12日に平賀スクエアで上演。カラヤン組で諏訪桃子役を演じ、舞台俳優としてのキャリアをスタート。"
  },
  {
    id: "miss-yukata-2021",
    year: "2021",
    date: "2021年",
    category: "受賞",
    title: "Sunny Side Project ミス浴衣コンテスト 準グランプリ",
    description:
      "秋田で公務員として勤務中にエントリー。準グランプリとSHOWROOM賞を受賞し、SHOWROOMでの配信活動を開始するきっかけに。"
  }
];
