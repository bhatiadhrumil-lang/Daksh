"use client";

import { useState } from "react";
import { ArrowRight, Check, Truck } from "lucide-react";
import { useCart } from "@/components/cart/cart-provider";
import { QuantityStepper } from "@/components/ui/quantity-stepper";
import { buttonClass } from "@/components/ui/button";
import { FREE_SHIPPING_THRESHOLD } from "@/lib/data";
import type { Product } from "@/lib/types";
import { cn, formatPrice } from "@/lib/utils";

export function ProductPurchasePanel({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [color, setColor] = useState(product.colors[0]?.name ?? "");
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const isFreeDelivery = product.price >= FREE_SHIPPING_THRESHOLD;

  function handleAdd() {
    addItem(product, quantity, color);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1600);
  }

  return (
    <div>
      <div className="flex items-baseline gap-3">
        <p className="text-2xl tracking-[-0.03em]">{formatPrice(product.price)}</p>
        {product.compareAtPrice ? (
          <p className="text-sm text-muted line-through">{formatPrice(product.compareAtPrice)}</p>
        ) : null}
      </div>

      <p className="mt-4 text-sm leading-7 text-muted">{product.description}</p>

      <div className="mt-7 border-t border-line pt-6">
        <div className="flex items-center justify-between">
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.16em]">
            Finish
          </p>
          <p className="text-xs text-muted">{color}</p>
        </div>
        <div className="mt-3 flex flex-wrap gap-2.5" role="radiogroup" aria-label="Select a finish">
          {product.colors.map((option) => {
            const selected = option.name === color;
            return (
              <button
                key={option.name}
                type="button"
                role="radio"
                aria-checked={selected}
                onClick={() => setColor(option.name)}
                className={cn(
                  "flex items-center gap-2 rounded-full border px-3 py-2 text-xs transition-colors",
                  selected
                    ? "border-ink bg-white text-ink"
                    : "border-line bg-transparent text-muted hover:border-ink/30 hover:text-ink",
                )}
              >
                <span
                  className="size-4 rounded-full ring-1 ring-ink/10"
                  style={{ backgroundColor: option.hex }}
                />
                {option.name}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <QuantityStepper
          value={quantity}
          max={product.stock}
          onChange={setQuantity}
          label="quantity"
        />
        <button
          type="button"
          onClick={handleAdd}
          className={buttonClass({
            variant: "primary",
            size: "lg",
            className: "w-full flex-1 sm:w-auto",
          })}
        >
          {added ? (
            <>
              <Check className="size-4" aria-hidden="true" />
              Added to bag
            </>
          ) : (
            <>
              Add to bag — {formatPrice(product.price * quantity)}
              <ArrowRight className="size-4" aria-hidden="true" />
            </>
          )}
        </button>
      </div>

      <div className="mt-4 flex flex-col gap-2 text-xs text-muted">
        <p className="flex items-center gap-2">
          <Truck className="size-3.5 shrink-0" aria-hidden="true" />
          {isFreeDelivery
            ? "Complimentary white-glove delivery on this piece"
            : "Complimentary delivery on orders over ₹63,000"}
        </p>
        <p>
          {product.stock <= 8
            ? `Only ${product.stock} left in this finish · ships in 4–6 weeks`
            : "In stock · ships in 4–6 weeks"}
        </p>
      </div>
    </div>
  );
}
