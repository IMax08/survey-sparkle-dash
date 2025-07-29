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

  const getArrowIcon = () => {
    if (change?.type === 'increase') return "↗";
    if (change?.type === 'decrease') return "↘";
    return "↔";
  };

  return (
    <Card className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-200">
      {/* Header with colored background and icon */}
      <div className={`${bgColor} p-4 flex items-center justify-between`}>
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
            <Icon className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-sm font-medium text-white">
            {title}
          </h3>
        </div>
      </div>

      {/* Content section */}
      <div className="p-4 bg-white">
        {/* Value and Arrow */}
        <div className="flex items-baseline justify-between mb-3">
          <span className="text-4xl font-bold text-gray-800">
            {value}
          </span>
          <div className="text-right">
            <span className="text-2xl font-bold" style={{ 
              color: change?.type === 'increase' ? '#22C55E' : 
                     change?.type === 'decrease' ? '#EF4444' : '#F59E0B' 
            }}>
              {getArrowIcon()}
            </span>
          </div>
        </div>

        {/* Change info */}
        {change && (
          <div className="flex items-center space-x-2 mb-4">
            <div className="w-5 h-5 rounded-full flex items-center justify-center" style={{
              backgroundColor: change.type === 'increase' ? '#22C55E' : '#EF4444'
            }}>
              <span className="text-white text-xs">
                {change.type === 'increase' ? '↑' : '↓'}
              </span>
            </div>
            <span className="text-sm text-gray-600">
              {change.type === 'increase' ? '+' : ''}{change.value}% - {change.period}
            </span>
          </div>
        )}

        {/* CTA Button */}
        <div className="flex justify-end">
          <Button
            variant="ghost"
            size="sm"
            onClick={onCtaClick}
            className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-xs font-medium"
          >
            {ctaText}
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default MetricCard;