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
      change: { value: 21.2, type: 'increase' as const, period: 'Mês passado' },
      icon: FileText,
      iconColor: "text-white",
      bgColor: "bg-metric-green",
      ctaText: "Ver +"
    },
    {
      title: "Inspeções em Aberto", 
      value: 25,
      change: { value: 0.10, type: 'decrease' as const, period: 'Mês passado' },
      icon: FileText,
      iconColor: "text-white",
      bgColor: "bg-metric-orange",
      ctaText: "Ver +"
    },
    {
      title: "Notas em Aberto",
      value: 35,
      change: { value: 0.12, type: 'decrease' as const, period: 'Mês passado' },
      icon: FileText,
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