"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { categories, getCategoryCount } from "@/lib/data";
import { cn } from "@/lib/utils";

export function CategoriesMenu() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);


  useEffect(() => {
    if (!open) return;

    function handlePointerDown(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls="categories-panel"
        className="inline-flex items-center gap-1.5 py-2 text-sm text-ink/75 transition-colors hover:text-ink"
      >
        Categories
        <ChevronDown
          className={cn("size-3.5 transition-transform duration-300", open && "rotate-180")}
          aria-hidden="true"
        />
      </button>

      <div
        id="categories-panel"
        className={cn(
          "absolute left-1/2 top-full z-50 w-[620px] -translate-x-1/2 pt-3 transition-all duration-200",
          open
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-2 opacity-0",
        )}
      >
        <div className="overflow-hidden rounded-[1.5rem] border border-line bg-canvas shadow-[0_24px_60px_rgba(30,29,26,0.14)]">
          <div className="grid grid-cols-2 gap-1 p-3">
            {categories.map((category) => (
              <Link
                key={category.slug}
                href={`/shop?category=${category.slug}`}
                onClick={() => setOpen(false)}
                className="group flex items-center gap-3 rounded-xl p-2.5 transition-colors hover:bg-sand/80"
              >
                <span className="relative h-14 w-12 shrink-0 overflow-hidden rounded-lg bg-sand">
                  <Image
                    src={category.image}
                    alt=""
                    fill
                    sizes="48px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </span>
                <span className="min-w-0">
                  <span className="flex items-center gap-2 text-sm font-medium">
                    {category.name}
                    <span className="text-[0.65rem] font-normal text-muted">
                      {getCategoryCount(category.slug)}
                    </span>
                  </span>
                  <span className="mt-0.5 block truncate text-xs text-muted">
                    {category.tagline}
                  </span>
                </span>
              </Link>
            ))}
          </div>
          <Link
            href="/shop"
            onClick={() => setOpen(false)}
            className="flex items-center justify-between border-t border-line px-5 py-3.5 text-xs font-medium transition-colors hover:bg-sand/60"
          >
            View all furniture
            <ArrowUpRight className="size-3.5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  );
}
