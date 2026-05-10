import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, CalendarCheck, Users, Pill, CreditCard, Settings, Hospital, X,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Avatar from './Avatar';
import { useLanguage } from '@/context/LanguageContext';

const navItems = [
  { icon: LayoutDashboard, labelKey: 'sidebar.dashboard', path: '/' },
  { icon: CalendarCheck, labelKey: 'sidebar.appointments', path: '/appointments' },
  { icon: Users, labelKey: 'sidebar.patients', path: '/patients' },
  { icon: Pill, labelKey: 'sidebar.pharmacy', path: '/pharmacy' },
  { icon: CreditCard, labelKey: 'sidebar.billing', path: '/billing' },
  { icon: Settings, labelKey: 'sidebar.settings', path: '/settings' },
];

interface MobileMenuProps { isOpen: boolean; onClose: () => void; }

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const location = useLocation();
  const { t, isRTL } = useLanguage();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.5 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black z-40 lg:hidden" onClick={onClose} />
          <motion.aside initial={{ x: isRTL ? '100%' : '-100%' }} animate={{ x: 0 }} exit={{ x: isRTL ? '100%' : '-100%' }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="fixed top-0 h-screen w-[260px] z-50 flex flex-col border-r lg:hidden"
            style={{ backgroundColor: 'var(--mc-surface)', borderColor: 'var(--mc-border)', left: isRTL ? 'auto' : 0, right: isRTL ? 0 : 'auto' }}>
            <div className="flex items-center justify-between px-6 pt-6 pb-4">
              <div className="flex items-center gap-3">
                <Hospital size={28} style={{ color: 'var(--mc-gold)' }} />
                <span className="text-2xl font-semibold tracking-tight" style={{ color: 'var(--mc-text-primary)' }}>{t('app.name')}</span>
              </div>
              <button onClick={onClose} className="p-1 rounded-lg transition-colors hover:bg-[var(--mc-surface-elevated)]">
                <X size={20} style={{ color: 'var(--mc-text-secondary)' }} />
              </button>
            </div>
            <div className="mx-6 h-px" style={{ backgroundColor: 'var(--mc-border)' }} />
            <nav className="flex-1 px-3 py-4 space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <NavLink key={item.path} to={item.path} end onClick={onClose}
                    className="relative flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-all duration-200 no-underline"
                    style={({ isActive }: { isActive: boolean }) => isActive ? { backgroundColor: 'var(--mc-orange-muted)' } : {}}>
                    {isActive && (
                      <div className="absolute top-1/2 -translate-y-1/2 w-[3px] h-6 rounded"
                        style={{ backgroundColor: 'var(--mc-gold)', boxShadow: '0 0 8px rgba(212,175,55,0.4)', left: isRTL ? 'auto' : 0, right: isRTL ? 0 : 'auto', borderRadius: isRTL ? '4px 0 0 4px' : '0 4px 4px 0' }} />
                    )}
                    {isActive && (
                      <div className="absolute top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full"
                        style={{ backgroundColor: 'var(--mc-gold)', left: isRTL ? 'auto' : 4, right: isRTL ? 4 : 'auto' }} />
                    )}
                    <Icon size={20} style={{ color: isActive ? 'var(--mc-orange)' : 'var(--mc-text-secondary)' }} />
                    <span className={`text-sm ${isActive ? 'font-semibold' : 'font-medium'}`} style={{ color: isActive ? 'var(--mc-orange)' : 'var(--mc-text-secondary)' }}>
                      {t(item.labelKey)}
                    </span>
                  </NavLink>
                );
              })}
            </nav>
            <div className="px-4 py-5">
              <div className="h-px mb-4" style={{ backgroundColor: 'var(--mc-border)' }} />
              <div className="flex items-center gap-3">
                <Avatar name="OA" size={40} color="var(--mc-gold)" />
                <div>
                  <p className="text-sm font-semibold" style={{ color: 'var(--mc-text-primary)' }}>Dr. Omar Abu Al-Makarem</p>
                  <p className="text-xs" style={{ color: 'var(--mc-text-secondary)' }}>Gastroenterologist and Diabetologist</p>
                </div>
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
