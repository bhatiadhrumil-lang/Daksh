# Oasis Storefront — Decisions

Architecture and product decisions with rationale. Append new decisions; do not rewrite history silently.

## ADR-001 — Next.js 16 App Router with Cache Components

**Status:** accepted

Use Next.js 16.4.3 App Router, React 19, TypeScript, and Cache Components with Partial Prefetching. Server Components render catalog and content pages; client components handle cart, dialogs, filters, and checkout.

**Why:** Server rendering gives fast first loads and SEO. Cache Components and static params keep the catalog largely prerendered while allowing dynamic URL state. The project follows the bundled Next.js 16 docs rather than older App Router conventions.

## ADR-002 — Tailwind CSS v4 with CSS-first tokens

**Status:** accepted

Use Tailwind v4 through `@tailwindcss/turbopack`, with design tokens declared in `src/app/globals.css` and exposed with `@theme inline`. No `tailwind.config` file.

**Why:** Fewer config files, tokens shared by CSS and utilities, and first-class Turbopack support. The palette and typography live in one place.

## ADR-003 — Extend the cover-only Figma file

**Status:** accepted

Treat the public cover as the visual source of truth and design the remaining screens as consistent extensions. Do not block implementation on inaccessible Figma nodes.

**Why:** The shared file is view-only and only the cover is exposed. The user approved iterative requirements and design extension.

## ADR-004 — Seed catalog in `src/lib/data.ts` for Milestone 1

**Status:** accepted (temporary)

Keep 16 products, six categories, and three journal posts in typed local data. Expose helpers for lookup, search, filtering, sorting, and related products.

**Why:** Allows the storefront, cart, and checkout UX to be completed and tested before choosing a database and commerce admin. The helper boundary keeps a future repository/API swap local.

## ADR-005 — Client-side cart with an external store

**Status:** accepted (temporary)

Store cart lines in a small external store backed by `localStorage` under `oasis-cart-v1`. Consume it with `useSyncExternalStore`; subscribe to `storage` events for cross-tab sync. Expose a hydration flag and avoid cart writes until ready.

**Why:** Milestone 1 has no server cart or customer identity. The external store avoids React 19 `set-state-in-effect` problems and gives consistent server/client snapshots. Milestone 2 should replace it with server-authoritative carts and payment line items.

## ADR-006 — Native `<dialog>` for overlays

**Status:** accepted

Use native modal dialogs for the cart, search, and mobile navigation, with controlled open state and body scroll locking. The cart provides its own clickable overlay; a `cart-dialog` class removes the global native backdrop so it does not double up with the custom overlay.

**Why:** Native dialogs provide focus trapping, Escape handling, and top-layer rendering with little code. The cart keeps a custom overlay so the drawer can be dismissed by clicking outside while preserving the slide-over layout.

## ADR-007 — Demo checkout without payment collection

**Status:** superseded by ADR-015

The checkout validates contact and address fields, calculates shipping, shows a summary, then creates a local demo order and clears the cart. It is visibly labelled “Demo checkout · no payment collected.”

**Why:** Payment requires provider, region, tax, and fulfillment decisions that were not yet made. The UI and confirmation flow can be completed and reviewed now, then replaced by a hosted payment flow.

## ADR-008 — Wrap dynamic URL data in Suspense

**Status:** accepted

Product and journal detail routes wrap the async component that awaits `params` in `<Suspense>`, with page-shaped skeletons. Metadata generation still resolves `params` separately.

**Why:** Next.js 16 with Cache Components reports URL data accessed outside Suspense during prerender/navigation. Suspense keeps the route shell streamable and clears the console error. `dynamicParams = false` is incompatible with Cache Components, so it is not used.

## ADR-009 — Preload above-the-fold product images

**Status:** accepted

`ProductGrid` accepts `eagerCount`; the shop passes `3` so the first row uses Next Image `preload` (the Next 16 replacement for `priority`). Hero and product-detail images are preloaded directly.

**Why:** Clears the LCP warning and improves shop load. Lower grids remain lazy to avoid unnecessary transfer.

## ADR-010 — Unsplash placeholders

**Status:** accepted (temporary)

Use 29 downloaded Unsplash images in `public/images` for products, categories, editorial, and journal content.

**Why:** The project needs realistic photography before brand assets exist. Replace with licensed brand photography before launch. Note: `halden-sofa.jpg` includes a cat.

## ADR-011 — Integer-cent USD pricing

**Status:** superseded by ADR-014

Store prices in integer cents and format with `Intl.NumberFormat`. Use USD and a $750 free-shipping threshold for the current demo.

**Why:** Avoids floating-point money bugs. Currency and tax rules will be confirmed with the launch region in Milestone 2.

## ADR-012 — Payment, database, and auth remain open

**Status:** superseded by ADR-013, ADR-015, and ADR-016

Stripe is the default payment candidate, with Razorpay as fallback if Stripe is unavailable in the launch region. Database, hosting, account model, tax, and fulfillment providers are undecided.

**Why:** These choices depend on the user’s business region, pricing, and operational requirements. They must be resolved before implementing Milestone 2.

## ADR-013 — Razorpay for India in INR

**Status:** accepted

Use Razorpay for the launch payment provider, with India as the selling region and INR as the only currency. Create one Razorpay order per payment attempt and verify payment signatures server-side before fulfilling.

**Why:** Confirmed by the user. Razorpay’s Standard Checkout supports UPI, cards, netbanking, and wallets in India. Razorpay order ids map one-to-one to payment attempts, so retries must create a new provider order.

## ADR-014 — Postgres with Drizzle, deployed on Vercel

**Status:** accepted

Use Postgres as the commerce database with Drizzle ORM and `pg`. Develop against an isolated local Postgres 16 container on port 5433; deploy the app and a managed Postgres instance on Vercel.

**Why:** Confirmed by the user. Postgres provides transactional order and inventory updates. Drizzle keeps the schema and queries typed and lets the seed script and migrations live in the repository. The separate local port avoids touching the unrelated `ecom-postgres` container on 5432.

## ADR-015 — Accounts required for checkout

**Status:** accepted

Require a customer account for checkout and order history. Use Better Auth with email/password and the Drizzle adapter. Store orders against the authenticated user and validate the session again on every protected server action, route handler, and page.

**Why:** Confirmed by the user. Accounts make order history and support possible. Better Auth provides maintained password hashing, session management, and Next.js integration rather than a custom auth implementation.

## ADR-016 — INR paise and GST-inclusive display prices

**Status:** accepted (temporary tax assumption)

Store and calculate all money as integer paise. Convert the Milestone 1 USD catalog to INR once at seed time, then treat the stored paise values as the source of truth. Display prices as GST-inclusive; do not add a separate tax line until tax rules are confirmed.

**Why:** Razorpay requires integer amounts in the smallest currency unit. Indian retail prices are commonly displayed as GST-inclusive. This avoids floating-point money errors and keeps checkout totals deterministic. The tax treatment remains an explicit assumption to confirm before launch.

## ADR-017 — Database-backed catalog with seed script as temporary admin

**Status:** accepted

Serve catalog pages from Postgres through a server-only repository. Keep the Milestone 1 product array as seed input and seed the database idempotently. Until an admin UI exists, treating the seed script as the catalog source of truth is the temporary operational path.

**Why:** Milestone 2 requires real product and inventory storage. A server repository lets orders validate live prices and stock without exposing database access to client components. The cart stores only a display snapshot; checkout always re-reads authoritative product rows.

## ADR-018 — Razorpay Checkout plus signed webhooks

**Status:** accepted

Open Razorpay Standard Checkout from the browser using a server-created order. Verify the payment signature and fetch the payment before marking an order paid. Process Razorpay webhooks with raw-body HMAC verification and event-id deduplication. Missing provider credentials disable checkout rather than simulating payment.

**Why:** Signatures alone prove the payment response originated with Razorpay, but the payment lookup verifies amount, order, and captured status. Webhooks recover from browser interruptions. Event deduplication and a conditional pending-to-paid transition make fulfilment idempotent. A fake success path would be unsafe and misleading.
