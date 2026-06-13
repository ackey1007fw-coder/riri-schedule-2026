# 夏凪里季 応援スケジュールサイト — エージェント向けガイド

このリポジトリを保守・改善するAIエージェント（Codex / Claude など）向けの共通ガイドです。
ファン「あっきー」と一緒に、夏凪里季（なつなぎ りり）さんの**非公式の応援スケジュールサイト**をよくしていきます。

## リポジトリ / デプロイ
- GitHub: `ackey1007fw-coder/riri-schedule-2026`（ブランチ `main`）
- `main` に push すると **Vercel が自動デプロイ** → 本番 https://riri-schedule-2026.vercel.app/
- 参考（旧Manus版）: https://rinisched-tijfwn2s.manus.space/

## セットアップ
```bash
git clone https://github.com/ackey1007fw-coder/riri-schedule-2026.git
cd riri-schedule-2026
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
- `src/data/events.ts` … 出演・イベント一覧。**実際に画面に出る元データ**（`VITE_SCHEDULE_API_URL` 未設定時の fallback 経路で events.ts がそのまま使われる）。
- `src/data/profile.ts` … プロフィール、`heroImage` / `portraitImage` / `gallery`、SHOWROOM統計のフォールバック値、アバター。
- `src/data/photos.ts` … フォトギャラリー（メイソンリー）の写真。
- `src/lib/eventImages.ts` … API経路用の画像マップ（ローカルパスで統一済み）。
- `api/showroom.js` … SHOWROOM統計のリアルタイム取得（`room_id=550336`）。

## 画像の扱い（重要）
- **画像はすべてリポジトリ内 `public/images/` に自己ホスト**。Google Drive のサムネ直リンクは本番で失敗しやすいので**使わない**。参照は `/images/...`。
  - イベント: `/images/event-<slug>.jpg`（yofukashi / theoridea / aitoki / yumenokuni / birthday / fukurow / tvk / imacampus / steenz / kyanly）
  - トップ/プロフィール: `/images/riri-hero.jpg`, `riri-portrait.jpg`, `riri-zine-01..04.jpg`
  - ギャラリー: `/images/gallery/g01..g12.jpg`
- **新しい写真を入れる手順**: Googleドライブ「RiRi画像」フォルダ（ID `1UXpS2dvC4A2IlPeVxgaxfldl-ngIFcjY`）にある各ファイルのサムネ `https://drive.google.com/thumbnail?id=<ファイルID>&sz=w1400` を `public/images/` に保存し、対応するパスを差し替える。（Drive は原本置き場として継続）
- **写真はトリミングしない方針**：
  - モバイルは自然な縦横比で**全体表示**（`block w-full`）。
  - PC（`sm:` / `lg:`）だけ枠に合わせて `sm:absolute sm:inset-0 sm:h-full object-cover`（または `lg:` 版）。
  - Hero / NextEvent / EventCard はこのレスポンシブパターン適用済み。新規も踏襲する。

## 絶対ルール
1. **「公式」「公認」と書かない** →「応援スケジュール」「Fan Schedule」と表記。
2. **未確認情報を書かない**。
3. **りりちゃんの顔写真をAI生成しない**（背景・テクスチャのみ可）。
4. **差分は最小限**。他のエージェント/人の作業を上書きしない。
5. **画像は切り抜かず全体表示**（上記レスポンシブ方針）。

## 事実メモ（混同しやすい点）
- 誕生日 **2006-06-24**（2026年で20歳・ハタチ）。トップに誕生日カウントダウン（`BirthdayBanner`）あり。
- 舞台の演目を混同しないこと：
  - **テオリデア** =『ギリシャ神話戦記テオリデア』。「聖アリストテレス学院」が舞台のバトル劇で、衣装は**青い金刺繍の制服**。会場は萬劇場。
  - **アイトキ** =『月シア別冊第一集 I'm talking about Lovin'』。**愛がテーマの小劇場公演**（西荻窪 遊空間がざびぃ）。
- SNS: X `@frecam2025_0306` / Instagram `@__ririri__24` / TikTok `@ririchannel__` / SHOWROOM `room_id=550336` / note `natsunagiriri`
- SNSからの画像自動取得は基本できない（Instagram/TikTok/X は bot 遮断・署名URL失効）。画像は Drive 経由で取得して自己ホストする。

## 着手前に
README と `src/data/*.ts`・`src/components/` を読んで現状を把握してから作業する。可能ならローカル（`npm run dev`）か Vercel のプレビューで見た目を確認してから main に push する。
