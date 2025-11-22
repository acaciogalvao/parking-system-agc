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
        "cursor-pointer transition-all hover:shadow-md active:scale-95",
        type === "car" ? "bg-car-spot border-car-accent/20" : "bg-motorcycle-spot border-motorcycle-accent/20",
        occupied && "opacity-60"
      )}
    >
      <CardContent className="flex flex-col items-center justify-center p-3 sm:p-4 h-full min-h-[80px] sm:min-h-[100px]">
        <div className="text-lg sm:text-xl font-bold mb-1 sm:mb-2">{number}</div>
        <Icon className={cn(
          "h-5 w-5 sm:h-6 sm:w-6 mb-1 sm:mb-2",
          type === "car" ? "text-car-accent" : "text-motorcycle-accent"
        )} />
        <span className="text-[10px] sm:text-xs text-muted-foreground text-center">
          {occupied ? licensePlate || "Ocupado" : "Livre"}
        </span>
      </CardContent>
    </Card>
  );
}
