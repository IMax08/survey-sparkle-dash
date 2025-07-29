import { useState } from "react";
import { ChevronLeft, ChevronRight, Calendar, Clock, MapPin } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface CalendarEvent {
  id: string;
  title: string;
  time: string;
  location?: string;
  type: 'inspection' | 'meeting' | 'deadline';
  status: 'pending' | 'completed' | 'cancelled';
}

const MonthlyCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  console.log('[Dashboard] MonthlyCalendar rendered', { currentDate });

  // Mock events data
  const events: { [key: string]: CalendarEvent[] } = {
    '2024-01-15': [
      { id: '1', title: 'Inspeção Prédio Central', time: '09:00', location: 'São Paulo - SP', type: 'inspection', status: 'pending' },
      { id: '2', title: 'Reunião Cliente', time: '14:00', type: 'meeting', status: 'pending' }
    ],
    '2024-01-18': [
      { id: '3', title: 'Relatório Mensal', time: '10:00', type: 'deadline', status: 'completed' }
    ],
    '2024-01-22': [
      { id: '4', title: 'Inspeção Shopping Norte', time: '08:30', location: 'Campinas - SP', type: 'inspection', status: 'pending' }
    ]
  };

  const monthNames = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Juli', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];

  const dayNames = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const getDaysInMonth = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }
    
    return days;
  };

  const getEventKey = (day: number) => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
  };

  const getEventTypeColor = (type: CalendarEvent['type']) => {
    switch (type) {
      case 'inspection': return 'bg-primary';
      case 'meeting': return 'bg-status-warning';
      case 'deadline': return 'bg-status-danger';
      default: return 'bg-muted';
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Calendar - 64% */}
      <div className="lg:col-span-2">
        <Card className="p-6 bg-gradient-card border-border">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-foreground">
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h3>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigateMonth('prev')}
                className="w-8 h-8 rounded-lg hover:bg-muted"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigateMonth('next')}
                className="w-8 h-8 rounded-lg hover:bg-muted"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1">
            {/* Day Headers */}
            {dayNames.map(day => (
              <div key={day} className="p-2 text-center text-sm font-medium text-muted-foreground">
                {day}
              </div>
            ))}
            
            {/* Calendar Days */}
            {getDaysInMonth().map((day, index) => {
              if (!day) {
                return <div key={index} className="p-2"></div>;
              }

              const eventKey = getEventKey(day);
              const dayEvents = events[eventKey] || [];
              const isToday = new Date().getDate() === day && 
                           new Date().getMonth() === currentDate.getMonth() && 
                           new Date().getFullYear() === currentDate.getFullYear();

              return (
                <div 
                  key={day} 
                  className={`
                    p-2 min-h-[80px] border rounded-lg cursor-pointer
                    hover:bg-muted/50 transition-colors duration-200
                    ${isToday ? 'bg-primary/10 border-primary' : 'border-border'}
                  `}
                >
                  <div className={`
                    text-sm font-medium mb-1
                    ${isToday ? 'text-primary' : 'text-foreground'}
                  `}>
                    {day}
                  </div>
                  <div className="space-y-1">
                    {dayEvents.slice(0, 2).map(event => (
                      <div 
                        key={event.id}
                        className={`
                          text-xs px-2 py-1 rounded text-white truncate
                          ${getEventTypeColor(event.type)}
                        `}
                        title={event.title}
                      >
                        {event.title}
                      </div>
                    ))}
                    {dayEvents.length > 2 && (
                      <div className="text-xs text-muted-foreground px-2">
                        +{dayEvents.length - 2} mais
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      {/* Sidebar - 36% - Matching images exactly */}
      <div className="space-y-4">
        {/* Calendar Widget - matching the image exactly */}
        <Card className="p-4 bg-white border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold text-gray-800 text-sm">Agenda</h4>
            <Button variant="ghost" size="sm" className="text-xs text-gray-600">
              Ver +
            </Button>
          </div>
          
          {/* Month/Year header */}
          <div className="text-center mb-3">
            <span className="text-sm font-medium text-gray-800">Outubro</span>
          </div>
          
          {/* Day headers */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'].map(day => (
              <div key={day} className="text-center text-xs text-gray-500 py-1">
                {day}
              </div>
            ))}
          </div>
          
          {/* Calendar days - showing current week */}
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

        {/* Action Cards */}
        <Card className="p-4 bg-white border border-gray-200">
          <div className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded cursor-pointer">
            <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center">
              <span className="text-lg">📊</span>
            </div>
            <span className="text-sm font-medium text-gray-800">Gerar Relatórios</span>
            <span className="ml-auto text-gray-400">→</span>
          </div>
        </Card>

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

export default MonthlyCalendar;