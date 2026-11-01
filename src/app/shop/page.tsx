import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Search, X } from "lucide-react";
import { ProductGrid } from "@/components/product/product-grid";
import { SortSelect } from "@/components/shop/sort-select";
import { getCatalog, searchProducts } from "@/lib/catalog";
import { categories, getCategory } from "@/lib/data";
import type { SortOption } from "@/lib/types";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Shop",
  description:
    "Shop Oasis furniture: sofas, lounge chairs, dining chairs, tables, storage, lighting, and bedroom pieces in honest, natural materials.",
};

type ShopSearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

const sortOptions: SortOption[] = ["featured", "newest", "price-asc", "price-desc", "name"];

function firstValue(value: string | string[] | undefined) {
  if (Array.isArray(value)) return value[0] ?? "";
  return value ?? "";
}

function isSortOption(value: string): value is SortOption {
  return sortOptions.includes(value as SortOption);
}

export default function ShopPage({ searchParams }: { searchParams: ShopSearchParams }) {
  return (
    <section className="container-page pt-8 sm:pt-12 lg:pt-14">
      <Suspense fallback={<ShopSkeleton />}>
        <ShopResults searchParams={searchParams} />
      </Suspense>
    </section>
  );
}

async function ShopResults({ searchParams }: { searchParams: ShopSearchParams }) {
  const params = await searchParams;
  const query = firstValue(params.q).trim();
  const requestedCategory = firstValue(params.category);
  const category = getCategory(requestedCategory) ?? null;
  const requestedSort = firstValue(params.sort);
  const sort: SortOption = isSortOption(requestedSort) ? requestedSort : "featured";

  const [results, catalog] = await Promise.all([
    searchProducts({ query, category: category?.slug ?? "", sort }),
    getCatalog(),
  ]);

  function categoryHref(slug?: string) {
    const next = new URLSearchParams();
    if (query) next.set("q", query);
    if (sort !== "featured") next.set("sort", sort);
    if (slug) next.set("category", slug);
    const search = next.toString();
    return `/shop${search ? `?${search}` : ""}`;
  }

  function clearSearchHref() {
    const next = new URLSearchParams();
    if (category) next.set("category", category.slug);
    if (sort !== "featured") next.set("sort", sort);
    const search = next.toString();
    return `/shop${search ? `?${search}` : ""}`;
  }

  const heading = category?.name ?? (query ? "Search results" : "All furniture");
  const description = category
    ? category.tagline
    : query
      ? `Showing pieces matching “${query}”.`
      : "Considered furniture for every room. Filter by category, search by material, or browse the full collection.";

  return (
    <>
      <header className="border-b border-line pb-7">
        <p className="eyebrow">Collections</p>
        <div className="mt-3 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h1 className="text-4xl leading-none tracking-[-0.04em] sm:text-5xl">{heading}</h1>
            <p className="mt-3 max-w-xl text-sm leading-6 text-muted">{description}</p>
          </div>
          <p className="text-xs uppercase tracking-[0.16em] text-muted">
            {results.length} {results.length === 1 ? "piece" : "pieces"}
          </p>
        </div>
      </header>

      <div className="mt-5 flex flex-col gap-4 border-b border-line pb-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="relative min-w-0">
          <div className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 lg:mx-0 lg:px-0">
            <Link
              href={categoryHref()}
              className={cn(
                "shrink-0 rounded-full border px-4 py-2 text-xs transition-colors",
                !category
                  ? "border-ink bg-ink text-white"
                  : "border-line bg-white text-ink hover:border-ink/30",
              )}
            >
              All <span className="ml-1 text-[0.65rem] opacity-60">{catalog.length}</span>
            </Link>
            {categories.map((item) => (
              <Link
                key={item.slug}
                href={categoryHref(item.slug)}
                className={cn(
                  "shrink-0 rounded-full border px-4 py-2 text-xs transition-colors",
                  category?.slug === item.slug
                    ? "border-ink bg-ink text-white"
                    : "border-line bg-white text-ink hover:border-ink/30",
                )}
              >
                {item.name}
                <span className="ml-1 text-[0.65rem] opacity-60">
                  {catalog.filter((product) => product.category === item.slug).length}
                </span>
              </Link>
            ))}
          </div>
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 -right-5 w-12 bg-gradient-to-l from-canvas to-transparent lg:hidden"
          />
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <form action="/shop" role="search" className="relative flex h-11 min-w-0 items-center rounded-full border border-line bg-white pl-4 pr-1.5 focus-within:border-accent sm:w-[290px]">
            {category ? <input type="hidden" name="category" value={category.slug} /> : null}
            {sort !== "featured" ? <input type="hidden" name="sort" value={sort} /> : null}
            <Search className="size-4 shrink-0 text-muted" aria-hidden="true" />
            <label htmlFor="shop-search" className="sr-only">
              Search furniture
            </label>
            <input
              id="shop-search"
              type="search"
              name="q"
              defaultValue={query}
              placeholder="Search pieces, materials…"
              className="h-full min-w-0 flex-1 bg-transparent px-2.5 text-sm outline-none placeholder:text-muted/70"
            />
            {query ? (
              <Link
                href={clearSearchHref()}
                aria-label="Clear search"
                className="flex size-8 shrink-0 items-center justify-center rounded-full text-muted transition-colors hover:bg-ink/5 hover:text-ink"
              >
                <X className="size-3.5" aria-hidden="true" />
              </Link>
            ) : null}
            <button
              type="submit"
              aria-label="Search"
              className="flex size-8 shrink-0 items-center justify-center rounded-full bg-ink text-white transition-colors hover:bg-accent"
            >
              <ArrowRight className="size-3.5" aria-hidden="true" />
            </button>
          </form>

          <SortSelect value={sort} query={query} category={category?.slug ?? ""} />
        </div>
      </div>

      {results.length > 0 ? (
        <ProductGrid products={results} columns={3} eagerCount={3} className="mt-8 sm:mt-10" />
      ) : (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <p className="font-serif text-3xl italic">Nothing here, yet.</p>
          <p className="mt-3 max-w-md text-sm leading-6 text-muted">
            We couldn&apos;t find pieces matching your search. Try a different material, room, or
            browse the full collection.
          </p>
          <Link
            href="/shop"
            className="mt-6 inline-flex h-11 items-center gap-2 rounded-full bg-ink px-6 text-sm font-medium text-white transition-colors hover:bg-accent"
          >
            Browse all furniture
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      )}
    </>
  );
}

function ShopSkeleton() {
  return (
    <div aria-hidden="true">
      <div className="border-b border-line pb-7">
        <div className="h-2.5 w-24 rounded-full bg-line" />
        <div className="mt-4 h-12 w-64 rounded-xl bg-line/80" />
        <div className="mt-4 h-4 w-full max-w-md rounded-full bg-line/60" />
      </div>
      <div className="mt-5 flex gap-2 border-b border-line pb-5">
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="h-9 w-24 rounded-full bg-line/70" />
        ))}
      </div>
      <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 lg:gap-x-7">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index}>
            <div className="aspect-[4/5] animate-pulse rounded-[1.25rem] bg-sand" />
            <div className="mt-4 h-3 w-20 rounded-full bg-line/70" />
            <div className="mt-2 h-4 w-40 rounded-full bg-line/80" />
          </div>
        ))}
      </div>
    </div>
  );
}
