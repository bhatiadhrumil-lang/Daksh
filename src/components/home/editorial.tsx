import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { buttonClass } from "@/components/ui/button";

const stats = [
  { value: "10 yr", label: "Frame warranty" },
  { value: "14", label: "Independent makers" },
  { value: "2", label: "European studios" },
];

export function HomeEditorial() {
  return (
    <section id="editorial" className="container-page mt-16 sm:mt-24">
      <div className="grid overflow-hidden rounded-[1.75rem] bg-sand/70 lg:grid-cols-2">
        <div className="relative min-h-[360px] lg:min-h-[640px]">
          <Image
            src="/images/editorial-home.jpg"
            alt="A warmly lit living room with a sculptural armchair and layered natural textures"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
          <span className="absolute bottom-4 left-4 rounded-full bg-white/85 px-3.5 py-2 text-[0.6rem] font-semibold uppercase tracking-[0.16em] backdrop-blur">
            The Copenhagen studio
          </span>
        </div>

        <div className="flex flex-col justify-center p-6 sm:p-10 lg:p-14 xl:p-16">
          <p className="eyebrow">Our philosophy</p>
          <h2 className="mt-4 max-w-md font-serif text-[2.5rem] italic leading-[1.02] tracking-[-0.02em] sm:text-5xl">
            Made to be lived in.
          </h2>
          <p className="mt-6 max-w-md text-sm leading-7 text-muted">
            We design furniture the way we design rooms: with restraint, natural materials, and a
            little room to breathe. Every piece is drawn in Copenhagen and made in small runs by
            workshops we know by name.
          </p>
          <p className="mt-4 max-w-md text-sm leading-7 text-muted">
            No seasonal churn. No disposable shortcuts. Just considered objects that get better
            with time.
          </p>

          <dl className="mt-9 grid max-w-md grid-cols-3 gap-4 border-t border-ink/10 pt-6">
            {stats.map((stat) => (
              <div key={stat.label}>
                <dt className="sr-only">{stat.label}</dt>
                <dd className="text-2xl tracking-[-0.03em]">{stat.value}</dd>
                <dd className="mt-1 text-[0.62rem] uppercase tracking-[0.12em] text-muted">
                  {stat.label}
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-8">
            <Link
              href="/about"
              className={buttonClass({ variant: "outline", className: "bg-white/50" })}
            >
              Read our story
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
