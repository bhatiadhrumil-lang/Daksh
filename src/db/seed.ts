import { products as seedProducts } from "../lib/data";
import { db } from "./index";
import { products } from "./schema";

async function seed() {
  const now = new Date();
  const rows = seedProducts.map((product, index) => ({
    id: product.id,
    slug: product.slug,
    name: product.name,
    category: product.category,
    pricePaise: product.price,
    compareAtPricePaise: product.compareAtPrice ?? null,
    description: product.description,
    story: product.story,
    image: product.image,
    colors: product.colors,
    materials: product.materials,
    specs: product.specs,
    badge: product.badge ?? null,
    featured: product.featured ?? false,
    rating: product.rating,
    reviewCount: product.reviewCount,
    stock: product.stock,
    sku: product.sku,
    sortOrder: index,
    active: true,
    updatedAt: now,
  }));

  for (const row of rows) {
    await db
      .insert(products)
      .values(row)
      .onConflictDoUpdate({
        target: products.id,
        set: row,
      });
  }

  console.log(`Seeded ${rows.length} products.`);
}

seed()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
