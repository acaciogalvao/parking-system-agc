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
        "cursor-pointer transition-all hover:shadow-md active:scale-95",
        type === "car" ? "bg-car-spot border-car-accent/20" : "bg-motorcycle-spot border-motorcycle-accent/20",
        occupied && "opacity-80"
      )}
    >
      <CardContent className="flex flex-col items-center justify-center p-2 sm:p-3 h-full min-h-[80px] sm:min-h-[100px]">
        <div className="text-base sm:text-lg font-bold mb-1">{number}</div>
        <Icon className={cn(
          "h-4 w-4 sm:h-5 sm:w-5 mb-1",
          type === "car" ? "text-car-accent" : "text-motorcycle-accent"
        )} />
        {occupied && licensePlate ? (
          <>
            <span className="text-[9px] sm:text-[10px] font-semibold text-center mb-0.5">
              {licensePlate}
            </span>
            <span className="text-[8px] sm:text-[9px] text-muted-foreground text-center tabular-nums">
              {duration}
            </span>
          </>
        ) : (
          <span className="text-[10px] sm:text-xs text-muted-foreground text-center">
            Livre
          </span>
        )}
      </CardContent>
    </Card>
  );
}
