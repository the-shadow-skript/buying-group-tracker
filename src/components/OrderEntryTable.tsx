import StatusCell from "./StatusCell.tsx";
import type { OrderEntry, OrderStatus } from "../constants/index.ts";

interface OrderEntryTableProps {
  entries: OrderEntry[];
  onStatusUpdate: (index: number, newStatus: OrderStatus) => void;
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
      <table class="w-full">
        <thead class="bg-gray-50">
          <tr>
            <th class="p-4 text-left">Buying Group</th>
            <th class="p-4 text-left">Order Date</th>
            <th class="p-4 text-left">Order Number</th>
            <th class="p-4 text-left">Email</th>
            <th class="p-4 text-left">Retailer</th>
            <th class="p-4 text-left">Items Purchased</th>
            <th class="p-4 text-left">Quantity</th>
            <th class="p-4 text-left">Cost</th>
            <th class="p-4 text-left">Deal Type</th>
            <th class="p-4 text-left">Credit Card Used</th>
            <th class="p-4 text-left">Cashback</th>
            <th class="p-4 text-left">Rebate</th>
            <th class="p-4 text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          {_props.entries.map((entry, index) => (
            <tr class="border-t">
              <td class="p-4">{entry.buyingGroup}</td>
              <td class="p-4">{entry.orderDate}</td>
              <td class="p-4">{entry.orderNumber}</td>
              <td class="p-4">{entry.email}</td>
              <td class="p-4">{entry.retailer}</td>
              <td class="p-4">{entry.itemsPurchased}</td>
              <td class="p-4">{entry.quantity}</td>
              <td class="p-4">{entry.cost.toFixed(2)}</td>
              <td class="p-4">{calculateFinalAmount(entry)}</td>
              <td class="p-4">{entry.creditCard}</td>
              <td class="p-4">{entry.cashback.toFixed(2)}</td>
              <td class="p-4">{entry.rebate.toFixed(2)}</td>
              <td class="p-4">
                <StatusCell
                  status={entry.status}
                  onChange={(newStatus) =>
                    _props.onStatusUpdate(index, newStatus)
                  }
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
