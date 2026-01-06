"use client";

import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/site";

interface SizeSelectorProps {
  sizes: string[];
  selectedSize: string | null;
  onSelect: (size: string) => void;
  availableSizes?: string[]; // Sizes that are in stock
  className?: string;
}

export function SizeSelector({
  sizes = siteConfig.sizes,
  selectedSize,
  onSelect,
  availableSizes,
  className,
}: SizeSelectorProps) {
  const isAvailable = (size: string) => {
    if (!availableSizes) return true;
    return availableSizes.includes(size);
  };

  return (
    <div className={cn("space-y-3", className)}>
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-brand-dark">Select Size</label>
        <button className="text-sm text-brand-primary hover:underline">
          Size Guide
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {sizes.map((size) => {
          const available = isAvailable(size);
          const isSelected = selectedSize === size;

          return (
            <button
              key={size}
              onClick={() => available && onSelect(size)}
              disabled={!available}
              className={cn(
                "min-w-[48px] h-11 px-4 rounded-full border-2 text-sm font-medium transition-all",
                isSelected
                  ? "border-brand-dark bg-brand-dark text-white"
                  : available
                  ? "border-border bg-white text-brand-dark hover:border-brand-dark"
                  : "border-border bg-brand-cream text-muted cursor-not-allowed line-through"
              )}
              aria-pressed={isSelected}
              aria-disabled={!available}
            >
              {size}
            </button>
          );
        })}
      </div>
    </div>
  );
}
