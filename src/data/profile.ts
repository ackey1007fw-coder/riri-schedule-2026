const showroomAvatar = (id: string, version: string) =>
  `https://image.showroom-cdn.com/showroom-prod/image/avatar/${id}.png?v=${version}`;

export const profile = {
  theme: "Riri Schedule 2026",
  name: "夏凪 里季",
  kana: "なつなぎ りり",
  romaji: "Natsunagi Riri",
  fanScheduleLabel: "Fan Schedule",
  catchCopy: "透明感のある笑顔とまっすぐな表現力で、次の舞台へ。",
  intro:
    "出演予定、配信、SNS、プロフィールをひとつにまとめた応援スケジュールです。",
  heroImage: "/images/riri-hero.jpg",
  portraitImage: "/images/riri-portrait.jpg",
  birthday: "2006-06-24",
  birthdayMonthDay: "06-24",
  birthdayLabel: "6月24日",
  fanName: "ナギイチサマー",
  facts: [
    { label: "大学", value: "青山学院大学 2年生" },
    { label: "出身", value: "三重県生まれ、神奈川県育ち" },
    { label: "身長", value: "163cm" },
    { label: "夢", value: "世界中の人の心を動かす役者になること" },
    { label: "部活", value: "陸上部（ハードル）、ダンス部" },
    { label: "趣味", value: "数独、映画鑑賞、スポーツ、お菓子作り" },
    { label: "特技", value: "表情筋を動かすこと" },
    { label: "性格", value: "ESFJ（領事官）" }
  ],
  gallery: [
    "/images/riri-zine-01.jpg",
    "/images/riri-zine-02.jpg",
    "/images/riri-zine-03.jpg",
    "/images/riri-zine-04.jpg"
  ],
  showroom: {
    roomName: "夏凪里季",
    tagline: "#フレキャン2025 | Entry No.306",
    image:
      "https://image.showroom-cdn.com/showroom-prod/image/room/cover/55d2ef24f81c0ade2fd985f3144696638393b41ef2d56b6e721de2ebcbdc94ea_l.jpeg?v=1749278230",
    url: "https://www.showroom-live.com/room/profile?room_id=550336",
    stats: [
      { label: "次回配信", value: "SHOWROOMで確認" },
      { label: "フォロワー", value: "915" },
      { label: "ルームLv", value: "151" },
      { label: "SHOWランク", value: "B" }
    ],
    message:
      "朝の配信やイベント前の近況をチェック。コメント、フォロー、ギフトで日々の活動を応援できます。"
  },
  avatars: [
    {
      name: "おばけりりたん",
      image: showroomAvatar("1000244", "1738408017")
    },
    {
      name: "金ぐりり",
      image: showroomAvatar("1000090", "1725810395"),
      featured: true
    },
    {
      name: "ちびりり",
      image: showroomAvatar("1000363", "1740022425")
    },
    {
      name: "とりり",
      image: showroomAvatar("1001254", "1741230010")
    },
    {
      name: "りりわん",
      image: showroomAvatar("1001493", "1741410070")
    },
    {
      name: "こうもりり",
      image: showroomAvatar("1001679", "1743654799")
    },
    {
      name: "ひまわりり",
      image: showroomAvatar("1003280", "1747962189")
    },
    {
      name: "なつりり",
      image: showroomAvatar("1003281", "1747962247")
    },
    {
      name: "サーフィンサンサン",
      image: showroomAvatar("1003282", "1747962336")
    },
    {
      name: "サンサン",
      image: showroomAvatar("1003283", "1747962380")
    },
    {
      name: "しょきりり",
      image: showroomAvatar("1004174", "1750928252")
    }
  ]
};
