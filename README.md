# Tailor Taste Website Scaffold

This is the first implementation scaffold for the Tailor Taste website: a premium, static-first, multi-page marketing site built with Next.js, TypeScript, and Tailwind CSS.

The scaffold is intentionally modular. It is not the final design pass. Its job is to make the website easy to evolve through focused future prompts and parallel agent workstreams.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Static-first content files
- Server-backed contact delivery route
- Vitest + Testing Library + Playwright test stack
- GitHub Actions CI quality gates

## Routes

- `/` - Home narrative and primary conversion path
- `/product` - Product explanation, MVP scope, service logic, and boundaries
- `/vision` - Category argument and long-term platform direction
- `/about` - Founder conviction, stage, and mission with founder profile links
- `/contact` - Inquiry capture flow backed by `POST /api/contact`
- `/faq` - Stage-honest objection handling and scope boundaries
- `/future` - Directional roadmap separated by current, near-term, and long-term layers

Deferred routes:

- investor-specific landing pages
- venue-specific landing pages

## Structure

```text
src/
  app/            Route files and global layout
  components/     Global, primitive, section, and form components
  content/        Structured copy and data objects
  lib/            Shared types, metadata helpers, analytics contracts, and validation helpers
  assets/         Placeholder folders for images, icons, and renders
```

Page files should stay thin. Put reusable UI in `src/components/*` and editable copy/data in `src/content/*`.

## Homepage Section Ownership

The homepage is assembled in this order:

1. `HeroManifesto`
2. `CategoryGap`
3. `WhyNow`
4. `ObjectReveal`
5. `PossibilityGrid`
6. `DreamOutcomes`
7. `ServiceFit`
8. `FutureLayer`
9. `FounderNote`
10. `FinalCTA`

Each section should remain independently buildable and replaceable.

## Future Prompt Packets

- **P1: Route Shell + Global Layout** - routes, layout, nav, footer, metadata, base content structure
- **P2: Homepage Narrative Skeleton** - homepage section composition and initial copy placement
- **P3: Premium Styling + Responsive Design** - Tailwind theme, typography, spacing, mobile behavior, visual polish
- **P4: Product / Vision / About Pages** - secondary page depth and content structure
- **P5: Contact Flow** - form UX, validation, success state, and future email/CRM integration
- **P6: Assets + Visual System** - renders, diagrams, icons, founder image/signature block, image optimization
- **P7: QA + Performance** - accessibility, responsive checks, Lighthouse/performance, metadata, final polish

For the full step-by-step future implementation checklist, use [`WEBSITE_WORKFLOW_BLUEPRINT.md`](./WEBSITE_WORKFLOW_BLUEPRINT.md).

## Contact Form

The contact form validates required fields and email format in both client and server layers, then submits to `POST /api/contact`.

Current provider path: Resend API (via server-side adapter in `src/lib/contact-delivery.ts`).

Set these environment variables before expecting live delivery:

- `RESEND_API_KEY`
- `CONTACT_TO_EMAILS` (optional comma-separated override; defaults to `ty@tailortaste.ch`)
- `CONTACT_FROM_EMAIL` (optional; defaults to `Tailor Taste <onboarding@resend.dev>`)
- `CONTACT_SUBJECT_PREFIX` (optional)
- `ALLOW_INDEXING` (optional; defaults to `false` outside production, `true` in production)

For durable contact-form rate limiting in production, set either Upstash Redis REST variables or Vercel KV REST aliases:

- `UPSTASH_REDIS_REST_URL`
- `UPSTASH_REDIS_REST_TOKEN`
- `KV_REST_API_URL` (fallback alias)
- `KV_REST_API_TOKEN` (fallback alias)

## Analytics Contract

Event names and payload contracts are defined in `src/lib/analytics.ts` without a provider dependency.

No analytics provider is installed yet.

## Commands

```bash
npm run dev
npm run lint
npm run build
npm run test:unit
npm run test:e2e
npm run check
```

## Quick Start (Copy/Paste)

Install dependencies:

```bash
npm install
```

Start localhost dev server:

```bash
npm run dev
```

Then open:

```text
http://localhost:3000
```

Run full verification (lint + build + unit + e2e):

```bash
npm run check
```
