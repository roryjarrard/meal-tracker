# CLAUDE.md

Keep your replies extremely concise and focus on conveying the key information. No unnecessary fluff, no long code snippets.

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — start the dev server (Turbopack, if configured) at http://localhost:3000
- `npm run build` — production build
- `npm run start` — run the production build
- `npm run lint` — run ESLint (flat config in `eslint.config.mjs`)

There is no test runner configured yet.

## Architecture

This is a Next.js 16 App Router project (TypeScript, Tailwind CSS v4, ESLint 9), currently at the initial `create-next-app` scaffold stage — no meal-tracker domain code has been added yet.

- `src/app/` — App Router root; `layout.tsx` is the root layout, `page.tsx` is the home page, `globals.css` holds Tailwind entrypoint/theme.
- Path alias `@/*` maps to `src/*` (see `tsconfig.json`).
- Styling uses Tailwind v4 via `@tailwindcss/postcss` (see `postcss.config.mjs`) — no `tailwind.config` file is needed for v4's CSS-first config.

As features are built out, prefer extending this structure (e.g. `src/app/api/*` for route handlers, `src/components/`, `src/lib/`) rather than introducing a separate `pages/` directory or a different framework convention.
