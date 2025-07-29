import { useState } from "react";
import { MapPin, Filter, Maximize2, X, Calendar, Clock, User } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface MapPin {
  id: string;
  lat: number;
  lng: number;
  title: string;
  type: 'inspection' | 'note';
  status: 'pending' | 'completed' | 'cancelled';
  client: string;
  date: string;
  time: string;
  address: string;
}

const InteractiveMap = () => {
  const [selectedPin, setSelectedPin] = useState<MapPin | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  console.log('[Dashboard] InteractiveMap rendered', { selectedPin });

  // Mock map pins data - matching the images exactly
  const mapPins: MapPin[] = [
    {
      id: '1',
      lat: -23.5505,
      lng: -46.6333,
      title: 'Brava',
      type: 'inspection',
      status: 'pending',
      client: 'Subsolo | Estimar | 12',
      date: '2025-01-04',
      time: '09:00',
      address: 'Planajado 04/01/2025 - Aceito: Nome Usuário'
    },
    {
      id: '2',
      lat: -23.5615,
      lng: -46.6565,
      title: 'Inspeção Hospital',
      type: 'inspection',
      status: 'cancelled',
      client: 'Hospital Divino',
      date: '2025-01-12',
      time: '14:30',
      address: 'Rede de Saúde'
    },
    {
      id: '3',
      lat: -23.5489,
      lng: -46.6388,
      title: 'Shopping Center',
      type: 'inspection',
      status: 'completed',
      client: 'Bourbon Shopping',
      date: '2025-01-18',
      time: '08:30',
      address: 'Shopping Wallig'
    },
    {
      id: '4',
      lat: -23.5320,
      lng: -46.6400,
      title: 'Parque Natural',
      type: 'inspection',
      status: 'pending',
      client: 'Municipal Saint-Claire',
      date: '2025-01-20',
      time: '10:00',
      address: 'Parque Natural Municipal'
    },
    {
      id: '5',
      lat: -23.5550,
      lng: -46.6200,
      title: 'Academia Smart Fit',
      type: 'inspection',
      status: 'completed',
      client: 'Bourbon Shopping Ipiranga',
      date: '2025-01-15',
      time: '16:00',
      address: 'Shopping Ipiranga'
    }
  ];

  const MapComponent = () => (
    <div className="relative w-full h-full bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg overflow-hidden">
      {/* Real Google Maps style background */}
      <div className="absolute inset-0" 
           style={{
             backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ddd' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
             backgroundColor: '#f8fafc'
           }}>
      </div>
      
      {/* Map pins exactly as in images */}
      {mapPins.map((pin, index) => {
        const pinColor = pin.status === 'pending' ? '#F59E0B' : 
                        pin.status === 'completed' ? '#10B981' : '#EF4444';
        
        return (
          <button
            key={pin.id}
            onClick={() => setSelectedPin(pin)}
            className={`absolute w-4 h-4 rounded-full border-2 border-white shadow-lg 
                      hover:scale-125 transition-all duration-200 z-10 cursor-pointer`}
            style={{
              backgroundColor: pinColor,
              left: `${15 + (index * 18)}%`,
              top: `${25 + (index * 12)}%`,
              boxShadow: '0 2px 8px rgba(0,0,0,0.3)'
            }}
            title={pin.title}
          />
        );
      })}

      {/* Status Legend - matching image exactly */}
      <div className="absolute bottom-4 left-4 bg-white rounded-lg p-4 shadow-lg border">
        <h4 className="font-semibold text-gray-800 mb-3 text-sm">Status Inspeções</h4>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 rounded-full bg-yellow-500"></div>
            <span className="text-xs text-gray-600">Em Aberto</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 rounded-full bg-green-500"></div>
            <span className="text-xs text-gray-600">Executadas</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 rounded-full bg-red-500"></div>
            <span className="text-xs text-gray-600">Atrasadas</span>
          </div>
        </div>
        <button className="w-full mt-3 bg-gray-800 text-white text-xs py-2 px-4 rounded">
          Ver +
        </button>
      </div>

      {/* Selected Pin Tooltip - matching the "Brava" tooltip in images */}
      {selectedPin && (
        <div className="absolute bg-white rounded-lg p-3 shadow-lg border max-w-xs z-20"
             style={{
               left: '40%',
               top: '35%',
               transform: 'translate(-50%, -100%)'
             }}>
          <div className="flex items-start justify-between mb-2">
            <h4 className="font-semibold text-gray-800 text-sm">{selectedPin.title}</h4>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSelectedPin(null)}
              className="w-4 h-4 text-gray-400 hover:text-gray-600 ml-2"
            >
              <X className="w-3 h-3" />
            </Button>
          </div>
          <p className="text-xs text-gray-600 mb-1">{selectedPin.client}</p>
          <p className="text-xs text-gray-500">{selectedPin.address}</p>
          {/* Small arrow pointing down */}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1">
            <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white"></div>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <Card className="p-6 bg-gradient-card border-border">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Mapa de Inspeções</h3>
        
        <div className="flex items-center space-x-2">
          {/* Filters Dialog - matching images exactly */}
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="flex items-center space-x-2">
                <Filter className="w-4 h-4" />
                <span>Filtros</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Configurações do Mapa</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Filtro por cliente
                  </label>
                  <div className="flex items-center space-x-2 text-sm text-green-600">
                    <span className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </span>
                    <span>Brava</span>
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Filtro por Status
                  </label>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" checked className="w-4 h-4 text-green-500" />
                      <span className="text-sm">Em Aberto</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="w-4 h-4" />
                      <span className="text-sm">Executados</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="w-4 h-4" />
                      <span className="text-sm">Atrasados</span>
                    </label>
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Visualização de:
                  </label>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" checked className="w-4 h-4 text-green-500" />
                      <span className="text-sm">Mostrar Inspeções</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="w-4 h-4" />
                      <span className="text-sm">Mostrar Notas de Manutenção</span>
                    </label>
                  </div>
                </div>

                <div className="flex flex-col space-y-2 pt-4">
                  <Button className="w-full bg-gray-800 hover:bg-gray-700 text-white">
                    Aplicar Filtros
                  </Button>
                  <Button variant="outline" className="w-full">
                    Cancelar
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          {/* Fullscreen Dialog */}
          <Dialog open={isFullscreen} onOpenChange={setIsFullscreen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="flex items-center space-x-2">
                <Maximize2 className="w-4 h-4" />
                <span>Expandir</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-7xl w-full h-[90vh] p-0">
              <DialogHeader className="p-6 pb-0">
                <DialogTitle>Mapa Completo - Inspeções e Notas</DialogTitle>
              </DialogHeader>
              <div className="flex-1 p-6 pt-0">
                <div className="h-full">
                  <MapComponent />
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Map Container */}
      <div className="h-96">
        <MapComponent />
      </div>
    </Card>
  );
};

export default InteractiveMap;