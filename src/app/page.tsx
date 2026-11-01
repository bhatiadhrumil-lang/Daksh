import { HomeHero } from "@/components/home/hero";
import { ValueProps } from "@/components/home/value-props";
import { CategoryGrid } from "@/components/home/category-grid";
import { HomeEditorial } from "@/components/home/editorial";
import { Testimonial } from "@/components/home/testimonial";
import { JournalPreview } from "@/components/home/journal-preview";
import { ProductGrid } from "@/components/product/product-grid";
import { SectionHeading } from "@/components/ui/section-heading";
import { getCatalog, getFeaturedProducts } from "@/lib/catalog";

export default async function HomePage() {
  const [featured, catalog] = await Promise.all([getFeaturedProducts(), getCatalog()]);
  const bestsellerIds = ["lumen-sofa", "vale-chair", "kess-cabinet", "serene-bed"];
  const bestsellers = bestsellerIds
    .map((id) => catalog.find((product) => product.id === id))
    .filter((product): product is NonNullable<typeof product> => Boolean(product));

  return (
    <>
      <HomeHero />
      <ValueProps />
      <CategoryGrid />

      <section className="container-page mt-16 sm:mt-24">
        <SectionHeading
          eyebrow="The edit"
          title="Considered essentials"
          description="The pieces we reach for first — grounded forms, tactile materials, and comfort that lasts."
          action={{ label: "Shop all pieces", href: "/shop" }}
        />
        <ProductGrid products={featured} className="mt-8 sm:mt-10" />
      </section>

      <HomeEditorial />

      <section className="container-page mt-16 sm:mt-24">
        <SectionHeading
          eyebrow="Loved in real homes"
          title="Quietly iconic pieces"
          description="Our most-loved furniture, chosen by people building rooms to live in for years."
          action={{ label: "View bestsellers", href: "/shop?sort=featured" }}
        />
        <ProductGrid products={bestsellers} className="mt-8 sm:mt-10" />
      </section>

      <Testimonial />
      <JournalPreview />
    </>
  );
}
