import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { JournalPost } from "@/lib/types";

export function JournalCard({ post }: { post: JournalPost }) {
  return (
    <article className="group">
      <Link
        href={`/blog/${post.slug}`}
        className="relative block aspect-[4/3] overflow-hidden rounded-[1.25rem] bg-sand"
      >
        <Image
          src={post.image}
          alt={post.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
        <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.16em] backdrop-blur">
          {post.category}
        </span>
      </Link>
      <div className="mt-4 flex items-start justify-between gap-4">
        <div>
          <p className="text-[0.65rem] uppercase tracking-[0.14em] text-muted">
            {post.date} · {post.readTime}
          </p>
          <h3 className="mt-2 max-w-md text-lg font-medium leading-snug tracking-[-0.015em]">
            <Link href={`/blog/${post.slug}`} className="hover:text-accent-strong">
              {post.title}
            </Link>
          </h3>
          <p className="mt-2 line-clamp-2 max-w-md text-sm leading-6 text-muted">{post.excerpt}</p>
        </div>
        <span className="mt-1 flex size-8 shrink-0 items-center justify-center rounded-full border border-line transition-colors group-hover:border-ink group-hover:bg-ink group-hover:text-white">
          <ArrowUpRight className="size-3.5" aria-hidden="true" />
        </span>
      </div>
    </article>
  );
}
