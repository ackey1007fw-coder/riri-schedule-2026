import type { ScheduleEvent } from "../types";

export const events: ScheduleEvent[] = [
  {
    id: "stage-ogikubo-2026-08",
    title: "劇団ココア『ピッパラの樹』",
    shortTitle: "ピッパラの樹",
    category: "stage",
    startAt: "2026-08-18T19:30:00+09:00",
    endAt: "2026-08-29T21:00:00+09:00",
    dates: [
      "2026-08-18",
      "2026-08-22",
      "2026-08-23",
      "2026-08-25",
      "2026-08-28",
      "2026-08-29"
    ],
    displayDate: "2026年8月18日(火)〜29日(土)・A班 全6公演",
    venue: "荻窪小劇場",
    image: "/images/gallery/g65.jpg",
    summary:
      "劇団ココアの19世紀イギリス風恋愛喜劇『ピッパラの樹』にA班「アナスタジー・ド・ブロワ役」として出演（約100分）。脚本・演出：小谷聡一郎。りりの出演回は 8/18(火)19:30｜8/22(土)12:00｜8/23(日)15:30｜8/25(火)14:00｜8/28(金)19:30｜8/29(土)19:30 の全6公演。特典付き優先入場チケット5,500円／一般4,500円（全席自由席）。ご予約の際は備考欄に「夏凪里季」とご記入ください。詳しい特集は「舞台『ピッパラの樹』」セクションでご紹介しています。",
    badges: ["舞台", "A班", "全6公演", "チケット発売中"],
    links: [
      {
        label: "チケット予約（tiget）",
        url: "https://tiget.net/events?q%5Bwords%5D=%E3%83%94%E3%83%83%E3%83%91%E3%83%A9%E3%81%AE%E6%A8%B9",
        kind: "ticket"
      },
      {
        label: "稽古初日レポート（7/26）",
        url: "https://x.com/frecam2025_0306/status/2081372754612486194",
        kind: "sns"
      },
      {
        label: "夏凪里季さんの出演告知",
        url: "https://x.com/frecam2025_0306/status/2071212422107721835",
        kind: "sns"
      },
      {
        label: "劇団ココア 公式X",
        url: "https://x.com/gekidan_cocoa",
        kind: "sns"
      }
    ],
    isImportant: true
  },
  {
    id: "aitoki-homin-2026-09",
    title: "月シア別冊第2集『I'm talking about Homin'』",
    shortTitle: "Homin'",
    category: "stage",
    startAt: "2026-09-11T19:00:00+09:00",
    endAt: "2026-09-15T20:00:00+09:00",
    dates: ["2026-09-11", "2026-09-12", "2026-09-13", "2026-09-15"],
    displayDate: "2026年9月11日(金)〜15日(火)・A side 全4公演",
    venue: "西荻窪 遊空間がざびぃ",
    image: "/images/im-talking-about-homin-flyer-2026.jpg",
    summary:
      "アイトキシリーズ第2弾、名曲から生まれた5つの短編集『I'm talking about Homin'』にA sideとして出演。脚本・演出：中平奈緒・もか・横大路伸。りりの出演回は 9/11(金)19:00｜9/12(土)12:00｜9/13(日)12:00｜9/15(火)18:00 の全4公演。前売券6,000円／当日券6,500円。",
    badges: ["舞台", "A side", "全4公演", "デジタル花受付中", "アイトキ第2弾"],
    links: [
      {
        label: "チケット予約（livepocket）",
        url: "https://livepocket.jp/t/aitokihomin",
        kind: "ticket"
      },
      {
        label: "デジタルメッセージ花（5,000円）",
        url: "https://tsukitheater.base.ec/items/150226748",
        kind: "info"
      },
      {
        label: "デジタルスタンド花（2,000円）",
        url: "https://tsukitheater.base.ec/items/150226569",
        kind: "info"
      },
      {
        label: "デジタル花のお知らせ",
        url: "https://x.com/frecam2025_0306/status/2083525044479664564",
        kind: "sns"
      },
      {
        label: "夏凪里季さんの出演告知",
        url: "https://x.com/frecam2025_0306/status/2075931870681063715",
        kind: "sns"
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
    id: "riri-family-birthday-dinner-2026-08",
    title: "家族と過ごした、幸せの誕生日ディナー🍴💕",
    shortTitle: "家族との誕生日ディナー",
    subtitle: "ハタチのお祝いを、クルーズディナーで",
    category: "birthday",
    startAt: "2026-08-01T12:00:00+09:00",
    endAt: "2026-08-01T12:00:00+09:00",
    displayDate: "Instagram @__ririri__24 の投稿より",
    image: "/images/birthday/riri-family-dinner-hero.jpg",
    imageAlt:
      "クルーズ船内のレストランで「Happy Birthday RIRI 20th!」のケーキを手に笑顔を見せる夏凪里季さん",
    summary:
      "家族に20歳をお祝いしてもらったクルーズディナー。コース料理とバースデーケーキを味わい、里季さんが「全部美味しかった幸せの味」と綴った、あたたかな家族との時間です。",
    badges: ["Birthday Memories", "20歳", "家族", "Instagram"],
    gallery: [
      {
        src: "/images/birthday/riri-family-dinner-toast.jpg",
        alt: "クルーズ船内のレストランで、グラスを手にカメラを見つめる夏凪里季さん"
      },
      {
        src: "/images/birthday/riri-family-dinner-appetizer.jpg",
        alt: "サーモンと彩り豊かな野菜が盛り付けられた誕生日ディナーの前菜"
      },
      {
        src: "/images/birthday/riri-family-dinner-main.jpg",
        alt: "パイ包みとマッシュポテト、サラダが美しく盛り付けられた誕生日ディナーのメイン料理"
      },
      {
        src: "/images/birthday/riri-family-dinner-cake.jpg",
        alt: "「Happy Birthday RIRI 20th!」のメッセージとフルーツが飾られたバースデーケーキ"
      }
    ],
    reportQuote:
      "🍴💕\n\n家族にお祝いしてもらった> ̫<\n料理もケーキも全部美味しかった幸せの味(𓈒ʚ̴̶̷̷̥ ⩊ ɞ̴̶̷𓈒)\n\n#誕生日ディナー #都内ディナー #クルーズディナー #天王洲アイルディナー #誕生日ケーキ",
    reportNote:
      "乾杯からコース料理、そして「RIRI 20th!」のケーキまで。家族からのお祝いに包まれた、ハタチの大切な思い出です。",
    links: [
      {
        label: "Instagramで投稿を見る",
        url: "https://www.instagram.com/p/Dbfx1-uCV0I/?img_index=3&igsh=MXdzY2Flc2JqbGczYw==",
        kind: "sns"
      }
    ]
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
    id: "riri-birthday-solo-shots-2026-07",
    title: "生誕祭ソロショット📸✨️",
    shortTitle: "生誕祭ソロショット",
    subtitle: "ハタチの生誕祭から、あらためて",
    category: "birthday",
    startAt: "2026-07-27T07:00:00+09:00",
    endAt: "2026-07-27T07:00:00+09:00",
    displayDate: "2026年7月27日（月）の投稿より",
    image: "/images/gallery/g68.jpg",
    imageAlt:
      "ティアラをつけ、たくさんのプレゼントの紙袋を抱えて笑顔の夏凪里季さん",
    summary:
      "7月19日の生誕祭で撮影したソロ写真を、夏凪里季さんがInstagramに投稿。「また後日別の写真あげるね📸」と予告していた一組で、ティアラ姿のショットやバースデーケーキ、抱えきれないほどのプレゼントの写真が並びます。",
    badges: ["生誕祭レポート", "20歳", "Instagram"],
    gallery: [
      {
        src: "/images/gallery/g69.jpg",
        alt: "「HAPPY BIRTHDAY」と描かれたバースデープレートを、線香花火の光とともに掲げて目を細めて笑う夏凪里季さん"
      },
      {
        src: "/images/gallery/g70.jpg",
        alt: "フォークを手に、生クリームたっぷりのバースデープレートを持ってほほえむ夏凪里季さん"
      },
      {
        src: "/images/gallery/g71.jpg",
        alt: "「りりたん 誕生日おめでとう」のうちわやお花、たくさんの紙袋が並んだ生誕祭のプレゼント"
      }
    ],
    reportQuote:
      "生誕祭ソロショット📸✨️\n\nケーキあまあまで美味しかった🎂\n\nプレゼント持ちきれないほど🙏✨️\n\nたくさんのお祝いをありがとう💞\n\n#誕生日 #誕生日コーデ #女子大生 #06 #ハーフアップ",
    reportNote:
      "ティアラとハーフアップ、そして山盛りのプレゼント。ハタチの生誕祭のうれしさが、そのまま伝わってくる4枚です。",
    links: [
      {
        label: "Instagramで投稿を見る",
        url: "https://www.instagram.com/p/DbS3GMDiQuv/",
        kind: "sns"
      }
    ]
  },
  {
    id: "riri-birthday-1month-later-2026-07",
    title: "20歳のお祝いはまだまだ続く🎂",
    shortTitle: "1か月後の生誕祭ショット",
    category: "birthday",
    startAt: "2026-07-26T07:00:00+09:00",
    endAt: "2026-07-26T07:00:00+09:00",
    displayDate: "2026年7月26日（日）の投稿より",
    image: "/images/riri-birthday-20th-one-month-later.jpg",
    imageAlt: "夏凪里季さんが20歳のバースデーケーキを持って笑顔を見せる写真",
    summary:
      "20歳の誕生日から約1か月。バースデーケーキを手にした夏凪里季さんが、Xに笑顔の一枚を投稿しました。",
    badges: ["生誕祭レポート", "20歳", "X"],
    reportQuote: "誕生日から１ヶ月経ったけどまだお祝いしてもらってる🙄",
    reportNote:
      "ケーキには「Happy Birthday RIRI 20th！」のメッセージ。少し照れたような表情からも、うれしい気持ちが伝わってくる一枚です。",
    links: [
      {
        label: "Xで元投稿を見る",
        url: "https://x.com/frecam2025_0306/status/2081137416518214075",
        kind: "sns"
      }
    ]
  },
  {
    id: "moeriri-birthday-report-2026-07",
    title: "もえりり生誕祭🎂✨️",
    shortTitle: "もえりり生誕祭レポート",
    subtitle: "20歳のスタートを、大切な仲間と",
    category: "birthday",
    startAt: "2026-07-19T18:00:00+09:00",
    endAt: "2026-07-19T18:00:00+09:00",
    displayDate: "2026年7月19日（日）の生誕祭より",
    image: "/images/moeriri-birthday-2026-01.jpg",
    imageAlt: "もえりり生誕祭でバースデープレートを持つ記念写真",
    summary:
      "小峰萌楓さんとの合同生誕祭のあと、夏凪里季さんがInstagramにレポートを投稿。集まってくれた皆さんへの感謝と、20歳を迎えた喜びがつづられています。",
    badges: ["生誕祭レポート", "20歳", "Instagram"],
    gallery: [
      {
        src: "/images/moeriri-birthday-2026-02.jpg",
        alt: "バースデーケーキを楽しむ生誕祭の記念写真"
      },
      {
        src: "/images/moeriri-birthday-2026-03.jpg",
        alt: "スプーンを持って笑顔を見せる生誕祭の記念写真"
      },
      {
        src: "/images/moeriri-birthday-2026-04.jpg",
        alt: "バースデーケーキを食べる様子を収めた記念写真"
      }
    ],
    reportQuote:
      "もえりり生誕祭🎂✨️\n\nお集まりしてくださった皆様ありがとうございました❣️\nそしてもえにゃんとまた一緒にできてよかった楽しかった🎶\n\n素敵なハタチになりそうです💞\nまた後日別の写真あげるね📸\n\n#女子大生 #誕生日パーティー #生誕祭 #20歳 #誕生日",
    reportNote:
      "20歳という節目を、笑顔いっぱいで迎えた特別な生誕祭。感謝と楽しさが伝わる、あたたかな記念投稿です。",
    links: [
      {
        label: "Instagramで投稿を見る",
        url: "https://www.instagram.com/p/DbNtlj5iQyQ/?igsh=MTR1bXF2NmY1cGJ1cg==",
        kind: "sns"
      }
    ]
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
