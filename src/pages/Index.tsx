import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatsCard } from "@/components/StatsCard";
import { ParkingGrid } from "@/components/ParkingGrid";
import { VehicleHistoryTable } from "@/components/VehicleHistoryTable";
import { PlateInput } from "@/components/PlateInput";
import { 
  Search, 
  LayoutGrid, 
  Car, 
  Bike, 
  History, 
  DollarSign,
  TrendingUp,
  Clock,
  ChevronDown 
} from "lucide-react";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showMonthlyStats, setShowMonthlyStats] = useState(false);

  // Mock data - in a real app, this would come from a database
  const todayEarnings = 216.71;
  const todayExits = 2;
  const carSpotsOccupied = 0;
  const totalCarSpots = 30;
  const motorcycleSpotsOccupied = 0;
  const totalMotorcycleSpots = 30;
  const totalOccupied = carSpotsOccupied + motorcycleSpotsOccupied;
  const totalSpots = totalCarSpots + totalMotorcycleSpots;
  const averageStayMinutes = 650;

  const vehicleHistory = [
    {
      licensePlate: "SM03F33",
      type: "car" as const,
      spot: 1,
      entryTime: "22/11/25 06:23",
      exitTime: "22/11/25 09:10",
      duration: "2h 47min",
    },
    {
      licensePlate: "SMO-3210",
      type: "car" as const,
      spot: 2,
      entryTime: "21/11/25 11:42",
      exitTime: "22/11/25 06:35",
      duration: "18h 53min",
    },
  ];

  return (
    <div className="min-h-screen bg-background pb-4">
      <div className="container mx-auto px-3 sm:px-4 py-3 sm:py-4 max-w-7xl">
        {/* Header */}
        <div className="mb-4 sm:mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">Sistema de Estacionamento</h1>
          
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4 z-10" />
            <PlateInput
              placeholder="BUSCAR PLACA..."
              value={searchQuery}
              onChange={setSearchQuery}
              className="pl-10 h-11"
            />
          </div>
        </div>

        {/* Tabs Navigation */}
        <Tabs defaultValue="overview" className="space-y-4 sm:space-y-6">
          <TabsList className="grid w-full grid-cols-4 h-auto">
            <TabsTrigger value="overview" className="flex-col sm:flex-row gap-1 sm:gap-2 py-2 sm:py-2.5 text-xs sm:text-sm">
              <LayoutGrid className="h-4 w-4 sm:mr-0" />
              <span className="hidden sm:inline">Visão Geral</span>
              <span className="sm:hidden">Início</span>
            </TabsTrigger>
            <TabsTrigger value="cars" className="flex-col sm:flex-row gap-1 sm:gap-2 py-2 sm:py-2.5 text-xs sm:text-sm">
              <Car className="h-4 w-4 sm:mr-0" />
              <span>Carros</span>
            </TabsTrigger>
            <TabsTrigger value="motorcycles" className="flex-col sm:flex-row gap-1 sm:gap-2 py-2 sm:py-2.5 text-xs sm:text-sm">
              <Bike className="h-4 w-4 sm:mr-0" />
              <span>Motos</span>
            </TabsTrigger>
            <TabsTrigger value="history" className="flex-col sm:flex-row gap-1 sm:gap-2 py-2 sm:py-2.5 text-xs sm:text-sm">
              <History className="h-4 w-4 sm:mr-0" />
              <span className="hidden sm:inline">Histórico</span>
              <span className="sm:hidden">Hist.</span>
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-4 sm:space-y-6">
            {/* Today's Earnings Card */}
            <Card className="bg-earnings border-earnings-accent/20">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 sm:pb-2">
                <CardTitle className="text-xs sm:text-sm font-medium">Ganhos Hoje</CardTitle>
                <div className="p-1.5 sm:p-2 rounded-lg bg-earnings-accent text-white">
                  <DollarSign className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                </div>
              </CardHeader>
              <CardContent className="pb-4">
                <div className="text-2xl sm:text-3xl font-bold">R$ {todayEarnings.toFixed(2)}</div>
                <p className="text-[10px] sm:text-xs text-muted-foreground mt-1">{todayExits} saídas</p>
                
                <Button
                  variant="ghost"
                  size="sm"
                  className="mt-3 sm:mt-4 w-full justify-center text-xs"
                  onClick={() => setShowMonthlyStats(!showMonthlyStats)}
                >
                  <span>Ver mês/ano</span>
                  <ChevronDown className={`ml-2 h-3.5 w-3.5 sm:h-4 sm:w-4 transition-transform ${showMonthlyStats ? 'rotate-180' : ''}`} />
                </Button>
              </CardContent>
            </Card>

            {/* Stats Grid */}
            <div className="grid gap-3 sm:gap-4 grid-cols-2 lg:grid-cols-4">
              <StatsCard
                title="Carros Estacionados"
                value={`${carSpotsOccupied}/${totalCarSpots}`}
                subtitle={`${Math.round((carSpotsOccupied / totalCarSpots) * 100)}%`}
                icon={Car}
                colorScheme="car"
              />
              <StatsCard
                title="Motos Estacionadas"
                value={`${motorcycleSpotsOccupied}/${totalMotorcycleSpots}`}
                subtitle={`${Math.round((motorcycleSpotsOccupied / totalMotorcycleSpots) * 100)}%`}
                icon={Bike}
                colorScheme="motorcycle"
              />
              <StatsCard
                title="Total Ocupado"
                value={`${totalOccupied}/${totalSpots}`}
                subtitle={`${Math.round((totalOccupied / totalSpots) * 100)}%`}
                icon={TrendingUp}
                colorScheme="analytics"
              />
              <StatsCard
                title="Saídas Hoje"
                value={todayExits}
                subtitle={`Média: ${averageStayMinutes}min`}
                icon={Clock}
                colorScheme="earnings"
              />
            </div>

            {/* Pricing Table */}
            <Card className="bg-muted/30">
              <CardHeader className="pb-3 sm:pb-4">
                <CardTitle className="flex items-center text-base sm:text-lg">
                  <DollarSign className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                  Tabela de Preços
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 sm:space-y-4">
                <div className="flex items-center justify-between p-3 sm:p-4 bg-card rounded-lg">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="p-2 sm:p-3 rounded-lg bg-car-spot">
                      <Car className="h-4 w-4 sm:h-5 sm:w-5 text-car-accent" />
                    </div>
                    <span className="font-medium text-sm sm:text-base">Carro</span>
                  </div>
                  <span className="text-lg sm:text-xl font-bold">R$ 10,00/h</span>
                </div>
                
                <div className="flex items-center justify-between p-3 sm:p-4 bg-card rounded-lg">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="p-2 sm:p-3 rounded-lg bg-motorcycle-spot">
                      <Bike className="h-4 w-4 sm:h-5 sm:w-5 text-motorcycle-accent" />
                    </div>
                    <span className="font-medium text-sm sm:text-base">Moto</span>
                  </div>
                  <span className="text-lg sm:text-xl font-bold">R$ 7,00/h</span>
                </div>
                
                <p className="text-[10px] sm:text-xs text-muted-foreground flex items-center gap-2 pt-2">
                  <Clock className="h-3 w-3 flex-shrink-0" />
                  <span>Cobrança proporcional ao tempo de permanência</span>
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Cars Tab */}
          <TabsContent value="cars">
            <Card>
              <CardHeader className="pb-3 sm:pb-4">
                <CardTitle className="flex items-center text-base sm:text-lg">
                  <Car className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-car-accent" />
                  Vagas de Carros (1-30)
                </CardTitle>
              </CardHeader>
              <CardContent className="px-3 sm:px-6">
                <ParkingGrid
                  startNumber={1}
                  endNumber={30}
                  type="car"
                  occupiedSpots={new Set()}
                />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Motorcycles Tab */}
          <TabsContent value="motorcycles">
            <Card>
              <CardHeader className="pb-3 sm:pb-4">
                <CardTitle className="flex items-center text-base sm:text-lg">
                  <Bike className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-motorcycle-accent" />
                  Vagas de Motos (31-60)
                </CardTitle>
              </CardHeader>
              <CardContent className="px-3 sm:px-6">
                <ParkingGrid
                  startNumber={31}
                  endNumber={60}
                  type="motorcycle"
                  occupiedSpots={new Set()}
                />
              </CardContent>
            </Card>
          </TabsContent>

          {/* History Tab */}
          <TabsContent value="history" className="space-y-4">
            <Card>
              <CardHeader className="pb-3 sm:pb-4">
                <CardTitle className="flex items-center text-base sm:text-lg">
                  <History className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-analytics-accent" />
                  Histórico de Veículos
                </CardTitle>
              </CardHeader>
              <CardContent className="px-3 sm:px-6">
                <div className="mb-3 sm:mb-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4 z-10" />
                    <PlateInput
                      placeholder="BUSCAR PLACA..."
                      value={searchQuery}
                      onChange={setSearchQuery}
                      className="pl-10 h-11"
                    />
                  </div>
                </div>
                <VehicleHistoryTable records={vehicleHistory} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
