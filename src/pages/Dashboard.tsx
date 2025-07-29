import { useState } from "react";
import { FileText, Calendar, BarChart3, CheckCircle, TrendingUp, Users, MapPin, Clock } from "lucide-react";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardNavbar from "@/components/dashboard/DashboardNavbar";
import MetricCard from "@/components/dashboard/MetricCard";
import StatusChart from "@/components/dashboard/StatusChart";
import MonthlyCalendar from "@/components/dashboard/MonthlyCalendar";
import InteractiveMap from "@/components/dashboard/InteractiveMap";
import ChatBot from "@/components/dashboard/ChatBot";
import { Card } from "@/components/ui/card";

const Dashboard = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  console.log('[Dashboard] Main dashboard rendered', { sidebarCollapsed });

  // Mock metrics data - Exactly matching images
  const metricsData = [
    {
      title: "Relatórios Gerados",
      value: 125,
      change: { value: 21.2, type: 'increase' as const, period: 'Mês passado' },
      icon: TrendingUp,
      iconColor: "text-white",
      bgColor: "bg-metric-green",
      ctaText: "Ver +"
    },
    {
      title: "Inspeções em Aberto", 
      value: 25,
      change: { value: 10.2, type: 'decrease' as const, period: 'Mês passado' },
      icon: FileText,
      iconColor: "text-white",
      bgColor: "bg-metric-orange",
      ctaText: "Ver +"
    },
    {
      title: "Notas em Aberto",
      value: 35,
      change: { value: 0.12, type: 'decrease' as const, period: 'Mês passado' },
      icon: BarChart3,
      iconColor: "text-white", 
      bgColor: "bg-metric-yellow",
      ctaText: "Ver +"
    },
    {
      title: "Inspeções Executadas",
      value: 75,
      change: { value: 0.25, type: 'decrease' as const, period: 'Mês passado' },
      icon: CheckCircle,
      iconColor: "text-white",
      bgColor: "bg-metric-red", 
      ctaText: "Ver +"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <DashboardSidebar />
      
      {/* Navbar */}
      <DashboardNavbar sidebarCollapsed={sidebarCollapsed} />
      
      {/* Main Content */}
      <main 
        className={`
          transition-all duration-300 ease-in-out pt-navbar
          ${sidebarCollapsed ? 'ml-16' : 'ml-sidebar'}
        `}
        style={{ 
          marginLeft: sidebarCollapsed ? '64px' : '272px',
          paddingTop: '72px'
        }}
      >
        <div className="p-6 space-y-6">
          {/* Metrics Cards */}
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {metricsData.map((metric, index) => (
              <div key={metric.title} style={{ animationDelay: `${index * 100}ms` }}>
                <MetricCard
                  title={metric.title}
                  value={metric.value}
                  change={metric.change}
                  icon={metric.icon}
                  iconColor={metric.iconColor}
                  bgColor={metric.bgColor}
                  ctaText={metric.ctaText}
                  onCtaClick={() => console.log(`Navigate to ${metric.title}`)}
                />
              </div>
            ))}
          </section>

          {/* Charts and Status Row */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Status Chart */}
            <Card className="p-6 bg-gradient-card border-border animate-fade-in">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-foreground">Status das Inspeções</h3>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  <span>Últimos 30 dias</span>
                </div>
              </div>
              <StatusChart />
            </Card>

            {/* Quick Stats */}
            <Card className="p-6 bg-gradient-card border-border animate-fade-in">
              <h3 className="text-lg font-semibold text-foreground mb-6">Resumo Rápido</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-primary/5 rounded-xl border border-primary/20">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                      <Users className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Clientes Ativos</p>
                      <p className="text-sm text-muted-foreground">Total de clientes</p>
                    </div>
                  </div>
                  <span className="text-2xl font-bold text-primary">47</span>
                </div>

                <div className="flex items-center justify-between p-4 bg-status-success/5 rounded-xl border border-status-success/20">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-status-success rounded-full flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Localidades</p>
                      <p className="text-sm text-muted-foreground">Cidades atendidas</p>
                    </div>
                  </div>
                  <span className="text-2xl font-bold text-status-success">12</span>
                </div>

                <div className="flex items-center justify-between p-4 bg-status-warning/5 rounded-xl border border-status-warning/20">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-status-warning rounded-full flex items-center justify-center">
                      <Clock className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Tempo Médio</p>
                      <p className="text-sm text-muted-foreground">Por inspeção</p>
                    </div>
                  </div>
                  <span className="text-2xl font-bold text-status-warning">2.5h</span>
                </div>
              </div>
            </Card>
          </section>

          {/* Calendar Section */}
          <section className="animate-fade-in" style={{ animationDelay: '300ms' }}>
            <MonthlyCalendar />
          </section>

          {/* Map Section */}
          <section className="animate-fade-in" style={{ animationDelay: '400ms' }}>
            <InteractiveMap />
          </section>
        </div>
      </main>

      {/* Chat Bot */}
      <ChatBot />
    </div>
  );
};

export default Dashboard;