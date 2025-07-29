import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Home,
  BarChart3,
  FileText,
  Calendar,
  MapPin,
  Settings,
  Users,
  Bell,
  Search,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import surveyLogoSymbol from "@/assets/survey-logo-symbol.png";
import surveyLogoFull from "@/assets/survey-logo-full.png";

const DashboardSidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  console.log('[Dashboard] Sidebar rendered', { currentPath: location.pathname });

  const menuItems = [
    { icon: Home, label: "Dashboard", path: "/dashboard", isActive: true },
    { icon: BarChart3, label: "Atividades", path: "/activities" },
    { icon: FileText, label: "Formulários", path: "/forms" },
    { icon: FileText, label: "Relatórios", path: "/reports" },
    { icon: Users, label: "Cadastros", path: "/registrations" },
    { icon: Calendar, label: "Agenda", path: "/calendar" },
    { icon: FileText, label: "Notas", path: "/notes" }
  ];

  const generalItems = [
    { icon: Users, label: "Perfil", path: "/profile" },
    { icon: Settings, label: "Configurações", path: "/settings" },
    { icon: Bell, label: "Notificações", path: "/notifications" }
  ];

  const isActive = (path: string) => {
    if (path === "/dashboard") {
      return location.pathname === "/" || location.pathname === "/dashboard";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div 
      className={`
        fixed left-0 top-0 h-screen bg-sidebar-bg border-r border-sidebar-hover
        transition-all duration-300 ease-in-out z-40 animate-slide-in-left
        ${isCollapsed ? 'w-16' : 'w-sidebar'}
      `}
      style={{ width: isCollapsed ? '64px' : '272px' }}
    >
      {/* Header with Logo */}
      <div className="h-navbar flex items-center justify-between px-6 border-b border-sidebar-hover">
        <div className="flex items-center space-x-3">
          <img 
            src={surveyLogoSymbol} 
            alt="Survey 4.0" 
            className="w-7 h-7 hover:animate-heartbeat cursor-pointer transition-transform duration-200"
          />
          {!isCollapsed && (
            <img 
              src={surveyLogoFull} 
              alt="Survey 4.0" 
              className="h-9 hover:animate-heartbeat cursor-pointer transition-transform duration-200"
              style={{ width: '141px', height: '36px' }}
            />
          )}
        </div>
        
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1.5 rounded-lg text-sidebar-text hover:text-sidebar-text-hover hover:bg-sidebar-hover transition-all duration-200"
        >
          {isCollapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <ChevronLeft className="w-4 h-4" />
          )}
        </button>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 px-6 py-6 overflow-y-auto">
        {/* MENU Section */}
        <div className="mb-8">
          {!isCollapsed && (
            <h3 className="text-xs font-semibold text-sidebar-text/60 uppercase tracking-wider mb-4">
              MENU
            </h3>
          )}
          <div className="space-y-1">
            {menuItems.map((item, index) => {
              const isItemActive = isActive(item.path);
              
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={`
                    flex items-center px-3 py-3 rounded-xl transition-all duration-200
                    group relative overflow-hidden
                    ${isItemActive 
                      ? 'bg-sidebar-accent text-sidebar-text-hover shadow-base' 
                      : 'text-sidebar-text hover:text-sidebar-text-hover hover:bg-sidebar-hover'
                    }
                  `}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <item.icon className="w-5 h-5 flex-shrink-0" />
                  
                  {!isCollapsed && (
                    <span className="ml-3 font-medium text-sm">
                      {item.label}
                    </span>
                  )}

                  {/* Active indicator */}
                  {isItemActive && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-primary rounded-r-full" />
                  )}

                  {/* Tooltip for collapsed state */}
                  {isCollapsed && (
                    <div className="absolute left-full ml-2 px-2 py-1 bg-sidebar-bg text-sidebar-text text-sm rounded-lg 
                                  opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none
                                  shadow-lg border border-sidebar-hover whitespace-nowrap z-50">
                      {item.label}
                    </div>
                  )}
                </NavLink>
              );
            })}
          </div>
        </div>

        {/* GERAL Section */}
        <div>
          {!isCollapsed && (
            <h3 className="text-xs font-semibold text-sidebar-text/60 uppercase tracking-wider mb-4">
              GERAL
            </h3>
          )}
          <div className="space-y-1">
            {generalItems.map((item, index) => {
              const isItemActive = isActive(item.path);
              
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={`
                    flex items-center px-3 py-3 rounded-xl transition-all duration-200
                    group relative overflow-hidden
                    ${isItemActive 
                      ? 'bg-sidebar-accent text-sidebar-text-hover shadow-base' 
                      : 'text-sidebar-text hover:text-sidebar-text-hover hover:bg-sidebar-hover'
                    }
                  `}
                  style={{ animationDelay: `${(menuItems.length + index) * 50}ms` }}
                >
                  <item.icon className="w-5 h-5 flex-shrink-0" />
                  
                  {!isCollapsed && (
                    <span className="ml-3 font-medium text-sm">
                      {item.label}
                    </span>
                  )}

                  {/* Tooltip for collapsed state */}
                  {isCollapsed && (
                    <div className="absolute left-full ml-2 px-2 py-1 bg-sidebar-bg text-sidebar-text text-sm rounded-lg 
                                  opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none
                                  shadow-lg border border-sidebar-hover whitespace-nowrap z-50">
                      {item.label}
                    </div>
                  )}
                </NavLink>
              );
            })}
          </div>
        </div>

        {/* Módulo FIRE */}
        {!isCollapsed && (
          <div className="mt-8 pt-6 border-t border-sidebar-hover">
            <div className="flex items-center space-x-2 text-sidebar-text/60 mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider">Módulo</span>
              <span className="text-xs font-bold text-orange-400">FIRE</span>
              <ChevronRight className="w-3 h-3" />
            </div>
          </div>
        )}
      </nav>

      {/* Footer */}
      <div className="p-6 border-t border-sidebar-hover">
        {!isCollapsed ? (
          <div className="bg-sidebar-hover rounded-xl p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <span className="text-primary-foreground font-semibold text-sm">JS</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sidebar-text-hover font-medium text-sm truncate">
                  João Silva
                </p>
                <p className="text-sidebar-text text-xs truncate">
                  Admin
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex justify-center">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
              <span className="text-primary-foreground font-semibold text-sm">JS</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardSidebar;