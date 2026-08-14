import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  CODEX_BOT,
  evaluateCodexGate,
  flattenPages
} from "./lib/codexReviewGate.mjs";

const bot = { login: CODEX_BOT };
const human = { login: "cursor[bot]" };

const t = (iso) => iso;

describe("flattenPages", () => {
  it("flattens slurped GitHub pages so a later-page @codex review is visible", () => {
    const page1 = Array.from({ length: 100 }, (_, index) => ({
      user: human,
      body: `old ${index}`,
      created_at: "2026-08-01T00:00:00Z"
    }));
    const page2 = [
      {
        user: human,
        body: "@codex review",
        created_at: "2026-08-14T12:00:00Z"
      }
    ];
    const comments = flattenPages([page1, page2]);
    assert.equal(comments.length, 101);
    assert.equal(comments.at(-1).body, "@codex review");

    const result = evaluateCodexGate({ issueComments: comments });
    assert.equal(result.status, "fail");
    assert.match(result.message, /未応答/);
  });
});

describe("evaluateCodexGate", () => {
  it("Codexレビュー未依頼 → gate skip", () => {
    const result = evaluateCodexGate({
      issueComments: [{ user: human, body: "hello", created_at: t("2026-08-14T10:00:00Z") }]
    });
    assert.equal(result.status, "skip");
    assert.equal(result.exitCode, 0);
  });

  it("最新のレビュー要求に正常レビューが返る → pass", () => {
    const result = evaluateCodexGate({
      issueComments: [
        { user: human, body: "@codex review", created_at: t("2026-08-14T12:00:00Z") }
      ],
      reviews: [
        {
          user: bot,
          body: "### 💡 Codex Review\nLooks good.",
          submitted_at: t("2026-08-14T12:05:00Z")
        }
      ]
    });
    assert.equal(result.status, "pass");
    assert.equal(result.exitCode, 0);
  });

  it("過去に成功レビューあり、その後の最新要求が未応答 → fail", () => {
    const result = evaluateCodexGate({
      issueComments: [
        { user: human, body: "@codex review", created_at: t("2026-08-14T10:00:00Z") },
        { user: human, body: "@codex review", created_at: t("2026-08-14T13:00:00Z") }
      ],
      reviews: [
        {
          user: bot,
          body: "### 💡 Codex Review\nfirst pass",
          submitted_at: t("2026-08-14T10:05:00Z")
        }
      ]
    });
    assert.equal(result.status, "fail");
    assert.equal(result.exitCode, 1);
    assert.match(result.message, /未応答|過去の成功/);
  });

  it("過去に成功レビューあり、その後の最新要求が接続エラー → fail", () => {
    const result = evaluateCodexGate({
      issueComments: [
        { user: human, body: "@codex review", created_at: t("2026-08-14T10:00:00Z") },
        { user: human, body: "@codex review", created_at: t("2026-08-14T13:00:00Z") },
        {
          user: bot,
          body: "To use Codex here, create a Codex account and connect to github",
          created_at: t("2026-08-14T13:00:05Z")
        }
      ],
      reviews: [
        {
          user: bot,
          body: "### 💡 Codex Review\nfirst pass",
          submitted_at: t("2026-08-14T10:05:00Z")
        }
      ]
    });
    assert.equal(result.status, "fail");
    assert.equal(result.exitCode, 1);
    assert.match(result.message, /接続エラー/);
  });

  it("最新要求のあとに正常レビューが返る → pass", () => {
    const result = evaluateCodexGate({
      issueComments: [
        { user: human, body: "@codex review", created_at: t("2026-08-14T10:00:00Z") },
        { user: human, body: "@codex review", created_at: t("2026-08-14T13:00:00Z") }
      ],
      reviews: [
        {
          user: bot,
          body: "### 💡 Codex Review\nfirst pass",
          submitted_at: t("2026-08-14T10:05:00Z")
        },
        {
          user: bot,
          body: "### 💡 Codex Review\nsecond pass",
          submitted_at: t("2026-08-14T13:05:00Z")
        }
      ]
    });
    assert.equal(result.status, "pass");
    assert.equal(result.exitCode, 0);
  });

  it("コメントが複数ページにまたがっても最新要求を見落とさない → pass", () => {
    const page1 = Array.from({ length: 100 }, (_, index) => ({
      user: human,
      body: `noise ${index}`,
      created_at: "2026-08-01T00:00:00Z"
    }));
    const page2 = [
      { user: human, body: "@codex review", created_at: t("2026-08-14T12:00:00Z") }
    ];
    const result = evaluateCodexGate({
      issueComments: flattenPages([page1, page2]),
      reviews: [
        {
          user: bot,
          body: "### 💡 Codex Review\nok",
          submitted_at: t("2026-08-14T12:10:00Z")
        }
      ]
    });
    assert.equal(result.status, "pass");
    assert.equal(result.exitCode, 0);
  });

  it("未解決P1/P2が残っている場合はmerge不可", () => {
    const result = evaluateCodexGate({
      issueComments: [
        { user: human, body: "@codex review", created_at: t("2026-08-14T12:00:00Z") }
      ],
      reviews: [
        {
          user: bot,
          body: "### 💡 Codex Review\nfound issues",
          submitted_at: t("2026-08-14T12:05:00Z")
        }
      ],
      reviewThreads: [
        {
          isResolved: false,
          comments: [
            {
              user: bot,
              body: "![P1 Badge](https://img.shields.io/badge/P1-orange?style=flat) Require completion after the latest review request",
              created_at: t("2026-08-14T12:05:01Z")
            }
          ]
        }
      ]
    });
    assert.equal(result.status, "fail");
    assert.equal(result.exitCode, 1);
    assert.match(result.message, /未解決の P1\/P2/);
  });

  it("解決済みP1/P2だけなら pass", () => {
    const result = evaluateCodexGate({
      issueComments: [
        { user: human, body: "@codex review", created_at: t("2026-08-14T12:00:00Z") }
      ],
      reviews: [
        {
          user: bot,
          body: "### 💡 Codex Review\nfound issues",
          submitted_at: t("2026-08-14T12:05:00Z")
        }
      ],
      reviewThreads: [
        {
          isResolved: true,
          comments: [
            {
              user: bot,
              body: "![P2 Badge](https://img.shields.io/badge/P2-yellow?style=flat) paginate",
              created_at: t("2026-08-14T12:05:01Z")
            }
          ]
        }
      ]
    });
    assert.equal(result.status, "pass");
    assert.equal(result.exitCode, 0);
  });
});
