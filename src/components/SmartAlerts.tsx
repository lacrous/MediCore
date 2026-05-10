import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, X, Pill, UserX, CreditCard, ChevronRight, Bell } from 'lucide-react';
import { Link } from 'react-router-dom';

interface AlertItem {
  id: string;
  type: 'critical' | 'warning' | 'info';
  icon: React.ElementType;
  title: string;
  message: string;
  link: string;
  time: string;
}

const defaultAlerts: AlertItem[] = [
  { id: '1', type: 'critical', icon: AlertTriangle, title: 'Critical Patient Alert', message: 'William Davis (P-2026-004) BP critical at 150/95', link: '/patients/P-2026-004', time: '2 min ago' },
  { id: '2', type: 'warning', icon: Pill, title: 'Low Stock Warning', message: 'Metformin 850mg down to 45 units. Reorder needed.', link: '/pharmacy', time: '15 min ago' },
  { id: '3', type: 'warning', icon: Pill, title: 'Out of Stock', message: 'Albuterol Inhaler is completely out of stock.', link: '/pharmacy', time: '32 min ago' },
  { id: '4', type: 'info', icon: CreditCard, title: 'Overdue Payment', message: 'Invoice INV-2026-005 ($180) is 7 days overdue.', link: '/billing', time: '1 hour ago' },
  { id: '5', type: 'info', icon: UserX, title: 'No-show Alert', message: 'Liam Anderson missed appointment today at 11:30 AM.', link: '/appointments', time: '2 hours ago' },
];

export default function SmartAlerts() {
  const [alerts] = useState<AlertItem[]>(defaultAlerts);
  const [dismissed, setDismissed] = useState<Set<string>>(new Set());
  const [expanded, setExpanded] = useState(true);

  const visibleAlerts = alerts.filter(a => !dismissed.has(a.id));
  const dismiss = (id: string) => setDismissed(prev => new Set(prev).add(id));

  if (visibleAlerts.length === 0) return null;

  const typeColors = {
    critical: { border: 'var(--mc-red)', bg: 'var(--mc-red-bg)', icon: 'var(--mc-red)' },
    warning: { border: 'var(--mc-amber)', bg: 'var(--mc-amber-bg)', icon: 'var(--mc-amber)' },
    info: { border: 'var(--mc-blue)', bg: 'var(--mc-blue-bg)', icon: 'var(--mc-blue)' },
  };

  return (
    <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.2 }}
      className="rounded-2xl shadow-mc-card overflow-hidden" style={{ backgroundColor: 'var(--mc-surface)' }}>
      <div className="px-6 py-4 border-b flex items-center justify-between" style={{ borderColor: 'var(--mc-border)' }}>
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg flex items-center justify-center relative" style={{ backgroundColor: 'var(--mc-red-bg)' }}>
            <Bell size={18} style={{ color: 'var(--mc-red)' }} />
            <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center text-white" style={{ backgroundColor: 'var(--mc-red)' }}>{visibleAlerts.length}</span>
          </div>
          <div>
            <h2 className="text-base font-semibold" style={{ color: 'var(--mc-text-primary)' }}>Priority Alerts</h2>
            <p className="text-xs" style={{ color: 'var(--mc-text-muted)' }}>{visibleAlerts.filter(a => a.type === 'critical').length} critical, {visibleAlerts.filter(a => a.type === 'warning').length} warnings</p>
          </div>
        </div>
        <button onClick={() => setExpanded(!expanded)} className="text-xs font-medium hover:underline" style={{ color: 'var(--mc-orange)' }}>
          {expanded ? 'Collapse' : 'Expand'}
        </button>
      </div>
      <AnimatePresence>
        {expanded && (
          <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden">
            <div className="divide-y" style={{ borderColor: 'var(--mc-border)' }}>
              {visibleAlerts.map((alert) => {
                const c = typeColors[alert.type];
                return (
                  <motion.div key={alert.id} layout exit={{ opacity: 0, x: -20 }}
                    className="flex items-start gap-3 py-3 px-6 group transition-colors hover:bg-black/[0.02]">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ backgroundColor: c.bg }}>
                      <alert.icon size={14} style={{ color: c.icon }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium truncate" style={{ color: 'var(--mc-text-primary)' }}>{alert.title}</p>
                        <span className="text-[10px] px-1.5 py-0.5 rounded-full font-medium flex-shrink-0" style={{ backgroundColor: c.bg, color: c.border }}>{alert.type}</span>
                      </div>
                      <p className="text-xs mt-0.5" style={{ color: 'var(--mc-text-secondary)' }}>{alert.message}</p>
                      <div className="flex items-center justify-between mt-1.5">
                        <span className="text-[10px]" style={{ color: 'var(--mc-text-muted)' }}>{alert.time}</span>
                        <Link to={alert.link} className="flex items-center gap-1 text-[11px] font-medium hover:underline" style={{ color: 'var(--mc-orange)' }}>
                          View <ChevronRight size={10} />
                        </Link>
                      </div>
                    </div>
                    <button onClick={() => dismiss(alert.id)} className="p-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: 'var(--mc-text-muted)' }}>
                      <X size={14} />
                    </button>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
