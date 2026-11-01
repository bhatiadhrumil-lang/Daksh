import { Leaf, RotateCcw, ShieldCheck, Truck } from "lucide-react";

const values = [
  {
    icon: Truck,
    title: "Complimentary delivery",
    description: "On all orders over ₹63,000, delivered by our own team.",
  },
  {
    icon: RotateCcw,
    title: "30-day returns",
    description: "Live with a piece before you commit. We'll collect it.",
  },
  {
    icon: ShieldCheck,
    title: "10-year frame warranty",
    description: "Solid timber frames, built to be repaired, not replaced.",
  },
  {
    icon: Leaf,
    title: "Responsibly sourced",
    description: "FSC-certified timber and low-impact textiles.",
  },
];

export function ValueProps() {
  return (
    <section className="container-page mt-14 sm:mt-20">
      <div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
        {values.map((value) => {
          const Icon = value.icon;
          return (
            <div key={value.title} className="bg-canvas px-5 py-6 sm:px-6">
              <Icon className="size-5 text-accent-strong" strokeWidth={1.5} aria-hidden="true" />
              <h2 className="mt-4 text-sm font-medium">{value.title}</h2>
              <p className="mt-1.5 text-xs leading-5 text-muted">{value.description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
