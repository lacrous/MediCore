import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, CalendarCheck, Users, Pill, CreditCard, Settings, Hospital, CalendarDays, FileText, ClipboardList, FlaskConical, Stethoscope,
} from 'lucide-react';
import { motion } from 'framer-motion';
import Avatar from './Avatar';
import { useLanguage } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext';

type UserRole = 'admin' | 'doctor' | 'nurse' | 'receptionist';

const navItems: { icon: React.ElementType; labelKey: string; path: string; roles?: UserRole[] }[] = [
  { icon: LayoutDashboard, labelKey: 'sidebar.dashboard', path: '/' },
  { icon: CalendarCheck, labelKey: 'sidebar.appointments', path: '/appointments' },
  { icon: CalendarDays, labelKey: 'app.calendar', path: '/calendar' },
  { icon: Users, labelKey: 'sidebar.patients', path: '/patients' },
  { icon: FileText, labelKey: 'app.prescriptions', path: '/prescriptions', roles: ['admin', 'doctor', 'nurse'] },
  { icon: FlaskConical, labelKey: 'app.laboratory', path: '/lab-tests', roles: ['admin', 'doctor', 'nurse'] },
  { icon: Stethoscope, labelKey: 'app.doctors', path: '/doctors' },
  { icon: Pill, labelKey: 'sidebar.pharmacy', path: '/pharmacy' },
  { icon: CreditCard, labelKey: 'sidebar.billing', path: '/billing', roles: ['admin', 'receptionist'] },
  { icon: ClipboardList, labelKey: 'app.auditLogs', path: '/audit-logs', roles: ['admin'] },
  { icon: Settings, labelKey: 'sidebar.settings', path: '/settings' },
];

interface SidebarProps {
  collapsed?: boolean;
}

export default function Sidebar({ collapsed = false }: SidebarProps) {
  const location = useLocation();
  const { t, isRTL } = useLanguage();
  const { user, hasRole } = useAuth();

  const visibleNavItems = navItems.filter(item => {
    if (!item.roles) return true;
    return hasRole(item.roles as UserRole[]);
  });

  return (
    <motion.aside
      initial={{ x: isRTL ? 20 : -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="fixed top-0 h-screen z-40 flex flex-col border-r"
      style={{
        width: collapsed ? 72 : 260,
        backgroundColor: 'var(--mc-surface)',
        borderColor: 'var(--mc-border)',
        ...(isRTL ? { right: 0, left: 'auto', borderLeftWidth: 1, borderRightWidth: 0 } : { left: 0, right: 'auto', borderRightWidth: 1, borderLeftWidth: 0 }),
      }}
    >
      {/* Logo */}
      <div className="px-6 pt-6 pb-4">
        <div className="flex items-center gap-3">
          <Hospital size={28} style={{ color: 'var(--mc-gold)' }} />
          {!collapsed && (
            <span className="text-2xl font-semibold tracking-tight" style={{ color: 'var(--mc-text-primary)' }}>
              {t('app.name')}
            </span>
          )}
        </div>
        <div className="mt-4 h-px" style={{ backgroundColor: 'var(--mc-border)' }} />
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-2 space-y-1">
        {visibleNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              end
              className={`relative flex items-center gap-3 px-4 py-2.5 rounded-lg cursor-pointer transition-all duration-200 no-underline ${!isActive ? 'hover:bg-[var(--mc-surface-elevated)]' : ''}`}
              style={({ isActive }: { isActive: boolean }) => isActive ? { backgroundColor: 'var(--mc-orange-muted)' } : {}}
            >
              {isActive && (
                <div
                  className="absolute top-1/2 -translate-y-1/2 w-[3px] h-6 rounded"
                  style={{
                    backgroundColor: 'var(--mc-gold)',
                    boxShadow: '0 0 8px rgba(212,175,55,0.4)',
                    left: isRTL ? 'auto' : 0,
                    right: isRTL ? 0 : 'auto',
                    borderRadius: isRTL ? '4px 0 0 4px' : '0 4px 4px 0',
                  }}
                />
              )}
              {isActive && !collapsed && (
                <div
                  className="absolute top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: 'var(--mc-gold)', left: isRTL ? 'auto' : 4, right: isRTL ? 4 : 'auto' }}
                />
              )}
              <Icon size={20} style={{ color: isActive ? 'var(--mc-orange)' : 'var(--mc-text-secondary)', flexShrink: 0 }} />
              {!collapsed && (
                <span className={`text-sm ${isActive ? 'font-semibold' : 'font-medium'}`} style={{ color: isActive ? 'var(--mc-orange)' : 'var(--mc-text-secondary)' }}>
                  {t(item.labelKey)}
                </span>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* User */}
      <div className="px-4 py-5">
        <div className="h-px mb-4" style={{ backgroundColor: 'var(--mc-border)' }} />
        <div className="flex items-center gap-3">
          <Avatar name={user?.name || 'User'} size={collapsed ? 36 : 40} color="var(--mc-gold)" />
          {!collapsed && (
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold truncate" style={{ color: 'var(--mc-text-primary)' }}>{user?.name || 'User'}</p>
              <p className="text-xs truncate capitalize" style={{ color: 'var(--mc-text-secondary)' }}>{t('app.administrator')}</p>
            </div>
          )}
        </div>
      </div>
    </motion.aside>
  );
}
