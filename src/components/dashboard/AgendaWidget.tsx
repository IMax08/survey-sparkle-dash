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
    { day: 29, isCurrentMonth: true },
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
    { day: 11, isCurrentMonth: true },
    { day: 12, isCurrentMonth: true },
    { day: 13, isCurrentMonth: true },
    { day: 14, isCurrentMonth: true },
    { day: 15, isCurrentMonth: true },
    { day: 16, isCurrentMonth: true },
    { day: 17, isCurrentMonth: true },
    { day: 18, isCurrentMonth: true },
    { day: 19, isCurrentMonth: true },
    { day: 20, isCurrentMonth: true },
    { day: 21, isCurrentMonth: true },
    { day: 22, isCurrentMonth: true },
    { day: 23, isCurrentMonth: true },
    { day: 24, isCurrentMonth: true },
    { day: 25, isCurrentMonth: true },
    { day: 26, isCurrentMonth: true },
    { day: 27, isCurrentMonth: true },
    { day: 28, isCurrentMonth: true, isToday: true },
    { day: 29, isCurrentMonth: true },
    { day: 30, isCurrentMonth: true },
    { day: 31, isCurrentMonth: true },
  ];

  const weekDays = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'];

  return (
    <div className="space-y-4 h-full flex flex-col">
      {/* Agenda Calendar */}
      <Card className="p-4 bg-white rounded-xl shadow-sm flex-1">
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
        <div className="bg-gray-800 text-white text-center py-2 mb-3 rounded">
          <h4 className="text-sm font-medium">
            Outubro
          </h4>
        </div>
        
        {/* Week Days */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {weekDays.map((day, index) => (
            <div key={day} className={`text-xs text-center p-1 ${index >= 5 ? 'text-blue-500' : 'text-gray-500'}`}>
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
                text-center p-2 text-sm rounded cursor-pointer transition-colors h-8 flex items-center justify-center
                ${dayData.isCurrentMonth 
                  ? 'text-gray-800 hover:bg-gray-100' 
                  : 'text-gray-300'
                }
                ${dayData.isToday 
                  ? 'bg-gray-800 text-white font-medium' 
                  : ''
                }
                ${index % 7 >= 5 && dayData.isCurrentMonth ? 'text-blue-500' : ''}
              `}
            >
              {dayData.day}
            </div>
          ))}
        </div>
      </Card>

      {/* Gerar Relatórios Button */}
      <Card className="p-4 bg-white rounded-xl shadow-sm">
        <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
              <FileText className="w-4 h-4 text-gray-600" />
            </div>
            <span className="font-medium text-gray-800">Gerar Relatórios</span>
          </div>
          <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center">
            <span className="text-gray-600 text-sm">→</span>
          </div>
        </div>
      </Card>

      {/* Novo Formulário Button */}
      <Card className="p-4 bg-white rounded-xl shadow-sm">
        <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
              <FileText className="w-4 h-4 text-gray-600" />
            </div>
            <span className="font-medium text-gray-800">Novo Formulário</span>
          </div>
          <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center">
            <span className="text-gray-600 text-sm">→</span>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AgendaWidget;