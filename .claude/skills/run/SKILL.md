---
name: run
description: Use when the user asks to run, start, or preview the app. Triggers: "run the app", "start dev server", "show me the app", "open in browser", "verify it works visually".
---

# Run This App

## Start dev server

```bash
pnpm run dev
```

Opens at http://localhost:5173 (auto-opens browser per vite config).

## Preview production build

```bash
pnpm run build && pnpm run preview
```

## Verify tests pass before running

```bash
pnpm test -- --run
```

All tests must be green before declaring the feature works.

## What to check after starting

1. App loads without console errors
2. The feature you just built renders correctly
3. Clicking/interacting works as expected
4. No layout breakage at mobile width (resize to 375px)

## If port 5173 is in use

```bash
lsof -ti:5173 | xargs kill -9
pnpm run dev
```
