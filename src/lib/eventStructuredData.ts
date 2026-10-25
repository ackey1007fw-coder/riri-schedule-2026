import { getVenueInfo } from "../data/venues";
import type { ScheduleEvent } from "../types";
import { isMappableVenue } from "./venueMap";

export const SITE_BASE = "https://riri-schedule-2026.vercel.app";
const SCHEMA = "https://schema.org/";
type Node = Record<string, unknown>;

const isPublicUrl = (value?: string): value is string => {
  if (!value) return false;
  try {
    const url = new URL(value);
    return ["https:", "http:"].includes(url.protocol) && !url.username && !url.password;
  } catch {
    return false;
  }
};

function eventLocation(event: ScheduleEvent): Node | Node[] | undefined {
  const metadata = event.structuredData;
  const mode = metadata?.attendanceMode;
  const locations: Node[] = [];
  // 「東京某所」などの非公開会場を特定・補完しない。配信に物理住所を付けない。
  if (mode !== "online" && isMappableVenue(event.venue)) {
    const venue = getVenueInfo(event.venue);
    const place: Node = { "@type": "Place", name: event.venue };
    if (venue?.address?.trim() && venue.source?.trim()) place.address = venue.address;
    locations.push(place);
  }
  if ((mode === "online" || mode === "mixed") &&
      isPublicUrl(metadata?.virtualLocationUrl) &&
      event.links.some((link) => link.kind === "stream" && link.url === metadata.virtualLocationUrl)) {
    locations.push({ "@type": "VirtualLocation", url: metadata.virtualLocationUrl });
  }
  return locations.length > 1 ? locations : locations[0];
}

/** 表示中の予定だけを使う。文字列から主催者・無料・在庫・価格を推定しない。 */
export function createEventGraph(events: ScheduleEvent[], now = new Date()): Node[] {
  return events.flatMap((event) => {
    const metadata = event.structuredData;
    if (metadata?.enabled === false) return [];
    // 誕生日写真・記事公開・テレビ/ラジオ放送を来場イベントにしない。
    const defaultEvent = ["stage", "event"].includes(event.category) ||
      (event.category === "radio" && isMappableVenue(event.venue));
    if (!defaultEvent && metadata?.enabled !== true) return [];

    const mode = metadata?.attendanceMode ?? (event.venue ? "offline" : undefined);
    const location = eventLocation(event);
    const organizer = metadata?.organizer;
    const occurrences = event.occurrences?.length
      ? event.occurrences.map((occurrence) => ({
          start: occurrence.startAt, end: occurrence.endAt, individual: true
        }))
      : event.dates?.length
        ? event.dates.map((date) => ({ start: date, end: undefined, individual: true }))
        : [{ start: event.startAt, end: event.endAt, individual: false }];

    return occurrences.map(({ start, end, individual }) => {
      const node: Node = {
        "@type": "Event",
        "@id": `${SITE_BASE}/#event-${event.id}${individual ? `-${encodeURIComponent(start)}` : ""}`,
        name: event.title,
        startDate: start,
        description: event.summary,
        performer: { "@id": `${SITE_BASE}/#person` },
        url: `${SITE_BASE}/#schedule`
      };
      // 各回にシリーズ最終日の終了時刻をコピーしない。
      if (end) node.endDate = end;
      if (mode) node.eventAttendanceMode = `${SCHEMA}${{
        offline: "OfflineEventAttendanceMode",
        online: "OnlineEventAttendanceMode",
        mixed: "MixedEventAttendanceMode"
      }[mode]}`;
      if (location) node.location = location;
      if (event.image) node.image = [new URL(event.image, SITE_BASE).href];
      if (organizer?.name.trim() && organizer.source.trim()) {
        node.organizer = {
          "@type": organizer.type,
          name: organizer.name,
          ...(isPublicUrl(organizer.url) ? { url: organizer.url } : {})
        };
      }

      // 終了済みの販売情報を現行Offerとして出さない。時刻不明の日はJST日末で判定。
      const closesAt = end ?? (start.length === 10 ? `${start}T23:59:59+09:00` : start);
      if (new Date(closesAt).getTime() >= now.getTime()) {
        const offers = (metadata?.offers ?? []).filter((offer) =>
          offer.source.trim() && Number.isFinite(offer.price) && offer.price >= 0 &&
          /^[A-Z]{3}$/.test(offer.priceCurrency) && isPublicUrl(offer.url) &&
          event.links.some((link) => link.kind === "ticket" && link.url === offer.url) &&
          (!offer.validThrough || new Date(offer.validThrough).getTime() >= now.getTime())
        ).map((offer) => ({
          "@type": "Offer",
          url: offer.url,
          price: offer.price,
          priceCurrency: offer.priceCurrency,
          ...(offer.validThrough ? { validThrough: offer.validThrough } : {})
        }));
        if (offers.length) {
          node.offers = offers;
          if (offers.every((offer) => offer.price === 0)) node.isAccessibleForFree = true;
        }
      }
      return node;
    });
  });
}
