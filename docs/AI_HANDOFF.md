# AI_HANDOFF — riri-schedule-2026

> 最終更新: 2026-10-18（Claude Code が、これまでの制作・運用の全体を次のAIへ引き継ぐために作成）
> 読む順番: `AGENTS.md` → `README.md` → **このファイル** → `docs/DECISION_LOG.md` → `docs/AI_PROJECT_MEMORY_SKILL.md` → 対象コード・テスト

「いまの状態」のセーブデータです。ルール本体は `AGENTS.md`。ここはルールを追加・緩和しません。

---

## 1. このプロジェクトは何か

- 夏凪里季（なつなぎ りり）さんの**非公式の応援スケジュールサイト**（`応援スケジュール / Fan Schedule`）。
- 公開コンテンツは常に「ファン / サポーターとして応援している立場」で書く。個人的な関係性・DM・非公開情報は一切持ち込まない。

| 項目 | 値 |
| --- | --- |
| repo | `ackey1007fw-coder/riri-schedule-2026`（public） / base `main` |
| 本番 | https://riri-schedule-2026.vercel.app/ （`main` merge → Vercel 自動デプロイ） |
| stack | Vite / React / TypeScript / Tailwind / pnpm / Vercel Functions（ESM） / 任意で Google Sheets + Apps Script API |
| 姉妹サイト | 吉井優花子さんの応援サイトは**別repo** `ackey1007fw-coder/yukako-schedule-2026`。人物・SNS・演目・画像すべて別物 |
| 親ポータル | フッターの「応援アーカイブ」→ https://ouen-archive-564c.vercel.app/ （別repo `ouen-archive`）。このサイトは `src/lib/portalFeed.ts` で feed を提供 |

## 2. いま公開されているもの

1ページ構成（`src/App.tsx`）。主なセクション:

- Hero / 次の出演（NextEvent）/ 今日の動き / ライブ・特別配信バナー
- スケジュール（一覧・カレンダー・カレンダーへの書き出し）と会場地図（`VenueLinks` / `VenueMap`）
- 演目特集: ピッパラの樹、アイトキ（月シア別冊『I'm talking about Lovin'』）、天竺生地 vol.28、月シア上映『月を跨ぐ』vol.20、Night Cruise Log など
- お知らせ（NewsBar）/ フォトギャラリー / 動画クリップ / 歩み（Highlights）/ プロフィール / 魅力 / ペット / SHOWROOM / リンク / シェア
- 誕生日まわり（カウントダウン・当日バナー・メモリーズ。誕生日は 6月24日）

API: `/api/showroom`（統計）、`/api/showroom-image`（画像プロキシ）、`/api/frecam-schedule`。

CI / guard: `ci.yml`（typecheck / build / test）、`site-guard.yml`（Site Identity Guard）、`image-guard.yml`（既存画像の同名上書き禁止）。

## 3. 現在地点（2026-10-18 時点）

- 直近のmerge: CIの実行環境更新（#159 / #161、2026-10-07〜08）。コンテンツの最終追加は 10/5 本人Xの写真（#157）。
- 10月に入ってからの更新頻度は低め。Open PR に 10/6 の本人X投稿（#158）、10/7 配信予定（#160 Draft）などが残っている。
- `profile.ts` の学年・活動状況など時間で変わる値は、**最新の本人公式情報で確認してから**更新する（記憶で直さない）。

## 4. 未完了・次にやること

- Open / Draft PR 12本前後（2026-10-18 時点）。Cursor 由来の古い NEWS 追加 Draft（9月分）が多い。**同じファイルを触る前に確認**し、統合・closeはオーナーに提案する（勝手に close しない）。
- #158（10/6 本人X）の状態確認 → 条件を満たしていればmerge判断。
- 新しい出演情報が出たら `events.ts` と `venues.ts`（住所は出典つき）を更新。

## 5. 日々の更新の型

`AGENTS.md`「SNS 投稿を追加する手順」が正本。要点:

1. 提供素材（チャット添付・オーナー指定の原本）を使う。SNSスクレイピング・署名URL直保存はしない。
2. 写真は `public/images/gallery/g{次番号}.jpg`（最大番号を確認、上書き禁止）→ `pnpm run images:build`（`imageManifest.ts` は手で書かない）。
3. `news.ts`（`YYYY.M.D`、元投稿の日時順）→ `photos.ts`（`src / alt`、必要なら `credit`）→ 動画は `clips.ts`。
4. 品質ゲート → PR → CI green → 自動squash mergeの条件を current head で確認 → merge → 本番確認。

```bash
pnpm install --frozen-lockfile
pnpm run typecheck && pnpm test && pnpm run build
node scripts/check-site-identity.mjs main
git diff --check
```

## 6. ハマりどころ（実際に踏んだもの）

- **サイト取り違え**: かつて1repo2ブランチで優花子サイトと同居していた時期に、`main` へ優花子サイトの変換コミットが入り revert した（#15、2026-06-29）。ヒーロー画像もrepo取り違えで誤変更し revert（#28）。→ 作業前に `profile.ts` の `name` が「夏凪 里季」であることを必ず確認。
- **文字化け**: 5月末に `profile.ts` / `events.ts` / `links.ts` の UTF-8 が壊れ、復旧コミットが必要になった。日本語ファイルは UTF-8 のまま扱い、差分に化けがないか確認する。
- 演目の略称だけで判断しない。テオリデア=『青い制服』（聖アリストテレス学院）/ アイトキ=月シア別冊『I'm talking about Lovin'』（小劇場）。`events.ts` の正式題名・会場・日程で照合する。
- 写真はトリミングしない。モバイルは `block w-full`、PCの固定枠だけ `object-cover`。
- `/api/*` は ESM（`export default`）。`module.exports` は関数を落とす。
- alt に未確認の人物名・感情・関係性を書かない（#140 / #144 など alt 修正が続いた）。

## 7. 変更禁止・要確認

- 「公式」「公認」と書かない。未確認情報を書かない。顔写真をAI生成しない。差分最小。
- `main` に直接pushしない。自動mergeは `AGENTS.md`「自動squash mergeの条件」をすべて満たすときだけ。
- 私的DM・非公開の人間関係・住所・連絡先・家族情報・制作者の職業を、コード・PR・文書に入れない。

## 8. 心構え

- 主役は里季さん。初めて来た人が「次にどこで会えるか」「どう応援できるか」をすぐ分かることを最優先にする。
- 確認できた事実だけを、出典つきで。分からないことは書かない。
- 本人への敬意と長期的な信頼を、短期の反応より優先する。
- 他AI・他ブランチの作業を上書きしない。小さく、検証してから出す。

## 9. 反省と改善

| 反省 | 改善（いまの仕組み） |
| --- | --- |
| 1repo2ブランチ運用で、`main` に別人物のサイトが混入した | 優花子サイトを独立repoへ分離（2026-07）。Site Identity Guard（name / room_id / title / 本番URL の複数シグナル）をCI化 |
| 画像を同名で差し替え、キャッシュ・取り違えの原因になった | Image Overwrite Guard。新しいファイル名で追加する |
| UTF-8 の文字化けがデータファイルに入った | 差分確認を品質ゲートに含め、`git diff --check` を必須化 |
| AIが自動運用で品質ゲートを飛ばす懸念 | #71 で CI 必須化・squash merge・Codexレビュー完了判定（`scripts/check-codex-review.mjs`）を明文化 |
| altに推測が混じった | 「画面で確認できる内容だけ」を AGENTS に明記 |
