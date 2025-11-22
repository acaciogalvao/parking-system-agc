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

interface VehicleRecord {
  licensePlate: string;
  type: "car" | "motorcycle";
  spot: number;
  entryTime: string;
  exitTime: string;
  duration: string;
}

interface VehicleHistoryTableProps {
  records: VehicleRecord[];
}

export function VehicleHistoryTable({ records }: VehicleHistoryTableProps) {
  return (
    <div className="rounded-md border bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Placa</TableHead>
            <TableHead>Tipo</TableHead>
            <TableHead>Vaga</TableHead>
            <TableHead>Entrada</TableHead>
            <TableHead>Saída</TableHead>
            <TableHead>Duração</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {records.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center text-muted-foreground">
                Nenhum registro encontrado
              </TableCell>
            </TableRow>
          ) : (
            records.map((record, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{record.licensePlate}</TableCell>
                <TableCell>
                  <Badge 
                    variant="secondary" 
                    className={record.type === "car" ? "bg-car-spot text-car-accent" : "bg-motorcycle-spot text-motorcycle-accent"}
                  >
                    {record.type === "car" ? (
                      <>
                        <Car className="h-3 w-3 mr-1" />
                        Carro
                      </>
                    ) : (
                      <>
                        <Bike className="h-3 w-3 mr-1" />
                        Moto
                      </>
                    )}
                  </Badge>
                </TableCell>
                <TableCell>{record.spot}</TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {record.entryTime}
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {record.exitTime}
                </TableCell>
                <TableCell>
                  <Badge variant="outline">{record.duration}</Badge>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
