import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { PlateInput } from "@/components/PlateInput";
import { Car, Bike } from "lucide-react";
import { plateSchema } from "@/lib/plate-validation";
import { toast } from "@/hooks/use-toast";

interface OccupySpotDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  spotNumber: number;
  spotType: "car" | "motorcycle";
  onConfirm: (licensePlate: string) => void;
}

export function OccupySpotDialog({
  open,
  onOpenChange,
  spotNumber,
  spotType,
  onConfirm,
}: OccupySpotDialogProps) {
  const [licensePlate, setLicensePlate] = useState("");

  const handleConfirm = () => {
    const validation = plateSchema.safeParse(licensePlate);
    if (!validation.success) {
      toast({
        title: "Placa inválida",
        description: "Por favor, insira uma placa válida (AAA-9999 ou AAA9A99)",
        variant: "destructive",
      });
      return;
    }

    onConfirm(licensePlate);
    setLicensePlate("");
    onOpenChange(false);
  };

  const Icon = spotType === "car" ? Car : Bike;
  const typeLabel = spotType === "car" ? "Carro" : "Moto";
  const rate = spotType === "car" ? "R$ 10,00/h" : "R$ 7,00/h";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-lg sm:text-xl">
            <Icon className="h-5 w-5" />
            Ocupar Vaga {spotNumber}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
            <span className="text-sm font-medium">Tipo</span>
            <span className="text-sm">{typeLabel}</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
            <span className="text-sm font-medium">Tarifa</span>
            <span className="text-sm font-bold">{rate}</span>
          </div>
          <div className="space-y-2">
            <Label htmlFor="plate">Placa do Veículo</Label>
            <PlateInput
              id="plate"
              value={licensePlate}
              onChange={setLicensePlate}
              placeholder="AAA-9999 ou AAA9A99"
            />
          </div>
        </div>
        <DialogFooter className="flex-col sm:flex-row gap-2">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="w-full sm:w-auto"
          >
            Cancelar
          </Button>
          <Button onClick={handleConfirm} className="w-full sm:w-auto">
            Confirmar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
