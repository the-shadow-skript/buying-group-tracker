import { createSignal } from "solid-js";
import { retailers, creditCards, orderStatuses } from "../constants/index.ts";
import type { OrderEntry, DealType, OrderStatus } from "../constants/index.ts";
import {
  RetailerSelect,
  CreditCardSelect,
  StatusSelect,
} from "./SelectInputs.tsx";
import DealTypeInput from "./DealTypeInput.tsx";

interface OrderEntryFormProps {
  onAddEntry: (entry: OrderEntry) => void;
}

export default function OrderEntryForm(_props: OrderEntryFormProps) {
  const [formData, setFormData] = createSignal<OrderEntry>({
    orderDate: new Date().toISOString().split("T")[0],
    orderNumber: "",
    email: "",
    retailer: retailers[0],
    itemsPurchased: "",
    quantity: 1,
    cost: 0,
    dealType: "atCost",
    paymentAdjustment: 0,
    creditCard: creditCards[0].name,
    cashback: 0,
    rebate: 0,
    trackingNumber: "",
    status: orderStatuses[0],
  });

  const calculateCashbackAndRebate = (data: OrderEntry): OrderEntry => {
    const selectedCard = creditCards.find(
      (card) => card.name === data.creditCard
    );
    const cashbackRate = selectedCard?.cashbackRate || 0;

    let finalCost = data.cost;
    if (data.dealType === "atCost") {
      finalCost += data.paymentAdjustment;
    } else {
      finalCost += 1 - data.paymentAdjustment / 100;
    }

    return {
      ...data,
      cashback: Number((finalCost * cashbackRate).toFixed(2)),
      rebate:
        data.dealType === "belowCost"
          ? Number((data.cost * (data.paymentAdjustment / 100)).toFixed(2))
          : 0,
    };
  };

  const handleSubmit = (event: Event) => {
    event.preventDefault();
    const updatedData = calculateCashbackAndRebate(formData());
    _props.onAddEntry(updatedData);

    setFormData({
      orderDate: new Date().toISOString().split("T")[0],
      orderNumber: "",
      email: "",
      retailer: retailers[0],
      itemsPurchased: "",
      quantity: 1,
      cost: 0,
      dealType: "atCost",
      paymentAdjustment: 0,
      creditCard: creditCards[0].name,
      cashback: 0,
      rebate: 0,
      trackingNumber: "",
      status: orderStatuses[0],
    });
  };

  return (
    <form onSubmit={handleSubmit} class="space-y-4">
      <div>
        {/*Order Date */}
        <label class="block mb-1 text-sm font-medium">Order Date</label>
        <input
          type="date"
          value={formData().orderDate}
          onInput={(e) =>
            setFormData({
              ...formData(),
              orderDate: (e.target as HTMLInputElement).value,
            })
          }
          class="w-full p-2 border rounded"
        />
      </div>

      {/* Order Number */}
      <div>
        <label class="block mb-1 text-sm font-medium">Order Number</label>
        <input
          type="text"
          value={formData().orderNumber}
          onInput={(e) =>
            setFormData({
              ...formData(),
              orderNumber: (e.target as HTMLInputElement).value,
            })
          }
          class="w-full p-2 border rounded"
        />
      </div>

      {/* Email */}
      <div>
        <label class="block mb-1 text-sm font-medium">Email</label>
        <input
          type="email"
          value={formData().email}
          onInput={(e) =>
            setFormData({
              ...formData(),
              email: (e.target as HTMLInputElement).value,
            })
          }
          class="w-full p-2 border rounded"
        />
      </div>

      {/* Retailer */}
      <div>
        <RetailerSelect
          value={formData().retailer}
          onChange={(value) =>
            setFormData((prev) => ({ ...prev, retailer: value }))
          }
          label="Retailer"
        />
      </div>

      {/* Items Purchased */}
      <div>
        <label class="block mb-1 text-sm font-medium">Items Purchased</label>
        <input
          type="text"
          value={formData().itemsPurchased}
          onInput={(e) =>
            setFormData({
              ...formData(),
              itemsPurchased: (e.target as HTMLInputElement).value,
            })
          }
          class="w-full p-2 border rounded"
        />
      </div>

      {/* Quantity */}
      <div>
        <label class="block mb-1 text-sm font-medium">Quantity</label>
        <input
          type="number"
          min="1"
          value={formData().quantity}
          onInput={(e) =>
            setFormData({
              ...formData(),
              quantity: +(e.target as HTMLInputElement).value,
            })
          }
          class="w-full p-2 border rounded"
        />
      </div>

      {/* Cost */}
      <div>
        <label class="block mb-1 text-sm font-medium">Cost</label>
        <input
          type="number"
          min="0"
          value={formData().cost}
          onInput={(e) =>
            setFormData({
              ...formData(),
              cost: +(e.target as HTMLInputElement).value,
            })
          }
          class="w-full p-2 border rounded"
        />
      </div>

      {/* Deal Type */}
      <div>
        <DealTypeInput
          value={formData().dealType}
          adjustment={formData().paymentAdjustment}
          onTypeChange={(type: DealType) =>
            setFormData((prev) => ({ ...prev, dealType: type }))
          }
          onAdjustmentChange={(value: number) =>
            setFormData((prev) => ({ ...prev, paymentAdjustment: value }))
          }
        />
      </div>

      {/* Credit Card */}
      <CreditCardSelect
        value={formData().creditCard}
        onChange={(value) =>
          setFormData((prev) => ({ ...prev, credit: value }))
        }
        label="Credit Card"
      />

      {/* Tracking Number */}
      <div>
        <label class="block mb-1 text-sm font-medium">Tracking Number</label>
        <input
          type="text"
          value={formData().trackingNumber}
          onInput={(e) =>
            setFormData((prev) => ({
              ...prev,
              trackingNumber: (e.target as HTMLInputElement).value,
            }))
          }
          class="w-full p-2 border rounded"
        />
      </div>

      {/* Status */}
      <div>
        <StatusSelect
          value={formData().status}
          onChange={(value: OrderStatus) =>
            setFormData((prev) => ({ ...prev, status: value }))
          }
          label="Status"
        />
      </div>

      <button
        type="submit"
        class="w-full px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
      >
        Add Entry
      </button>
    </form>
  );
}
