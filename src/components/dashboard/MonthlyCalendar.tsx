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

  const quickActions = [
    { label: 'Hoje', action: () => setCurrentDate(new Date()) },
    { label: 'Próximas Inspeções', action: () => console.log('Navigate to inspections') },
    { label: 'Relatórios Pendentes', action: () => console.log('Navigate to reports') }
  ];

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

      {/* Sidebar - 36% */}
      <div className="space-y-6">
        {/* Quick Actions */}
        <Card className="p-4 bg-gradient-card border-border">
          <h4 className="font-semibold text-foreground mb-4">Ações Rápidas</h4>
          <div className="space-y-2">
            {quickActions.map((action, index) => (
              <Button
                key={index}
                variant="ghost"
                size="sm"
                onClick={action.action}
                className="w-full justify-start text-left hover:bg-muted"
              >
                {action.label}
              </Button>
            ))}
          </div>
        </Card>

        {/* Today's Events */}
        <Card className="p-4 bg-gradient-card border-border">
          <h4 className="font-semibold text-foreground mb-4 flex items-center">
            <Calendar className="w-4 h-4 mr-2" />
            Hoje
          </h4>
          <div className="space-y-3">
            <div className="p-3 bg-primary/5 rounded-lg border border-primary/20">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">Inspeção Prédio Central</p>
                  <div className="flex items-center text-xs text-muted-foreground mt-1">
                    <Clock className="w-3 h-3 mr-1" />
                    09:00
                    <MapPin className="w-3 h-3 ml-2 mr-1" />
                    São Paulo - SP
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-3 bg-status-warning/5 rounded-lg border border-status-warning/20">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-status-warning rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">Reunião Cliente</p>
                  <div className="flex items-center text-xs text-muted-foreground mt-1">
                    <Clock className="w-3 h-3 mr-1" />
                    14:00
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default MonthlyCalendar;