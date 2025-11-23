import { useState, useEffect } from "react";

export interface OccupiedSpot {
  spotNumber: number;
  licensePlate: string;
  type: "car" | "motorcycle";
  entryTime: Date;
}

export interface VehicleExit {
  licensePlate: string;
  type: "car" | "motorcycle";
  spot: number;
  entryTime: string;
  exitTime: string;
  duration: string;
  value: string;
}

const HOURLY_RATES = {
  car: 10,
  motorcycle: 7,
};

export function useParkingSpots() {
  const [occupiedSpots, setOccupiedSpots] = useState<Map<number, OccupiedSpot>>(new Map());
  const [history, setHistory] = useState<VehicleExit[]>([
    {
      licensePlate: "SM03F33",
      type: "car",
      spot: 1,
      entryTime: "22/11/25 06:23",
      exitTime: "22/11/25 09:10",
      duration: "2h 47min",
      value: "R$ 27,83",
    },
    {
      licensePlate: "SMO-3210",
      type: "car",
      spot: 2,
      entryTime: "21/11/25 11:42",
      exitTime: "22/11/25 06:35",
      duration: "18h 53min",
      value: "R$ 188,83",
    },
  ]);

  const occupySpot = (spotNumber: number, licensePlate: string, type: "car" | "motorcycle") => {
    setOccupiedSpots((prev) => {
      const newMap = new Map(prev);
      newMap.set(spotNumber, {
        spotNumber,
        licensePlate,
        type,
        entryTime: new Date(),
      });
      return newMap;
    });
  };

  const vacateSpot = (spotNumber: number) => {
    const spot = occupiedSpots.get(spotNumber);
    if (spot) {
      const exitTime = new Date();
      const durationMs = exitTime.getTime() - spot.entryTime.getTime();
      const durationMinutes = Math.floor(durationMs / 60000);
      const hours = Math.floor(durationMinutes / 60);
      const minutes = durationMinutes % 60;
      const durationStr = `${hours}h ${minutes}min`;
      
      const hourlyRate = HOURLY_RATES[spot.type];
      const value = (durationMinutes / 60) * hourlyRate;
      const valueStr = `R$ ${value.toFixed(2).replace(".", ",")}`;

      const exitRecord: VehicleExit = {
        licensePlate: spot.licensePlate,
        type: spot.type,
        spot: spotNumber,
        entryTime: spot.entryTime.toLocaleString("pt-BR", {
          day: "2-digit",
          month: "2-digit",
          year: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
        }),
        exitTime: exitTime.toLocaleString("pt-BR", {
          day: "2-digit",
          month: "2-digit",
          year: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
        }),
        duration: durationStr,
        value: valueStr,
      };

      setHistory((prev) => [exitRecord, ...prev]);
      setOccupiedSpots((prev) => {
        const newMap = new Map(prev);
        newMap.delete(spotNumber);
        return newMap;
      });
    }
  };

  const calculateCurrentValue = (spot: OccupiedSpot): string => {
    const now = new Date();
    const durationMs = now.getTime() - spot.entryTime.getTime();
    const durationMinutes = durationMs / 60000;
    const hourlyRate = HOURLY_RATES[spot.type];
    const value = (durationMinutes / 60) * hourlyRate;
    return `R$ ${value.toFixed(2).replace(".", ",")}`;
  };

  const calculateDuration = (spot: OccupiedSpot): string => {
    const now = new Date();
    const durationMs = now.getTime() - spot.entryTime.getTime();
    const totalSeconds = Math.floor(durationMs / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours}h ${minutes}min ${seconds}s`;
  };

  return {
    occupiedSpots,
    history,
    occupySpot,
    vacateSpot,
    calculateCurrentValue,
    calculateDuration,
  };
}
