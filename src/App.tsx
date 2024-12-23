import "./App.css";
import { createSignal, onMount } from "solid-js";
import type { OrderEntry } from "./constants/index.ts";
import OrderEntryTable from "./components/OrderEntryTable.tsx";
import OrderEntryForm from "./components/OrderEntryForm.tsx";

export default function App() {
  const [entries, setEntries] = createSignal<OrderEntry[]>([]);

  onMount(() => {
    const savedEntries = localStorage.getItem("orderEntries");
    if (savedEntries) {
      setEntries(JSON.parse(savedEntries));
    }
  });

  const handleAddEntry = (entry: OrderEntry) => {
    const updatedEntries = [...entries(), entry];
    setEntries(updatedEntries);
    localStorage.setItem("orderEntries", JSON.stringify(updatedEntries));
  };

  return (
    <div class="min-h-screen py-8 bg-gray-50">
      <div class="container flex flex-row gap-8 mx-auto">
        {/* Form Section */}
        <div class="flex-1">
          <h2 class="mb-4 text-xl font-semibold">Order Entry Form</h2>
          <OrderEntryForm onAddEntry={handleAddEntry} />
        </div>

        {/* Totals Section */}
        <div class="flex-1">
          <h2 class="mb-4 text-xl font-semibold">Totals</h2>
          <div class="p-4 bg-white border rounded shadow-sm">
            <p>Total Orders: {entries().length}</p>
            <p>
              Total Cost: $
              {entries()
                .reduce((sum, entry) => sum + entry.cost, 0)
                .toFixed(2)}
            </p>
            <p>
              Total Cashback: $
              {entries()
                .reduce((sum, entry) => sum + entry.cashback, 0)
                .toFixed(2)}
            </p>
            <p>
              Total Rebates: $
              {entries()
                .reduce((sum, entry) => sum + entry.rebate, 0)
                .toFixed(2)}
            </p>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div class="mt-8">
        {entries().length > 0 && <OrderEntryTable entries={entries()} />}
      </div>
    </div>
  );
}
