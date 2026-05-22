# Developer Guide

## Commands

| Task | Command |
|---|---|
| Start dev server | `npm run dev` |
| Build production | `npm run build` |
| Preview build | `npm run preview` |
| Run tests (once) | `npm test` or `npm test -- --run` |
| Run tests (watch) | `npm run test:ui` |
| Coverage report | `npm run test:coverage` |

---

## Architecture Principles

- **Pure functions** — isolate side effects. Core logic in `src/utils/`, API calls in `src/services/`.
- **Single responsibility** — each function does one thing, ideally under 20-30 lines.
- **No god components** — split complex components into focused helpers.
- **No premature abstraction** — three similar lines beats a wrong abstraction.
- **No speculative features** — build what's asked, nothing more.

---

## API Service Pattern

All external API calls live in `src/services/`. Rules:

- Accept `signal` (AbortSignal) and pass to `fetch` to prevent race conditions.
- Use `encodeURIComponent` for all URL parameters.
- Check `response.ok` immediately — throw `new Error(\`API error: ${res.status}\`)` if false.
- Normalize responses with mapper functions before returning — never let raw API shape leak into components.

```js
export async function fetchItems(query, signal) {
  const url = `${BASE_URL}/items?q=${encodeURIComponent(query)}`;
  const res = await fetch(url, { signal });
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  const data = await res.json();
  return (data.items ?? []).map(normalizeItem);
}
```

---

## 4-Layer Testing Strategy

### Layer 1 — Unit Tests
- **Target**: Pure utils (`src/utils/`) and API service mappers (`src/services/`)
- **Mock fetch**: `vi.stubGlobal('fetch', vi.fn())` in `beforeEach`, `vi.unstubAllGlobals()` in `afterEach`
- Assert URLs, signal propagation, normalized output shape, error handling

### Layer 2 — Network Integration Tests
- **Location**: `src/integration/` — excluded from CI, run manually against live API
- **Purpose**: Catch schema drift between API contract and mapper assumptions
- Run with: `npm test src/integration`

### Layer 3 — Component Tests
- **Location**: Colocated as `ComponentName.test.jsx` next to the component file
- Test click/keyboard handlers, aria roles, `data-testid` attributes
- Test all UI states: loading, error, empty, populated
- Use `.open` class assertions over brittle text matching

### Layer 4 — E2E Journey Tests
- **Location**: `src/e2e/`
- Mock the entire service layer: `vi.mock('../services/api.js', () => ({ ... }))`
- Render `<App />` and drive multi-step user journeys
- Cover happy path + edge cases (empty results, errors, navigation)

---

## Comments Policy

Default: **no comments**. Only add a comment when the WHY is non-obvious:
- A hidden constraint or invariant
- A workaround for a specific external bug
- Behavior that would surprise a reader

Never explain WHAT the code does — well-named identifiers already do that.

---

## Commits

- Commit in **logical chunks** — one concern per commit
- Never commit unless explicitly asked
- Co-author line: `Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>`
