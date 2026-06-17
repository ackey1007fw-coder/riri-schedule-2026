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

export type ScheduleEvent = {
  id: string;
  title: string;
  shortTitle: string;
  category: EventCategory;
  startAt: string;
  endAt?: string;
  /** 公演日が飛び飛びの場合の実施日リスト（"YYYY-MM-DD"）。カレンダー表示に使用 */
  dates?: string[];
  displayDate: string;
  venue?: string;
  image: string;
  summary: string;
  badges: string[];
  links: EventLink[];
  isImportant?: boolean;
  isNextFocus?: boolean;
};

export type SocialLink = {
  label: string;
  handle: string;
  url: string;
  description: string;
  kind: "x" | "instagram" | "threads" | "tiktok" | "showroom" | "link" | "note" | "youtube" | "web";
};
