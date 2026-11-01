import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { buttonClass } from "@/components/ui/button";
import { getProductBySlug } from "@/lib/catalog";
import { formatPrice } from "@/lib/utils";

export async function HomeHero() {
  const marlow = await getProductBySlug("marlow-leather-sofa");

  return (
    <section className="container-page pt-9 sm:pt-12 lg:pt-16">
      <div className="mx-auto max-w-[60rem] text-center">
        <p className="eyebrow animate-fade-up">Furniture store</p>
        <h1 className="animate-fade-up-delay-1 mt-5 text-balance text-[clamp(2.7rem,7vw,5.4rem)] font-medium leading-[0.97] tracking-[-0.055em]">
          Discover the Artistry of{" "}
          <span className="font-serif font-normal italic tracking-[-0.03em]">
            Modern &amp; Contemporary
          </span>{" "}
          Furniture
        </h1>
        <p className="animate-fade-up-delay-2 mx-auto mt-6 max-w-2xl text-pretty text-sm leading-7 text-muted sm:text-base">
          Experience the elegance and functionality of cutting-edge design, where luxury meets
          innovation in every piece — made for the art of everyday living.
        </p>
        <div className="animate-fade-up-delay-2 mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link href="/shop" className={buttonClass({ variant: "primary", size: "lg" })}>
            Shop the collection
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
          <Link href="/about" className={buttonClass({ variant: "outline", size: "lg" })}>
            Explore our story
          </Link>
        </div>
      </div>

      <div className="relative mt-10 sm:mt-14">
        <div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem] bg-sand sm:rounded-[2rem] lg:aspect-[16/8]">
          <Image
            src="/images/hero-marlow.jpg"
            alt="Marlow cognac leather sofa in a sunlit, minimal living room"
            fill
            preload
            sizes="(max-width: 1440px) 100vw, 1440px"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/20 via-transparent to-transparent" />

          <div className="absolute left-4 top-4 hidden items-center gap-2 rounded-full bg-white/80 px-3.5 py-2 text-[0.6rem] font-semibold uppercase tracking-[0.16em] text-ink backdrop-blur sm:flex">
            <span className="size-1.5 rounded-full bg-accent" />
            The Marlow Collection
          </div>

          {marlow ? (
            <Link
              href={`/product/${marlow.slug}`}
              className="group absolute bottom-3 right-3 flex min-w-[224px] items-center justify-between gap-4 rounded-2xl bg-white/92 p-3.5 shadow-[0_18px_50px_rgba(30,29,26,0.18)] backdrop-blur transition-colors hover:bg-white sm:bottom-6 sm:right-6 sm:min-w-[270px] sm:p-4"
            >
              <div>
                <p className="text-[0.58rem] font-semibold uppercase tracking-[0.18em] text-muted">
                  Shown in Cognac
                </p>
                <p className="mt-1.5 text-sm font-medium leading-tight">{marlow.name}</p>
                <p className="mt-1 text-xs text-muted">{formatPrice(marlow.price)}</p>
              </div>
              <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-ink text-white transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                <ArrowUpRight className="size-4" aria-hidden="true" />
              </span>
            </Link>
          ) : null}
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-[0.65rem] uppercase tracking-[0.16em] text-muted">
        <p>Designed in Copenhagen · Made by independent makers</p>
        <p className="hidden sm:block">Scroll to explore</p>
      </div>
    </section>
  );
}
