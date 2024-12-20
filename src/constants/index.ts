export type PaymentType = "atCost" | "belowCost";
export type OrderStatus = "order" | "shipped" | "received" | "paid";

export const retailers = ["Amazon", "Best Buy", "Walmart"];

export const creditCards = [
  { name: "Amazon Prime Visa", cashbackRate: 0.05 },
  { name: "Capital One Venture X", cashbackRate: 0.02 },
  { name: "Citi Double Cash", cashbackRate: 0.02 },
] as const;

export const orderStatuses: OrderStatus[] = [
  "order",
  "shipped",
  "received",
  "paid",
];

export interface OrderEntry {
  orderDate: string;
  retailer: string;
  orderNumber: string;
  email: string;
  product: string;
  quantity: number;
  cost: number;
  paymentType: PaymentType;
  paymentAdjustment: number;
  creditCard: string;
  cashback: number;
  rebate: number;
  trackingNumber: string;
  status: OrderStatus;
}
