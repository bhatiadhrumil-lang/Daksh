import Image from "next/image";
import Link from "next/link";
import { getCategory } from "@/lib/data";
import type { Product } from "@/lib/types";
import { formatPrice } from "@/lib/utils";
import { QuickAddButton } from "@/components/product/quick-add-button";

type ProductCardProps = {
  product: Product;
  sizes?: string;
  preload?: boolean;
};

export function ProductCard({
  product,
  sizes = "(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw",
  preload = false,
}: ProductCardProps) {
  const category = getCategory(product.category);
  const compareAt = product.compareAtPrice;

  return (
    <article className="group">
      <div className="relative aspect-[4/5] overflow-hidden rounded-[1.25rem] bg-sand">
        <Link href={`/product/${product.slug}`} aria-label={product.name} className="absolute inset-0">
          <Image
            src={product.image}
            alt={product.name}
            fill
            preload={preload}
            sizes={sizes}
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          />
        </Link>

        {product.badge ? (
          <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-ink backdrop-blur">
            {product.badge}
          </span>
        ) : null}

        <QuickAddButton
          product={product}
          variant={product.colors[0]?.name}
          className="absolute bottom-3 right-3 translate-y-0 opacity-100 focus-visible:translate-y-0 focus-visible:opacity-100 sm:translate-y-1 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100"
        />
      </div>

      <div className="mt-4 flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-muted">
            {category?.name ?? product.category}
          </p>
          <h3 className="mt-1.5 text-[0.95rem] font-medium leading-snug tracking-[-0.01em]">
            <Link href={`/product/${product.slug}`} className="hover:text-accent-strong">
              {product.name}
            </Link>
          </h3>
          <div className="mt-2 flex items-center gap-1.5" aria-label="Available finishes">
            {product.colors.slice(0, 3).map((color) => (
              <span
                key={color.name}
                title={color.name}
                className="size-2.5 rounded-full ring-1 ring-ink/10 ring-offset-1 ring-offset-canvas"
                style={{ backgroundColor: color.hex }}
              />
            ))}
            {product.colors.length > 3 ? (
              <span className="text-[0.65rem] text-muted">+{product.colors.length - 3}</span>
            ) : null}
          </div>
        </div>
        <div className="shrink-0 text-right text-sm">
          <span className={compareAt ? "text-accent-strong" : ""}>{formatPrice(product.price)}</span>
          {compareAt ? (
            <span className="ml-1.5 text-[0.7rem] text-muted line-through">
              {formatPrice(compareAt)}
            </span>
          ) : null}
        </div>
      </div>
    </article>
  );
}
