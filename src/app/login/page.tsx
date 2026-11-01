import type { Metadata } from "next";
import { Suspense } from "react";
import { LoginForm } from "@/components/auth/login-form";

export const metadata: Metadata = {
  title: "Sign in",
  description: "Sign in to your Oasis account.",
};

export default function LoginPage() {
  return (
    <div className="container-page flex flex-col items-center py-16 sm:py-24">
      <div className="w-full max-w-md">
        <header className="text-center">
          <p className="eyebrow">Your account</p>
          <h1 className="mt-3 font-serif text-4xl italic leading-tight sm:text-5xl">
            Welcome back.
          </h1>
          <p className="mt-3 text-sm leading-6 text-muted">
            Sign in to check out, track orders, and revisit saved pieces.
          </p>
        </header>
        <div className="mt-9 rounded-[1.5rem] border border-line bg-white p-6 sm:p-8">
          <Suspense fallback={<div className="h-64 animate-pulse rounded-xl bg-sand" />}>
            <LoginForm />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
