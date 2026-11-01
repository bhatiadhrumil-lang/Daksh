"use server";

import { db } from "@/db";
import { orderItems, orders, paymentAttempts, products } from "@/db/schema";
import { requireUser } from "@/lib/auth";
import { verifyPaymentSchema } from "@/lib/validators";
import {
  fetchRazorpayPayment,
  verifyRazorpaySignature,
} from "@/lib/payments/razorpay";
import { eq, sql } from "drizzle-orm";

export async function verifyCheckoutPayment(raw: unknown) {
  const user = await requireUser("/checkout");
  const parsed = verifyPaymentSchema.safeParse(raw);

  if (!parsed.success) {
    return { ok: false as const, error: "Invalid payment details." };
  }

  const input = parsed.data;

  const [order] = await db
    .select()
    .from(orders)
    .where(eq(orders.id, input.orderId))
    .limit(1);

  if (!order || order.userId !== user.id) {
    return { ok: false as const, error: "Order not found." };
  }

  if (order.razorpayOrderId !== input.razorpayOrderId) {
    return { ok: false as const, error: "Order mismatch." };
  }

  if (order.status === "paid") {
    return { ok: true as const, orderNumber: order.number };
  }

  if (order.status !== "pending_payment") {
    return { ok: false as const, error: "This order cannot be paid." };
  }

  let signatureValid = false;
  try {
    signatureValid = verifyRazorpaySignature({
      razorpayOrderId: input.razorpayOrderId,
      razorpayPaymentId: input.razorpayPaymentId,
      razorpaySignature: input.razorpaySignature,
    });
  } catch {
    signatureValid = false;
  }

  if (!signatureValid) {
    return { ok: false as const, error: "Payment signature verification failed." };
  }

  const payment = await fetchRazorpayPayment(input.razorpayPaymentId);

  if (
    payment.order_id !== input.razorpayOrderId ||
    payment.amount !== order.totalPaise ||
    payment.status !== "captured"
  ) {
    return { ok: false as const, error: "Payment could not be confirmed." };
  }

  const updated = await db.transaction(async (tx) => {
    const result = await tx
      .update(orders)
      .set({
        status: "paid",
        razorpayPaymentId: input.razorpayPaymentId,
        paidAt: new Date(),
        updatedAt: new Date(),
      })
      .where(sql`${orders.id} = ${order.id} and ${orders.status} = 'pending_payment'`)
      .returning({ id: orders.id });

    if (result.length === 0) {
      return false;
    }

    await tx
      .update(paymentAttempts)
      .set({
        razorpayPaymentId: input.razorpayPaymentId,
        status: "paid",
        updatedAt: new Date(),
      })
      .where(eq(paymentAttempts.razorpayOrderId, input.razorpayOrderId));

    const items = await tx
      .select()
      .from(orderItems)
      .where(eq(orderItems.orderId, order.id));

    for (const item of items) {
      await tx
        .update(products)
        .set({
          stock: sql`greatest(${products.stock} - ${item.quantity}, 0)`,
          updatedAt: new Date(),
        })
        .where(eq(products.id, item.productId));
    }

    return true;
  });

  if (!updated) {
    const [fresh] = await db.select().from(orders).where(eq(orders.id, order.id)).limit(1);
    if (fresh?.status === "paid") {
      return { ok: true as const, orderNumber: fresh.number };
    }
    return { ok: false as const, error: "Unable to update the order." };
  }

  return { ok: true as const, orderNumber: order.number };
}
