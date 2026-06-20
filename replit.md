# Dr. Mario Sanchez Portfolio

A professional portfolio website for Dr. Mario Sanchez, a respiratory therapist and public health specialist based in Bogotá. The site showcases his expertise, blog content, and provides a contact form that connects to WhatsApp.

## Run & Operate

- `pnpm --filter @workspace/portfolio run dev` — run the portfolio frontend (port 5000)
- `pnpm --filter @workspace/api-server run dev` — run the API server (port 8080)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string (auto-provisioned by Replit)

## Stack

- pnpm workspaces, Node.js 20, TypeScript 5.9
- Frontend: React 19, Vite 7, Tailwind CSS 4, Framer Motion, Radix UI
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod, drizzle-zod
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild

## Where things live

- `artifacts/portfolio/` — React SPA (main user-facing portfolio)
- `artifacts/api-server/` — Express backend (port 8080)
- `artifacts/mockup-sandbox/` — UI component dev sandbox
- `lib/db/` — Drizzle ORM schema and database connection
- `lib/api-spec/` — OpenAPI YAML definition
- `lib/api-zod/` — Auto-generated Zod schemas
- `lib/api-client-react/` — Auto-generated React Query hooks

## Architecture decisions

- Monorepo with pnpm workspaces; frontend and API are separate artifacts
- Portfolio frontend (port 5000) proxies API calls to the API server (port 8080)
- WhatsApp integration is client-side only via `wa.me` deep links — no external API keys needed
- Drizzle ORM with PostgreSQL; schema lives in `lib/db/src/schema/`

## Product

A professional portfolio for Dr. Mario Sanchez featuring: hero section with credentials, about/services section, blog, and a consultation booking flow that routes to WhatsApp.

## User preferences

_Populate as you build — explicit user instructions worth remembering across sessions._

## Gotchas

- After any schema change in `lib/db/src/schema/`, run `pnpm --filter @workspace/db run push` to apply to dev DB
- After any OpenAPI spec change in `lib/api-spec/`, run `pnpm --filter @workspace/api-spec run codegen` to regenerate client code

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
