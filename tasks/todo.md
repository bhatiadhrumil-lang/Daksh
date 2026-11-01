# Milestone 2 — Execution Todo

## Foundation

- [ ] Add isolated `docker-compose.yml` for `oasis-postgres` on port 5433.
- [ ] Install Drizzle, Postgres driver, Better Auth, Drizzle adapter, Zod, and tooling.
- [ ] Add `.env.example`; keep real values in ignored `.env.local`.
- [ ] Create `src/db/schema.ts` and `src/db/index.ts`.
- [ ] Create `drizzle.config.ts` and generate the initial migration.
- [ ] Create and run the idempotent catalog seed.

## Catalog and currency

- [ ] Add `src/lib/catalog.ts` with cached Postgres reads and search/filter helpers.
- [ ] Convert seed and display prices to INR paise.
- [ ] Update shipping thresholds and free-delivery copy.
- [ ] Update home, shop, product metadata/JSON-LD, and search to use the repository.
- [ ] Move the client cart to minimal product snapshots and `oasis-cart-v2`.
- [ ] Verify cart add/update/remove/checkout totals after the snapshot change.

## Accounts

- [ ] Create `src/lib/auth.ts` with Better Auth and Drizzle.
- [ ] Add `/api/auth/[...all]` route handler.
- [ ] Add auth client and login/register pages.
- [ ] Add account page, order history, and sign-out action.
- [ ] Add account link to the header and mobile menu.
- [ ] Gate checkout and account reads on a validated server session.

## Checkout and payments

- [ ] Create server validation schemas for address, cart, and payment verification.
- [ ] Implement order creation with server-recomputed prices, stock checks, and order number.
- [ ] Create Razorpay orders per payment attempt.
- [ ] Implement Razorpay script loader and client checkout flow.
- [ ] Implement payment verification with HMAC and Razorpay payment lookup.
- [ ] Implement idempotent paid transition and one-time stock decrement.
- [ ] Implement signed Razorpay webhook with event deduplication.
- [ ] Replace all demo-checkout copy and states with the real flow.
- [ ] Add order confirmation and order detail views.

## Verification and docs

- [ ] `npm run lint`
- [ ] `npm run build`
- [ ] Run browser smoke tests on desktop and 390 px.
- [ ] Test invalid webhook signature and duplicate event handling.
- [ ] Update `README.md`, `REQUIREMENTS.md`, and `DECISIONS.md`.
