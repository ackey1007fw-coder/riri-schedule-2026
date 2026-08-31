import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import { after, before, describe, it } from "node:test";
import { createServer } from "vite";

const SITE_URL = "https://riri-schedule-2026.vercel.app/";
const SITE_ORIGIN = new URL(SITE_URL).origin;
const CURRENT_PRODUCTION_TIME = "2026-08-19T00:00:00.000Z";
const SAME_DAY_AFTER_CURTAIN = "2026-08-18T14:59:59.000Z";
const NEXT_JST_DAY = "2026-08-18T15:00:00.000Z";
const PIPPARA_FIRST_START = "2026-08-18T19:30:00+09:00";

let server;
let createPortalFeed;
let validatePortalFeed;
let news;

before(async () => {
  server = await createServer({
    configFile: false,
    logLevel: "silent",
    server: { middlewareMode: true },
    appType: "custom"
  });

  ({ createPortalFeed, validatePortalFeed } = await server.ssrLoadModule(
    "/src/lib/portalFeed.ts"
  ));
  ({ news } = await server.ssrLoadModule("/src/data/news.ts"));
});

after(async () => {
  await server?.close();
});

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function productionFeed() {
  return createPortalFeed(CURRENT_PRODUCTION_TIME);
}

describe("Riri portal feed origin contract", () => {
  it("archives the source-backed Pippara cast meetup report", async () => {
    const sourceUrl = "https://x.com/gekidan_cocoa/status/2081277350176751632";
    const item = news.find((candidate) => candidate.url === sourceUrl);

    assert.ok(item);
    assert.equal(item.date, "2026.7.26");
    assert.equal(item.label, "劇団ココアX");
    assert.match(item.text, /公演は終了しています/);

    const [component, manifest] = await Promise.all([
      readFile("src/components/PipparaNoKiSection.tsx", "utf8"),
      readFile("src/data/imageManifest.ts", "utf8")
    ]);
    assert.match(component, /x-2026-07-26-pippara-kaoawase/);
    assert.match(component, /満席回と予約の案内は投稿時点の情報で、公演は終了しています/);
    assert.match(component, /\/images\/gallery\/g127\.jpg/);
    assert.match(manifest, /\/images\/gallery\/g127\.jpg/);
    const photos = await readFile("src/data/photos.ts", "utf8");
    assert.match(photos, /写真: 劇団ココア（@gekidan_cocoa）の投稿/);
    assert.match(photos, /2081277350176751632/);
    await access("public/images/gallery/g127.jpg");
  });

  it("maps news URLs to the Riri homepage and retains original source URLs and titles", () => {
    const items = productionFeed().items.filter((item) => item.type === "news");

    assert.ok(items.length > 0);
    assert.ok(items.some((item) => new URL(item.sourceUrl).origin !== SITE_ORIGIN));

    for (const item of items) {
      const source = news.find((candidate) => candidate.url === item.sourceUrl);
      assert.equal(item.url, SITE_URL);
      assert.ok(source, `Missing source news for ${item.id}`);
      assert.equal(item.title, source.text);
    }
  });

  it("rejects an external item.url", () => {
    const feed = clone(productionFeed());
    feed.items[0].url = "https://example.com/external-item";

    assert.throws(
      () => validatePortalFeed(feed),
      /item\.url must use Riri site origin/
    );
  });

  it("allows an external sourceUrl", () => {
    const feed = clone(productionFeed());
    feed.items[0].sourceUrl = "https://example.com/original-source";

    assert.doesNotThrow(() => validatePortalFeed(feed));
  });

  it("keeps schedule URLs and all images on the Riri site origin", () => {
    const feed = productionFeed();
    const schedules = feed.items.filter((item) => item.type === "schedule");

    assert.ok(schedules.length > 0);
    for (const item of schedules) {
      assert.equal(new URL(item.url).origin, SITE_ORIGIN);
      assert.match(item.url, /\/#event-/);
    }
    for (const item of feed.items.filter((item) => item.image)) {
      assert.equal(new URL(item.image).origin, SITE_ORIGIN);
    }
  });

  it("rejects an external image", () => {
    const feed = clone(productionFeed());
    const item = feed.items.find((candidate) => candidate.image);
    assert.ok(item);
    item.image = "https://example.com/external-image.jpg";

    assert.throws(
      () => validatePortalFeed(feed),
      /item\.image must use Riri site origin/
    );
  });

  it("validates the current production-equivalent 20-item feed", () => {
    const feed = productionFeed();

    assert.equal(feed.items.length, 20);
    assert.equal(new Set(feed.items.map((item) => item.id)).size, feed.items.length);
    assert.doesNotThrow(() => validatePortalFeed(feed));
    assert.ok(feed.items.every((item) => new URL(item.url).origin === SITE_ORIGIN));
    assert.ok(
      feed.items
        .filter((item) => item.image)
        .every((item) => new URL(item.image).origin === SITE_ORIGIN)
    );
  });
});

describe("Riri portal feed stability", () => {
  it("keeps stable IDs and order across builds on the same JST day", () => {
    const first = createPortalFeed("2026-08-19T00:00:00.000Z");
    const second = createPortalFeed("2026-08-19T14:59:59.000Z");
    const snapshot = (feed) =>
      feed.items.map(({ id, type, publishedAt, startsAt }) => ({
        id,
        type,
        publishedAt,
        startsAt
      }));

    assert.deepEqual(snapshot(second), snapshot(first));
  });

  it("keeps a started occurrence through the end of its JST day", () => {
    const sameDay = createPortalFeed(SAME_DAY_AFTER_CURTAIN);
    const nextDay = createPortalFeed(NEXT_JST_DAY);

    assert.ok(sameDay.items.some((item) => item.startsAt === PIPPARA_FIRST_START));
    assert.ok(!nextDay.items.some((item) => item.startsAt === PIPPARA_FIRST_START));
    assert.ok(
      nextDay.items
        .filter((item) => item.type === "schedule")
        .every((item) => item.startsAt >= "2026-08-19T00:00:00+09:00")
    );
  });
});
