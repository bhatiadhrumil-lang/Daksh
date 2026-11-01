import type { Metadata } from "next";
import { Suspense } from "react";
import { redirect } from "next/navigation";
import { CheckoutPage } from "@/components/checkout/checkout-page";
import { getSessionUser } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Complete your Oasis order.",
};

export default function CheckoutRoute() {
  return (
    <Suspense fallback={<CheckoutSkeleton />}>
      <CheckoutContent />
    </Suspense>
  );
}

async function CheckoutContent() {
  const user = await getSessionUser();

  if (!user) {
    redirect("/login?next=/checkout");
  }

  return <CheckoutPage user={user} />;
}

function CheckoutSkeleton() {
  return (
    <div className="container-page py-16" aria-hidden="true">
      <div className="h-10 w-48 animate-pulse rounded-xl bg-line" />
      <div className="mt-10 grid gap-10 lg:grid-cols-[1.35fr_0.8fr]">
        <div className="h-[520px] animate-pulse rounded-2xl bg-sand" />
        <div className="h-80 animate-pulse rounded-2xl bg-sand" />
      </div>
    </div>
  );
}
