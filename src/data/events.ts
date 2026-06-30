import type { ScheduleEvent } from "../types";

export const events: ScheduleEvent[] = [
  {
    id: "yukajet-gojet-2026-07",
    title: "GO,JET!GO!GO! vol.1 Premium 〜 I LOVE YOU が言えなくて 〜",
    shortTitle: "#ゆかJET",
    category: "stage",
    startAt: "2026-07-23T18:30:00+09:00",
    endAt: "2026-07-27T17:00:00+09:00",
    dates: [
      "2026-07-23",
      "2026-07-24",
      "2026-07-25",
      "2026-07-26",
      "2026-07-27"
    ],
    displayDate: "2026年7月23日（木）〜27日（月）",
    venue: "Air studio 両国（東京都墨田区両国2-18-7 地下1階）",
    image: "/images/yukako-gojet-poster.jpg",
    summary:
      "吉井優花子プロデュース公演 #ゆかJET 第1弾。BAR SAMASAMA を舞台に、歌って踊る幽霊 GO,JET! GIRLS が繰り広げる歌ダンス満載のコメディ。A/B/C 3班＋7/27は全班合同LIVE。吉井優花子は B班JET・C班早紀を演じ、プロデュース・脚色・楽曲・デザインも担当。チケット予約受付中（ご来場 一般4,700円／特典付き前方席6,000円・配信アーカイブ3,700円）。",
    badges: ["舞台", "プロデュース公演", "予約受付中", "配信あり", "7/23〜27"],
    links: [
      {
        label: "🎫 チケット予約・応援（公式予約サイト）",
        url: "https://premiumgoyukajet.hp.peraichi.com",
        kind: "ticket"
      },
      {
        label: "ご予約開始のお知らせ（吉井優花子 X）",
        url: "https://x.com/mokoopy/status/2071929182762778985",
        kind: "info"
      },
      {
        label: "全キャスト・タイムテーブル（公式 X）",
        url: "https://x.com/yukako_produce/status/2071913699020075096",
        kind: "info"
      }
    ],
    isImportant: true
  },
  {
    id: "ryoma-kun-2026-04",
    title: "かわええのう、龍馬くん",
    shortTitle: "龍馬くん",
    category: "stage",
    startAt: "2026-04-07T18:00:00+09:00",
    endAt: "2026-04-12T18:00:00+09:00",
    displayDate: "2026年4月7日〜12日",
    venue: "A-root赤坂",
    image: "",
    summary:
      "B班で坂本龍馬役、C班でおりょう役の二役を演じ、アソシエイトプロデューサーも務めた話題作。",
    badges: ["舞台", "二役", "プロデュース関与"],
    links: []
  },
  {
    id: "littlebraver-tasogare-2025-12",
    title: "演劇ユニットリトルブレイバー Vol.30『黄昏歌のカルーセル』",
    shortTitle: "黄昏歌のカルーセル",
    category: "stage",
    startAt: "2025-12-17T18:00:00+09:00",
    endAt: "2025-12-21T18:00:00+09:00",
    displayDate: "2025年12月17日〜21日",
    venue: "荻窪小劇場",
    image: "",
    summary: "花チームに参加。",
    badges: ["舞台"],
    links: []
  },
  {
    id: "mgj-2025-miss-peace",
    title: "Miss Grand Japan 2025（MISS PEACE賞 受賞）",
    shortTitle: "MGJ 2025",
    category: "event",
    startAt: "2025-09-01T12:00:00+09:00",
    displayDate: "2025年9月",
    venue: "MSCベリッシマ号",
    image: "/images/yukako-mgj-award.jpg",
    summary:
      "平和的活動を積極的に行ったファイナリストに贈られるMISS PEACE賞を受賞。",
    badges: ["受賞", "ミスコン"],
    links: []
  },
  {
    id: "cocoa-seirei-2025-03",
    title: "劇団ココア『魔女エステリーゼの事件簿 精霊と焔編』",
    shortTitle: "精霊と焔編",
    category: "stage",
    startAt: "2025-03-19T18:00:00+09:00",
    endAt: "2025-03-23T18:00:00+09:00",
    displayDate: "2025年3月19日〜23日",
    venue: "萬劇場",
    image: "",
    summary: "ヴィレッタ役で出演。",
    badges: ["舞台"],
    links: []
  },
  {
    id: "gojet-vol2-2024-11",
    title: "Air studio produce『GO,JET!GO!GO! vol.2』",
    shortTitle: "GO,JET vol.2",
    category: "stage",
    startAt: "2024-11-20T18:00:00+09:00",
    endAt: "2024-11-25T18:00:00+09:00",
    displayDate: "2024年11月20日〜25日",
    venue: "両国・Air studio",
    image: "",
    summary: "A班・早紀役で出演。",
    badges: ["舞台"],
    links: []
  },
  {
    id: "miss-cosmo-japan-2024",
    title: "Miss Cosmo Japan 2024（TOP5ファイナリスト）",
    shortTitle: "Miss Cosmo 2024",
    category: "event",
    startAt: "2024-08-01T12:00:00+09:00",
    displayDate: "2024年8月",
    image: "",
    summary:
      "審査累計ポイントランキング1位でTOP5ファイナリストに選出、国内最終3位。",
    badges: ["受賞", "ミスコン"],
    links: []
  },
  {
    id: "gojet-paradise-live4-2024-06",
    title: "LAST DIAMOND『GO,JET!GO!GO! PARADISE LIVE 4』",
    shortTitle: "PARADISE LIVE 4",
    category: "stage",
    startAt: "2024-06-18T18:00:00+09:00",
    endAt: "2024-06-23T18:00:00+09:00",
    displayDate: "2024年6月18日〜23日",
    venue: "A-Garage",
    image: "",
    summary: "Aチーム・すずこ役で出演。",
    badges: ["舞台"],
    links: []
  },
  {
    id: "babyshark-live-2024",
    title: "BABY SHARK LIVE! -The Hidden Treasure- 全国公演",
    shortTitle: "Baby Shark Live",
    category: "stage",
    startAt: "2024-02-25T13:00:00+09:00",
    displayDate: "2024年〜",
    image: "/images/yukako-babyshark-lobster2.jpg",
    summary:
      "Pinkfongの人気キャラクターたちと歌って踊るファミリーミュージカル。シンガーとして全国公演に出演。",
    badges: ["舞台", "全国公演", "シンガー"],
    links: []
  },
  {
    id: "cocoa-gan-2023-11",
    title: "劇団ココア 6周年記念公演『魔女エステリーゼの事件簿 贋と軀編』",
    shortTitle: "贋と軀編",
    category: "stage",
    startAt: "2023-11-14T18:00:00+09:00",
    endAt: "2023-11-19T18:00:00+09:00",
    displayDate: "2023年11月14日〜19日",
    venue: "萬劇場",
    image: "",
    summary: "フレヤ・スチュアート役で出演。",
    badges: ["舞台"],
    links: []
  },
  {
    id: "tvk-weather-report-2023",
    title: "テレビ神奈川『weather report』リポーター",
    shortTitle: "weather report",
    category: "tv",
    startAt: "2023-04-10T00:00:00+09:00",
    endAt: "2023-09-30T00:00:00+09:00",
    displayDate: "2023年4月〜9月",
    image: "",
    summary:
      "SHOWROOMオーディションで選出され、リポーターとして出演。夏のリポーター挑戦篇にも登場。",
    badges: ["TV", "リポーター"],
    links: []
  },
  {
    id: "akuma-no-namida-2022",
    title: "舞台『悪魔の涙2022』（舞台デビュー）",
    shortTitle: "悪魔の涙2022",
    category: "stage",
    startAt: "2022-12-08T18:00:00+09:00",
    endAt: "2022-12-12T18:00:00+09:00",
    displayDate: "2022年12月8日〜12日",
    venue: "平賀スクエア",
    image: "",
    summary:
      "プロジェクトアクト東京 第七回公演。カラヤン組で諏訪桃子役を演じ、舞台俳優としてのキャリアをスタート。",
    badges: ["舞台", "デビュー作"],
    links: []
  }
];
