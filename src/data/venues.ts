/**
 * 会場情報。地図の検索精度を上げるために使う。
 *
 * 【重要】住所・アクセスは**出典が確認できたものだけ**書く（AGENTS.md「未確認情報を書かない」）。
 * 分からない会場は address を省略してよい。その場合は会場名だけで地図を検索する。
 * 出典は source に必ず残す。
 */
export type VenueInfo = {
  /** 住所（出典が確認できた場合のみ） */
  address?: string;
  /** 最寄駅・徒歩分数など */
  access?: string;
  /** 住所・アクセスの出典 */
  source?: string;
};

/** キーは events.ts の `venue` と完全一致させる */
export const venues: Record<string, VenueInfo> = {
  荻窪小劇場: {
    address: "〒167-0051 東京都杉並区荻窪3-47-18 第5野村ビル1F",
    access: "荻窪駅（JR・東京メトロ丸の内線）南口より徒歩8分",
    source: "劇団ココア『ピッパラの樹』公演フライヤー"
  },
  池袋西口GEKIBA: {
    address: "〒171-0021 東京都豊島区西池袋3-31-15ロイヤルプラザII 3F",
    access:
      "池袋駅西口より徒歩12分／池袋駅西口地下通路 1a、C3番出口 徒歩約2分",
    source: "『天竺生地』vol.28 公演フライヤー"
  },
  // 以下は公演フライヤーに住所の記載がないため会場名のみで検索する。
  // 住所を確認できたら address を追記すると地図のピンが正確になる。
  "西荻窪 遊空間がざびぃ": {
    source: "月シア別冊第2集『I'm talking about Homin'』フライヤー（場所の記載のみ）"
  }
};

export const getVenueInfo = (venue?: string): VenueInfo | undefined =>
  venue ? venues[venue.trim()] : undefined;
