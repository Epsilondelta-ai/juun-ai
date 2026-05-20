---
name: coding-style
description: Code standards: readability, small units, naming, coverage, Boy Scout cleanup.
---

- Follow existing structure, names, formatting.
- Tests first, then code.
- Names expose role; keep case style.
- Source lines ≤120 chars; do not reflow prose/comments/prompts just for length.
- Small single-purpose functions; readable flow over clever lambdas.
- Explain with code, not comments.
- Boy Scout: clean touched code safely; remove duplication/dead code/complexity/unclear names.
- Touched source files: ≤300 lines; 100% statements/branches/functions/lines.
- Refactor only with passing tests; rerun relevant tests.

## Frontend/TypeScript

- ESLint for quality; Prettier for formatting.
- Run lint, format, typecheck separately.
