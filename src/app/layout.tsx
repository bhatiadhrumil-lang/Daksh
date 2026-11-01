import type { Metadata } from "next";
import { Suspense } from "react";
import { Instrument_Serif, Manrope } from "next/font/google";
import { CartDrawer } from "@/components/cart/cart-drawer";
import { CartProvider } from "@/components/cart/cart-provider";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Oasis — Modern & Contemporary Furniture",
    template: "%s — Oasis",
  },
  description:
    "Considered furniture for modern living. Discover sofas, chairs, tables, storage, and lighting designed to be lived with for years.",
  applicationName: "Oasis",
  keywords: [
    "modern furniture",
    "contemporary furniture",
    "sofas",
    "lounge chairs",
    "dining tables",
    "home decor",
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${manrope.variable} ${instrumentSerif.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-canvas text-ink">
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <CartProvider>
          <Suspense fallback={<div className="h-[104px] bg-canvas" />}>
            <SiteHeader />
          </Suspense>
          <main id="main" className="flex-1">
            {children}
          </main>
          <SiteFooter />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
