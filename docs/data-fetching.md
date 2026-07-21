# Data Fetching

- All data fetching must be done via Server Components. Never create route handlers (`src/app/api/*`) to fetch data.
- Database queries must always go through helper functions in `/data`. Never query the database directly from components.
- Helper functions in `/data` must use Drizzle ORM query methods only. Raw SQL is not allowed.
- A logged-in user must only be able to access their own data. Every helper function that reads or writes user-owned data must scope the query to the authenticated user's ID (e.g. via a `where` clause matching `userId`). Never return or mutate rows belonging to another user.
