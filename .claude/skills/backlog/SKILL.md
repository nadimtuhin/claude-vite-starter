---
name: backlog
description: Generate or refresh the project backlog by analyzing current codebase state, git history, TODOs, test gaps, and known pain points. Triggers: "generate backlog", "update backlog", "refresh backlog", "what should we build next", "backlog generation", "what's left to do".
---

# Backlog Generation

Analyze the project and produce a prioritized, actionable backlog. Updates `BACKLOG.md`.

## Step 1: Gather signals

Run in parallel:

```bash
# Recent work (what's done)
git log --oneline -20

# Uncommitted work in progress
git status --short

# TODOs and FIXMEs in source
grep -r "TODO\|FIXME\|HACK\|XXX\|TEMP" src/ --include="*.js" --include="*.jsx" --include="*.ts" --include="*.tsx" -n 2>/dev/null | head -30

# Test coverage gaps (files without tests)
find src/components -name "*.jsx" ! -name "*.test.jsx" | sort
find src/utils -name "*.js" ! -name "*.test.js" | sort

# Existing backlog
cat BACKLOG.md 2>/dev/null || echo "(no backlog yet)"
```

Also read:
- `CLAUDE.md` — project conventions and goals
- `src/App.jsx` — understand current feature set
- `src/services/api.js` — understand API surface (what's used vs what could be used)

## Step 2: Identify backlog sources

Scan for:

| Source | What to look for |
|---|---|
| TODOs in code | Explicit deferred work |
| Untested files | Components/utils without `.test.*` |
| Missing E2E coverage | Features in App with no `src/e2e/` test |
| API endpoints defined but unused | Functions in `services/` never called |
| UX gaps | Loading states, empty states, error states missing |
| Accessibility | Missing `aria-*`, no keyboard nav on interactive elements |
| Performance | Large components that could be lazy-loaded |
| CI/DX | Missing lint rules, slow tests, flaky tests |

## Step 3: Write BACKLOG.md

Format each item as:

```markdown
- [ ] **[Area]** Short action-oriented description — *why it matters*
```

Organize into sections:

```markdown
# Backlog

## In Progress
<!-- items actively being built -->

## High Priority
<!-- bugs, broken UX, missing critical features -->

## Medium Priority
<!-- polish, test gaps, DX improvements -->

## Low Priority / Ideas
<!-- nice to have, future exploration -->

## Done
<!-- completed items — keep last 10, archive the rest -->
```

Rules:
- Each item is specific enough to hand to Claude in one message
- No vague items like "improve performance" — write "lazy-load VideoSection with 900ms delay"
- Mark items with `[Area]` tag: **Bug**, **Feature**, **Test**, **DX**, **A11y**, **Perf**
- If BACKLOG.md already exists, merge — don't discard existing items

## Step 4: Report

Tell the user:
- How many new items were found vs already tracked
- Top 3 highest priority items to tackle next
- Any critical gaps (e.g., no E2E tests, untested component)
