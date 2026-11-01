import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { ArrowRight, PackageOpen } from "lucide-react";
import { buttonClass } from "@/components/ui/button";
import { signOutAction } from "./actions";
import { requireUser } from "@/lib/auth";
import { getUserOrders } from "@/lib/orders";
import { formatOrderDate, orderStatusLabel } from "@/lib/order-format";
import { formatPrice } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Your account",
  description: "Your Oasis orders and account details.",
};

export default function AccountPage() {
  return (
    <Suspense fallback={<AccountSkeleton />}>
      <AccountContent />
    </Suspense>
  );
}

async function AccountContent() {
  const user = await requireUser("/account");
  const orders = await getUserOrders(user.id);

  return (
    <div className="container-page py-10 sm:py-14">
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-line pb-6">
        <div>
          <p className="eyebrow">Your account</p>
          <h1 className="mt-3 text-4xl tracking-[-0.04em] sm:text-5xl">Hello, {user.name}</h1>
          <p className="mt-3 text-sm text-muted">{user.email}</p>
        </div>
        <form action={signOutAction}>
          <button
            type="submit"
            className={buttonClass({ variant: "outline", size: "md" })}
          >
            Sign out
          </button>
        </form>
      </div>

      <section className="mt-10">
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-2xl tracking-[-0.02em]">Order history</h2>
          <p className="text-xs uppercase tracking-[0.16em] text-muted">
            {orders.length} {orders.length === 1 ? "order" : "orders"}
          </p>
        </div>

        {orders.length === 0 ? (
          <div className="mt-8 flex flex-col items-center justify-center rounded-[1.5rem] border border-line bg-white px-6 py-20 text-center">
            <span className="flex size-16 items-center justify-center rounded-full bg-sand">
              <PackageOpen className="size-6 text-ink/70" aria-hidden="true" />
            </span>
            <h3 className="mt-6 font-serif text-3xl italic">No orders yet.</h3>
            <p className="mt-3 max-w-sm text-sm leading-6 text-muted">
              When you place an order, it will appear here with delivery and payment details.
            </p>
            <Link
              href="/shop"
              className={buttonClass({ variant: "primary", size: "lg", className: "mt-8" })}
            >
              Explore the collection
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        ) : (
          <ul className="mt-8 space-y-4">
            {orders.map((order) => (
              <li key={order.id}>
                <Link
                  href={`/account/orders/${order.number}`}
                  className="group flex flex-col gap-4 rounded-[1.25rem] border border-line bg-white p-5 transition-colors hover:border-ink/25 sm:flex-row sm:items-center sm:justify-between sm:p-6"
                >
                  <div>
                    <p className="text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-muted">
                      {order.number}
                    </p>
                    <p className="mt-1.5 text-base font-medium">
                      {orderStatusLabel(order.status)}
                    </p>
                    <p className="mt-1 text-sm text-muted">
                      {formatOrderDate(order.createdAt)} · {order.itemCount}{" "}
                      {order.itemCount === 1 ? "piece" : "pieces"}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <p className="text-sm font-medium">{formatPrice(order.totalPaise)}</p>
                    <ArrowRight
                      className="size-4 text-muted transition-transform group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

function AccountSkeleton() {
  return (
    <div className="container-page py-10 sm:py-14" aria-hidden="true">
      <div className="flex items-end justify-between gap-4 border-b border-line pb-6">
        <div>
          <div className="h-3 w-20 rounded-full bg-line" />
          <div className="mt-4 h-10 w-56 rounded-xl bg-line/80" />
          <div className="mt-4 h-4 w-48 rounded-full bg-line/60" />
        </div>
        <div className="h-11 w-28 rounded-full bg-sand" />
      </div>
      <div className="mt-10 h-8 w-40 rounded-xl bg-line/80" />
      <div className="mt-8 space-y-4">
        <div className="h-24 rounded-[1.25rem] bg-sand" />
        <div className="h-24 rounded-[1.25rem] bg-sand" />
      </div>
    </div>
  );
}
