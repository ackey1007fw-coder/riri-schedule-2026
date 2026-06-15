// これまでの歩み（ハイライト）データ
// ルール（AGENTS.md）:
// - 未確認情報は書かない。確定できた事実だけを追加する。
// - 画像は public/images/ に自己ホスト（例: /images/highlight-xxx.jpg）。Drive直リンク禁止。
// - 新規追加テンプレート:
//   {
//     id: "一意なslug",
//     year: "2024",                 // 並び替え用の年
//     date: "2024年◯月",            // 画面表示用（年だけでも可）
//     category: "受賞",             // 受賞 / メディア / 舞台 / イベント / 配信 など
//     title: "タイトル",
//     description: "確認できた事実のみ",
//     image: "/images/highlight-xxx.jpg", // 任意・自己ホスト
//     link: { label: "リンク名", url: "https://..." } // 任意
//   }

export type Highlight = {
  id: string;
  year: string;
  date: string;
  category: string;
  title: string;
  description: string;
  image?: string;
  link?: { label: string; url: string };
};

export const highlights: Highlight[] = [
  {
    id: "frecam-2025-award",
    year: "2025",
    date: "2025年",
    category: "受賞",
    title: "フレキャン2025 審査員特別賞",
    description:
      "FRESH CAMPUS CONTEST 2025（Entry No.306）に出場し、審査員特別賞を受賞しました。",
    link: { label: "FRECページ", url: "https://2025.frecam.jp/entry/306" }
  },
  {
    id: "modelpress-2025-09",
    year: "2025",
    date: "2025年9月",
    category: "メディア",
    title: "モデルプレス掲載",
    description:
      "「注目の“日本一可愛い新入生”候補」として、フレキャン2025特集のインタビューに登場しました。",
    link: { label: "モデルプレスで読む", url: "https://mdpr.jp/news/detail/4646978" }
  },
  {
    id: "adidas-cm-2025-03",
    year: "2025",
    date: "2025年3月",
    category: "CM",
    title: "adidas CM",
    description:
      "adidas のCMに出演。SNSなどさまざまな広告で使用されました。",
  },
  {
    id: "googlepixel-au-cm-2025-02",
    year: "2025",
    date: "2025年2月",
    category: "CM",
    title: "Google Pixel／au「ニッポンもしも写真部 東京篇」CM",
    description:
      "Google Pixel × au のCM「ニッポンもしも写真部 東京篇」に、スタンドインとして参加しました。",
  },
  {
    id: "comdot-haikei-mv-2024-05",
    year: "2024",
    date: "2024年5月",
    category: "MV",
    title: "コムドット『拝啓、俺たちへ』MV",
    description:
      "コムドットの1st single『拝啓、俺たちへ』のMV制作に参加しました。",
  },
  {
    id: "meiyo-hope-mv-2024-04",
    year: "2024",
    date: "2024年4月",
    category: "MV",
    title: "meiyo『HOPE!HOPE!HOPE!』MV",
    description:
      "meiyo の新曲MV『HOPE!HOPE!HOPE!』に出演。クレジットにも名前が掲載されました。",
  },
  {
    id: "hotpepper-beauty-cm-2024-02",
    year: "2024",
    date: "2024年2月",
    category: "CM",
    title: "ホットペッパービューティー「学割」新CM",
    description:
      "ホットペッパービューティー「学割」の新CM（情報篇・クーポン篇の2種類）に出演しました。",
  },
  {
    id: "bakasemaishi-2023-11",
    year: "2023",
    date: "2023年11月",
    category: "バラエティ",
    title: "フジテレビ『私のバカせまい史』",
    description:
      "フジテレビのバラエティ番組『私のバカせまい史』にVTR出演。靴下についてのテーマで登場しました。",
  },
  {
    id: "tokyo-calling-mv-2023-11",
    year: "2023",
    date: "2023年11月",
    category: "MV",
    title: "新しい学校のリーダーズ『Tokyo Calling』MV",
    description:
      "新しい学校のリーダーズの新曲MVに、猫カフェの店員役として出演。クレジットにも名前が掲載されました。",
  },
  {
    id: "fishers-100vs100-2023-10",
    year: "2023",
    date: "2023年10月",
    category: "企画",
    title: "フィッシャーズ「100人VS100人 野球対決」",
    description:
      "人気YouTuberフィッシャーズの大型企画に、赤チームとして参加しました。",
  },
  {
    id: "blackfamilia-2023-10",
    year: "2023",
    date: "2023年10月",
    category: "ドラマ",
    title: "日本テレビ系『ブラックファミリア〜新堂家の復讐〜』",
    description:
      "2023年10月5日放送開始の日本テレビ系深夜ドラマに出演しました。",
  },
  {
    id: "himitsu-shonen-2023-10",
    year: "2023",
    date: "2023年10月",
    category: "ドラマ",
    title: "日本テレビ 金曜ドラマDEEP『秘密を持った少年たち』",
    description:
      "毎週金曜放送の金曜ドラマDEEP『秘密を持った少年たち』に出演しました。",
  },
  {
    id: "kimito-koi-drama-2023-10",
    year: "2023",
    date: "2023年10月",
    category: "ドラマ",
    title: "MBS深夜ドラマ『君となら恋をしてみても』",
    description:
      "2023年10月5日放送スタートのMBS深夜ドラマに出演。TVerなどでも配信されました。",
  },
  {
    id: "natsutodoroki-2023-09",
    year: "2023",
    date: "2023年9月",
    category: "朗読劇",
    title: "朗読LIVE公演『夏轟』",
    description:
      "Aznet Produce の朗読LIVE公演（2023年9月2日）に出演。浴衣チェキや配信アーカイブも販売されました。",
  },
  {
    id: "realizesummer-2023-08",
    year: "2023",
    date: "2023年8月",
    category: "舞台",
    title: "舞台『リアライズサマー』",
    description:
      "2023年8月上演の『リアライズサマー』にアンダー役として出演。終始笑顔の絶えない2日間の公演でした。",
  }
];
