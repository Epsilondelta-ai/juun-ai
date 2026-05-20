---
name: unit-test
description: Unit-test rules and testability standards.
---

- No hardcoded endpoint URLs; load env; test values in `.env.test`.
- Mock/fake/stub external dependencies; deterministic assertions.
- Fixtures: real-data-derived when possible; ask user if unavailable; tests use fixed fixtures only.
- Target 100% coverage/statements. If hard, improve testability first.
- Frontend: no rendering tests; coverage-ignore behaviorless components; use Storybook for simple render checks; use `bun:test`.
- Backend: Go `testing`; TypeScript `bun:test`.
