import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { buttonClass } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="container-page flex flex-col items-center py-24 text-center sm:py-32">
      <p className="eyebrow">404 · Not found</p>
      <h1 className="mt-4 max-w-xl font-serif text-5xl italic leading-[1.02] sm:text-6xl">
        This corner is still empty.
      </h1>
      <p className="mt-4 max-w-md text-sm leading-7 text-muted">
        The page you were looking for has moved, sold out, or never existed. Let&apos;s find you
        something better.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link href="/shop" className={buttonClass({ variant: "primary", size: "lg" })}>
          Shop the collection
          <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
        <Link href="/" className={buttonClass({ variant: "outline", size: "lg" })}>
          Back home
        </Link>
      </div>
    </div>
  );
}
