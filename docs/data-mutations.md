# Data Mutations

- All data mutations must be performed via Server Actions. Never mutate the database from a Client Component or a route handler (`src/app/api/*`).
- Server Actions live in co-located files named `actions.ts` (e.g. `src/app/dashboard/actions.ts`), marked with `"use server"`. Don't scatter `"use server"` functions inline inside component files.
- Server Actions must not call the database directly. They call helper functions in `/data` — same helpers used for data fetching — never raw Drizzle calls.
- Mutation helper functions in `/data` must use Drizzle ORM query/mutation methods only (`insert`, `update`, `delete`). Raw SQL is not allowed.
- A logged-in user must only be able to mutate their own data. Every mutation helper must scope the operation to the authenticated user's ID (e.g. a `where` clause matching `userId`), verified via `auth()` from `@clerk/nextjs/server` — never trust a user ID passed from the client.
- After a mutation, revalidate affected data (`revalidatePath`/`revalidateTag`) from within the Server Action rather than relying on client-side refetching.
- Server Action parameters must have explicit TypeScript types. Do not type parameters as `FormData` — pass plain typed arguments instead.
- Every Server Action must validate its arguments with Zod before use (e.g. `schema.parse(args)`), even though parameters are already typed.

