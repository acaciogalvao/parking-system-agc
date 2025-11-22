import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  colorScheme: "car" | "motorcycle" | "earnings" | "analytics";
}

export function StatsCard({ title, value, subtitle, icon: Icon, colorScheme }: StatsCardProps) {
  const colorClasses = {
    car: "bg-car-spot text-car-accent",
    motorcycle: "bg-motorcycle-spot text-motorcycle-accent",
    earnings: "bg-earnings text-earnings-accent",
    analytics: "bg-analytics text-analytics-accent",
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div className={cn("p-2 rounded-lg", colorClasses[colorScheme])}>
          <Icon className="h-4 w-4" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {subtitle && (
          <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
        )}
      </CardContent>
    </Card>
  );
}
