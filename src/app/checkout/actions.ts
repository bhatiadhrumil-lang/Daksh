"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/db";
import { orderItems, orders, paymentAttempts } from "@/db/schema";
import { getOrderableProducts } from "@/lib/catalog";
import { requireUser } from "@/lib/auth";
import { createOrderSchema } from "@/lib/validators";
import {
  createRazorpayOrder,
  razorpayConfigured,
  razorpayKeyId,
} from "@/lib/payments/razorpay";
import { eq } from "drizzle-orm";
import { FREE_SHIPPING_THRESHOLD, STANDARD_SHIPPING, EXPRESS_SHIPPING } from "@/lib/data";

function orderNumber() {
  const year = new Date().getFullYear();
  const suffix = Math.floor(100000 + Math.random() * 900000);
  return `OS-${year}-${suffix}`;
}

export async function createCheckoutOrder(raw: unknown) {
  const user = await requireUser("/checkout");
  const parsed = createOrderSchema.safeParse(raw);

  if (!parsed.success) {
    return { ok: false as const, error: "Please review your delivery details." };
  }

  if (!razorpayConfigured()) {
    return {
      ok: false as const,
      error: "Secure payment is not configured yet. Add Razorpay credentials to enable checkout.",
    };
  }

  const input = parsed.data;
  const uniqueIds = [...new Set(input.items.map((item) => item.productId))];
  const products = await getOrderableProducts(uniqueIds);
  const productMap = new Map(products.map((product) => [product.id, product]));

  let subtotal = 0;

  for (const item of input.items) {
    const product = productMap.get(item.productId);
    if (!product) {
      return { ok: false as const, error: "One of the items in your bag is no longer available." };
    }
    if (product.stock < item.quantity) {
      return { ok: false as const, error: `${product.name} does not have enough stock.` };
    }
    subtotal += product.price * item.quantity;
  }

  const shipping =
    input.shippingMethod === "express"
      ? EXPRESS_SHIPPING
      : subtotal >= FREE_SHIPPING_THRESHOLD
        ? 0
        : STANDARD_SHIPPING;
  const total = subtotal + shipping;

  const number = orderNumber();
  const address = {
    fullName: input.address.fullName,
    phone: input.address.phone,
    line1: input.address.line1,
    line2: input.address.line2 || undefined,
    city: input.address.city,
    state: input.address.state,
    postalCode: input.address.postalCode,
    country: "IN" as const,
  };

  const result = await db.transaction(async (tx) => {
    const [order] = await tx
      .insert(orders)
      .values({
        number,
        userId: user.id,
        email: user.email,
        status: "pending_payment",
        subtotalPaise: subtotal,
        shippingPaise: shipping,
        totalPaise: total,
        currency: "INR",
        shippingMethod: input.shippingMethod,
        address,
      })
      .returning();

    await tx.insert(orderItems).values(
      input.items.map((item) => {
        const product = productMap.get(item.productId)!;
        return {
          orderId: order.id,
          productId: product.id,
          productSlug: product.slug,
          productName: product.name,
          variant: item.variant,
          image: product.image,
          unitPricePaise: product.price,
          quantity: item.quantity,
          lineTotalPaise: product.price * item.quantity,
        };
      }),
    );

    const razorpayOrderId = await createRazorpayOrder({
      amountPaise: total,
      currency: "INR",
      receipt: number.slice(0, 40),
      notes: {
        orderId: order.id,
        userId: user.id,
      },
    });

    await tx
      .update(orders)
      .set({ razorpayOrderId, updatedAt: new Date() })
      .where(eq(orders.id, order.id));

    await tx.insert(paymentAttempts).values({
      orderId: order.id,
      razorpayOrderId,
      amountPaise: total,
      currency: "INR",
      status: "created",
    });

    return { orderId: order.id, orderNumber: number, razorpayOrderId, total };
  });

  revalidatePath("/account");

  return {
    ok: true as const,
    orderId: result.orderId,
    orderNumber: result.orderNumber,
    razorpayOrderId: result.razorpayOrderId,
    amountPaise: result.total,
    currency: "INR" as const,
    keyId: razorpayKeyId(),
  };
}
