# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Monorepo for a learning project following the book *React Application Architecture for Production* (2nd ed.). The app is the "AI Ideas Community Platform": users share AI app ideas and write 1–5 star reviews. `readme.md` has the full functional/non-functional requirements and data model (User → many Ideas, User → many Reviews, Idea → many Reviews, one review per user per idea).

Two independent npm projects (no root `package.json`, no workspaces) — run commands from inside each directory:

- `react-app/` — frontend (React 19, React Router 7 framework mode with SSR, Vite, Tailwind 4)
- `api/` — backend (Hono + `@hono/zod-openapi`, Drizzle ORM on libSQL/SQLite, Vitest)

The VS Code workspace file is `react-app.code-workspace` (multi-root: repo root, `react-app`, `api`).

## Commands

### api/ (port 9999)

```sh
node setup.js <05-12>      # first-time setup: npm install, writes .env for that book chapter, migrates + seeds DB
npm run dev                # tsx watch; docs at /reference, OpenAPI spec at /doc
npm run test               # vitest, NODE_ENV=test (loads .env.test)
npx cross-env NODE_ENV=test vitest run src/routes/ideas/ideas.test.ts   # single test file
npx cross-env NODE_ENV=test vitest run -t "test name"                   # single test by name
npm run lint | typecheck | build
npm run db:prepare         # migrate + seed (resets sample data); also: generate, migrate, seed, studio
```

Chapters 05/06 use `BYPASS_AUTH=true` in `.env`; later chapters use real auth. Vitest runs with `fileParallelism: false` because tests share one SQLite DB.

### react-app/

```sh
npm run dev                # react-router dev
npm run typecheck          # react-router typegen && tsc (typegen is required before tsc)
npm run lint | lint:fix | format | format:check
npm run build && npm start
```

No test runner is configured in `react-app` yet. `react-app/.env` needs `VITE_API_URL` (default `http://localhost:9999`); env access is wrapped in `src/config/env.ts`.

## Architecture

### api/

- `src/app.ts` composes route modules (`auth`, `ideas`, `profile`, `reviews`, `index`) onto an app from `lib/create-app.ts`; `AppType` is exported for typed clients.
- Each route folder follows the same split: `*.routes.ts` (OpenAPI route + Zod schemas), `*.handlers.ts` (logic), `*.index.ts` (wires routes to handlers), `*.test.ts`.
- DB schema lives in `src/db/schema.ts` / `src/db/models/*`; drizzle-zod derives Zod schemas from tables. Migrations are in `src/db/migrations`.
- Auth: JWT access token (1h) + rotating refresh token (7d), both httpOnly cookies. Refresh tokens are bcrypt-hashed in the DB, one per device. `src/middlewares/auth.ts` protects routes. Env is validated in `src/env.ts`.
- Path alias `@/` → `src/`.

### react-app/

- Route files live in `src/app` (`appDirectory` in `react-router.config.ts`, `ssr: true`); routes are declared explicitly in `src/app/routes.ts`, not file-based.
- Intended feature-based structure (`src/features/{auth,ideas,profile,reviews}`) plus shared `components`, `hooks`, `lib`, `stores`, `types`, `utils`, `config`. Many of these dirs don't exist yet; the book adds them chapter by chapter.
- **Import boundaries are enforced by ESLint** (`infra/eslint-import-rules.js`, `import/no-restricted-paths`):
  - shared dirs must not import from `features/` or `app/`
  - `features/` must not import from `app/`
  - `ideas`, `profile`, `reviews` may import only from `auth`; features may not import from each other otherwise. Update the `features` array in that file when adding a feature.
- Also enforced: kebab-case filenames (including tests), alphabetized `import/order` with blank lines between groups, no import cycles, Prettier as an ESLint error.
- Path alias `@/` → `src/`.

## Git hooks

Husky now lives at the repo root (`.husky/`), but `prepare` and the lint-staged config (`react-app/infra/lint-staged.config.js`) are in `react-app/`. The hook only covers `react-app`; `api` has no hook. Check that `.husky/pre-commit` actually runs `cd react-app && npm run pre-commit` before relying on it.
