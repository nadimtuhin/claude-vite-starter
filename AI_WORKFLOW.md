# AI Workflow Playbook

How to build with Claude Code effectively. Distilled from real project experience.

---

## Session Start

```bash
git status
cat .omc/session-snapshot.md   # if oh-my-claudecode is installed
```

---

## The Core Loop

```
Plan → Approve → ultrawork → TDD check → commit push deploy
```

### 1. Plan before building

For any non-trivial feature, trigger plan mode first:

```
plan [feature description]
```

Claude will:
- Explore the codebase to find existing patterns
- Draft user stories + task backlog
- Write a plan file for your review

You approve before a single line of code is written.

**Prompt pattern that works:**
```
plan add a search feature with debounced input and result cards
```
Then:
```
prepare user stories and task backlog
```
Then review and approve.

---

### 2. Execute with ultrawork

After plan approval, trigger parallel execution:

```
ultrawork
```

Claude orchestrates specialist subagents in parallel — faster than sequential execution, and keeps the main context clean.

---

### 3. TDD check

After implementation:

```
red green tdd e2e done?
```

This forces Claude to verify:
- Unit tests exist and pass
- E2E journey tests cover the feature
- No regressions

---

### 4. Commit + Push + Deploy

```
commit push deploy prod
```

Claude will:
- Run tests to confirm green
- Commit in logical chunks with descriptive messages
- Push to origin
- Deploy to Vercel prod

---

## Prompt Patterns That Work

| Prompt | What happens |
|---|---|
| `plan [feature]` | Enters plan mode, explores codebase, writes plan file |
| `prepare user stories and task backlog` | Structures work items before approving plan |
| `ultrawork` | Parallel agent execution mode |
| `red green tdd e2e done?` | Forces E2E test coverage check |
| `commit push deploy prod` | Full pipeline: test → commit chunks → push → deploy |
| `fix ci pipeline` | Diagnoses CI failures from logs, patches and pushes |
| `check the full api and save in repo {url}` | Fetches external API docs, saves to repo |
| `recap` | Summarizes what was built this session |

---

## Anti-Patterns to Avoid

| Don't | Do instead |
|---|---|
| `make it better` | `refactor ExampleCard to reduce prop drilling — extract context` |
| Skip planning for big features | Always `plan X` first |
| Skip the E2E question | Always ask `red green tdd e2e done?` |
| One giant commit | `commit push deploy prod` — Claude chunks it |
| Vague feature requests | State the user story: "as a user, I want to..." |

---

## Working with External APIs

1. Find the API docs URL
2. `check the full api and save in repo {url}`
3. Claude fetches, extracts all endpoints/params, saves as `{service}-api.md`
4. That doc becomes ground truth for the service layer

---

## CI Philosophy

- **Unit + component + E2E tests**: always run in CI
- **Integration tests** (real network): excluded from CI via `vitest.config.js`, run manually
- CI fails the build — never skip a failing CI, fix root cause

---

## File Ownership Convention

| Directory | What lives here | Who writes |
|---|---|---|
| `src/utils/` | Pure functions, no side effects | Claude + you |
| `src/services/` | API calls, normalized responses | Claude |
| `src/components/` | React UI components | Claude |
| `src/integration/` | Real network tests | Claude |
| `src/e2e/` | Multi-step user journeys | Claude |
| `CLAUDE.md` | Project rules for AI | You (with Claude help) |
| `AI_WORKFLOW.md` | This file | You |
