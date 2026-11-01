"use client";

import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { cn } from "@/lib/utils";

type NewsletterFormProps = {
  variant?: "light" | "dark";
  className?: string;
};

export function NewsletterForm({ variant = "light", className }: NewsletterFormProps) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div
        className={cn(
          "flex items-center gap-3 rounded-full px-5 py-3.5 text-sm",
          variant === "dark" ? "bg-white/10 text-white" : "bg-accent-soft text-ink",
          className,
        )}
        role="status"
      >
        <Check className="size-4 shrink-0" aria-hidden="true" />
        You&apos;re on the list. Look out for our next letter.
      </div>
    );
  }

  return (
    <form
      className={cn("flex w-full items-center gap-2", className)}
      onSubmit={(event) => {
        event.preventDefault();
        if (!email.trim()) return;
        setSubmitted(true);
        setEmail("");
      }}
    >
      <label htmlFor={`newsletter-${variant}`} className="sr-only">
        Email address
      </label>
      <input
        id={`newsletter-${variant}`}
        type="email"
        required
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        placeholder="Your email address"
        className={cn(
          "h-12 min-w-0 flex-1 rounded-full border px-5 text-sm outline-none transition-colors",
          variant === "dark"
            ? "border-white/20 bg-white/5 text-white placeholder:text-white/50 focus:border-white/60"
            : "border-line bg-white text-ink placeholder:text-muted/70 focus:border-accent",
        )}
      />
      <button
        type="submit"
        className={cn(
          "flex size-12 shrink-0 items-center justify-center rounded-full transition-colors",
          variant === "dark"
            ? "bg-white text-ink hover:bg-accent hover:text-white"
            : "bg-ink text-white hover:bg-accent",
        )}
        aria-label="Subscribe to the newsletter"
      >
        <ArrowRight className="size-4" aria-hidden="true" />
      </button>
    </form>
  );
}
