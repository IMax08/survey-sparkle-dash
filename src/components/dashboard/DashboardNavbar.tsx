import { useState } from "react";
import { Search, Bell, Settings, User, MessageCircle, HelpCircle } from "lucide-react";
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
        fixed top-0 right-0 h-navbar bg-card border-b border-border
        transition-all duration-300 ease-in-out z-30
        ${sidebarCollapsed ? 'left-16' : 'left-sidebar'}
      `}
      style={{ 
        left: sidebarCollapsed ? '64px' : '272px'
      }}
    >
      <div className="h-full flex items-center justify-between px-6">
        {/* Page Title */}
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-semibold text-foreground">
            Dashboard
          </h1>
          <div className="text-sm text-muted-foreground">
            Bem-vindo de volta, João!
          </div>
        </div>

        {/* Search and Actions */}
        <div className="flex items-center space-x-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Buscar inspeções, clientes..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="pl-10 w-96 h-10 bg-background border-border focus:border-primary focus:ring-primary"
              style={{ width: '542px', height: '40px' }}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              className="w-10 h-10 rounded-xl hover:bg-muted relative"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-status-danger rounded-full text-xs flex items-center justify-center">
                <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
              </span>
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="w-10 h-10 rounded-xl hover:bg-muted"
            >
              <MessageCircle className="w-5 h-5" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="w-10 h-10 rounded-xl hover:bg-muted"
            >
              <HelpCircle className="w-5 h-5" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="w-10 h-10 rounded-xl hover:bg-muted"
            >
              <Settings className="w-5 h-5" />
            </Button>

            {/* User Profile */}
            <div className="flex items-center space-x-3 ml-4 pl-4 border-l border-border">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <span className="text-primary-foreground font-semibold text-sm">JS</span>
              </div>
              <div className="hidden md:block">
                <p className="text-sm font-medium text-foreground">João Silva</p>
                <p className="text-xs text-muted-foreground">Administrator</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardNavbar;