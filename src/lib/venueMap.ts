import { getVenueInfo } from "../data/venues";

/**
 * 会場名から Google マップの URL を組み立てるヘルパー。
 *
 * 検索キーワードは「会場名＋住所」にする。住所まで入れると Google マップが
 * 場所を一意に特定でき、スマホではマップアプリの場所カード（経路・ナビ開始つき）が開く。
 * 住所は src/data/venues.ts に**出典を確認できたものだけ**登録する方針で、
 * 未登録の会場は会場名だけで検索する。
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
 * 検索キーワードを組み立てる。
 * - 「萬劇場（大塚）」→「萬劇場 大塚」括弧を開いて精度を上げる
 * - 住所が登録されていれば連結する（〒は検索の邪魔になりやすいので落とす）
 */
export const toMapKeyword = (venue: string) => {
  const name = venue
    .replace(/[（(]/g, " ")
    .replace(/[）)]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  const address = getVenueInfo(venue)?.address?.replace(/〒[\d-]+\s*/, "").trim();

  return address ? `${name} ${address}` : name;
};

/** 埋め込み用（API キー不要のキーレス埋め込み） */
export const venueEmbedUrl = (venue: string) =>
  `https://www.google.com/maps?q=${encodeURIComponent(toMapKeyword(venue))}&hl=ja&z=16&output=embed`;

/** 現在地からの経路。origin を省くと Google マップ側が現在地を使う */
export const venueDirectionsUrl = (venue: string) =>
  `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(toMapKeyword(venue))}`;

/** 会場をマップ検索で開く（スマホではマップアプリの場所カードが開く） */
export const venueSearchUrl = (venue: string) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(toMapKeyword(venue))}`;
