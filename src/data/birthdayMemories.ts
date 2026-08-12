import { events } from "./events";

export const birthdayMemoryEventIds = [
  "riri-nao-birthday-dinner-2026-08",
  "riri-family-birthday-dinner-2026-08",
  "riri-birthday-solo-shots-2026-07",
  "riri-birthday-1month-later-2026-07",
  "moeriri-birthday-report-2026-07"
] as const;

const birthdayMemoryIdSet = new Set<string>(birthdayMemoryEventIds);

export const birthdayMemoryEvents = birthdayMemoryEventIds
  .map((id) => events.find((event) => event.id === id))
  .filter((event): event is NonNullable<typeof event> => Boolean(event));

export const isBirthdayMemoryEventId = (id: string) =>
  birthdayMemoryIdSet.has(id);
