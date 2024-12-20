import {
  retailers,
  creditCards,
  orderStatuses,
  type OrderStatus,
} from "../constants/index.ts";

interface SelectProps {
  value: string;
  onChange: (value: string) => void;
  label: string;
  class?: string;
}

export function RetailerSelect(_props: SelectProps) {
  return (
    <div class={_props.class}>
      <label class="block text-sm fond-medium mb-2">{_props.label}</label>
      <select
        value={_props.value}
        onChange={(e) => _props.onChange(e.currentTarget.value)}
        class="w-full rounded border p-2"
      >
        {retailers.map((retailer) => (
          <option value={retailer}>{retailer}</option>
        ))}
      </select>
    </div>
  );
}

export function CreditCardSelect(_props: SelectProps) {
  return (
    <div class={_props.class}>
      <label class="block text-sm font-medium mb-2">{_props.label}</label>
      <select
        value={_props.value}
        onChange={(e) => _props.onChange(e.currentTarget.value)}
        class="w-full rounded border p-2"
      >
        {creditCards.map((card) => (
          <option value={card.name}>
            {card.name} ({(card.cashbackRate * 100).toFixed(1)}%)
          </option>
        ))}
      </select>
    </div>
  );
}

interface StatusSelectProps extends Omit<SelectProps, "value" | "onChange"> {
  value: OrderStatus;
  onChange: (value: OrderStatus) => void;
}

export function StatusSelect(_props: StatusSelectProps) {
  return (
    <div class={_props.class}>
      <label class="block text-sm font-medium mb-2">{_props.label}</label>
      <select
        value={_props.value}
        onChange={(e) => _props.onChange(e.currentTarget.value as OrderStatus)}
        class="w-full rounded border p-2"
      >
        {orderStatuses.map((status) => (
          <option value={status}>{status}</option>
        ))}
      </select>
    </div>
  );
}
