/**
 * 里季さんからの「ご協力お願いします」枠。
 * 期限つきの呼びかけなので、締切（JST）を過ぎたら自動で非表示になる。
 * 呼びかけが無いときは `null` にする。
 */
export type SupportCall = {
  /** 締切（JST・ISO8601）。これを過ぎると表示されない */
  deadline: string;
  /** 締切の表示用ラベル */
  deadlineLabel: string;
  /** 応援対象のInstagramアカウント */
  account: string;
  accountUrl: string;
  /** 対象のリール投稿 */
  reelUrl: string;
  /** 埋め込み用URL */
  reelEmbedUrl: string;
  /** 大会名（Instagramの表記） */
  contest: string;
  /** 現在の順位（里季さんの投稿より） */
  standing: string;
  /** 里季さんの呼びかけ（ファンルーム「ナギイチサマーの集い」より） */
  message: string;
  /** 呼びかけの日時 */
  askedAt: string;
};

export const supportCall: SupportCall | null = {
  deadline: "2026-07-27T11:59:59+09:00",
  deadlineLabel: "7月27日（月）11:59まで",
  account: "@174fumina.si2",
  accountUrl: "https://www.instagram.com/174fumina.si2/",
  reelUrl: "https://www.instagram.com/reel/Da60yPDxPBp/",
  reelEmbedUrl: "https://www.instagram.com/reel/Da60yPDxPBp/embed",
  contest: "japan_dancers_championship",
  standing: "総合2位",
  message: `インスタやってる皆さん、こちらの投稿にいいねコメント再投稿保存、そしてたくさん再生のご協力お願いします❣️
5回再生するだけでも本当に嬉しい、、！！りりの拡散から来ました！っていうコメントでもいい！

私の高校からの友達がダンスの大会に出てて、この投稿をバズらせることが大切らしいの！今総合2位らしくてあと少し伸びたら1位を狙えるらしい😭‼️`,
  askedAt: "2026年7月26日（日）23:55"
};
