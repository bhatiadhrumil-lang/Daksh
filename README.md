# Oasis Storefront

Modern and contemporary furniture storefront built with Next.js 16, React 19, TypeScript, Tailwind CSS v4, Postgres, Drizzle ORM, Better Auth, and Razorpay.

## Local development

```bash
npm install
cp .env.example .env.local
docker compose up -d
npm run db:migrate
npm run db:seed
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

See `.env.example`. Required for local development:

- `DATABASE_URL`
- `BETTER_AUTH_URL`
- `BETTER_AUTH_SECRET`
- `RAZORPAY_KEY_ID`
- `RAZORPAY_KEY_SECRET`
- `RAZORPAY_WEBHOOK_SECRET`

Checkout is disabled until Razorpay credentials are supplied. Auth and catalog work without them.

## Scripts

```bash
npm run dev
npm run build
npm run lint
npm run db:generate
npm run db:migrate
npm run db:seed
```

## Notes

- Prices are stored and calculated in integer paise.
- Product and journal content are seeded from `src/lib/data.ts`.
- The local Postgres container is isolated on port 5433.
