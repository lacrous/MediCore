import { useNotifications } from '@/hooks/useApi';
import { UserPlus, CheckCircle2, AlertTriangle, CreditCard, XCircle } from 'lucide-react';

const typeConfig: Record<string, { icon: React.ElementType; color: string; bg: string }> = {
  patient_registered: { icon: UserPlus, color: 'var(--mc-orange)', bg: 'var(--mc-orange-muted)' },
  appointment_completed: { icon: CheckCircle2, color: 'var(--mc-green)', bg: 'var(--mc-green-bg)' },
  low_stock: { icon: AlertTriangle, color: 'var(--mc-red)', bg: 'var(--mc-red-bg)' },
  payment_received: { icon: CreditCard, color: 'var(--mc-gold)', bg: 'var(--mc-gold-muted)' },
  appointment_cancelled: { icon: XCircle, color: 'var(--mc-amber)', bg: 'var(--mc-amber-bg)' },
};

export default function NotificationDropdown() {
  const { data: notifications, isLoading } = useNotifications();

  if (isLoading) {
    return (
      <div className="px-5 py-8 text-center">
        <div className="w-5 h-5 border-2 border-[var(--mc-gold)] border-t-transparent rounded-full animate-spin mx-auto" />
      </div>
    );
  }

  return (
    <div>
      <div className="px-5 py-4 border-b flex items-center justify-between" style={{ borderColor: 'var(--mc-border)' }}>
        <h3 className="text-base font-semibold" style={{ color: 'var(--mc-text-primary)' }}>Notifications</h3>
        {(notifications || []).filter((n: any) => !n.read).length > 0 && (
          <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ backgroundColor: 'var(--mc-orange-muted)', color: 'var(--mc-orange)' }}>
            {(notifications || []).filter((n: any) => !n.read).length} new
          </span>
        )}
      </div>
      <div className="max-h-[340px] overflow-y-auto">
        {(notifications || []).length === 0 && (
          <div className="px-5 py-8 text-center">
            <p className="text-sm" style={{ color: 'var(--mc-text-muted)' }}>No notifications</p>
          </div>
        )}
        {(notifications || []).map((notif: any) => {
          const config = typeConfig[notif.type] || typeConfig.appointment_completed;
          const Icon = config.icon;
          return (
            <div key={notif.id} className={`flex items-start gap-3 px-5 py-3 transition-colors cursor-pointer hover:bg-black/[0.02] ${!notif.read ? 'border-l-2' : ''}`}
              style={{ borderColor: !notif.read ? 'var(--mc-orange)' : 'transparent' }}>
              <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center mt-0.5" style={{ backgroundColor: config.bg }}>
                <Icon size={16} style={{ color: config.color }} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[13px] font-medium leading-snug" style={{ color: 'var(--mc-text-primary)' }}>{notif.title}</p>
                <p className="text-xs leading-snug mt-0.5" style={{ color: 'var(--mc-text-secondary)' }}>{notif.message}</p>
                <p className="text-xs mt-1" style={{ color: 'var(--mc-text-muted)' }}>{new Date(notif.createdAt).toLocaleTimeString()}</p>
              </div>
              {!notif.read && <div className="w-2 h-2 rounded-full flex-shrink-0 mt-1.5" style={{ backgroundColor: 'var(--mc-orange)' }} />}
            </div>
          );
        })}
      </div>
    </div>
  );
}
