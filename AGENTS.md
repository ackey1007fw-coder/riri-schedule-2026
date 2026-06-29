# 吉井優花子 応援スケジュールサイト — エージェント向けガイド

このブランチ（`yukako/main`）を保守・改善するAIエージェント（Codex / Claude など）向けの共通ガイドです。
ファン「あっきー」と一緒に、吉井優花子（よしい ゆかこ）さんの**非公式の応援スケジュールサイト**をよくしていきます。

> 1リポジトリに2サイトが同居しています。**このブランチは優花子サイト専用**です。
> 里季（夏凪里季）サイトは `main` ブランチ。両者を混同しないこと（人物・SNS・演目・画像すべて別物）。

## リポジトリ / デプロイ
- GitHub: `ackey1007fw-coder/riri-schedule-2026`

| ブランチ | サイト | 本番URL | Vercelプロジェクト |
| :-- | :-- | :-- | :-- |
| `yukako/main` | 吉井優花子 | https://yukako-schedule-2026.vercel.app/ | yukako-schedule-2026 |
| `main` | 夏凪里季 | https://riri-schedule-2026.vercel.app/ | riri-schedule-2026 |

- `yukako/main` に push（マージ）すると **Vercel が自動デプロイ**。
- ⚠️ **Vercel の Production Branch 設定**: yukako-schedule-2026 プロジェクトの
  Production Branch が `yukako/main` になっていること（Settings → Git）。`main` を
  向いていると変更が本番に反映されない。これはオーナーがダッシュボードで設定する。

## 共同管理（Codex × Claude）
- **Codex 自動レビュー**はリポジトリ単位で有効。`yukako/main` 宛ての PR も自動レビュー対象。
  PRに `@codex review`（再レビュー）/ `@codex address that feedback`（修正依頼）が使える。
- **Claude** は PR を購読（`subscribe_pr_activity`）して CI 失敗・レビューに対応し、
  merged / closed まで見守る。
- ワークフロー: `yukako/main` から作業ブランチ → 編集 → PR（`yukako/main` 宛て）
  → Codex レビュー + Claude 監視 → マージ → Vercel 自動デプロイ。
- PR は確認不要で即マージしてよい。ただし本番に関わる大きな変更・曖昧な指摘はオーナーに確認する。

## セットアップ
```bash
git clone https://github.com/ackey1007fw-coder/riri-schedule-2026.git
cd riri-schedule-2026
git checkout yukako/main
git config user.email "ackey1007fw@gmail.com"
git config user.name "ackey1007fw-coder"
npm install
npm run dev   # http://127.0.0.1:5173 でローカル確認
```
- push 認証は**自分の GitHub 認証／トークンを使う**。トークンを会話やファイルに平文で書かない。

## 技術スタック
- Vite + React + TypeScript + Tailwind CSS
- ホスティング Vercel。`/api` は Serverless Functions。
  - **必ず ESM で書く**：`export default async function handler(req, res) { ... }`。
  - `package.json` が `"type": "module"` なので `module.exports` は使うと関数がクラッシュする。

## データの場所（ここを編集する）
- `src/data/events.ts` … 公演・イベント一覧（`VITE_SCHEDULE_API_URL` 未設定時はこれがそのまま表示される）。
- `src/data/profile.ts` … プロフィール、`heroImage` / `portraitImage` / `gallery`、facts、SHOWROOM設定・統計フォールバック。
- `src/data/highlights.ts` … 「これまでの歩み」（受賞・舞台・メディアなど）。**新しい順**に配列。
- `src/data/news.ts` … トップのお知らせバー。新しいものを**配列の先頭**に。
- `src/data/photos.ts` … フォトギャラリー＋ `galleryUpdate`（更新お知らせ）。
- `src/data/clips.ts` … TikTok / Instagram のショート動画。
- `src/data/searchFaq.ts` … 検索意図・FAQ。
- `src/data/streamSchedule.ts` … SHOWROOM 配信予定（手入力）。
- `src/data/imageManifest.ts` … レスポンシブ画像マニフェスト（**自動生成。手で書かない**）。
- `api/showroom.js` … SHOWROOM統計のリアルタイム取得（`room_id=347571`）。

## 画像を追加する手順
1. 画像を `public/images/` に保存（命名: `yukako-なにか.jpg`）。動画は `public/videos/`（`tiktok-YYYY-MM-DD.mp4` 等）。
2. `npm install`（`sharp` が無いと次のスクリプトが落ちる）。
3. `node scripts/generate-responsive-images.mjs` を実行
   → `public/images/optimized/` に WebP 生成 + `imageManifest.ts` を自動更新。
4. データファイル（highlights.ts / profile.ts / photos.ts 等）でパスを参照。
5. コード内では `getResponsiveImageProps("/images/yukako-なにか.jpg", "100vw")` で使用。
6. 既存画像と重複していないか `md5sum` で確認してから追加する。
7. **写真はトリミングしない方針**：モバイルは全体表示（`block w-full`）、PC（`sm:`/`lg:`）だけ `object-cover`。

## ビジュアル（里季サイトと差別化）— **クリムゾン × ゴールド × アイボリー**
里季サイトとはテーマを分けてある。レッドカーペット調の暖色。**編集時はこのトーンを維持**すること。
- `tailwind.config.ts` の colors トークン:
  - `porcelain` #fffdf7（アイボリー背景/カード）
  - `rosefog` #c8385a（クリムゾン＝アクセント/ラベル/境界）
  - `champagne` #c29a4a（ゴールド＝装飾）
  - `blush` #f6dad2 / `lavender` #e7c9a6 / `lilac` #9a3048（補助・暖色）
  - `ink` #312a2e（本文）/ `moss` #60705c
- `src/index.css`: 背景グラデーション・影・`::selection`・各バナーを暖色で統一。
- ディスプレイフォント: **Playfair Display**（`index.html` で Google Fonts 読み込み）。
  欧文見出しが華やかに、和文は明朝（Yu Mincho / Hiragino Mincho）にフォールバック。
- 新規スタイルの直書き hex もこのパレットに合わせる。ピンク/ラベンダー系（里季の色）は使わない。

## 絶対ルール
1. **「公式」「公認」と書かない** →「応援スケジュール」「Fan Schedule」と表記。
2. **未確認情報を書かない**（出演歴等は Wikipedia 等で裏取りした事実のみ）。
3. **優花子さんの顔写真をAI生成しない**（背景・テクスチャのみ可）。
4. **差分は最小限**。他のエージェント/人の作業を上書きしない。
5. **画像は切り抜かず全体表示**（上記レスポンシブ方針）。
6. **里季サイト（`main`）の内容を持ち込まない**。

## 事実メモ（吉井優花子 / よしい ゆかこ / Yoshii Yukako）
- 1997年4月27日生まれ、秋田県秋田市出身、身長161cm、B型。
- 俳優・タレント・モデル・SHOWROOMライバー。元・秋田の公務員。
- 経歴: 大学卒業後 秋田で公務員 → 2021年 ミス浴衣コンテスト準グランプリ → SHOWROOM開始
  → 2022年3月退職・上京 → 2022年12月 舞台『悪魔の涙』デビュー → 現在は法律事務所勤務と並行して舞台・プロデュース活動。
- 特技: スポーツ全般、歌唱、字を書く、絵を描く、料理、写真撮影。
- Baby Shark Live 全国公演シンガー / プロデュース公演 **#ゆかJET**（GO,JET!GO!GO! シリーズ）主宰。
- 受賞: Miss Grand Japan 2025 MISS PEACE賞 / Miss Cosmo Japan 2024 TOP5。
- SNS: X個人 `@mokoopy` / Xプロデュース `@yukako_produce` / Instagram `@yoppy_777` /
  TikTok `@yukakoyoshii` / SHOWROOM「秋田の優花子(ゆかこ)」`room_id=347571`。
- SNSからの画像自動取得は基本できない（bot遮断・署名URL失効）。画像は手元から `public/images/` に自己ホストする。

## 着手前に
README と `src/data/*.ts`・`src/components/` を読んで現状を把握してから作業する。
可能ならローカル（`npm run dev`）か Vercel のプレビューで見た目を確認してから `yukako/main` にマージする。
