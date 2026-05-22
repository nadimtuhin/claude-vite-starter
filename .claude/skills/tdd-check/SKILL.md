---
name: tdd-check
description: Use after implementing a feature to verify TDD discipline was followed. Triggers: "red green tdd", "tdd check", "are tests done", "e2e done", "red green tdd e2e done?", "did we write tests".
---

# TDD Verification Checklist

Run this after implementing any feature. Do not declare done until all boxes are checked.

## Step 1: Run full test suite

```bash
pnpm test -- --run
```

All tests must pass. If any fail, fix before continuing.

## Step 2: Check test coverage by layer

Verify each layer exists for the feature just built:

### Layer 1 — Unit tests
- [ ] Pure functions in `src/utils/` have tests in `*.test.js`
- [ ] API service functions in `src/services/` have fetch-mocked unit tests

### Layer 2 — Component tests
- [ ] New components have colocated `ComponentName.test.jsx`
- [ ] Tests cover: renders correctly, click/keyboard handlers, all UI states

### Layer 3 — E2E journey tests
- [ ] `src/e2e/` has a test that exercises the full user journey
- [ ] Journey uses `vi.mock('../services/api.js')` — no real network calls
- [ ] Covers: happy path, navigation, state reset on back

## Step 3: Check for missing cases

```bash
pnpm test:coverage
```

Look for uncovered branches in the new files. Coverage < 80% is a signal something is missing.

## Step 4: Report

State clearly:
- How many new tests were added
- Which layers are covered
- Any gaps and why they're acceptable

If E2E tests are missing, write them before declaring done.
