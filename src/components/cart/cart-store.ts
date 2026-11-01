import type { CartLine, ProductSnapshot } from "@/lib/types";
import { clamp, lineKey } from "@/lib/utils";

const STORAGE_KEY = "oasis-cart-v2";
const EMPTY_CART: CartLine[] = [];

let lines: CartLine[] = [];
let initialized = false;
const listeners = new Set<() => void>();

function isProductSnapshot(value: unknown): value is ProductSnapshot {
  if (!value || typeof value !== "object") return false;
  const product = value as Partial<ProductSnapshot>;
  return (
    typeof product.id === "string" &&
    typeof product.slug === "string" &&
    typeof product.name === "string" &&
    typeof product.category === "string" &&
    typeof product.price === "number" &&
    Number.isFinite(product.price) &&
    typeof product.image === "string" &&
    typeof product.stock === "number" &&
    Number.isFinite(product.stock)
  );
}

function isCartLine(value: unknown): value is CartLine {
  if (!value || typeof value !== "object") return false;
  const line = value as Partial<CartLine>;
  return (
    typeof line.productId === "string" &&
    typeof line.quantity === "number" &&
    Number.isFinite(line.quantity) &&
    line.quantity > 0 &&
    (line.variant === undefined || typeof line.variant === "string") &&
    isProductSnapshot(line.product) &&
    line.product.id === line.productId
  );
}

function readStorage(): CartLine[] {
  if (typeof window === "undefined") return EMPTY_CART;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return EMPTY_CART;
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return EMPTY_CART;
    return parsed.filter(isCartLine);
  } catch {
    return EMPTY_CART;
  }
}

function ensureInitialized() {
  if (initialized) return;
  initialized = true;
  lines = readStorage();
}

function persist() {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
  } catch {
    // Storage can be unavailable in private modes; the cart still works for the session.
  }
}

function emit() {
  for (const listener of listeners) listener();
}

function mutate(updater: (current: CartLine[]) => CartLine[]) {
  ensureInitialized();
  lines = updater(lines);
  persist();
  emit();
}

export function subscribeCart(listener: () => void) {
  ensureInitialized();
  listeners.add(listener);

  function handleStorage(event: StorageEvent) {
    if (event.key !== STORAGE_KEY) return;
    lines = readStorage();
    emit();
  }

  window.addEventListener("storage", handleStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", handleStorage);
  };
}

export function getCartSnapshot() {
  ensureInitialized();
  return lines;
}

export function getCartServerSnapshot() {
  return EMPTY_CART;
}

export function addCartItem(product: ProductSnapshot, quantity = 1, variant?: string) {
  const safeQuantity = clamp(Math.floor(quantity), 1, Math.max(1, product.stock));
  const key = lineKey(product.id, variant);

  mutate((current) => {
    const existing = current.find((line) => lineKey(line.productId, line.variant) === key);

    if (existing) {
      return current.map((line) =>
        lineKey(line.productId, line.variant) === key
          ? {
              ...line,
              product,
              quantity: clamp(line.quantity + safeQuantity, 1, Math.max(1, product.stock)),
            }
          : line,
      );
    }

    return [...current, { productId: product.id, quantity: safeQuantity, variant, product }];
  });
}

export function updateCartQuantity(key: string, quantity: number) {
  mutate((current) =>
    current.map((line) => {
      if (lineKey(line.productId, line.variant) !== key) return line;
      return {
        ...line,
        quantity: clamp(Math.floor(quantity), 1, Math.max(1, line.product.stock)),
      };
    }),
  );
}

export function removeCartLine(key: string) {
  mutate((current) =>
    current.filter((line) => lineKey(line.productId, line.variant) !== key),
  );
}

export function clearCartLines() {
  mutate(() => []);
}
