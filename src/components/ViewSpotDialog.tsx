import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Car, Bike, Clock, DollarSign, Smartphone, CreditCard, Banknote } from "lucide-react";
import { OccupiedSpot } from "@/hooks/useParkingSpots";
import { toast } from "@/hooks/use-toast";

interface ViewSpotDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  spot: OccupiedSpot | null;
  onVacate: (paymentMethod: "pix" | "card" | "cash") => void;
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
  const [paymentMethod, setPaymentMethod] = useState<"pix" | "card" | "cash">("pix");

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
    if (!paymentMethod) {
      toast({
        title: "Selecione um método de pagamento",
        description: "Por favor, selecione como o cliente irá pagar.",
        variant: "destructive",
      });
      return;
    }
    onVacate(paymentMethod);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader className="pb-2">
          <DialogTitle className="flex items-center gap-2 text-xl sm:text-2xl">
            <Icon className="h-6 w-6" />
            Vaga {spot.spotNumber} - Ocupada
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-3 py-2">
          <div className="flex items-center justify-between p-4 bg-muted rounded-lg border border-border">
            <span className="text-sm font-medium text-muted-foreground">Placa</span>
            <span className="text-base sm:text-lg font-bold">{spot.licensePlate}</span>
          </div>
          <div className="flex items-center justify-between p-4 bg-muted rounded-lg border border-border">
            <span className="text-sm font-medium text-muted-foreground">Tipo</span>
            <span className="text-base font-semibold">{typeLabel}</span>
          </div>
          <div className="flex items-center justify-between p-4 bg-muted rounded-lg border border-border">
            <span className="text-sm font-medium text-muted-foreground">Tarifa</span>
            <span className="text-base font-bold">{rate}</span>
          </div>
          <div className="flex items-center justify-between p-4 bg-earnings/20 border-2 border-earnings-accent/30 rounded-lg">
            <span className="text-sm font-medium flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Tempo
            </span>
            <span className="text-base sm:text-lg font-bold tabular-nums">
              {calculateDuration(spot)}
            </span>
          </div>
          <div className="flex items-center justify-between p-4 bg-earnings/20 border-2 border-earnings-accent/30 rounded-lg">
            <span className="text-sm font-medium flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              Valor Atual
            </span>
            <span className="text-xl sm:text-2xl font-bold tabular-nums text-earnings-accent">
              {calculateCurrentValue(spot)}
            </span>
          </div>
          <div className="text-xs text-muted-foreground p-3 bg-muted/50 rounded border border-border">
            <span className="font-medium">Entrada:</span> {spot.entryTime.toLocaleString("pt-BR", {
              day: "2-digit",
              month: "2-digit",
              year: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </div>
          
          <div className="space-y-3 pt-2">
            <Label className="text-base font-semibold">Método de Pagamento</Label>
            <RadioGroup value={paymentMethod} onValueChange={(value) => setPaymentMethod(value as "pix" | "card" | "cash")}>
              <div className="flex flex-col gap-3">
                <label
                  htmlFor="pix"
                  className={`flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    paymentMethod === "pix"
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <RadioGroupItem value="pix" id="pix" />
                  <Smartphone className="h-5 w-5 text-primary" />
                  <span className="text-base font-medium">Pix</span>
                </label>
                
                <label
                  htmlFor="card"
                  className={`flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    paymentMethod === "card"
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <RadioGroupItem value="card" id="card" />
                  <CreditCard className="h-5 w-5 text-primary" />
                  <span className="text-base font-medium">Cartão</span>
                </label>
                
                <label
                  htmlFor="cash"
                  className={`flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    paymentMethod === "cash"
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <RadioGroupItem value="cash" id="cash" />
                  <Banknote className="h-5 w-5 text-primary" />
                  <span className="text-base font-medium">Dinheiro</span>
                </label>
              </div>
            </RadioGroup>
          </div>
        </div>
        <DialogFooter className="flex-col sm:flex-row gap-2 pt-2">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="w-full sm:w-auto order-2 sm:order-1"
            size="lg"
          >
            Fechar
          </Button>
          <Button
            onClick={handleVacate}
            className="w-full sm:w-auto order-1 sm:order-2 bg-earnings-accent hover:bg-earnings-accent/90"
            size="lg"
          >
            Liberar Vaga
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
