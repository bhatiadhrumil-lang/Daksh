import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { ArrowLeft, Check, MapPin, Receipt } from "lucide-react";
import { requireUser } from "@/lib/auth";
import { getUserOrder } from "@/lib/orders";
import { formatOrderDate, orderStatusLabel } from "@/lib/order-format";
import { formatPrice } from "@/lib/utils";

type OrderPageProps = {
  params: Promise<{ number: string }>;
};

export const metadata: Metadata = {
  title: "Order details",
  description: "Order details from your Oasis account.",
};

export default function OrderPage({ params }: OrderPageProps) {
  return (
    <Suspense fallback={<OrderSkeleton />}>
      <OrderContent params={params} />
    </Suspense>
  );
}

async function OrderContent({ params }: OrderPageProps) {
  const { number } = await params;
  const user = await requireUser(`/account/orders/${number}`);
  const order = await getUserOrder(user.id, number);

  if (!order) notFound();

  const paid = order.status === "paid" || order.status === "processing";

  return (
    <div className="container-page py-10 sm:py-14">
      <Link
        href="/account"
        className="inline-flex items-center gap-2 text-sm text-muted underline-offset-4 hover:text-ink hover:underline"
      >
        <ArrowLeft className="size-4" aria-hidden="true" />
        Back to account
      </Link>

      <div className="mt-6 flex flex-wrap items-end justify-between gap-4 border-b border-line pb-6">
        <div>
          <p className="eyebrow">Order {order.number}</p>
          <h1 className="mt-3 text-4xl tracking-[-0.04em] sm:text-5xl">
            {orderStatusLabel(order.status)}
          </h1>
          <p className="mt-3 text-sm text-muted">
            Placed on {formatOrderDate(order.createdAt)} · {formatPrice(order.totalPaise)}
          </p>
        </div>
        {paid ? (
          <p className="flex items-center gap-2 rounded-full bg-accent-soft px-4 py-2 text-xs font-medium text-accent-strong">
            <Check className="size-4" aria-hidden="true" />
            Payment confirmed
          </p>
        ) : null}
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1.4fr_0.8fr] lg:gap-14">
        <section>
          <h2 className="text-lg tracking-[-0.02em]">Pieces in this order</h2>
          <ul className="mt-5 divide-y divide-line border-y border-line">
            {order.items.map((item) => (
              <li key={item.id} className="flex gap-4 py-5 sm:gap-6">
                <Link
                  href={`/product/${item.productSlug}`}
                  className="relative h-[112px] w-[88px] shrink-0 overflow-hidden rounded-xl bg-sand sm:h-[128px] sm:w-[100px]"
                >
                  <Image
                    src={item.image}
                    alt={item.productName}
                    fill
                    sizes="100px"
                    className="object-cover"
                  />
                </Link>
                <div className="flex min-w-0 flex-1 flex-col justify-between">
                  <div>
                    <h3 className="text-base font-medium leading-snug">
                      <Link href={`/product/${item.productSlug}`} className="hover:text-accent-strong">
                        {item.productName}
                      </Link>
                    </h3>
                    <p className="mt-1 text-xs text-muted">
                      {item.variant ? `${item.variant} · ` : ""}Qty {item.quantity}
                    </p>
                    <p className="mt-1.5 text-xs text-muted">
                      {formatPrice(item.unitPricePaise)} each
                    </p>
                  </div>
                  <p className="text-sm font-medium">{formatPrice(item.lineTotalPaise)}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <aside className="space-y-6">
          <div className="rounded-[1.5rem] border border-line bg-white p-6">
            <h2 className="flex items-center gap-2 text-lg tracking-[-0.02em]">
              <Receipt className="size-5" aria-hidden="true" />
              Summary
            </h2>
            <div className="mt-5 space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted">Subtotal</span>
                <span>{formatPrice(order.subtotalPaise)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Delivery</span>
                <span>
                  {order.shippingPaise === 0 ? "Complimentary" : formatPrice(order.shippingPaise)}
                </span>
              </div>
              <div className="flex justify-between border-t border-line pt-3 text-base font-medium">
                <span>Total</span>
                <span>{formatPrice(order.totalPaise)}</span>
              </div>
            </div>
          </div>

          <div className="rounded-[1.5rem] border border-line bg-white p-6">
            <h2 className="flex items-center gap-2 text-lg tracking-[-0.02em]">
              <MapPin className="size-5" aria-hidden="true" />
              Delivery
            </h2>
            <div className="mt-5 space-y-1 text-sm leading-6 text-muted">
              <p className="font-medium text-ink">{order.address.fullName}</p>
              <p>{order.address.line1}</p>
              {order.address.line2 ? <p>{order.address.line2}</p> : null}
              <p>
                {order.address.city}, {order.address.state} {order.address.postalCode}
              </p>
              <p>{order.address.phone}</p>
              <p className="pt-2 text-xs">
                {order.shippingMethod === "express"
                  ? "Express delivery · 2–3 weeks"
                  : "White-glove delivery · 4–6 weeks"}
              </p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

function OrderSkeleton() {
  return (
    <div className="container-page py-10 sm:py-14" aria-hidden="true">
      <div className="h-4 w-32 rounded-full bg-line" />
      <div className="mt-6 border-b border-line pb-6">
        <div className="h-3 w-28 rounded-full bg-line" />
        <div className="mt-4 h-10 w-48 rounded-xl bg-line/80" />
        <div className="mt-4 h-4 w-56 rounded-full bg-line/60" />
      </div>
      <div className="mt-10 grid gap-10 lg:grid-cols-[1.4fr_0.8fr]">
        <div className="h-64 rounded-2xl bg-sand" />
        <div className="h-64 rounded-2xl bg-sand" />
      </div>
    </div>
  );
}
