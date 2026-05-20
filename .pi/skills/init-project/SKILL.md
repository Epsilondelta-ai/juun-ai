---
name: init-project
description: New project setup defaults.
---

- Check existing init script first.
- Prefer official generators, minimal structure/tools.
- TypeScript: `bun init`.
- Frontend: `bun create astro`; add ESLint, Prettier, Storybook.
- Prettier: `printWidth: 120` unless template differs.
- Backend: prefer Go.
