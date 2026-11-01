"use client";

import { useState } from "react";
import { Check, Send } from "lucide-react";
import { buttonClass, inputClass } from "@/components/ui/button";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="flex h-full min-h-[420px] flex-col items-center justify-center rounded-[1.5rem] border border-line bg-white p-8 text-center">
        <span className="flex size-14 items-center justify-center rounded-full bg-accent-soft text-accent-strong">
          <Check className="size-6" aria-hidden="true" />
        </span>
        <h2 className="mt-6 font-serif text-3xl italic">Message received.</h2>
        <p className="mt-3 max-w-sm text-sm leading-6 text-muted">
          Thank you for writing. A member of the studio will reply within two working days.
        </p>
        <p className="mt-4 text-[0.68rem] text-muted">
          Demo form — email delivery is connected in a later milestone.
        </p>
      </div>
    );
  }

  return (
    <form
      className="rounded-[1.5rem] border border-line bg-white p-6 sm:p-8"
      onSubmit={(event) => {
        event.preventDefault();
        setSubmitted(true);
      }}
    >
      <h2 className="text-xl tracking-[-0.02em]">Send a note</h2>
      <p className="mt-1.5 text-sm text-muted">
        Questions about a piece, a delivery, or a project? We read every message.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className="mb-1.5 block text-xs text-muted">
            Your name
          </label>
          <input
            id="contact-name"
            name="name"
            autoComplete="name"
            required
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="contact-email" className="mb-1.5 block text-xs text-muted">
            Email address
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className={inputClass}
          />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="contact-topic" className="mb-1.5 block text-xs text-muted">
            What is this about?
          </label>
          <select id="contact-topic" name="topic" className={inputClass} defaultValue="order">
            <option value="order">An existing order</option>
            <option value="product">A piece in the collection</option>
            <option value="delivery">Delivery & returns</option>
            <option value="trade">Trade & interior design</option>
            <option value="other">Something else</option>
          </select>
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="contact-message" className="mb-1.5 block text-xs text-muted">
            Message
          </label>
          <textarea
            id="contact-message"
            name="message"
            required
            rows={5}
            className="w-full rounded-2xl border border-line bg-white px-5 py-4 text-sm text-ink outline-none transition-colors placeholder:text-muted/70 focus:border-accent"
            placeholder="Tell us a little about what you need."
          />
        </div>
      </div>

      <button
        type="submit"
        className={buttonClass({ variant: "primary", size: "lg", className: "mt-5 w-full" })}
      >
        Send message
        <Send className="size-4" aria-hidden="true" />
      </button>
      <p className="mt-3 text-center text-[0.68rem] text-muted">
        Demo form — nothing is sent yet. Email delivery is a later milestone.
      </p>
    </form>
  );
}
