const showroomAsset = (url: string) =>
  `/api/showroom-image?url=${encodeURIComponent(url)}`;

const driveImage = (id: string, size = "w1600") =>
  `https://drive.google.com/thumbnail?id=${id}&sz=${size}`;

const showroomAvatar = (id: string, version = "110") =>
  showroomAsset(`https://static.showroom-live.com/image/avatar/${id}.png?v=${version}`);

export const profile = {
  theme: "Riri Schedule 2026",
  name: "夏凪 里季",
  kana: "なつなぎ りり",
  romaji: "Natsunagi Riri",
  fanScheduleLabel: "Fan Schedule",
  catchCopy: "透明感のある笑顔とまっすぐな表現力で、次の舞台へ。",
  intro:
    "出演予定、配信、SNS、プロフィールをひとつにまとめた応援スケジュールです。",
  heroImage: driveImage("1-tnOZvazIjzWiOBCrzVdUhaY9mFXCkNp", "w2200"),
  portraitImage: driveImage("15cmlhmXNpJRzztleLn_Q_97ft1Gffr4j", "w1800"),
  birthday: "2006-06-24",
  birthdayMonthDay: "06-24",
  birthdayLabel: "6月24日",
  fanName: "ナギイチサマー",
  facts: [
    { label: "大学", value: "青山学院大学 2年生" },
    { label: "出身", value: "三重県生まれ、神奈川県育ち" },
    { label: "身長", value: "163cm" },
    { label: "夢", value: "世界中の人の心を動かす役者になること" },
    { label: "受賞", value: "フレキャン2025 審査員特別賞" },
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
    image: showroomAsset(
      "https://static.showroom-live.com/image/room/cover/79fff63b1c4bdbb2fa1bf0507b410abbc3ce07d36111ac3ff3867633fb0d3c80_s.jpeg?v=1779283160"
    ),
    url: "https://www.showroom-live.com/room/profile?room_id=550336",
    stats: [
      { label: "まいにち配信", value: "400日目" },
      { label: "次回配信", value: "未定" },
      { label: "フォロワー", value: "933" },
      { label: "ルームLv", value: "174" },
      { label: "SHOWランク", value: "C" }
    ],
    message:
      "朝の配信やイベント前の近況をチェック。コメント、フォロー、ギフトで日々の活動を応援できます。"
  },
  avatars: [
    { name: "おばけりりたん", image: showroomAvatar("1141864"), featured: true },
    { name: "金ぐりり",       image: showroomAvatar("1139413") },
    { name: "ちびりり",       image: showroomAvatar("1139155") },
    { name: "とりり",         image: showroomAvatar("1137154") },
    { name: "りりわん",       image: showroomAvatar("1136628") },
    { name: "こうもりり",     image: showroomAvatar("1135709") },
    { name: "ひまわりり",     image: showroomAvatar("1135202") },
    { name: "なつりり",       image: showroomAvatar("1133559") },
    { name: "サーフィンサンサン", image: showroomAvatar("1133436") },
    { name: "サンサン",       image: showroomAvatar("1132347") },
    { name: "しょきりり",     image: showroomAvatar("1131522") },
    { name: "カルアと里季",   image: showroomAvatar("1130485") }
  ]
};
