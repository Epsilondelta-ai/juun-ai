---
name: task-breakdown
description: Split complex work into ordered, testable tasks before implementation.
---

- Simple request: execute directly.
- Complex request: write `.pi/tasks/{kebab-name}.md`; update while working.
- Ask before ambiguous or hard-to-rollback choices.
- Tasks: small research/implementation/verification units with observable completion criteria.
- Order dependencies; mark independent work `[Parallelizable]`; use subagents for parallel research/review/verification.
- Single writer for normal code edits; worktree-isolated subagents for concurrent implementation.
- Consolidate parallel results before next dependent step.

## Format

```md
## Goal

- One-sentence outcome.

## Task List

### Research

- [ ] Inspect related files. Completion criteria: targets and impact known.

### Implementation

- [ ] Apply change. Completion criteria: requirements reflected.

### Verification

- [ ] Run checks. Completion criteria: behavior confirmed.

## Progress Log

- YYYY-MM-DD HH:mm: created task list
```
