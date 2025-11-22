import { Card, CardContent } from "@/components/ui/card";
import { Car, Bike } from "lucide-react";
import { cn } from "@/lib/utils";

interface ParkingSpotProps {
  number: number;
  type: "car" | "motorcycle";
  occupied: boolean;
  licensePlate?: string;
  onClick?: () => void;
}

export function ParkingSpot({ number, type, occupied, licensePlate, onClick }: ParkingSpotProps) {
  const Icon = type === "car" ? Car : Bike;
  
  return (
    <Card
      onClick={onClick}
      className={cn(
        "cursor-pointer transition-all hover:shadow-md",
        type === "car" ? "bg-car-spot border-car-accent/20" : "bg-motorcycle-spot border-motorcycle-accent/20",
        occupied && "opacity-60"
      )}
    >
      <CardContent className="flex flex-col items-center justify-center p-4 h-full min-h-[100px]">
        <div className="text-xl font-bold mb-2">{number}</div>
        <Icon className={cn(
          "h-6 w-6 mb-2",
          type === "car" ? "text-car-accent" : "text-motorcycle-accent"
        )} />
        <span className="text-xs text-muted-foreground">
          {occupied ? licensePlate || "Ocupado" : "Livre"}
        </span>
      </CardContent>
    </Card>
  );
}
