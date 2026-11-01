import type { Metadata } from "next";
import { Suspense } from "react";
import { RegisterForm } from "@/components/auth/register-form";

export const metadata: Metadata = {
  title: "Create account",
  description: "Create an Oasis account to check out and track orders.",
};

export default function RegisterPage() {
  return (
    <div className="container-page flex flex-col items-center py-16 sm:py-24">
      <div className="w-full max-w-md">
        <header className="text-center">
          <p className="eyebrow">Your account</p>
          <h1 className="mt-3 font-serif text-4xl italic leading-tight sm:text-5xl">
            Create an account.
          </h1>
          <p className="mt-3 text-sm leading-6 text-muted">
            An Oasis account keeps your orders, deliveries, and details in one place.
          </p>
        </header>
        <div className="mt-9 rounded-[1.5rem] border border-line bg-white p-6 sm:p-8">
          <Suspense fallback={<div className="h-80 animate-pulse rounded-xl bg-sand" />}>
            <RegisterForm />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
