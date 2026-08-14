# 夏凪里季 応援スケジュールサイト — エージェント向けガイド

このリポジトリを保守・改善するAIエージェント（Codex / Claude など）向けの共通ガイドです。
ファン「あっきー」と一緒に、夏凪里季（なつなぎ りり）さんの**非公式の応援スケジュールサイト**をよくしていきます。

## リポジトリ / デプロイ
- GitHub: `ackey1007fw-coder/riri-schedule-2026`（ブランチ `main`）
- `main` に push すると **Vercel が自動デプロイ** → 本番 https://riri-schedule-2026.vercel.app/
- 参考（旧Manus版）: https://rinisched-tijfwn2s.manus.space/

## セットアップ
パッケージマネージャは **pnpm**（README と `pnpm-lock.yaml`）。`package-lock.json` は gitignore。
```bash
git clone https://github.com/ackey1007fw-coder/riri-schedule-2026.git
cd riri-schedule-2026
git config user.email "ackey1007fw@gmail.com"
git config user.name "ackey1007fw-coder"
pnpm install
pnpm dev   # http://127.0.0.1:5173 でローカル確認
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
- `src/data/news.ts` … トップのお知らせバー。**元の投稿日時を基準に、時系列上の正しい位置へ挿入**（無条件に先頭へ足さない。詳細は下の SNS 手順）。
- `src/data/photos.ts` … フォトギャラリー（メイソンリー）の写真＋ `galleryUpdate`（ギャラリー更新お知らせ）。挿入位置も投稿日時順。
- `src/data/clips.ts` … TikTok / Instagram のショート動画。ミュート自動ループで表示。挿入位置も投稿日時順。
- `src/data/highlights.ts` … これまでの歩み（受賞・メディア・舞台など）。
- `src/lib/eventImages.ts` … API経路用の画像マップ（ローカルパスで統一済み）。
- `api/showroom.js` … SHOWROOM統計のリアルタイム取得（`room_id=550336`）。

## 会場アクセスの地図
- `src/data/venues.ts` … 会場の住所・アクセスの登録先。キーは `events.ts` の `venue` と完全一致させる。
  - **住所は出典が確認できたものだけ書く**（公演フライヤー・主催の告知など）。`source` に出典を必ず残す。
  - 分からない会場は `address` を省略してよい（会場名だけで検索する）。**推測で住所を書かない**。
  - 検索キーワードが「会場名＋住所」になると Google マップが場所を一意に特定でき、スマホではマップアプリの場所カード（経路・ナビ開始つき）が開く。住所が無いと候補止まりになりやすい。
- `src/lib/venueMap.ts` … 会場名から Google マップの URL を作るヘルパー。**API キー不要**。
  - `venueEmbedUrl` 埋め込み用（キーレス `output=embed`）/ `venueDirectionsUrl` **現在地からの経路**（`origin` を省くと Google 側が現在地を使う）/ `venueSearchUrl` マップ検索。
  - `isMappableVenue` で「都内某所」「屋外施設」など**場所が特定できない会場は地図を出さない**。
  - `toMapKeyword` で「萬劇場（大塚）」→「萬劇場 大塚」のように括弧を開いて検索精度を上げる。
- `src/components/VenueMap.tsx` … 埋め込み地図つきのアクセスカード（特集セクション向け）。`venue` / `access` / `note` / `id` を渡す。
- `src/components/VenueLinks.tsx` … 「現在地からのルート」「地図」の小さなリンク2つ（一覧向け）。EventCard / NextEvent で使用。
- **一覧に埋め込み地図を並べない**：iframe が増えると重いので、一覧は `VenueLinks`、特集は `VenueMap`。
- **住所は補完しない**：会場名で検索させる方針（「未確認情報を書かない」ルール）。`access` も本人・主催が公開している範囲だけ書く。
- 新しい会場に対応するときは `venue` に会場名を渡すだけでよい。iframe や maps URL を直書きしない。

## SNS 投稿を追加する手順（チェックリスト）

りりがSNS（X / Instagram / TikTok）に新しい投稿をしたとき、および**過去投稿を後から掲載するとき**、以下を更新する。

### 時系列（news / photos / clips 共通）
配列は「新しいものが上」だが、**サイトへ追加した日ではなく、元SNS投稿・出来事の日付**で並べる。
- `date` は元投稿（または出来事）の日付。`"YYYY.M.D"` 形式（例: `"2026.6.27"` / `"2026.8.14"`）。
- サイトへ入れた日を `date` にしない。
- 過去投稿は、投稿日に応じた**正しい時系列位置へ挿入**する。無条件に配列先頭へ足さない。
- 同じ日の複数投稿は、投稿時刻が確認できれば**新しい時刻を先**にする。
- 時刻が分からないときは無理に推測しない（確認できた範囲の日付順だけ守る）。
- いいね・閲覧数など**変動するエンゲージメント数は原則保存しない**。

### 1. 画像を配置
- **SNSから画像を自動取得しない**（X / Instagram / TikTok のスクレイピングや署名URLの直保存はしない）。チャット添付・Drive 原本など、依頼者が渡した画像を使う。
- 写真を `public/images/gallery/g{次の番号}.jpg` に**新規ファイルとして**保存。既存ファイルを上書きしない。
- 番号は既存の最大値 +1 の連番（`ls public/images/gallery/ | sort -V | tail -1` で確認）。
- **写真はトリミングしない**（顔加工もしない）。レスポンシブ WebP は `pnpm run images:build`（`imageManifest.ts` はスクリプト生成、手編集しない）。
- 動画がある場合は `public/videos/` にも配置（命名: `tiktok-YYYY-MM-DD.mp4` / `instagram-YYYY-MM-DD.mp4`）。
- 写っている人物の本人性が確認できない写真は公開せず、依頼者へ確認する。

### 2. `src/data/news.ts` — お知らせ追加
- 上の時系列ルールに従って挿入。最新の投稿なら先頭、過去投稿なら投稿日の位置。
- `label`: 本人投稿は `"X"` / `"Instagram"` / `"TikTok"`。第三者投稿は `"ミヤビさんのX"` のように出どころが分かる既存パターンに合わせる。
- `text`: 投稿の引用テキスト＋簡潔な説明。
- `url`: 元の投稿URL。

### 3. `src/data/photos.ts` — ギャラリー追加
- `galleryPhotos` も投稿日時順の正しい位置へ挿入（最新なら先頭）。
- `src`: `/images/gallery/g{番号}.jpg`。
- `alt`: 写真で確認できる内容と、投稿本文・出典で人物名が確認できる範囲だけを書く。感情や関係性を写真だけから推測しない。
- `galleryUpdate` は、**今回の投稿がギャラリー全体で最新になるときだけ**更新する。過去投稿の追加では動かさない。
- **写真 credit（既存実装）**:
  - 本人アカウントの本人写真 → 原則 `credit` 不要。
  - 第三者投稿の写真、または本人が引用した第三者の写真 → `credit: { label, url }` を付ける（例: `写真: ミヤビ（@miyabidayo_o）の投稿`）。型コメントどおり「里季さん以外の方が撮影・投稿した写真のときだけ」。

### 4. `src/data/clips.ts` — 動画追加（動画がある場合のみ）
- 投稿日時順の正しい位置へ挿入（最新なら先頭）。
- `src`: `/videos/tiktok-YYYY-MM-DD.mp4` など。
- `platform`: `"TikTok"` / `"Instagram"`。
- `title`: 投稿のキャプション。
- `caption`: 一言説明。
- `bgm`: BGMがあれば記載（任意）。
- `url`: 元の投稿URL。

### 5. 確認 → コミット → PR → マージ
下の「自動運用（PR / CI / マージ）」に従う。ローカルでは少なくとも次を実行する。
- `pnpm run typecheck`（または `npx tsc --noEmit`）
- `pnpm run build`
- `node scripts/check-site-identity.mjs main`
- 画像を足した場合は Image Overwrite Guard 相当の確認（既存 `public/images/` を同名上書きしていないこと）

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

## 自動運用（PR / CI / マージ）

エージェントは次の経路だけを通常運用とする。

依頼 → 実装 → PR → CI → （依頼があれば）Codexレビュー → 必要なら修正 → GitHub の squash merge → `merged=true` を確認 → Vercel本番確認

### 対象
- リポジトリ: `ackey1007fw-coder/riri-schedule-2026`
- 夏凪里季サイトの base branch: `main`（吉井優花子サイト `yukako/main` と取り違えない）
- 本番: https://riri-schedule-2026.vercel.app/

### GitHub CI（役割分担）
むやみに同じ処理を二重化しない。
- **CI**（`.github/workflows/ci.yml`）: `pull_request` → `main`。pnpm の frozen install、`pnpm run typecheck`、`pnpm run build`。`package.json` に `test` があれば実行。
- **Site Identity Guard**（`.github/workflows/site-guard.yml`）: サイト取り違え防止。
- **Image Overwrite Guard**（`.github/workflows/image-guard.yml`）: `public/images/` の同名上書き禁止。
パッケージマネージャは **pnpm**（README と追跡中の `pnpm-lock.yaml`。`package-lock.json` は gitignore なのでコミットしない）。

ローカル確認の例:
```bash
pnpm install
pnpm run typecheck
pnpm run build
node scripts/check-site-identity.mjs main
node scripts/check-codex-review.mjs <pr-number>   # @codex review を付けた PR
```

### 自動 squash merge が可能になる条件（すべて満たすこと）
1. 対象 repo / base branch が正しい（このサイトなら `riri-schedule-2026` の `main`）。
2. PR が Draft ではない。
3. conflict がない。
4. GitHub 上の CI / typecheck / production build / Site Identity Guard / Image Overwrite Guard がすべて成功。
5. 出典が確認済みで、未確認情報を書いていない。
6. 未解決のレビュー指摘がない。
7. 下の Codex 条件を満たす（依頼した場合のみ）。

「未解決 P1/P2 が 0 件」**だけ**では足りない。レビュー自体が走っていないために 0 件、という状態を自動マージ OK と判定しない。

### Codex レビュー完了の判定
**この依頼で Codex レビューを要求していない PR** まで、存在しないレビューを必須化しない。

Codex レビューを要求した PR（PR 本文またはコメントに `@codex review` がある、あるいは依頼文で Codex レビューを求めている）では、「依頼した」という事実だけでは不十分。次の**いずれか**で、実際にレビュー処理が完了したことを確認してからマージする。
- Codex（`chatgpt-codex-connector[bot]`）から **review submission** が付いた。
- Codex が「指摘なし」を示す正式な反応を返した。
- Codex のレビューコメントが付き、その指摘を処理済み（未解決の P1/P2 が残っていない）。

次のような応答は **レビュー完了ではない**。自動マージせず、理由を報告して止まる。
- GitHub に接続されていない / connect GitHub を要求された
- review を実行できない
- エラー
- タイムアウト

確認コマンド: `node scripts/check-codex-review.mjs <pr-number>`（GitHub 上の `@codex review` 依頼を見る）。依頼文だけで `@codex review` コメントが無い場合は、エージェントがコメントしてから待つ。

### マージ方法
原則 **GitHub の squash merge**（`gh pr merge <n> --squash` または同等の GitHub merge）。

マージ後に必ず確認する。これが揃って初めて「マージ完了」と報告する。
- GitHub 上で PR `state` がマージ済み（`MERGED` / `merged=true`）
- `mergedAt` がある
- squash / merge commit が `main` に存在する（`git fetch origin main` して確認）

次は通常の自動運用では禁止。これらを「マージ完了」と報告しない。
- PR を close しただけで `merged=false`
- 同等の変更を `main` へ直接 commit / push して PR を close する

PR #68 / #69 は変更が main に入った一方、GitHub 上は `merged=false` / closed になった。この経路は使わない。

## 着手前に
README と `src/data/*.ts`・`src/components/` を読んで現状を把握してから作業する。可能ならローカル（`pnpm dev`）か Vercel のプレビューで見た目を確認してから PR を出す。`main` へ直接 push しない。
