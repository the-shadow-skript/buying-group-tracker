export type DealType = "atCost" | "belowCost";
export type OrderStatus = "Order" | "Shipped" | "Received" | "Paid";

export const retailers = ["Amazon", "Best Buy", "Walmart"];

export const creditCards = [
  { name: "Amazon Prime Visa", cashbackRate: 0.05 },
  { name: "Capital One Venture X", cashbackRate: 0.02 },
  { name: "Citi Double Cash", cashbackRate: 0.02 },
] as const;

export const orderStatuses: OrderStatus[] = [
  "Order",
  "Shipped",
  "Received",
  "Paid",
];

export interface OrderEntry {
  orderDate: string;
  orderNumber: string;
  email: string;
  retailer: string;
  itemsPurchased: string;
  quantity: number;
  cost: number;
  dealType: DealType;
  paymentAdjustment: number;
  creditCard: string;
  cashback: number;
  rebate: number;
  trackingNumber: string;
  status: OrderStatus;
}
