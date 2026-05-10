import { useLanguage } from '@/context/LanguageContext';

type StatusType = 'Completed' | 'Pending' | 'In Progress' | 'Cancelled';

interface StatusBadgeProps {
  status: StatusType;
}

const statusConfig: Record<string, { bg: string; color: string; borderColor: string }> = {
  Completed: { bg: 'var(--mc-green-bg)', color: 'var(--mc-green)', borderColor: 'rgba(34,197,94,0.25)' },
  Pending: { bg: 'var(--mc-amber-bg)', color: 'var(--mc-amber)', borderColor: 'rgba(245,158,11,0.25)' },
  'In Progress': { bg: 'var(--mc-blue-bg)', color: 'var(--mc-blue)', borderColor: 'rgba(59,130,246,0.25)' },
  Cancelled: { bg: 'var(--mc-red-bg)', color: 'var(--mc-red)', borderColor: 'rgba(239,68,68,0.25)' },
};

export default function StatusBadge({ status }: StatusBadgeProps) {
  const { t } = useLanguage();
  const config = statusConfig[status];

  const statusKeyMap: Record<string, string> = {
    'Completed': 'status.completed',
    'Pending': 'status.pending',
    'In Progress': 'status.inProgress',
    'Cancelled': 'status.cancelled',
  };

  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border whitespace-nowrap" style={{ backgroundColor: config.bg, color: config.color, borderColor: config.borderColor }}>
      <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: config.color }} />
      {t(statusKeyMap[status] || status)}
    </span>
  );
}
