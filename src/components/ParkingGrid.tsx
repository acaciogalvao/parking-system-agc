import { ParkingSpot } from "./ParkingSpot";
import { OccupiedSpot } from "@/hooks/useParkingSpots";

interface ParkingGridProps {
  startNumber: number;
  endNumber: number;
  type: "car" | "motorcycle";
  occupiedSpots?: Map<number, OccupiedSpot>;
  onSpotClick?: (spotNumber: number) => void;
}

export function ParkingGrid({ 
  startNumber, 
  endNumber, 
  type, 
  occupiedSpots = new Map(),
  onSpotClick 
}: ParkingGridProps) {
  const spots = Array.from(
    { length: endNumber - startNumber + 1 },
    (_, i) => startNumber + i
  );

  return (
    <div className="grid grid-cols-3 gap-2 sm:gap-3 md:gap-4">
      {spots.map((spotNumber) => {
        const occupiedSpot = occupiedSpots.get(spotNumber);
        return (
          <ParkingSpot
            key={spotNumber}
            number={spotNumber}
            type={type}
            occupied={!!occupiedSpot}
            licensePlate={occupiedSpot?.licensePlate}
            entryTime={occupiedSpot?.entryTime}
            onClick={() => onSpotClick?.(spotNumber)}
          />
        );
      })}
    </div>
  );
}
