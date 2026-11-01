"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Search, ShoppingBag, UserRound } from "lucide-react";
import { useCart } from "@/components/cart/cart-provider";
import { CategoriesMenu } from "@/components/layout/categories-menu";
import { MobileMenu } from "@/components/layout/mobile-menu";
import { SearchDialog } from "@/components/layout/search-dialog";
import { buttonClass } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "Blog", href: "/blog" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const { count, openCart, isReady } = useCart();
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);


  function isActive(href: string) {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  }

  return (
    <>
      <div className="bg-ink text-white">
        <div className="container-page flex h-8 items-center justify-center gap-2 text-center text-[0.6rem] font-medium uppercase tracking-[0.18em] sm:text-[0.65rem]">
          <span>Complimentary delivery over ₹63,000</span>
          <span className="hidden text-white/40 sm:inline">·</span>
          <span className="hidden text-white/70 sm:inline">30-day returns</span>
        </div>
      </div>

      <header className="sticky top-0 z-40 border-b border-line/80 bg-canvas/90 backdrop-blur-xl">
        <div className="container-page flex h-[72px] items-center justify-between gap-6">
          <Link
            href="/"
            aria-label="Oasis home"
            className="shrink-0 font-serif text-[2rem] italic leading-none tracking-[-0.02em]"
          >
            Oasis
          </Link>

          <nav aria-label="Main navigation" className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative py-2 text-sm transition-colors",
                  isActive(link.href) ? "text-ink" : "text-ink/70 hover:text-ink",
                )}
              >
                {link.label}
                <span
                  className={cn(
                    "absolute -bottom-0.5 left-0 h-px bg-ink transition-all duration-300",
                    isActive(link.href) ? "w-full" : "w-0",
                  )}
                />
              </Link>
            ))}
            <CategoriesMenu />
          </nav>

          <div className="flex items-center gap-1 sm:gap-2">
            <Link
              href="/account"
              className="flex size-10 items-center justify-center rounded-full transition-colors hover:bg-ink/5"
              aria-label="Account"
            >
              <UserRound className="size-[1.15rem]" aria-hidden="true" />
            </Link>

            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="flex size-10 items-center justify-center rounded-full transition-colors hover:bg-ink/5"
              aria-label="Search"
            >
              <Search className="size-[1.15rem]" aria-hidden="true" />
            </button>

            <button
              type="button"
              onClick={openCart}
              suppressHydrationWarning
              className="flex h-10 items-center gap-2 rounded-full px-2.5 transition-colors hover:bg-ink/5 sm:px-3"
              aria-label={`Open bag, ${isReady ? count : 0} ${(isReady ? count : 0) === 1 ? "item" : "items"}`}
            >
              <span className="relative">
                <ShoppingBag className="size-[1.15rem]" aria-hidden="true" />
                <span
                  suppressHydrationWarning
                  className={`absolute -right-2 -top-1.5 flex size-4 items-center justify-center rounded-full bg-accent text-[0.55rem] font-semibold text-white transition-opacity ${
                    isReady && count > 0 ? "opacity-100" : "opacity-0"
                  }`}
                >
                  {isReady && count > 0 ? (count > 9 ? "9+" : count) : ""}
                </span>
              </span>
              <span className="hidden text-sm lg:inline">Bag</span>
            </button>

            <Link
              href="/shop"
              className={buttonClass({
                variant: "accent",
                size: "sm",
                className: "ml-1 hidden px-5 sm:inline-flex",
              })}
            >
              Get started
            </Link>

            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className="flex size-10 items-center justify-center rounded-full transition-colors hover:bg-ink/5 lg:hidden"
              aria-label="Open menu"
            >
              <Menu className="size-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      <SearchDialog open={searchOpen} onClose={() => setSearchOpen(false)} />
      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
