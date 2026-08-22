import { events } from "../data/events";
import { news, type NewsItem } from "../data/news";

export type PersonId = "mily" | "yukako" | "riri" | "chizuru" | "mako";

export type PortalFeedItem = {
  id: string;
  personId: PersonId;
  type: "news" | "story" | "schedule" | "event" | "update";
  title: string;
  summary?: string;
  url: string;
  sourceUrl?: string;
  publishedAt: string;
  updatedAt?: string;
  startsAt?: string;
  endsAt?: string;
  image?: string;
};

export type PortalFeed = {
  version: 1;
  personId: PersonId;
  siteName: string;
  siteUrl: string;
  generatedAt: string;
  items: PortalFeedItem[];
};

const PERSON_ID = "riri" as const;
const SITE_NAME = "Riri Schedule 2026";
const SITE_URL = "https://riri-schedule-2026.vercel.app/";
const MAX_ITEMS = 20;
const ISO_DATE_TIME =
  /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{3})?(?:Z|[+-]\d{2}:\d{2})$/;

function canonicalJstDate(value: string): string {
  const match = /^(\d{4})\.(\d{1,2})\.(\d{1,2})$/.exec(value);
  if (!match) {
    throw new Error(`Invalid news date: ${value}`);
  }

  const [, yearText, monthText, dayText] = match;
  const year = Number(yearText);
  const month = Number(monthText);
  const day = Number(dayText);
  const date = new Date(Date.UTC(year, month - 1, day));

  if (
    date.getUTCFullYear() !== year ||
    date.getUTCMonth() !== month - 1 ||
    date.getUTCDate() !== day
  ) {
    throw new Error(`Invalid news date: ${value}`);
  }

  return `${yearText}-${monthText.padStart(2, "0")}-${dayText.padStart(2, "0")}T00:00:00+09:00`;
}

function normalizeUrl(value: string): string {
  const match = /^(https?):\/\/([^/?#]+)([^?#]*)(?:\?([^#]*))?/i.exec(value);
  if (!match) {
    throw new Error(`Invalid absolute URL: ${value}`);
  }

  const [, protocol, hostname, rawPath, rawQuery = ""] = match;
  const ignoredParameters = new Set([
    "igsh",
    "utm_campaign",
    "utm_content",
    "utm_medium",
    "utm_source",
    "utm_term"
  ]);
  const query = rawQuery
    .split("&")
    .filter(Boolean)
    .filter((part) => !ignoredParameters.has(part.split("=", 1)[0].toLowerCase()))
    .sort()
    .join("&");
  const path = (rawPath || "/").replace(/\/+$/, "") || "/";

  return `${protocol.toLowerCase()}://${hostname.toLowerCase()}${path}${
    query ? `?${query}` : ""
  }`;
}

function urlOrigin(value: string): string {
  const match = /^(https?):\/\/([^/?#]+)(?:[/?#]|$)/i.exec(value);
  if (!match) {
    throw new Error(`Portal feed URL must be absolute: ${value}`);
  }

  return `${match[1].toLowerCase()}://${match[2].toLowerCase()}`;
}

function absoluteSiteUrl(value: string): string {
  if (/^https?:\/\//.test(value)) {
    return value;
  }

  return `${SITE_URL}${value.replace(/^\/+/, "")}`;
}

function stableHash(value: string): string {
  let hash = 0x811c9dc5;

  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 0x01000193);
  }

  return (hash >>> 0).toString(36).padStart(7, "0");
}

function newsId(item: NewsItem): string {
  return `${PERSON_ID}:news:${stableHash(normalizeUrl(item.url))}`;
}

function findPublicationNews(eventLinks: { url: string }[]): NewsItem | undefined {
  const linkedUrls = new Set(eventLinks.map((link) => normalizeUrl(link.url)));

  return news
    .filter((item) => linkedUrls.has(normalizeUrl(item.url)))
    .map((item, index) => ({ item, index, publishedAt: canonicalJstDate(item.date) }))
    .sort(
      (left, right) =>
        Date.parse(left.publishedAt) - Date.parse(right.publishedAt) ||
        left.index - right.index
    )[0]?.item;
}

function jstDateKey(value: string): string {
  return new Date(Date.parse(value) + 9 * 60 * 60 * 1000).toISOString().slice(0, 10);
}

function occurrenceIdPart(startAt: string): string {
  const match = /^(\d{4}-\d{2}-\d{2}T\d{2}):(\d{2}):\d{2}\+09:00$/.exec(startAt);
  if (!match) {
    throw new Error(`Occurrence startAt must use a JST ISO offset: ${startAt}`);
  }

  return `${match[1]}-${match[2]}`;
}

function occurrenceTitle(shortTitle: string, startAt: string): string {
  const match = /^\d{4}-(\d{2})-(\d{2})T(\d{2}):(\d{2}):\d{2}\+09:00$/.exec(
    startAt
  );
  if (!match) {
    throw new Error(`Occurrence startAt must use a JST ISO offset: ${startAt}`);
  }

  const [, month, day, hour, minute] = match;
  return `${shortTitle}｜${Number(month)}/${Number(day)} ${hour}:${minute}公演`;
}

function createScheduleItems(generatedAt: string): PortalFeedItem[] {
  const today = jstDateKey(generatedAt);

  return events
    .flatMap((event) => {
      const publication = findPublicationNews(event.links);
      if (!publication) {
        return [];
      }

      const common = {
        personId: PERSON_ID,
        type: "schedule" as const,
        summary: event.summary,
        url: `${SITE_URL}#event-${event.id}`,
        sourceUrl: publication.url,
        publishedAt: canonicalJstDate(publication.date),
        image: absoluteSiteUrl(event.image)
      };

      if (event.occurrences?.length) {
        return event.occurrences
          .filter((occurrence) => jstDateKey(occurrence.startAt) >= today)
          .map((occurrence) => ({
            ...common,
            id: `${PERSON_ID}:schedule:${event.id}:${occurrenceIdPart(
              occurrence.startAt
            )}`,
            title: occurrenceTitle(event.shortTitle, occurrence.startAt),
            startsAt: occurrence.startAt,
            ...(occurrence.endAt ? { endsAt: occurrence.endAt } : {})
          }));
      }

      if (jstDateKey(event.endAt ?? event.startAt) < today) {
        return [];
      }

      return [
        {
          ...common,
          id: `${PERSON_ID}:schedule:${event.id}`,
          title: event.title,
          startsAt: event.startAt,
          ...(event.endAt ? { endsAt: event.endAt } : {})
        }
      ];
    })
    .sort((left, right) => Date.parse(left.startsAt) - Date.parse(right.startsAt))
    .slice(0, MAX_ITEMS);
}

export function validatePortalFeed(feed: PortalFeed): void {
  if (feed.items.length > MAX_ITEMS) {
    throw new Error(`Portal feed exceeds ${MAX_ITEMS} items`);
  }

  const ids = new Set<string>();

  for (const item of feed.items) {
    if (ids.has(item.id)) {
      throw new Error(`Duplicate portal feed id: ${item.id}`);
    }
    ids.add(item.id);

    if (urlOrigin(item.url) !== urlOrigin(SITE_URL)) {
      throw new Error(`Portal feed item.url must use Riri site origin: ${item.url}`);
    }

    if (item.sourceUrl) {
      urlOrigin(item.sourceUrl);
    }

    if (item.image && urlOrigin(item.image) !== urlOrigin(SITE_URL)) {
      throw new Error(`Portal feed item.image must use Riri site origin: ${item.image}`);
    }

    for (const value of [
      item.publishedAt,
      item.updatedAt,
      item.startsAt,
      item.endsAt
    ]) {
      if (value && (!ISO_DATE_TIME.test(value) || Number.isNaN(Date.parse(value)))) {
        throw new Error(`Invalid portal feed date: ${value}`);
      }
    }

    if (item.type === "schedule" && item.startsAt && !item.startsAt.endsWith("+09:00")) {
      throw new Error(`Schedule startsAt must retain its JST offset: ${item.startsAt}`);
    }
  }
}

export function createPortalFeed(generatedAt = new Date().toISOString()): PortalFeed {
  if (!ISO_DATE_TIME.test(generatedAt) || Number.isNaN(Date.parse(generatedAt))) {
    throw new Error(`Invalid generatedAt: ${generatedAt}`);
  }

  const scheduleItems = createScheduleItems(generatedAt);
  const newsItems = news.slice(0, MAX_ITEMS - scheduleItems.length).map((item) => ({
    id: newsId(item),
    personId: PERSON_ID,
    type: "news" as const,
    title: item.text,
    url: SITE_URL,
    sourceUrl: item.url,
    publishedAt: canonicalJstDate(item.date)
  }));

  const feed: PortalFeed = {
    version: 1,
    personId: PERSON_ID,
    siteName: SITE_NAME,
    siteUrl: SITE_URL,
    generatedAt,
    items: [...newsItems, ...scheduleItems].sort(
      (left, right) => Date.parse(right.publishedAt) - Date.parse(left.publishedAt)
    )
  };

  validatePortalFeed(feed);
  return feed;
}
