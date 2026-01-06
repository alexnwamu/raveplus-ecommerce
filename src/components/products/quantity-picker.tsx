"use client";

import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface QuantityPickerProps {
  quantity: number;
  onQuantityChange: (quantity: number) => void;
  min?: number;
  max?: number;
  className?: string;
}

export function QuantityPicker({
  quantity,
  onQuantityChange,
  min = 1,
  max = 99,
  className,
}: QuantityPickerProps) {
  const handleDecrement = () => {
    if (quantity > min) {
      onQuantityChange(quantity - 1);
    }
  };

  const handleIncrement = () => {
    if (quantity < max) {
      onQuantityChange(quantity + 1);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value >= min && value <= max) {
      onQuantityChange(value);
    }
  };

  return (
    <div className={cn("space-y-2", className)}>
      <label className="text-sm font-medium text-brand-dark">Quantity</label>
      <div className="inline-flex items-center border border-border rounded-lg overflow-hidden">
        <button
          onClick={handleDecrement}
          disabled={quantity <= min}
          className={cn(
            "w-11 h-11 flex items-center justify-center transition-colors",
            quantity <= min
              ? "text-muted cursor-not-allowed"
              : "hover:bg-brand-cream"
          )}
          aria-label="Decrease quantity"
        >
          <Minus className="h-4 w-4" />
        </button>
        <input
          type="number"
          min={min}
          max={max}
          value={quantity}
          onChange={handleInputChange}
          className="w-14 h-11 text-center border-l border-r border-border focus:outline-none text-sm font-medium"
          aria-label="Quantity"
        />
        <button
          onClick={handleIncrement}
          disabled={quantity >= max}
          className={cn(
            "w-11 h-11 flex items-center justify-center transition-colors",
            quantity >= max
              ? "text-muted cursor-not-allowed"
              : "hover:bg-brand-cream"
          )}
          aria-label="Increase quantity"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
