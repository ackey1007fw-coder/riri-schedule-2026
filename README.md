# Riri Schedule 2026

夏凪里季さんの活動予定、出演情報、SNS、SHOWROOM情報をまとめる Fan Schedule サイトです。

## Stack

- Vite
- React
- TypeScript
- Tailwind CSS
- Google Sheets + Apps Script JSON API

## Local Setup

```bash
pnpm install
pnpm dev
```

## Environment

Create `.env.local` when using the Google Sheets API.

```bash
VITE_SCHEDULE_API_URL=https://script.google.com/macros/s/xxxxx/exec
```

If `VITE_SCHEDULE_API_URL` is not set, the site uses fallback data in `src/data`.

## Google Sheets API

Paste `google-apps-script/schedule-api.gs` into Google Sheets Apps Script, then deploy it as a web app.

Recommended deploy settings:

- Execute as: Me
- Who has access: Anyone

## Deploy

Recommended: Vercel

- Framework Preset: Vite
- Build Command: `pnpm build`
- Output Directory: `dist`

## Analytics

Vercel Web Analytics is included through `@vercel/analytics/react` in `src/App.tsx`.

Access data is not shown on the public site. To view page views and visitor trends, open the Vercel dashboard, select `riri-schedule-2026`, then open `Analytics`.

If tracking data does not appear, enable Web Analytics for the project in Vercel and redeploy from `main`.
