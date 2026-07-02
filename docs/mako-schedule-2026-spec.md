# まこ（MAKO）応援スケジュールサイト 仕様書

- **対象**: まこ（MAKO）さん — Instagram `@mako_hawaiian` / TikTok `@maaako0406`
- **作成日**: 2026-07-02
- **作成**: Fable（プロダクト設計）／実装担当: Sonnet（実装）＋ Codex（実装・テスト）
- **本ドキュメントの位置づけ**: 実装エージェントがそのまま着手できる仕様書。実装コードは含まない。曖昧な箇所は「要確認」「要判断」と明記している。

---

## 0. 作者（あっきー）が最終判断すべき事項 — 実装前に必ず決めること

過去2サイト（りり・優花子）は「非公式ファンサイト」だったが、今回はまこさん本人がDMで「公式もできるの？」「公式いいね😍」と発言している。**ただし「DMでの好意的な反応」と「公式サイトとして公開する正式な合意」は別物**であり、「公式」を名乗ることは非公式ファンサイトより責任が重い（内容の正確性、本人の意向反映、事務所との関係に本人が巻き込まれる度合いが増す）。以下は実装前に作者が判断すること。

### 要判断 1: サイトの表記を「公式」にするか「本人公認ファンサイト」に留めるか

| 選択肢 | メリット | リスク・負担 |
|---|---|---|
| A. 「公式（Official）」と明記 | 本人の希望に沿う。検索・SNSでの信頼度が高い | 掲載内容の誤りが本人の発言と受け取られる。事務所・案件先との契約に抵触する可能性。更新停止時も「公式が放置」に見える |
| B. 「本人公認ファンサイト（Approved Fan Site）」 | 公認の安心感と、ファンサイトとしての気軽さを両立。誤記のリスクが本人に及びにくい | 「公式」ほどの重みはない |
| C. 従来どおり「非公式ファンサイト」 | 最も低リスク | 本人の「公式いいね」の意向に沿わない |

**推奨: まず B で公開し、下記の合意プロセスが整った時点で A に昇格する**（フッター・meta・JSON-LD の文言差し替えだけで済むよう、表記は設定ファイル1箇所に集約する — §10 参照）。

### 要判断 2: 掲載前の本人確認フローを設けるか

- 「公式」または「公認」を名乗るなら、**最低限、初回公開前に本人へプレビューURLを送り、明示的なOKをもらう**こと（DMのスクリーンショット等で記録を残す）。
- 以後の更新は「プロフィール・肩書き・所属など本人性に関わる変更は事前確認、写真追加・スケジュール追加は事後報告」の2段階運用を推奨。
- 本人確認の窓口は Instagram DM（既にやり取りが存在する）。

### 要判断 3: 本人以外（事務所・関係者）の承諾確認の要否

- **まこさんに事務所・所属があるかは未確認（要確認）**。所属がある場合、「公式」表記は事務所の許諾が必要になる可能性が高い。
- 初回の本人確認時に「事務所さんとか、確認しておいたほうがいい人いる？」と一言確認するだけでよい。フリーであれば本人合意のみで足りる。
- 案件投稿（PR案件）の写真・動画を転載する場合は、案件元の権利が絡むため**転載しない**（リンクのみ）方針を推奨。

### 実装への影響

上記が未決でも実装は開始できる。**サイト表記（official / approved-fan / fan）は `src/data/site.ts` の1変数で切り替えられる設計とし、初期値は `approved-fan` にしておく**こと（§4・§10）。

---

## 1. リポジトリ名・サイト名

- **リポジトリ**: `ackey1007fw-coder/mako-schedule-2026`（新規作成。riri のフォークではなく新規リポジトリを推奨 — §3 参照）
- **本番URL**: `https://mako-schedule-2026.vercel.app/`（既存2サイトと同じ命名規則）
- **サイト名**: `MAKO Schedule 2026`
- **日本語表記**: 「まこ 応援スケジュール 2026」（表記が `official` に昇格した場合は「まこ オフィシャルサイト」等に差し替え。文言は site.ts に集約）
- **`<title>` 案**: `まこ（MAKO）スケジュール 2026 | Instagram・TikTok`

要確認: まこさんの活動名義の正式表記（ひらがな「まこ」／ローマ字「MAKO」のどちらを主とするか。DMヘッダーは「MAKO / mako_hawaiian」）。フルネーム・芸名の有無も未確認。**未確認のまま本名らしき情報を推測して書かない**こと。

## 2. コンセプトとページ構成

### コンセプト: 「30秒でわかる」

まこさん本人がDMで「30秒でわかる！みたいなのいいね」と発言している。これを設計原則にする:

- **ファーストビュー（スクロールなし）で「誰か・次に何があるか・どこでフォローできるか」が完結する**こと。
- Instagram のプロフィールリンク（リンクインバイオ）としてこのサイトのURLを貼る運用を想定。**トップ最上部に Instagram / TikTok の大きなリンクカードを置き、リンクハブとして機能させる**（本人要望:「インスタに貼れるようにティックトックとインスタリンク？とかできるのかな？」）。

### ページ構成

シングルページ構成（既存2サイト踏襲）＋アンカーナビ。ただし Next.js なので将来のページ分割は容易。

| セクション | 内容 | 備考 |
|---|---|---|
| 1. Hero | 名前・キャッチコピー・メインビジュアル1枚・**SNSリンクカード（Instagram / TikTok）** | 30秒コンセプトの核。誕生日が近い場合はカウントダウンバッジ |
| 2. Next Event | 次回イベントのハイライト（日時・場所・リンク） | イベントが無い期間は「最新のSNS投稿」に差し替え表示 |
| 3. Schedule | イベント一覧（今後/過去タブ or 時系列） | `events.ts` から生成 |
| 4. Profile | プロフィール（確認済みの事実のみ） | §0 の確認フローを通った項目だけ掲載 |
| 5. Photo Gallery | 写真ギャラリー（メイソンリー） | トリミング禁止（§6） |
| 6. Clips | TikTok / Instagram のショート動画 | 自己ホストのミュート自動ループ（riri 方式） |
| 7. Links | SNSリンク再掲＋シェア導線 | X・SHOWROOM は**置かない**（本人希望） |
| 8. Footer | サイト種別表記（§0）・運営者・お問い合わせ導線 | JSON-LD はここではなく `<head>` |

**入れないもの**: SHOWROOM 連携・X 連携（本人が明示的に不要と発言）。りりサイトにある SHOWROOM 統計 API・LiveBanner・StreamSchedule 系は移植しない。

### 誕生日カウントダウン

既存2サイト同様に搭載する。**要確認: まこさんの誕生日**。TikTok ID `maaako0406` から 4月6日の可能性があるが、**IDからの推測は未確認情報なので、本人に確認が取れるまでカウントダウンは非表示**（`site.ts` の `birthday` が空なら描画しない実装にする）。

## 3. 技術スタック（重要: 既存からの変更点あり）

### 事実確認: 既存2サイトは Next.js ではない

依頼文には「Next.js を踏襲」とあるが、**実際の riri-schedule-2026 は Vite + React 18 + TypeScript + Tailwind CSS 3 の SPA**（`package.json` 確認済み）。優花子サイトで「クローラーが本文テキストを取得できなかった」のは、この **Vite SPA 構成そのものが原因**（初期HTMLがほぼ空で、本文は全てクライアントJSで描画されるため）。

### 今回の採用スタック

| 項目 | 採用 | 理由 |
|---|---|---|
| フレームワーク | **Next.js 15（App Router）** | SSG で全文を初期HTMLに含める。過去の反省点の根本解決 |
| レンダリング | **SSG（`output: 'export'` は使わず、Vercel の静的プリレンダリング）** | データは全てリポジトリ内の `.ts` なのでビルド時に確定できる。ISR・API不要 |
| 言語 | TypeScript（strict） | 踏襲 |
| スタイル | Tailwind CSS v4 | 踏襲（v3→v4 は新規なら移行コスト無し。Sonnet が v3 に慣れていれば v3 でも可 — 実装者判断でよい） |
| アイコン | lucide-react | 踏襲 |
| 画像 | `next/image` ＋ `public/images/` 自己ホスト | riri の sharp 手動スクリプトを next/image に置き換え |
| 解析 | @vercel/analytics | 踏襲 |
| デプロイ | GitHub `main` → Vercel 自動デプロイ | 踏襲 |

**制約**: クライアントコンポーネント（`"use client"`）はカウントダウン・ギャラリーのライトボックス・動画プレイヤーなど**インタラクション部分に限定**する。Hero のテキスト・プロフィール・イベント一覧・リンク一覧は必ずサーバーコンポーネント（＝初期HTML入り）で描画すること。**受け入れ基準: `curl -s https://<本番URL>/ | grep まこ` で名前・プロフィール文・イベントタイトルがヒットすること。**

### コード共通化の判断

riri からの**コピー＆調整（コンポーネント単位の移植）とし、共有パッケージ化はしない**。理由: 2サイトは Vite、今回は Next.js でランタイムが違う。3サイト共通のモノレポ化は運用者1人＋AIエージェント体制では過剰。移植対象は §5 参照。

## 4. データスキーマ

riri の型（`src/types.ts`）を土台に、SHOWROOM 依存を除去し、サイト表記切り替えを追加する。データファイルは riri と同じく `src/data/` に集約。

```ts
// src/data/site.ts — サイト全体設定（§0 の要判断を1箇所に集約）
export type SiteMode = "official" | "approved-fan" | "fan";

export type SiteConfig = {
  mode: SiteMode;                  // 初期値 "approved-fan"。§0 の判断で切替
  siteName: string;                // "MAKO Schedule 2026"
  siteUrl: string;                 // "https://mako-schedule-2026.vercel.app"
  modeLabel: Record<SiteMode, { ja: string; en: string; footerNote: string }>;
  // 例: approved-fan → { ja: "本人公認ファンサイト", en: "Approved Fan Site",
  //      footerNote: "本サイトはまこさん本人の了承を得て、ファンが運営しています。" }
  ogImage: string;                 // "/images/og/og-default.png"（1200×630）
  birthday?: string;               // "MM-DD"。未確認のうちは undefined → カウントダウン非表示
};

// src/types.ts — イベント（riri の ScheduleEvent とほぼ同一）
export type EventCategory = "stage" | "event" | "media" | "web" | "birthday" | "collab";

export type EventLink = {
  label: string;
  url: string;
  kind?: "ticket" | "stream" | "info" | "sns";
};

export type ScheduleEvent = {
  id: string;                      // "<slug>-YYYY-MM[-DD]" 形式（例 "birthday-2027-04-06"）
  title: string;
  shortTitle: string;
  category: EventCategory;
  startAt: string;                 // ISO 8601（+09:00 固定）
  endAt?: string;
  dates?: string[];                // 飛び飛び公演日 "YYYY-MM-DD"
  displayDate: string;             // 画面表示用の日本語（"2026年8月18日(火)〜" 等）
  venue?: string;
  image?: string;                  // "/images/event-<slug>.jpg"。riri と違い optional（画像未入手イベントを許容）
  summary: string;                 // JSON-LD Event の description にも使う
  badges: string[];
  links: EventLink[];
  isImportant?: boolean;
  isNextFocus?: boolean;
};

// SNSリンク（Instagram / TikTok のみ。kind の候補から showroom / x / note を削除）
export type SocialLink = {
  label: string;
  handle: string;                  // "@mako_hawaiian"
  url: string;
  description: string;
  kind: "instagram" | "tiktok" | "web";
};

// src/data/profile.ts
export type Profile = {
  name: string;                    // 表示名（要確認 §1）
  romaji: string;                  // "MAKO"
  catchCopy: string;
  intro: string;
  heroImage: string;
  portraitImage?: string;
  facts: { label: string; value: string }[];  // 本人確認済みの項目のみ
};

// src/data/photos.ts / news.ts / clips.ts — riri と同スキーマを踏襲
export type GalleryPhoto = { src: string; alt: string; date?: string };
export type NewsItem = { date: string; label: string; text: string; url?: string };
export type Clip = {
  src: string;                     // "/videos/tiktok-YYYY-MM-DD.mp4"
  platform: "TikTok" | "Instagram";
  title: string;
  caption: string;
  bgm?: string;
  url: string;                     // 元投稿URL
};
```

riri にある `ScheduleApiEvent`（Google Sheets API 経路）は**移植しない**。データソースはリポジトリ内 `.ts` のみとし、`VITE_SCHEDULE_API_URL` 相当の二重経路は作らない（SSG と相性が悪く、riri でも fallback 経路が実態）。

## 5. コンポーネント設計

### riri から移植するもの（Next.js サーバー/クライアントに振り分けて書き直し）

| コンポーネント | 種別 | 備考 |
|---|---|---|
| Hero | Server | SNSリンクカードを Hero 内に統合（30秒コンセプト） |
| NextEvent | Server | 日時判定はビルド時＋クライアント補正（§注） |
| ScheduleSection / EventCard | Server | タブ切替のみ client |
| ProfileSection | Server | |
| PhotoGallerySection / Photo | Client（ライトボックス） | グリッド自体は Server 可 |
| ClipSection | Client（video 制御） | |
| LinksSection / ExternalButton | Server | |
| NewsBar | Server | |
| BirthdayCountdown / BirthdayBanner | Client | `site.birthday` 未設定なら非描画 |
| SiteHeader / Footer / SectionHeader / Badge / QuickNav / ScrollToTop / ShareSection | ほぼそのまま | Footer は `site.mode` の文言を表示 |
| StructuredData | 廃止 → Next.js の `metadata` API と `<script type="application/ld+json">` を layout/page に直書き | |

> 注: 「次のイベント」判定を純クライアントにすると SSG された HTML と食い違う（hydration mismatch）。**ビルド時に判定した結果を初期表示とし、クライアントで日付が進んでいたら補正する**方式にすること。

### 移植しないもの

SHOWROOM 系（ShowroomSection / LiveBanner / SpecialStreamBanner / StreamSchedule / api/showroom）、りり固有企画（PetSection / CharmSection / FanLetterSection / InterviewSection / SupportersSection / MagazineSpread / AvatarGallery / SearchSeoSection）。まこ固有企画は運用しながら追加する。

### 新規コンポーネント

- **SocialLinkCards**: Hero 直下に置く Instagram / TikTok の2枚カード。各カードは公式ブランドアイコン＋ハンドル名＋「フォローする」。タップ領域を大きく（モバイル幅いっぱい、高さ 64px 以上）。
- **LinkHubStrip**: モバイル下部固定のアクションドック（riri の MobileActionDock 相当）。Instagram / TikTok / スケジュールへのジャンプの3ボタン。

## 6. 画像・動画運用ポリシー（riri のルールを踏襲）

1. **すべて `public/images/` に自己ホスト**。Instagram/TikTok の CDN 直リンク・Google Drive 直リンクは使わない（署名切れ・bot遮断で壊れる）。
2. **取得手順**: 原本を Google Drive の専用フォルダ（**要確認: 「MAKO画像」フォルダを新規作成し ID を AGENTS.md に記載**）に置き、`https://drive.google.com/thumbnail?id=<ファイルID>&sz=w1400` で取得して配置。
3. **命名規則**:
   - Hero/プロフィール: `/images/mako-hero.jpg`, `/images/mako-portrait.jpg`
   - イベント: `/images/event-<slug>.jpg`
   - ギャラリー: `/images/gallery/g01.jpg` 〜（連番、既存最大値+1）
   - 動画: `/videos/tiktok-YYYY-MM-DD.mp4` / `instagram-YYYY-MM-DD.mp4`
   - OGP: `/images/og/og-default.png`（1200×630）
4. **写真はトリミングしない**: モバイルは `block w-full` で全体表示、PC（`sm:`/`lg:`）のみ `object-cover`。`next/image` では `fill`+`object-cover` をPCブレークポイントに限定し、モバイルは `width/height` 指定の自然比率表示。
5. **顔のAI生成禁止**（背景・テクスチャのみ可）。
6. 掲載写真は**本人の公開SNS投稿由来 or 本人提供のみ**。他者が写っている写真は本人確認フローに乗せる。

## 7. SEO / OGP / 構造化データ（過去の反省点の恒久対策）

### SSR/SSG（最優先要件）

- 全セクションの本文テキストを**ビルド時に生成される初期HTMLに含める**（§3 の受け入れ基準）。
- `app/layout.tsx` の `metadata` で title / description / OGP / Twitter Card を定義。

### OGP

- **画像は 1200×630 固定**（優花子サイトの縦長 1366×2048 でカードが崩れた反省）。`/images/og/og-default.png` を必ず用意。
- 内容案: まこさんの写真（トリミングはOGP画像制作時のみ許容）＋サイト名＋ハンドル名。デザインは §8 のトークンに従う。
- `og:title` / `og:description` / `og:image`（絶対URL）/ `og:url` / `og:type=website` / `twitter:card=summary_large_image`。
- 検証を受け入れ基準に含める: デプロイ後に https://www.opengraph.xyz/ 等でカード表示を確認し、Instagram DM に貼った際のプレビューを実機確認。

### JSON-LD（初回リリースに含める。後回しにしない）

- **Person**: `name`（要確認の表記確定後）, `alternateName: "MAKO"`, `url`, `image`, `sameAs: [Instagram, TikTok のURL]`。
- **Event**: `events.ts` の各イベントから生成（`name`, `startDate`, `endDate`, `location.name`, `description`, `image`, `offers.url`(ticket link があれば), `performer` → Person 参照）。過去イベントは `eventStatus` 不要、出力は今後のイベントのみで可。
- **WebSite**: `name`, `url`。
- サイト種別（§0）が `official` でない場合、Person の `url` にこのサイトを入れるのは「本人の公式URL」と誤認されうる。`mode !== "official"` の間は **WebSite.name に「(Approved Fan Site)」を含め、Person.url は省略して sameAs のみ**とする。

## 8. デザイントークン・スタイル方針

**方針: 既存2サイトとレイアウト骨格（セクション構成・カード・余白）は揃えつつ、カラーはまこさん独自にする**。3サイトは同一作者の姉妹サイトだが、推し本人の個性がサイトの顔になるべきで、色まで揃えるメリットがない。

### カラー提案（ハンドル名 `mako_hawaiian` からハワイアン・トロピカル系を提案）

```
--mako-primary:   #FF6B8A  (ハイビスカスピンク — アクセント・CTA)
--mako-secondary: #00A6A6  (オーシャンティール — リンク・バッジ)
--mako-sand:      #FFF6EC  (サンドベージュ — 背景)
--mako-sunset:    #FFB347  (サンセットオレンジ — 誕生日・強調)
--mako-ink:       #2B2B33  (テキスト)
```

- **要確認: まこさん本人に好きな色・イメージカラーを聞く**（DMで一言。「希望伝えるとやってくれる」と伝えてある流れに乗る）。回答があればそれを最優先し、上記は仮置き。
- フォント: 既存踏襲（システムフォント＋見出しに Google Fonts 1書体まで。**セルフホスト（`next/font`）にし、外部リクエストを増やさない**）。
- ダークモード: 初回スコープ外。
- アクセシビリティ: テキストコントラスト WCAG AA（4.5:1）以上。上記パレットの sand 背景 × ink テキストは満たす。primary を本文テキスト色に使わない。

## 9. デプロイ構成

1. GitHub リポジトリ `ackey1007fw-coder/mako-schedule-2026` を新規作成（private ではなく public — Vercel Hobby の慣例に合わせ既存2サイトと同様に。**要確認: 既存2リポジトリの公開設定に合わせる**）。
2. Vercel で該当リポジトリを import、Framework = Next.js（自動検出）。`main` push → 本番自動デプロイ、PR → プレビューデプロイ。
3. 環境変数: 不要（外部APIを持たないため）。増やす場合は AGENTS.md に追記必須。
4. ドメイン: `mako-schedule-2026.vercel.app`（プロジェクト名で確保）。

## 10. AGENTS.md ドラフト（新リポジトリにそのまま置く）

```markdown
# まこ（MAKO）応援スケジュールサイト — エージェント向けガイド

ファン「あっきー」が、まこ（MAKO）さんの了承のもとで運営する応援スケジュールサイトです。
サイト種別（公認ファンサイト／公式）は src/data/site.ts の `mode` が唯一の真実。
**mode の変更は本人合意の記録がある場合のみ**行う。

## リポジトリ / デプロイ
- GitHub: `ackey1007fw-coder/mako-schedule-2026`（`main` → Vercel 自動デプロイ）
- 本番: https://mako-schedule-2026.vercel.app/

## 技術スタック
- Next.js (App Router) + TypeScript + Tailwind CSS。**SSG必須**：
  本文テキストは必ずサーバーコンポーネントで描画し、初期HTMLに含める。
  `"use client"` はカウントダウン・ライトボックス・動画等のインタラクションに限定。
- デプロイ後、`curl -s <本番URL> | grep <名前>` で本文が初期HTMLに入っていることを確認。

## データの場所（ここを編集する）
- `src/data/site.ts` … サイト名・種別(mode)・OGP・誕生日設定
- `src/data/events.ts` … イベント一覧（画面の元データ）
- `src/data/profile.ts` … プロフィール
- `src/data/news.ts` … お知らせ（新しいものを配列の先頭に）
- `src/data/photos.ts` … ギャラリー
- `src/data/clips.ts` … TikTok/Instagram 動画（新しいものを配列の先頭に）

## SNS 投稿を追加する手順
1. 画像を `public/images/gallery/g{次番号}.jpg` に保存（Drive「MAKO画像」フォルダ経由、
   `https://drive.google.com/thumbnail?id=<ID>&sz=w1400`）。動画は `public/videos/`。
2. `news.ts` 先頭に追加（date / label: "Instagram"|"TikTok" / text / url）。
3. `photos.ts` 先頭に追加（src / alt は内容を具体的に）。
4. 動画があれば `clips.ts` 先頭に追加。
5. `npm run typecheck` → `npm run build` → コミット → PR → main マージ。

## 画像の扱い
- すべて `public/images/` に自己ホスト。SNS/Drive の直リンク禁止。
- **写真はトリミングしない**：モバイルは全体表示（`block w-full`）、PCのみ `object-cover`。
- OGP画像は 1200×630 固定（`/images/og/`）。
- 顔写真のAI生成禁止（背景・テクスチャのみ可）。

## 絶対ルール
1. **site.ts の mode と食い違う表記を書かない**（mode=approved-fan の間は「公式」と書かない）。
2. **未確認情報を書かない**。誕生日・本名・所属など本人性に関わる情報は、
   本人確認の記録が無い限り追加しない。推測（SNSのID等からの逆算）も書かない。
3. プロフィール・肩書きの変更は本人確認をとってから。写真・スケジュール追加は事後報告でよい。
4. **X・SHOWROOM へのリンクを追加しない**（本人希望）。連携は Instagram / TikTok のみ。
5. **差分は最小限**。無関係な変更を混ぜない。
6. 案件投稿（PR案件）のメディアは転載しない。リンクのみ。

## SNS（これ以外を追加しない）
- Instagram: `@mako_hawaiian` / TikTok: `@maaako0406`
```

CLAUDE.md は riri と同様に「AGENTS.md を読め」の要点リダイレクトのみ（10行以内）。

## 11. Sonnet / Codex へのタスク分解

依存順。各タスクは独立PRにできる粒度。**[確認待ち]** が付くタスクは §0/要確認の回答が出るまで着手しない（それ以外は今すぐ着手可能）。

### フェーズ1: 骨格（Sonnet）

1. **T1 リポジトリ初期化**: Next.js 15 + TS + Tailwind + lucide-react + @vercel/analytics。AGENTS.md / CLAUDE.md（§10）、`src/data/site.ts`（mode: "approved-fan"）を配置。Vercel 接続。
2. **T2 データ層**: §4 の型定義と `events.ts` / `profile.ts` / `news.ts` / `photos.ts` / `clips.ts` の雛形（プレースホルダ最小データ。未確認情報は入れない）。
3. **T3 レイアウト＋SEO基盤**: `layout.tsx` の metadata（OGP/Twitter Card）、JSON-LD（WebSite / Person / Event、§7 の mode 分岐込み）、Footer の mode 表記。

### フェーズ2: セクション実装（Sonnet、T2/T3 後に並行可）

4. **T4 Hero + SocialLinkCards + NewsBar**（Server。30秒コンセプトのファーストビュー）
5. **T5 Schedule**: NextEvent + ScheduleSection + EventCard（hydration 補正方式 §5 注）
6. **T6 Profile + PhotoGallery + Clips**（画像トリミング禁止パターン厳守）
7. **T7 LinksSection + LinkHubStrip + ShareSection + QuickNav/ScrollToTop**

### フェーズ3: 素材・検証（Codex 主担当）

8. **T8 [確認待ち] 実データ投入**: 本人確認済みプロフィール・実写真（Drive フォルダ作成後）・実イベント。
9. **T9 OGP画像制作**: 1200×630 の `og-default.png`（§7・§8 準拠）。
10. **T10 検証スイート**:
    - `npm run build` 成功・`tsc --noEmit` パス
    - **SSGテスト**: ビルド成果物の HTML に名前・プロフィール文・イベントタイトルが含まれることを grep で検証（CI に組み込む）
    - JSON-LD を Google リッチリザルトテストで検証
    - OGP を opengraph.xyz ＋ Instagram DM 実機で検証
    - Lighthouse: Performance / SEO / Accessibility 90+ をモバイルで
11. **T11 [確認待ち] 公開・本人確認**: プレビューURLを本人に送付 → OK 記録 → main マージ → 必要なら mode 昇格。

### 要確認リスト（作者→本人・作者判断。回答は site.ts / profile.ts / AGENTS.md に反映）

| # | 項目 | 影響 |
|---|---|---|
| Q1 | サイト種別（§0 要判断1〜3） | site.ts の mode、フッター、JSON-LD |
| Q2 | 活動名義の正式表記（まこ / MAKO / フルネーム） | title、JSON-LD Person、Hero |
| Q3 | 誕生日（IDからの推測禁止） | カウントダウン表示可否 |
| Q4 | イメージカラー・好きな色 | §8 パレット確定 |
| Q5 | 事務所・所属の有無 | §0 要判断3 |
| Q6 | 掲載してよい写真の範囲（Drive フォルダ提供 or 公開SNS投稿から選定） | T8 |
| Q7 | プロフィールに載せてよい項目（出身・身長等どこまで公開するか） | profile.ts facts |
