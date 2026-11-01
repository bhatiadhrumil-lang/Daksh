import Link from "next/link";
import { ArrowUpRight, Mail } from "lucide-react";
import { NewsletterForm } from "@/components/forms/newsletter-form";
import { categories } from "@/lib/data";

const companyLinks = [
  { label: "Our story", href: "/about" },
  { label: "Journal", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export function SiteFooter() {
  return (
    <footer className="mt-24 bg-ink text-white">
      <div className="container-page">
        <div className="grid gap-12 py-16 lg:grid-cols-[1.3fr_0.7fr_0.7fr_1.1fr] lg:gap-10 lg:py-20">
          <div>
            <Link href="/" className="font-serif text-4xl italic leading-none" aria-label="Oasis home">
              Oasis
            </Link>
            <p className="mt-5 max-w-xs text-sm leading-6 text-white/60">
              Modern and contemporary furniture, made to be lived with. Designed in Copenhagen,
              built by makers we know.
            </p>
            <p className="mt-6 flex items-center gap-2 text-xs text-white/50">
              <Mail className="size-3.5" aria-hidden="true" />
              <a href="mailto:hello@oasis.example" className="hover:text-white">
                hello@oasis.example
              </a>
            </p>
          </div>

          <div>
            <h2 className="text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-white/40">
              Shop
            </h2>
            <ul className="mt-5 space-y-3">
              <li>
                <Link href="/shop" className="text-sm text-white/75 transition-colors hover:text-white">
                  All furniture
                </Link>
              </li>
              {categories.slice(0, 4).map((category) => (
                <li key={category.slug}>
                  <Link
                    href={`/shop?category=${category.slug}`}
                    className="text-sm text-white/75 transition-colors hover:text-white"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-white/40">
              Company
            </h2>
            <ul className="mt-5 space-y-3">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/75 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-1 text-sm text-white/75 transition-colors hover:text-white"
                >
                  Delivery & returns
                  <ArrowUpRight className="size-3" aria-hidden="true" />
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="font-serif text-3xl italic leading-tight">A slower kind of newsletter.</h2>
            <p className="mt-3 max-w-sm text-sm leading-6 text-white/55">
              New collections, considered homes, and the occasional studio note. No noise.
            </p>
            <NewsletterForm variant="dark" className="mt-5 max-w-sm" />
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-white/10 py-6 text-[0.68rem] text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Oasis. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <span>Designed in Copenhagen</span>
            <span>Visa · Mastercard · Amex · Apple Pay</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
