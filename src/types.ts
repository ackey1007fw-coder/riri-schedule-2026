export type EventCategory =
  | "stage"
  | "radio"
  | "tv"
  | "event"
  | "web"
  | "birthday";

export type EventLink = {
  label: string;
  url: string;
  kind?: "ticket" | "stream" | "info" | "sns";
};

export type EventGalleryPhoto = {
  src: string;
  alt: string;
};

export type EventOccurrence = {
  startAt: string;
  endAt?: string;
  label?: string;
};

export type ScheduleEvent = {
  id: string;
  title: string;
  shortTitle: string;
  /** タイトル下に添える短い一言（任意） */
  subtitle?: string;
  category: EventCategory;
  startAt: string;
  endAt?: string;
  /** 公演日が飛び飛びの場合の実施日リスト（"YYYY-MM-DD"）。カレンダー表示に使用 */
  dates?: string[];
  /** 個別の開催日時。終了時刻は確認できる場合だけ設定する */
  occurrences?: EventOccurrence[];
  displayDate: string;
  venue?: string;
  image: string;
  /** カバー画像のalt（未指定時はtitleを使用） */
  imageAlt?: string;
  summary: string;
  badges: string[];
  links: EventLink[];
  isImportant?: boolean;
  isNextFocus?: boolean;
  /** SNS投稿の開催後レポートなどで、カバー画像に加えて添える写真（任意） */
  gallery?: EventGalleryPhoto[];
  /** SNS投稿本文をそのまま引用する場合（任意） */
  reportQuote?: string;
  /** 事実を追加しない範囲での短い補足コメント（任意・原文と区別して表示） */
  reportNote?: string;
};

export type SocialLink = {
  label: string;
  handle: string;
  url: string;
  description: string;
  kind: "x" | "instagram" | "threads" | "tiktok" | "showroom" | "link" | "note" | "youtube" | "web";
};
