import type { EventCategory } from "../types";

const eventImageById: Record<string, string> = {
  "yukajet-gojet-2026-07": "/images/yukako-stage-front.jpg"
};

const eventImageByCategory: Record<EventCategory, string> = {
  stage: "/images/yukako-stage-front.jpg",
  radio: "/images/yukako-portrait.jpg",
  tv: "/images/yukako-shuichi-event.jpg",
  event: "/images/yukako-cruise-captain.jpg",
  web: "/images/yukako-portrait.jpg",
  birthday: "/images/yukako-casual-braids.jpg"
};

export function resolveEventImage(
  eventId: string,
  image: string | undefined,
  category: EventCategory
) {
  if (eventImageById[eventId]) return eventImageById[eventId];
  if (image) {
    return image;
  }

  return eventImageByCategory[category];
}
