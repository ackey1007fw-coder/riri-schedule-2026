# 夏凪里季 応援スケジュールサイト — エージェント向けガイド

夏凪里季（なつなぎ りり）さんの非公式の応援スケジュールサイト。すべてのAI・編集者が、このガイドと現在の実装を共有して作業する。

## 最初に確認すること

1. 対象repoが `ackey1007fw-coder/riri-schedule-2026`、baseが `main` であることを確認する。`git status --short --branch` と `git remote -v` で作業場所と既存変更を確認する。
2. このファイル → `README.md` → 存在する場合は `docs/AI_HANDOFF.md` → `docs/DECISION_LOG.md` → `docs/AI_PROJECT_MEMORY_SKILL.md` → 対象コード・テストの順に読む。存在しないProject Memoryは勝手に新設しない。
3. 最新mainと関連するmerged PR、対象ファイルを変更するOpen/Draft PRを確認する。別AIのブランチや未コミット変更を上書きせず、必要なら別worktreeで作業する。
4. `src/data/profile.ts` で対象人物を確認する。人物・写真・SNS・演目を他サイトから流用しない。

実装の現状が食い違う場合は、現在のmain / merged PR → 明示的なDecision Log → HANDOFF → 過去チャットの順に確認する。これは未確認の人物情報を正しいと認定する順位ではない。出典との矛盾は根拠を示して確認する。

今回の明示指示と停止条件を優先する。AGENTSの編集内容を、その編集PR自身の権限や品質ゲートを緩める根拠にしない。

## 環境と本番

- repo: `ackey1007fw-coder/riri-schedule-2026` / base: `main`
- 本番: https://riri-schedule-2026.vercel.app/
- mainへの反映でVercelが自動デプロイする。mainへ直接pushしない。
- 優花子サイトは別repo `ackey1007fw-coder/yukako-schedule-2026` の `main`。旧 `yukako/main` をこのrepoの作業先にしない。
- Vite / React / TypeScript / Tailwind CSS。具体的なバージョンとコマンドは `package.json`・`pnpm-lock.yaml`・CIが正。
- パッケージマネージャはpnpm。npmでlockfileを作り直さない。
- `/api` はESMで書く。`package.json` が `"type": "module"` なので `export default` を使い、`module.exports` にしない。
- 認証は接続済みの正規の手段を使う。トークンを文書・会話・ログへ出さず、他人の名前やメールアドレスをgit設定へ書き込まない。

```bash
pnpm install --frozen-lockfile
pnpm dev
```

## 編集先

| 内容 | 正本・実装 |
| --- | --- |
| 出演・イベント | `src/data/events.ts`。`VITE_SCHEDULE_API_URL` 未設定時に表示される元データ |
| プロフィール・Hero・統計fallback・アバター | `src/data/profile.ts` |
| お知らせ | `src/data/news.ts` |
| 写真・ギャラリー更新 | `src/data/photos.ts` |
| TikTok / Instagram動画 | `src/data/clips.ts` |
| 受賞・メディア・舞台の歩み | `src/data/highlights.ts` |
| 会場とアクセス | `src/data/venues.ts` |
| API経路のイベント画像 | `src/lib/eventImages.ts` |
| レスポンシブ画像 | `src/lib/responsiveImage.ts` / 自動生成の `src/data/imageManifest.ts` |
| SHOWROOM統計 | `api/showroom.js`。既存room設定を確認する |
| 親ポータルへのfeed | `src/lib/portalFeed.ts` と `scripts/portal-feed.test.mjs` |

プロフィールの数値・学年・活動状況・SNS一覧はこのガイドへ重複保存せず、正本と確認できる出典を読む。演目は略称だけで判断せず、`events.ts` の正式題名・会場・日程を照合する。

## SNS 投稿を追加する手順

### 時系列

- `news / photos / clips` は元投稿・出来事の日時を基準に新しい順で配置する。掲載作業日で並べ替えない。
- `date` は既存の `YYYY.M.D` 形式。過去投稿を無条件に先頭へ足さない。
- 同日の投稿時刻が確認できる場合だけ、新しい時刻を先にする。未確認の時刻は推測しない。
- 同じ出典URLや既存写真がmain・Open PRにないか確認する。いいね・閲覧数などの変動値は原則保存しない。

### 素材からデータまで

1. チャット添付・依頼者指定のDrive原本など、提供された素材を使う。X / Instagram / TikTokのスクレイピングや署名URLの直保存をしない。
2. 本人性・出典・利用範囲を確認する。不明な人物写真は公開せず確認する。写真がなければ、確認済み本文と元投稿リンクで進められる。
3. 写真は `public/images/gallery/g{次番号}.jpg` などへ新規保存する。現在のファイル一覧から最大番号を確認し、既存ファイルを上書きしない。動画は `public/videos/tiktok-YYYY-MM-DD.mp4` / `instagram-YYYY-MM-DD.mp4` など、同名衝突を避けて保存する。
4. `pnpm run images:build` で派生画像を生成する。`imageManifest.ts` を手で書かない。
5. `news.ts` へ `date / label / text / url` を登録する。本人投稿のlabelは `X / Instagram / TikTok`、第三者投稿は出どころが分かる既存表記を使う。
6. `photos.ts` へ `src / alt` を登録する。`galleryUpdate` は追加分がギャラリー全体で最新になるときだけ更新する。
7. 動画がある場合のみ `clips.ts` に `src / platform / title / caption / url` を登録する。`bgm` は確認できる場合の任意項目。
8. 下の品質ゲートを通し、PRを提出する。

引用のかぎ括弧は原文どおりの短い引用に使う。要約・説明と本人の発言を混ぜない。altは画面で確認できる内容を記述し、感情・関係性・未確認の人物名を推測しない。

### 写真creditと表示

- 本人アカウントの本人写真は既存方針どおり原則credit不要。
- 第三者が撮影・投稿した写真、または本人が引用した第三者写真は `credit: { label, url }` で出典を残す。creditは利用許諾の代わりにはならない。
- 画像は `public/images/` に自己ホストし、サイトからは `/images/...` を参照する。SNS・Driveサムネイルの直リンクを本番へ入れない。Driveは提供素材の取得元として扱い、受け渡しURL・IDを公開データへ転記しない。
- 原本写真をトリミング・顔加工しない。顔写真のAI生成は禁止。背景・テクスチャの生成は可。
- モバイルは自然な縦横比で全体表示する（`block w-full`）。既存のHero / NextEvent / EventCardのPC用固定枠では `sm:` / `lg:` の `object-cover` を踏襲できる。原本加工とCSSの表示枠を混同しない。

## 会場地図

- `venues.ts` のキーは `events.ts` の `venue` と完全一致させる。
- 住所・アクセスは本人・主催・フライヤーなどで確認し、`source` を残す。未確認なら `address` を省略して会場名で検索させる。
- `src/lib/venueMap.ts` の `venueEmbedUrl / venueDirectionsUrl / venueSearchUrl` を使う。maps URLやiframeを各所へ直書きしない。
- `isMappableVenue` が特定できないと判定する会場に地図を出さない。`toMapKeyword` の既存の会場名正規化を使う。
- 一覧は軽い `src/components/VenueLinks.tsx`、特集は `src/components/VenueMap.tsx`。一覧へiframeを並べない。
- 現在地からの経路は既存どおりoriginを省略する。ユーザーの現在地を推測・保存しない。

## 品質ゲート

```bash
pnpm run typecheck
pnpm test
pnpm run build
node scripts/check-site-identity.mjs main
git diff --check                      # 未ステージの変更
git diff --cached --check             # ステージ済みの変更
git diff --check origin/main...HEAD   # コミット済みのPR差分（最新のbaseを取得後）
```

- CIはtypecheck / build / test、Site Identity Guardはサイト取り違え、Image Overwrite Guardは既存画像の同名上書きを検査する。それぞれの役割を維持する。
- UI変更はモバイルとPCで対象画面・リンク・画像欠落・横overflowを確認する。
- 文書変更でも参照先、コマンド、矛盾、公開してはいけない情報、不要差分を確認する。実行していない検証を成功扱いしない。
- 検証できない項目は、理由とCI等での代替確認を報告する。ゲートを無効化して通さない。

## PR・レビュー・マージ

依頼 → 実装 → PR → CI → 依頼された追加レビュー → 指摘修正 → GitHubのsquash merge → main・本番確認、の経路で進める。

### 自動squash mergeの条件

すべてを最新headで満たすこと。

1. repo / base / headが対象の作業と一致する。
2. Draftではなく、依頼の「レビューまで」「マージしない」等の停止条件がない。
3. 競合がなくマージ可能。
4. CI / typecheck / production build / Site Identity Guard / Image Overwrite Guardがすべて成功。
5. 掲載事実の出典を確認済み。
6. 未解決のレビュー指摘がない。
7. Codexレビューを依頼した場合は、次の条件を満たす。

「未解決P1/P2が0件」だけでレビュー実施済みと判定しない。

### Codexレビューを要求した場合

要求していないPRへ追加のレビュー義務を作らない。要求した場合は `node scripts/check-codex-review.mjs <pr-number>` と、その実装・テストを確認する。

- 最新の `@codex review` 要求の `created_at` より後の応答を判定する。古い成功レビューで新しい未応答・接続エラーを打ち消さない。
- issue comments / reviews / review comments / reactionsを全ページ取得する。reactionのactorと日時を保持する。
- 有効な応答はCodex bot（`chatgpt-codex-connector[bot]`）のreview submission、指摘処理済みのレビューコメント、または最新要求後にPR本体・要求コメントへ付いたCodex botの👍。人間・他bot・古い👍は対象外。
- 接続要求、実行不能、エラー、タイムアウトは完了ではない。
- headが変わった場合、旧headのレビュー結果だけを新headの合格根拠にしない。スクリプトが判定している範囲とcurrent headの確認を区別する。
- 依頼文でレビュー要求がありコメントが未投稿なら、許可された範囲で要求を1件投稿する。通信結果が不明なら実在を確認してから扱い、重複投稿しない。

### 完了の確認

GitHub上の `merged=true / MERGED` と `mergedAt`、merge commitがmainへ入ったことを確認する。その後Vercel本番の反映を確認する。

PRをcloseしただけ、または同等変更をmainへ直接pushしてcloseしただけなら、PRの「マージ完了」と報告しない。

## 公開情報・引き継ぎ

- サイトを「公式」「公認」と表記しない。`応援スケジュール / Fan Schedule` を使う。
- 私的DM、非公開の人間関係、私的な住所・連絡先・家族情報、認証情報をコード・コメント・PR・文書へ持ち込まない。制作者の職業を特定する紹介は避ける。
- 完了報告は、変更内容、PR・commit、実行した検証、未確認事項、mergeと本番反映の状態を簡潔に示す。
- Project Memoryが存在する場合、大きなPhase後にHANDOFFを更新し、長期判断をDecision Logへ残す。小さな作業履歴はPRにまとめる。
