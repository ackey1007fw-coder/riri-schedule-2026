# Yukako Schedule 2026 — エージェント向けガイド

このリポジトリは、吉井優花子さんの活動情報を整理するファン制作の応援スケジュールです。

## 役割

- Codex: 実装責任者
- Claude Code: 企画・設計・文章責任者
- あっきー: 総合プロデューサー

## 編集する主な場所

- `src/data/events.ts`: 公演・出演情報
- `src/data/profile.ts`: プロフィール、SHOWROOM、画像、参照元
- `src/data/news.ts`: お知らせ
- `src/data/photos.ts`: 写真・ビジュアル
- `src/data/highlights.ts`: 活動歴
- `src/data/searchFaq.ts`: 検索向けFAQ
- `api/showroom.js`: SHOWROOM公開プロフィール取得

## 運用ルール

- 「公的な応援・広報導線」として健全に運用する。
- 本人や関係者の確認が必要そうな情報は断定しない。
- 恋愛的・私物化的な表現は避ける。
- 既存の別サイトの内容、画像、導線と混同しない。
- 顔写真をAI生成しない。
- 画像は `public/images/` に自己ホストする。

## 反映

`main` へのマージ後、Vercel の Git 連携で本番へ反映されます。PR確認を待たずに進めてよい依頼の場合は、型チェックとビルドを通してからマージします。
