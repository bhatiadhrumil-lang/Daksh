"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowUpRight, X } from "lucide-react";
import { categories } from "@/lib/data";
import { buttonClass } from "@/components/ui/button";

type MobileMenuProps = {
  open: boolean;
  onClose: () => void;
};

const primaryLinks = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "Account", href: "/account" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
];

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open && !dialog.open) dialog.showModal();
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

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      aria-labelledby="mobile-menu-title"
      className="m-0 h-dvh max-h-none w-full max-w-none bg-transparent p-0 [&::backdrop]:bg-transparent"
    >
      <div className="flex h-full flex-col bg-canvas">
        <div className="flex items-center justify-between border-b border-line px-5 py-4">
          <Link href="/" onClick={onClose} className="font-serif text-3xl italic">
            Oasis
          </Link>
          <button
            type="button"
            onClick={onClose}
            className="flex size-10 items-center justify-center rounded-full transition-colors hover:bg-ink/5"
            aria-label="Close menu"
          >
            <X className="size-5" aria-hidden="true" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-7">
          <h2 id="mobile-menu-title" className="sr-only">
            Navigation
          </h2>
          <nav aria-label="Mobile navigation">
            <ul className="space-y-1">
              {primaryLinks.map((link, index) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={onClose}
                    className="group flex items-center justify-between border-b border-line/70 py-4"
                  >
                    <span className="flex items-baseline gap-4">
                      <span className="text-[0.62rem] tabular-nums text-muted">
                        0{index + 1}
                      </span>
                      <span className="text-2xl tracking-[-0.02em]">{link.label}</span>
                    </span>
                    <ArrowUpRight
                      className="size-4 text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mt-8">
            <p className="eyebrow">Shop by category</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {categories.map((category) => (
                <Link
                  key={category.slug}
                  href={`/shop?category=${category.slug}`}
                  onClick={onClose}
                  className="rounded-full border border-line bg-white px-4 py-2 text-sm transition-colors hover:border-ink/25"
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-line p-5">
          <Link
            href="/shop"
            onClick={onClose}
            className={buttonClass({ variant: "primary", size: "lg", className: "w-full" })}
          >
            Get started
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </Link>
          <p className="mt-3 text-center text-[0.68rem] text-muted">
            Complimentary delivery over ₹63,000 · 30-day returns
          </p>
        </div>
      </div>
    </dialog>
  );
}
