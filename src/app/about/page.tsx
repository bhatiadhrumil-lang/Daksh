import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Compass, Hammer, Leaf } from "lucide-react";
import { buttonClass } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Our story",
  description:
    "Oasis is a Copenhagen furniture studio making modern, contemporary pieces in small runs with independent makers.",
};

const values = [
  {
    icon: Compass,
    title: "Drawn with restraint",
    description:
      "Every piece begins with a room, not a trend. We remove until only the necessary remains.",
  },
  {
    icon: Hammer,
    title: "Made by people",
    description:
      "Small workshops in Denmark, Portugal, Italy, and Poland. Makers we know, paid fairly, visited often.",
  },
  {
    icon: Leaf,
    title: "Built for decades",
    description:
      "FSC-certified timber, repairable frames, and covers that can be replaced. Furniture should outlive us.",
  },
];

const milestones = [
  { year: "2016", title: "Oasis begins", description: "A small collection of oak tables, drawn in a Copenhagen apartment." },
  { year: "2020", title: "The first sofa", description: "Aurelia launches after two years of prototyping with a family workshop." },
  { year: "2026", title: "14 makers, 2 studios", description: "A growing family of workshops across Europe, still small by design." },
];

export default function AboutPage() {
  return (
    <div className="pb-4">
      <section className="container-page py-10 sm:py-14">
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-end lg:gap-16">
          <div>
            <p className="eyebrow">Our story</p>
            <h1 className="mt-4 max-w-2xl text-balance font-serif text-[3.25rem] italic leading-[0.98] tracking-[-0.025em] sm:text-7xl">
              Furniture for the art of everyday living.
            </h1>
          </div>
          <div className="max-w-lg lg:pb-2">
            <p className="text-sm leading-7 text-muted">
              Oasis is a modern furniture studio based in Copenhagen. We design quiet, generous
              pieces with honest materials and make them in small runs with independent workshops
              across Europe.
            </p>
            <p className="mt-4 text-sm leading-7 text-muted">
              We believe a home is built slowly — one considered object at a time, chosen for how
              it feels to live with, not how it looks in a photograph.
            </p>
          </div>
        </div>

        <div className="relative mt-9 aspect-[16/9] overflow-hidden rounded-[1.5rem] bg-sand sm:rounded-[2rem]">
          <Image
            src="/images/about-studio.jpg"
            alt="The Oasis studio and showroom in Copenhagen"
            fill
            preload
            sizes="(max-width: 1440px) 100vw, 1440px"
            className="object-cover"
          />
          <span className="absolute bottom-4 left-4 rounded-full bg-white/85 px-3.5 py-2 text-[0.6rem] font-semibold uppercase tracking-[0.16em] backdrop-blur sm:bottom-6 sm:left-6">
            Copenhagen · Est. 2016
          </span>
        </div>
      </section>

      <section className="container-page mt-10 sm:mt-16">
        <div className="grid gap-10 border-t border-line pt-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div>
            <p className="eyebrow">What we believe</p>
            <h2 className="mt-3 max-w-sm font-serif text-4xl italic leading-[1.05]">
              Less, but better. And made to last.
            </h2>
          </div>
          <div>
            <p className="max-w-xl text-sm leading-7 text-muted">
              The furniture industry moves fast. We do not. We release a handful of pieces each
              year, refine them for as long as it takes, and keep them in the collection. If a piece
              cannot be repaired, reupholstered, or passed on, we do not make it.
            </p>
            <div className="mt-8 grid grid-cols-3 gap-4 border-t border-line pt-6">
              <div>
                <p className="text-2xl tracking-[-0.03em]">14</p>
                <p className="mt-1 text-[0.62rem] uppercase tracking-[0.14em] text-muted">
                  Independent makers
                </p>
              </div>
              <div>
                <p className="text-2xl tracking-[-0.03em]">10 yr</p>
                <p className="mt-1 text-[0.62rem] uppercase tracking-[0.14em] text-muted">
                  Frame warranty
                </p>
              </div>
              <div>
                <p className="text-2xl tracking-[-0.03em]">30 days</p>
                <p className="mt-1 text-[0.62rem] uppercase tracking-[0.14em] text-muted">
                  To live with it
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-3">
          {values.map((value) => {
            const Icon = value.icon;
            return (
              <div key={value.title} className="rounded-[1.25rem] border border-line bg-white p-6">
                <Icon className="size-5 text-accent-strong" strokeWidth={1.5} aria-hidden="true" />
                <h3 className="mt-5 text-base font-medium">{value.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted">{value.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="container-page mt-16 sm:mt-24">
        <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr]">
          <div>
            <p className="eyebrow">The journey</p>
            <h2 className="mt-3 font-serif text-4xl italic">Slowly, deliberately.</h2>
          </div>
          <ol className="border-t border-line">
            {milestones.map((milestone) => (
              <li key={milestone.year} className="grid gap-2 border-b border-line py-5 sm:grid-cols-[100px_1fr] sm:gap-6">
                <p className="text-sm tabular-nums text-muted">{milestone.year}</p>
                <div>
                  <h3 className="text-base font-medium">{milestone.title}</h3>
                  <p className="mt-1 text-sm leading-6 text-muted">{milestone.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="container-page mt-16 sm:mt-20">
        <div className="flex flex-col items-start justify-between gap-6 rounded-[1.5rem] bg-ink px-6 py-10 text-white sm:flex-row sm:items-center sm:px-10 sm:py-12">
          <div>
            <p className="text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-white/45">
              Explore the collection
            </p>
            <h2 className="mt-3 max-w-lg font-serif text-3xl italic sm:text-4xl">
              Find the piece your room is waiting for.
            </h2>
          </div>
          <Link
            href="/shop"
            className={buttonClass({
              variant: "accent",
              size: "lg",
              className: "shrink-0",
            })}
          >
            Shop furniture
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </div>
  );
}
