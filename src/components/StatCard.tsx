import { TrendingUp, TrendingDown, type LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import Sparkline from './Sparkline';

export interface StatCardProps {
  icon: LucideIcon;
  iconBgColor: string;
  iconColor: string;
  value: string;
  label: string;
  trend: string;
  trendPositive: boolean;
  sparklineData: number[];
  sparklineColor: string;
  index: number;
}

export default function StatCard({
  icon: Icon,
  iconBgColor,
  iconColor,
  value,
  label,
  trend,
  trendPositive,
  sparklineData,
  sparklineColor,
  index,
}: StatCardProps) {
  const TrendIcon = trendPositive ? TrendingUp : TrendingDown;
  const trendColor = trendPositive ? '#22C55E' : '#EF4444';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.35,
        delay: 0.2 + index * 0.08,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className="
        relative rounded-2xl p-6
        shadow-mc-card
        transition-all duration-200 ease-out
        hover:shadow-mc-card-hover hover:-translate-y-0.5
        flex-1 min-w-0
      "
      style={{
        backgroundColor: 'var(--mc-surface)',
      }}
    >
      {/* Glassmorphism top highlight */}
      <div
        className="absolute top-0 left-4 right-4 h-px rounded-full"
        style={{ backgroundColor: 'rgba(255,255,255,0.08)' }}
      />

      {/* Top Row: Icon + Sparkline */}
      <div className="flex items-center justify-between">
        <div
          className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: iconBgColor }}
        >
          <Icon size={22} style={{ color: iconColor }} />
        </div>
        <Sparkline
          data={sparklineData}
          color={sparklineColor}
          width={80}
          height={36}
        />
      </div>

      {/* Value */}
      <div
        className="mt-4 text-[32px] font-bold leading-tight tracking-tight"
        style={{ color: 'var(--mc-text-primary)' }}
      >
        {value}
      </div>

      {/* Label */}
      <div
        className="mt-1 text-[13px] font-medium"
        style={{ color: 'var(--mc-text-secondary)' }}
      >
        {label}
      </div>

      {/* Trend */}
      <div className="flex items-center gap-1.5 mt-2">
        <TrendIcon size={12} style={{ color: trendColor }} />
        <span className="text-xs font-medium" style={{ color: trendColor }}>
          {trend}
        </span>
        <span className="text-xs" style={{ color: 'var(--mc-text-muted)' }}>
          from last month
        </span>
      </div>
    </motion.div>
  );
}
