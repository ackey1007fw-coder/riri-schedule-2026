const showroomAsset = (url: string) =>
  `/api/showroom-image?url=${encodeURIComponent(url)}`;

const showroomAvatar = (id: string, version = "110") =>
  showroomAsset(`https://static.showroom-live.com/image/avatar/${id}.png?v=${version}`);

export const petProfile = {
  name: "カルア",
  ownerLabel: "里季ちゃんの愛犬",
  breed: "ポメラニアンコーギー",
  gender: "女の子",
  image: showroomAvatar("1130485"),
  imageNote: "カルアと里季のSHOWROOMアバターを仮画像として表示中。実写写真が届いたら差し替えます。",
  ririImage: "/images/riri-portrait.jpg",
  lead:
    "りりちゃんのそばにいる、やさしい存在。活動の合間の癒やしとして、プロフィールにも少しだけ紹介します。",
  notes: [
    { label: "なまえ", value: "カルアちゃん" },
    { label: "犬種", value: "ポメラニアンコーギー" },
    { label: "性別", value: "女の子" },
    { label: "紹介", value: "りりちゃんの毎日をそっと支える大切な家族です。" }
  ]
};
