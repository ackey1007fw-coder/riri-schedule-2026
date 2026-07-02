---
name: add-event
description: 出演情報・イベントを events.ts に追加する。舞台/ラジオ/TV/イベント/Web出演の告知があったら使う。「イベント追加」「出演情報を追加」「スケジュールに追加」と言われたら使う。
---

# 出演・イベント情報を追加する

## 必要な入力

告知ソース（投稿URL・告知文）から以下を整理する。**不明な項目は空欄で確認する（推測で埋めない — 絶対ルール「未確認情報を書かない」）**：

- タイトル / 日時（開始・終了）/ 会場 / チケット情報・URL / 告知投稿URL
- 複数公演の場合は出演日リスト（りりの出演回だけ）
- イベント画像（DriveファイルID、または告知投稿の画像）

## 手順

### 1. ベースライン確認
```bash
node scripts/qa-data-check.mjs
```

### 2. 画像を配置（必要な場合）
```bash
node scripts/fetch-drive-image.mjs <DriveファイルID> --event <slug>
```
→ `public/images/event-<slug>.jpg` に保存される。既存画像は上書きされない。
告知ポートレートをギャラリーと共用する場合は `image: "/images/gallery/g{NN}.jpg"` でも可（前例あり）。

### 3. src/data/events.ts に追加

配列内の位置は問わない（アプリ側でソートされる）が、可読性のため先頭付近に置く。

```ts
{
  id: "{内容}-{会場や媒体}-YYYY-MM",     // 例 "stage-ogikubo-2026-08"。既存と重複不可
  title: "正式名称",                      // 例 "劇団ココア『ピッパラの樹』"
  shortTitle: "短縮名",                   // カレンダー表示用
  category: "stage",                      // "stage" | "radio" | "tv" | "event" | "web" | "birthday"
  startAt: "YYYY-MM-DDTHH:mm:ss+09:00",   // 初回公演の開演時刻
  endAt: "YYYY-MM-DDTHH:mm:ss+09:00",     // 最終回の終演目安（任意）
  dates: ["YYYY-MM-DD", ...],             // 公演日が飛び飛びの場合のみ。りりの出演日だけ
  displayDate: "2026年M月D日(曜)〜...",    // 人間が読む表示
  venue: "会場名",
  image: "/images/event-<slug>.jpg",
  summary: "内容・出演回・料金など確認済みの事実のみ。約N分、脚本・演出、チケット価格等",
  badges: ["舞台", "A班", "チケットM/D〜"],  // 2〜4個
  links: [
    { label: "チケット予約（サービス名）", url: "...", kind: "ticket" },
    { label: "夏凪里季さんの出演告知", url: "...", kind: "sns" },
    { label: "主催者 公式X", url: "...", kind: "sns" }
    // kind: "ticket" | "stream" | "info" | "sns"
  ],
  isImportant: true                       // 大きな出演のみ。isNextFocus は「次はこれ」枠
},
```

### 4. お知らせも追加

新しい出演情報は `src/data/news.ts` の先頭にも追加する（label: "お知らせ" または告知元の "X" など）。

### 5. QA → コミット → PR
```bash
node scripts/qa-data-check.mjs
npx tsc --noEmit
git add src/data/events.ts src/data/news.ts public/images/
git commit -m "feat: 『タイトル』(M/D〜) を出演スケジュールに追加"
```
push・PR作成まで行い、マージはユーザー確認後。

## 注意

- **日時は必ず告知の原文で確認**。開演/開場を混同しない。タイムゾーンは +09:00 固定
- チケット価格・特典は告知にある表記をそのまま使う
- 「公式」はサイト自称には使わない（主催者アカウントの「〇〇 公式X」表記は可）
- テオリデア＝『ギリシャ神話戦記テオリデア』（青い制服・萬劇場）/ アイトキ＝『I'm talking about Lovin'』（小劇場）。過去演目と混同しない
