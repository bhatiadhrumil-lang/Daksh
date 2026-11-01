import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { getCatalog } from "@/lib/catalog";
import { categories } from "@/lib/data";

export async function CategoryGrid() {
  const catalog = await getCatalog();
  return (
    <section className="container-page mt-16 sm:mt-24">
      <SectionHeading
        eyebrow="Collections"
        title="Shop by room"
        description="Quiet forms, honest materials, and pieces that work together without trying too hard."
        action={{ label: "View all furniture", href: "/shop" }}
      />

      <div className="mt-8 grid grid-cols-2 gap-3 sm:mt-10 sm:gap-4 lg:grid-cols-3 lg:gap-5">
        {categories.map((category) => (
          <Link
            key={category.slug}
            href={`/shop?category=${category.slug}`}
            className="group relative aspect-[4/5] overflow-hidden rounded-[1.25rem] bg-sand"
          >
            <Image
              src={category.image}
              alt={category.name}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/65 via-ink/5 to-transparent" />

            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4 text-white sm:p-5">
              <div>
                <p className="text-[0.58rem] font-semibold uppercase tracking-[0.18em] text-white/60">
                  {catalog.filter((product) => product.category === category.slug).length} pieces
                </p>
                <h3 className="mt-1.5 text-xl tracking-[-0.02em] sm:text-2xl">{category.name}</h3>
                <p className="mt-1 hidden text-xs text-white/65 sm:block">{category.tagline}</p>
              </div>
              <span className="flex size-9 shrink-0 items-center justify-center rounded-full border border-white/30 bg-white/10 backdrop-blur transition-colors duration-300 group-hover:bg-white group-hover:text-ink">
                <ArrowUpRight className="size-4" aria-hidden="true" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
