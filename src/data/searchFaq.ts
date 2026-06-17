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
    label: "出演情報",
    title: "次に会える予定を探す",
    copy: "直近の出演、イベント、チケットや詳細リンクを確認できます。",
    href: "#next"
  },
  {
    label: "配信",
    title: "SHOWROOMで応援する",
    copy: "ルーム情報、配信への入口、アバター、フォロー導線をまとめています。",
    href: "#showroom"
  },
  {
    label: "写真",
    title: "写真と近況を見る",
    copy: "ギャラリー、Instagram、SNS更新への導線をまとめています。",
    href: "#gallery"
  },
  {
    label: "プロフィール",
    title: "夏凪里季さんを知る",
    copy: "フレキャン、プロフィール、インタビュー、カルアちゃん情報を確認できます。",
    href: "#profile"
  }
];

export const searchFaqs: SearchFaq[] = [
  {
    question: "夏凪里季さんの次の出演予定はどこで見られますか？",
    answer:
      "このFan Scheduleの「次の出演」と「スケジュール」で、直近の出演予定、イベント、チケットや詳細リンクを確認できます。",
    href: "#next",
    linkLabel: "次の出演を見る"
  },
  {
    question: "SHOWROOMはどこから応援できますか？",
    answer:
      "SHOWROOMセクションからルームへ移動できます。フォロー、コメント、ギフトなどで配信を応援できます。",
    href: "#showroom",
    linkLabel: "SHOWROOM情報を見る"
  },
  {
    question: "夏凪里季さんはフレキャン2025の何番ですか？",
    answer:
      "フレキャン2025 Entry No.306です。関連リンクやインタビューはプロフィール、インタビュー、リンク欄に整理しています。",
    href: "#profile",
    linkLabel: "プロフィールを見る"
  },
  {
    question: "SNSや写真はどこで見られますか？",
    answer:
      "X、Instagram、Threads、TikTok、note、Lit.Linkへのリンクをまとめています。写真はギャラリーからスライドショーで見られます。",
    href: "#gallery",
    linkLabel: "写真を見る"
  },
  {
    question: "カルアちゃんの紹介はありますか？",
    answer:
      "プロフィール後のカルアちゃんセクションで、里季ちゃんの愛犬カルアちゃんの写真と紹介を見られます。",
    href: "#kalua",
    linkLabel: "カルアちゃんを見る"
  }
];
