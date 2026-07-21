---
description: In-depth code review focused on security and logical bugs
---

Perform an in-depth code review of this codebase (or the current diff if one exists), focused on **security vulnerabilities** and **logical bugs**. Ignore style/formatting nits.

Check for:

**Security**
- Injection (SQL, command, XSS, template)
- Broken auth/authorization — missing checks, IDOR, trusting client-supplied user IDs
- Secrets committed or logged
- Unsafe deserialization, path traversal, SSRF
- Missing input validation at API boundaries (route handlers, server actions)
- CSRF on state-changing requests

**Logical bugs**
- Off-by-one, incorrect conditionals, inverted booleans
- Race conditions / unhandled async ordering
- Incorrect error handling (swallowed errors, wrong fallback behavior)
- Edge cases: empty arrays, null/undefined, zero, negative numbers, timezone/date math
- State mutation bugs, stale closures

Steps:
1. If there's an uncommitted diff (`git diff`, `git diff --staged`) or a recent commit, prioritize reviewing that. Otherwise review the full `src/` tree.
2. Follow the project's `/docs` standards (`docs/ui.md`, `docs/data-fetching.md`, `docs/data-mutations.md`, `docs/auth.md`) to know what "correct" looks like here.
3. For each finding, report: file:line, the concrete failure scenario (bad input → bad outcome), and a suggested fix. Skip anything you can't back with a concrete scenario.
4. Rank findings most severe first. Be concise — no fluff.
