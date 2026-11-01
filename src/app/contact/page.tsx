import type { Metadata } from "next";
import { Clock, Mail, MapPin, Plus } from "lucide-react";
import { ContactForm } from "@/components/forms/contact-form";

export const metadata: Metadata = {
  title: "Contact",
  description: "Talk to the Oasis studio about furniture, orders, delivery, or a design project.",
};

const faqs = [
  {
    question: "How long will my order take?",
    answer:
      "Every piece is made to order. Most furniture is delivered in 4–6 weeks; lighting and accessories usually ship within 5–7 working days. We'll confirm the timeline after your order.",
  },
  {
    question: "Can I see the materials in person?",
    answer:
      "Yes. Complimentary material samples are available for most upholstery, timber, and metal finishes. Send us a note with the pieces you're considering.",
  },
  {
    question: "What is your returns policy?",
    answer:
      "Live with your piece for 30 days. If it isn't right, contact us and we'll arrange collection and a full refund, provided it is in its original condition.",
  },
  {
    question: "Do you work with interior designers?",
    answer:
      "We do. Our trade program includes dedicated support, project pricing, and material libraries. Write to us with a little about your practice and project.",
  },
];

export default function ContactPage() {
  return (
    <div className="container-page py-10 sm:py-14">
      <header className="max-w-3xl">
        <p className="eyebrow">Contact</p>
        <h1 className="mt-4 text-5xl leading-[0.98] tracking-[-0.05em] text-balance sm:text-6xl">
          Let&apos;s talk about <span className="font-serif italic">your room.</span>
        </h1>
        <p className="mt-5 max-w-xl text-sm leading-7 text-muted">
          Questions about a piece, an order, or a project? The studio is small and the people who
          answer are the people who make.
        </p>
      </header>

      <div className="mt-10 grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
        <div>
          <div className="space-y-5 border-y border-line py-6">
            <div className="flex items-start gap-3">
              <Mail className="mt-0.5 size-4 text-accent-strong" aria-hidden="true" />
              <div>
                <p className="text-sm font-medium">Write to us</p>
                <a
                  href="mailto:hello@oasis.example"
                  className="mt-0.5 block text-sm text-muted hover:text-ink"
                >
                  hello@oasis.example
                </a>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="mt-0.5 size-4 text-accent-strong" aria-hidden="true" />
              <div>
                <p className="text-sm font-medium">The studio</p>
                <p className="mt-0.5 text-sm text-muted">Copenhagen, Denmark · By appointment</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Clock className="mt-0.5 size-4 text-accent-strong" aria-hidden="true" />
              <div>
                <p className="text-sm font-medium">Studio hours</p>
                <p className="mt-0.5 text-sm text-muted">Monday–Friday, 9–17 CET</p>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <p className="eyebrow">Common questions</p>
            <div className="mt-4 border-t border-line">
              {faqs.map((faq) => (
                <details key={faq.question} className="group border-b border-line py-4">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-medium">
                    {faq.question}
                    <Plus
                      className="size-4 shrink-0 text-muted transition-transform duration-200 group-open:rotate-45"
                      aria-hidden="true"
                    />
                  </summary>
                  <p className="mt-2.5 text-sm leading-6 text-muted">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </div>

        <ContactForm />
      </div>
    </div>
  );
}
