import { For } from "solid-js";
import { type OrderEntry } from "../constants/index.ts";

interface OrderEntryTableProps {
  entries: OrderEntry[];
}

export default function OrderEntryTable(_props: OrderEntryTableProps) {
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
          <For each={_props.entries}>
            {(entry) => (
              <tr>
                <td class="px-4 py-2 border">{entry.orderDate}</td>
                <td class="px-4 py-2 border">{entry.orderNumber}</td>
                <td class="px-4 py-2 border">{entry.email}</td>
                <td class="px-4 py-2 border">{entry.retailer}</td>
                <td class="px-4 py-2 border">{entry.itemsPurchased}</td>
                <td class="px-4 py-2 border">{entry.quantity}</td>
                <td class="px-4 py-2 border">{entry.cost.toFixed(2)}</td>
                <td class="px-4 py-2 border">
                  {entry.dealType === "atCost"
                    ? `At Cost (+$${entry.paymentAdjustment.toFixed(2)})`
                    : `Below Cost (${entry.paymentAdjustment}%)`}
                </td>
                <td class="px-4 py-2 border">{entry.creditCard}</td>
                <td class="px-4 py-2 border">{entry.cashback.toFixed(2)}</td>
                <td class="px-4 py-2 border">{entry.rebate.toFixed(2)}</td>
                <td class="px-4 py-2 border">{entry.trackingNumber}</td>
                <td class="px-4 py-2 border">{entry.status}</td>
              </tr>
            )}
          </For>
        </tbody>
      </table>
    </div>
  );
}
