
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const statusIndicatorVariants = cva(
  "inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium",
  {
    variants: {
      variant: {
        active: "bg-radionik-energy/10 text-radionik-energy border border-radionik-energy/20",
        processing: "bg-radionik-frequency/10 text-radionik-frequency border border-radionik-frequency/20",
        harmonizing: "bg-radionik-harmony/10 text-radionik-harmony border border-radionik-harmony/20",
        analyzing: "bg-radionik-analysis/10 text-radionik-analysis border border-radionik-analysis/20",
        completed: "bg-green-50 text-green-700 border border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800",
        pending: "bg-yellow-50 text-yellow-700 border border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-300 dark:border-yellow-800",
        error: "bg-red-50 text-red-700 border border-red-200 dark:bg-red-900/20 dark:text-red-300 dark:border-red-800",
        neutral: "bg-muted text-muted-foreground border border-border"
      },
      size: {
        sm: "px-2 py-0.5 text-xs",
        md: "px-3 py-1 text-xs",
        lg: "px-4 py-1.5 text-sm"
      }
    },
    defaultVariants: {
      variant: "neutral",
      size: "md"
    }
  }
);

export interface StatusIndicatorProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof statusIndicatorVariants> {
  showDot?: boolean;
}

const StatusIndicator = React.forwardRef<HTMLDivElement, StatusIndicatorProps>(
  ({ className, variant, size, showDot = true, children, ...props }, ref) => {
    const dotColor = {
      active: "bg-radionik-energy",
      processing: "bg-radionik-frequency",
      harmonizing: "bg-radionik-harmony",
      analyzing: "bg-radionik-analysis",
      completed: "bg-green-500",
      pending: "bg-yellow-500",
      error: "bg-red-500",
      neutral: "bg-muted-foreground"
    }[variant || "neutral"];

    return (
      <div
        className={cn(statusIndicatorVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {showDot && (
          <div className={cn("h-2 w-2 rounded-full", dotColor)} />
        )}
        {children}
      </div>
    );
  }
);

StatusIndicator.displayName = "StatusIndicator";

export { StatusIndicator, statusIndicatorVariants };
