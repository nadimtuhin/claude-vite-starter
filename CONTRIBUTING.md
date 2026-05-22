# Contributing

## Setup

```bash
git clone https://github.com/nadimtuhin/claude-vite-starter
cd claude-vite-starter
pnpm install
pnpm run dev
```

## Development workflow

```bash
pnpm test           # watch mode
pnpm test -- --run  # single run
pnpm run lint       # lint check
pnpm run build      # production build
```

## Submitting changes

1. Fork the repo
2. Create a branch: `git checkout -b feat/your-feature`
3. Make changes — follow conventions in `CLAUDE.md`
4. Ensure tests pass: `pnpm test -- --run`
5. Ensure lint passes: `pnpm run lint`
6. Open a pull request against `main`

## Pull request guidelines

- Keep PRs focused — one concern per PR
- Include tests for new behaviour
- Update `CLAUDE.md` or `AI_WORKFLOW.md` if adding a new convention
- Reference any related issues in the PR description

## Adding a project-local skill

Skills live in `.claude/skills/{name}/SKILL.md`. See the **Writing Project-Local Skills** section in `AI_WORKFLOW.md` for the format and guidelines.
