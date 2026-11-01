import type { Metadata } from "next";
import { CartPage } from "@/components/cart/cart-page";

export const metadata: Metadata = {
  title: "Your bag",
  description: "Review the pieces in your Oasis bag.",
};

export default function BagPage() {
  return <CartPage />;
}
