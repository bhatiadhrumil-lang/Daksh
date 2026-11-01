"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShoppingBag, Truck } from "lucide-react";
import { useCart } from "@/components/cart/cart-provider";
import { QuantityStepper } from "@/components/ui/quantity-stepper";
import { buttonClass } from "@/components/ui/button";
import { FREE_SHIPPING_THRESHOLD, STANDARD_SHIPPING } from "@/lib/data";
import { formatPrice } from "@/lib/utils";

export function CartPage() {
  const { items, subtotal, count, updateQuantity, removeItem, isReady } = useCart();

  if (!isReady) {
    return (
      <div className="container-page py-16" aria-hidden="true">
        <div className="h-10 w-56 animate-pulse rounded-xl bg-line" />
        <div className="mt-10 grid gap-10 lg:grid-cols-[1.5fr_0.8fr]">
          <div className="space-y-4">
            {Array.from({ length: 2 }).map((_, index) => (
              <div key={index} className="h-36 animate-pulse rounded-2xl bg-sand" />
            ))}
          </div>
          <div className="h-72 animate-pulse rounded-2xl bg-sand" />
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="container-page flex flex-col items-center py-24 text-center sm:py-32">
        <span className="flex size-16 items-center justify-center rounded-full bg-sand">
          <ShoppingBag className="size-6 text-ink/70" aria-hidden="true" />
        </span>
        <h1 className="mt-6 font-serif text-4xl italic">Your bag is empty</h1>
        <p className="mt-3 max-w-sm text-sm leading-6 text-muted">
          Start with a piece you&apos;ll reach for every day. Our collection is designed to work
          together, slowly.
        </p>
        <Link
          href="/shop"
          className={buttonClass({ variant: "primary", size: "lg", className: "mt-8" })}
        >
          Explore the collection
          <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
      </div>
    );
  }

  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : STANDARD_SHIPPING;
  const total = subtotal + shipping;
  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);

  return (
    <div className="container-page py-10 sm:py-14">
      <header className="flex items-end justify-between gap-4 border-b border-line pb-6">
        <div>
          <p className="eyebrow">Shopping bag</p>
          <h1 className="mt-3 text-4xl tracking-[-0.04em] sm:text-5xl">Your bag</h1>
        </div>
        <p className="text-xs uppercase tracking-[0.16em] text-muted">
          {count} {count === 1 ? "piece" : "pieces"}
        </p>
      </header>

      <div className="mt-8 grid gap-10 lg:grid-cols-[1.55fr_0.75fr] lg:gap-14">
        <div>
          <ul className="divide-y divide-line border-y border-line">
            {items.map((item) => (
              <li key={item.key} className="flex gap-4 py-6 sm:gap-6">
                <Link
                  href={`/product/${item.product.slug}`}
                  className="relative h-[140px] w-[108px] shrink-0 overflow-hidden rounded-xl bg-sand sm:h-[168px] sm:w-[132px]"
                >
                  <Image
                    src={item.product.image}
                    alt={item.product.name}
                    fill
                    sizes="132px"
                    className="object-cover"
                  />
                </Link>
                <div className="flex min-w-0 flex-1 flex-col">
                  <div className="flex flex-col justify-between gap-2 sm:flex-row sm:gap-6">
                    <div>
                      <p className="text-[0.6rem] font-semibold uppercase tracking-[0.16em] text-muted">
                        {item.product.category}
                      </p>
                      <h2 className="mt-1.5 text-base font-medium leading-snug sm:text-lg">
                        <Link
                          href={`/product/${item.product.slug}`}
                          className="hover:text-accent-strong"
                        >
                          {item.product.name}
                        </Link>
                      </h2>
                      {item.line.variant ? (
                        <p className="mt-1.5 text-xs text-muted">{item.line.variant}</p>
                      ) : null}
                      <p className="mt-1.5 text-xs text-muted">{formatPrice(item.product.price)} each</p>
                    </div>
                    <p className="text-sm font-medium">{formatPrice(item.lineTotal)}</p>
                  </div>
                  <div className="mt-auto flex items-center justify-between gap-4 pt-5">
                    <QuantityStepper
                      size="sm"
                      value={item.line.quantity}
                      max={item.product.stock}
                      onChange={(quantity) => updateQuantity(item.key, quantity)}
                    />
                    <button
                      type="button"
                      onClick={() => removeItem(item.key)}
                      className="text-xs text-muted underline-offset-4 hover:text-ink hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <Link
            href="/shop"
            className="mt-6 inline-flex items-center gap-2 text-sm font-medium underline-offset-4 hover:underline"
          >
            Continue shopping
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>

        <aside className="h-fit rounded-[1.5rem] border border-line bg-white p-6 lg:sticky lg:top-24">
          <h2 className="text-lg tracking-[-0.02em]">Order summary</h2>

          <div className="mt-5 space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted">Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted">Delivery</span>
              <span>{shipping === 0 ? "Complimentary" : formatPrice(shipping)}</span>
            </div>
            <div className="flex justify-between border-t border-line pt-3 text-base font-medium">
              <span>Total</span>
              <span>{formatPrice(total)}</span>
            </div>
          </div>

          <div className="mt-5 rounded-xl bg-canvas p-3.5">
            <p className="flex items-start gap-2 text-xs leading-5 text-muted">
              <Truck className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
              {remaining > 0
                ? `Add ${formatPrice(remaining)} more for complimentary delivery.`
                : "Complimentary white-glove delivery is included."}
            </p>
          </div>

          <Link
            href="/checkout"
            className={buttonClass({ variant: "primary", size: "lg", className: "mt-5 w-full" })}
          >
            Proceed to checkout
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
          <p className="mt-3 text-center text-[0.68rem] leading-5 text-muted">
            Taxes calculated at checkout. Secure payment integration is the next milestone.
          </p>
        </aside>
      </div>
    </div>
  );
}
