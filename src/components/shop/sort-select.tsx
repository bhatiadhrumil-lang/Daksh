"use client";

import { useRouter } from "next/navigation";
import { ChevronDown } from "lucide-react";
import type { SortOption } from "@/lib/types";

type SortSelectProps = {
  value: SortOption;
  query: string;
  category: string;
};

const options: { value: SortOption; label: string }[] = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
  { value: "name", label: "Alphabetical" },
];

export function SortSelect({ value, query, category }: SortSelectProps) {
  const router = useRouter();

  return (
    <div className="relative shrink-0">
      <label htmlFor="sort" className="sr-only">
        Sort products
      </label>
      <select
        id="sort"
        value={value}
        onChange={(event) => {
          const params = new URLSearchParams();
          if (query) params.set("q", query);
          if (category) params.set("category", category);
          if (event.target.value !== "featured") params.set("sort", event.target.value);
          const search = params.toString();
          router.push(`/shop${search ? `?${search}` : ""}`);
        }}
        className="h-11 appearance-none rounded-full border border-line bg-white pl-4 pr-10 text-sm text-ink transition-colors hover:border-ink/25 focus:border-accent focus:outline-none"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <ChevronDown
        className="pointer-events-none absolute right-3.5 top-1/2 size-4 -translate-y-1/2 text-muted"
        aria-hidden="true"
      />
    </div>
  );
}
