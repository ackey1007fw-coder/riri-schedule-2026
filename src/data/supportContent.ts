export type SupportContentItem = {
  title: string;
  description: string;
};

export const supportUrl = "https://premiumgoyukajet.hp.peraichi.com";

export const supportContent: SupportContentItem[] = [
  {
    title: "エールカード",
    description:
      "会場に掲示される応援メッセージカード。キャストからのメッセージも付いてくる。"
  },
  {
    title: "メッセージ動画",
    description: "約1分のオリジナル応援メッセージ動画を届けられる。"
  },
  {
    title: "キャストCM",
    description: "劇場モニターで公演期間中に放映されるキャストCM。"
  },
  {
    title: "応援チケット",
    description: "キャストメッセージ付きチェキがもらえる応援チケット。"
  }
];
