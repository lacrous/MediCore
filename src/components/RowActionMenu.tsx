import { Eye, Pencil, XCircle } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function RowActionMenu() {
  const { t } = useLanguage();

  const actions = [
    { icon: Eye, label: t('actions.viewDetails'), danger: false },
    { icon: Pencil, label: t('actions.edit'), danger: false },
    { icon: XCircle, label: t('actions.cancelAction'), danger: true },
  ];

  return (
    <div className="py-1">
      {actions.map((action, i) => {
        const Icon = action.icon;
        return (
          <button
            key={i}
            onClick={(e) => e.stopPropagation()}
            className={`w-full flex items-center gap-2.5 px-4 py-2.5 text-sm transition-colors hover:bg-black/[0.02] ${action.danger ? 'hover:text-[var(--mc-red)]' : ''}`}
            style={{ color: action.danger ? 'var(--mc-text-secondary)' : 'var(--mc-text-primary)' }}
            onMouseEnter={(e) => { if (action.danger) (e.currentTarget as HTMLElement).style.color = 'var(--mc-red)'; }}
            onMouseLeave={(e) => { if (action.danger) (e.currentTarget as HTMLElement).style.color = 'var(--mc-text-secondary)'; }}
          >
            <Icon size={14} /><span>{action.label}</span>
          </button>
        );
      })}
    </div>
  );
}
