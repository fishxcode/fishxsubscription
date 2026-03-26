import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type StatusKpiCardProps = {
  label: string;
  value: string;
  description?: string;
  trend?: string;
  trendTone?: "neutral" | "positive" | "warning";
  className?: string;
};

const toneClassName: Record<NonNullable<StatusKpiCardProps["trendTone"]>, string> = {
  neutral: "border-border/70 text-muted-foreground",
  positive: "border-emerald-500/30 text-emerald-400",
  warning: "border-amber-500/30 text-amber-400",
};

export function StatusKpiCard({
  label,
  value,
  description,
  trend,
  trendTone = "neutral",
  className,
}: StatusKpiCardProps) {
  return (
    <Card className={cn("console-card-density", className)}>
      <CardHeader className="gap-3">
        <CardDescription className="text-xs uppercase tracking-[0.14em]">{label}</CardDescription>
        <CardTitle className="text-3xl font-semibold">{value}</CardTitle>
      </CardHeader>
      <CardContent className="mt-3 flex items-center justify-between gap-3">
        {description ? <p className="text-sm text-muted-foreground">{description}</p> : <span />}
        {trend ? (
          <Badge variant="outline" className={cn("console-trend-badge", toneClassName[trendTone])}>
            {trend}
          </Badge>
        ) : null}
      </CardContent>
    </Card>
  );
}
