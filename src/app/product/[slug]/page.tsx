import { Suspense } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, Plus, RotateCcw, ShieldCheck, Star } from "lucide-react";
import { ProductGrid } from "@/components/product/product-grid";
import { ProductPurchasePanel } from "@/components/product/product-purchase-panel";
import { SectionHeading } from "@/components/ui/section-heading";
import { getProductBySlug, getRelatedProducts } from "@/lib/catalog";
import { FREE_SHIPPING_THRESHOLD, getCategory, products as seedProducts } from "@/lib/data";
import { formatPrice } from "@/lib/utils";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return seedProducts.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return { title: "Piece not found" };
  }

  return {
    title: product.name,
    description: `${product.description} ${formatPrice(product.price)} at Oasis.`,
  };
}

export default function ProductPage({ params }: ProductPageProps) {
  return (
    <Suspense fallback={<ProductDetailSkeleton />}>
      <ProductDetail params={params} />
    </Suspense>
  );
}

async function ProductDetail({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const category = getCategory(product.category);
  const related = await getRelatedProducts(product, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    sku: product.sku,
    brand: {
      "@type": "Brand",
      name: "Oasis",
    },
    image: product.image,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating,
      reviewCount: product.reviewCount,
    },
    offers: {
      "@type": "Offer",
      priceCurrency: "INR",
      price: (product.price / 100).toFixed(2),
      availability:
        product.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      itemCondition: "https://schema.org/NewCondition",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="container-page pt-5 sm:pt-7">
        <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-xs text-muted">
          <Link href="/" className="hover:text-ink">
            Home
          </Link>
          <ChevronRight className="size-3" aria-hidden="true" />
          <Link href="/shop" className="hover:text-ink">
            Shop
          </Link>
          {category ? (
            <>
              <ChevronRight className="size-3" aria-hidden="true" />
              <Link href={`/shop?category=${category.slug}`} className="hover:text-ink">
                {category.name}
              </Link>
            </>
          ) : null}
          <ChevronRight className="size-3" aria-hidden="true" />
          <span className="text-ink">{product.name}</span>
        </nav>

        <div className="mt-6 grid gap-9 lg:grid-cols-[1.08fr_0.92fr] lg:gap-12 xl:gap-16">
          <div className="self-start lg:sticky lg:top-24">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] bg-sand sm:rounded-[2rem]">
              <Image
                src={product.image}
                alt={product.name}
                fill
                preload
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="object-cover"
              />
              {product.badge ? (
                <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3.5 py-1.5 text-[0.6rem] font-semibold uppercase tracking-[0.16em] backdrop-blur">
                  {product.badge}
                </span>
              ) : null}
              <span className="absolute bottom-4 right-4 rounded-full bg-white/80 px-3 py-1.5 text-[0.6rem] uppercase tracking-[0.14em] text-muted backdrop-blur">
                {product.sku}
              </span>
            </div>
            <div className="mt-3 grid grid-cols-3 gap-3 text-[0.62rem] uppercase tracking-[0.12em] text-muted">
              <span className="rounded-xl border border-line px-3 py-2.5 text-center">Made to order</span>
              <span className="rounded-xl border border-line px-3 py-2.5 text-center">Solid timber</span>
              <span className="rounded-xl border border-line px-3 py-2.5 text-center">10-year frame</span>
            </div>
          </div>

          <div className="pb-4 lg:py-2">
            {category ? (
              <Link
                href={`/shop?category=${category.slug}`}
                className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-muted transition-colors hover:text-accent-strong"
              >
                {category.name}
              </Link>
            ) : null}
            <h1 className="mt-3 text-4xl leading-[1.02] tracking-[-0.045em] sm:text-5xl">
              {product.name}
            </h1>

            <div className="mt-4 flex items-center gap-2 text-xs text-muted">
              <span className="flex items-center gap-0.5" aria-hidden="true">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star
                    key={index}
                    className={
                      index < Math.round(product.rating)
                        ? "size-3.5 fill-ink text-ink"
                        : "size-3.5 text-line"
                    }
                  />
                ))}
              </span>
              <span>
                {product.rating.toFixed(1)} · {product.reviewCount} reviews
              </span>
            </div>

            <div className="mt-7">
              <ProductPurchasePanel product={product} />
            </div>

            <div className="mt-7 border-t border-line">
              <details className="group border-b border-line py-4" open>
                <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-medium">
                  Materials &amp; care
                  <Plus
                    className="size-4 text-muted transition-transform duration-200 group-open:rotate-45"
                    aria-hidden="true"
                  />
                </summary>
                <ul className="mt-3 space-y-1.5 text-sm leading-6 text-muted">
                  {product.materials.map((material) => (
                    <li key={material}>{material}</li>
                  ))}
                  <li>Wipe with a soft, dry cloth. Avoid direct sunlight and harsh cleaners.</li>
                </ul>
              </details>

              <details className="group border-b border-line py-4">
                <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-medium">
                  Dimensions &amp; details
                  <Plus
                    className="size-4 text-muted transition-transform duration-200 group-open:rotate-45"
                    aria-hidden="true"
                  />
                </summary>
                <dl className="mt-3 space-y-2 text-sm">
                  {product.specs.map((spec) => (
                    <div key={spec.label} className="flex justify-between gap-6">
                      <dt className="text-muted">{spec.label}</dt>
                      <dd className="text-right">{spec.value}</dd>
                    </div>
                  ))}
                </dl>
              </details>

              <details className="group border-b border-line py-4">
                <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-medium">
                  Delivery &amp; returns
                  <Plus
                    className="size-4 text-muted transition-transform duration-200 group-open:rotate-45"
                    aria-hidden="true"
                  />
                </summary>
                <div className="mt-3 space-y-2 text-sm leading-6 text-muted">
                  <p>
                    Made to order and delivered in 4–6 weeks with our white-glove service.
                    Complimentary on orders over {formatPrice(FREE_SHIPPING_THRESHOLD)}.
                  </p>
                  <p>
                    Live with it for 30 days. If it isn&apos;t right, we&apos;ll collect it and
                    refund you in full.
                  </p>
                </div>
              </details>
            </div>

            <div className="mt-5 flex flex-wrap gap-5 text-[0.7rem] text-muted">
              <span className="flex items-center gap-2">
                <RotateCcw className="size-3.5" aria-hidden="true" />
                30-day returns
              </span>
              <span className="flex items-center gap-2">
                <ShieldCheck className="size-3.5" aria-hidden="true" />
                10-year frame warranty
              </span>
            </div>

            <p className="mt-5 text-[0.68rem] text-muted">
              {product.story}
            </p>
            <p className="mt-4 text-[0.62rem] uppercase tracking-[0.14em] text-muted">
              SKU {product.sku}
            </p>
          </div>
        </div>
      </section>

      <section className="container-page mt-16 sm:mt-24">
        <SectionHeading
          eyebrow="Complete the room"
          title="You may also like"
          action={{ label: "Shop all", href: "/shop" }}
        />
        <ProductGrid products={related} columns={3} className="mt-8 sm:mt-10" />
      </section>
    </>
  );
}

function ProductDetailSkeleton() {
  return (
    <div className="container-page pt-5 sm:pt-7" aria-hidden="true">
      <div className="h-3 w-72 max-w-full rounded-full bg-line/70" />
      <div className="mt-6 grid gap-9 lg:grid-cols-[1.08fr_0.92fr] lg:gap-12 xl:gap-16">
        <div>
          <div className="aspect-[4/5] animate-pulse rounded-[1.5rem] bg-sand sm:rounded-[2rem]" />
          <div className="mt-3 grid grid-cols-3 gap-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="h-9 rounded-xl border border-line" />
            ))}
          </div>
        </div>
        <div className="py-2">
          <div className="h-2.5 w-20 rounded-full bg-line/70" />
          <div className="mt-5 h-12 w-4/5 rounded-xl bg-line/80" />
          <div className="mt-5 h-3.5 w-36 rounded-full bg-line/60" />
          <div className="mt-8 h-14 w-40 rounded-full bg-line/70" />
          <div className="mt-8 space-y-4">
            <div className="h-11 rounded-xl bg-sand" />
            <div className="h-11 rounded-xl bg-sand" />
            <div className="h-11 rounded-xl bg-sand" />
          </div>
        </div>
      </div>
    </div>
  );
}
