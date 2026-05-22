# The Photography Journey

A monorepo for a photography portfolio and back-office management platform, built with TypeScript, Next.js, Hono, jstack, and Turborepo.

## Monorepo Structure

```
/
├── apps/
│   ├── back-office/          # Admin app for managing photos, prints, and content
│   │   ├── server/           # jstack + Hono API routers and database layer
│   │   └── src/
│   │       ├── app/          # Next.js App Router pages and layouts
│   │       │   └── api/      # Catch-all route that delegates to the jstack handler
│   │       ├── components/   # React UI components
│   │       └── lib/          # Utilities and the jstack client
│   └── journey/              # Public-facing photography portfolio (Next.js)
│       └── src/
│           ├── app/          # Next.js App Router pages (blog, prints)
│           ├── components/   # React UI components
│           ├── context/      # React context providers
│           └── services/     # External service integrations (Notion, Mixpanel, etc.)
└── packages/
    └── hooks/                # Shared React hooks consumed by both apps
```

## Tech Stack

| Technology | Role |
|---|---|
| **TypeScript** | Primary language across all apps and packages |
| **Next.js 15** | Frontend framework using the App Router pattern |
| **Hono** | Lightweight HTTP framework powering the API layer |
| **jstack** | Type-safe RPC layer built on top of Hono |
| **Drizzle ORM** | Database access layer in `back-office` (Neon Postgres) |
| **Turborepo** | Monorepo build orchestration with caching |
| **Bun** | Package manager and runtime |
| **Panda CSS** | CSS-in-JS styling in `journey` |
| **Tailwind CSS v4** | Utility-first styling in `back-office` |

## Getting Started

**Prerequisites:** [Bun](https://bun.sh) 1.2+

```bash
# Install all workspace dependencies
bun install

# Start all apps in development mode
bun dev

# Start only the journey app (port 3000)
bun dev:journey

# Build all apps and packages
bun build

# Lint all packages
bun lint
```

### Running a single app

```bash
# back-office runs on port 3001
bun run dev --filter=back-office

# journey runs on port 3000 with Turbo mode
bun run dev --filter=journey
```

### Database (back-office only)

```bash
cd apps/back-office
bun run db:generate   # Generate Drizzle migrations
bun run db:migrate    # Apply migrations
bun run db:push       # Push schema changes directly (dev only)
bun run db:studio     # Open Drizzle Studio
```

> Environment variables are required to connect to the database and external services. See `.env.example` in each app — full env setup is documented separately.

## API Layer (jstack + Hono)

The `back-office` app exposes a type-safe API using **jstack** on top of **Hono**. All API traffic is handled by a single Next.js catch-all route at `apps/back-office/src/app/api/[[...route]]/route.ts`, which delegates to the jstack handler.

**Defining an endpoint:**

Routers live in `apps/back-office/server/`. Each router uses `j.router()` and exports a typed router. Add new routers to `server/router.ts` via `j.mergeRouters`.

```
server/
├── jstack.ts          # jstack instance (j) — import j from here
├── router.ts          # Root router — merge all sub-routers here
├── images/router.ts   # Example feature router
├── uploadthing/       # File upload integration
└── database/          # Drizzle database client and schema
```

**Calling an endpoint from the frontend:**

The client is created in `apps/back-office/src/lib/client.ts` and infers all types from `AppRouter`. No manual type duplication needed.

## For AI Coding Agents

### Key Entry Points

| What | Where |
|---|---|
| Public portfolio pages | `apps/journey/src/app/` |
| Back-office pages | `apps/back-office/src/app/` |
| API routers | `apps/back-office/server/` |
| Type-safe API client | `apps/back-office/src/lib/client.ts` |
| Database schema + client | `apps/back-office/server/database/` |
| Shared React hooks | `packages/hooks/` |

### Workspace Commands

Always use `bun` — never `npm` or `yarn`.

```bash
# Add a dependency to a specific app
bun add <package> --cwd apps/back-office

# Run a script in a specific workspace
bun run <script> --filter=back-office
```

### Adding a New API Endpoint

1. Create a router file in `apps/back-office/server/<feature>/router.ts`
2. Define procedures using `j.router()` and `j.procedure()`
3. Register it in `apps/back-office/server/router.ts` via `j.mergeRouters`
4. The frontend client picks up the new types automatically

### Shared Package Awareness

Changes to `packages/hooks` affect both `back-office` and `journey`. Test both apps when modifying shared packages.

### Turborepo Notes

- `bun run build` uses Turbo's cache. Force a clean build with `bun run build -- --force`
- Task dependencies are defined in `turbo.json` — packages build before apps
- `dev` tasks run concurrently with no caching
