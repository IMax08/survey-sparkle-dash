import { useState } from "react";
import { MapPin, Filter, Maximize2, X, Calendar, Clock, User } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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
  const [filters, setFilters] = useState({
    client: '',
    status: '',
    type: ''
  });

  console.log('[Dashboard] InteractiveMap rendered', { selectedPin, filters });

  // Mock map pins data
  const mapPins: MapPin[] = [
    {
      id: '1',
      lat: -23.5505,
      lng: -46.6333,
      title: 'Inspeção Prédio Central',
      type: 'inspection',
      status: 'pending',
      client: 'Empresa ABC Ltda',
      date: '2024-01-15',
      time: '09:00',
      address: 'Av. Paulista, 1000 - São Paulo, SP'
    },
    {
      id: '2',
      lat: -23.5615,
      lng: -46.6565,
      title: 'Nota Técnica - Estrutura',
      type: 'note',
      status: 'completed',
      client: 'Construtora XYZ',
      date: '2024-01-12',
      time: '14:30',
      address: 'Rua Augusta, 500 - São Paulo, SP'
    },
    {
      id: '3',
      lat: -23.5489,
      lng: -46.6388,
      title: 'Inspeção Shopping Norte',
      type: 'inspection',
      status: 'pending',
      client: 'Shopping Norte S.A.',
      date: '2024-01-18',
      time: '08:30',
      address: 'Al. Santos, 2000 - São Paulo, SP'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-status-warning';
      case 'completed': return 'bg-status-success';
      case 'cancelled': return 'bg-status-danger';
      default: return 'bg-muted';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'pending': return 'Pendente';
      case 'completed': return 'Concluído';
      case 'cancelled': return 'Cancelado';
      default: return status;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'inspection': return 'Inspeção';
      case 'note': return 'Nota';
      default: return type;
    }
  };

  const MapComponent = () => (
    <div className="relative w-full h-full bg-gradient-to-br from-primary/5 to-primary/10 rounded-lg overflow-hidden">
      {/* Placeholder for Google Maps */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <MapPin className="w-12 h-12 text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Mapa Google será integrado aqui</p>
          <p className="text-sm text-muted-foreground mt-2">
            {mapPins.length} pins no mapa
          </p>
        </div>
      </div>

      {/* Mock pins */}
      {mapPins.map((pin, index) => (
        <button
          key={pin.id}
          onClick={() => setSelectedPin(pin)}
          className={`
            absolute w-6 h-6 rounded-full border-2 border-white shadow-lg
            hover:scale-110 transition-transform duration-200 z-10
            ${getStatusColor(pin.status)}
          `}
          style={{
            left: `${20 + (index * 15)}%`,
            top: `${30 + (index * 10)}%`
          }}
          title={pin.title}
        >
          <MapPin className="w-3 h-3 text-white" />
        </button>
      ))}

      {/* Selected Pin Info */}
      {selectedPin && (
        <Card className="absolute bottom-4 left-4 right-4 p-4 bg-card/95 backdrop-blur-sm border-border animate-fade-in">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <Badge variant="secondary" className="text-xs">
                  {getTypeLabel(selectedPin.type)}
                </Badge>
                <Badge 
                  className={`text-xs text-white ${getStatusColor(selectedPin.status)}`}
                >
                  {getStatusLabel(selectedPin.status)}
                </Badge>
              </div>
              <h4 className="font-semibold text-foreground mb-1">{selectedPin.title}</h4>
              <p className="text-sm text-muted-foreground mb-2">{selectedPin.client}</p>
              <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                <div className="flex items-center">
                  <Calendar className="w-3 h-3 mr-1" />
                  {new Date(selectedPin.date).toLocaleDateString('pt-BR')}
                </div>
                <div className="flex items-center">
                  <Clock className="w-3 h-3 mr-1" />
                  {selectedPin.time}
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-1">{selectedPin.address}</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSelectedPin(null)}
              className="w-6 h-6 text-muted-foreground hover:text-foreground"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </Card>
      )}
    </div>
  );

  return (
    <Card className="p-6 bg-gradient-card border-border">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Mapa de Inspeções</h3>
        
        <div className="flex items-center space-x-2">
          {/* Filters Dialog */}
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="flex items-center space-x-2">
                <Filter className="w-4 h-4" />
                <span>Filtros</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Filtros do Mapa</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Cliente
                  </label>
                  <Select value={filters.client} onValueChange={(value) => setFilters(prev => ({ ...prev, client: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Todos os clientes" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Todos os clientes</SelectItem>
                      <SelectItem value="empresa-abc">Empresa ABC Ltda</SelectItem>
                      <SelectItem value="construtora-xyz">Construtora XYZ</SelectItem>
                      <SelectItem value="shopping-norte">Shopping Norte S.A.</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Status
                  </label>
                  <Select value={filters.status} onValueChange={(value) => setFilters(prev => ({ ...prev, status: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Todos os status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Todos os status</SelectItem>
                      <SelectItem value="pending">Pendente</SelectItem>
                      <SelectItem value="completed">Concluído</SelectItem>
                      <SelectItem value="cancelled">Cancelado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Tipo
                  </label>
                  <Select value={filters.type} onValueChange={(value) => setFilters(prev => ({ ...prev, type: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Todos os tipos" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Todos os tipos</SelectItem>
                      <SelectItem value="inspection">Inspeções</SelectItem>
                      <SelectItem value="note">Notas</SelectItem>
                    </SelectContent>
                  </Select>
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