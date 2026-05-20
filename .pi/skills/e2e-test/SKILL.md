---
name: e2e-test
description: E2E test rules.
---

## Backend

- If unit coverage is 100%, treat system as covered; no e2e required.

## Frontend

- Use Playwright.
- Assert user-visible screens/copy/roles/states, not internals.
- Prefer `getByRole`, `getByLabel`, `getByText`; test IDs only if needed.
- Tests independent: no shared session/storage/data.
- Default backend: network mocks/fixtures.
- Real backend only on explicit request.
