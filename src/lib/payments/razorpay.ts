import { createHmac, timingSafeEqual } from "node:crypto";

const RAZORPAY_API_BASE = "https://api.razorpay.com/v1";

function getKeyId() {
  const value = process.env.RAZORPAY_KEY_ID;
  if (!value) throw new Error("RAZORPAY_KEY_ID is not configured");
  return value;
}

function getKeySecret() {
  const value = process.env.RAZORPAY_KEY_SECRET;
  if (!value) throw new Error("RAZORPAY_KEY_SECRET is not configured");
  return value;
}

function getWebhookSecret() {
  const value = process.env.RAZORPAY_WEBHOOK_SECRET;
  if (!value) throw new Error("RAZORPAY_WEBHOOK_SECRET is not configured");
  return value;
}

export function razorpayConfigured() {
  return Boolean(
    process.env.RAZORPAY_KEY_ID &&
      process.env.RAZORPAY_KEY_SECRET &&
      process.env.RAZORPAY_WEBHOOK_SECRET,
  );
}

export function razorpayKeyId() {
  return process.env.RAZORPAY_KEY_ID ?? "";
}

function authHeader() {
  return `Basic ${Buffer.from(`${getKeyId()}:${getKeySecret()}`).toString("base64")}`;
}

export async function createRazorpayOrder(input: {
  amountPaise: number;
  currency: "INR";
  receipt: string;
  notes?: Record<string, string>;
}) {
  const response = await fetch(`${RAZORPAY_API_BASE}/orders`, {
    method: "POST",
    headers: {
      Authorization: authHeader(),
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      amount: input.amountPaise,
      currency: input.currency,
      receipt: input.receipt,
      notes: input.notes,
    }),
  });

  const data = (await response.json()) as { id?: string; error?: { description?: string } };

  if (!response.ok || !data.id) {
    throw new Error(data.error?.description ?? "Unable to create Razorpay order");
  }

  return data.id;
}

export async function fetchRazorpayPayment(paymentId: string) {
  const response = await fetch(`${RAZORPAY_API_BASE}/payments/${paymentId}`, {
    headers: {
      Authorization: authHeader(),
    },
  });

  const data = (await response.json()) as {
    id?: string;
    order_id?: string;
    amount?: number;
    status?: string;
    error?: { description?: string };
  };

  if (!response.ok || !data.id) {
    throw new Error(data.error?.description ?? "Unable to fetch Razorpay payment");
  }

  return data;
}

export function verifyRazorpaySignature(input: {
  razorpayOrderId: string;
  razorpayPaymentId: string;
  razorpaySignature: string;
}) {
  const expected = createHmac("sha256", getKeySecret())
    .update(`${input.razorpayOrderId}|${input.razorpayPaymentId}`)
    .digest("hex");

  return timingSafeEqual(
    Buffer.from(expected, "hex"),
    Buffer.from(input.razorpaySignature, "hex"),
  );
}

export function verifyWebhookSignature(rawBody: string, signature: string) {
  const expected = createHmac("sha256", getWebhookSecret())
    .update(rawBody)
    .digest("hex");

  return timingSafeEqual(
    Buffer.from(expected, "hex"),
    Buffer.from(signature, "hex"),
  );
}
