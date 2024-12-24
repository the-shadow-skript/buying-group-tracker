import { orderStatus, type OrderStatus } from "../constants/index.ts";

interface StatusCellProps {
  status: OrderStatus;
  onChange: (newStatus: OrderStatus) => void;
}

export default function StatusCell(_props: StatusCellProps) {
  return (
    <select
      value={_props.status}
      onChange={(e) => _props.onChange(e.currentTarget.value as OrderStatus)}
      class="w-full p-2 bg-transparent border rounded hover:bg-gray-50"
    >
      {orderStatus.map((status) => (
        <option value={status}>{status}</option>
      ))}
    </select>
  );
}
