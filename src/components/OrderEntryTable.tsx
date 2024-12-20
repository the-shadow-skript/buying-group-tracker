import { createSignal, createEffect } from "solid-js";
import { retailers, orderStatuses } from "../constants/index.ts";
import DealTypeInput from "./DealTypeInput.tsx";
import {
  RetailerSelect,
  CreditCardSelect,
  StatusSelect,
} from "./SelectInputs.tsx";
import {
  creditCards,
  type OrderEntry,
  type DealType,
  type OrderStatus,
} from "../constants/index.ts";

export default function OrderEntryTable() {
  const [entry, setEntry] = createSignal<OrderEntry>({
    orderDate: new Date().toISOString().split("T")[0],
    retailer: retailers[0],
    orderNumber: "",
    email: "",
    itemsPurchased: "",
    quantity: 1,
    cost: 0,
    paymentType: "atCost" as DealType,
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
    <div class="overflow-x-auto">
      <table class="w-full border border-collapse border-gray-200 table-auto">
        <thead>
          <tr class="bg-gray-100">
            <th class="px-4 py-2 border border-gray-300">Order Date</th>
            <th class="px-4 py-2 border border-gray-300">Retailer</th>
            <th class="px-4 py-2 border border-gray-300">Order Number</th>
            <th class="px-4 py-2 border border-gray-300">Email</th>
            <th class="px-4 py-2 border border-gray-300">Items Purchased</th>
            <th class="px-4 py-2 border border-gray-300">Quantity</th>
            <th class="px-4 py-2 border border-gray-300">Cost</th>
            <th class="px-4 py-2 border border-gray-300">Deal Type</th>
            <th class="px-4 py-2 border border-gray-300">Credit Card Used</th>
            <th class="px-4 py-2 border border-gray-300">Cashback</th>
            <th class="px-4 py-2 border border-gray-300">Rebate</th>
            <th class="px-4 py-2 border border-gray-300">Tracking Number</th>
            <th class="px-4 py-2 border border-gray-300">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            {/* Order Date */}
            <td class="px-4 py-2 border">
              <input
                type="date"
                value={entry().orderDate}
                onChange={(e) =>
                  setEntry((prev) => ({
                    ...prev,
                    orderDate: e.currentTarget.value,
                  }))
                }
                class="w-full p-2"
              />
            </td>

            {/* Order Name */}
            <td class="px-4 py-2 border">
              <input
                type="text"
                value={entry().orderNumber}
                onChange={(e) =>
                  setEntry((prev) => ({
                    ...prev,
                    orderNumber: e.currentTarget.value,
                  }))
                }
                class="w-full p-2"
              />
            </td>

            {/* Email */}
            <td class="px-4 py-2 border">
              <input
                type="email"
                value={entry().email}
                onChange={(e) =>
                  setEntry((prev) => ({
                    ...prev,
                    email: e.currentTarget.value,
                  }))
                }
                class="w-full p-2"
              />
            </td>

            {/* Retailer */}
            <td class="px-4 py-2 border">
              <RetailerSelect
                value={entry().retailer}
                onChange={(value) =>
                  setEntry((prev) => ({ ...prev, retailer: value }))
                }
                label=""
              />
            </td>

            {/* Items Purchased */}
            <td class="px-4 py-2 border">
              <input
                type="text"
                value={entry().itemsPurchased}
                onChange={(e) =>
                  setEntry((prev) => ({
                    ...prev,
                    itemsPurchased: e.currentTarget.value,
                  }))
                }
                class="w-full p-2"
              />
            </td>

            {/* Quantity */}
            <td class="px-4 py-2 border">
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
                class="w-full p-2"
              />
            </td>

            {/* Cost */}
            <td class="px-4 py-2 border">
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
                class="w-full p-2"
              />
            </td>

            {/* Deal Type */}
            <td class="px-4 py-2 border">
              <DealTypeInput
                value={entry().paymentType}
                adjustment={entry().paymentAdjustment}
                onTypeChange={(type: DealType) =>
                  setEntry((prev) => ({ ...prev, paymentType: type }))
                }
                onAdjustmentChange={(value: number) =>
                  setEntry((prev) => ({ ...prev, paymentAdjustment: value }))
                }
              />
            </td>

            {/* Credit Card Selection */}
            <td class="px-4 py-2 border">
              <CreditCardSelect
                value={entry().creditCard}
                onChange={(value) =>
                  setEntry((prev) => ({ ...prev, creditCard: value }))
                }
                label="Credit Card"
              />
            </td>

            {/* Cashback Amount */}
            <td class="px-4 py-2 border">
              <input
                type="number"
                value={entry().cashback}
                readonly
                class="w-full rounded border p-2 bg-gray-100"
              />
            </td>

            {/* Rebate Amount */}
            <td class="px-4 py-2 border">
              <input
                type="number"
                value={entry().rebate}
                readonly
                class="w-full rounded border p-2 bg-gray-100"
              />
            </td>

            {/* Tracking Number */}
            <td class="px-4 py-2 border">
              <input
                type="text"
                value={entry().trackingNumber}
                onChange={(e) =>
                  setEntry((prev) => ({
                    ...prev,
                    trackingNumber: e.currentTarget.value,
                  }))
                }
                class="w-full p-2"
              />
            </td>

            {/* Status */}
            <td class="px-4 py-2 border">
              <StatusSelect
                value={entry().status}
                onChange={(value: OrderStatus) =>
                  setEntry((prev) => ({ ...prev, status: value }))
                }
                label="Status"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
