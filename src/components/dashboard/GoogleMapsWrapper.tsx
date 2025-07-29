import React, { useRef, useEffect, useState } from 'react';
import { Wrapper, Status } from '@googlemaps/react-wrapper';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

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

interface GoogleMapProps {
  pins: MapPin[];
  onPinClick: (pin: MapPin) => void;
  className?: string;
}

const GoogleMapComponent: React.FC<GoogleMapProps> = ({ pins, onPinClick, className }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);

  useEffect(() => {
    if (ref.current && !map) {
      const newMap = new google.maps.Map(ref.current, {
        center: { lat: -22.9068, lng: -43.1729 }, // Rio de Janeiro, RJ
        zoom: 11,
        mapTypeId: 'roadmap',
        styles: [
          {
            featureType: 'poi',
            elementType: 'labels',
            stylers: [{ visibility: 'off' }]
          }
        ]
      });
      setMap(newMap);
    }
  }, [ref, map]);

  useEffect(() => {
    if (map && pins.length > 0) {
      // Clear existing markers
      const markers: google.maps.Marker[] = [];

      pins.forEach((pin) => {
        const pinColor = pin.status === 'pending' ? '#F59E0B' : 
                        pin.status === 'completed' ? '#10B981' : '#EF4444';

        const marker = new google.maps.Marker({
          position: { lat: pin.lat, lng: pin.lng },
          map: map,
          title: pin.title,
          icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 8,
            fillColor: pinColor,
            fillOpacity: 1,
            strokeWeight: 2,
            strokeColor: '#FFFFFF'
          }
        });

        const infoWindow = new google.maps.InfoWindow({
          content: `
            <div class="p-2">
              <h4 class="font-semibold text-gray-800 text-sm mb-1">${pin.title}</h4>
              <p class="text-xs text-gray-600 mb-1">${pin.client}</p>
              <p class="text-xs text-gray-500">${pin.address}</p>
              <div class="mt-2 text-xs">
                <span class="px-2 py-1 rounded text-white" style="background-color: ${pinColor}">
                  ${pin.status === 'pending' ? 'Em Aberto' : 
                    pin.status === 'completed' ? 'Executada' : 'Atrasada'}
                </span>
              </div>
            </div>
          `
        });

        marker.addListener('click', () => {
          infoWindow.open(map, marker);
          onPinClick(pin);
        });

        markers.push(marker);
      });

      return () => {
        markers.forEach(marker => marker.setMap(null));
      };
    }
  }, [map, pins, onPinClick]);

  return <div ref={ref} className={className} />;
};

const render = (status: Status) => {
  switch (status) {
    case Status.LOADING:
      return <div className="flex items-center justify-center h-full">Carregando mapa...</div>;
    case Status.FAILURE:
      return <div className="flex items-center justify-center h-full text-red-500">Erro ao carregar mapa</div>;
    case Status.SUCCESS:
      return null;
    default:
      return null;
  }
};

interface GoogleMapsWrapperProps {
  pins: MapPin[];
  onPinClick: (pin: MapPin) => void;
  className?: string;
}

const GoogleMapsWrapper: React.FC<GoogleMapsWrapperProps> = ({ pins, onPinClick, className }) => {
  const DEFAULT_API_KEY = 'AIzaSyAYBljV-NEoj2A4EbvYxS7gtXaFEn8ruAo';
  const [apiKey, setApiKey] = useState<string>(DEFAULT_API_KEY);
  const [hasValidKey, setHasValidKey] = useState(true);
  const [initializedKey, setInitializedKey] = useState<string>(DEFAULT_API_KEY);

  useEffect(() => {
    // Check localStorage for saved API key, otherwise use default
    const savedKey = localStorage.getItem('googleMapsApiKey') || DEFAULT_API_KEY;
    if (savedKey !== apiKey) {
      setApiKey(savedKey);
      setHasValidKey(true);
      // If we already initialized with a different key, reload the page
      if (initializedKey && initializedKey !== savedKey) {
        window.location.reload();
        return;
      }
      setInitializedKey(savedKey);
    }
  }, [apiKey, initializedKey]);

  const handleSaveApiKey = () => {
    if (apiKey.trim()) {
      localStorage.setItem('googleMapsApiKey', apiKey.trim());
      setHasValidKey(true);
      toast.success('API Key do Google Maps salva com sucesso!');
    } else {
      toast.error('Por favor, insira uma API Key válida');
    }
  };

  const handleRemoveApiKey = () => {
    localStorage.removeItem('googleMapsApiKey');
    setApiKey('');
    setHasValidKey(false);
    toast.info('API Key removida');
    // Reload page to clear the Google Maps loader
    setTimeout(() => window.location.reload(), 1000);
  };

  if (!hasValidKey) {
    return (
      <div className={`flex flex-col items-center justify-center bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 ${className}`}>
        <div className="max-w-md p-6 text-center">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Configure o Google Maps</h3>
          <p className="text-sm text-gray-600 mb-4">
            Para usar o Google Maps, você precisa de uma API Key. 
            <a 
              href="https://developers.google.com/maps/documentation/javascript/get-api-key" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline ml-1"
            >
              Clique aqui para obter uma
            </a>
          </p>
          
          <div className="space-y-3">
            <Input
              type="text"
              placeholder="Cole sua API Key do Google Maps aqui"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="w-full"
            />
            <div className="flex space-x-2">
              <Button 
                onClick={handleSaveApiKey}
                className="flex-1 bg-blue-600 hover:bg-blue-700"
                disabled={!apiKey.trim()}
              >
                Salvar API Key
              </Button>
            </div>
          </div>

          <div className="mt-4 p-3 bg-yellow-50 rounded border border-yellow-200">
            <p className="text-xs text-yellow-800">
              <strong>Nota:</strong> A API Key será salva localmente no seu navegador para conveniência. 
              Para produção, recomendamos usar variáveis de ambiente seguras.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <Wrapper apiKey={apiKey} render={render} libraries={['marker']}>
        <GoogleMapComponent pins={pins} onPinClick={onPinClick} className={className} />
      </Wrapper>
      
      {/* API Key Management */}
      <div className="absolute top-2 right-2 z-10">
        <Button
          variant="outline"
          size="sm"
          onClick={handleRemoveApiKey}
          className="bg-white/90 hover:bg-white text-xs"
        >
          Trocar API Key
        </Button>
      </div>
    </div>
  );
};

export default GoogleMapsWrapper;