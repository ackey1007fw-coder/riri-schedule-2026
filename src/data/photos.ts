export type GalleryPhoto = {
  src: string;
  alt: string;
  // 里季さん以外の方が撮影・投稿した写真のときだけ、撮影者への動線として付ける
  credit?: { label: string; url: string };
};

export const summerYukataPhoto: GalleryPhoto = {
  src: "/images/gallery/g90.jpg",
  alt: "白地にピンクと紫の大きな花柄の浴衣をまとい、赤い花の髪飾りをつけたアップヘアで明るく笑う夏凪里季さん（X『今年初めての浴衣』より）"
};

export const familyYukataPhoto: GalleryPhoto = {
  src: "/images/gallery/g91.jpg",
  alt: "ピンクと紫の花柄浴衣の夏凪里季さん、青紫の花柄浴衣のお姉さん、ピンクの浴衣風ウェアを着た愛犬カルアちゃんの3ショット。お姉さんの顔は『姉』の文字で隠されている（X『お姉ちゃんと一緒に浴衣』より）"
};

// 2026.8.19 Instagram「今年初浴衣✨️着ただけだけど」のカルーセル2・3枚目
// （1枚目は 8/2 のX投稿と同じ写真のため g90 = summerYukataPhoto を再利用する）
const yukataKaluaTwoShotPhoto: GalleryPhoto = {
  src: "/images/gallery/g112.jpg",
  alt: "白地にピンクと紫の花柄の浴衣に赤い花の髪飾りをつけた夏凪里季さん（左）と、青紫の花柄の浴衣を着た女性（右）が、抱き上げた愛犬カルアちゃんを間にして笑う3ショット。窓のある室内での1枚"
};

const yukataKaluaPhoto: GalleryPhoto = {
  src: "/images/gallery/g113.jpg",
  alt: "白地にピンクと紫の花柄の浴衣に赤い花の髪飾りをつけた夏凪里季さんが、浴衣風ウェアを着た愛犬カルアちゃんを抱いてほほえむ2ショット"
};

// 2026.8.23 X『ピッパラの樹』A班3ステ目終了後の3ショット。本人アカウントの本人写真のため credit なし
const pipparaThirdShowEndThreeShotPhoto: GalleryPhoto = {
  src: "/images/gallery/g120.jpg",
  alt: "『ピッパラの樹』A班3ステ目終演後の舞台衣装3ショット。右に夏凪里季さん、左にオルガ役の雪乃さん、中央上にガイヤール夫人役の三笘とむさん。雪乃さんととむさんはピースサインをしている"
};

// 2026.8.23 X『ピッパラの樹』A班3ステ目の当日告知。本人アカウントの本人写真のため credit なし
const pipparaThirdShowUmbrellaPhoto: GalleryPhoto = {
  src: "/images/gallery/g119.jpg",
  alt: "黒い傘を差し、ネイビーのポロシャツ姿でカメラを見つめる夏凪里季さん。青いバッグストラップが見える屋外での自撮り（X『#ピッパラの樹 本日3ステ目！』より）"
};

// 2026.8.28 X『ピッパラの樹』A班5ステ目の当日告知。本人アカウントの本人写真のため credit なし
const pipparaFifthShowTwoShotPhoto: GalleryPhoto = {
  src: "/images/gallery/g121.jpg",
  alt: "『ピッパラの樹』の舞台衣装2ショット。左に白いミニハットと青いベスト、ストライプのブラウス姿の夏凪里季さん。右に白い衣装とレースのヘッドバンド姿の共演者が赤い薔薇を持っている。2人ともカメラに笑顔を向けている（X『#ピッパラの樹 本日5ステ目！』より）"
};

// 2026.8.29 X『ピッパラの樹』A班千秋楽の当日告知。本人アカウントの本人写真のため credit なし
const pipparaSenshurakuKkPhoto: GalleryPhoto = {
  src: "/images/gallery/g124.jpg",
  alt: "『ピッパラの樹』の舞台衣装2ショット。左に白いミニハットと青いベスト、ストライプのブラウス姿の夏凪里季さん。右に眼鏡と緑のジャケット、茶色のネクタイ姿のチェリッシュ役kkさん(@catkkact)。2人ともピースサインをしている（X『#ピッパラの樹 A班本日千秋楽です』より）"
};

// 2026.8.28 23:53 X。ポール役ミヤビさん(@miyabidayo_o)の投稿を引用した2ショット
const miyabiFifthShowCredit = {
  label: "写真: ミヤビ（@miyabidayo_o）の投稿",
  url: "https://x.com/miyabidayo_o/status/2093337245839396999"
};

const pipparaFifthShowMiyabiCheekPhoto: GalleryPhoto = {
  src: "/images/gallery/g122.jpg",
  alt: "『ピッパラの樹』の舞台衣装2ショット。左に白い花柄のベストと黒いシャツ姿のポール役ミヤビさん(@miyabidayo_o)、右に白いミニハットと青いベスト、ストライプのブラウス姿の夏凪里季さん。里季さんは頰に手を添え、片目を閉じている",
  credit: miyabiFifthShowCredit
};

const pipparaFifthShowMiyabiPointPhoto: GalleryPhoto = {
  src: "/images/gallery/g123.jpg",
  alt: "『ピッパラの樹』の舞台衣装2ショット。白い花柄のベスト姿のポール役ミヤビさん(@miyabidayo_o)が、白いミニハットと青いベスト、ストライプのブラウス姿の夏凪里季さんの頰を人差し指で指している。里季さんはカメラに向かって笑っている",
  credit: miyabiFifthShowCredit
};

// 2026.8.21 X『ピッパラの樹』A班2公演目の告知投稿の3ショット
const pipparaSecondShowThreeShotPhoto: GalleryPhoto = {
  src: "/images/gallery/g114.jpg",
  alt: "『ピッパラの樹』の舞台衣装で並ぶ3ショット。左にガイヤール夫人役の三笘とむさん、中央に白いミニハットと青いベスト姿の夏凪里季さん、右に白い衣装とレースのヘッドバンド姿のルワン役せいかさん。3人ともカメラに笑顔を向けている"
};

export const galleryFeatures = [
  {
    date: "2026.8.19",
    kicker: "Summer Moment",
    heading: "今年初浴衣。カルアさんも一緒に",
    title: "今年初浴衣✨️着ただけだけど",
    copy: "白地にピンクと紫の花柄の浴衣に、赤い花の髪飾り。愛犬カルアちゃんを抱いた写真も添えて「カルアさんお付き合いありがとう」と綴った、夏らしい3枚組のInstagram投稿です。",
    url: "https://www.instagram.com/p/DcOFaLGiYhP/",
    photo: yukataKaluaPhoto
  },
  {
    date: "2026.8.3",
    kicker: "Family Summer Moment",
    heading: "家族で浴衣。カルアちゃんも一緒👘",
    title: "お姉ちゃんと一緒に浴衣👘 実はカルアさんも着てるの✨️",
    copy: "花柄の浴衣で並んだ里季さんとお姉さん、その真ん中には浴衣風ウェアのカルアちゃん。姉妹と愛犬で夏を楽しむ、明るくあたたかな家族ショットです。",
    url: "https://x.com/frecam2025_0306/status/2084028970237083833",
    photo: familyYukataPhoto
  },
  {
    date: "2026.8.2",
    kicker: "Summer Moment",
    heading: "2026年、最初の浴衣",
    title: "今年初めての浴衣👘",
    copy: "白地にピンクと紫の花が咲く浴衣と、アップヘアに添えた赤い花飾り。明るい髪色にも映える、2026年夏の初浴衣ショットです。",
    url: "https://x.com/frecam2025_0306/status/2083666581314519466",
    photo: summerYukataPhoto
  }
];

// 2026.8.1 里季さんが引用RTした、なおさん(@iito_nya)の投稿の写真につけるクレジット
const naoCredit = {
  label: "写真: なお（@iito_nya）の投稿",
  url: "https://x.com/iito_nya/status/2083336339282633061"
};

// 2026.8.11 ミヤビさん(@miyabidayo_o)の投稿の写真につけるクレジット
const miyabiCredit = {
  label: "写真: ミヤビ（@miyabidayo_o）の投稿",
  url: "https://x.com/miyabidayo_o/status/2087112482506920007"
};

// メイソンリー（写真をそのまま全体表示）で並べるギャラリー写真
export const galleryPhotos: GalleryPhoto[] = [
  // 2026.8.29 16:09 X「#ピッパラの樹 A班本日千秋楽です」本人投稿。creditなし
  pipparaSenshurakuKkPhoto,
  // 2026.8.28 23:53 X「今日はポール様に完全にやられました。」ミヤビさん(@miyabidayo_o)の投稿を引用
  pipparaFifthShowMiyabiCheekPhoto,
  pipparaFifthShowMiyabiPointPhoto,
  // 2026.8.28 16:21 X「#ピッパラの樹 本日5ステ目！」本人投稿。creditなし
  pipparaFifthShowTwoShotPhoto,
  // 2026.8.23 22:06 X「#ピッパラの樹 3ステ終了いたしましたー！！」本人投稿。creditなし
  pipparaThirdShowEndThreeShotPhoto,
  // 2026.8.23 10:49 X「#ピッパラの樹 本日3ステ目！」本人投稿。creditなし
  pipparaThirdShowUmbrellaPhoto,
  // 2026.8.21 X「明日8/22(土)12時から #ピッパラの樹 2公演目です」本人投稿。creditなし
  pipparaSecondShowThreeShotPhoto,
  // 2026.8.19 Instagram「今年初浴衣✨️着ただけだけど」本人投稿。creditなし
  // 1枚目は 8/2 のX投稿と同じ写真（g90）なので、ギャラリーへは重複追加しない
  yukataKaluaTwoShotPhoto,
  yukataKaluaPhoto,
  // 2026.8.18 X「#ピッパラの樹 公演1日目終了しました！」本人投稿。creditなし
  { src: "/images/gallery/g111.jpg", alt: "ストライプのブラウスに青いベスト、首元の大きなリボン、白いミニハットの衣装でウインクし、右手の人差し指を立てている夏凪里季さん（『ピッパラの樹』A班初日終了後）" },
  // 2026.8.17 X「#ピッパラの樹 コラボチェキのオススメはこちらです」本人投稿。creditなし
  { src: "/images/gallery/g109.jpg", alt: "白いミニハットに青緑のベスト姿の夏凪里季さん（左）と、白いシャツにチェックのベスト・ネクタイ姿の共演者（右）。『ピッパラの樹』の舞台衣装での2ショット" },
  { src: "/images/gallery/g110.jpg", alt: "白いミニハットに青緑のベスト姿の夏凪里季さん（左）と、白いシャツに茶色のベスト・ネクタイ姿の共演者（右）。『ピッパラの樹』の舞台衣装での2ショット" },
  // 2026.8.15 X「ノリで滝行してきた」本人投稿。creditなし
  { src: "/images/gallery/g115.jpg", alt: "滝を背景に、濡れた白い半袖Tシャツと黒いサングラス姿で笑顔のピースサインをする夏凪里季さん。髪は濡れ、シルバーブルーのロングネイルが見える（X『ノリで滝行してきた』より）" },
  // 2026.8.14 Instagram「原宿にこんな綺麗な場所があること知らなかった」本人投稿3枚。creditなし
  { src: "/images/gallery/g116.jpg", alt: "夜の屋外の木製階段に立つ夏凪里季さんの全身が分かる縦写真。白いノースリーブのトップスにライトブルーのデニム、淡い色のショルダーバッグ。手すりにイルミネーション、背景に都市の夜景（原宿・Instagramより）" },
  { src: "/images/gallery/g117.jpg", alt: "カメラに近い構図で、片手を髪付近に添えた夏凪里季さん。白いノースリーブのトップスにデニム、淡い色のショルダーバッグ。背景はイルミネーションの灯る夜の階段と都市の夜景（原宿・Instagramより）" },
  { src: "/images/gallery/g118.jpg", alt: "イルミネーションの灯る手すりに片手を置き、横方向へ視線を向けた夏凪里季さん。白いノースリーブのトップスにデニム、淡い色のショルダーバッグ。背景は夜の都市の夜景（原宿・Instagramより）" },
  // 2026.8.14 X「#ピッパラの樹 イケメンすぎるねねさん」本人投稿。creditなし
  { src: "/images/gallery/g108.jpg", alt: "チェック柄の半袖シャツ姿でピースをする夏凪里季さん（右）と、短い黒髪に水色のトップスでピースをするねねさん(@nene_matu)（左）。ハンガーラックのある室内での2ショット（X『#ピッパラの樹』より）" },
  // 2026.8.13 X サンリオピューロランド
  { src: "/images/gallery/g106.jpg", alt: "黄色いソファを背景に、黒いトップスと黒い垂れ耳のキャラクターカチューシャ姿で両手を広げて笑う夏凪里季さん。テーブルにはキャラクターをモチーフにしたカレー、ラーメン、フライドチキン、ポテト、ドリンクが並ぶ（サンリオピューロランド）" },
  // 2026.8.12 Instagram「ずっと行きたかったお店でお祝いしてくれた」なおちゃんとのお祝いディナー（4枚）
  { src: "/images/gallery/g102.jpg", alt: "白いレース襟のブラウス姿の夏凪里季さんと、黒いトップス姿のなおさんが、夜の駅構内で肩を寄せて笑う2ショット自撮り" },
  { src: "/images/gallery/g103.jpg", alt: "黒い皿に盛られたレアのステーキ。ルッコラとチーズのサラダ、焼いたズッキーニとアスパラ、粒マスタードと塩が添えられている" },
  { src: "/images/gallery/g104.jpg", alt: "生ハムをぐるりと飾った白いピッツァ。中央に卵がのり、削ったチーズがたっぷりかかっている" },
  { src: "/images/gallery/g105.jpg", alt: "「リリちゃん 誕生日おめでとう。舞台頑張ってね」と書かれたデザートプレートを前に笑う夏凪里季さん。ケーキ、ロールケーキ、マカロン、ベリーとコスメデコルテのギフトバッグが並ぶ" },
  // 2026.8.11 ミヤビさん(@miyabidayo_o)のX。稽古での夏凪里季さんとの2ショット
  { src: "/images/gallery/g107.jpg", alt: "稽古での2ショット。漫画のコマがプリントされた黒いTシャツにシルバーのボブヘアでピースをするミヤビさん(@miyabidayo_o)と、ピンクのポロシャツにブルーグレーのロングネイルでピースをする夏凪里季さん", credit: miyabiCredit },
  // 2026.8.11 X「阿佐ヶ谷祭りに参戦した🍧」
  { src: "/images/gallery/g101.jpg", alt: "赤・黄・緑・ピンク・白など色とりどりの吹き流しが天井いっぱいに下がる夜の商店街アーケードで、右手を頭に添えてほほえむ夏凪里季さん。黒い透かし編みのカーディガンに白いトップス、ライトブルーのデニム、白いショルダーバッグを合わせた夏祭りコーデ。背景には行き交う来場者たち" },
  // 2026.8.10 X「#ピッパラの樹 みんな予約してくれたかな？？」
  { src: "/images/gallery/g100.jpg", alt: "暗い舞台裏で腕を伸ばして自撮りする夏凪里季さん。黒いチュールとリボン、パールをあしらった白いミニハットを髪に留め、ベージュのストライプブラウスに大きなボウタイ、紺色のベストという『ピッパラの樹』A班「アナスタジー・ド・ブロワ」の衣装姿で、赤いリップの笑顔をカメラに向けている" },
  // 2026.8.8 X「一緒にプール行く？」
  { src: "/images/gallery/g99.jpg", alt: "屋外プールのサイドに立ち、赤いミニーマウス柄の大きな浮き輪を左手で抱えて笑う夏凪里季さん。黒いホルターネックのフリルワンピース水着に、防水ケースに入れたスマートフォンを首から下げ、足元は白いクロスサンダル。背景には水遊びをする人たちでにぎわうプール、緑のマットの通路、観覧車と山並み、青空に浮かぶ白い雲" },
  // 2026.8.7 X「かわいいパン屋さんを見つけた(☆ω☆)」
  { src: "/images/gallery/g98.jpg", alt: "白い大理石調のテーブルに着き、砂糖をまぶしたツイストドーナツとクリームをはさんだパン、アイスラテをのせたプレートを両手で持ってほほえむ夏凪里季さん。白いフリルの透かし編みトップスにデニム、ハート型のネックレス。背景は白い壁のベーカリーカフェの店内" },
  // 2026.8.6 X「トイストーリー展に行ってそのままトイストーリー5も見てきた🤖」
  { src: "/images/gallery/g97.jpg", alt: "レースをあしらったグリーンのティアードワンピースで笑顔の夏凪里季さん。背景はレックスやジェシー、エイリアンなどトイ・ストーリーのキャラクターと「THE FIRST FAN」の文字が並ぶフォトスポット" },
  // 2026.8.4 Instagram「ディナー後にクルーズ船乗ってきた⚓️」東京湾ナイトクルーズ（5枚 / Night Cruise Logコーナーと共用）
  {
    src: "/images/gallery/g92.jpg",
    alt: "夜景を背にした窓際で、ミントグリーンのドリンクが入ったミルクボトル型グラスを掲げてほほえむ夏凪里季さん。白いフリルの半袖トップス姿"
  },
  {
    src: "/images/gallery/g93.jpg",
    alt: "船内の席で、右手にオレンジジュースのミルクボトル、左手に淡いブルーのドリンクのグラスを持ち、目を細めて笑う夏凪里季さん"
  },
  {
    src: "/images/gallery/g94.jpg",
    alt: "夜の東京湾から見上げたレインボーブリッジ。ライトアップされた橋の下に、湾岸のビル群の灯りが帯のように広がっている"
  },
  {
    src: "/images/gallery/g95.jpg",
    alt: "船内のカウンターに並んだトレー。ミルクボトル型のグラスに、ミントグリーン・オレンジ・レッド・コーラなど色とりどりのソフトドリンクが注がれている"
  },
  {
    src: "/images/gallery/g96.jpg",
    alt: "テーブルに広げられた「LADY CRYSTAL BOARDING TICKET」と印字された3枚の乗船チケット"
  },
  // 2026.8.3 X「お姉ちゃんと一緒に浴衣」姉妹とカルアちゃんの家族浴衣ショット
  familyYukataPhoto,
  // 2026.8.2 X「今年初めての浴衣👘」2026年夏の初浴衣ショット
  summerYukataPhoto,
  // 2026.8.1 X「なおちゃんがお祝いしてくれた😭✨️💞 だいすき！」お友達のなおさん(@iito_nya)の投稿を引用（4枚）
  { src: "/images/gallery/g86.jpg", alt: "夜の駅構内で、なおさん(@iito_nya)と肩を寄せ合って笑顔の2ショット自撮り。夏凪里季さんは白いレース襟のブラウス姿", credit: naoCredit },
  { src: "/images/gallery/g87.jpg", alt: "同じ場所での2ショット自撮り。夏凪里季さんの隣で、なおさん(@iito_nya)がピースサインを見せている", credit: naoCredit },
  { src: "/images/gallery/g88.jpg", alt: "生ハムをぐるりと巻いた白いピッツァ。中央に目玉焼きがのり、削ったチーズがたっぷりかかっている", credit: naoCredit },
  { src: "/images/gallery/g89.jpg", alt: "黒い皿に盛られたレアのステーキ。ルッコラとチーズのサラダ、焼きアスパラ、粒マスタードが添えられている", credit: naoCredit },
  // 2026.8.1 X「ハタチの誕生日は何ヶ月引っ張ってもいいって聞きました」お祝いのデザートプレート
  { src: "/images/gallery/g85.jpg", alt: "カフェのテーブルで、ケーキやマカロン・ベリーが並び「リリちゃん 誕生日おめでとう。舞台頑張ってね」と手書きされたデザートプレートを前にほほえむ夏凪里季さん。白いレースのフリルブラウスに、髪をゆるくまとめたスタイル" },
  // 2026.7.31 X「夏だね>  ̫<」イルミネーションの灯る夜の階段にて
  { src: "/images/gallery/g84.jpg", alt: "イルミネーションが灯る夜の木製階段の上でほほえむ夏凪里季さん。白いレースのスクエアネックトップスにライトブルーのワイドデニム、淡いピンクのショルダーバッグ（X「夏だね」より）" },
  // 2026.7.30 Instagram「📷⟡.·」街撮りのストリートスナップ（4枚）
  { src: "/images/gallery/g80.jpg", alt: "金網フェンスの手すりにもたれ、肩越しにカメラへ視線を向ける夏凪里季さん。黒のジップジャケットに、CHARLES & KEITH のペールピンクのリボンバッグ（ストリートスナップ）" },
  { src: "/images/gallery/g81.jpg", alt: "耳元に手を添えて笑う夏凪里季さんのアップショット。黒いジップジャケットの襟元にハートモチーフのシルバーネックレスがのぞく（ストリートスナップ）" },
  { src: "/images/gallery/g82.jpg", alt: "自転車が並ぶ高架下のトンネルで、ジャケットの襟元に手をかけてまっすぐ前を見る夏凪里季さん。白いリブタンクトップとチャコールのワイドパンツ、シルバーバックルの黒ベルト" },
  { src: "/images/gallery/g83.jpg", alt: "ワイヤーフェンスと緑を背に、ペールピンクのリボンバッグを肩にかけて横を向き笑う夏凪里季さん。前髪をおろしたポニーテール（ストリートスナップ）" },
  // 2026.7.29 TikTok「人生で初めて髪を染めた どっちの方がタイプ？」イメチェン動画より
  { src: "/images/gallery/g79.jpg", alt: "人生で初めて染めたという明るいブラウンのロングヘアでカメラを見つめる夏凪里季さん。白いシアー素材のトップスにデニム、屋外での自撮り（TikTok「人生で初めて髪を染めた」より）" },
  // 2026.7.28 X「みてみて！ニュース載ってた🎶」Xのトレンドまとめに掲載された記念のスクリーンショット（2枚）
  { src: "/images/gallery/g77.jpg", alt: "夏凪里季さんのX投稿「みてみて！ニュース載ってた🎶」。トレンド「Xで夏らしい新ネイル投稿が続々 キラキラデザインが人気」のカードが添えられている" },
  { src: "/images/gallery/g78.jpg", alt: "Xのトレンドまとめ本文のスクリーンショット。「夏凪里季さんがグレーグラデのキラキラデザインを投稿したり」という一節に赤い線が引かれている" },
  // 2026.7.28 Instagram「刺さってた薔薇ももらえて幸せ🌹」パリアッチョ 丸の内でのバースデーサプライズ（4枚）
  { src: "/images/gallery/g73.jpg", alt: "ライトアップされた東京駅丸の内駅舎を背景に、白い包みに一輪だけ入った濃いピンクの薔薇" },
  { src: "/images/gallery/g74.jpg", alt: "夜の東京駅丸の内駅舎の前で、一輪の薔薇とYVES SAINT LAURENTの紙袋を手にほほえむ夏凪里季さん。白いオーガンジーのブラウスにドット柄のロングスカート" },
  { src: "/images/gallery/g75.jpg", alt: "YVES SAINT LAURENTの箱と一緒に、フロストガラスに金のロゴが輝く香水「LIBRE」のボトルを手のひらにのせたところ" },
  { src: "/images/gallery/g76.jpg", alt: "「Happy Birthday Riri」と描かれた豪華なバースデープレートと一輪挿しの薔薇を前に、キャンドルの灯りのなかで笑顔の夏凪里季さん（パリアッチョ 丸の内）" },
  // 2026.7.28 X「デジカメをGETしてから写真撮るのが楽しくて仕方ない📸」
  { src: "/images/gallery/g72.jpg", alt: "ディズニーシーの岩肌を背景に、シルバーのコンパクトデジタルカメラを顔の横に掲げてほほえむ夏凪里季さん。いちご柄の白いキャミソールとハートのネックレス" },
  // 2026.7.27 Instagram「生誕祭ソロショット📸✨️」7/19の生誕祭より（4枚）
  { src: "/images/gallery/g68.jpg", alt: "ティアラをつけ、たくさんのプレゼントの紙袋を抱えて笑顔の夏凪里季さん（生誕祭ソロショット）" },
  { src: "/images/gallery/g69.jpg", alt: "「HAPPY BIRTHDAY」と描かれたバースデープレートを、線香花火の光とともに掲げて目を細めて笑う夏凪里季さん" },
  { src: "/images/gallery/g70.jpg", alt: "フォークを手に、生クリームたっぷりのバースデープレートを持ってほほえむ夏凪里季さん" },
  { src: "/images/gallery/g71.jpg", alt: "「りりたん 誕生日おめでとう」のうちわやお花、たくさんの紙袋が並んだ生誕祭のプレゼント" },
  // 2026.7.27 X「ネイル変えた🎶」ブルーグレー×シルバーラメのネイル
  { src: "/images/gallery/g67.jpg", alt: "くすんだブルーグレーにシルバーラメのアクセントを添えたロングネイルを、顔の前にかざして見せる夏凪里季さんのセルフィー" },
  // 2026.7.26 X『ピッパラの樹』A班 稽古初日レポート
  { src: "/images/gallery/g66.jpg", alt: "淡いブルーグレーのシャーリングトップスで鏡越しに自撮りする夏凪里季さん（『ピッパラの樹』A班 稽古初日）" },
  // 2026.6.28 X【出演情報】劇団ココア『ピッパラの樹』出演告知ポートレート
  { src: "/images/gallery/g65.jpg", alt: "白いレース襟のブラウスでカメラを見つめる夏凪里季さん。劇団ココア『ピッパラの樹』出演告知ポートレート" },
  // 2026.6.28 TikTok「犬って人間の4倍の速度で時間が進んでるらしい」カルアちゃんと一緒
  { src: "/images/gallery/g64.jpg", alt: "車内で愛犬カルアちゃんを抱きしめて笑顔の夏凪里季さん（TikTok「犬って人間の4倍の速度で…」）" },
  // 2026.6.27 TikTok「階段を登ったら、、、」カルアちゃん
  { src: "/images/gallery/g63.jpg", alt: "階段の上から顔をのぞかせる愛犬カルアちゃん（TikTok「階段を登ったら、、、」）" },
  // 2026.6.27 Instagram「20♡」大学のお友達が20歳のお祝い
  { src: "/images/gallery/g60.jpg", alt: "「Riri Happy 20th Birthday」のバースデープレート。マカロンやケーキ、キャンドルと黄色いバラの花束" },
  { src: "/images/gallery/g61.jpg", alt: "白いレースのトップスでバースデープレートの前に座り笑顔の夏凪里季さん（20歳の誕生日パーティー）" },
  { src: "/images/gallery/g62.jpg", alt: "黄色いバラの花束を抱え、CHARLES & KEITHのプレゼントと一緒に笑顔の夏凪里季さん" },
  // 2026.6.27 X「初めてのお酒🍻1杯で赤くなった」
  { src: "/images/gallery/g58.jpg", alt: "居酒屋で初めてのお酒（SUNTORYのグラス）を掲げる夏凪里季さん。黒スウェットに赤い「iii」ロゴ" },
  { src: "/images/gallery/g59.jpg", alt: "グラスを口に当ててお酒を飲む夏凪里季さん。ほんのり頰が赤くなった横顔" },
  // 2026.6.26 TikTok「可愛い子に吹いてる風はここから？」のサムネ
  { src: "/images/gallery/g57.jpg", alt: "ピンクのパーカーで目を閉じて笑う夏凪里季さん（TikTok「可愛い子に吹いてる風はここから？」）" },
  // 2026.6.24-25 20歳のお誕生日・お礼。振袖姿の記念ポートレート（ご本人X投稿／インスタストーリー）。
  { src: "/images/gallery/g55.jpg", alt: "水色〜黄色のグラデーション着物で、シルバーの「20」バルーンを掲げる後ろ姿の夏凪里季さん（20歳記念）" },
  { src: "/images/gallery/g54.jpg", alt: "振袖姿で南天の枝を手に振り返る、20歳になった夏凪里季さん（インスタストーリー）" },
  { src: "/images/gallery/g53.jpg", alt: "振袖姿で赤い和傘を手に、20歳の誕生日を迎えた夏凪里季さんの記念ポートレート" },
  // 2026.6.25 ファンルームでの近況より
  { src: "/images/gallery/g56.jpg", alt: "スターバックスの新作フラペチーノとハムのサンドイッチ（ファンルームでの近況より）" },
  // 2026.6.23 インスタ投稿「10代最後の日」より（18枚）。新しい順に先頭へ。
  { src: "/images/gallery/g34.jpg", alt: "Fresh Campus Contest 2025の審査員特別賞のトロフィーを持つ夏凪里季さん" },
  { src: "/images/gallery/g35.jpg", alt: "夜の街で黒のマキシ丈ワンピース姿の夏凪里季さん" },
  { src: "/images/gallery/g36.jpg", alt: "制服姿（白シャツにリボン）のポートレートの夏凪里季さん" },
  { src: "/images/gallery/g37.jpg", alt: "制服姿で階段でピースサインをする夏凪里季さん" },
  { src: "/images/gallery/g38.jpg", alt: "キャンパスでグレートップス姿のポートレートの夏凪里季さん" },
  { src: "/images/gallery/g39.jpg", alt: "白いドット柄ワンピースで壁にもたれる夏凪里季さん（撮影オフショット）" },
  { src: "/images/gallery/g40.jpg", alt: "ひまわり畑でのセルフィーの夏凪里季さん" },
  { src: "/images/gallery/g41.jpg", alt: "海辺で浴衣姿で振り返る夏凪里季さん" },
  { src: "/images/gallery/g42.jpg", alt: "コンテストの様子をモニター越しに映した舞台裏のショット" },
  { src: "/images/gallery/g43.jpg", alt: "ネイビーのニットポロと白いチュールスカートで屋外に立つ夏凪里季さん" },
  { src: "/images/gallery/g44.jpg", alt: "和の建物で編みおろしヘアにレースの衣装で微笑む夏凪里季さん" },
  { src: "/images/gallery/g45.jpg", alt: "夜のイルミネーションを背にしたセルフィーの夏凪里季さん" },
  { src: "/images/gallery/g46.jpg", alt: "撮影データを選ぶ作業中のノートPC（赤い衣装のポートレート）" },
  { src: "/images/gallery/g47.jpg", alt: "ベージュコートにレオパード柄スヌードのファッション撮影の夏凪里季さん" },
  { src: "/images/gallery/g48.jpg", alt: "誕生日のバルーンブーケを抱える夏凪里季さん" },
  { src: "/images/gallery/g49.jpg", alt: "SHOWROOMゲスト控室の前でピースサインをする夏凪里季さん" },
  { src: "/images/gallery/g50.jpg", alt: "台本を手にリハーサル中の夏凪里季さん" },
  { src: "/images/gallery/g51.jpg", alt: "あじさいの前でお散歩する愛犬カルアちゃん" },
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
  { src: "/images/gallery/g33.jpg", alt: "シャンパングラスを手にした夏凪里季さん（20歳前日・今日まではノンアル）" },
  { src: "/images/gallery/g52.jpg", alt: "ステーキ店でハンバーグを前に猫の手ポーズでおどける夏凪里季さん" }
];

// 最新のギャラリー更新お知らせ
export const galleryUpdate: {
  date: string;
  platform: "X" | "Instagram" | "TikTok";
  note: string;
  url: string;
} = {
  date: "2026.8.29",
  platform: "X",
  note: "『ピッパラの樹』A班千秋楽当日、チェリッシュ役kkさんとの衣装2ショット",
  url: "https://x.com/frecam2025_0306/status/2093597005444726999"
};
