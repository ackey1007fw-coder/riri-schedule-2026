// トップのお知らせバーに出す更新情報（新しいものを先頭に追加）
export type NewsItem = {
  date: string; // 表示用 例: "2026.6.16"
  label: string; // 出どころ 例: "X" / "Instagram" / "お知らせ"
  text: string;
  url: string;
};

export const news: NewsItem[] = [
  {
    date: "2026.6.28",
    label: "TikTok",
    text: "「犬って人間の4倍の速度で時間が進んでるらしい」愛犬カルアちゃんを抱きしめるショート動画",
    url: "https://vt.tiktok.com/ZSCSgjvth/"
  },
  {
    date: "2026.6.28",
    label: "お知らせ",
    text: "8月舞台情報解禁🎭 劇団ココア『ピッパラの樹』A班出演（8/18〜29・荻窪小劇場）チケット6/29 21:00〜予約開始",
    url: "https://x.com/frecam2025_0306/status/2071126356952588633"
  },
  {
    date: "2026.6.27",
    label: "TikTok",
    text: "「階段を登ったら、、、」愛犬カルアちゃんが階段の上からひょっこり顔を出すショート動画",
    url: "https://vt.tiktok.com/ZSCkNCo4k/"
  },
  {
    date: "2026.6.27",
    label: "Instagram",
    text: "「20♡」大学のお友達が20歳のお祝いをしてくれました✨️ バースデープレートと花束の誕生日パーティー",
    url: "https://www.instagram.com/p/DaFlCneidrP/"
  },
  {
    date: "2026.6.27",
    label: "X",
    text: "「初めてのお酒🍻1杯で赤くなった🙂‍↕️」居酒屋で人生初のお酒を楽しむセルフィー2枚",
    url: "https://x.com/frecam2025_0306/status/2070815544035651856"
  },
  {
    date: "2026.6.26",
    label: "TikTok",
    text: "「可愛い子に吹いてる風はここから？」ピンクのパーカーで笑顔のショート動画",
    url: "https://vt.tiktok.com/ZSCMCTCn4/"
  },
  {
    date: "2026.6.25",
    label: "TikTok",
    text: "「疲れてるんならやめれば？」アンニュイな表情のショート動画 #06 #女子大生 #aiko",
    url: "https://vt.tiktok.com/ZSCYwExgF/"
  },
  {
    date: "2026.6.25",
    label: "ファンルーム",
    text: "「新作飲んだ♪」スターバックスの新作ドリンクを楽しむ近況（ナギイチサマーの集い）",
    url: "https://www.showroom-live.com/room/profile?room_id=550336"
  },
  {
    date: "2026.6.25",
    label: "X",
    text: "「たくさんのお祝いありがとうございます🥹💕 幸せな1年になりそうです」お礼＆20歳バルーンの後ろ姿",
    url: "https://x.com/frecam2025_0306/status/2069937553705419224"
  },
  {
    date: "2026.6.24",
    label: "Instagramストーリー",
    text: "「20歳になりました✨」振袖姿で南天を手にした記念ショット",
    url: "https://www.instagram.com/__ririri__24"
  },
  {
    date: "2026.6.24",
    label: "X",
    text: "「ハタチになりました㊗️🎂✨️」振袖姿で20歳の記念ポートレート🎉",
    url: "https://x.com/frecam2025_0306/status/2069622787602538770"
  },
  {
    date: "2026.6.23",
    label: "Instagram",
    text: "「10代最後の日🌟思い出ありすぎて選びきれなかった📸」18枚＋動画の思い出ポスト",
    url: "https://www.instagram.com/p/DZ7SS2gCTv_/"
  },
  {
    date: "2026.6.23",
    label: "TikTok",
    text: "「19歳最後の日」BGMは『真夏の果実（cover）』、20歳前日のショート動画",
    url: "https://vt.tiktok.com/ZSCdDkd6K/"
  },
  {
    date: "2026.6.23",
    label: "X",
    text: "「今日まではノンアルだよ🍸」20歳前日のセルフィー",
    url: "https://x.com/frecam2025_0306/status/2069259662399357205"
  },
  {
    date: "2026.6.22",
    label: "X",
    text: "「1年ぶりくらいにネイルした💅🎶」久しぶりのネイルを見せるセルフィー",
    url: "https://x.com/frecam2025_0306/status/2068981048361595335"
  },
  {
    date: "2026.6.21",
    label: "けいかさんのX",
    text: "一日店長イベントを「夏凪チェキスタッフ」としてお手伝い🍛",
    url: "https://x.com/keika_1110/status/2068738405291483258"
  },
  {
    date: "2026.6.21",
    label: "X",
    text: "「今日の夏凪☀️🍉🌻🏊」夏コーデのセルフィー",
    url: "https://x.com/frecam2025_0306/status/2068651822282408298"
  },
  {
    date: "2026.6.20",
    label: "X",
    text: "「JRさん頑張りすぎてない⁉️」過剰謝罪にゆるっとツッコミ",
    url: "https://x.com/frecam2025_0306/status/2068251058242240805"
  },
  {
    date: "2026.6.19",
    label: "X",
    text: "「麻辣湯に野菜は要らない🥬」笑顔のセルフィー",
    url: "https://x.com/frecam2025_0306/status/2067775746735820830"
  },
  {
    date: "2026.6.18",
    label: "Instagram",
    text: "新宿「レストラン アカシア」でロールキャベツシチュー",
    url: "https://www.instagram.com/p/DZuYXoLiZ2z/"
  },
  {
    date: "2026.6.16",
    label: "X",
    text: "7/19 小峰萌楓ちゃんと合同生誕祭！20歳＆23歳のお祝い・予約受付中",
    url: "https://x.com/frecam2025_0306/status/2067054398493343769"
  }
];
