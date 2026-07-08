# UI Coding Standards

## Rule: shadcn/ui only

All UI in this project must be built from [shadcn/ui](https://ui.shadcn.com) components. **No custom UI components.**

- Do not hand-write buttons, inputs, dialogs, cards, dropdowns, etc. Install the shadcn equivalent instead.
- If a needed component doesn't exist yet in `src/components/ui`, add it via the shadcn CLI (`npx shadcn@latest add <component>`) — don't write it from scratch.
- If shadcn has no matching component, compose the UI from existing shadcn primitives rather than creating a new custom one. Only as a last resort, and after confirming with the user, add a new primitive — and add it under `src/components/ui` following shadcn's own conventions (Radix primitive + `cva` variants + `cn()`), not as a one-off styled `div`.
- Non-`ui` components (`src/components/*`) may compose shadcn primitives into feature-specific layouts, but must not introduce new styled elements that duplicate what shadcn already provides (e.g. no custom button-like `<div onClick>`).

## Config

- shadcn config lives in `components.json`: style `base-nova`, base color `neutral`, icons via `lucide-react`, path alias `@/components/ui`.
- Tailwind v4 CSS-first config — theme lives in `src/app/globals.css`, no `tailwind.config.*` file.

## Styling

- Use Tailwind utility classes for layout/spacing only; rely on shadcn component variants (`variant`, `size` props) for visual style instead of overriding with ad-hoc classes.
- Use `cn()` from `@/lib/utils` when conditionally merging classes.
- Don't introduce a second styling system (CSS modules, styled-components, inline `style` objects) — Tailwind + shadcn only.

## Icons

- Use `lucide-react` icons only, matching the configured `iconLibrary`.
