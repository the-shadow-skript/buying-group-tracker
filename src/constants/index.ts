export const buyingGroup = ["Buying Group", "BuyForMeRetail"] as const;
export type BuyingGroup = (typeof buyingGroup)[number];

export const retailer = ["Amazon", "Best Buy", "Walmart"] as const;
export type Retailer = (typeof retailer)[number];

export const dealType = ["atCost", "belowCost"] as const;
export type DealType = (typeof dealType)[number];

export const orderStatus = ["Order", "Shipped", "Received", "Paid"];
export type OrderStatus = (typeof orderStatus)[number];

export const creditCardName = [
  "Amazon Prime Visa",
  "Capital One Venture X",
  "Citi Double Cash",
  "Amazon Business Prime",
] as const;
export type CreditCardName = (typeof creditCardName)[number];
interface CreditCard {
  readonly name: CreditCardName;
  readonly cashbackRate: number;
  readonly threshold?: {
    amount: number;
    reducedRate: number;
  };
}
export const creditCard: readonly CreditCard[] = [
  { name: "Amazon Prime Visa", cashbackRate: 0.05 },
  { name: "Capital One Venture X", cashbackRate: 0.02 },
  { name: "Citi Double Cash", cashbackRate: 0.02 },
  {
    name: "Amazon Business Prime",
    cashbackRate: 0.05,
    threshold: { amount: 120000, reducedRate: 0.01 },
  },
] as const;

export interface OrderEntry {
  buyingGroup: BuyingGroup;
  orderDate: string;
  orderNumber: string;
  email: string;
  retailer: Retailer;
  itemsPurchased: string;
  quantity: number;
  cost: number;
  dealType: DealType;
  paymentAdjustment: number;
  creditCard: CreditCardName;
  cardSpentTotal?: number;
  cashback: number;
  rebate: number;
  status: OrderStatus;
}
