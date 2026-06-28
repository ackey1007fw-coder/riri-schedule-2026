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
    copy: "#ゆかJET の公演日程、会場、チケット情報を確認できます。",
    href: "#next"
  },
  {
    label: "SNS",
    title: "SNSをチェックする",
    copy: "プロデュース公演の最新情報やオフショットを確認できます。",
    href: "#links"
  },
  {
    label: "プロフィール",
    title: "吉井優花子さんを知る",
    copy: "プロフィール、活動歴、出演歴を確認できます。",
    href: "#profile"
  }
];

export const searchFaqs: SearchFaq[] = [
  {
    question: "#ゆかJET の次の公演はいつですか？",
    answer:
      "「次の公演」セクションで、#ゆかJET の公演日程・会場・チケット情報を確認できます。",
    href: "#next",
    linkLabel: "公演情報を見る"
  },
  {
    question: "吉井優花子さんのSNSはどこですか？",
    answer:
      "プロデュース公演の公式Xアカウント @yukako_produce で最新情報を発信しています。",
    href: "#links",
    linkLabel: "SNSを見る"
  },
  {
    question: "#ゆかJET とは何ですか？",
    answer:
      "吉井優花子さんがプロデュースする舞台シリーズ『GO,JET!GO!GO!』の愛称です。第1弾は2026年7月にAir studio 両国で上演されます。",
    href: "#next",
    linkLabel: "公演情報を見る"
  }
];
