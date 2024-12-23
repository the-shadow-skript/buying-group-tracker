import { For } from "solid-js";
import { type OrderEntry } from "../constants/index.ts";

interface OrderEntryTableProps {
  entries: OrderEntry[];
}

export default function OrderEntryTable(_props: OrderEntryTableProps) {
  const calculateFinalAmount = (entry: OrderEntry): string => {
    if (entry.dealType === "atCost") {
      const finalAmount = entry.cost + entry.paymentAdjustment;
      return `At Cost: $${finalAmount.toFixed(2)}
        (+$${entry.paymentAdjustment.toFixed(2)})`;
    } else {
      const discount = (entry.cost * entry.paymentAdjustment) / 100;
      const finalAmount = entry.cost - discount;
      return `Below Cost: $${finalAmount.toFixed(2)}
        (-${entry.paymentAdjustment.toFixed(2)}%)`;
    }
  };

  return (
    <div class="overflow-x-auto">
      <table class="w-full border border-collapse border-gray-200 table-auto">
        <thead>
          <tr class="bg-gray-100">
            <th class="px-4 py-2 border border-gray-300">Buying Group</th>
            <th class="px-4 py-2 border border-gray-300">Order Date</th>
            <th class="px-4 py-2 border border-gray-300">Order Number</th>
            <th class="px-4 py-2 border border-gray-300">Email</th>
            <th class="px-4 py-2 border border-gray-300">Retailer</th>
            <th class="px-4 py-2 border border-gray-300">Items Purchased</th>
            <th class="px-4 py-2 border border-gray-300">Quantity</th>
            <th class="px-4 py-2 border border-gray-300">Cost</th>
            <th class="px-4 py-2 border border-gray-300">Deal Type</th>
            <th class="px-4 py-2 border border-gray-300">Credit Card Used</th>
            <th class="px-4 py-2 border border-gray-300">Cashback</th>
            <th class="px-4 py-2 border border-gray-300">Rebate</th>
            <th class="px-4 py-2 border border-gray-300">Status</th>
          </tr>
        </thead>
        <tbody>
          <For each={_props.entries}>
            {(entry) => (
              <tr>
                <td class="px-4 py-2 border">{entry.buyingGroup}</td>
                <td class="px-4 py-2 border">{entry.orderDate}</td>
                <td class="px-4 py-2 border">{entry.orderNumber}</td>
                <td class="px-4 py-2 border">{entry.email}</td>
                <td class="px-4 py-2 border">{entry.retailer}</td>
                <td class="px-4 py-2 border">{entry.itemsPurchased}</td>
                <td class="px-4 py-2 border">{entry.quantity}</td>
                <td class="px-4 py-2 border">{entry.cost.toFixed(2)}</td>
                <td class="px-4 py-2 border">{calculateFinalAmount(entry)}</td>
                <td class="px-4 py-2 border">{entry.creditCard}</td>
                <td class="px-4 py-2 border">{entry.cashback.toFixed(2)}</td>
                <td class="px-4 py-2 border">{entry.rebate.toFixed(2)}</td>
                <td class="px-4 py-2 border">{entry.status}</td>
              </tr>
            )}
          </For>
        </tbody>
      </table>
    </div>
  );
}
