
import * as React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string | number;
  description?: string;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  icon?: LucideIcon;
  className?: string;
  color?: "primary" | "radionik-energy" | "radionik-frequency" | "radionik-harmony" | "radionik-analysis";
}

export function MetricCard({
  title,
  value,
  description,
  change,
  changeType = "neutral",
  icon: Icon,
  className,
  color = "primary"
}: MetricCardProps) {
  const colorClasses = {
    primary: "border-primary/20 bg-primary/5",
    "radionik-energy": "border-radionik-energy/20 bg-radionik-energy/5",
    "radionik-frequency": "border-radionik-frequency/20 bg-radionik-frequency/5",
    "radionik-harmony": "border-radionik-harmony/20 bg-radionik-harmony/5",
    "radionik-analysis": "border-radionik-analysis/20 bg-radionik-analysis/5"
  };

  const iconClasses = {
    primary: "text-primary",
    "radionik-energy": "text-radionik-energy",
    "radionik-frequency": "text-radionik-frequency",
    "radionik-harmony": "text-radionik-harmony",
    "radionik-analysis": "text-radionik-analysis"
  };

  const changeClasses = {
    positive: "text-green-600 bg-green-50 border-green-200 dark:text-green-400 dark:bg-green-900/20 dark:border-green-800",
    negative: "text-red-600 bg-red-50 border-red-200 dark:text-red-400 dark:bg-red-900/20 dark:border-red-800",
    neutral: "text-muted-foreground bg-muted border-border"
  };

  return (
    <Card className={cn("transition-all duration-200 hover:shadow-md", colorClasses[color], className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {Icon && <Icon className={cn("h-4 w-4", iconClasses[color])} />}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <div className="flex items-center justify-between mt-2">
          {description && (
            <p className="text-xs text-muted-foreground">{description}</p>
          )}
          {change && (
            <Badge
              variant="outline"
              className={cn("text-xs", changeClasses[changeType])}
            >
              {change}
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
