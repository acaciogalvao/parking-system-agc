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

const HOURLY_RATES = {
  car: 10,
  motorcycle: 7,
};

export function ParkingSpot({ number, type, occupied, licensePlate, entryTime, onClick }: ParkingSpotProps) {
  const Icon = type === "car" ? Car : Bike;
  const [duration, setDuration] = useState("");
  const [value, setValue] = useState("R$ 0,00");

  useEffect(() => {
    if (!occupied || !entryTime) return;

    const updateInfo = () => {
      const now = new Date();
      const durationMs = now.getTime() - entryTime.getTime();
      const totalSeconds = Math.floor(durationMs / 1000);
      const hours = Math.floor(totalSeconds / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;
      setDuration(`${hours}h ${minutes}m ${seconds}s`);

      // Calculate value
      const durationMinutes = durationMs / 60000;
      const hourlyRate = HOURLY_RATES[type];
      const currentValue = (durationMinutes / 60) * hourlyRate;
      setValue(`R$ ${currentValue.toFixed(2).replace(".", ",")}`);
    };

    updateInfo();
    const interval = setInterval(updateInfo, 1000);

    return () => clearInterval(interval);
  }, [occupied, entryTime, type]);
  
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
      <CardContent className="flex flex-col items-center justify-center p-3 sm:p-4 h-full min-h-[140px] sm:min-h-[150px]">
        <div className="text-2xl sm:text-3xl font-bold mb-2">{number}</div>
        <Icon className={cn(
          "h-7 w-7 sm:h-8 sm:w-8 mb-2",
          type === "car" ? "text-car-accent" : "text-motorcycle-accent"
        )} />
        {occupied && licensePlate ? (
          <div className="flex flex-col items-center gap-1.5 w-full">
            <span className="text-xs sm:text-sm font-bold text-center px-2 py-1 bg-background/70 rounded-md">
              {licensePlate}
            </span>
            <span className="text-sm sm:text-base font-bold text-center tabular-nums bg-earnings/30 px-2 py-0.5 rounded">
              {duration}
            </span>
            <span className="text-base sm:text-lg font-bold text-earnings-accent text-center tabular-nums">
              {value}
            </span>
          </div>
        ) : (
          <span className="text-sm sm:text-base font-medium text-muted-foreground text-center">
            Livre
          </span>
        )}
      </CardContent>
    </Card>
  );
}
