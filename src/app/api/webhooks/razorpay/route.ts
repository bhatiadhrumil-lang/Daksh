import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { orderItems, orders, paymentAttempts, products, webhookEvents } from "@/db/schema";
import { eq, sql } from "drizzle-orm";
import { verifyWebhookSignature } from "@/lib/payments/razorpay";
import { fetchRazorpayPayment } from "@/lib/payments/razorpay";

export async function POST(request: NextRequest) {
  const signature = request.headers.get("x-razorpay-signature");

  if (!signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  const rawBody = await request.text();

  let valid = false;
  try {
    valid = verifyWebhookSignature(rawBody, signature);
  } catch {
    valid = false;
  }

  if (!valid) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  let payload: {
    event?: string;
    payload?: {
      payment?: { entity?: { id?: string; order_id?: string; amount?: number; status?: string } };
    };
  };

  try {
    payload = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const event = payload.event ?? "unknown";
  const payment = payload.payload?.payment?.entity;
  const paymentId = payment?.id;
  const razorpayOrderId = payment?.order_id;
  const eventId = `${event}:${paymentId ?? razorpayOrderId ?? "none"}`;

  const existing = await db
    .select()
    .from(webhookEvents)
    .where(eq(webhookEvents.eventId, eventId))
    .limit(1);

  if (existing.length > 0) {
    return NextResponse.json({ ok: true, duplicate: true });
  }

  await db.insert(webhookEvents).values({
    eventId,
    type: event,
    payload: payload as Record<string, unknown>,
    processedAt: new Date(),
  });

  if (event === "payment.captured" && razorpayOrderId) {
    const [order] = await db
      .select()
      .from(orders)
      .where(eq(orders.razorpayOrderId, razorpayOrderId))
      .limit(1);

    if (order && order.status === "pending_payment") {
      let paymentOk = true;

      if (paymentId) {
        try {
          const remotePayment = await fetchRazorpayPayment(paymentId);
          if (
            remotePayment.order_id !== razorpayOrderId ||
            remotePayment.amount !== order.totalPaise ||
            remotePayment.status !== "captured"
          ) {
            paymentOk = false;
          }
        } catch {
          paymentOk = false;
        }
      }

      if (paymentOk) {
        await db.transaction(async (tx) => {
          const updated = await tx
            .update(orders)
            .set({
              status: "paid",
              razorpayPaymentId: paymentId ?? order.razorpayPaymentId,
              paidAt: new Date(),
              updatedAt: new Date(),
            })
            .where(sql`${orders.id} = ${order.id} and ${orders.status} = 'pending_payment'`)
            .returning({ id: orders.id });

          if (updated.length === 0) return;

          await tx
            .update(paymentAttempts)
            .set({
              razorpayPaymentId: paymentId ?? undefined,
              status: "paid",
              updatedAt: new Date(),
            })
            .where(eq(paymentAttempts.razorpayOrderId, razorpayOrderId));

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
        });
      }
    }
  }

  if (event === "payment.failed" && razorpayOrderId) {
    const [attempt] = await db
      .select()
      .from(paymentAttempts)
      .where(eq(paymentAttempts.razorpayOrderId, razorpayOrderId))
      .limit(1);

    if (attempt) {
      await db
        .update(paymentAttempts)
        .set({
          status: "failed",
          failureReason: payment?.status ?? "failed",
          updatedAt: new Date(),
        })
        .where(eq(paymentAttempts.razorpayOrderId, razorpayOrderId));
    }
  }

  return NextResponse.json({ ok: true });
}
