import type { ScheduleEvent } from "../types";

export const events: ScheduleEvent[] = [
  {
    id: "stage-ogikubo-2026-08",
    title: "舞台出演（詳細は後日発表）",
    shortTitle: "8月の舞台",
    category: "stage",
    startAt: "2026-08-18T19:30:00+09:00",
    endAt: "2026-08-29T21:30:00+09:00",
    dates: [
      "2026-08-18",
      "2026-08-22",
      "2026-08-23",
      "2026-08-25",
      "2026-08-28",
      "2026-08-29"
    ],
    displayDate: "2026年8月18日(火)〜29日(土)・全6公演",
    venue: "荻窪（詳細未公開）",
    image: "/images/riri-portrait.jpg",
    summary:
      "8月に荻窪で上演される舞台に出演（全6公演）。8/18(火)19:30｜8/22(土)12:00｜8/23(日)15:30｜8/25(火)14:00｜8/28(金)19:30｜8/29(土)19:30。作品タイトルや会場などの詳細は後日発表予定です。",
    badges: ["舞台", "全6公演", "詳細は後日発表"],
    links: [],
    isImportant: true
  },
  {
    id: "goudou-birthday-2026-07-19",
    title: "夏凪里季×小峰萌楓 合同誕生祭",
    shortTitle: "合同誕生祭",
    category: "event",
    startAt: "2026-07-19T14:00:00+09:00",
    endAt: "2026-07-19T17:00:00+09:00",
    displayDate: "2026年7月19日（日）14:00〜17:00",
    venue: "都内某所",
    image: "/images/event-goudou-birthday.jpg",
    summary:
      "フレキャン2025の夏凪里季さん（20歳）と、小峰萌楓さん（#ミスサークル2025・23歳）の合同生誕祭。20歳と23歳のお祝いを一緒に楽しむ、今年最初で最後の合同誕生祭です。",
    badges: ["合同生誕祭", "小峰萌楓", "要予約"],
    links: [
      {
        label: "予約フォーム",
        url: "https://docs.google.com/forms/d/e/1FAIpQLSctRg6ClNuC-GphfGOZQ24n4W1CsR8KiiHTNxBEow8axhM6og/viewform",
        kind: "info"
      }
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
    image: "/images/event-yofukashi.jpg",
    summary:
      "WALLOP押上スタジオでの公開収録と特典会に出演。リスナーとの距離が近い、にぎやかな一夜になりました。",
    badges: ["ラジオ", "公開収録", "特典会", "終了"],
    links: [
      {
        label: "tigetで予約",
        url: "https://tiget.net/events/481711",
        kind: "ticket"
      },
      {
        label: "WALLOPページ",
        url: "https://www.wallop.tv/",
        kind: "info"
      }
    ]
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
    image: "/images/event-theoridea.jpg",
    summary:
      "初挑戦となった舞台『ギリシャ神話戦記テオリデア』。青い衣装をまとい、アトランティスを巡る物語を全力で演じ切りました。",
    badges: ["舞台", "配信あり", "終了"],
    links: [
      {
        label: "チケット予約",
        url: "https://www.quartet-online.net/ticket/sankyou2026?m=03hggeh",
        kind: "ticket"
      },
      {
        label: "配信チケット",
        url: "https://twitcasting.tv/",
        kind: "stream"
      },
      {
        label: "会場アクセス",
        url: "https://yorozu-s.com/",
        kind: "info"
      }
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
    image: "/images/event-aitoki.jpg",
    summary:
      "音楽と演劇が溶け合う公演にAsideとして出演。歌と芝居の両方で魅せた、全8回の濃密なステージでした。",
    badges: ["舞台", "全8回", "アイトキ", "終了"],
    links: [
      {
        label: "チケット購入",
        url: "https://livepocket.jp/t/aitoki",
        kind: "ticket"
      },
      {
        label: "KAIGYAC STAGE X",
        url: "https://x.com/kaigyacstage",
        kind: "sns"
      }
    ],
    isImportant: true
  },
  {
    id: "showroom-dreamisland-2026-06-04",
    title: "SHOWROOM「夢の国に遊びに行こう！テーマパークペアチケット＆駅中広告ポスター掲載権獲得イベント！」",
    shortTitle: "夢の国イベント",
    category: "event",
    startAt: "2026-06-04T18:00:00+09:00",
    endAt: "2026-06-10T21:59:00+09:00",
    displayDate: "2026年6月4日（木）18:00〜6月10日（水）21:59",
    image: "/images/event-yumenokuni.jpg",
    summary:
      "SHOWROOMのランキングイベント。テーマパークのペアチケットと駅中広告ポスター掲載権をかけて開催されました。たくさんの応援をありがとうございました。",
    badges: ["SHOWROOM", "6/4〜6/10", "ランキング", "終了"],
    links: [
      {
        label: "イベントページ",
        url: "https://www.showroom-live.com/event/dreamisland6",
        kind: "stream"
      },
      {
        label: "SHOWROOMへ",
        url: "https://www.showroom-live.com/room/profile?room_id=550336",
        kind: "stream"
      }
    ]
  },
  {
    id: "birthday-2026-06-24",
    title: "りりちゃんのお誕生日",
    shortTitle: "誕生日",
    category: "birthday",
    startAt: "2026-06-24T00:00:00+09:00",
    endAt: "2026-06-24T23:59:59+09:00",
    displayDate: "2026年6月24日（水）",
    image: "/images/event-birthday.jpg",
    summary:
      "りりちゃんがハタチを迎える特別な日。SNSやSHOWROOMで、お祝いの気持ちを一緒に届けましょう。",
    badges: ["特別", "Birthday"],
    links: [
      {
        label: "Xでお祝いを見る",
        url: "https://x.com/frecam2025_0306",
        kind: "sns"
      },
      {
        label: "SHOWROOMへ",
        url: "https://www.showroom-live.com/room/profile?room_id=550336",
        kind: "stream"
      }
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
    image: "/images/event-fukurow.jpg",
    summary:
      "ふくろうFMの番組公開収録に出演。チェキ会・特典会もあり、ファンと直接ふれあえる時間になりました。",
    badges: ["ラジオ", "公開収録", "特典会", "アーカイブ"],
    links: [
      {
        label: "ふくろうFMページ",
        url: "https://fukurowfm.co.jp/",
        kind: "info"
      },
      {
        label: "Xで詳細",
        url: "https://x.com/frecam2025_0306",
        kind: "sns"
      }
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
    image: "/images/event-tvk.jpg",
    summary:
      "SHOWROOMイベントの特典として実現した生放送テレビ出演。お天気コーナーに元気いっぱい登場しました。",
    badges: ["テレビ", "生放送", "お天気"],
    links: [
      {
        label: "tvkページ",
        url: "https://www.tvk-yokohama.com/",
        kind: "info"
      }
    ]
  },
  {
    id: "imacampus-2026-04-12",
    title: "MBSラジオ『イマドキッ キャンパスナイト』",
    shortTitle: "イマキャン",
    category: "radio",
    startAt: "2026-04-12T23:30:00+09:00",
    endAt: "2026-04-13T00:00:00+09:00",
    displayDate: "2026年4月12日（日）23:30から24:00",
    image: "/images/event-imacampus.jpg",
    summary:
      "青山学院大学の周辺グルメなどを語ったMBSラジオ出演回。トークと弾ける笑顔、声の魅力をたっぷり楽しめます。",
    badges: ["ラジオ", "放送済み", "radiko"],
    links: [
      {
        label: "radikoで探す",
        url: "https://radiko.jp/",
        kind: "stream"
      }
    ]
  },
  {
    id: "steenz-2026-04-08",
    title: "steenz 取材記事公開『フレキャン』",
    shortTitle: "steenz記事公開",
    category: "web",
    startAt: "2026-04-08T10:00:00+09:00",
    endAt: "2026-04-08T23:59:59+09:00",
    displayDate: "2026年4月8日（水）",
    image: "/images/event-steenz.jpg",
    summary:
      "コンテストでの受賞や、青山学院大学生としての素顔、役者を目指す想いが読めるインタビュー記事です。",
    badges: ["WEB", "インタビュー", "公開中"],
    links: [
      {
        label: "steenzで読む",
        url: "https://steenz.jp/",
        kind: "info"
      }
    ]
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
    image: "/images/event-kyanly.jpg",
    summary:
      "スポーツデーとチェキ撮影会に出演。ランウェイ姿はKYANLYの動画でもチェックできます。",
    badges: ["イベント", "運動会", "チェキ会"],
    links: [
      {
        label: "KYANLY YouTube",
        url: "https://www.youtube.com/@kyanly_ch",
        kind: "stream"
      }
    ]
  }
];
