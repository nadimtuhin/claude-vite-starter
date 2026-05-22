---
name: deploy
description: Use when the user asks to deploy, ship, or push to production. Triggers: "deploy", "ship it", "push to prod", "deploy prod", "go live", "commit push deploy prod".
---

# Deploy This App

## Full pipeline

Run tests → commit in logical chunks → push → deploy to Vercel.

### Step 1: Verify tests green

```bash
pnpm test -- --run
```

Do not proceed if any test fails.

### Step 2: Check what's uncommitted

```bash
git status --short
git diff --stat HEAD
```

### Step 3: Commit in logical chunks

Group related changes into separate commits. Never one giant commit.

```bash
git add <specific files>
git commit -m "feat/fix/refactor: short description

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>"
```

Repeat for each logical group.

### Step 4: Push

```bash
git push origin main
```

### Step 5: Deploy to Vercel production

```bash
vercel --prod
```

Report the production URL when done.

## If Vercel is not set up

```bash
vercel link   # connect to existing project
# or
vercel        # first deploy, follow prompts
```

## Verify deployment

After deploy completes, confirm:
- Production URL loads
- Key feature works on prod (not just local)
