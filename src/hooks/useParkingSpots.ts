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
  paymentMethod: "pix" | "card" | "cash";
}

const HOURLY_RATES = {
  car: 10,
  motorcycle: 7,
};

// Funções auxiliares para localStorage
const loadOccupiedSpots = (): Map<number, OccupiedSpot> => {
  try {
    const serializedState = localStorage.getItem("occupiedSpots");
    if (serializedState === null) {
      return new Map();
    }
    const parsed = JSON.parse(serializedState);
    // Converte a lista de objetos de volta para Map e a string de data para objeto Date
    const map = new Map<number, OccupiedSpot>();
    parsed.forEach((item: { spotNumber: number; licensePlate: string; type: "car" | "motorcycle"; entryTime: string }) => {
      map.set(item.spotNumber, {
        ...item,
        entryTime: new Date(item.entryTime),
      });
    });
    return map;
  } catch (err) {
    console.error("Could not load occupied spots from localStorage", err);
    return new Map();
  }
};

const saveOccupiedSpots = (state: Map<number, OccupiedSpot>) => {
  try {
    // Converte o Map para uma lista de objetos para serialização
    const serializedState = JSON.stringify(Array.from(state.values()));
    localStorage.setItem("occupiedSpots", serializedState);
  } catch (err) {
    console.error("Could not save occupied spots to localStorage", err);
  }
};

const loadHistory = (): VehicleExit[] => {
  try {
    const serializedState = localStorage.getItem("history");
    if (serializedState === null) {
      return [];
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.error("Could not load history from localStorage", err);
    return [];
  }
};

const saveHistory = (state: VehicleExit[]) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("history", serializedState);
  } catch (err) {
    console.error("Could not save history to localStorage", err);
  }
};

export function useParkingSpots() {
  const [occupiedSpots, setOccupiedSpots] = useState<Map<number, OccupiedSpot>>(() => loadOccupiedSpots());
  const [history, setHistory] = useState<VehicleExit[]>(() => loadHistory());

  // Efeito para salvar occupiedSpots sempre que mudar
  useEffect(() => {
    saveOccupiedSpots(occupiedSpots);
  }, [occupiedSpots]);

  // Efeito para salvar history sempre que mudar
  useEffect(() => {
    saveHistory(history);
  }, [history]);

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

  const vacateSpot = (spotNumber: number, paymentMethod: "pix" | "card" | "cash") => {
    const spot = occupiedSpots.get(spotNumber);
    if (spot) {
      const exitTime = new Date();
      const durationMs = exitTime.getTime() - spot.entryTime.getTime();
      
      // Cálculo preciso em minutos (com decimais) para o valor
      const durationMinutesExact = durationMs / 60000;
      
      // Cálculo COMPLETO para exibição da duração (com horas, minutos E segundos)
      const totalSeconds = Math.floor(durationMs / 1000);
      const hours = Math.floor(totalSeconds / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;
      
      // Formata a duração incluindo segundos quando necessário
      let durationStr = "";
      if (hours > 0) {
        durationStr = `${hours}h ${minutes}min`;
      } else if (minutes > 0) {
        durationStr = `${minutes}min ${seconds}s`;
      } else {
        durationStr = `${seconds}s`;
      }
      
      // Usa o valor exato (com decimais) para calcular o preço
      const hourlyRate = HOURLY_RATES[spot.type];
      const value = (durationMinutesExact / 60) * hourlyRate;
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
        paymentMethod,
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
    
    // Formata de forma inteligente baseado no tempo
    if (hours > 0) {
      return `${hours}h ${minutes}min`;
    } else if (minutes > 0) {
      return `${minutes}min ${seconds}s`;
    } else {
      return `${seconds}s`;
    }
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
