
import * as React from "react";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";

interface EnergyBarProps {
  value: number;
  max?: number;
  type?: "energy" | "frequency" | "harmony" | "analysis";
  size?: "sm" | "md" | "lg";
  showValue?: boolean;
  label?: string;
  className?: string;
}

export function EnergyBar({
  value,
  max = 100,
  type = "energy",
  size = "md",
  showValue = true,
  label,
  className
}: EnergyBarProps) {
  const percentage = Math.min((value / max) * 100, 100);
  
  const typeColors = {
    energy: "from-radionik-energy to-radionik-energy/70",
    frequency: "from-radionik-frequency to-radionik-frequency/70",
    harmony: "from-radionik-harmony to-radionik-harmony/70",
    analysis: "from-radionik-analysis to-radionik-analysis/70"
  };

  const sizes = {
    sm: "h-2",
    md: "h-3",
    lg: "h-4"
  };

  return (
    <div className={cn("space-y-2", className)}>
      {(label || showValue) && (
        <div className="flex items-center justify-between">
          {label && (
            <span className="text-sm font-medium text-foreground">{label}</span>
          )}
          {showValue && (
            <span className="text-sm text-muted-foreground">
              {value}/{max}
            </span>
          )}
        </div>
      )}
      <div className={cn("relative overflow-hidden rounded-full bg-muted", sizes[size])}>
        <div
          className={cn(
            "h-full transition-all duration-500 ease-out bg-gradient-to-r",
            typeColors[type]
          )}
          style={{ width: `${percentage}%` }}
        />
        {percentage > 75 && (
          <div className="absolute inset-0 animate-pulse-glow rounded-full" />
        )}
      </div>
    </div>
  );
}
