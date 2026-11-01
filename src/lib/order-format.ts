import type { OrderStatus } from "@/lib/types";

const labels: Record<OrderStatus, string> = {
  pending_payment: "Payment pending",
  paid: "Paid",
  processing: "Processing",
  shipped: "Shipped",
  delivered: "Delivered",
  cancelled: "Cancelled",
  refunded: "Refunded",
};

export function orderStatusLabel(status: OrderStatus) {
  return labels[status] ?? "Unknown";
}

const dateFormatter = new Intl.DateTimeFormat("en-IN", {
  dateStyle: "long",
});

export function formatOrderDate(value: Date | string) {
  return dateFormatter.format(new Date(value));
}
