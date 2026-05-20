import { fallbackEvents } from "../data/fallbackEvents";
import { fallbackMediaLinks, fallbackSocialLinks } from "../data/fallbackLinks";
import type { EventCategory, EventLink, ScheduleEvent, SocialLink } from "../types";
import { resolveEventImage } from "./eventImages";
import type {
  ScheduleApiEvent,
  ScheduleApiLink,
  ScheduleApiResponse,
  ScheduleData
} from "../types/schedule";

const API_URL = import.meta.env.VITE_SCHEDULE_API_URL as string | undefined;

const categoryFallback: Record<string, EventCategory> = {
  special: "birthday",
  birthday: "birthday",
  stage: "stage",
  radio: "radio",
  tv: "tv",
  event: "event",
  web: "web"
};

const socialKinds = new Set<SocialLink["kind"]>([
  "x",
  "instagram",
  "tiktok",
  "showroom",
  "link",
  "note"
]);

export async function fetchSchedule(): Promise<ScheduleData> {
  if (!API_URL) return fallbackSchedule();

  try {
    const response = await fetch(API_URL, { cache: "no-store" });

    if (!response.ok) {
      throw new Error(`Schedule API returned ${response.status}`);
    }

    const payload = (await response.json()) as ScheduleApiResponse;
    return normalizeSchedule(payload);
  } catch (error) {
    console.error("Failed to fetch schedule data", error);
    return fallbackSchedule();
  }
}

function fallbackSchedule(): ScheduleData {
  return {
    events: fallbackEvents,
    socialLinks: fallbackSocialLinks,
    mediaLinks: fallbackMediaLinks,
    source: "fallback"
  };
}

function normalizeSchedule(payload: ScheduleApiResponse): ScheduleData {
  const events = (payload.events ?? [])
    .filter((event) => event.visible !== false)
    .map(normalizeEvent)
    .filter((event): event is ScheduleEvent => Boolean(event));

  const links = (payload.links ?? [])
    .filter((link) => link.url)
    .map(normalizeLink)
    .filter((link): link is SocialLink => Boolean(link));

  return {
    events: events.length ? events : fallbackEvents,
    socialLinks: links.filter((link) => socialKinds.has(link.kind)).length
      ? links.filter((link) => socialKinds.has(link.kind))
      : fallbackSocialLinks,
    mediaLinks: links.filter((link) => !socialKinds.has(link.kind)).length
      ? links.filter((link) => !socialKinds.has(link.kind))
      : fallbackMediaLinks,
    updatedAt: payload.updatedAt,
    source: "sheets"
  };
}

function normalizeEvent(event: ScheduleApiEvent): ScheduleEvent | null {
  if (!event.id || !event.title || !event.startAt) return null;

  const links = buildEventLinks(event);
  const category = categoryFallback[event.category ?? "event"] ?? "event";

  return {
    id: event.id,
    title: event.title,
    shortTitle: event.shortTitle || event.title,
    category,
    startAt: event.startAt,
    endAt: event.endAt || event.startAt,
    displayDate: event.displayDate || event.startAt,
    venue: event.venue || event.location || undefined,
    image: resolveEventImage(event.id, event.image, category),
    summary: event.summary || event.description || "",
    badges: event.badges ?? [],
    links,
    isImportant: event.important,
    isNextFocus: event.status === "upcoming"
  };
}

function buildEventLinks(event: ScheduleApiEvent): EventLink[] {
  const links: EventLink[] = [];

  if (event.ticketUrl) {
    links.push({ label: "チケット予約", url: event.ticketUrl, kind: "ticket" });
  }

  if (event.streamingUrl) {
    links.push({ label: "配信を見る", url: event.streamingUrl, kind: "stream" });
  }

  if (event.detailUrl) {
    links.push({ label: "詳細を見る", url: event.detailUrl, kind: "info" });
  }

  if (event.snsUrl) {
    links.push({ label: "告知を見る", url: event.snsUrl, kind: "sns" });
  }

  return links;
}

function normalizeLink(link: ScheduleApiLink): SocialLink | null {
  if (!link.label || !link.url) return null;

  return {
    label: link.label,
    handle: link.handle || "",
    url: link.url,
    description: link.description || "",
    kind: link.kind || guessLinkKind(link)
  };
}

function guessLinkKind(link: ScheduleApiLink): SocialLink["kind"] {
  const text = `${link.label} ${link.url}`.toLowerCase();

  if (text.includes("instagram")) return "instagram";
  if (text.includes("tiktok")) return "tiktok";
  if (text.includes("showroom")) return "showroom";
  if (text.includes("youtube")) return "youtube";
  if (text.includes("note")) return "note";
  if (text.includes("lit.link")) return "link";
  if (text.includes("x.com") || text.includes("twitter")) return "x";

  return "web";
}
