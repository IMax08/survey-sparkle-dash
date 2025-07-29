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
  ctaText?: string;
  onCtaClick?: () => void;
}

const MetricCard = ({
  title,
  value,
  change,
  icon: Icon,
  iconColor = "text-primary",
  ctaText = "Ver +",
  onCtaClick
}: MetricCardProps) => {
  console.log('[Dashboard] MetricCard rendered', { title, value });

  const changeColor = change?.type === 'increase' ? 'text-status-success' : 'text-status-danger';
  const ChangeIcon = change?.type === 'increase' ? ArrowUpRight : ArrowDownRight;

  return (
    <Card className="p-6 bg-gradient-card hover:bg-card-hover transition-all duration-200 
                     border-border hover:shadow-lg group cursor-pointer animate-fade-in">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center justify-between mb-4">
            <Icon className={`w-6 h-6 ${iconColor}`} />
            {change && (
              <div className={`flex items-center space-x-1 ${changeColor}`}>
                <ChangeIcon className="w-4 h-4" />
                <span className="text-sm font-medium">
                  {Math.abs(change.value)}%
                </span>
              </div>
            )}
          </div>

          <h3 className="text-sm font-medium text-muted-foreground mb-2">
            {title}
          </h3>

          <div className="flex items-end justify-between">
            <p className="text-3xl font-bold text-foreground mb-2">
              {value}
            </p>
          </div>

          {change && (
            <p className="text-xs text-muted-foreground">
              {change.type === 'increase' ? '+' : ''}{change.value}% vs {change.period}
            </p>
          )}
        </div>
      </div>

      {/* CTA Button */}
      <div className="mt-4 pt-4 border-t border-border">
        <Button
          variant="ghost"
          size="sm"
          onClick={onCtaClick}
          className="w-full justify-between text-primary hover:text-primary-hover 
                     hover:bg-primary/5 transition-all duration-200 group"
        >
          <span className="text-sm font-medium">{ctaText}</span>
          <TrendingUp className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
        </Button>
      </div>
    </Card>
  );
};

export default MetricCard;