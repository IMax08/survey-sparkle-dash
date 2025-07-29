import { useState } from "react";
import { Search, Bell, Settings, User, MessageCircle, HelpCircle, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface DashboardNavbarProps {
  sidebarCollapsed?: boolean;
}

const DashboardNavbar = ({ sidebarCollapsed = false }: DashboardNavbarProps) => {
  const [searchValue, setSearchValue] = useState("");

  console.log('[Dashboard] Navbar rendered', { sidebarCollapsed });

  return (
    <header 
      className={`
        fixed top-0 right-0 h-navbar bg-white border-b border-gray-200
        transition-all duration-300 ease-in-out z-30
        ${sidebarCollapsed ? 'left-16' : 'left-sidebar'}
      `}
      style={{ 
        left: sidebarCollapsed ? '64px' : '272px'
      }}
    >
      <div className="h-full flex items-center justify-between px-6">
        {/* Left side - Greeting */}
        <div className="flex items-center space-x-4">
          <div>
            <h1 className="text-xl font-semibold text-gray-800">
              Seja Bem-Vindo
            </h1>
            <p className="text-sm text-gray-600">
              Confira abaixo os dados gerais relacionados ao último ano.
            </p>
          </div>
        </div>

        {/* Right side - Search and User */}
        <div className="flex items-center space-x-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Inicie sua pesquisa aqui"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="pl-10 w-96 h-10 bg-gray-50 border-gray-200 focus:border-primary focus:ring-primary text-sm"
              style={{ width: '400px' }}
            />
          </div>

          {/* User Section */}
          <div className="flex items-center space-x-3">
            {/* Notification Bell */}
            <Button
              variant="ghost"
              size="icon"
              className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 relative"
            >
              <Bell className="w-5 h-5 text-gray-600" />
            </Button>

            {/* User Profile with Dropdown */}
            <div className="flex items-center space-x-2 bg-gray-100 rounded-full px-3 py-2 cursor-pointer hover:bg-gray-200 transition-colors">
              <div className="text-sm text-gray-700">
                <span className="font-medium">Olá Usuário</span>
              </div>
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-gray-600" />
              </div>
              <ChevronDown className="w-4 h-4 text-gray-500" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardNavbar;