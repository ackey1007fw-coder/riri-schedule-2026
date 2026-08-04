// 「Night Cruise Log」コーナーの元データ
// 2026.8.4 Instagram 投稿「ディナー後にクルーズ船乗ってきた⚓️」より。
// 写真は public/images/gallery/ に自己ホストし、フォトギャラリーと同じファイルを共有する。

export type CruisePhoto = {
  src: string;
  alt: string;
  caption: string;
};

export const nightCruise = {
  id: "night-cruise",
  date: "2026.8.4",
  platform: "Instagram" as const,
  kicker: "Night Cruise Log",
  heading: "ディナーのあとは、東京湾ナイトクルーズ⚓️",
  quote: "ディナー後にクルーズ船乗ってきた⚓️\nかわいいドリンクたくさんあって景色も最高> ̫<",
  copy:
    "レインボーブリッジと湾岸の灯りが流れていく、天王洲アイル発のナイトクルーズ。デッキから見上げた夜景と、色とりどりのドリンクを両手にした里季さんの笑顔をまとめました。",
  hashtags: ["#クルーズ船", "#天王洲アイル", "#クルーズディナー", "#女子大生", "#06"],
  url: "https://www.instagram.com/p/DbnQ8aICUTN/",
  hero: {
    src: "/images/gallery/g94.jpg",
    alt: "夜の東京湾から見上げたレインボーブリッジ。ライトアップされた橋の下に、湾岸のビル群の灯りが帯のように広がっている",
    caption: "船の上から見上げたレインボーブリッジ。湾岸の灯りが水面に揺れる。"
  } satisfies CruisePhoto,
  // 乗船チケットの写真から読み取れる範囲のメモ（推測は書かない）
  logbook: [
    {
      term: "船",
      value: "LADY CRYSTAL",
      note: "The Cruise Club Tokyo（乗船チケットの表記より）"
    },
    {
      term: "出航",
      value: "天王洲アイル",
      note: "投稿のハッシュタグ #天王洲アイル より"
    },
    {
      term: "ドリンク",
      value: "Soft Drink Menu",
      note: "ミルクボトル型グラスに注がれた、色とりどりのソフトドリンク"
    }
  ],
  photos: [
    {
      src: "/images/gallery/g92.jpg",
      alt: "夜景を背にした窓際で、ミントグリーンのドリンクが入ったミルクボトル型グラスを掲げてほほえむ夏凪里季さん。白いフリルの半袖トップス姿",
      caption: "「かわいいドリンクたくさん」— ミントグリーンの1杯を掲げて。"
    },
    {
      src: "/images/gallery/g93.jpg",
      alt: "船内の席で、右手にオレンジジュースのミルクボトル、左手に淡いブルーのドリンクのグラスを持ち、目を細めて笑う夏凪里季さん",
      caption: "両手に1杯ずつ。どっちにしよう、の顔。"
    },
    {
      src: "/images/gallery/g95.jpg",
      alt: "船内のカウンターに並んだトレー。ミルクボトル型のグラスに、ミントグリーン・オレンジ・レッド・コーラなど色とりどりのソフトドリンクが注がれている",
      caption: "並んだ瞬間がいちばんかわいい、ソフトドリンクのトレー。"
    },
    {
      src: "/images/gallery/g96.jpg",
      alt: "テーブルに広げられた「LADY CRYSTAL BOARDING TICKET」と印字された3枚の乗船チケット。乗船日の欄には「26 7 13」と記されている",
      caption: "3枚並んだ乗船チケット。この日の航海のはじまり。"
    }
  ] satisfies CruisePhoto[]
};
