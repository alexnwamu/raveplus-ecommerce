"use client";

import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface ColorOption {
  name: string;
  hex: string;
  available?: boolean;
}

interface ColorSelectorProps {
  colors: ColorOption[];
  selectedColor: string | null;
  onSelect: (color: string) => void;
  className?: string;
}

export function ColorSelector({
  colors,
  selectedColor,
  onSelect,
  className,
}: ColorSelectorProps) {
  return (
    <div className={cn("space-y-3", className)}>
      <div className="flex items-center gap-2">
        <label className="text-sm font-medium text-brand-dark">Select Color</label>
        {selectedColor && (
          <span className="text-sm text-muted">
            {colors.find((c) => c.name === selectedColor)?.name}
          </span>
        )}
      </div>
      <div className="flex flex-wrap gap-3">
        {colors.map((color) => {
          const isSelected = selectedColor === color.name;
          const available = color.available !== false;

          return (
            <button
              key={color.name}
              onClick={() => available && onSelect(color.name)}
              disabled={!available}
              className={cn(
                "relative w-10 h-10 rounded-full transition-all",
                isSelected
                  ? "ring-2 ring-brand-dark ring-offset-2"
                  : "hover:ring-2 hover:ring-brand-cream hover:ring-offset-2",
                !available && "opacity-50 cursor-not-allowed"
              )}
              style={{ backgroundColor: color.hex }}
              aria-label={`Select ${color.name} color`}
              aria-pressed={isSelected}
              aria-disabled={!available}
              title={color.name}
            >
              {/* Checkmark for selected */}
              {isSelected && (
                <span
                  className={cn(
                    "absolute inset-0 flex items-center justify-center",
                    isLightColor(color.hex) ? "text-brand-dark" : "text-white"
                  )}
                >
                  <Check className="h-5 w-5" />
                </span>
              )}

              {/* Strikethrough for unavailable */}
              {!available && (
                <span className="absolute inset-0 flex items-center justify-center">
                  <span
                    className="w-[140%] h-0.5 bg-error rotate-45 absolute"
                    aria-hidden="true"
                  />
                </span>
              )}

              {/* Border for light colors */}
              {isLightColor(color.hex) && (
                <span
                  className="absolute inset-0 rounded-full border border-border"
                  aria-hidden="true"
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// Helper to determine if a color is light
function isLightColor(hex: string): boolean {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.7;
}
