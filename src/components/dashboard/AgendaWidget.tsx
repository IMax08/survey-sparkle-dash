import { Calendar, Plus, FileText } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const AgendaWidget = () => {
  const currentDate = new Date();
  const currentMonth = currentDate.toLocaleDateString('pt-BR', { month: 'long' });
  const currentYear = currentDate.getFullYear();
  
  // Dados do calendário - Outubro 2024
  const calendarDays = [
    { day: 28, isCurrentMonth: false },
    { day: 29, isCurrentMonth: true, isToday: true },
    { day: 30, isCurrentMonth: true },
    { day: 31, isCurrentMonth: true },
    { day: 1, isCurrentMonth: false },
    { day: 2, isCurrentMonth: false },
    { day: 3, isCurrentMonth: false },
    { day: 4, isCurrentMonth: true },
    { day: 5, isCurrentMonth: true },
    { day: 6, isCurrentMonth: true },
    { day: 7, isCurrentMonth: true },
    { day: 8, isCurrentMonth: true },
    { day: 9, isCurrentMonth: true },
    { day: 10, isCurrentMonth: true },
  ];

  const weekDays = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'];

  return (
    <div className="space-y-4">
      {/* Agenda Calendar */}
      <Card className="p-4 bg-white rounded-xl shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Agenda</h3>
          <Button 
            variant="ghost" 
            size="sm"
            className="bg-gray-800 hover:bg-gray-700 text-white px-3 py-1 rounded text-xs"
          >
            Ver +
          </Button>
        </div>
        
        {/* Month/Year Header */}
        <div className="text-center mb-4">
          <h4 className="text-sm font-medium text-gray-600 capitalize">
            {currentMonth.charAt(0).toUpperCase() + currentMonth.slice(1)}
          </h4>
        </div>
        
        {/* Week Days */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {weekDays.map((day) => (
            <div key={day} className="text-xs text-gray-500 text-center p-1">
              {day}
            </div>
          ))}
        </div>
        
        {/* Calendar Days */}
        <div className="grid grid-cols-7 gap-1">
          {calendarDays.map((dayData, index) => (
            <div
              key={index}
              className={`
                text-center p-2 text-sm rounded cursor-pointer transition-colors
                ${dayData.isCurrentMonth 
                  ? 'text-gray-800 hover:bg-gray-100' 
                  : 'text-gray-300'
                }
                ${dayData.isToday 
                  ? 'bg-gray-800 text-white font-medium' 
                  : ''
                }
              `}
            >
              {dayData.day}
            </div>
          ))}
        </div>
      </Card>

      {/* Gerar Relatórios Button */}
      <Card className="p-4 bg-white rounded-xl shadow-sm">
        <Button 
          className="w-full flex items-center justify-center space-x-2 bg-white hover:bg-gray-50 text-gray-800 border border-gray-200 rounded-lg py-3"
          variant="outline"
        >
          <FileText className="w-4 h-4" />
          <span className="font-medium">Gerar Relatórios</span>
          <Plus className="w-4 h-4 ml-auto" />
        </Button>
      </Card>

      {/* Novo Formulário Button */}
      <Card className="p-4 bg-white rounded-xl shadow-sm">
        <Button 
          className="w-full flex items-center justify-center space-x-2 bg-white hover:bg-gray-50 text-gray-800 border border-gray-200 rounded-lg py-3"
          variant="outline"
        >
          <FileText className="w-4 h-4" />
          <span className="font-medium">Novo Formulário</span>
          <Plus className="w-4 h-4 ml-auto" />
        </Button>
      </Card>
    </div>
  );
};

export default AgendaWidget;