# Claude Vite Starter

A forkable template for building React apps with Claude Code. Ships with the exact project structure, testing setup, and AI workflow conventions that made [PlayIMDB](https://github.com/nadimtuhin/playimdb) fast to build and easy to maintain.

## What's included

- **React 19 + Vite 8 + Tailwind CSS 4**
- **Vitest + Testing Library** — 4-layer test setup ready to go
- **GitHub Actions CI** — build + test on every push (integration tests excluded)
- **`CLAUDE.md`** — project rules that Claude Code picks up automatically
- **`AI_WORKFLOW.md`** — prompting playbook based on real usage

## Quick start

```bash
git clone https://github.com/nadimtuhin/claude-vite-starter my-project
cd my-project
pnpm install
pnpm run dev
```

## Running tests

```bash
pnpm test              # watch mode
pnpm test -- --run     # single run (what CI uses)
pnpm test:coverage     # coverage report
pnpm test src/integration  # real network tests (run manually)
```

## Using with Claude Code

Open the project in Claude Code — CLAUDE.md is picked up automatically.

Recommended workflow:

```
# Plan a feature before coding
plan add a search bar with debounced API calls

# Execute fast with parallel agents
ultrawork

# Verify TDD coverage
red green tdd e2e done?

# Ship
commit push deploy prod
```

See AI_WORKFLOW.md for the full prompting playbook.

## Project structure

```
src/
├── components/     # React components + colocated .test.jsx
├── services/       # API fetch layer (AbortSignal, normalizers)
├── utils/          # Pure functions
├── integration/    # Real network tests (not run in CI)
├── e2e/            # Multi-step user journey tests
└── test/setup.js   # @testing-library/jest-dom
```

## Adapting to your project

1. Replace src/services/api.js BASE_URL with your API
2. Delete src/components/ExampleCard.* and build your first component
3. Update CLAUDE.md with your project-specific conventions
4. Update BACKLOG.md with your actual tasks

## License

MIT
