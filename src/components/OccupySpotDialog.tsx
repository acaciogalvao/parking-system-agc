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
        <DialogHeader className="pb-2">
          <DialogTitle className="flex items-center gap-2 text-xl sm:text-2xl">
            <Icon className="h-6 w-6" />
            Ocupar Vaga {spotNumber}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-2">
          <div className="flex items-center justify-between p-4 bg-muted rounded-lg border border-border">
            <span className="text-sm font-medium text-muted-foreground">Tipo</span>
            <span className="text-base font-semibold">{typeLabel}</span>
          </div>
          <div className="flex items-center justify-between p-4 bg-muted rounded-lg border border-border">
            <span className="text-sm font-medium text-muted-foreground">Tarifa</span>
            <span className="text-base font-bold">{rate}</span>
          </div>
          <div className="space-y-2">
            <Label htmlFor="plate" className="text-sm font-semibold">Placa do Veículo</Label>
            <PlateInput
              id="plate"
              value={licensePlate}
              onChange={setLicensePlate}
              placeholder="AAA-9999 ou AAA9A99"
              className="h-12 text-base"
            />
          </div>
        </div>
        <DialogFooter className="flex-col sm:flex-row gap-2 pt-2">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="w-full sm:w-auto order-2 sm:order-1"
            size="lg"
          >
            Cancelar
          </Button>
          <Button 
            onClick={handleConfirm} 
            className="w-full sm:w-auto order-1 sm:order-2"
            size="lg"
          >
            Confirmar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
