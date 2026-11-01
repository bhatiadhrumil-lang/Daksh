import "server-only";
import { cacheLife, cacheTag } from "next/cache";
import { asc, eq, inArray } from "drizzle-orm";
import { db } from "@/db";
import { products } from "@/db/schema";
import type { Product, ProductSpec, SortOption } from "@/lib/types";

function toProduct(row: typeof products.$inferSelect): Product {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    category: row.category,
    price: row.pricePaise,
    compareAtPrice: row.compareAtPricePaise ?? undefined,
    description: row.description,
    story: row.story,
    image: row.image,
    colors: row.colors,
    materials: row.materials,
    specs: row.specs as ProductSpec[],
    badge: row.badge ?? undefined,
    featured: row.featured,
    rating: row.rating,
    reviewCount: row.reviewCount,
    stock: row.stock,
    sku: row.sku,
  };
}

export async function getCatalog() {
  "use cache";
  cacheLife("hours");
  cacheTag("catalog");

  const rows = await db
    .select()
    .from(products)
    .where(eq(products.active, true))
    .orderBy(asc(products.sortOrder), asc(products.name));

  return rows.map(toProduct);
}

export async function getProductById(id: string) {
  const catalog = await getCatalog();
  return catalog.find((product) => product.id === id);
}

export async function getProductBySlug(slug: string) {
  const catalog = await getCatalog();
  return catalog.find((product) => product.slug === slug);
}

export async function getFeaturedProducts(limit = 4) {
  const catalog = await getCatalog();
  return catalog.filter((product) => product.featured).slice(0, limit);
}

export async function getNewArrivals() {
  const catalog = await getCatalog();
  return catalog.filter((product) => product.badge === "New");
}

export async function getCategoryCount(slug: string) {
  const catalog = await getCatalog();
  return catalog.filter((product) => product.category === slug).length;
}

export async function getRelatedProducts(product: Product, limit = 3) {
  const catalog = await getCatalog();
  const sameCategory = catalog.filter(
    (candidate) => candidate.category === product.category && candidate.id !== product.id,
  );

  if (sameCategory.length >= limit) {
    return sameCategory.slice(0, limit);
  }

  const fallback = catalog.filter(
    (candidate) =>
      candidate.id !== product.id &&
      !sameCategory.some((related) => related.id === candidate.id),
  );

  return [...sameCategory, ...fallback].slice(0, limit);
}

export async function searchProducts({
  query = "",
  category = "",
  sort = "featured",
}: {
  query?: string;
  category?: string;
  sort?: SortOption;
}) {
  const catalog = await getCatalog();
  const normalizedQuery = query.trim().toLowerCase();

  let result = catalog.filter((product) => {
    const matchesCategory = category ? product.category === category : true;
    const haystack = [
      product.name,
      product.description,
      product.category,
      ...product.materials,
      ...product.colors.map((color) => color.name),
    ]
      .join(" ")
      .toLowerCase();

    const matchesQuery = normalizedQuery ? haystack.includes(normalizedQuery) : true;

    return matchesCategory && matchesQuery;
  });

  result = [...result];

  switch (sort) {
    case "price-asc":
      result.sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      result.sort((a, b) => b.price - a.price);
      break;
    case "name":
      result.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case "newest":
      result.sort((a, b) => {
        const aNew = a.badge === "New" ? 1 : 0;
        const bNew = b.badge === "New" ? 1 : 0;
        return bNew - aNew || b.rating - a.rating;
      });
      break;
    default:
      result.sort((a, b) => {
        const aFeatured = a.featured ? 1 : 0;
        const bFeatured = b.featured ? 1 : 0;
        return bFeatured - aFeatured || b.rating - a.rating;
      });
  }

  return result;
}

export async function getOrderableProducts(ids: string[]) {
  if (ids.length === 0) return [];

  const rows = await db
    .select()
    .from(products)
    .where(inArray(products.id, ids));

  return rows.filter((row) => row.active).map(toProduct);
}
