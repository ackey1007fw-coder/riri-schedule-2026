export type SearchIntent = {
  label: string;
  title: string;
  copy: string;
  href: string;
};

export type SearchFaq = {
  question: string;
  answer: string;
  href: string;
  linkLabel: string;
};

export const searchIntents: SearchIntent[] = [
  {
    label: "公演情報",
    title: "公演スケジュールを確認する",
    copy: "#ゆかJET やBaby Shark Liveなど、最新の公演日程を確認できます。",
    href: "#next"
  },
  {
    label: "出演歴",
    title: "これまでの活動を見る",
    copy: "舞台、CM、MV、ドラマ、ミスコンなど幅広い活動歴を確認できます。",
    href: "#highlights"
  },
  {
    label: "SNS",
    title: "SNSをチェックする",
    copy: "X、Instagram、TikTok、SHOWROOMの最新情報を確認できます。",
    href: "#links"
  },
  {
    label: "プロフィール",
    title: "吉井優花子さんを知る",
    copy: "プロフィール、経歴、受賞歴を確認できます。",
    href: "#profile"
  }
];

export const searchFaqs: SearchFaq[] = [
  {
    question: "チケットはどこで買える？",
    answer:
      "ご来場チケットは一般4,700円、特典付き前方席6,000円。予約サイトから申し込めます。",
    href: "https://premiumgoyukajet.hp.peraichi.com",
    linkLabel: "予約サイトを見る"
  },
  {
    question: "配信で観られる？",
    answer:
      "配信チケットは3,700円で、アーカイブは2026年8月6日まで視聴できます。遠方の方も予約サイトから申し込めます。",
    href: "https://premiumgoyukajet.hp.peraichi.com",
    linkLabel: "配信チケットを見る"
  },
  {
    question: "会場はどこ？",
    answer:
      "Air studio 両国（東京都墨田区両国2-18-7 地下1階）。両国駅から徒歩2分です。",
    href: "#next",
    linkLabel: "公演情報を見る"
  },
  {
    question: "SHOWROOMはどこ？",
    answer:
      "「秋田の優花子(ゆかこ)」のルームで配信しています。配信は不定期のため、SHOWROOMをフォローすると開始通知が届きます。",
    href: "#links",
    linkLabel: "SHOWROOMを見る"
  },
  {
    question: "初めてでも応援できる？",
    answer:
      "エールカードやメッセージ動画、応援チケットなど、初めての方でも参加しやすい応援メニューを用意しています。",
    href: "#support",
    linkLabel: "応援メニューを見る"
  },
  {
    question: "#ゆかJET とは何ですか？",
    answer:
      "吉井優花子さんがプロデュースする舞台シリーズ『GO,JET!GO!GO!』の愛称です。第1弾は2026年7月にAir studio 両国で上演されます。",
    href: "#next",
    linkLabel: "公演情報を見る"
  }
];
