import { Card, CardContent } from "@/components/ui/card";
import { Car, Bike } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

interface ParkingSpotProps {
  number: number;
  type: "car" | "motorcycle";
  occupied: boolean;
  licensePlate?: string;
  entryTime?: Date;
  onClick?: () => void;
}

export function ParkingSpot({ number, type, occupied, licensePlate, entryTime, onClick }: ParkingSpotProps) {
  const Icon = type === "car" ? Car : Bike;
  const [duration, setDuration] = useState("");

  useEffect(() => {
    if (!occupied || !entryTime) return;

    const updateDuration = () => {
      const now = new Date();
      const durationMs = now.getTime() - entryTime.getTime();
      const totalSeconds = Math.floor(durationMs / 1000);
      const hours = Math.floor(totalSeconds / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;
      setDuration(`${hours}h ${minutes}m ${seconds}s`);
    };

    updateDuration();
    const interval = setInterval(updateDuration, 1000);

    return () => clearInterval(interval);
  }, [occupied, entryTime]);
  
  return (
    <Card
      onClick={onClick}
      className={cn(
        "cursor-pointer transition-all hover:shadow-lg active:scale-[0.98] border-2",
        type === "car" ? "bg-car-spot border-car-accent/30" : "bg-motorcycle-spot border-motorcycle-accent/30",
        occupied && "ring-2 ring-offset-2",
        occupied && type === "car" && "ring-car-accent/50",
        occupied && type === "motorcycle" && "ring-motorcycle-accent/50"
      )}
    >
      <CardContent className="flex flex-col items-center justify-center p-3 sm:p-4 h-full min-h-[110px] sm:min-h-[120px]">
        <div className="text-xl sm:text-2xl font-bold mb-2">{number}</div>
        <Icon className={cn(
          "h-6 w-6 sm:h-7 sm:w-7 mb-2",
          type === "car" ? "text-car-accent" : "text-motorcycle-accent"
        )} />
        {occupied && licensePlate ? (
          <div className="flex flex-col items-center gap-1 w-full">
            <span className="text-[11px] sm:text-xs font-bold text-center px-2 py-0.5 bg-background/60 rounded">
              {licensePlate}
            </span>
            <span className="text-[10px] sm:text-[11px] font-medium text-muted-foreground text-center tabular-nums">
              {duration}
            </span>
          </div>
        ) : (
          <span className="text-xs sm:text-sm font-medium text-muted-foreground text-center">
            Livre
          </span>
        )}
      </CardContent>
    </Card>
  );
}
