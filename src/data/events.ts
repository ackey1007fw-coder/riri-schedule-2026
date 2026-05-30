import type { ScheduleEvent } from "../types";

const driveImage = (id: string) =>
  `https://drive.google.com/thumbnail?id=${id}&sz=w1600`;

export const events: ScheduleEvent[] = [
  {
    id: "showroom-dreamisland-2026-06-04",
    title: "SHOWROOM「夢の国に遊びに行こう！テーマパークペアチケット＆駅中広告ポスター掲載権獲得イベント！」",
    shortTitle: "夢の国イベント",
    category: "event",
    startAt: "2026-06-04T18:00:00+09:00",
    endAt: "2026-06-10T21:59:00+09:00",
    displayDate: "2026年6月4日（木）18:00から6月10日（水）21:59",
    image: driveImage("1hg7CCMX-vtLQo1CajCz0rc8_FZCddz-W"),
    summary: "SHOWROOMで開催されるランキングイベント。配信を見て、コメントやフォローで応援できます。",
    badges: ["SHOWROOM", "イベント", "6/4から6/10", "ランキング"],
    links: [
      { label: "イベントページ", url: "https://www.showroom-live.com/event/dreamisland6", kind: "stream" },
      { label: "SHOWROOMへ", url: "https://www.showroom-live.com/room/profile?room_id=550336", kind: "stream" }
    ],
    isImportant: true
  },
  {
    id: "yofukashi-campus-2026-05-09",
    title: "みつきとななこの夜ふかしキャンパス vol.2 春の新学期わくわくSP",
    shortTitle: "夜ふかしキャンパス",
    category: "radio",
    startAt: "2026-05-09T17:00:00+09:00",
    endAt: "2026-05-09T19:45:00+09:00",
    displayDate: "2026年5月9日（土）17:00から",
    venue: "WALLOP押上スタジオ",
    image: driveImage("1A8rODe-N__YMWSjNEL5hNeT0U5gaT7Ka"),
    summary: "公開収録と特典会を予定。公開収録は17:00から18:00、特典会は18:15から19:45です。",
    badges: ["NEXT", "ラジオ", "公開収録", "特典会"],
    links: [
      { label: "tigetで予約", url: "https://tiget.net/events/481711", kind: "ticket" },
      { label: "WALLOPページ", url: "https://www.wallop.tv/", kind: "info" }
    ],
    isNextFocus: true
  },
  {
    id: "theoridea-2026-05-14",
    title: "劇場公演『ギリシャ神話戦記テオリデア アトランティスの残響』",
    shortTitle: "テオリデア",
    category: "stage",
    startAt: "2026-05-14T18:30:00+09:00",
    endAt: "2026-05-17T20:30:00+09:00",
    displayDate: "2026年5月14日（木）から5月17日（日）",
    venue: "萬劇場（大塚）",
    image: driveImage("1AzWL5zxhUWd2l4_Clk6SfR-eNsjwuRmg"),
    summary: "初挑戦の舞台出演。5月16日はSpecial Live公演、5月17日は千秋楽。現地チケットと配信チケットがあります。",
    badges: ["舞台", "チケット発売中", "配信あり", "重要"],
    links: [
      { label: "チケット予約", url: "https://www.quartet-online.net/ticket/sankyou2026?m=03hggeh", kind: "ticket" },
      { label: "配信チケット", url: "https://twitcasting.tv/", kind: "stream" },
      { label: "会場アクセス", url: "https://yorozu-s.com/", kind: "info" }
    ],
    isImportant: true
  },
  {
    id: "aitoki-2026-05-29",
    title: "月シア別冊第一集『I'm talking about lovin'』",
    shortTitle: "月シア別冊",
    category: "stage",
    startAt: "2026-05-29T19:00:00+09:00",
    endAt: "2026-06-02T21:00:00+09:00",
    displayDate: "2026年5月29日（金）から6月2日（火）",
    venue: "西荻窪 遊空間がざびぃ",
    image: driveImage("1hPMNv9kiFKfBKgp7CLfjv7zJBtTOKCx_"),
    summary: "音楽と演劇が合わさった公演。Asideとして出演予定。全8回公演、前売券は6,000円です。",
    badges: ["舞台", "先行販売中", "全8回", "アイトキ"],
    links: [
      { label: "チケット購入", url: "https://livepocket.jp/t/aitoki", kind: "ticket" },
      { label: "KAIGYAC STAGE X", url: "https://x.com/kaigyacstage", kind: "sns" }
    ],
    isImportant: true
  },
  {
    id: "birthday-2026-06-24",
    title: "りりちゃんのお誕生日",
    shortTitle: "誕生日",
    category: "birthday",
    startAt: "2026-06-24T00:00:00+09:00",
    endAt: "2026-06-24T23:59:59+09:00",
    displayDate: "2026年6月24日（水）",
    image: driveImage("1rUFypXYABEcyRUaxhie6o_jaNBTAWR16"),
    summary: "SNSやSHOWROOMでお祝いの気持ちを届けたい日。カウントダウンと一緒に準備できます。",
    badges: ["特別", "Birthday"],
    links: [
      { label: "Xでお祝いを見る", url: "https://x.com/frecam2025_0306", kind: "sns" },
      { label: "SHOWROOMへ", url: "https://www.showroom-live.com/room/profile?room_id=550336", kind: "stream" }
    ]
  },
  {
    id: "fukurow-fm-2026-04-21",
    title: "ふくろうFM『ステラ HAPPYStyle！ CatchTheHeart』公開収録＆チェキ会＆特典会",
    shortTitle: "ふくろうFM公開収録",
    category: "radio",
    startAt: "2026-04-21T18:00:00+09:00",
    endAt: "2026-04-21T21:00:00+09:00",
    displayDate: "2026年4月21日（火）",
    venue: "曙橋スタジオ",
    image: driveImage("1uaNFIH1HkefOjn06tXwSJZvq8eIGjLBA"),
    summary: "公開収録、チェキ会、特典会に出演。アーカイブがある場合は遠方からもチェックできます。",
    badges: ["ラジオ", "公開収録", "特典会", "アーカイブ"],
    links: [
      { label: "ふくろうFMページ", url: "https://fukurowfm.co.jp/", kind: "info" },
      { label: "Xで詳細", url: "https://x.com/frecam2025_0306", kind: "sns" }
    ]
  },
  {
    id: "tvk-nekohita-2026-04-16",
    title: "テレビ神奈川『猫のひたいほどワイドNEO』お天気コーナー",
    shortTitle: "tvk猫ひた",
    category: "tv",
    startAt: "2026-04-16T12:00:00+09:00",
    endAt: "2026-04-16T13:30:00+09:00",
    displayDate: "2026年4月16日（木）12:00から13:30",
    image: driveImage("1R8gptDr0DxZ71Ncuw8koDmgKo-lDjoYi"),
    summary: "SHOWROOMイベントの特典として生放送テレビ出演。お天気コーナーに登場しました。",
    badges: ["テレビ", "生放送", "お天気"],
    links: [{ label: "tvkページ", url: "https://www.tvk-yokohama.com/", kind: "info" }]
  },
  {
    id: "imacampus-2026-04-12",
    title: "MBSラジオ『イマドキッ キャンパスナイト』",
    shortTitle: "イマキャン",
    category: "radio",
    startAt: "2026-04-12T23:30:00+09:00",
    endAt: "2026-04-13T00:00:00+09:00",
    displayDate: "2026年4月12日（日）23:30から24:00",
    image: driveImage("1FM8cYikXk6Z2TtAoHCpBkq_XOT_AmqbS"),
    summary: "青学周辺のおすすめグルメなどを語ったラジオ出演回。声の魅力を楽しめる放送です。",
    badges: ["ラジオ", "放送済み", "radiko"],
    links: [{ label: "radikoで探す", url: "https://radiko.jp/", kind: "stream" }]
  },
  {
    id: "steenz-2026-04-08",
    title: "steenz 取材記事公開『フレキャン』",
    shortTitle: "steenz記事公開",
    category: "web",
    startAt: "2026-04-08T10:00:00+09:00",
    endAt: "2026-04-08T23:59:59+09:00",
    displayDate: "2026年4月8日（水）",
    image: driveImage("1Amj4Ddj1QaQpv2IXO9qw2vHwS0wMXwGv"),
    summary: "コンテストでの受賞や、青山学院大学生としての素顔、役者を目指す想いが読めるインタビュー記事です。",
    badges: ["WEB", "インタビュー", "公開中"],
    links: [{ label: "steenzで読む", url: "https://steenz.jp/", kind: "info" }]
  },
  {
    id: "kyanly-2026-03-14",
    title: "KYANLYファン感謝祭2026 運動会＆チェキ会",
    shortTitle: "KYANLY感謝祭",
    category: "event",
    startAt: "2026-03-14T11:00:00+09:00",
    endAt: "2026-03-14T16:00:00+09:00",
    displayDate: "2026年3月14日（土）11:00から16:00",
    venue: "東京都立川市 屋外施設",
    image: driveImage("1D9t__MTdyoBzSHyK9-gxTWetikuHYnZ7"),
    summary: "スポーツデーとチェキ撮影会に出演。ランウェイ姿はKYANLYの動画でもチェックできます。",
    badges: ["イベント", "運動会", "チェキ会"],
    links: [{ label: "KYANLY YouTube", url: "https://www.youtube.com/@kyanly_ch", kind: "stream" }]
  }
];
