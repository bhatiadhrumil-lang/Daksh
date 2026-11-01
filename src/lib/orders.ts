import "server-only";
import { desc, eq, inArray } from "drizzle-orm";
import { db } from "@/db";
import { orderItems, orders } from "@/db/schema";

export type OrderSummary = typeof orders.$inferSelect & {
  itemCount: number;
};

export type OrderDetail = typeof orders.$inferSelect & {
  items: (typeof orderItems.$inferSelect)[];
};

export async function getUserOrders(userId: string): Promise<OrderSummary[]> {
  const rows = await db
    .select()
    .from(orders)
    .where(eq(orders.userId, userId))
    .orderBy(desc(orders.createdAt));

  if (rows.length === 0) return [];

  const items = await db
    .select()
    .from(orderItems)
    .where(
      inArray(
        orderItems.orderId,
        rows.map((row) => row.id),
      ),
    );

  const counts = new Map<string, number>();

  for (const item of items) {
    counts.set(item.orderId, (counts.get(item.orderId) ?? 0) + item.quantity);
  }

  return rows.map((row) => ({ ...row, itemCount: counts.get(row.id) ?? 0 }));
}

export async function getUserOrder(
  userId: string,
  orderNumber: string,
): Promise<OrderDetail | null> {
  const [order] = await db
    .select()
    .from(orders)
    .where(eq(orders.number, orderNumber))
    .limit(1);

  if (!order || order.userId !== userId) return null;

  const items = await db
    .select()
    .from(orderItems)
    .where(eq(orderItems.orderId, order.id))
    .orderBy(orderItems.createdAt);

  return { ...order, items };
}
