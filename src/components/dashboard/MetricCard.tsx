import { LucideIcon, ArrowUpRight, ArrowDownRight, TrendingUp } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: {
    value: number;
    type: 'increase' | 'decrease';
    period: string;
  };
  icon: LucideIcon;
  iconColor?: string;
  bgColor?: string;
  ctaText?: string;
  onCtaClick?: () => void;
}

const MetricCard = ({
  title,
  value,
  change,
  icon: Icon,
  iconColor = "text-white",
  bgColor = "bg-primary",
  ctaText = "Ver +",
  onCtaClick
}: MetricCardProps) => {
  console.log('[Dashboard] MetricCard rendered', { title, value });

  const changeColor = change?.type === 'increase' ? 'text-status-success' : 'text-status-danger';
  const ChangeIcon = change?.type === 'increase' ? ArrowUpRight : ArrowDownRight;

  return (
    <Card className={`p-6 ${bgColor} text-white hover:opacity-90 transition-all duration-200 
                     border-0 group cursor-pointer animate-fade-in relative overflow-hidden`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          {/* Header with icon and change indicator */}
          <div className="flex items-start justify-between mb-4">
            <div className={`w-8 h-8 ${bgColor} bg-white/20 rounded-lg flex items-center justify-center`}>
              <Icon className={`w-5 h-5 ${iconColor}`} />
            </div>
            {change && (
              <div className="flex items-center space-x-1 text-white/90">
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm font-medium">
                  {change.type === 'increase' ? '+' : ''}{change.value}%
                </span>
              </div>
            )}
          </div>

          {/* Title */}
          <h3 className="text-sm font-medium text-white/80 mb-2 leading-tight">
            {title}
          </h3>

          {/* Value */}
          <div className="flex items-end justify-between mb-2">
            <p className="text-4xl font-bold text-white">
              {value}
            </p>
          </div>

          {/* Change description */}
          {change && (
            <p className="text-xs text-white/70">
              {change.type === 'increase' ? '+' : ''}{change.value}% vs {change.period}
            </p>
          )}
        </div>
      </div>

      {/* CTA Button */}
      <div className="mt-4 pt-4 border-t border-white/20">
        <Button
          variant="ghost"
          size="sm"
          onClick={onCtaClick}
          className="w-full justify-between text-white hover:text-white 
                     hover:bg-white/10 transition-all duration-200 group border-0"
        >
          <span className="text-sm font-medium">{ctaText}</span>
          <TrendingUp className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
        </Button>
      </div>
    </Card>
  );
};

export default MetricCard;