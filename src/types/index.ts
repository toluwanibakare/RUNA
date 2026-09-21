export type Category = {
  id: string;
  name: string;
  slug: string;
  icon: string;
};

export type Store = {
  id: string;
  name: string;
  slug: string;
  category: string;
  rating: number;
  ratingCount: number;
  deliveryTime: string;
  deliveryFee: number;
  isOpen: boolean;
  image: string;
  cover: string;
  logo: string;
};

export type Product = {
  id: string;
  storeId: string;
  storeName: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  rating: number;
  eta: string;
  image: string;
  category: string;
  isPopular?: boolean;
};

export type CartItem = {
  product: Product;
  quantity: number;
  options?: string;
};

export type OrderStatus =
  | "placed"
  | "payment_confirmed"
  | "merchant_accepted"
  | "preparing"
  | "ready_for_pickup"
  | "runner_assigned"
  | "picked_up"
  | "on_the_way"
  | "delivered"
  | "completed"
  | "rejected"
  | "cancelled";

export type Order = {
  id: string;
  storeName: string;
  storeId: string;
  items: CartItem[];
  total: number;
  status: OrderStatus;
  createdAt: string;
  deliveryAddress: string;
  pin?: string;
};

export type WalletTransaction = {
  id: string;
  title: string;
  subtitle: string;
  amount: number;
  type: "debit" | "credit";
  date: string;
};

export type Runner = {
  id: string;
  name: string;
  rating: number;
  deliveries: number;
  earnings: number;
  isOnline: boolean;
};

export type Notification = {
  id: string;
  title: string;
  body: string;
  time: string;
  isRead: boolean;
  type: "order" | "wallet" | "verification" | "system";
};
