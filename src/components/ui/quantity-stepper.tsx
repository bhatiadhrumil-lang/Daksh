import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

type QuantityStepperProps = {
  value: number;
  min?: number;
  max?: number;
  onChange: (value: number) => void;
  size?: "sm" | "md";
  label?: string;
};

export function QuantityStepper({
  value,
  min = 1,
  max = 10,
  onChange,
  size = "md",
  label = "Quantity",
}: QuantityStepperProps) {
  const buttonSize = size === "sm" ? "size-8" : "size-11";

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border border-line bg-white",
        size === "sm" ? "h-9" : "h-12",
      )}
    >
      <button
        type="button"
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        className={cn(
          "flex items-center justify-center rounded-full text-ink transition-colors hover:bg-ink/5 disabled:opacity-30",
          buttonSize,
        )}
        aria-label={`Decrease ${label.toLowerCase()}`}
      >
        <Minus className="size-3.5" aria-hidden="true" />
      </button>
      <span
        className={cn("text-center text-sm tabular-nums", size === "sm" ? "w-6" : "w-8")}
        aria-live="polite"
      >
        {value}
      </span>
      <button
        type="button"
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        className={cn(
          "flex items-center justify-center rounded-full text-ink transition-colors hover:bg-ink/5 disabled:opacity-30",
          buttonSize,
        )}
        aria-label={`Increase ${label.toLowerCase()}`}
      >
        <Plus className="size-3.5" aria-hidden="true" />
      </button>
    </div>
  );
}
