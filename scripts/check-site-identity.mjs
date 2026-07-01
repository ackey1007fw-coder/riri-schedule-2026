// サイト取り違え防止ガード。
// 「そのブランチに、想定サイトの中身が入っているか」を検査する。
// main = 夏凪里季 / yukako/main = 吉井優花子。
// CI（.github/workflows/site-guard.yml）から、対象ブランチ名を引数で受け取って実行する。
// ローカルでも `node scripts/check-site-identity.mjs <branch>` で確認可能。
import { readFile } from "node:fs/promises";

// ブランチ → そのブランチに入っているべき profile.ts の name
const EXPECTED_NAME_BY_BRANCH = {
  main: "夏凪 里季",
  "yukako/main": "吉井 優花子",
};

const branch = (process.argv[2] || "").trim();
const expected = EXPECTED_NAME_BY_BRANCH[branch];

if (!expected) {
  console.log(
    `site-guard: "${branch}" は保護対象ブランチ（main / yukako/main）ではないためスキップします。`,
  );
  process.exit(0);
}

const profileUrl = new URL("../src/data/profile.ts", import.meta.url);
const src = await readFile(profileUrl, "utf8");
const match = src.match(/^\s{2}name:\s*"([^"]+)"/m);
const actual = match ? match[1] : "(name が見つかりません)";

if (actual !== expected) {
  console.error(
    [
      "",
      "❌ サイト取り違えを検知しました（Site identity mismatch）",
      `  ブランチ "${branch}" には ${expected} サイトの内容が入っているべきですが、`,
      `  src/data/profile.ts の name = "${actual}" になっています。`,
      "",
      "  → 別サイトを編集している可能性が高いです。マージしないでください。",
      "  （main=夏凪里季 / yukako/main=吉井優花子。2サイトは同一リポジトリでブランチ違い）",
      "",
    ].join("\n"),
  );
  process.exit(1);
}

console.log(`✅ site-guard OK: ブランチ "${branch}" → name "${actual}"`);
