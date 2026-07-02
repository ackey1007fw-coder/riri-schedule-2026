// データ整合性QAチェック。src/data/*.ts と public/ の突き合わせを機械検査する。
// 使い方: node scripts/qa-data-check.mjs
// ・エラーがあれば exit 1（CI で PR をブロック）。警告のみなら exit 0。
// ・SNS投稿追加 / イベント追加の前後に必ず実行する（AGENTS.md 参照）。
//
// 検査項目:
//   1. データ内の /images/... /videos/... 参照が public/ に実在するか
//   2. photos.ts のギャラリー src 重複
//   3. news.ts / clips.ts の date 形式（"YYYY.M.D"）と新しい順（降順）
//   4. events.ts の id 重複・startAt/endAt の妥当性・dates の形式
//   5. 禁止表現（サイト自称の「公式」「公認」）
//   6. public/videos のファイル命名規則
//   7. 参照されていないギャラリー画像（警告のみ）＋ 次のギャラリー番号の案内
import { readFile, readdir, access } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const errors = [];
const warnings = [];
const infos = [];

const read = async (relative) => {
  try {
    return await readFile(path.join(root, relative), "utf8");
  } catch {
    return null;
  }
};

const exists = async (relative) => {
  try {
    await access(path.join(root, relative));
    return true;
  } catch {
    return false;
  }
};

// ---------- 1. アセット参照の実在チェック ----------
const dataFiles = [
  "src/data/events.ts",
  "src/data/photos.ts",
  "src/data/clips.ts",
  "src/data/news.ts",
  "src/data/profile.ts",
  "src/data/highlights.ts",
  "src/data/pet.ts",
  "src/data/charms.ts",
  "src/lib/eventImages.ts",
];

const referencedAssets = new Map(); // asset path -> [files]
for (const file of dataFiles) {
  const content = await read(file);
  if (content === null) continue;
  // 行頭コメントを除外し、値の位置（`: "..."` / 配列要素）にある拡張子付きパスだけを対象にする。
  // 比較用リテラル（eventImages.ts の startsWith 判定など）やコメント内の例示は検査しない。
  const code = content.replace(/^\s*\/\/.*$/gm, "");
  for (const m of code.matchAll(/[:,[]\s*"(\/(?:images|videos)\/[^"]+\.[a-z0-9]+)"/gi)) {
    const asset = m[1];
    if (!referencedAssets.has(asset)) referencedAssets.set(asset, []);
    referencedAssets.get(asset).push(file);
  }
}

for (const [asset, files] of referencedAssets) {
  if (!(await exists(path.join("public", asset)))) {
    errors.push(`参照先が存在しません: ${asset}（${[...new Set(files)].join(", ")}）`);
  }
}

// ---------- 2. ギャラリー src の重複 ----------
const photos = await read("src/data/photos.ts");
if (photos) {
  const srcs = [...photos.matchAll(/src:\s*"(\/images\/gallery\/[^"]+)"/g)].map((m) => m[1]);
  const seen = new Set();
  for (const s of srcs) {
    if (seen.has(s)) errors.push(`photos.ts でギャラリー画像が重複しています: ${s}`);
    seen.add(s);
  }
  if (!/galleryUpdate/.test(photos)) {
    warnings.push("photos.ts に galleryUpdate が見当たりません（ギャラリー更新お知らせ）");
  }
}

// ---------- 3. news.ts / clips.ts の date 形式と降順 ----------
const parseDotDate = (s) => {
  const m = s.match(/^(\d{4})\.(\d{1,2})\.(\d{1,2})$/);
  if (!m) return null;
  const [, y, mo, d] = m.map(Number);
  const date = new Date(Date.UTC(y, mo - 1, d));
  if (date.getUTCFullYear() !== y || date.getUTCMonth() !== mo - 1 || date.getUTCDate() !== d) return null;
  return date.getTime();
};

for (const file of ["src/data/news.ts", "src/data/clips.ts"]) {
  const content = await read(file);
  if (content === null) continue;
  const dates = [...content.matchAll(/date:\s*"([^"]+)"/g)].map((m) => m[1]);
  let prev = Infinity;
  for (const d of dates) {
    const t = parseDotDate(d);
    if (t === null) {
      errors.push(`${file}: date "${d}" が "YYYY.M.D" 形式ではありません`);
      continue;
    }
    if (t > prev) {
      errors.push(`${file}: date "${d}" の並びが新しい順（降順）になっていません。新しい項目は配列の先頭に追加してください`);
    }
    prev = t;
  }
  // URL の形式（http/https のみ）
  for (const m of content.matchAll(/url:\s*"([^"]*)"/g)) {
    if (!/^https?:\/\//.test(m[1])) {
      errors.push(`${file}: url "${m[1]}" が http(s) URL ではありません`);
    }
  }
}

// ---------- 4. events.ts の id 重複・日時の妥当性 ----------
const events = await read("src/data/events.ts");
if (events) {
  const ids = [...events.matchAll(/^\s{4}id:\s*"([^"]+)"/gm)].map((m) => m[1]);
  const seen = new Set();
  for (const id of ids) {
    if (seen.has(id)) errors.push(`events.ts: id "${id}" が重複しています`);
    seen.add(id);
  }
  for (const key of ["startAt", "endAt"]) {
    for (const m of events.matchAll(new RegExp(`${key}:\\s*"([^"]+)"`, "g"))) {
      const v = m[1];
      if (!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\+09:00$/.test(v) || Number.isNaN(Date.parse(v))) {
        errors.push(`events.ts: ${key} "${v}" が "YYYY-MM-DDTHH:mm:ss+09:00" 形式ではありません`);
      }
    }
  }
  for (const m of events.matchAll(/"(\d{4}-\d{2}-\d{2})"/g)) {
    if (Number.isNaN(Date.parse(m[1]))) {
      errors.push(`events.ts: dates の "${m[1]}" が不正な日付です`);
    }
  }
}

// ---------- 5. 禁止表現（サイト自称の「公式」「公認」） ----------
// AGENTS.md 絶対ルール1: サイトを「公式」「公認」と名乗らない。
// ・index.html / profile.ts に「公式」「公認」があればエラー（「非公式」は除外）。
// ・他のデータ内の「公式」は第三者アカウント表記（例:「劇団ココア 公式X」）がありうるため警告のみ。
const selfDescribing = { "index.html": await read("index.html"), "src/data/profile.ts": await read("src/data/profile.ts") };
for (const [file, content] of Object.entries(selfDescribing)) {
  if (!content) continue;
  for (const word of ["公式", "公認"]) {
    for (const m of content.matchAll(new RegExp(word, "g"))) {
      const before = content.slice(Math.max(0, m.index - 1), m.index);
      if (word === "公式" && before === "非") continue; // 「非公式」はOK
      const line = content.slice(0, m.index).split("\n").length;
      errors.push(`${file}:${line} に「${word}」があります（サイトの自称は禁止。「応援スケジュール」表記にする）`);
    }
  }
}
for (const file of ["src/data/news.ts", "src/data/events.ts", "src/data/highlights.ts"]) {
  const content = await read(file);
  if (!content) continue;
  for (const m of content.matchAll(/公認/g)) {
    const line = content.slice(0, m.index).split("\n").length;
    warnings.push(`${file}:${line} に「公認」があります。第三者の表記なら問題ありませんが確認してください`);
  }
}

// ---------- 6. public/videos の命名規則 ----------
try {
  const videos = await readdir(path.join(root, "public/videos"));
  for (const v of videos) {
    if (!/^(tiktok|instagram)-\d{4}-\d{2}-\d{2}(-\d+)?\.mp4$/.test(v)) {
      warnings.push(`public/videos/${v} が命名規則 (tiktok|instagram)-YYYY-MM-DD.mp4 に合っていません`);
    }
  }
} catch {
  // videos ディレクトリが無いブランチもある
}

// ---------- 7. 未参照のギャラリー画像 ＋ 次の番号 ----------
try {
  const galleryFiles = await readdir(path.join(root, "public/images/gallery"));
  const numbers = [];
  for (const f of galleryFiles) {
    const asset = `/images/gallery/${f}`;
    if (!referencedAssets.has(asset)) {
      warnings.push(`未参照のギャラリー画像: ${asset}（photos.ts への追加漏れ？）`);
    }
    const n = f.match(/^g(\d+)\./);
    if (n) numbers.push(Number(n[1]));
  }
  const next = numbers.length ? Math.max(...numbers) + 1 : 1;
  infos.push(`次のギャラリー番号: g${String(next).padStart(2, "0")}`);
} catch {
  // gallery ディレクトリが無いブランチもある
}

// ---------- 結果出力 ----------
for (const i of infos) console.log(`ℹ️  ${i}`);
for (const w of warnings) console.log(`⚠️  ${w}`);
for (const e of errors) console.error(`❌ ${e}`);

if (errors.length > 0) {
  console.error(`\n❌ QA失敗: エラー ${errors.length} 件 / 警告 ${warnings.length} 件`);
  process.exit(1);
}
console.log(`\n✅ QA合格（警告 ${warnings.length} 件）`);
