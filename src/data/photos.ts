export type GalleryPhoto = {
  src: string;
  alt: string;
};

// メイソンリー（写真をそのまま全体表示）で並べるギャラリー写真
export const galleryPhotos: GalleryPhoto[] = [
  { src: "/images/gallery/g01.jpg", alt: "舞台『月シア別冊』ステージ上の夏凪里季さん" },
  { src: "/images/gallery/g02.jpg", alt: "舞台『テオリデア』の衣装姿の夏凪里季さん" },
  { src: "/images/gallery/g03.jpg", alt: "愛犬カルアちゃんと寄り添う夏凪里季さん" },
  { src: "/images/gallery/g04.jpg", alt: "ケーキを手に笑顔の夏凪里季さん" },
  { src: "/images/gallery/g05.jpg", alt: "おでかけ先でのポートレートの夏凪里季さん" },
  { src: "/images/gallery/g06.jpg", alt: "舞台のカーテンコールで花束を持つ夏凪里季さん" },
  { src: "/images/gallery/g07.jpg", alt: "ピースサインで笑う夏凪里季さん" },
  { src: "/images/gallery/g08.jpg", alt: "舞台『月シア別冊』でのオフショットの夏凪里季さん" },
  { src: "/images/gallery/g09.jpg", alt: "ピクニックでアイスを楽しむ夏凪里季さん" },
  { src: "/images/gallery/g10.jpg", alt: "舞台衣装でのオフショットの夏凪里季さん" },
  { src: "/images/gallery/g11.jpg", alt: "スイーツを前に笑顔の夏凪里季さん" },
  { src: "/images/gallery/g12.jpg", alt: "ナチュラルなポートレートの夏凪里季さん" },
  { src: "/images/gallery/g13.jpg", alt: "やわらかな表情のポートレートの夏凪里季さん" },
  { src: "/images/gallery/g14.jpg", alt: "舞台『テオリデア』の衣装で笑う夏凪里季さん" },
  { src: "/images/gallery/g15.jpg", alt: "愛犬カルアちゃんを抱っこする夏凪里季さん" },
  { src: "/images/gallery/g16.jpg", alt: "舞台『月シア別冊』のキャストとの記念写真" },
  { src: "/images/gallery/g17.jpg", alt: "パフェを手にした夏凪里季さん" },
  { src: "/images/gallery/g18.jpg", alt: "舞台の楽屋でのオフショットの夏凪里季さん" },
  { src: "/images/gallery/g19.jpg", alt: "シャツ姿でピースサインの夏凪里季さん" },
  { src: "/images/gallery/g20.jpg", alt: "舞台『月シア別冊』キャストとのオフショット" },
  { src: "/images/gallery/g21.jpg", alt: "去年の誕生日、Happy Birthdayプレートを前に笑顔の夏凪里季さん" },
  { src: "/images/gallery/g22.jpg", alt: "移動中の車内で撮ったセルフィーの夏凪里季さん" },
  { src: "/images/gallery/g23.jpg", alt: "ピクニックでアイスクリームを囲む夏凪里季さんたち" },
  { src: "/images/gallery/g24.jpg", alt: "ピクニックで大きなアイスクリームを持って笑う夏凪里季さん" },
  { src: "/images/gallery/g25.jpg", alt: "チェック柄シャツでポニーテールのセルフィーの夏凪里季さん" },
  { src: "/images/gallery/g26.jpg", alt: "新宿のレストラン アカシアの店頭" },
  { src: "/images/gallery/g27.jpg", alt: "レストラン アカシアでロールキャベツシチューを前にする夏凪里季さん" },
  { src: "/images/gallery/g28.jpg", alt: "レストラン アカシアで頬杖をつく夏凪里季さん" },
  { src: "/images/gallery/g29.jpg", alt: "麻辣湯を前にサムズアップで笑う夏凪里季さん" },
  { src: "/images/gallery/g30.jpg", alt: "黒ジャケットの夏コーデでほほえむ夏凪里季さん（今日の夏凪）" },
  { src: "/images/gallery/g31.jpg", alt: "久しぶりのピンクネイルを見せる夏凪里季さん" },
  { src: "/images/gallery/g32.jpg", alt: "けいかさんの一日店長イベントでチェキスタッフを務めた夏凪里季さんとの集合写真" },
  { src: "/images/gallery/g33.jpg", alt: "シャンパングラスを手にした夏凪里季さん（20歳前日・今日まではノンアル）" }
];

// 最新のギャラリー更新お知らせ
export const galleryUpdate: {
  date: string;
  platform: "X" | "Instagram";
  note: string;
  url: string;
} = {
  date: "2026.6.23",
  platform: "X",
  note: "「今日まではノンアルだよ🍸」20歳前日のセルフィー",
  url: "https://x.com/frecam2025_0306/status/2069259662399357205"
};
