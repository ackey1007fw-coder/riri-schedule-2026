#!/usr/bin/env node
// Codex レビューが「依頼しただけ」で完了扱いになっていないかを確認する。
// 使い方: node scripts/check-codex-review.mjs <pr-number>
//
// 終了コード:
//   0 … Codex未依頼、または実際にレビュー処理が完了している
//   1 … Codexを依頼したが完了していない（接続エラー・未応答など）→ 自動マージ禁止
//   2 … 使い方ミス / GitHub API 失敗
import { spawnSync } from "node:child_process";

const CODEX_BOT = "chatgpt-codex-connector[bot]";
const REQUEST_RE = /@codex\s+review/i;
const FAILURE_RE =
  /connect to github|create a Codex account|not connected|account\/connect|timed? ?out|connection error|reviewを実行できない|GitHub接続/i;

const prNumber = (process.argv[2] || "").trim();
if (!/^\d+$/.test(prNumber)) {
  console.error("使い方: node scripts/check-codex-review.mjs <pr-number>");
  process.exit(2);
}

const gh = (path) => {
  const result = spawnSync("gh", ["api", path], { encoding: "utf8" });
  if (result.status !== 0) {
    console.error(result.stderr || result.stdout || `gh api ${path} failed`);
    process.exit(2);
  }
  return JSON.parse(result.stdout);
};

const issueComments = gh(`repos/ackey1007fw-coder/riri-schedule-2026/issues/${prNumber}/comments`);
const reviews = gh(`repos/ackey1007fw-coder/riri-schedule-2026/pulls/${prNumber}/reviews`);
const reviewComments = gh(
  `repos/ackey1007fw-coder/riri-schedule-2026/pulls/${prNumber}/comments`,
);
const pr = gh(`repos/ackey1007fw-coder/riri-schedule-2026/pulls/${prNumber}`);

const requested =
  REQUEST_RE.test(pr.body || "") ||
  issueComments.some((c) => REQUEST_RE.test(c.body || ""));

const failureComments = [...issueComments, ...reviews, ...reviewComments].filter(
  (item) => item.user?.login === CODEX_BOT && FAILURE_RE.test(item.body || ""),
);

const completedReviews = reviews.filter(
  (item) =>
    item.user?.login === CODEX_BOT &&
    !FAILURE_RE.test(item.body || "") &&
    (item.body || "").trim().length > 0,
);
const completedLineComments = reviewComments.filter(
  (item) => item.user?.login === CODEX_BOT && !FAILURE_RE.test(item.body || ""),
);
const completed = completedReviews.length > 0 || completedLineComments.length > 0;

if (!requested) {
  console.log(
    `codex-review: PR #${prNumber} に @codex review 依頼は見当たりません。Codexゲートはスキップします。`,
  );
  process.exit(0);
}

if (failureComments.length > 0 && !completed) {
  console.error(
    `\n❌ Codexレビューは完了していません（接続エラー等）。自動マージしないでください。\n` +
      failureComments
        .map((item) => `   - ${(item.body || "").split("\n")[0].slice(0, 200)}`)
        .join("\n"),
  );
  process.exit(1);
}

if (!completed) {
  console.error(
    `\n❌ PR #${prNumber} は @codex review を依頼済みですが、Codexの review submission / 指摘コメントがありません。\n` +
      `   「未解決P1/P2が0件」だけではレビュー完了ではありません。自動マージしないでください。\n`,
  );
  process.exit(1);
}

console.log(
  `✅ codex-review: PR #${prNumber} は Codex のレビュー処理が完了しています` +
    `（reviews=${completedReviews.length}, line comments=${completedLineComments.length}）。`,
);
