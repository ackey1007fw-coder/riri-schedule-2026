// サイト取り違え防止ガード（複数シグナル版）。
// 「そのブランチに、想定サイトの中身が入っているか」を複数の hard signal で検査する。
// main = 夏凪里季 / yukako/main = 吉井優花子。
// CI（.github/workflows/site-guard.yml）から対象ブランチ名を引数で受け取って実行する。
// ローカルでも `node scripts/check-site-identity.mjs <branch>` で確認可能。
//
// 判定は「自分のサイトのシグナルが揃っている」＋「相手サイトのシグナルが混入していない」の両面。
// 2サイトは同一リポジトリ（ackey1007fw-coder/riri-schedule-2026）のブランチ違いのため、
// リポジトリ名では区別できない。中身のシグナルで判定する。
import { readFile } from "node:fs/promises";

const SITES = {
  main: {
    label: "夏凪里季 (riri)",
    name: "夏凪 里季", // src/data/profile.ts の name
    roomId: "550336", // SHOWROOM room_id
    titleIncludes: "夏凪里季", // index.html <title>
    prodUrl: "riri-schedule-2026.vercel.app", // 本番URL
  },
  "yukako/main": {
    label: "吉井優花子 (yukako)",
    name: "吉井 優花子",
    roomId: "347571",
    titleIncludes: "吉井優花子",
    prodUrl: "yukako-schedule-2026.vercel.app",
  },
};

const branch = (process.argv[2] || "").trim();
const self = SITES[branch];

if (!self) {
  console.log(
    `site-guard: "${branch}" は保護対象ブランチ（main / yukako/main）ではないためスキップします。`,
  );
  process.exit(0);
}

const other = branch === "main" ? SITES["yukako/main"] : SITES.main;

const read = async (relative) => {
  try {
    return await readFile(new URL(relative, import.meta.url), "utf8");
  } catch {
    return "";
  }
};

const profile = await read("../src/data/profile.ts");
const html = await read("../index.html");
const combined = `${profile}\n${html}`;

const errors = [];

// 1. profile.ts の name（最重要シグナル）
const nameMatch = profile.match(/^\s{2}name:\s*"([^"]+)"/m);
const actualName = nameMatch ? nameMatch[1] : "(見つかりません)";
if (actualName !== self.name) {
  errors.push(`profile.ts の name = "${actualName}"（期待: "${self.name}"）`);
}
if (actualName === other.name) {
  errors.push(`profile.ts に相手サイトの name「${other.name}」が入っています`);
}

// 2. SHOWROOM room_id：自分のIDがあり、相手のIDが無いこと
if (!combined.includes(self.roomId)) {
  errors.push(`SHOWROOM room_id "${self.roomId}" が見当たりません`);
}
if (combined.includes(other.roomId)) {
  errors.push(`相手サイトの room_id "${other.roomId}" が混入しています`);
}

// 3. index.html の <title>：自分の名前を含み、相手の名前を含まないこと
const titleMatch = html.match(/<title>([^<]*)<\/title>/);
const title = titleMatch ? titleMatch[1] : "";
if (!title.includes(self.titleIncludes)) {
  errors.push(`index.html の title に「${self.titleIncludes}」が含まれていません（title="${title}"）`);
}
if (title.includes(other.titleIncludes)) {
  errors.push(`index.html の title に相手サイトの「${other.titleIncludes}」が含まれています`);
}

// 4. 本番URL：自分のURLがあり、相手のURLが無いこと
if (!combined.includes(self.prodUrl)) {
  errors.push(`本番URL "${self.prodUrl}" が見当たりません`);
}
if (combined.includes(other.prodUrl)) {
  errors.push(`相手サイトの本番URL "${other.prodUrl}" が混入しています`);
}

if (errors.length > 0) {
  console.error(
    `\n❌ サイト取り違えを検知しました（Site identity mismatch）\n` +
      `  ブランチ "${branch}" は ${self.label} サイトのはずですが、次の不一致があります:`,
  );
  for (const e of errors) console.error(`   - ${e}`);
  console.error(
    `\n  → 別サイトを編集している可能性が高いです。マージしないでください。\n` +
      `  （main=夏凪里季 / yukako/main=吉井優花子。2サイトは同一リポジトリでブランチ違い）\n`,
  );
  process.exit(1);
}

console.log(
  `✅ site-guard OK: ブランチ "${branch}" は ${self.label} サイトとして全シグナル一致。`,
);
