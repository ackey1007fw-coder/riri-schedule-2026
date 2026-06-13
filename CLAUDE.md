# CLAUDE.md

このプロジェクトの保守ルール・規約は **[AGENTS.md](./AGENTS.md)** にまとめています。作業前に必ず読んでください。

要点（詳細は AGENTS.md）:
- `main` → Vercel 自動デプロイ（本番 https://riri-schedule-2026.vercel.app/）。
- 編集する元データ: `src/data/events.ts` / `profile.ts` / `photos.ts`。
- 画像は `public/images/` に**自己ホスト**（Drive直リンク不使用）。新規は Drive サムネ `?id=ID&sz=w1400` を落として配置。
- **写真はトリミングしない**：モバイルは `block w-full`（全体表示）、PCのみ `object-cover`。
- ルール: 「公式/公認」と書かない・未確認情報を書かない・顔をAI生成しない・差分最小。
- 演目: テオリデア=青い制服(聖アリストテレス学院) / アイトキ=月シア別冊『I'm talking about Lovin'』(小劇場)。混同注意。
- `/api/*` は ESM（`export default handler`）で書く。`module.exports` は使わない。
