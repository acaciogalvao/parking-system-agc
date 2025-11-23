import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Car, Bike } from "lucide-react";
import { cn } from "@/lib/utils";

interface VehicleRecord {
  licensePlate: string;
  type: "car" | "motorcycle";
  spot: number;
  entryTime: string;
  exitTime: string;
  duration: string;
  value: string;
}

interface VehicleHistoryTableProps {
  records: VehicleRecord[];
}

export function VehicleHistoryTable({ records }: VehicleHistoryTableProps) {
  return (
    <div className="rounded-md border bg-card overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-xs sm:text-sm whitespace-nowrap">Placa</TableHead>
            <TableHead className="text-xs sm:text-sm whitespace-nowrap">Tipo</TableHead>
            <TableHead className="text-xs sm:text-sm whitespace-nowrap">Vaga</TableHead>
            <TableHead className="text-xs sm:text-sm whitespace-nowrap">Entrada</TableHead>
            <TableHead className="text-xs sm:text-sm whitespace-nowrap">Saída</TableHead>
            <TableHead className="text-xs sm:text-sm whitespace-nowrap">Duração</TableHead>
            <TableHead className="text-xs sm:text-sm whitespace-nowrap">Valor</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {records.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center text-muted-foreground text-xs sm:text-sm py-8">
                Nenhum registro encontrado
              </TableCell>
            </TableRow>
          ) : (
            records.map((record, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium text-xs sm:text-sm whitespace-nowrap">{record.licensePlate}</TableCell>
                <TableCell className="whitespace-nowrap">
                  <Badge 
                    variant="secondary" 
                    className={cn(
                      "text-[10px] sm:text-xs",
                      record.type === "car" ? "bg-car-spot text-car-accent" : "bg-motorcycle-spot text-motorcycle-accent"
                    )}
                  >
                    {record.type === "car" ? (
                      <>
                        <Car className="h-2.5 w-2.5 sm:h-3 sm:w-3 mr-1" />
                        <span className="hidden sm:inline">Carro</span>
                        <span className="sm:hidden">Car</span>
                      </>
                    ) : (
                      <>
                        <Bike className="h-2.5 w-2.5 sm:h-3 sm:w-3 mr-1" />
                        <span className="hidden sm:inline">Moto</span>
                        <span className="sm:hidden">Mot</span>
                      </>
                    )}
                  </Badge>
                </TableCell>
                <TableCell className="text-xs sm:text-sm">{record.spot}</TableCell>
                <TableCell className="text-[10px] sm:text-xs text-muted-foreground whitespace-nowrap">
                  {record.entryTime}
                </TableCell>
                <TableCell className="text-[10px] sm:text-xs text-muted-foreground whitespace-nowrap">
                  {record.exitTime}
                </TableCell>
                <TableCell className="whitespace-nowrap">
                  <Badge variant="outline" className="text-[10px] sm:text-xs">{record.duration}</Badge>
                </TableCell>
                <TableCell className="whitespace-nowrap">
                  <span className="font-semibold text-xs sm:text-sm">{record.value}</span>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
