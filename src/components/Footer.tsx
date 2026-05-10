import { motion } from 'framer-motion';
import { Heart, Zap, Hospital, Mail, MapPin, Phone } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function Footer() {
  const { t, isRTL } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="mt-8 border-t"
      style={{ backgroundColor: 'var(--mc-surface)', borderColor: 'var(--mc-border)' }}
    >
      {/* Main Footer Content */}
      <div className="px-6 py-8 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-[1440px] mx-auto">
          
          {/* Brand Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <Hospital size={24} style={{ color: 'var(--mc-gold)' }} />
              <span className="text-lg font-bold tracking-tight" style={{ color: 'var(--mc-text-primary)' }}>
                {t('app.name')}
              </span>
            </div>
            <p className="text-sm leading-relaxed max-w-[280px]" style={{ color: 'var(--mc-text-secondary)' }}>
              {isRTL 
                ? 'نظام إدارة المستشفيات المتكامل لإدارة المرضى والمواعيد والفواتير والمخزون بكفاءة.'
                : 'Comprehensive hospital management system for efficiently managing patients, appointments, billing, and inventory.'}
            </p>
            <div className="flex items-center gap-4 pt-1">
              <a href="#" className="p-2 rounded-lg transition-colors hover:bg-[var(--mc-surface-elevated)]" style={{ color: 'var(--mc-text-muted)' }} title="Email">
                <Mail size={16} />
              </a>
              <a href="#" className="p-2 rounded-lg transition-colors hover:bg-[var(--mc-surface-elevated)]" style={{ color: 'var(--mc-text-muted)' }} title="Phone">
                <Phone size={16} />
              </a>
              <a href="#" className="p-2 rounded-lg transition-colors hover:bg-[var(--mc-surface-elevated)]" style={{ color: 'var(--mc-text-muted)' }} title="Location">
                <MapPin size={16} />
              </a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-[0.08em]" style={{ color: 'var(--mc-text-primary)' }}>
              {isRTL ? 'روابط سريعة' : 'Quick Links'}
            </h3>
            <ul className="space-y-2.5">
              {[
                { label: t('sidebar.dashboard'), href: '/' },
                { label: t('sidebar.appointments'), href: '/appointments' },
                { label: t('sidebar.patients'), href: '/patients' },
                { label: t('sidebar.pharmacy'), href: '/pharmacy' },
                { label: t('sidebar.billing'), href: '/billing' },
                { label: t('sidebar.settings'), href: '/settings' },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm transition-colors duration-200 hover:no-underline"
                    style={{ color: 'var(--mc-text-secondary)' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--mc-orange)')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--mc-text-secondary)')}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Credits Column */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-[0.08em]" style={{ color: 'var(--mc-text-primary)' }}>
              {isRTL ? 'عن النظام' : 'About System'}
            </h3>
            <div className="space-y-3">
              <div
                className="flex items-center gap-3 px-4 py-3 rounded-xl border"
                style={{ backgroundColor: 'var(--mc-bg)', borderColor: 'var(--mc-border)' }}
              >
                <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--mc-gold-muted)' }}>
                  <Heart size={16} style={{ color: 'var(--mc-gold)' }} />
                </div>
                <div>
                  <p className="text-xs font-medium" style={{ color: 'var(--mc-text-muted)' }}>
                    {isRTL ? 'صُنع بواسطة' : 'Made by'}
                  </p>
                  <p className="text-sm font-semibold" style={{ color: 'var(--mc-gold)' }}>
                    Hassan El-Deghidy
                  </p>
                </div>
              </div>

              <div
                className="flex items-center gap-3 px-4 py-3 rounded-xl border"
                style={{ backgroundColor: 'var(--mc-bg)', borderColor: 'var(--mc-border)' }}
              >
                <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--mc-orange-muted)' }}>
                  <Zap size={16} style={{ color: 'var(--mc-orange)' }} />
                </div>
                <div>
                  <p className="text-xs font-medium" style={{ color: 'var(--mc-text-muted)' }}>
                    {isRTL ? 'مشغل بواسطة' : 'Powered By'}
                  </p>
                  <p className="text-sm font-semibold" style={{ color: 'var(--mc-orange)' }}>
                    Nurovia
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t px-6 py-4" style={{ borderColor: 'var(--mc-border)', backgroundColor: 'var(--mc-bg)' }}>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 max-w-[1440px] mx-auto">
          <p className="text-xs" style={{ color: 'var(--mc-text-muted)' }}>
            &copy; {currentYear} {t('app.name')}. {isRTL ? 'جميع الحقوق محفوظة.' : 'All rights reserved.'}
          </p>
          <div className="flex items-center gap-1.5">
            <span className="text-xs" style={{ color: 'var(--mc-text-muted)' }}>
              {isRTL ? 'صُنع بحب بواسطة' : 'Crafted with'}
            </span>
            <Heart size={10} style={{ color: 'var(--mc-red)' }} fill="var(--mc-red)" />
            <span className="text-xs font-medium" style={{ color: 'var(--mc-gold)' }}>Hassan El-Deghidy</span>
            <span className="text-xs" style={{ color: 'var(--mc-text-muted)' }}>{isRTL ? '— مشغل بواسطة' : '— Powered by'}</span>
            <span className="text-xs font-medium" style={{ color: 'var(--mc-orange)' }}>Nurovia</span>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}
