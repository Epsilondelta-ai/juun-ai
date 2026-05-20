---
name: git-style
description: Git workflow.
---

1. Branch from `main`; clear work name.
2. If GitHub remote lacks CI, add `.github/workflows/*` for existing checks on `pull_request` and `push` to `main`.
3. Prefer fast CI order: install, lint, typecheck, unit, e2e.
4. Commit small meaningful units.
5. PR: intent + changes + checks. Multiline body: heredoc → temp file → `--body-file`; verify body.
6. Apply review; merge to `main` only after review and required CI pass.
