import { createSignal, createEffect } from "solid-js";
import { retailers, orderStatuses } from "../constants/index.ts";
import PaymentTypeInput from "./PaymentTypeInput.tsx";
import {
  RetailerSelect,
  CreditCardSelect,
  StatusSelect,
} from "./SelectInputs.tsx";
import {
  creditCards,
  type OrderEntry,
  type PaymentType,
  type OrderStatus,
} from "../constants/index.ts";

export default function OrderEntryTable() {
  const [entry, setEntry] = createSignal<OrderEntry>({
    orderDate: new Date().toISOString().split("T")[0],
    retailer: retailers[0],
    orderNumber: "",
    email: "",
    product: "",
    quantity: 1,
    cost: 0,
    paymentType: "atCost" as PaymentType,
    paymentAdjustment: 0,
    creditCard: creditCards[0].name,
    cashback: 0,
    rebate: 0,
    trackingNumber: "",
    status: orderStatuses[0],
  });

  createEffect(() => {
    const selectedCard = creditCards.find(
      (card) => card.name === entry().creditCard
    );
    const cashbackRate = selectedCard?.cashbackRate || 0;

    let finalCost = entry().cost;
    if (entry().paymentType === "atCost") {
      finalCost += entry().paymentAdjustment;
    } else {
      finalCost *= 1 - entry().paymentAdjustment / 100;
    }

    setEntry((prev) => ({
      ...prev,
      cashback: Number((finalCost * cashbackRate).toFixed(2)),
      rebate:
        entry().paymentType === "belowCost"
          ? Number(
              (entry().cost * (entry().paymentAdjustment / 100)).toFixed(2)
            )
          : 0,
    }));
  });

  return (
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label class="block text-sm font-medium mb-2">Order Date</label>
        <input
          type="date"
          value={entry().orderDate}
          onChange={(e) =>
            setEntry((prev) => ({ ...prev, orderDate: e.currentTarget.value }))
          }
          class="w-full rounded border p-2"
        />
      </div>

      <RetailerSelect
        value={entry().retailer}
        onChange={(value) => setEntry((prev) => ({ ...prev, retailer: value }))}
        label="Retailer"
      />

      <div>
        <label class="block text-sm font-medium mb-2">Order Number</label>
        <input
          type="text"
          value={entry().orderNumber}
          onChange={(e) =>
            setEntry((prev) => ({
              ...prev,
              orderNumber: e.currentTarget.value,
            }))
          }
          class="w-full rounded border p-2"
        />
      </div>

      <div>
        <label class="block text-sm font-medium mb-2">Email</label>
        <input
          type="email"
          value={entry().email}
          onChange={(e) =>
            setEntry((prev) => ({ ...prev, email: e.currentTarget.value }))
          }
          class="w-full rounded border p-2"
        />
      </div>

      <div>
        <label class="block text-sm font-medium mb-2">Product</label>
        <input
          type="text"
          value={entry().product}
          onChange={(e) =>
            setEntry((prev) => ({ ...prev, product: e.currentTarget.value }))
          }
          class="w-full rounded border p-2"
        />
      </div>

      <div>
        <label class="block text-sm font-medium mb-2">Quantity</label>
        <input
          type="number"
          min="1"
          step="1"
          value={entry().quantity}
          onChange={(e) =>
            setEntry((prev) => ({
              ...prev,
              quantity: parseInt(e.currentTarget.value),
            }))
          }
          class="w-full rounded border p-2"
        />
      </div>

      <div>
        <label class="block text-sm font-medium mb-2">Cost (USD)</label>
        <input
          type="number"
          min="0"
          step="0.01"
          value={entry().cost}
          onChange={(e) =>
            setEntry((prev) => ({
              ...prev,
              cost: parseFloat(e.currentTarget.value),
            }))
          }
          class="w-full rounded border p-2"
        />
      </div>

      <PaymentTypeInput
        value={entry().paymentType}
        adjustment={entry().paymentAdjustment}
        onTypeChange={(type: PaymentType) =>
          setEntry((prev) => ({ ...prev, paymentType: type }))
        }
        onAdjustmentChange={(value: number) =>
          setEntry((prev) => ({ ...prev, paymentAdjustment: value }))
        }
      />

      <CreditCardSelect
        value={entry().creditCard}
        onChange={(value) =>
          setEntry((prev) => ({ ...prev, creditCard: value }))
        }
        label="Credit Card"
      />

      <div>
        <label class="block text-sm font-medium mb-2">Cashback (USD)</label>
        <input
          type="number"
          value={entry().cashback}
          readonly
          class="w-full rounded border p-2 bg-gray-100"
        />
      </div>

      <div>
        <label class="block text-sm font-medium mb-2">Rebate (USD)</label>
        <input
          type="number"
          value={entry().rebate}
          readonly
          class="w-full rounded border p-2 bg-gray-100"
        />
      </div>

      <div>
        <label class="block text-sm font-medium mb-2">Tracking Number</label>
        <input
          type="text"
          value={entry().trackingNumber}
          onChange={(e) =>
            setEntry((prev) => ({
              ...prev,
              trackingNumber: e.currentTarget.value,
            }))
          }
          class="w-full rounded border p-2"
        />
      </div>

      <StatusSelect
        value={entry().status}
        onChange={(value: OrderStatus) =>
          setEntry((prev) => ({ ...prev, status: value }))
        }
        label="Status"
      />
    </div>
  );
}
