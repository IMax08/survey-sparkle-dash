import { useState } from "react";
import { MapPin, Filter, Maximize2, X, Calendar, Clock, User, Settings } from "lucide-react";
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
    // More pins distributed across the map
    ...Array.from({ length: 20 }, (_, i) => ({
      id: `pin-${i + 2}`,
      lat: -23.5505 + (Math.random() - 0.5) * 0.1,
      lng: -46.6333 + (Math.random() - 0.5) * 0.1,
      title: `Local ${i + 2}`,
      type: 'inspection' as const,
      status: ['pending', 'completed', 'cancelled'][Math.floor(Math.random() * 3)] as 'pending' | 'completed' | 'cancelled',
      client: `Cliente ${i + 2}`,
      date: '2025-01-15',
      time: '10:00',
      address: `Endereço ${i + 2}`
    }))
  ];

  const MapComponent = () => (
    <div className="relative w-full h-full rounded-lg overflow-hidden" 
         style={{ 
           backgroundImage: `linear-gradient(to bottom right, #e0f2fe, #b3e5fc)`,
           minHeight: '500px'
         }}>
      {/* Simulated Google Maps background */}
      <div className="absolute inset-0 opacity-20"
           style={{
             backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23999' opacity='0.1'%3E%3Cpath d='M0 0h100v100H0z'/%3E%3Cpath d='M20 20h60v60H20z' fill='none' stroke='%23666' stroke-width='1'/%3E%3C/g%3E%3C/svg%3E")`
           }}>
      </div>
      
      {/* Location text labels */}
      <div className="absolute top-4 left-4 text-sm font-medium text-gray-700">NAVEGANTES</div>
      <div className="absolute top-20 right-20 text-sm font-medium text-gray-700">RUBEM BERTA</div>
      <div className="absolute bottom-20 left-20 text-sm font-medium text-gray-700">CENTRO HISTÓRICO</div>
      <div className="absolute bottom-20 right-20 text-sm font-medium text-gray-700">TRÊS FIG</div>
      <div className="absolute top-1/2 left-1/3 text-sm font-medium text-gray-700">SÃO GERALDO</div>
      <div className="absolute top-1/2 right-1/4 text-sm font-medium text-gray-700">JARDIM ITU</div>
      
      {/* Map pins distributed across the map */}
      {mapPins.map((pin, index) => {
        const pinColor = pin.status === 'pending' ? '#F59E0B' : 
                        pin.status === 'completed' ? '#10B981' : '#EF4444';
        
        // Distribute pins more naturally across the map
        const positions = [
          { left: '15%', top: '25%' }, { left: '25%', top: '35%' }, { left: '35%', top: '25%' },
          { left: '45%', top: '40%' }, { left: '55%', top: '30%' }, { left: '65%', top: '45%' },
          { left: '75%', top: '35%' }, { left: '20%', top: '55%' }, { left: '30%', top: '65%' },
          { left: '40%', top: '70%' }, { left: '50%', top: '60%' }, { left: '60%', top: '75%' },
          { left: '70%', top: '65%' }, { left: '80%', top: '55%' }, { left: '85%', top: '70%' },
          { left: '25%', top: '80%' }, { left: '45%', top: '85%' }, { left: '65%', top: '90%' },
          { left: '75%', top: '80%' }, { left: '90%', top: '60%' }, { left: '10%', top: '70%' }
        ];
        
        const position = positions[index] || { left: '50%', top: '50%' };
        
        return (
          <button
            key={pin.id}
            onClick={() => setSelectedPin(pin)}
            className="absolute w-4 h-4 rounded-full border-2 border-white shadow-lg 
                      hover:scale-125 transition-all duration-200 z-10 cursor-pointer"
            style={{
              backgroundColor: pinColor,
              left: position.left,
              top: position.top,
              boxShadow: '0 2px 8px rgba(0,0,0,0.3)'
            }}
            title={pin.title}
          />
        );
      })}

      {/* Map controls */}
      <div className="absolute top-4 left-4 bg-white rounded-lg p-2 shadow-lg">
        <button className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center mb-1">
          <Settings className="w-4 h-4 text-gray-600" />
        </button>
        <button className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center">
          <Maximize2 className="w-4 h-4 text-gray-600" />
        </button>
      </div>

      {/* Status Legend - exactly as in image */}
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
        <button className="w-full mt-3 bg-gray-800 text-white text-xs py-2 px-4 rounded hover:bg-gray-700 transition-colors">
          Ver +
        </button>
      </div>

      {/* Selected Pin Tooltip */}
      {selectedPin && (
        <div className="absolute bg-white rounded-lg p-3 shadow-lg border max-w-xs z-20"
             style={{
               left: '45%',
               top: '30%',
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
          {/* Arrow pointing down */}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1">
            <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white"></div>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* Map - Takes 3 columns (75% width) */}
      <div className="lg:col-span-3">
        <Card className="p-6 bg-white border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-800">Mapa de Inspeções</h3>
            
            <div className="flex items-center space-x-2">
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
                      <label className="text-sm font-medium text-gray-800 mb-2 block">
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
                      <label className="text-sm font-medium text-gray-800 mb-2 block">
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
                      <label className="text-sm font-medium text-gray-800 mb-2 block">
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

          <div className="h-96">
            <MapComponent />
          </div>
        </Card>
      </div>

      {/* Sidebar - Takes 1 column (25% width) - Exactly as in image */}
      <div className="space-y-4">
        {/* Calendar Widget */}
        <Card className="p-4 bg-white border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold text-gray-800 text-sm">Agenda</h4>
            <Button variant="ghost" size="sm" className="text-xs text-gray-600">
              Ver +
            </Button>
          </div>
          
          <div className="text-center mb-3">
            <span className="text-sm font-medium text-gray-800">Outubro</span>
          </div>
          
          <div className="grid grid-cols-7 gap-1 mb-2">
            {['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'].map(day => (
              <div key={day} className="text-center text-xs text-gray-500 py-1">
                {day}
              </div>
            ))}
          </div>
          
          <div className="grid grid-cols-7 gap-1">
            {[28, 29, 30, 31, 1, 2, 3].map((day, index) => (
              <div 
                key={index}
                className={`
                  text-center text-xs p-2 cursor-pointer rounded
                  ${day <= 3 && index >= 4 ? 'text-gray-800 hover:bg-gray-100' : 'text-gray-400'}
                  ${day === 31 ? 'bg-blue-500 text-white' : ''}
                `}
              >
                {day}
              </div>
            ))}
            {[4, 5, 6, 7, 8, 9, 10].map((day, index) => (
              <div 
                key={index + 7}
                className="text-center text-xs p-2 cursor-pointer rounded text-gray-800 hover:bg-gray-100"
              >
                {day}
              </div>
            ))}
          </div>
        </Card>

        {/* Gerar Relatórios Card */}
        <Card className="p-4 bg-white border border-gray-200">
          <div className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded cursor-pointer">
            <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center">
              <span className="text-lg">📊</span>
            </div>
            <span className="text-sm font-medium text-gray-800">Gerar Relatórios</span>
            <span className="ml-auto text-gray-400">→</span>
          </div>
        </Card>

        {/* Novo Formulário Card */}
        <Card className="p-4 bg-white border border-gray-200">
          <div className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded cursor-pointer">
            <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center">
              <span className="text-lg">📝</span>
            </div>
            <span className="text-sm font-medium text-gray-800">Novo Formulário</span>
            <span className="ml-auto text-gray-400">→</span>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default InteractiveMap;