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
    question: "#ゆかJET の次の公演はいつですか？",
    answer:
      "「次の公演」セクションで、#ゆかJET の公演日程・会場・チケット情報を確認できます。",
    href: "#next",
    linkLabel: "公演情報を見る"
  },
  {
    question: "吉井優花子さんのSNSはどこですか？",
    answer:
      "個人X（@mokoopy）、プロデュースX（@yukako_produce）、Instagram（@yoppy_777）、TikTok（@yukakoyoshii）、SHOWROOMで活動しています。",
    href: "#links",
    linkLabel: "SNSを見る"
  },
  {
    question: "秋田の優花子とは同じ人ですか？",
    answer:
      "SHOWROOMなどで使われている呼び名です。このページでは吉井優花子さん、Yukako、秋田の優花子の検索導線をまとめています。",
    href: "#showroom",
    linkLabel: "SHOWROOMを見る"
  },
  {
    question: "SHOWROOMはどこから見られますか？",
    answer:
      "SHOWROOMセクションから配信ルームを開けます。フォロワー数、ルームレベル、SHOWランクなどは取得できる範囲で自動更新します。",
    href: "#showroom",
    linkLabel: "配信ルームを見る"
  },
  {
    question: "吉井優花子さんはどんな活動をしていますか？",
    answer:
      "舞台俳優・プロデューサー・SHOWROOMライバーとして活動中。Baby Shark Live全国公演のシンガー、自主プロデュース公演 #ゆかJET、CM・MV・ドラマ出演、ミスコン受賞歴など多方面で活躍しています。",
    href: "#highlights",
    linkLabel: "活動歴を見る"
  },
  {
    question: "#ゆかJET とは何ですか？",
    answer:
      "吉井優花子さんがプロデュースする舞台シリーズ『GO,JET!GO!GO!』の愛称です。第1弾は2026年7月にAir studio 両国で上演されます。",
    href: "#next",
    linkLabel: "公演情報を見る"
  }
];
