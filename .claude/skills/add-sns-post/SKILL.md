---
name: add-sns-post
description: りりのSNS投稿（X/Instagram/TikTok）をサイトに反映する。投稿URLとDriveファイルIDを渡すと、画像配置→news/photos/clips更新→QA→コミットまで実行する。「SNS投稿を追加」「投稿を反映」「ギャラリーに追加」と言われたら使う。
---

# SNS投稿をサイトに反映する

## 必要な入力

ユーザーから以下を受け取る。足りないものは**推測せず確認する**：

1. **投稿URL**（X / Instagram / TikTok の元投稿）
2. **投稿の内容**（引用テキスト。スクショや本文の貼り付けでも可）
3. **画像のDriveファイルID**（複数可。DriveのURLごと貼られてもOK — スクリプトがIDを抽出する）
4. **動画の有無**（動画は自動取得できないため、ユーザーが `public/videos/` に配置済みか確認）

日付が不明な場合のみ投稿URLやテキストから推定し、推定したことを明示する。

## 手順（各ステップ完了ごとに進む。中断されても再実行で続きから可能）

### 1. ベースライン確認
```bash
node scripts/qa-data-check.mjs
```
これが失敗する場合は先に既存の問題を報告し、ユーザーの指示を仰ぐ。
出力の「次のギャラリー番号」を控える。

### 2. 画像を取得・配置（決定的処理。AIの手作業でファイルを作らない）
```bash
node scripts/fetch-drive-image.mjs <DriveファイルID...>
```
- 自動で次の番号 `g{NN}.jpg` に保存される。既存ファイルは絶対に上書きされない。
- 失敗したら共有設定（リンクを知っている全員が閲覧可）をユーザーに確認。
- 出力される photos.ts 用スニペットを次のステップで使う。

### 3. データ更新（3ファイル。すべて配列の先頭に追加）

**src/data/news.ts** — 先頭に追加:
```ts
{
  date: "YYYY.M.D",        // ゼロ埋めしない（例 "2026.7.2"）
  label: "X",              // "X" / "Instagram" / "TikTok" / "お知らせ" など
  text: "「投稿の引用」＋簡潔な説明",
  url: "元の投稿URL"
},
```

**src/data/photos.ts** — `galleryPhotos` の先頭に追加（コメント行で投稿日と出どころを書く）:
```ts
// YYYY.M.D <プラットフォーム>「投稿引用」
{ src: "/images/gallery/g{NN}.jpg", alt: "写真の内容を具体的に（誰が・何を・どんな服装/場面か）" },
```
`galleryUpdate` オブジェクトも最新投稿の情報に更新する。

**src/data/clips.ts** — 動画がある場合のみ、`clips` の先頭に追加:
```ts
{
  src: "/videos/tiktok-YYYY-MM-DD.mp4",  // instagram- の場合もある
  platform: "TikTok",                     // "TikTok" | "Instagram"
  title: "投稿のキャプション",
  caption: "ひとこと説明",
  bgm: "BGM名",                           // 任意。不明なら省略
  date: "YYYY.M.D",
  url: "元の投稿URL"
},
```

### 4. QA（必須）
```bash
node scripts/qa-data-check.mjs
npx tsc --noEmit   # node_modules がある場合
```
両方合格するまで修正。

### 5. コミット → push → PR
```bash
git add public/images/gallery/g*.jpg public/videos/ src/data/news.ts src/data/photos.ts src/data/clips.ts
git commit -m "feat: YYYY.M.D の<プラットフォーム>投稿を追加（news/gallery/clips）"
```
push と PR 作成まで行い、**マージはユーザーが本番プレビューを確認してから**。
PR本文には投稿URL・追加したファイル・QA結果を書く。

## 絶対ルール（AGENTS.md より）

- 「公式」「公認」と書かない →「応援スケジュール」表記
- 未確認情報を書かない。投稿にない情報を捏造しない
- 顔写真をAI生成しない
- 差分は最小限。無関係なファイルに触らない
- 画像の同名上書き禁止（CIで検知される）
- テオリデア＝青い制服の学院バトル劇 / アイトキ＝愛がテーマの小劇場。混同しない
- alt文は具体的に（アクセシビリティ用）。「写真」だけの alt は不可

## 中断からの再開

利用制限などで途中停止した場合、再開時はまず `git status` と
`node scripts/qa-data-check.mjs` を実行する。
「未参照のギャラリー画像」警告が出ていれば、画像配置は済みでデータ更新が未完了という意味。
ステップ3から続行する。
