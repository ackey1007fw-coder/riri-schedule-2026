/**
 * 会場名から Google マップの URL を組み立てるヘルパー。
 * 住所は勝手に補完せず、会場名を検索キーワードにする方針
 * （AGENTS.md「未確認情報を書かない」ルール）。
 */

/** 場所が特定できない会場表記（地図を出さない） */
const UNMAPPABLE_PATTERNS = [
  /某所/,
  /未定/,
  /屋外施設/,
  /オンライン/,
  /配信/,
  /都内$/
];

export const isMappableVenue = (venue?: string): venue is string => {
  if (!venue) return false;
  const trimmed = venue.trim();
  if (trimmed.length < 2) return false;
  return !UNMAPPABLE_PATTERNS.some((pattern) => pattern.test(trimmed));
};

/**
 * 検索キーワードを整える。
 * 「萬劇場（大塚）」→「萬劇場 大塚」のように括弧を空白に開いて精度を上げる。
 */
export const toMapKeyword = (venue: string) =>
  venue
    .replace(/[（(]/g, " ")
    .replace(/[）)]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

/** 埋め込み用（API キー不要のキーレス埋め込み） */
export const venueEmbedUrl = (venue: string) =>
  `https://www.google.com/maps?q=${encodeURIComponent(toMapKeyword(venue))}&hl=ja&z=16&output=embed`;

/** 現在地からの経路。origin を省くと Google マップ側が現在地を使う */
export const venueDirectionsUrl = (venue: string) =>
  `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(toMapKeyword(venue))}`;

/** 会場をマップ検索で開く */
export const venueSearchUrl = (venue: string) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(toMapKeyword(venue))}`;
