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
                     border-0 group cursor-pointer animate-fade-in relative overflow-hidden rounded-2xl`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          {/* Header with icon */}
          <div className="flex items-start justify-between mb-4">
            <div className={`w-8 h-8 ${bgColor} bg-white/20 rounded-lg flex items-center justify-center`}>
              <Icon className={`w-5 h-5 ${iconColor}`} />
            </div>
          </div>

          {/* Title */}
          <h3 className="text-sm font-medium text-white/90 mb-3 leading-tight">
            {title}
          </h3>

          {/* Value and Change */}
          <div className="flex items-end justify-between mb-4">
            <p className="text-5xl font-bold text-white leading-none">
              {value}
            </p>
            {change && (
              <div className="flex items-center space-x-1 text-white/90 mb-2">
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm font-medium">
                  {change.type === 'increase' ? '+' : ''}{change.value}%
                </span>
              </div>
            )}
          </div>

          {/* Change description with circular icon */}
          {change && (
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                <TrendingUp className={`w-3 h-3 ${change.type === 'increase' ? 'text-green-300' : 'text-red-300'}`} />
              </div>
              <p className="text-xs text-white/80">
                {change.type === 'increase' ? '+' : ''}{change.value}% - {change.period}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* CTA Button */}
      <div className="flex justify-end">
        <Button
          variant="ghost"
          size="sm"
          onClick={onCtaClick}
          className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
        >
          {ctaText}
        </Button>
      </div>
    </Card>
  );
};

export default MetricCard;