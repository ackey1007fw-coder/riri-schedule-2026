// Codex レビュー完了判定（純粋関数。GitHub I/O は check-codex-review.mjs 側）。
// 最新の @codex review 要求より後に、有効な Codex 応答があるかで判定する。
// 過去の成功レビューは、その後の新しい要求を満たさない。

export const CODEX_BOT = "chatgpt-codex-connector[bot]";
export const REQUEST_RE = /@codex\s+review/i;
export const FAILURE_RE =
  /connect to github|create a Codex account|not connected|account\/connect|timed? ?out|connection error|reviewを実行できない|GitHub接続/i;
export const P1P2_RE = /P1 Badge|P2 Badge|!\[P1|!\[P2/;

export function flattenPages(pages) {
  if (pages == null) return [];
  if (!Array.isArray(pages)) return [pages];
  if (pages.some((page) => Array.isArray(page))) return pages.flat();
  return pages;
}

export function itemTimestamp(item) {
  return (
    item?.submitted_at ||
    item?.submittedAt ||
    item?.created_at ||
    item?.createdAt ||
    null
  );
}

export function toMs(timestamp) {
  if (!timestamp) return null;
  const ms = Date.parse(timestamp);
  return Number.isNaN(ms) ? null : ms;
}

export function actorLogin(item) {
  return item?.user?.login || item?.author?.login || item?.actor?.login || "";
}

export function isCodexBot(item) {
  return actorLogin(item) === CODEX_BOT;
}

function afterLatest(item, latestRequestMs) {
  const ms = toMs(itemTimestamp(item));
  return ms != null && ms > latestRequestMs;
}

function isFailureBody(item) {
  return FAILURE_RE.test(item?.body || "");
}

function isValidReviewBody(item) {
  return !isFailureBody(item) && (item?.body || "").trim().length > 0;
}

function isThumbsUp(item) {
  const content = item?.content || item?.content_type;
  return content === "+1" || content === "THUMBS_UP";
}

function collectRequests({ prBody, prCreatedAt, issueComments }) {
  const requests = [];
  if (REQUEST_RE.test(prBody || "")) {
    requests.push({ source: "pr-body", at: prCreatedAt });
  }
  for (const comment of issueComments) {
    if (REQUEST_RE.test(comment.body || "")) {
      requests.push({ source: "issue-comment", at: itemTimestamp(comment) });
    }
  }
  return requests;
}

function unresolvedP1P2Threads(reviewThreads) {
  return (reviewThreads || []).filter((thread) => {
    if (thread?.isResolved) return false;
    const comments = thread?.comments || [];
    return comments.some((comment) => isCodexBot(comment) && P1P2_RE.test(comment.body || ""));
  });
}

/**
 * @returns {{ status: "skip" | "pass" | "fail", exitCode: number, message: string }}
 */
export function evaluateCodexGate({
  prBody = "",
  prCreatedAt = null,
  issueComments = [],
  reviews = [],
  reviewComments = [],
  reviewThreads = [],
  reactions = []
} = {}) {
  const requests = collectRequests({ prBody, prCreatedAt, issueComments });
  if (requests.length === 0) {
    return {
      status: "skip",
      exitCode: 0,
      message: "Codexレビュー未依頼のためゲートをスキップします。"
    };
  }

  const requestTimes = requests.map((request) => toMs(request.at)).filter((ms) => ms != null);
  if (requestTimes.length === 0) {
    return {
      status: "fail",
      exitCode: 1,
      message: "最新の @codex review 要求に created_at がなく、完了判定できません。自動マージしないでください。"
    };
  }

  const latestRequestMs = Math.max(...requestTimes);
  const later = (items) => items.filter((item) => isCodexBot(item) && afterLatest(item, latestRequestMs));

  const laterIssueComments = later(issueComments);
  const laterReviews = later(reviews);
  const laterLineComments = later(reviewComments);
  const laterReactions = reactions.filter(
    (item) => isCodexBot(item) && afterLatest(item, latestRequestMs) && isThumbsUp(item)
  );

  const laterFailures = [...laterIssueComments, ...laterReviews, ...laterLineComments].filter(isFailureBody);
  const laterValidReviews = laterReviews.filter(isValidReviewBody);
  const laterValidLines = laterLineComments.filter(isValidReviewBody);
  const hasValidResponse =
    laterValidReviews.length > 0 || laterValidLines.length > 0 || laterReactions.length > 0;

  if (laterFailures.length > 0 && !hasValidResponse) {
    const preview = laterFailures
      .map((item) => `   - ${(item.body || "").split("\n")[0].slice(0, 200)}`)
      .join("\n");
    return {
      status: "fail",
      exitCode: 1,
      message:
        `最新の @codex review 要求より後の Codex 応答が接続エラー等です。自動マージしないでください。\n${preview}`
    };
  }

  if (!hasValidResponse) {
    return {
      status: "fail",
      exitCode: 1,
      message:
        "最新の @codex review 要求より後に、Codex の有効なレビュー応答がありません（未応答）。過去の成功レビューでは足りません。自動マージしないでください。"
    };
  }

  const unresolved = unresolvedP1P2Threads(reviewThreads);
  if (unresolved.length > 0) {
    return {
      status: "fail",
      exitCode: 1,
      message: `未解決の P1/P2 が ${unresolved.length} 件残っています。自動マージしないでください。`
    };
  }

  return {
    status: "pass",
    exitCode: 0,
    message:
      `最新の @codex review 要求より後に Codex レビューが完了し、未解決 P1/P2 はありません` +
      `（reviews=${laterValidReviews.length}, line comments=${laterValidLines.length}, +1 reactions=${laterReactions.length}）。`
  };
}
