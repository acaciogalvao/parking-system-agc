import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Car, Bike, Clock, DollarSign } from "lucide-react";
import { OccupiedSpot } from "@/hooks/useParkingSpots";

interface ViewSpotDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  spot: OccupiedSpot | null;
  onVacate: () => void;
  calculateDuration: (spot: OccupiedSpot) => string;
  calculateCurrentValue: (spot: OccupiedSpot) => string;
}

export function ViewSpotDialog({
  open,
  onOpenChange,
  spot,
  onVacate,
  calculateDuration,
  calculateCurrentValue,
}: ViewSpotDialogProps) {
  const [, setTick] = useState(0);

  useEffect(() => {
    if (!open || !spot) return;
    
    const interval = setInterval(() => {
      setTick((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [open, spot]);

  if (!spot) return null;

  const Icon = spot.type === "car" ? Car : Bike;
  const typeLabel = spot.type === "car" ? "Carro" : "Moto";
  const rate = spot.type === "car" ? "R$ 10,00/h" : "R$ 7,00/h";

  const handleVacate = () => {
    onVacate();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-lg sm:text-xl">
            <Icon className="h-5 w-5" />
            Vaga {spot.spotNumber} - Ocupada
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
            <span className="text-sm font-medium">Placa</span>
            <span className="text-sm font-bold">{spot.licensePlate}</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
            <span className="text-sm font-medium">Tipo</span>
            <span className="text-sm">{typeLabel}</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
            <span className="text-sm font-medium">Tarifa</span>
            <span className="text-sm font-bold">{rate}</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-earnings border-earnings-accent/20 rounded-lg">
            <span className="text-sm font-medium flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Tempo
            </span>
            <span className="text-sm font-bold tabular-nums">
              {calculateDuration(spot)}
            </span>
          </div>
          <div className="flex items-center justify-between p-3 bg-earnings border-earnings-accent/20 rounded-lg">
            <span className="text-sm font-medium flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              Valor Atual
            </span>
            <span className="text-lg font-bold tabular-nums">
              {calculateCurrentValue(spot)}
            </span>
          </div>
          <div className="text-xs text-muted-foreground p-2 bg-muted/50 rounded">
            Entrada: {spot.entryTime.toLocaleString("pt-BR", {
              day: "2-digit",
              month: "2-digit",
              year: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </div>
        </div>
        <DialogFooter className="flex-col sm:flex-row gap-2">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="w-full sm:w-auto"
          >
            Fechar
          </Button>
          <Button
            onClick={handleVacate}
            className="w-full sm:w-auto bg-earnings-accent hover:bg-earnings-accent/90"
          >
            Liberar Vaga
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
