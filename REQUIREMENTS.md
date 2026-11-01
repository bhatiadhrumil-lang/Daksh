# Oasis Storefront — Requirements

Living document. Update it as decisions are made and milestones land.

## Product goal

A production-ready e-commerce storefront for Oasis, a modern and contemporary furniture brand, based on the public Figma cover for the Oasis UI kit. The finished product should support browsing, cart, checkout, payments, order confirmation, and content marketing.

## Source and scope

- Figma: https://www.figma.com/design/FfU1enbZatURChH96rxZWv/Oasis---Modern-%26-Contemporary-eCommerce-UI-KIt-(Community)?node-id=3-3
- The Figma file is view-only and only the public cover is accessible. Screens beyond the cover are being designed as faithful, consistent extensions of the cover.
- Brand direction: warm off-white canvas, ink typography, lavender accent, serif italic display type, editorial layouts, generous imagery.

## Milestone 1 — Storefront (complete)

### Pages

- [x] Home with hero, value props, room categories, featured products, brand editorial, bestsellers, testimonial, journal preview, newsletter.
- [x] Shop with category filters, text search, sorting, result counts, empty state.
- [x] Product detail with gallery image, finishes, quantity, add to bag, materials, dimensions, delivery, related products, JSON-LD.
- [x] Cart page and global cart drawer.
- [x] Checkout form, delivery method selection, order summary, confirmation state.
- [x] Journal index and three article pages.
- [x] About and contact pages.
- [x] Custom 404.
- [x] Responsive desktop, tablet, and mobile layouts.

### Commerce behaviour

- [x] 16 products across six categories: sofas, chairs, tables, storage, lighting, bedroom.
- [x] Product data includes price, compare-at price, badges, stock, colors, materials, specs, story, SKU, rating.
- [x] Search across product names, categories, materials, and descriptions.
- [x] Filters combine with search and sorting.
- [x] Cart supports add, quantity update, remove, variant capture, subtotal, and free-delivery progress.
- [x] Cart persists to localStorage and syncs across tabs.
- [x] Quick-add from product cards, including touch devices.
- [x] Checkout calculates standard and express shipping and clears the bag after a demo order.

### Quality

- [x] `npm run lint` passes.
- [x] `npm run build` passes.
- [x] No browser console errors or warnings in smoke tests.
- [x] No failed visible images.
- [x] Native dialogs handle focus and Escape.
- [x] Checkout confirmation resets scroll and moves focus to the heading.
- [x] Metadata, Open Graph-ready structure, and product JSON-LD.

## Milestone 2 — Real commerce (next)

- [x] Choose payment provider, launch country/currency, and tax strategy: Razorpay, India, INR, GST-inclusive display prices.
- [x] Database for products, customers, orders, addresses, and payment attempts.
- [ ] Variants, discounts, and inventory purchasing tools.
- [x] Postgres-backed catalog with an idempotent seed script as the temporary admin source of truth.
- [x] Real checkout with Razorpay, server-side signature verification, webhook handling, and idempotent order/payment transitions.
- [ ] Order confirmation emails and transactional templates.
- [ ] Shipping rates and delivery estimates from a real provider.
- [x] Authentication and customer order history (accounts required for launch).
- [ ] Discount codes, gift cards, and returns workflow (scope to be confirmed).
- [ ] Analytics, consent, privacy policy, terms, and cookie policy.
- [ ] Production deployment, monitoring, and error reporting.

## Non-functional requirements

- Responsive from 320 px upward.
- Keyboard-operable navigation, cart, filters, and checkout.
- WCAG AA target: contrast, focus visibility, labels, landmarks, status messages.
- Reduced-motion support.
- Fast LCP on shop and product routes; preload above-the-fold imagery.
- SEO metadata per page and structured product data.
- Prices stored and calculated in integer cents.
- No secret keys in client code.

## Assumptions

- English-language, INR-priced catalog for Milestone 2.
- Product and journal content are seed data until a commerce admin exists.
- Images are Unsplash placeholders, not final brand photography.
- Checkout uses Razorpay when configured; missing provider credentials disable payment rather than simulate success.
- Newsletter and contact forms are presentational until a backend is connected.
- Accounts are required for checkout. Admin, live shipping rates, and transactional email remain deferred.

## Open questions

1. ~~Which payment provider and launch region?~~ Answered: Razorpay, India, INR.
2. ~~Which database and hosting platform?~~ Answered: Postgres + Vercel.
3. ~~Does launch require customer accounts?~~ Answered: yes, accounts required.
4. What GST treatment and shipping rules apply? Current assumption: displayed prices include GST; standard delivery is complimentary over the threshold, express is a flat fee.
5. Which product photography and brand assets will replace the Unsplash placeholders?
6. Should returns, discounts, and gift cards ship in the first commerce release?
7. Which transactional email provider should handle verification, password reset, and receipts?

## Verification

```bash
npm run lint
npm run build
```

Visual smoke testing is done with Playwright Chromium against `next dev` on port 3000, including desktop and 390 px mobile contexts, full-page screenshots, console capture, image checks, cart drawer, checkout, and confirmation focus/scroll checks.
