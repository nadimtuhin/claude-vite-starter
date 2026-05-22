# AI Workflow Playbook

How to build with Claude Code effectively. Distilled from real project experience.

---

## Prerequisites: Global Skills

Some prompts in this playbook require the **oh-my-claudecode** plugin installed globally. Without it, `ultrawork`, `plan`, and session snapshots won't activate.

**Install once:**
```bash
claude mcp add oh-my-claudecode  # or follow https://github.com/oh-my-claude/oh-my-claudecode
```

**This template also ships project-local skills** in `.claude/skills/` — these work immediately without any global setup:

| Skill | Trigger | What it does |
|---|---|---|
| `run` | "run the app", "start dev server" | Starts Vite, checks for port conflicts |
| `deploy` | "deploy", "commit push deploy prod" | Test → commit chunks → push → Vercel prod |
| `tdd-check` | "red green tdd e2e done?" | Verifies all 4 test layers are covered |
| `api-docs` | "check the full api and save in repo {url}" | Fetches + saves external API docs |

Project-local skills live in `.claude/skills/{name}/SKILL.md`. Claude picks them up automatically when you open the project.

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
| `.claude/skills/` | Project-local Claude skills | You |
| `CLAUDE.md` | Project rules for AI | You (with Claude help) |
| `AI_WORKFLOW.md` | This file | You |

---

## Writing Project-Local Skills

Add a skill when you find yourself typing the same multi-step instruction repeatedly, or when Claude keeps getting a workflow wrong.

### File location

```
.claude/skills/{skill-name}/SKILL.md
```

### Format

```markdown
---
name: skill-name
description: When to invoke — list trigger phrases the user would type. This is what Claude scans to decide whether to activate the skill.
---

# Skill Title

## Step 1: ...

## Step 2: ...

## Rules
- Rule 1
- Rule 2
```

### Good skill candidates

| Trigger | Write a skill for... |
|---|---|
| Repeated deployment steps | `deploy` — project-specific deploy sequence |
| Non-obvious test command | `test` — custom test flags or setup |
| External service integration | `{service}` — auth flow, rate limits, quirks |
| Domain-specific workflow | `{workflow}` — multi-step business process |

### What makes a good skill

- **Specific triggers**: Claude activates skills by matching description text against what you type. More specific = fewer false activations.
- **Steps not rules**: Skills work best as procedures ("do X then Y") not policies ("always Z").
- **Short**: Under 100 lines. If it's longer, split into two skills.
- **Tested**: After writing, type the trigger phrase and verify Claude activates the skill.

### Example: custom deploy skill

```markdown
---
name: deploy-staging
description: Deploy to staging environment. Triggers: "deploy staging", "push to staging", "test on staging".
---

# Deploy to Staging

1. Run tests: `pnpm test -- --run`
2. Build: `pnpm run build`
3. Deploy: `vercel --target=staging`
4. Report preview URL
```
