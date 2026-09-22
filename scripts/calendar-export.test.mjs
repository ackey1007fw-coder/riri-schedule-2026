import assert from "node:assert/strict";
import { after, before, test } from "node:test";
import { createServer } from "vite";

let server, events, googleCalendarLinks, createScheduleCalendar;
const now = new Date("2026-09-21T00:00:00Z");
const dates = (link) => new URL(link.url).searchParams.get("dates");
const entries = (ics) => [...ics.matchAll(/BEGIN:VEVENT\r\n([\s\S]*?)END:VEVENT/g)].map((match) => match[1]);

before(async () => {
  server = await createServer({ configFile: false, logLevel: "silent", server: { middlewareMode: true }, appType: "custom" });
  ({ events } = await server.ssrLoadModule("/src/data/events.ts"));
  ({ googleCalendarLinks } = await server.ssrLoadModule("/src/lib/share.ts"));
  ({ createScheduleCalendar } = await server.ssrLoadModule("/src/lib/calendarExport.ts"));
});
after(async () => { await server?.close(); });

test("Tenjiku exports three separate one-hour performances through both calendar paths", () => {
  const event = events.find(({ id }) => id === "tenjiku-vol28-2026-10");
  const original = JSON.stringify(event);
  const links = googleCalendarLinks(event);
  assert.deepEqual(links.map(dates), [
    "20261011T030000Z/20261011T040000Z",
    "20261011T063000Z/20261011T073000Z",
    "20261011T093000Z/20261011T103000Z",
  ]);
  const exported = entries(createScheduleCalendar([event], now));
  assert.equal(exported.length, 3);
  for (let i = 0; i < 3; i++) {
    const [start, end] = dates(links[i]).split("/");
    assert.ok(exported[i].includes(`DTSTART:${start}\r\n`));
    assert.ok(exported[i].includes(`DTEND:${end}\r\n`));
    assert.ok(!exported[i].includes("VALUE=DATE"));
    assert.ok(links[i].label.includes(event.occurrences[i].label));
    const params = new URL(links[i].url).searchParams;
    assert.equal(params.get("location"), event.venue);
    assert.ok(params.get("details").includes(event.summary));
    assert.ok(exported[i].includes(`LOCATION:${event.venue}`));
  }
  const uids = exported.map((entry) => entry.match(/^UID:(.+)$/m)[1]);
  assert.equal(new Set(uids).size, 3);
  const reversed = { ...event, occurrences: [...event.occurrences].reverse() };
  assert.deepEqual(entries(createScheduleCalendar([reversed], now)).map((entry) => entry.match(/^UID:(.+)$/m)[1]).sort(), [...uids].sort());
  assert.equal(JSON.stringify(event), original);
});

test("unknown occurrence ends never inherit the aggregate end or invent a duration", () => {
  const source = events.find(({ id }) => id === "tsuki-wo-matagu-vol20-2026-10");
  const event = { ...source, endAt: "2026-10-24T22:00:00+09:00" };
  assert.deepEqual(googleCalendarLinks(event).map(dates), [
    "20261024T040000Z/20261024T040000Z",
    "20261024T080000Z/20261024T080000Z",
  ]);
  const exported = entries(createScheduleCalendar([event], now));
  assert.equal(exported.length, 2);
  assert.ok(exported.every((entry) => !entry.includes("DTEND")));
});

test("single timed events and date-only events retain their calendar semantics", () => {
  const source = events.find(({ id }) => id === "tenjiku-vol28-2026-10");
  const single = { ...source, id: "single", occurrences: [], dates: undefined, endAt: "2026-10-11T13:00:00+09:00" };
  assert.deepEqual(googleCalendarLinks(single).map(dates), ["20261011T030000Z/20261011T040000Z"]);
  assert.equal(googleCalendarLinks(single)[0].label, "");
  assert.equal(entries(createScheduleCalendar([single], now)).length, 1);
  const allDay = { ...single, dates: ["2026-10-11", "2026-10-13"] };
  assert.deepEqual(googleCalendarLinks(allDay).map(dates), ["20261011/20261012", "20261013/20261014"]);
  const exported = entries(createScheduleCalendar([allDay], now));
  assert.equal(exported.length, 2);
  assert.ok(exported[0].includes("DTSTART;VALUE=DATE:20261011\r\nDTEND;VALUE=DATE:20261012"));
  assert.ok(exported[1].includes("DTSTART;VALUE=DATE:20261013\r\nDTEND;VALUE=DATE:20261014"));
  assert.equal(entries(createScheduleCalendar([single], new Date("2026-11-01T00:00:00Z"))).length, 0);
});

test("a single confirmed occurrence uses its own time even when dates are present", () => {
  const event = events.find(({ id }) => id === "aitoki-homin-twitcasting-2026-09-08");
  assert.deepEqual(googleCalendarLinks(event).map(dates), ["20260908T080000Z/20260908T082000Z"]);
  const exported = entries(createScheduleCalendar([event], new Date("2026-09-01T00:00:00Z")));
  assert.equal(exported.length, 1);
  assert.ok(exported[0].includes("DTSTART:20260908T080000Z"));
});
