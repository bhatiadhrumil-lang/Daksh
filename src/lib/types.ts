export type Category = {
  slug: string;
  name: string;
  tagline: string;
  image: string;
};

export type ColorOption = {
  name: string;
  hex: string;
};

export type ProductSpec = {
  label: string;
  value: string;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  category: string;
  price: number;
  compareAtPrice?: number;
  description: string;
  story: string;
  image: string;
  colors: ColorOption[];
  materials: string[];
  specs: ProductSpec[];
  badge?: "Bestseller" | "New" | "Limited";
  featured?: boolean;
  rating: number;
  reviewCount: number;
  stock: number;
  sku: string;
};

export type ProductSnapshot = Pick<
  Product,
  "id" | "slug" | "name" | "category" | "price" | "compareAtPrice" | "image" | "stock"
>;

export type CartLine = {
  productId: string;
  quantity: number;
  variant?: string;
  product: ProductSnapshot;
};

export type CartItem = {
  key: string;
  line: CartLine;
  product: ProductSnapshot;
  lineTotal: number;
};

export type JournalPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  body: string[];
};

export type SortOption = "featured" | "price-asc" | "price-desc" | "newest" | "name";

export type ShippingMethod = "standard" | "express";

export type ShippingAddress = {
  fullName: string;
  phone: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: "IN";
};

export type OrderStatus =
  | "pending_payment"
  | "paid"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled"
  | "refunded";

export type PaymentAttemptStatus = "created" | "paid" | "failed";
