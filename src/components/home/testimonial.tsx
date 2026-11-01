import Image from "next/image";
import { Star } from "lucide-react";

export function Testimonial() {
  return (
    <section className="relative mt-16 overflow-hidden sm:mt-24">
      <Image
        src="/images/testimonial-band.jpg"
        alt=""
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-ink/80" />

      <div className="container-page relative py-16 text-white sm:py-24">
        <div className="mx-auto max-w-4xl text-center">
          <div className="flex items-center justify-center gap-1" aria-label="Rated 5 out of 5">
            {Array.from({ length: 5 }).map((_, index) => (
              <Star
                key={index}
                className="size-3.5 fill-current text-white"
                aria-hidden="true"
              />
            ))}
          </div>
          <blockquote className="mt-7 text-balance font-serif text-[2rem] leading-[1.12] tracking-[-0.01em] sm:text-[2.8rem]">
            &ldquo;The Aurelia is the first piece of furniture we&rsquo;ve bought that feels like it
            was made for the room — and for us.&rdquo;
          </blockquote>
          <p className="mt-6 text-xs uppercase tracking-[0.18em] text-white/55">
            Amara L. · Copenhagen · Verified buyer
          </p>

          <div className="mx-auto mt-10 grid max-w-2xl grid-cols-3 gap-4 border-t border-white/15 pt-7">
            <div>
              <p className="text-xl tracking-[-0.02em] sm:text-2xl">4.9/5</p>
              <p className="mt-1 text-[0.6rem] uppercase tracking-[0.14em] text-white/45">
                Average rating
              </p>
            </div>
            <div>
              <p className="text-xl tracking-[-0.02em] sm:text-2xl">1,200+</p>
              <p className="mt-1 text-[0.6rem] uppercase tracking-[0.14em] text-white/45">
                Considered homes
              </p>
            </div>
            <div>
              <p className="text-xl tracking-[-0.02em] sm:text-2xl">30 days</p>
              <p className="mt-1 text-[0.6rem] uppercase tracking-[0.14em] text-white/45">
                To live with it
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
