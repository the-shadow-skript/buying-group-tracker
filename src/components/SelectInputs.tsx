import {
  buyingGroup,
  retailer,
  creditCard,
  orderStatus,
  type BuyingGroup,
  type Retailer,
  type CreditCardName,
  type OrderStatus,
} from "../constants/index.ts";

interface SelectProps {
  value: string;
  onChange: (value: string) => void;
  label: string;
  class?: string;
}

interface BuyingGroupSelectProps
  extends Omit<SelectProps, "value" | "onChange"> {
  value: BuyingGroup;
  onChange: (value: BuyingGroup) => void;
}

export function BuyingGroupSelect(_props: BuyingGroupSelectProps) {
  return (
    <div class={_props.class}>
      <label class="block text-sm font-medium mb-2">{_props.label}</label>
      <select
        value={_props.value}
        onChange={(e) => _props.onChange(e.currentTarget.value as BuyingGroup)}
        class="w-full rounded border p-2"
      >
        {buyingGroup.map((group) => (
          <option value={group}>{group}</option>
        ))}
      </select>
    </div>
  );
}

interface RetailerSelectProps extends Omit<SelectProps, "value" | "onChange"> {
  value: Retailer;
  onChange: (value: Retailer) => void;
}

export function RetailerSelect(_props: RetailerSelectProps) {
  return (
    <div class={_props.class}>
      <label class="block text-sm fond-medium mb-2">{_props.label}</label>
      <select
        value={_props.value}
        onChange={(e) => _props.onChange(e.currentTarget.value as Retailer)}
        class="w-full rounded border p-2"
      >
        {retailer.map((retailer) => (
          <option value={retailer}>{retailer}</option>
        ))}
      </select>
    </div>
  );
}

interface CreditCardSelectProps
  extends Omit<SelectProps, "value" | "onChange"> {
  value: CreditCardName;
  onChange: (value: CreditCardName) => void;
}

export function CreditCardSelect(_props: CreditCardSelectProps) {
  return (
    <div class={_props.class}>
      <label class="block text-sm font-medium mb-2">{_props.label}</label>
      <select
        value={_props.value}
        onChange={(e) =>
          _props.onChange(e.currentTarget.value as CreditCardName)
        }
        class="w-full rounded border p-2"
      >
        {creditCard.map(
          (card: { name: CreditCardName; cashbackRate: number }) => (
            <option value={card.name}>
              {card.name} ({(card.cashbackRate * 100).toFixed(1)}%)
            </option>
          )
        )}
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
        {orderStatus.map((status) => (
          <option value={status}>{status}</option>
        ))}
      </select>
    </div>
  );
}
