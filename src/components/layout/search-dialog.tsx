"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Search, X } from "lucide-react";
import { categories } from "@/lib/data";

type SearchDialogProps = {
  open: boolean;
  onClose: () => void;
};

const popularSearches = ["Sofas", "Oak", "Lounge chair", "Lighting"];

export function SearchDialog({ open, onClose }: SearchDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const router = useRouter();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open && !dialog.open) {
      dialog.showModal();
      window.setTimeout(() => inputRef.current?.focus(), 30);
    }
    if (!open && dialog.open) dialog.close();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [open]);

  function submitSearch(value: string) {
    const trimmed = value.trim();
    if (!trimmed) return;
    onClose();
    setQuery("");
    router.push(`/shop?q=${encodeURIComponent(trimmed)}`);
  }

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      aria-labelledby="search-title"
      className="w-[calc(100%-2rem)] max-w-2xl rounded-[1.5rem] bg-canvas p-0 shadow-[0_40px_100px_rgba(30,29,26,0.25)]"
    >
      <div className="p-5 sm:p-7">
        <div className="flex items-center justify-between">
          <h2 id="search-title" className="font-serif text-2xl italic">
            Search Oasis
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="flex size-9 items-center justify-center rounded-full transition-colors hover:bg-ink/5"
            aria-label="Close search"
          >
            <X className="size-4.5" aria-hidden="true" />
          </button>
        </div>

        <form
          className="mt-5"
          onSubmit={(event) => {
            event.preventDefault();
            submitSearch(query);
          }}
        >
          <div className="flex h-14 items-center gap-3 rounded-full border border-line bg-white px-5 focus-within:border-accent">
            <Search className="size-4.5 shrink-0 text-muted" aria-hidden="true" />
            <input
              ref={inputRef}
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search sofas, chairs, materials…"
              aria-label="Search the store"
              className="h-full min-w-0 flex-1 bg-transparent text-sm text-ink outline-none placeholder:text-muted/70"
            />
            <button
              type="submit"
              className="flex size-9 shrink-0 items-center justify-center rounded-full bg-ink text-white transition-colors hover:bg-[#35322d]"
              aria-label="Submit search"
            >
              <ArrowRight className="size-4" aria-hidden="true" />
            </button>
          </div>
        </form>

        <div className="mt-6">
          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-muted">
            Popular searches
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {popularSearches.map((term) => (
              <button
                key={term}
                type="button"
                onClick={() => submitSearch(term)}
                className="rounded-full border border-line bg-white px-4 py-2 text-xs text-ink transition-colors hover:border-ink/30 hover:bg-sand/60"
              >
                {term}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 border-t border-line pt-5">
          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-muted">
            Shop by category
          </p>
          <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 sm:grid-cols-3">
            {categories.map((category) => (
              <button
                key={category.slug}
                type="button"
                onClick={() => {
                  onClose();
                  router.push(`/shop?category=${category.slug}`);
                }}
                className="py-1 text-left text-sm text-ink/80 transition-colors hover:text-accent-strong"
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </dialog>
  );
}
