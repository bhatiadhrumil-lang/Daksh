"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, Lock, ShoppingBag, Truck } from "lucide-react";
import { useCart } from "@/components/cart/cart-provider";
import { buttonClass, inputClass } from "@/components/ui/button";
import {
  EXPRESS_SHIPPING,
  FREE_SHIPPING_THRESHOLD,
  STANDARD_SHIPPING,
} from "@/lib/data";
import { formatPrice } from "@/lib/utils";
import { createCheckoutOrder } from "@/app/checkout/actions";
import { verifyCheckoutPayment } from "@/app/checkout/verify-action";
import type { SessionUser } from "@/lib/auth";
import type { ShippingAddress, ShippingMethod } from "@/lib/types";

type PlacedOrder = {
  number: string;
  email: string;
  total: number;
};

type RazorpayResponse = {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
};

type RazorpayOptions = {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  prefill: { name: string; email: string; contact?: string };
  theme: { color: string };
  handler: (response: RazorpayResponse) => void;
  modal: { ondismiss: () => void };
};

declare global {
  interface Window {
    Razorpay?: new (options: RazorpayOptions) => { open: () => void };
  }
}

export function CheckoutPage({ user }: { user: SessionUser }) {
  const { items, subtotal, count, clearCart, isReady } = useCart();
  const [shippingMethod, setShippingMethod] = useState<ShippingMethod>("standard");
  const [placed, setPlaced] = useState<PlacedOrder | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const confirmationRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!placed) return;
    window.scrollTo(0, 0);
    confirmationRef.current?.focus({ preventScroll: true });
  }, [placed]);

  const standardCost = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : STANDARD_SHIPPING;
  const shippingCost = shippingMethod === "express" ? EXPRESS_SHIPPING : standardCost;
  const total = subtotal + shippingCost;

  async function loadRazorpay() {
    if (window.Razorpay) return true;

    return new Promise<boolean>((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    const data = new FormData(event.currentTarget);
    const address: ShippingAddress = {
      fullName: String(data.get("fullName") ?? "").trim(),
      phone: String(data.get("phone") ?? "").trim(),
      line1: String(data.get("address") ?? "").trim(),
      line2: String(data.get("apartment") ?? "").trim() || undefined,
      city: String(data.get("city") ?? "").trim(),
      state: String(data.get("state") ?? "").trim(),
      postalCode: String(data.get("postalCode") ?? "").trim(),
      country: "IN",
    };

    if (items.length === 0) {
      setError("Your bag is empty.");
      return;
    }

    setPending(true);

    const orderResult = await createCheckoutOrder({
      items: items.map((item) => ({
        productId: item.product.id,
        quantity: item.line.quantity,
        variant: item.line.variant,
      })),
      shippingMethod,
      address,
    });

    if (!orderResult.ok) {
      setPending(false);
      setError(orderResult.error);
      return;
    }

    const loaded = await loadRazorpay();
    if (!loaded || !window.Razorpay) {
      setPending(false);
      setError("Unable to load the payment window. Please try again.");
      return;
    }

    const razorpay = new window.Razorpay({
      key: orderResult.keyId,
      amount: orderResult.amountPaise,
      currency: orderResult.currency,
      name: "Oasis",
      description: `Order ${orderResult.orderNumber}`,
      order_id: orderResult.razorpayOrderId,
      prefill: {
        name: address.fullName,
        email: user.email,
        contact: address.phone,
      },
      theme: { color: "#1e1d1a" },
      handler: async (response) => {
        const verification = await verifyCheckoutPayment({
          orderId: orderResult.orderId,
          razorpayOrderId: response.razorpay_order_id,
          razorpayPaymentId: response.razorpay_payment_id,
          razorpaySignature: response.razorpay_signature,
        });

        if (!verification.ok) {
          setPending(false);
          setError(verification.error);
          return;
        }

        setPlaced({
          number: verification.orderNumber,
          email: user.email,
          total: orderResult.amountPaise,
        });
        clearCart();
        setPending(false);
      },
      modal: {
        ondismiss: () => {
          setPending(false);
        },
      },
    });

    razorpay.open();
  }

  if (!isReady) {
    return (
      <div className="container-page py-16" aria-hidden="true">
        <div className="h-10 w-48 animate-pulse rounded-xl bg-line" />
        <div className="mt-10 grid gap-10 lg:grid-cols-[1.35fr_0.8fr]">
          <div className="h-[520px] animate-pulse rounded-2xl bg-sand" />
          <div className="h-80 animate-pulse rounded-2xl bg-sand" />
        </div>
      </div>
    );
  }

  if (placed) {
    return (
      <div className="container-page flex flex-col items-center py-20 text-center sm:py-28">
        <span className="flex size-16 items-center justify-center rounded-full bg-accent-soft text-accent-strong">
          <Check className="size-7" aria-hidden="true" />
        </span>
        <p className="eyebrow mt-7">Order confirmed</p>
        <h1
          ref={confirmationRef}
          tabIndex={-1}
          className="mt-3 max-w-xl font-serif text-4xl italic leading-tight outline-none sm:text-5xl"
        >
          Thank you.
        </h1>
        <p className="mt-4 max-w-lg text-sm leading-7 text-muted">
          We&apos;ve received your payment and sent a confirmation to{" "}
          <strong className="font-medium text-ink">{placed.email}</strong>. Your pieces will be
          made and delivered by our white-glove team in 4–6 weeks.
        </p>

        <div className="mt-8 w-full max-w-md rounded-2xl border border-line bg-white p-5 text-left">
          <div className="flex justify-between border-b border-line pb-3 text-sm">
            <span className="text-muted">Order number</span>
            <span className="font-medium">{placed.number}</span>
          </div>
          <div className="flex justify-between pt-3 text-sm">
            <span className="text-muted">Total paid</span>
            <span className="font-medium">{formatPrice(placed.total)}</span>
          </div>
        </div>

        <Link
          href="/account"
          className={buttonClass({ variant: "primary", size: "lg", className: "mt-8" })}
        >
          View your account
          <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="container-page flex flex-col items-center py-24 text-center sm:py-32">
        <span className="flex size-16 items-center justify-center rounded-full bg-sand">
          <ShoppingBag className="size-6 text-ink/70" aria-hidden="true" />
        </span>
        <h1 className="mt-6 font-serif text-4xl italic">Nothing to check out</h1>
        <p className="mt-3 max-w-sm text-sm leading-6 text-muted">
          Add a piece to your bag first, then return here to complete your order.
        </p>
        <Link
          href="/shop"
          className={buttonClass({ variant: "primary", size: "lg", className: "mt-8" })}
        >
          Explore the collection
        </Link>
      </div>
    );
  }

  return (
    <div className="container-page py-10 sm:py-14">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line pb-6">
        <div>
          <p className="eyebrow">Checkout</p>
          <h1 className="mt-3 text-4xl tracking-[-0.04em] sm:text-5xl">Complete your order</h1>
          <p className="mt-2 text-sm text-muted">
            Signed in as {user.name} ({user.email})
          </p>
        </div>
        <p className="flex items-center gap-2 text-[0.68rem] uppercase tracking-[0.14em] text-muted">
          <Lock className="size-3.5" aria-hidden="true" />
          Secure checkout
        </p>
      </div>

      {error ? (
        <p role="alert" className="mt-6 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </p>
      ) : null}

      <div className="mt-8 grid gap-10 lg:grid-cols-[1.35fr_0.8fr] lg:gap-14">
        <form
          id="checkout-form"
          className="space-y-9"
          onSubmit={handleSubmit}
        >
          <fieldset>
            <legend className="text-lg tracking-[-0.02em]">Contact</legend>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label htmlFor="fullName" className="mb-1.5 block text-xs text-muted">
                  Full name
                </label>
                <input
                  id="fullName"
                  name="fullName"
                  autoComplete="name"
                  required
                  defaultValue={user.name}
                  className={inputClass}
                />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="email" className="mb-1.5 block text-xs text-muted">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  defaultValue={user.email}
                  disabled
                  className={inputClass}
                />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="phone" className="mb-1.5 block text-xs text-muted">
                  Phone number
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  required
                  className={inputClass}
                  placeholder="+91 98765 43210"
                />
              </div>
            </div>
          </fieldset>

          <fieldset>
            <legend className="text-lg tracking-[-0.02em]">Delivery address</legend>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label htmlFor="address" className="mb-1.5 block text-xs text-muted">
                  Street address
                </label>
                <input
                  id="address"
                  name="address"
                  autoComplete="address-line1"
                  required
                  className={inputClass}
                />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="apartment" className="mb-1.5 block text-xs text-muted">
                  Apartment, suite, etc. <span className="text-muted/60">(optional)</span>
                </label>
                <input
                  id="apartment"
                  name="apartment"
                  autoComplete="address-line2"
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="city" className="mb-1.5 block text-xs text-muted">
                  City
                </label>
                <input
                  id="city"
                  name="city"
                  autoComplete="address-level2"
                  required
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="state" className="mb-1.5 block text-xs text-muted">
                  State
                </label>
                <input
                  id="state"
                  name="state"
                  autoComplete="address-level1"
                  required
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="postalCode" className="mb-1.5 block text-xs text-muted">
                  Postal code
                </label>
                <input
                  id="postalCode"
                  name="postalCode"
                  autoComplete="postal-code"
                  required
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="country" className="mb-1.5 block text-xs text-muted">
                  Country
                </label>
                <input
                  id="country"
                  name="country"
                  value="India"
                  readOnly
                  className={inputClass}
                />
              </div>
            </div>
          </fieldset>

          <fieldset>
            <legend className="text-lg tracking-[-0.02em]">Delivery method</legend>
            <div className="mt-4 space-y-3">
              <label
                className={`flex cursor-pointer items-center justify-between gap-4 rounded-xl border p-4 transition-colors ${
                  shippingMethod === "standard"
                    ? "border-ink bg-white"
                    : "border-line bg-transparent hover:border-ink/25"
                }`}
              >
                <span className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="shipping"
                    value="standard"
                    checked={shippingMethod === "standard"}
                    onChange={() => setShippingMethod("standard")}
                    className="size-4 accent-[var(--ink)]"
                  />
                  <span>
                    <span className="block text-sm font-medium">White-glove delivery</span>
                    <span className="mt-0.5 block text-xs text-muted">4–6 weeks</span>
                  </span>
                </span>
                <span className="text-sm">
                  {standardCost === 0 ? "Complimentary" : formatPrice(standardCost)}
                </span>
              </label>

              <label
                className={`flex cursor-pointer items-center justify-between gap-4 rounded-xl border p-4 transition-colors ${
                  shippingMethod === "express"
                    ? "border-ink bg-white"
                    : "border-line bg-transparent hover:border-ink/25"
                }`}
              >
                <span className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="shipping"
                    value="express"
                    checked={shippingMethod === "express"}
                    onChange={() => setShippingMethod("express")}
                    className="size-4 accent-[var(--ink)]"
                  />
                  <span>
                    <span className="block text-sm font-medium">Express delivery</span>
                    <span className="mt-0.5 block text-xs text-muted">2–3 weeks</span>
                  </span>
                </span>
                <span className="text-sm">{formatPrice(EXPRESS_SHIPPING)}</span>
              </label>
            </div>
          </fieldset>

          <button
            type="submit"
            disabled={pending}
            className={buttonClass({ variant: "primary", size: "lg", className: "w-full" })}
          >
            {pending ? "Preparing payment…" : `Pay ${formatPrice(total)}`}
            <ArrowRight className="size-4" aria-hidden="true" />
          </button>
          <p className="text-center text-[0.68rem] text-muted">
            Payment is processed securely by Razorpay. Your bag will be cleared after successful
            payment.
          </p>
        </form>

        <aside className="h-fit rounded-[1.5rem] border border-line bg-white p-6 lg:sticky lg:top-24">
          <div className="flex items-center justify-between">
            <h2 className="text-lg tracking-[-0.02em]">Order summary</h2>
            <span className="text-xs text-muted">
              {count} {count === 1 ? "piece" : "pieces"}
            </span>
          </div>

          <ul className="mt-5 space-y-4">
            {items.map((item) => (
              <li key={item.key} className="flex gap-3">
                <div className="relative size-16 shrink-0 overflow-hidden rounded-lg bg-sand">
                  <Image
                    src={item.product.image}
                    alt={item.product.name}
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{item.product.name}</p>
                  <p className="mt-0.5 text-xs text-muted">
                    {item.line.variant ? `${item.line.variant} · ` : ""}Qty {item.line.quantity}
                  </p>
                </div>
                <p className="text-sm">{formatPrice(item.lineTotal)}</p>
              </li>
            ))}
          </ul>

          <div className="mt-5 space-y-3 border-t border-line pt-4 text-sm">
            <div className="flex justify-between">
              <span className="text-muted">Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted">Delivery</span>
              <span>{shippingCost === 0 ? "Complimentary" : formatPrice(shippingCost)}</span>
            </div>
            <div className="flex justify-between border-t border-line pt-3 text-base font-medium">
              <span>Total</span>
              <span>{formatPrice(total)}</span>
            </div>
          </div>

          <p className="mt-4 flex items-start gap-2 text-[0.68rem] leading-5 text-muted">
            <Truck className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
            Prices include GST. Delivery estimates are shown at checkout.
          </p>
        </aside>
      </div>
    </div>
  );
}
