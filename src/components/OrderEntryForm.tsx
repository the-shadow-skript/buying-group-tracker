import { createSignal } from "solid-js";
import DealTypeInput from "./DealTypeInput.tsx";
import {
  BuyingGroupSelect,
  RetailerSelect,
  CreditCardSelect,
  StatusSelect,
} from "./SelectInputs.tsx";
import {
  buyingGroup,
  retailer,
  creditCard,
  orderStatus,
  type OrderEntry,
  type DealType,
  type OrderStatus,
} from "../constants/index.ts";

interface OrderEntryFormProps {
  onAddEntry: (entry: OrderEntry) => void;
}

export default function OrderEntryForm(_props: OrderEntryFormProps) {
  const [formData, setFormData] = createSignal<OrderEntry>({
    buyingGroup: buyingGroup[0],
    orderDate: new Date().toISOString().split("T")[0],
    orderNumber: "",
    email: "",
    retailer: retailer[0],
    itemsPurchased: "",
    quantity: 1,
    cost: 0,
    dealType: "atCost",
    paymentAdjustment: 0,
    creditCard: creditCard[0].name,
    cashback: 0,
    rebate: 0,
    status: orderStatus[0],
  });

  const [costInput, setCostInput] = createSignal("");

  const calculateCashbackAndRebate = (data: OrderEntry): OrderEntry => {
    const selectedCard = creditCard.find(
      (card) => card.name === data.creditCard
    );
    const cashbackRate = selectedCard?.cashbackRate || 0;
    const cashback = Number((data.cost * cashbackRate).toFixed(2));
    const rebate =
      data.dealType === "belowCost"
        ? Number((data.cost * (data.paymentAdjustment / 100)).toFixed(2))
        : 0;

    return {
      ...data,
      cashback,
      rebate,
    };
  };

  const handleSubmit = (event: Event) => {
    event.preventDefault();
    const updatedData = calculateCashbackAndRebate(formData());
    _props.onAddEntry(updatedData);

    setFormData({
      buyingGroup: buyingGroup[0],
      orderDate: new Date().toISOString().split("T")[0],
      orderNumber: "",
      email: "",
      retailer: retailer[0],
      itemsPurchased: "",
      quantity: 1,
      cost: 0,
      dealType: "atCost",
      paymentAdjustment: 0,
      creditCard: creditCard[0].name,
      cashback: 0,
      rebate: 0,
      status: orderStatus[0],
    });
  };

  return (
    <form onSubmit={handleSubmit} class="space-y-4">
      {/* Buying Group */}
      <div>
        <BuyingGroupSelect
          value={formData().buyingGroup}
          onChange={(value) =>
            setFormData((prev) => ({ ...prev, buyingGroup: value }))
          }
          label="Buying Group"
        />
      </div>

      {/*Order Date */}
      <div>
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
          step="0.01"
          value={costInput()}
          onInput={(e) => {
            const input = e.currentTarget.value;
            if (input === "" || /^\d*\.?\d*$/.test(input)) {
              setCostInput(input);
              if (input) {
                setFormData({
                  ...formData(),
                  cost: parseFloat(input) || 0,
                });
              } else {
                setFormData({
                  ...formData(),
                  cost: 0,
                });
              }
            }
          }}
          onBlur={(e) => {
            const value = parseFloat(e.currentTarget.value || "0");
            const formatted = isNaN(value) ? "0.00" : value.toFixed(2);
            setCostInput(formatted);
            setFormData({
              ...formData(),
              cost: parseFloat(formatted),
            });
          }}
          class="w-full p-2 border rounded"
          placeholder="0.00"
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
          setFormData((prev) => ({ ...prev, creditCard: value }))
        }
        label="Credit Card"
      />

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
