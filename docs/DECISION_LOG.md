# DECISION_LOG — riri-schedule-2026

長く守る判断と、その理由。**追記のみ**（変更するときは新しい行で「D-xx を置き換え」と書く）。
2026-10-18 に、それまでのPR・`AGENTS.md`・`CLAUDE.md` に散らばっていた既存判断を集約して作成した。「日付」はそのルールが入ったおおよその時期。

| ID | 日付 | 判断 | 理由 | 影響範囲・根拠 |
| --- | --- | --- | --- | --- |
| D-01 | 2026-05 | 非公式の応援スケジュールサイト。「公式」「公認」と書かず `応援スケジュール / Fan Schedule` を使う | 本人運営と誤認させない | 全ページ / `AGENTS.md` |
| D-02 | 2026-06-29 | このrepoの `main` = 夏凪里季サイト。優花子サイトは 2026-07 に別repo `yukako-schedule-2026` へ独立 | 1repo2ブランチ運用で `main` に別人物のサイトが混入した（#15） | repo構成 / `AGENTS.md` |
| D-03 | 2026-07-02 | Site Identity Guard（複数シグナル）と Image Overwrite Guard を CI で必須にする | 取り違え・同名上書きを人の注意ではなく機械で止める（#33） | `scripts/check-site-identity.mjs` / `.github/workflows/site-guard.yml` / `image-guard.yml` |
| D-04 | 2026-05 | 画像は `public/images/` に自己ホスト。SNS・Driveの直リンクを本番に入れない。Drive の受け渡しURL・IDを公開データへ転記しない | リンク切れ・権利・プライバシー | `AGENTS.md` 写真creditと表示 |
| D-05 | 2026-07 | 写真はトリミング・顔加工しない。モバイルは `block w-full`、PCの固定枠のみ `object-cover`。顔のAI生成は禁止 | 本人への敬意と事実性 | `CLAUDE.md` / `AGENTS.md` |
| D-06 | 2026-07 | `/api/*` は ESM（`export default handler`） | `package.json` が `"type": "module"`。CJS だと関数がクラッシュする | `api/` |
| D-07 | 2026-07-26 | 会場地図は `venueMap.ts` のヘルパー経由。一覧は軽い `VenueLinks`、iframe は特集の `VenueMap` のみ。現在地は推測・保存しない | 表示性能とプライバシー | `src/lib/venueMap.ts` |
| D-08 | 2026-08-18 | AIの自動運用: typecheck / build / test を CI 必須にし、条件を満たせば squash merge。Codexレビューを要求した場合は最新要求以降の有効応答で完了判定 | 自動運用でも品質ゲートを飛ばさない（#71） | `AGENTS.md` PR・レビュー・マージ / `scripts/check-codex-review.mjs` |
| D-09 | 2026-08-19 | 親ポータル「応援アーカイブ」へ feed を提供し、フッターに控えめな戻り導線を置く | 複数の応援サイトを横断で見られるようにする | `src/lib/portalFeed.ts` / `scripts/portal-feed.test.mjs` |
| D-10 | 2026-08 | `news / photos / clips` は元投稿の日時順。未確認の時刻を推測しない。いいね数等の変動値は保存しない | 時系列の正確さ | `AGENTS.md` 時系列 |
| D-11 | 2026-09-07 | サブエージェントは原則自動起動しない（最大2・再帰禁止） | 使用枠の節約（#118） | `AGENTS.md` |
| D-12 | 2026-10-18 | オーナーの明示依頼により Project Memory（HANDOFF / DECISION_LOG / SKILL）を導入 | 複数AI・複数チャットで説明し直しなく引き継ぐ | `docs/` |
| D-13 | 2026-10-25 | イベントJSON-LDは表示中の予定を使い、主催・住所・入場Offerは根拠付きの値だけ出力。非公開会場・無料・在庫・未確認の終了時刻を補完しない。警告削減とGoogleイベント機能の適格性を区別する | Search Console改善推奨への対応で虚偽の情報や販売条件を生成しない | `src/lib/eventStructuredData.ts` / `docs/EVENT_STRUCTURED_DATA.md` / 回帰テスト |
