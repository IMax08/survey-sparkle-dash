import { useState } from "react";
import { FileText, Calendar, BarChart3, CheckCircle, TrendingUp, Users, MapPin, Clock } from "lucide-react";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardNavbar from "@/components/dashboard/DashboardNavbar";
import MetricCard from "@/components/dashboard/MetricCard";
import InteractiveMap from "@/components/dashboard/InteractiveMap";
import ChatBot from "@/components/dashboard/ChatBot";
import { Card } from "@/components/ui/card";

const Dashboard = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  console.log('[Dashboard] Main dashboard rendered', { sidebarCollapsed });

  // Mock metrics data - Exactly matching the image
  const metricsData = [
    {
      title: "Relatórios Gerados",
      value: 125,
      change: { value: 2.12, type: 'increase' as const, period: 'Mês passado' },
      icon: FileText,
      iconColor: "text-white",
      bgColor: "bg-metric-green",
      strongIconColor: "#00192a", // Azul escuro forte
      ctaText: "Ver +"
    },
    {
      title: "Inspeções em Aberto", 
      value: 25,
      change: { value: 0.19, type: 'decrease' as const, period: 'Mês passado' },
      icon: FileText,
      iconColor: "text-white",
      bgColor: "bg-metric-orange",
      strongIconColor: "#f59e0b", // Laranja forte
      ctaText: "Ver +"
    },
    {
      title: "Notas em Aberto",
      value: 35,
      change: { value: 0.17, type: 'decrease' as const, period: 'Mês passado' },
      icon: FileText,
      iconColor: "text-white", 
      bgColor: "bg-metric-yellow",
      strongIconColor: "#f59e0b", // Laranja forte
      ctaText: "Ver +"
    },
    {
      title: "Inspeções Executadas",
      value: 75,
      change: { value: 0.26, type: 'decrease' as const, period: 'Mês passado' },
      icon: FileText,
      iconColor: "text-white",
      bgColor: "bg-metric-red", 
      strongIconColor: "#ef4444", // Vermelho forte
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
          transition-all duration-300 ease-in-out pt-16 sm:pt-18 lg:pt-20
          ml-0 sm:ml-16 lg:ml-sidebar
        `}
        style={{ 
          paddingTop: '72px'
        }}
      >
        <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
          {/* Metrics Cards - Responsive grid */}
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {metricsData.map((metric, index) => (
              <div key={metric.title} className="animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                <MetricCard
                  title={metric.title}
                  value={metric.value}
                  change={metric.change}
                  icon={metric.icon}
                  iconColor={metric.iconColor}
                  bgColor={metric.bgColor}
                  strongIconColor={metric.strongIconColor}
                  ctaText={metric.ctaText}
                  onCtaClick={() => console.log(`Navigate to ${metric.title}`)}
                />
              </div>
            ))}
          </section>

          {/* Main Map Section - Taking full width like in image */}
          <section className="animate-fade-in" style={{ animationDelay: '200ms' }}>
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