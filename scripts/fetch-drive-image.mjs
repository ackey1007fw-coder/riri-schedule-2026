// Google Drive の画像を public/images/ に自動配置するスクリプト。
// Drive「RiRi画像」フォルダのファイルIDを渡すと、サムネAPI（?sz=w1400）から取得して
// ギャラリーの次の番号（g{NN}.jpg）で保存し、photos.ts に貼るスニペットを出力する。
//
// 使い方:
//   ギャラリー追加:  node scripts/fetch-drive-image.mjs <fileId> [<fileId> ...]
//   イベント画像:    node scripts/fetch-drive-image.mjs <fileId> --event <slug>
//   サイズ変更:      --sz w2000 （既定 w1400）
//
// 安全設計:
//   ・既存ファイルは絶対に上書きしない（image-guard と同じ方針。キャッシュ事故防止）
//   ・レスポンスが画像でない場合（HTML=共有設定エラー等）は保存しない
//   ・ダウンロードのみ。削除・変更・外部送信は行わない
import { readdir, writeFile, access } from "node:fs/promises";
import { execFileSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const args = process.argv.slice(2);
const ids = [];
let eventSlug = null;
let sz = "w1400";
for (let i = 0; i < args.length; i++) {
  if (args[i] === "--event") eventSlug = args[++i];
  else if (args[i] === "--sz") sz = args[++i];
  else if (args[i].startsWith("-")) {
    console.error(`不明なオプション: ${args[i]}`);
    process.exit(1);
  } else ids.push(args[i].trim());
}

if (ids.length === 0) {
  console.error("使い方: node scripts/fetch-drive-image.mjs <DriveファイルID...> [--event <slug>] [--sz w1400]");
  console.error("  DriveのURL https://drive.google.com/file/d/<ここがID>/view からIDを取り出して渡す。");
  process.exit(1);
}
if (eventSlug && ids.length !== 1) {
  console.error("--event 指定時はファイルIDを1つだけ渡してください。");
  process.exit(1);
}

// Drive の共有URLをそのまま貼られてもIDを取り出せるようにする
const extractId = (raw) => {
  const m =
    raw.match(/\/d\/([\w-]{20,})/) || // file/d/<id>/view
    raw.match(/[?&]id=([\w-]{20,})/) || // ?id=<id>
    raw.match(/^([\w-]{20,})$/);
  if (!m) {
    console.error(`DriveファイルIDとして解釈できません: ${raw}`);
    process.exit(1);
  }
  return m[1];
};

const download = async (url) => {
  try {
    const res = await fetch(url, { redirect: "follow" });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return Buffer.from(await res.arrayBuffer());
  } catch (err) {
    // 一部環境（プロキシ必須など）では Node の fetch が失敗するため curl にフォールバック
    try {
      return execFileSync("curl", ["-fsSL", url], { maxBuffer: 100 * 1024 * 1024 });
    } catch {
      throw err;
    }
  }
};

const isImage = (buf) =>
  buf.length > 100 &&
  ((buf[0] === 0xff && buf[1] === 0xd8) || // JPEG
    (buf[0] === 0x89 && buf[1] === 0x50) || // PNG
    (buf.slice(0, 4).toString() === "RIFF" && buf.slice(8, 12).toString() === "WEBP"));

const exists = async (p) => {
  try {
    await access(p);
    return true;
  } catch {
    return false;
  }
};

// ギャラリーの次の番号を調べる（既存の最大値 + 1）
const nextGalleryNumber = async () => {
  const files = await readdir(path.join(root, "public/images/gallery"));
  let max = 0;
  for (const f of files) {
    const m = f.match(/^g(\d+)\./);
    if (m) max = Math.max(max, Number(m[1]));
  }
  return max + 1;
};

const saved = [];
let number = eventSlug ? null : await nextGalleryNumber();

for (const raw of ids) {
  const id = extractId(raw);
  const url = `https://drive.google.com/thumbnail?id=${id}&sz=${sz}`;
  process.stdout.write(`⬇️  ${id} を取得中... `);

  let buf;
  try {
    buf = await download(url);
  } catch (err) {
    console.error(`\n❌ ダウンロード失敗 (${id}): ${err.message}`);
    process.exit(1);
  }

  if (!isImage(buf)) {
    console.error(`\n❌ 画像として取得できませんでした (${id})。`);
    console.error("   Driveの共有設定（リンクを知っている全員が閲覧可）と、IDが正しいか確認してください。");
    process.exit(1);
  }

  const relative = eventSlug
    ? `public/images/event-${eventSlug}.jpg`
    : `public/images/gallery/g${String(number).padStart(2, "0")}.jpg`;
  const dest = path.join(root, relative);

  if (await exists(dest)) {
    console.error(`\n❌ ${relative} は既に存在します。上書きは禁止です（キャッシュ事故防止）。`);
    console.error("   別の名前にするか、既存ファイルを確認してください。");
    process.exit(1);
  }

  await writeFile(dest, buf);
  console.log(`→ ${relative} (${Math.round(buf.length / 1024)}KB)`);
  saved.push({ relative, webPath: relative.replace(/^public/, "") });
  if (!eventSlug) number++;
}

console.log(`\n✅ ${saved.length}件 保存しました。次の手順:`);
if (eventSlug) {
  console.log(`   events.ts の image に "${saved[0].webPath}" を設定してください。`);
} else {
  console.log("   photos.ts の galleryPhotos 先頭に追加（altは写真の内容を具体的に）:\n");
  for (const s of saved) {
    console.log(`  { src: "${s.webPath}", alt: "TODO: 写真の内容を具体的に書く" },`);
  }
  console.log("\n   その後 galleryUpdate も最新投稿の情報に更新し、news.ts にお知らせを追加。");
}
console.log("   最後に node scripts/qa-data-check.mjs で検査。");
