#!/usr/bin/env node
// Codex レビューが「依頼しただけ」で完了扱いになっていないかを確認する。
// 使い方: node scripts/check-codex-review.mjs <pr-number>
//
// 終了コード:
//   0 … Codex未依頼、または最新要求より後に有効なレビューがあり未解決P1/P2なし
//   1 … 最新の @codex review が未完了（未応答・接続エラー・未解決P1/P2）→ 自動マージ禁止
//   2 … 使い方ミス / GitHub API 失敗
import { spawnSync } from "node:child_process";
import { evaluateCodexGate, flattenPages } from "./lib/codexReviewGate.mjs";

const prNumber = (process.argv[2] || "").trim();
if (!/^\d+$/.test(prNumber)) {
  console.error("使い方: node scripts/check-codex-review.mjs <pr-number>");
  process.exit(2);
}

const gh = (args) => {
  const result = spawnSync("gh", args, { encoding: "utf8", maxBuffer: 20 * 1024 * 1024 });
  if (result.status !== 0) {
    console.error(result.stderr || result.stdout || `gh ${args.join(" ")} failed`);
    process.exit(2);
  }
  return result.stdout;
};

const ghJson = (args) => JSON.parse(gh(args));

const ghPaginatedList = (path) => {
  const pages = ghJson(["api", "--paginate", "--slurp", path]);
  return flattenPages(pages);
};

const pr = ghJson(["api", `repos/{owner}/{repo}/pulls/${prNumber}`]);
const owner = pr.base?.repo?.owner?.login;
const repoName = pr.base?.repo?.name;
if (!owner || !repoName) {
  console.error("PR の owner/repo が取得できませんでした。");
  process.exit(2);
}

const issueComments = ghPaginatedList(
  `repos/${owner}/${repoName}/issues/${prNumber}/comments`
);
const reviews = ghPaginatedList(`repos/${owner}/${repoName}/pulls/${prNumber}/reviews`);
const reviewComments = ghPaginatedList(
  `repos/${owner}/${repoName}/pulls/${prNumber}/comments`
);

const fetchReviewThreads = () => {
  // GraphQL の query 本文では {owner}/{repo} プレースホルダは置換されないため変数で渡す。
  // gh api graphql --paginate は pageInfo.hasNextPage / endCursor を見て全ページを取る。
  const query = `query($owner: String!, $name: String!, $number: Int!, $endCursor: String) {
    repository(owner: $owner, name: $name) {
      pullRequest(number: $number) {
        reviewThreads(first: 50, after: $endCursor) {
          pageInfo { hasNextPage endCursor }
          nodes {
            id
            isResolved
            comments(first: 50) {
              nodes { body createdAt author { login } }
            }
          }
        }
      }
    }
  }`;

  const pages = flattenPages(
    ghJson([
      "api",
      "graphql",
      "--paginate",
      "--slurp",
      "-f",
      `query=${query}`,
      "-F",
      `owner=${owner}`,
      "-F",
      `name=${repoName}`,
      "-F",
      `number=${Number(prNumber)}`
    ])
  );

  const threads = [];
  for (const page of pages) {
    const nodes = page?.data?.repository?.pullRequest?.reviewThreads?.nodes || [];
    for (const node of nodes) {
      threads.push({
        id: node.id,
        isResolved: Boolean(node.isResolved),
        comments: (node.comments?.nodes || []).map((comment) => ({
          user: { login: comment.author?.login },
          body: comment.body,
          created_at: comment.createdAt
        }))
      });
    }
  }
  return threads;
};

let reviewThreads = [];
try {
  reviewThreads = fetchReviewThreads();
} catch (error) {
  console.error("reviewThreads の取得に失敗したため、未解決 P1/P2 はレビューコメントから判定します。", error);
  reviewThreads = [
    {
      isResolved: false,
      comments: reviewComments
    }
  ];
}

const result = evaluateCodexGate({
  prBody: pr.body || "",
  prCreatedAt: pr.created_at,
  issueComments,
  reviews,
  reviewComments,
  reviewThreads
});

const printer = result.exitCode === 0 ? console.log : console.error;
printer(result.exitCode === 0 ? `codex-review: ${result.message}` : `\n❌ ${result.message}\n`);
process.exit(result.exitCode);
