# Journey

Public-facing photography portfolio built with Next.js 15, Panda CSS, and Notion as a CMS.

See the [monorepo README](../../README.md) for full setup and development instructions.

## App Notes

- **Port:** 3000
- **Styling:** Panda CSS — run `bun run prepare` to regenerate the CSS after changing `panda.config.ts`
- **CMS:** Notion (blog posts and prints fetched via `src/services/notion.ts`)
- **Component structure:** Atomic design — `atoms/` → `molecules/` → `organisms/` → `templates/`

## Dev

```bash
# From the repo root
bun dev:journey

# Or from this directory
bun run dev
```
