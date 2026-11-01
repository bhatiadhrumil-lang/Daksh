import type { Product } from "@/lib/types";
import { cn } from "@/lib/utils";
import { ProductCard } from "@/components/product/product-card";

type ProductGridProps = {
  products: Product[];
  columns?: 3 | 4;
  className?: string;
  eagerCount?: number;
};

export function ProductGrid({
  products,
  columns = 4,
  className,
  eagerCount = 0,
}: ProductGridProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:gap-x-7 lg:gap-y-14",
        columns === 4 ? "md:grid-cols-3 xl:grid-cols-4" : "md:grid-cols-3",
        className,
      )}
    >
      {products.map((product, index) => (
        <ProductCard
          key={product.id}
          product={product}
          preload={index < eagerCount}
          sizes={
            columns === 4
              ? "(max-width: 640px) 50vw, (max-width: 1280px) 33vw, 25vw"
              : "(max-width: 640px) 50vw, 33vw"
          }
        />
      ))}
    </div>
  );
}
