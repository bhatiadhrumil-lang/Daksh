"use client";

import { useState } from "react";
import { Check, Plus } from "lucide-react";
import { useCart } from "@/components/cart/cart-provider";
import type { ProductSnapshot } from "@/lib/types";
import { cn } from "@/lib/utils";

type QuickAddButtonProps = {
  product: ProductSnapshot;
  variant?: string;
  className?: string;
};

export function QuickAddButton({ product, variant, className }: QuickAddButtonProps) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  function handleClick() {
    addItem(product, 1, variant);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1400);
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={`Add ${product.name} to bag`}
      className={cn(
        "flex size-10 items-center justify-center rounded-full bg-white/95 text-ink shadow-[0_6px_20px_rgba(30,29,26,0.12)] backdrop-blur transition-all duration-300 hover:scale-105 hover:bg-ink hover:text-white",
        className,
      )}
    >
      {added ? (
        <Check className="size-4" aria-hidden="true" />
      ) : (
        <Plus className="size-4" aria-hidden="true" />
      )}
    </button>
  );
}
