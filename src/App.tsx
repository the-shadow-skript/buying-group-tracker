import "./App.css";
import OrderEntryTable from "./components/OrderEntryTable";

export default function App() {
  return (
    <div class="min-h-screen py-8 bg-gray-50">
      <div class="container mx-auto">
        <h1 class="text-3xl font-bold text-center">Buying Group Tracker</h1>
        <OrderEntryTable />
      </div>
    </div>
  );
}
