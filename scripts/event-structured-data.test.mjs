import assert from "node:assert/strict";
import { after, before, test } from "node:test";
import { createServer } from "vite";

let server, createEventGraph, events, venues;
const NOW = new Date("2026-10-25T17:21:00+09:00");
const byId = (id) => events.find((event) => event.id === id);
const graphFor = (id, now = NOW) => createEventGraph([byId(id)], now);

before(async () => {
  server = await createServer({
    configFile: false, logLevel: "silent",
    server: { middlewareMode: true }, appType: "custom"
  });
  ({ createEventGraph } = await server.ssrLoadModule("/src/lib/eventStructuredData.ts"));
  ({ events } = await server.ssrLoadModule("/src/data/events.ts"));
  ({ venues } = await server.ssrLoadModule("/src/data/venues.ts"));
});
after(async () => { await server?.close(); });

function fixture(overrides = {}) {
  return {
    id: "test-event", title: "検証用イベント", shortTitle: "検証用", category: "event",
    startAt: "2026-11-08T12:00:00+09:00", endAt: "2026-11-08T16:00:00+09:00",
    displayDate: "検証用", venue: "荻窪小劇場", image: "/images/event-birthday.jpg",
    summary: "テスト用の架空データ", badges: [], links: [], ...overrides
  };
}
function ticketEvent(offerOverrides = {}) {
  return fixture({
    links: [{ kind: "ticket", label: "検証用予約", url: "https://example.com/tickets/test-event" }],
    structuredData: { offers: [{
      url: "https://example.com/tickets/test-event", price: 1000,
      priceCurrency: "JPY", source: "検証用の公式告知", ...offerOverrides
    }] }
  });
}

test("the three source-backed venue addresses match the existing registry verbatim", () => {
  for (const id of ["stage-ogikubo-2026-08", "tenjiku-vol28-2026-10", "tsuki-wo-matagu-vol20-2026-10"]) {
    const event = byId(id);
    assert.ok(venues[event.venue].source);
    for (const node of graphFor(id)) {
      assert.equal(node.location["@type"], "Place");
      assert.equal(node.location.address, venues[event.venue].address);
    }
  }
});

test("unverified addresses and undisclosed venues are never filled in", () => {
  assert.equal(graphFor("aitoki-homin-2026-09")[0].location.address, undefined);
  assert.equal(graphFor("ayudon-sports-day-2026-11-08")[0].location, undefined);
  for (const venue of ["東京某所", "未定", "東京都立川市 屋外施設"]) {
    const node = createEventGraph([fixture({ venue })], NOW)[0];
    assert.equal(node.location, undefined);
    assert.match(node.eventAttendanceMode, /OfflineEventAttendanceMode$/);
  }
  // A registry entry without a source is not considered a verified address.
  venues["検証会場"] = { address: "検証用住所" };
  assert.equal(createEventGraph([fixture({ venue: "検証会場" })], NOW)[0].location.address, undefined);
  delete venues["検証会場"];
});

test("organizers are explicit, source-backed and never inferred from the performer", () => {
  assert.equal(graphFor("stage-ogikubo-2026-08")[0].organizer.name, "劇団ココア");
  assert.equal(graphFor("tsuki-wo-matagu-vol20-2026-10")[0].organizer.name, "KAIGYAC STAGE");
  assert.equal(graphFor("ayudon-sports-day-2026-11-08")[0].organizer["@type"], "Person");
  assert.equal(graphFor("tenjiku-vol28-2026-10")[0].organizer, undefined);
  const event = fixture({ structuredData: { organizer: { type: "Person", name: "未検証", source: "" } } });
  assert.equal(createEventGraph([event], NOW)[0].organizer, undefined);
});

test("Ayudon emits the verified admission ticket, not the 2000-yen support product", () => {
  const node = graphFor("ayudon-sports-day-2026-11-08")[0];
  assert.equal(node.organizer.name, "高橋あゆみ");
  assert.deepEqual(node.offers, [{
    "@type": "Offer", url: "https://ayudon.base.shop/items/153484411",
    price: 5500, priceCurrency: "JPY", validThrough: "2026-11-07T23:59:00+09:00"
  }]);
  assert.match(byId("ayudon-sports-day-2026-11-08").summary, /5,500円/);
  assert.equal(node.offers[0].availability, undefined);
});

test("expired sales and ended events have no current offers or invented status", () => {
  for (const time of ["2026-11-07T23:59:01+09:00", "2026-11-08T16:00:01+09:00"]) {
    const node = graphFor("ayudon-sports-day-2026-11-08", new Date(time))[0];
    assert.equal(node.offers, undefined);
    assert.equal(node.eventStatus, undefined);
    assert.equal(node.startDate, "2026-11-08T12:00:00+09:00");
  }
  const node = createEventGraph([ticketEvent()], new Date("2026-11-09T00:00:00+09:00"))[0];
  assert.equal(node.offers, undefined);
});

test("a ticket link or an unpriced event never implies free admission", () => {
  const node = createEventGraph([fixture({ links: ticketEvent().links })], NOW)[0];
  assert.equal(node.offers, undefined);
  assert.equal(node.isAccessibleForFree, undefined);
  assert.equal(graphFor("aitoki-homin-twitcasting-2026-09-08")[0].isAccessibleForFree, undefined);
});

test("explicit verified zero price is retained for free registration", () => {
  const node = createEventGraph([ticketEvent({ price: 0 })], NOW)[0];
  assert.equal(node.offers[0].price, 0);
  assert.equal(node.isAccessibleForFree, true);
});

test("incomplete, invalid, unlinked or non-admission offers are suppressed", () => {
  for (const change of [
    { price: -1 }, { price: NaN }, { price: Infinity }, { price: undefined },
    { priceCurrency: "" }, { priceCurrency: "yen" }, { source: " " },
    { url: "javascript:alert(1)" }, { url: "https://example.com/other-event" },
    { validThrough: "not-a-date" }
  ]) assert.equal(createEventGraph([ticketEvent(change)], NOW)[0].offers, undefined);
  for (const kind of ["info", "stream", "sns"]) {
    const event = ticketEvent();
    event.links[0].kind = kind;
    assert.equal(createEventGraph([event], NOW)[0].offers, undefined);
  }
});

test("online events use their linked VirtualLocation and retain timezone offsets", () => {
  const node = graphFor("aitoki-homin-twitcasting-2026-09-08")[0];
  assert.match(node.eventAttendanceMode, /OnlineEventAttendanceMode$/);
  assert.deepEqual(node.location, { "@type": "VirtualLocation", url: "https://twitcasting.tv/kaigyacstage" });
  assert.match(node.startDate, /\+09:00$/);
  const source = byId("aitoki-homin-twitcasting-2026-09-08");
  const withVenue = { ...source, venue: "荻窪小劇場" };
  assert.equal(createEventGraph([withVenue], NOW)[0].location["@type"], "VirtualLocation");
  const unlinked = { ...source, links: [] };
  assert.equal(createEventGraph([unlinked], NOW)[0].location, undefined);
});

test("mixed events can include both locations; absent venues do not imply online", () => {
  const node = createEventGraph([fixture({
    links: [{ kind: "stream", url: "https://example.com/live", label: "検証用配信" }],
    structuredData: { attendanceMode: "mixed", virtualLocationUrl: "https://example.com/live" }
  })], NOW)[0];
  assert.deepEqual(node.location.map((location) => location["@type"]), ["Place", "VirtualLocation"]);
  const unknown = createEventGraph([fixture({ venue: undefined })], NOW)[0];
  assert.equal(unknown.eventAttendanceMode, undefined);
  assert.equal(unknown.location, undefined);
});

test("birthday memories, article releases and broadcasts are not attendance events", () => {
  const graph = createEventGraph(events, NOW);
  for (const id of ["riri-family-birthday-dinner-2026-08", "birthday-2026-06-24", "steenz-2026-04-08", "tvk-nekohita-2026-04-16", "imacampus-2026-04-12"]) {
    assert.ok(!graph.some((node) => node["@id"].includes(id)));
  }
  assert.deepEqual(createEventGraph([fixture({ structuredData: { enabled: false } })], NOW), []);
});

test("individual performances preserve starts and never borrow the series closing time", () => {
  const graph = graphFor("stage-ogikubo-2026-08");
  assert.equal(graph.length, 6);
  assert.deepEqual(graph.map((node) => node.startDate), byId("stage-ogikubo-2026-08").occurrences.map((item) => item.startAt));
  assert.ok(graph.every((node) => node.endDate === undefined));
  const screening = graphFor("tsuki-wo-matagu-vol20-2026-10");
  assert.equal(screening.length, 2);
  assert.equal(screening[1].startDate, "2026-10-24T17:00:00+09:00");
  assert.ok(screening.every((node) => node.endDate === undefined));
  const ids = createEventGraph(events, NOW).map((node) => node["@id"]);
  assert.equal(ids.length, new Set(ids).size);
});

test("date-only schedules remain date-only, with no inferred times or end", () => {
  const graph = createEventGraph([fixture({ dates: ["2026-11-08", "2026-11-10"] })], NOW);
  assert.deepEqual(graph.map((node) => node.startDate), ["2026-11-08", "2026-11-10"]);
  assert.ok(graph.every((node) => node.endDate === undefined));
  const free = ticketEvent({ price: 0 });
  free.dates = ["2026-11-08"];
  assert.equal(createEventGraph([free], new Date("2026-11-08T23:59:00+09:00"))[0].offers[0].price, 0);
});

test("input schedules determine the payload; private provenance never enters JSON-LD", () => {
  const event = fixture({ title: "表示中のAPI予定", id: "api-only" });
  const graph = createEventGraph([event], NOW);
  assert.equal(graph.length, 1);
  assert.equal(graph[0].name, event.title);
  const json = JSON.stringify(createEventGraph(events, NOW));
  assert.ok(!json.includes('"source"'));
  assert.ok(!json.includes('"availability"'));
  assert.match(graph[0].image[0], /^https:\/\/riri-schedule-2026\.vercel\.app\/images\//);
});

test("the Sheets path preserves unknown end times and does not reuse local metadata", async () => {
  const apiServer = await createServer({
    configFile: false, logLevel: "silent", appType: "custom",
    server: { middlewareMode: true },
    define: { "import.meta.env.VITE_SCHEDULE_API_URL": JSON.stringify("https://example.com/schedule") }
  });
  const originalFetch = globalThis.fetch;
  try {
    globalThis.fetch = async () => ({ ok: true, json: async () => ({ events: [{
      id: "api-only", title: "検証用API予定", category: "event",
      startAt: "2026-11-08T12:00:00+09:00", venue: "荻窪小劇場",
      ticketUrl: "https://example.com/tickets/api-only"
    }, { id: "hidden", title: "非表示", startAt: "2026-11-08", visible: false }] }) });
    const { fetchSchedule } = await apiServer.ssrLoadModule("/src/lib/scheduleApi.ts");
    const schedule = await fetchSchedule();
    assert.equal(schedule.source, "sheets");
    assert.equal(schedule.events.length, 1);
    assert.equal(schedule.events[0].endAt, undefined);
    const [node] = createEventGraph(schedule.events, NOW);
    assert.equal(node.name, "検証用API予定");
    assert.equal(node.endDate, undefined);
    assert.equal(node.organizer, undefined);
    assert.equal(node.offers, undefined);
  } finally {
    globalThis.fetch = originalFetch;
    await apiServer.close();
  }
});
