#!/usr/bin/env node
// public/videos/*.mp4 の1フレーム目を public/images/clips/*.jpg として書き出す。
// 新しい動画を追加したときに実行する（要 ffmpeg）。既存ファイルはスキップする。
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readdirSync } from "node:fs";
import { basename, extname, join } from "node:path";

const videoDir = join(process.cwd(), "public/videos");
const outDir = join(process.cwd(), "public/images/clips");
mkdirSync(outDir, { recursive: true });

const files = readdirSync(videoDir).filter((file) => extname(file) === ".mp4");

for (const file of files) {
  const inputPath = join(videoDir, file);
  const outputPath = join(outDir, `${basename(file, ".mp4")}.jpg`);
  if (existsSync(outputPath)) {
    console.log(`skip (exists): ${outputPath}`);
    continue;
  }
  execFileSync(
    "ffmpeg",
    ["-y", "-i", inputPath, "-vframes", "1", "-q:v", "3", outputPath],
    { stdio: "inherit" },
  );
  console.log(`generated: ${outputPath}`);
}
