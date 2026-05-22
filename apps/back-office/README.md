# Back Office

Admin app for managing photos, prints, and content. Built with Next.js 15, Tailwind CSS v4, jstack + Hono, and Drizzle ORM (Neon Postgres).

See the [monorepo README](../../README.md) for full setup and development instructions.

## App Notes

- **Port:** 3001
- **API layer:** jstack + Hono — routers live in `server/`, mounted via `src/app/api/[[...route]]/route.ts`
- **Database:** Neon Postgres accessed via Drizzle ORM (`server/database/`)
- **File uploads:** Uploadthing integration (`server/uploadthing/`)

## Dev

```bash
# From the repo root
bun run dev --filter=back-office

# From this directory
bun run dev
```

## Database

```bash
bun run db:generate   # Generate Drizzle migrations
bun run db:migrate    # Apply migrations
bun run db:push       # Push schema changes directly (dev only)
bun run db:studio     # Open Drizzle Studio
```
