import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { after, before, describe, it } from "node:test";
import { createServer } from "vite";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";

const OUEN_ARCHIVE_URL = "https://ouen-archive-564c.vercel.app/";

let server;
let html;

before(async () => {
  server = await createServer({
    configFile: false,
    logLevel: "silent",
    server: { middlewareMode: true },
    appType: "custom"
  });

  const { Footer } = await server.ssrLoadModule("/src/components/Footer.tsx");
  html = renderToStaticMarkup(
    createElement(Footer, {
      socialLinks: [{ label: "X", url: "https://x.com/example" }]
    })
  );
});

after(async () => {
  await server?.close();
});

function returnAnchor() {
  const index = html.indexOf(OUEN_ARCHIVE_URL);
  return html.slice(html.lastIndexOf("<a", index), html.indexOf("</a>", index) + 4);
}

describe("応援アーカイブ return link", () => {
  it("uses the portal canonical production URL as href", () => {
    assert.ok(html.includes(`href="${OUEN_ARCHIVE_URL}"`));
  });

  it("names the portal in the visible link text", () => {
    assert.ok(html.includes("応援アーカイブへ戻る"));
    assert.ok(html.includes("5つの応援サイトをつなぐ非公式ポータル"));
  });

  it("sits inside the footer element", () => {
    const footerStart = html.indexOf("<footer");
    const footerEnd = html.indexOf("</footer>");
    const linkIndex = html.indexOf(OUEN_ARCHIVE_URL);

    assert.ok(footerStart >= 0 && footerEnd > footerStart);
    assert.ok(linkIndex > footerStart && linkIndex < footerEnd);
  });

  it("opens in the same tab and does not rely on color alone", () => {
    const anchor = returnAnchor();

    assert.ok(!anchor.includes('target="_blank"'));
    assert.ok(anchor.includes("underline"));
    assert.ok(anchor.includes("min-h-[44px]"));
  });

  it("keeps the existing footer content", () => {
    assert.ok(html.includes("夏凪 里季") || html.includes("夏凪里季"));
    assert.ok(html.includes("ファンによる非公式の応援ページ"));
    assert.ok(html.includes("Produced by あっきー"));
    assert.ok(html.includes('href="https://x.com/example"'));
  });

  it("leaves the Portal Feed and person data untouched", async () => {
    const portalFeed = await readFile("src/lib/portalFeed.ts", "utf8");
    const profile = await readFile("src/data/profile.ts", "utf8");

    assert.ok(!portalFeed.includes("ouen-archive"));
    assert.ok(!profile.includes("ouen-archive"));
  });
});
