import { Users, CalendarCheck, Stethoscope, DollarSign } from 'lucide-react';
import StatCard from '@/components/StatCard';
import { useLanguage } from '@/context/LanguageContext';

export default function StatCardsRow() {
  const { t } = useLanguage();

  const stats = [
    { icon: Users, iconBgColor: 'var(--mc-gold-muted)', iconColor: 'var(--mc-gold)', value: '2,847', label: t('appointments.total'), trend: '+12.5%', trendPositive: true, sparklineData: [20, 28, 24, 35, 42], sparklineColor: 'var(--mc-gold)' },
    { icon: CalendarCheck, iconBgColor: 'var(--mc-orange-muted)', iconColor: 'var(--mc-orange)', value: '24', label: t('appointments.today'), trend: '+8.2%', trendPositive: true, sparklineData: [15, 18, 22, 20, 24], sparklineColor: 'var(--mc-orange)' },
    { icon: Stethoscope, iconBgColor: 'var(--mc-gold-muted)', iconColor: 'var(--mc-gold)', value: '18', label: t('app.doctors'), trend: '-2.1%', trendPositive: false, sparklineData: [22, 20, 21, 18, 18], sparklineColor: 'var(--mc-gold)' },
    { icon: DollarSign, iconBgColor: 'var(--mc-gold-muted)', iconColor: 'var(--mc-gold)', value: '$48,250', label: t('appointments.revenue'), trend: '+18.3%', trendPositive: true, sparklineData: [30, 35, 42, 48, 55], sparklineColor: 'var(--mc-gold)' },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <StatCard key={stat.label} {...stat} index={index} />
      ))}
    </div>
  );
}
