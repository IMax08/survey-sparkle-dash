import { useState } from "react";
import { MapPin, Filter, Maximize2, X, Calendar, Clock, User, Settings } from "lucide-react";
import GoogleMapsWrapper from "./GoogleMapsWrapper";
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

  // Supermercados Zaffari reais em Porto Alegre
  const mapPins: MapPin[] = [
    {
      id: '1',
      lat: -30.0277,
      lng: -51.2287,
      title: 'Zaffari Menino Deus',
      type: 'inspection',
      status: 'pending',
      client: 'Zaffari Menino Deus',
      date: '2025-01-04',
      time: '09:00',
      address: 'Rua Múcio Teixeira, 680 - Menino Deus'
    },
    {
      id: '2',
      lat: -30.1086,
      lng: -51.1978,
      title: 'Zaffari Cavalhada',
      type: 'inspection',
      status: 'completed',
      client: 'Zaffari Cavalhada',
      date: '2025-01-03',
      time: '14:00',
      address: 'Av. da Cavalhada, 3621 - Cavalhada'
    },
    {
      id: '3',
      lat: -30.0194,
      lng: -51.1982,
      title: 'Zaffari Higienópolis',
      type: 'inspection',
      status: 'cancelled',
      client: 'Zaffari Higienópolis',
      date: '2025-01-02',
      time: '10:30',
      address: 'Av. Plínio Brasil Milano, 1000 - Higienópolis'
    },
    {
      id: '4',
      lat: -30.0135,
      lng: -51.2065,
      title: 'Zaffari Lucas de Oliveira',
      type: 'inspection',
      status: 'pending',
      client: 'Zaffari Lucas de Oliveira',
      date: '2025-01-05',
      time: '08:30',
      address: 'Av. Coronel Lucas de Oliveira, 740 - Bela Vista'
    },
    {
      id: '5',
      lat: -29.9977,
      lng: -51.1754,
      title: 'Zaffari Centro',
      type: 'inspection',
      status: 'completed',
      client: 'Zaffari Centro',
      date: '2025-01-01',
      time: '16:00',
      address: 'Rua dos Andradas, 1001 - Centro Histórico'
    }
  ];

  const MapComponent = () => (
    <div className="relative w-full h-full rounded-lg overflow-hidden">
      <GoogleMapsWrapper 
        pins={mapPins}
        onPinClick={setSelectedPin}
        className="w-full h-full min-h-[600px] rounded-lg"
      />
      
      {/* Status Legend - overlay on Google Maps */}
      <div className="absolute bottom-4 left-4 bg-white rounded-lg p-4 shadow-lg border z-10">
        <h4 className="font-semibold text-gray-800 mb-3 text-sm">Status Inspeções</h4>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 rounded-full" style={{ backgroundColor: '#fbd280' }}></div>
              <span className="text-xs text-gray-600">Em Aberto</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 rounded-full" style={{ backgroundColor: '#22c55e' }}></div>
              <span className="text-xs text-gray-600">Executadas</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 rounded-full" style={{ backgroundColor: '#ef4444' }}></div>
              <span className="text-xs text-gray-600">Atrasadas</span>
            </div>
          </div>
        <button className="w-full mt-3 bg-gray-800 text-white text-xs py-2 px-4 rounded hover:bg-gray-700 transition-colors">
          Ver +
        </button>
      </div>
    </div>
  );

  return (
    <Card className="p-4 sm:p-6 bg-white border border-gray-200 rounded-xl sm:rounded-2xl">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-6 space-y-3 sm:space-y-0">
        <h3 className="text-base sm:text-lg font-semibold text-gray-800">Mapa</h3>
        
        <div className="flex items-center space-x-2 w-full sm:w-auto">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="flex items-center space-x-2 text-gray-600 border-gray-300 flex-1 sm:flex-initial justify-center">
                <Settings className="w-4 h-4" />
                <span className="hidden sm:inline">Configurações</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Configurações do Mapa</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-800 mb-2 block">
                    Filtro por cliente
                  </label>
                  <div className="flex items-center space-x-2 text-sm">
                    <span className="w-4 h-4 rounded-full flex items-center justify-center" style={{ backgroundColor: '#B8E2C8' }}>
                      <span className="text-white text-xs">✓</span>
                    </span>
                    <span>Zaffari</span>
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-800 mb-2 block">
                    Filtro por Status
                  </label>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" defaultChecked className="w-4 h-4" style={{ accentColor: '#FFE8AC' }} />
                      <span className="text-sm">Em Aberto</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="w-4 h-4" style={{ accentColor: '#B8E2C8' }} />
                      <span className="text-sm">Executadas</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="w-4 h-4" style={{ accentColor: '#F4C7C7' }} />
                      <span className="text-sm">Atrasadas</span>
                    </label>
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-800 mb-2 block">
                    Visualização de:
                  </label>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" defaultChecked className="w-4 h-4" style={{ accentColor: '#B8E2C8' }} />
                      <span className="text-sm">Mostrar Inspeções</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="w-4 h-4" />
                      <span className="text-sm">Mostrar Notas de Manutenção</span>
                    </label>
                  </div>
                </div>

                <div className="flex flex-col space-y-2 pt-4">
                  <Button className="w-full" style={{ backgroundColor: '#A8D5EB', color: '#0F172A' }}>
                    Aplicar Filtros
                  </Button>
                  <Button variant="outline" className="w-full">
                    Cancelar
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="h-[500px] sm:h-[600px] lg:h-[650px] w-full">
        <MapComponent />
      </div>
    </Card>
  );
};

export default InteractiveMap;