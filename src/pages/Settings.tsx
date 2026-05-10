import { useState } from 'react';
import { motion } from 'framer-motion';
import { Bell, Shield, Sun, Moon, Palette, Globe, Mail, Smartphone, ChevronRight, Save, KeyRound, Fingerprint, Eye, EyeOff } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { useLanguage } from '@/context/LanguageContext';
import PrimaryButton from '@/components/PrimaryButton';

function SectionCard({ title, icon: Icon, children }: { title: string; icon: React.ElementType; children: React.ReactNode }) {
  return (
    <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}
      className="rounded-2xl shadow-mc-card overflow-hidden" style={{ backgroundColor: 'var(--mc-surface)' }}>
      <div className="px-6 py-4 border-b flex items-center gap-3" style={{ borderColor: 'var(--mc-border)' }}>
        <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'var(--mc-orange-muted)' }}>
          <Icon size={18} style={{ color: 'var(--mc-orange)' }} />
        </div>
        <h2 className="text-base font-semibold" style={{ color: 'var(--mc-text-primary)' }}>{title}</h2>
      </div>
      <div className="p-6 space-y-5">{children}</div>
    </motion.div>
  );
}

function SettingRow({ label, description, children }: { label: string; description?: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
      <div>
        <p className="text-sm font-medium" style={{ color: 'var(--mc-text-primary)' }}>{label}</p>
        {description && <p className="text-xs mt-0.5" style={{ color: 'var(--mc-text-muted)' }}>{description}</p>}
      </div>
      <div>{children}</div>
    </div>
  );
}

function ToggleSwitch({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button onClick={() => onChange(!checked)}
      className="relative w-11 h-6 rounded-full transition-colors duration-200 flex-shrink-0"
      style={{ backgroundColor: checked ? 'var(--mc-orange)' : 'var(--mc-surface-elevated)' }}>
      <div className="absolute top-0.5 w-5 h-5 rounded-full transition-transform duration-200"
        style={{ backgroundColor: 'white', transform: checked ? 'translateX(22px)' : 'translateX(2px)', boxShadow: '0 1px 3px rgba(0,0,0,0.2)' }} />
    </button>
  );
}

export default function Settings() {
  const { toggleTheme, isDark } = useTheme();
  const { t, lang, toggleLang } = useLanguage();
  const [showPassword, setShowPassword] = useState(false);

  const [notifications, setNotifications] = useState({ email: true, push: true, appointments: true, billing: true, pharmacy: false });
  const [security, setSecurity] = useState({ twoFactor: true, loginAlerts: true, sessionTimeout: true });

  const updateNotif = (key: keyof typeof notifications) => setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
  const updateSecurity = (key: keyof typeof security) => setSecurity(prev => ({ ...prev, [key]: !prev[key] }));

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
        <h1 className="text-2xl font-semibold tracking-tight" style={{ color: 'var(--mc-text-primary)' }}>{t('settings.title')}</h1>
        <p className="text-sm mt-1" style={{ color: 'var(--mc-text-secondary)' }}>{t('settings.subtitle')}</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Appearance */}
          <SectionCard title={t('settings.appearance')} icon={Palette}>
            <SettingRow label={t('settings.theme')} description={t('settings.themeDesc')}>
              <div className="flex items-center gap-2 p-1 rounded-lg border" style={{ backgroundColor: 'var(--mc-bg)', borderColor: 'var(--mc-border)' }}>
                <button onClick={() => isDark && toggleTheme()}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium transition-all"
                  style={{ backgroundColor: !isDark ? 'var(--mc-surface)' : 'transparent', color: !isDark ? 'var(--mc-text-primary)' : 'var(--mc-text-muted)', boxShadow: !isDark ? '0 1px 3px rgba(0,0,0,0.1)' : 'none' }}>
                  <Sun size={14} /> {t('settings.light')}
                </button>
                <button onClick={() => !isDark && toggleTheme()}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium transition-all"
                  style={{ backgroundColor: isDark ? 'var(--mc-surface-elevated)' : 'transparent', color: isDark ? 'var(--mc-text-primary)' : 'var(--mc-text-muted)', boxShadow: isDark ? '0 1px 3px rgba(0,0,0,0.3)' : 'none' }}>
                  <Moon size={14} /> {t('settings.dark')}
                </button>
              </div>
            </SettingRow>
            <div className="h-px" style={{ backgroundColor: 'var(--mc-border)' }} />
            <SettingRow label={t('settings.language')} description="">
              <div className="flex items-center gap-2 p-1 rounded-lg border" style={{ backgroundColor: 'var(--mc-bg)', borderColor: 'var(--mc-border)' }}>
                <button onClick={() => lang !== 'ar' && toggleLang()}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium transition-all"
                  style={{ backgroundColor: lang === 'ar' ? 'var(--mc-surface)' : 'transparent', color: lang === 'ar' ? 'var(--mc-text-primary)' : 'var(--mc-text-muted)', boxShadow: lang === 'ar' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none' }}>
                  <span className="text-sm">🇸🇦</span> عربي
                </button>
                <button onClick={() => lang !== 'en' && toggleLang()}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium transition-all"
                  style={{ backgroundColor: lang === 'en' ? 'var(--mc-surface)' : 'transparent', color: lang === 'en' ? 'var(--mc-text-primary)' : 'var(--mc-text-muted)', boxShadow: lang === 'en' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none' }}>
                  <span className="text-sm">🇬🇧</span> English
                </button>
              </div>
            </SettingRow>
          </SectionCard>

          {/* Notifications */}
          <SectionCard title={t('settings.notifications')} icon={Bell}>
            <SettingRow label={t('settings.emailNotifications')} description={t('settings.emailDesc')}>
              <ToggleSwitch checked={notifications.email} onChange={() => updateNotif('email')} /></SettingRow>
            <div className="h-px" style={{ backgroundColor: 'var(--mc-border)' }} />
            <SettingRow label={t('settings.pushNotifications')} description={t('settings.pushDesc')}>
              <ToggleSwitch checked={notifications.push} onChange={() => updateNotif('push')} /></SettingRow>
            <div className="h-px" style={{ backgroundColor: 'var(--mc-border)' }} />
            <SettingRow label={t('settings.appointmentAlerts')} description={t('settings.appointmentAlertsDesc')}>
              <ToggleSwitch checked={notifications.appointments} onChange={() => updateNotif('appointments')} /></SettingRow>
            <div className="h-px" style={{ backgroundColor: 'var(--mc-border)' }} />
            <SettingRow label={t('settings.billingAlerts')} description={t('settings.billingAlertsDesc')}>
              <ToggleSwitch checked={notifications.billing} onChange={() => updateNotif('billing')} /></SettingRow>
            <div className="h-px" style={{ backgroundColor: 'var(--mc-border)' }} />
            <SettingRow label={t('settings.pharmacyAlerts')} description={t('settings.pharmacyAlertsDesc')}>
              <ToggleSwitch checked={notifications.pharmacy} onChange={() => updateNotif('pharmacy')} /></SettingRow>
          </SectionCard>

          {/* Security */}
          <SectionCard title={t('settings.security')} icon={Shield}>
            <SettingRow label={t('settings.twoFactor')} description={t('settings.twoFactorDesc')}>
              <ToggleSwitch checked={security.twoFactor} onChange={() => updateSecurity('twoFactor')} /></SettingRow>
            <div className="h-px" style={{ backgroundColor: 'var(--mc-border)' }} />
            <SettingRow label={t('settings.loginAlerts')} description={t('settings.loginAlertsDesc')}>
              <ToggleSwitch checked={security.loginAlerts} onChange={() => updateSecurity('loginAlerts')} /></SettingRow>
            <div className="h-px" style={{ backgroundColor: 'var(--mc-border)' }} />
            <SettingRow label={t('settings.sessionTimeout')} description={t('settings.sessionTimeoutDesc')}>
              <ToggleSwitch checked={security.sessionTimeout} onChange={() => updateSecurity('sessionTimeout')} /></SettingRow>
            <div className="h-px" style={{ backgroundColor: 'var(--mc-border)' }} />
            <SettingRow label={t('settings.changePassword')} description={t('settings.lastChanged')}>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <input type={showPassword ? 'text' : 'password'} defaultValue="••••••••"
                    className="w-32 px-3 py-1.5 rounded-md border text-sm outline-none"
                    style={{ backgroundColor: 'var(--mc-bg)', borderColor: 'var(--mc-border)', color: 'var(--mc-text-primary)' }} />
                  <button onClick={() => setShowPassword(!showPassword)} className="absolute end-2 top-1/2 -translate-y-1/2" style={{ color: 'var(--mc-text-muted)' }}>
                    {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                </div>
                <button className="p-1.5 rounded-md border transition-colors hover:bg-[var(--mc-surface-elevated)]" style={{ borderColor: 'var(--mc-border)' }}>
                  <KeyRound size={14} style={{ color: 'var(--mc-text-muted)' }} />
                </button>
              </div>
            </SettingRow>
          </SectionCard>
        </div>

        <div className="space-y-6">
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: 0.1 }}
            className="rounded-2xl shadow-mc-card p-6 text-center" style={{ backgroundColor: 'var(--mc-surface)' }}>
            <div className="w-20 h-20 rounded-full mx-auto flex items-center justify-center text-xl font-bold"
              style={{ backgroundColor: 'var(--mc-gold-muted)', color: 'var(--mc-gold)' }}>OA</div>
            <h3 className="text-lg font-semibold mt-4" style={{ color: 'var(--mc-text-primary)' }}>Dr. Omar Abu Al-Makarem</h3>
            <p className="text-sm" style={{ color: 'var(--mc-text-secondary)' }}>Gastroenterologist and Diabetologist</p>
            <p className="text-xs mt-1" style={{ color: 'var(--mc-text-muted)' }}>admin@medicore.com</p>
            <div className="mt-4 pt-4 border-t space-y-2 text-start" style={{ borderColor: 'var(--mc-border)' }}>
              <div className="flex justify-between text-sm"><span style={{ color: 'var(--mc-text-muted)' }}>{t('settings.role')}</span><span style={{ color: 'var(--mc-text-primary)' }}>{t('settings.headPhysician')}</span></div>
              <div className="flex justify-between text-sm"><span style={{ color: 'var(--mc-text-muted)' }}>{t('settings.department')}</span><span style={{ color: 'var(--mc-text-primary)' }}>Gastroenterology & Endocrinology</span></div>
              <div className="flex justify-between text-sm"><span style={{ color: 'var(--mc-text-muted)' }}>{t('settings.joined')}</span><span style={{ color: 'var(--mc-text-primary)' }}>Mar 2022</span></div>
            </div>
            <button className="mt-4 w-full py-2 rounded-lg border text-sm font-medium transition-colors hover:bg-[var(--mc-surface-elevated)]"
              style={{ borderColor: 'var(--mc-border)', color: 'var(--mc-text-primary)' }}>{t('settings.editProfile')}</button>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: 0.2 }}
            className="rounded-2xl shadow-mc-card overflow-hidden" style={{ backgroundColor: 'var(--mc-surface)' }}>
            <div className="px-6 py-4 border-b" style={{ borderColor: 'var(--mc-border)' }}>
              <h3 className="text-sm font-semibold" style={{ color: 'var(--mc-text-primary)' }}>{t('settings.quickLinks')}</h3>
            </div>
            <div className="divide-y" style={{ borderColor: 'var(--mc-border)' }}>
              {[
                { icon: Globe, label: t('settings.language') },
                { icon: Mail, label: t('settings.emailSettings') },
                { icon: Smartphone, label: t('settings.connectedDevices') },
                { icon: Fingerprint, label: t('settings.apiKeys') },
              ].map((item, i) => (
                <button key={i} className="w-full flex items-center justify-between px-6 py-3 text-sm transition-colors hover:bg-black/[0.02]"
                  style={{ color: 'var(--mc-text-primary)' }}>
                  <div className="flex items-center gap-3"><item.icon size={16} style={{ color: 'var(--mc-text-muted)' }} /><span>{item.label}</span></div>
                  <ChevronRight size={14} style={{ color: 'var(--mc-text-muted)' }} />
                </button>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: 0.3 }}
            className="flex justify-end">
            <PrimaryButton icon={<Save size={16} />}>{t('settings.saveChanges')}</PrimaryButton>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
