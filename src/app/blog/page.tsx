import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { JournalCard } from "@/components/journal/journal-card";
import { buttonClass } from "@/components/ui/button";
import { journalPosts } from "@/lib/data";

export const metadata: Metadata = {
  title: "Journal",
  description:
    "Notes on slow homes, honest materials, and the people and places behind Oasis furniture.",
};

export default function BlogPage() {
  const [featured, ...rest] = journalPosts;

  return (
    <div className="container-page py-10 sm:py-14">
      <header className="max-w-3xl">
        <p className="eyebrow">The journal</p>
        <h1 className="mt-4 text-5xl leading-[0.98] tracking-[-0.05em] text-balance sm:text-6xl">
          Notes on living <span className="font-serif italic">well.</span>
        </h1>
        <p className="mt-5 max-w-xl text-sm leading-7 text-muted">
          Slow homes, honest materials, and the people and places that shape how we live. A quieter
          kind of reading.
        </p>
      </header>

      {featured ? (
        <article className="mt-10 grid gap-6 border-t border-line pt-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-12">
          <Link
            href={`/blog/${featured.slug}`}
            className="group relative aspect-[16/11] overflow-hidden rounded-[1.5rem] bg-sand"
          >
            <Image
              src={featured.image}
              alt={featured.title}
              fill
              preload
              sizes="(max-width: 1024px) 100vw, 58vw"
              className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            />
            <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.16em] backdrop-blur">
              Featured · {featured.category}
            </span>
          </Link>

          <div className="lg:pr-8">
            <p className="text-[0.65rem] uppercase tracking-[0.14em] text-muted">
              {featured.date} · {featured.readTime}
            </p>
            <h2 className="mt-3 max-w-lg font-serif text-4xl italic leading-[1.05] tracking-[-0.02em] sm:text-5xl">
              {featured.title}
            </h2>
            <p className="mt-5 max-w-md text-sm leading-7 text-muted">{featured.excerpt}</p>
            <Link
              href={`/blog/${featured.slug}`}
              className="group mt-7 inline-flex items-center gap-2 text-sm font-medium underline-offset-4 hover:underline"
            >
              Read the story
              <ArrowUpRight
                className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </Link>
          </div>
        </article>
      ) : null}

      <div className="mt-14 grid gap-x-6 gap-y-10 border-t border-line pt-10 md:grid-cols-2 lg:gap-x-7">
        {rest.map((post) => (
          <JournalCard key={post.slug} post={post} />
        ))}
      </div>

      <section className="mt-16 flex flex-col items-start justify-between gap-6 rounded-[1.5rem] bg-accent-soft px-6 py-10 sm:flex-row sm:items-center sm:px-10">
        <div>
          <p className="eyebrow">The collection</p>
          <h2 className="mt-2 font-serif text-3xl italic sm:text-4xl">Bring the story home.</h2>
          <p className="mt-2 max-w-md text-sm leading-6 text-muted">
            Considered furniture, made in small runs by makers we know.
          </p>
        </div>
        <Link
          href="/shop"
          className={buttonClass({ variant: "primary", size: "lg", className: "shrink-0" })}
        >
          Shop furniture
          <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
      </section>
    </div>
  );
}
