# Auth Coding Standards

## Rule: Clerk only

All authentication in this app is handled by [Clerk](https://clerk.com) (`@clerk/nextjs`). No custom auth (no hand-rolled sessions, JWTs, password hashing, or third-party auth libraries).

## Setup

- Wrap the root layout (`src/app/layout.tsx`) in `<ClerkProvider>`.
- Protect routes via `clerkMiddleware()` in `src/middleware.ts` — use `createRouteMatcher` to define protected routes and call `auth.protect()` for matches, rather than checking auth ad hoc in individual pages.
- Required env vars: `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`, `CLERK_SECRET_KEY` (in `.env.local`, never committed).

## Server-side

- In Server Components, Route Handlers, and Server Actions, get the current user with `auth()` (from `@clerk/nextjs/server`), not by parsing cookies/headers manually.
- Use `currentUser()` only when full user profile data is needed — `auth()` is cheaper for just the `userId`.
- Gate API routes/Server Actions by checking `userId` from `auth()` and returning/throwing on `null` — don't rely on middleware alone for data-mutating logic.

## Client-side

- Use Clerk's prebuilt components (`<SignInButton>`, `<SignUpButton>`, `<UserButton>`, `<SignedIn>`, `<SignedOut>`) for auth UI — don't build custom sign-in/sign-up forms unless a custom flow is explicitly required.
- Use `useUser()` / `useAuth()` hooks for client-side auth state, not manual context/state management.
- If a custom UI is required, style Clerk components via the `appearance` prop rather than replacing them outright, and follow [docs/ui.md](./ui.md) for any surrounding custom elements.

## Authorization

- Use Clerk Organizations (`useOrganization`, `auth().orgId`/`orgRole`) if/when multi-tenant or role-based access is needed — don't build a separate roles/permissions table unless Clerk's org roles can't express the requirement.

## Data access

- Always scope database queries by the authenticated `userId` from Clerk — never trust a user ID passed from the client.
