"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShoppingBag, Truck, X } from "lucide-react";
import { useCart } from "@/components/cart/cart-provider";
import { QuantityStepper } from "@/components/ui/quantity-stepper";
import { buttonClass } from "@/components/ui/button";
import { FREE_SHIPPING_THRESHOLD } from "@/lib/data";
import { formatPrice } from "@/lib/utils";

export function CartDrawer() {
  const { isOpen, closeCart, items, subtotal, count, updateQuantity, removeItem } = useCart();
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen && !dialog.open) dialog.showModal();
    if (!isOpen && dialog.open) dialog.close();
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [isOpen]);

  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const progress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);

  return (
    <dialog
      ref={dialogRef}
      onClose={closeCart}
      aria-labelledby="cart-title"
      className="cart-dialog m-0 h-dvh max-h-none w-full max-w-none bg-transparent p-0"
    >
      <div className="flex h-full w-full justify-end">
        <button
          type="button"
          onClick={closeCart}
          className="absolute inset-0 cursor-default bg-ink/30 backdrop-blur-[2px]"
          aria-label="Close bag"
          tabIndex={-1}
        />

        <aside className="relative flex h-full w-full max-w-md flex-col border-l border-line bg-canvas shadow-2xl">
          <header className="flex items-center justify-between border-b border-line px-6 py-5">
            <div>
              <h2 id="cart-title" className="font-serif text-2xl italic">
                Your bag
              </h2>
              <p className="mt-0.5 text-xs text-muted">
                {count} {count === 1 ? "piece" : "pieces"} selected
              </p>
            </div>
            <button
              type="button"
              onClick={closeCart}
              className="flex size-10 items-center justify-center rounded-full transition-colors hover:bg-ink/5"
              aria-label="Close bag"
            >
              <X className="size-5" aria-hidden="true" />
            </button>
          </header>

          {items.length === 0 ? (
            <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
              <span className="flex size-16 items-center justify-center rounded-full bg-sand">
                <ShoppingBag className="size-6 text-ink/70" aria-hidden="true" />
              </span>
              <h3 className="mt-6 text-xl tracking-[-0.02em]">Your bag is empty</h3>
              <p className="mt-2 max-w-xs text-sm leading-6 text-muted">
                Discover considered pieces designed to make everyday rooms feel a little more
                intentional.
              </p>
              <Link
                href="/shop"
                onClick={closeCart}
                className={buttonClass({ variant: "primary", className: "mt-7" })}
              >
                Explore the collection
              </Link>
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto px-6">
              <ul className="divide-y divide-line">
                {items.map((item) => (
                  <li key={item.key} className="flex gap-4 py-5">
                    <Link
                      href={`/product/${item.product.slug}`}
                      onClick={closeCart}
                      className="relative h-[118px] w-[92px] shrink-0 overflow-hidden rounded-xl bg-sand"
                    >
                      <Image
                        src={item.product.image}
                        alt={item.product.name}
                        fill
                        sizes="92px"
                        className="object-cover"
                      />
                    </Link>
                    <div className="flex min-w-0 flex-1 flex-col">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-[0.6rem] font-semibold uppercase tracking-[0.16em] text-muted">
                            {item.product.category}
                          </p>
                          <h3 className="mt-1 text-sm font-medium leading-snug">
                            <Link
                              href={`/product/${item.product.slug}`}
                              onClick={closeCart}
                              className="hover:text-accent-strong"
                            >
                              {item.product.name}
                            </Link>
                          </h3>
                          {item.line.variant ? (
                            <p className="mt-1 text-xs text-muted">{item.line.variant}</p>
                          ) : null}
                        </div>
                        <span className="shrink-0 text-sm">{formatPrice(item.lineTotal)}</span>
                      </div>
                      <div className="mt-auto flex items-center justify-between gap-3 pt-3">
                        <QuantityStepper
                          size="sm"
                          value={item.line.quantity}
                          max={item.product.stock}
                          onChange={(quantity) => updateQuantity(item.key, quantity)}
                        />
                        <button
                          type="button"
                          onClick={() => removeItem(item.key)}
                          className="text-[0.7rem] text-muted underline-offset-4 hover:text-ink hover:underline"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {items.length > 0 ? (
            <footer className="border-t border-line px-6 py-5">
              <div className="mb-5">
                <div className="flex items-center gap-2 text-xs text-muted">
                  <Truck className="size-4" aria-hidden="true" />
                  {remaining > 0 ? (
                    <span>
                      Add <strong className="font-semibold text-ink">{formatPrice(remaining)}</strong>{" "}
                      for complimentary delivery
                    </span>
                  ) : (
                    <span>You&apos;ve unlocked complimentary delivery</span>
                  )}
                </div>
                <div className="mt-2.5 h-1 overflow-hidden rounded-full bg-line">
                  <div
                    className="h-full rounded-full bg-accent transition-[width] duration-500"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              <div className="flex items-baseline justify-between text-sm">
                <span className="text-muted">Subtotal</span>
                <span className="text-base font-medium">{formatPrice(subtotal)}</span>
              </div>
              <p className="mt-1 text-[0.7rem] leading-5 text-muted">
                Taxes and delivery calculated at checkout.
              </p>

              <div className="mt-4 grid gap-2">
                <Link
                  href="/checkout"
                  onClick={closeCart}
                  className={buttonClass({ variant: "primary", className: "w-full" })}
                >
                  Proceed to checkout
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
                <Link
                  href="/cart"
                  onClick={closeCart}
                  className={buttonClass({ variant: "outline", className: "w-full" })}
                >
                  View bag
                </Link>
              </div>
            </footer>
          ) : null}
        </aside>
      </div>
    </dialog>
  );
}
