import { Show } from "solid-js";
import type { DealType } from "../constants/index.ts";

interface Props {
  value: DealType;
  adjustment: number;
  onTypeChange: (type: DealType) => void;
  onAdjustmentChange: (value: number) => void;
}

export default function DealTypeInput(_props: Props) {
  return (
    <div class="space-y-4">
      <div class="space-y-2">
        <label class="flex items-center">
          <input
            type="radio"
            value="atCost"
            checked={_props.value === "atCost"}
            onChange={(e) =>
              _props.onTypeChange(e.currentTarget.value as DealType)
            }
            class="mr-2"
          />
          At Cost
        </label>
        <label class="flex items-center">
          <input
            type="radio"
            value="belowCost"
            checked={_props.value === "belowCost"}
            onChange={(e) =>
              _props.onTypeChange(e.currentTarget.value as DealType)
            }
            class="mr-2"
          />
          Below Cost
        </label>
      </div>

      <Show when={_props.value === "atCost"}>
        <div>
          <label class="block text-sm font-medium mb-2">
            Commission Amount (USD)
          </label>
          <input
            type="number"
            min="0"
            step="0.01"
            value={_props.adjustment}
            onChange={(e) =>
              _props.onAdjustmentChange(parseFloat(e.currentTarget.value))
            }
            class="w-full p-2 rounded-border"
          />
        </div>
      </Show>

      <Show when={_props.value === "belowCost"}>
        <div>
          <label class="block text-sm font-medium mb-2">
            Below Cost Percentage
          </label>
          <input
            type="number"
            min="0"
            max="100"
            step="0.1"
            value={_props.adjustment}
            onChange={(e) =>
              _props.onAdjustmentChange(parseFloat(e.currentTarget.value))
            }
            class="w-full p-2 border rounded"
          />
        </div>
      </Show>
    </div>
  );
}
