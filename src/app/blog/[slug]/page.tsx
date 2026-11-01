import { Suspense } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { JournalCard } from "@/components/journal/journal-card";
import { journalPosts } from "@/lib/data";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return journalPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = journalPosts.find((entry) => entry.slug === slug);

  if (!post) {
    return { title: "Story not found" };
  }

  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  return (
    <Suspense fallback={<BlogPostSkeleton />}>
      <BlogPostContent params={params} />
    </Suspense>
  );
}

async function BlogPostContent({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = journalPosts.find((entry) => entry.slug === slug);

  if (!post) {
    notFound();
  }

  const related = journalPosts.filter((entry) => entry.slug !== post.slug).slice(0, 2);

  return (
    <article className="container-page py-8 sm:py-12">
      <Link
        href="/blog"
        className="inline-flex items-center gap-2 text-xs text-muted transition-colors hover:text-ink"
      >
        <ArrowLeft className="size-3.5" aria-hidden="true" />
        Back to the journal
      </Link>

      <header className="mx-auto mt-8 max-w-3xl text-center">
        <p className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-accent-strong">
          {post.category}
        </p>
        <h1 className="mt-4 text-balance font-serif text-[2.75rem] italic leading-[1.02] tracking-[-0.02em] sm:text-6xl">
          {post.title}
        </h1>
        <p className="mt-5 text-sm leading-7 text-muted">{post.excerpt}</p>
        <p className="mt-5 text-[0.65rem] uppercase tracking-[0.14em] text-muted">
          {post.date} · {post.readTime} · Words by Oasis Studio
        </p>
      </header>

      <div className="relative mx-auto mt-9 aspect-[16/9] max-w-5xl overflow-hidden rounded-[1.5rem] bg-sand sm:rounded-[2rem]">
        <Image
          src={post.image}
          alt={post.title}
          fill
          preload
          sizes="(max-width: 1024px) 100vw, 1024px"
          className="object-cover"
        />
      </div>

      <div className="mx-auto mt-10 max-w-2xl">
        {post.body.map((paragraph, index) => (
          <p
            key={index}
            className={
              index === 0
                ? "text-lg leading-8 text-ink/85 first-letter:float-left first-letter:mr-3 first-letter:font-serif first-letter:text-6xl first-letter:italic first-letter:leading-[0.8]"
                : "mt-6 text-[0.95rem] leading-8 text-ink/75"
            }
          >
            {paragraph}
          </p>
        ))}

        <div className="mt-10 flex items-center justify-between gap-4 border-t border-line pt-6">
          <p className="text-xs uppercase tracking-[0.14em] text-muted">Oasis Studio</p>
          <Link
            href="/shop"
            className="group inline-flex items-center gap-2 text-sm font-medium underline-offset-4 hover:underline"
          >
            Shop the collection
            <ArrowUpRight
              className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </Link>
        </div>
      </div>

      <section className="mx-auto mt-16 max-w-5xl border-t border-line pt-10">
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-serif text-3xl italic">Keep reading</h2>
          <Link href="/blog" className="text-xs text-muted underline-offset-4 hover:text-ink hover:underline">
            All stories
          </Link>
        </div>
        <div className="mt-7 grid gap-x-6 gap-y-10 md:grid-cols-2">
          {related.map((entry) => (
            <JournalCard key={entry.slug} post={entry} />
          ))}
        </div>
      </section>
    </article>
  );
}

function BlogPostSkeleton() {
  return (
    <div className="container-page py-8 sm:py-12" aria-hidden="true">
      <div className="h-3 w-40 rounded-full bg-line/70" />
      <div className="mx-auto mt-8 max-w-3xl text-center">
        <div className="mx-auto h-2.5 w-24 rounded-full bg-line/70" />
        <div className="mx-auto mt-5 h-14 w-full max-w-2xl rounded-xl bg-line/80" />
        <div className="mx-auto mt-5 h-4 w-3/4 rounded-full bg-line/60" />
      </div>
      <div className="mx-auto mt-9 aspect-[16/9] max-w-5xl animate-pulse rounded-[1.5rem] bg-sand sm:rounded-[2rem]" />
      <div className="mx-auto mt-10 max-w-2xl space-y-4">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="h-4 rounded-full bg-line/60" />
        ))}
      </div>
    </div>
  );
}
