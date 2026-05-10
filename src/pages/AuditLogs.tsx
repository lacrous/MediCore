import { motion } from 'framer-motion';
import { UserPlus, Pencil, Trash2, CreditCard, Pill, CalendarCheck, ClipboardList } from 'lucide-react';
import { useActivityLogs } from '@/hooks/useApi';
import { TableSkeleton } from '@/components/Skeleton';
import { useLanguage } from '@/context/LanguageContext';

const actionIcons: Record<string, React.ElementType> = {
  CREATE: UserPlus,
  UPDATE: Pencil,
  DELETE: Trash2,
};

const actionColors: Record<string, { bg: string; color: string }> = {
  CREATE: { bg: 'var(--mc-green-bg)', color: 'var(--mc-green)' },
  UPDATE: { bg: 'var(--mc-blue-bg)', color: 'var(--mc-blue)' },
  DELETE: { bg: 'var(--mc-red-bg)', color: 'var(--mc-red)' },
};

const entityIcons: Record<string, React.ElementType> = {
  patient: ClipboardList,
  appointment: CalendarCheck,
  invoice: CreditCard,
  medication: Pill,
  prescription: Pill,
};

export default function AuditLogs() {
  const { data: logs, isLoading } = useActivityLogs();
  const { isRTL } = useLanguage();

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
        <h1 className="text-2xl font-semibold tracking-tight" style={{ color: 'var(--mc-text-primary)' }}>{isRTL ? 'سجل النشاطات' : 'Audit Logs'}</h1>
        <p className="text-sm mt-1" style={{ color: 'var(--mc-text-secondary)' }}>{isRTL ? 'تتبع جميع الإجراءات في النظام' : 'Track all actions performed in the system'}</p>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
        className="rounded-2xl shadow-mc-card overflow-hidden" style={{ backgroundColor: 'var(--mc-surface)' }}>
        {isLoading ? <div className="p-6"><TableSkeleton rows={6} cols={5} /></div> : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px]">
              <thead>
                <tr className="border-b" style={{ borderColor: 'var(--mc-border)' }}>
                  {['Action', 'User', 'Entity', 'Details', 'Time'].map((h, i) => (
                    <th key={i} className="px-6 py-3 text-left text-[11px] font-semibold uppercase tracking-[0.06em]" style={{ color: 'var(--mc-text-muted)' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {(logs || []).map((log: any, idx: number) => {
                  const ActionIcon = actionIcons[log.action] || Pencil;
                  const EntityIcon = entityIcons[log.entityType] || ClipboardList;
                  const colors = actionColors[log.action] || actionColors.UPDATE;
                  return (
                    <tr key={idx} className="border-b transition-colors hover:bg-black/[0.02]" style={{ borderColor: 'var(--mc-border)' }}>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full flex items-center justify-center" style={{ backgroundColor: colors.bg }}>
                            <ActionIcon size={13} style={{ color: colors.color }} />
                          </div>
                          <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{ backgroundColor: colors.bg, color: colors.color }}>{log.action}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm font-medium" style={{ color: 'var(--mc-text-primary)' }}>{log.userName}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <EntityIcon size={14} style={{ color: 'var(--mc-text-muted)' }} />
                          <span className="text-sm capitalize" style={{ color: 'var(--mc-text-secondary)' }}>{log.entityType}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm max-w-xs truncate" style={{ color: 'var(--mc-text-secondary)' }}>{log.details}</td>
                      <td className="px-6 py-4 text-xs whitespace-nowrap" style={{ color: 'var(--mc-text-muted)' }}>
                        {new Date(log.createdAt).toLocaleString()}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </motion.div>
    </div>
  );
}
