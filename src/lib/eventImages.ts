import type { EventCategory } from "../types";

const eventImageById: Record<string, string> = {
  "yofukashi-campus-2026-05-09": "/images/event-yofukashi.jpg",
  "theoridea-2026-05-14": "/images/event-theoridea.jpg",
  "aitoki-2026-05-29": "/images/event-aitoki.jpg",
  "birthday-2026-06-24": "/images/event-birthday.jpg",
  "fukurow-fm-2026-04-21": "/images/event-fukurow.jpg",
  "tvk-nekohita-2026-04-16": "/images/event-tvk.jpg",
  "imacampus-2026-04-12": "/images/event-imacampus.jpg",
  "steenz-2026-04-08": "/images/event-steenz.jpg",
  "kyanly-2026-03-14": "/images/event-kyanly.jpg"
};

const eventImageByCategory: Record<EventCategory, string> = {
  stage: "/images/event-theoridea.jpg",
  radio: "/images/event-yofukashi.jpg",
  tv: "/images/event-tvk.jpg",
  event: "/images/event-kyanly.jpg",
  web: "/images/event-steenz.jpg",
  birthday: "/images/event-birthday.jpg"
};

export function resolveEventImage(
  eventId: string,
  image: string | undefined,
  category: EventCategory
) {
  if (eventImageById[eventId]) return eventImageById[eventId];
  if (image && !image.startsWith("/images/event-") && image !== "/images/event-placeholder.jpg") {
    return image;
  }

  return eventImageByCategory[category];
}
