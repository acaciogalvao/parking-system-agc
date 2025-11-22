import { ParkingSpot } from "./ParkingSpot";

interface ParkingGridProps {
  startNumber: number;
  endNumber: number;
  type: "car" | "motorcycle";
  occupiedSpots?: Set<number>;
  onSpotClick?: (spotNumber: number) => void;
}

export function ParkingGrid({ 
  startNumber, 
  endNumber, 
  type, 
  occupiedSpots = new Set(),
  onSpotClick 
}: ParkingGridProps) {
  const spots = Array.from(
    { length: endNumber - startNumber + 1 },
    (_, i) => startNumber + i
  );

  return (
    <div className="grid grid-cols-3 gap-2 sm:gap-3 md:gap-4">
      {spots.map((spotNumber) => (
        <ParkingSpot
          key={spotNumber}
          number={spotNumber}
          type={type}
          occupied={occupiedSpots.has(spotNumber)}
          onClick={() => onSpotClick?.(spotNumber)}
        />
      ))}
    </div>
  );
}
