# CLAUDE.md

このプロジェクトの保守ルールは [AGENTS.md](./AGENTS.md) にまとめています。

要点:

- 吉井優花子さんの応援スケジュールとして運用する。
- Codex = 実装責任者、Claude Code = 企画・設計・文章責任者、あっきー = 総合プロデューサー。
- `src/data/profile.ts`、`events.ts`、`news.ts`、`photos.ts`、`highlights.ts`、`searchFaq.ts` を中心に更新する。
- SHOWROOM連携は `api/showroom.js` と `src/components/ShowroomSection.tsx`。
- 未確認情報を書かない。恋愛的・私物化的な表現は避ける。
- main へのマージ後、Vercel の Git 連携で本番へ反映される。
