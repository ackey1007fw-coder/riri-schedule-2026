import assert from "node:assert/strict";
import { after, before, test } from "node:test";
import { createServer } from "vite";

let server;
let eventEndDate;
let isEventPast;
let events;

before(async () => {
  server = await createServer({
    configFile: false,
    logLevel: "silent",
    server: { middlewareMode: true },
    appType: "custom"
  });
  ({ eventEndDate, isEventPast } = await server.ssrLoadModule("/src/lib/date.ts"));
  ({ events } = await server.ssrLoadModule("/src/data/events.ts"));
});

after(async () => {
  await server?.close();
});

test("Tsuki wo Matagu stays upcoming between the two confirmed performances", () => {
  const event = events.find(({ id }) => id === "tsuki-wo-matagu-vol20-2026-10");
  assert.ok(event);
  assert.equal(event.endAt, undefined); // No unconfirmed closing time is invented.
  for (const time of ["12:59:59", "13:00:01", "16:59:59", "17:00:00"]) {
    assert.equal(isEventPast(event, new Date(`2026-10-24T${time}+09:00`)), false);
  }
  // Preserve the existing start-time fallback when no end time is confirmed.
  assert.equal(isEventPast(event, new Date("2026-10-24T17:00:01+09:00")), true);
});

test("final occurrence is chronological and uses its confirmed end when available", () => {
  const event = {
    startAt: "2026-10-24T13:00:00+09:00",
    occurrences: [
      { startAt: "2026-10-24T17:00:00+09:00", endAt: "2026-10-24T18:00:00+09:00" },
      { startAt: "2026-10-24T13:00:00+09:00" }
    ]
  };
  assert.equal(isEventPast(event, new Date("2026-10-24T17:30:00+09:00")), false);
  assert.equal(isEventPast(event, new Date("2026-10-24T18:00:01+09:00")), true);
});

test("confirmed overall closing time and single-event fallback remain unchanged", () => {
  const event = events.find(({ id }) => id === "tenjiku-vol28-2026-10");
  assert.ok(event);
  assert.equal(eventEndDate(event).getTime(), new Date(event.endAt).getTime());
  const single = { startAt: "2026-10-24T13:00:00+09:00" };
  assert.equal(eventEndDate(single).getTime(), new Date(single.startAt).getTime());
  assert.equal(eventEndDate({ ...single, occurrences: [] }).getTime(), new Date(single.startAt).getTime());
  const overall = { ...single, endAt: "2026-10-24T20:00:00+09:00", occurrences: [{ startAt: "2026-10-24T17:00:00+09:00" }] };
  assert.equal(eventEndDate(overall).getTime(), new Date(overall.endAt).getTime());
});
