import { useState } from 'react';
import { Search, Bell, ChevronDown, Menu, Sun, Moon } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Dropdown from './Dropdown';
import Avatar from './Avatar';
import NotificationDropdown from './NotificationDropdown';
import { useDropdown } from '@/hooks/useDropdown';
import { useTheme } from '@/context/ThemeContext';
import { useLanguage } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext';
import { LogOut } from 'lucide-react';

interface TopBarProps {
  sidebarWidth: number;
  onMenuClick: () => void;
  pageName: string;
}

export default function TopBar({ sidebarWidth, onMenuClick, pageName }: TopBarProps) {
  const [searchFocused, setSearchFocused] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);
  const { getDropdownId } = useDropdown();
  const notificationId = getDropdownId();
  const { toggleTheme, isDark } = useTheme();
  const { t, lang, toggleLang, isRTL } = useLanguage();
  const { user, logout } = useAuth();

  const handleNotificationOpen = () => { setHasUnread(false); };

  const pageKey = pageName.toLowerCase();
  const pageLabel = pageKey === 'dashboard' ? t('sidebar.dashboard')
    : pageKey === 'appointments' ? t('sidebar.appointments')
    : pageKey === 'patients' ? t('sidebar.patients')
    : pageKey === 'pharmacy' ? t('sidebar.pharmacy')
    : pageKey === 'billing' ? t('sidebar.billing')
    : pageKey === 'settings' ? t('sidebar.settings')
    : pageName;

  const placeholderText = pageKey === 'dashboard' ? t('app.searchPlaceholder') : `${t('app.searchPlaceholder')} ${pageLabel}...`;

  return (
    <motion.header
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="fixed top-0 h-16 z-30 flex items-center justify-between px-4 sm:px-6 lg:px-8 border-b"
      style={{
        left: isRTL ? 0 : sidebarWidth,
        right: isRTL ? sidebarWidth : 0,
        backgroundColor: 'var(--mc-bg)',
        borderColor: 'var(--mc-border)',
        transition: 'left 0.3s ease, right 0.3s ease, background-color 0.3s ease',
      }}
    >
      {/* Left: Breadcrumb + Mobile Menu */}
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-lg transition-colors hover:bg-[var(--mc-surface-elevated)]"
          style={{ color: 'var(--mc-text-primary)', marginInlineStart: -8 }}
        >
          <Menu size={24} />
        </button>
        <nav className="hidden sm:flex items-center gap-1.5 text-[13px]">
          <Link
            to="/"
            className="transition-colors hover:no-underline"
            style={{ color: 'var(--mc-text-secondary)' }}
            onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => (e.currentTarget.style.color = 'var(--mc-text-primary)')}
            onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => (e.currentTarget.style.color = 'var(--mc-text-secondary)')}
          >
            {t('sidebar.dashboard')}
          </Link>
          {pageKey !== 'dashboard' && (
            <>
              <span style={{ color: 'var(--mc-text-muted)' }}>/</span>
              <span className="font-medium" style={{ color: 'var(--mc-text-primary)' }}>{pageLabel}</span>
            </>
          )}
        </nav>
      </div>

      {/* Right: Search + Language + Theme + Notification + Profile */}
      <div className="flex items-center gap-2 sm:gap-4">
        {/* Search */}
        <div
          className={`hidden md:flex items-center gap-2.5 px-4 py-2 rounded-lg border transition-all duration-200 ${searchFocused ? 'shadow-[0_0_0_3px_rgba(212,175,55,0.15)]' : ''}`}
          style={{ width: 280, backgroundColor: 'var(--mc-surface)', borderColor: searchFocused ? 'var(--mc-border-active)' : 'var(--mc-border)' }}
        >
          <Search size={16} style={{ color: 'var(--mc-text-muted)', flexShrink: 0 }} />
          <input type="text" placeholder={placeholderText} className="bg-transparent text-sm outline-none w-full"
            style={{ color: 'var(--mc-text-primary)' }} onFocus={() => setSearchFocused(true)} onBlur={() => setSearchFocused(false)} />
        </div>

        {/* Language Toggle */}
        <button
          onClick={toggleLang}
          className="p-2 rounded-lg transition-colors hover:bg-[var(--mc-surface-elevated)] text-xs font-bold"
          style={{ color: 'var(--mc-text-secondary)', minWidth: 32 }}
          title={lang === 'ar' ? 'Switch to English' : 'التبديل إلى العربية'}
        >
          {lang === 'ar' ? 'EN' : 'عربي'}
        </button>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg transition-colors hover:bg-[var(--mc-surface-elevated)]"
          style={{ color: 'var(--mc-text-secondary)' }}
          title={isDark ? t('settings.light') : t('settings.dark')}
        >
          {isDark ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        {/* Notification */}
        <Dropdown
          id={notificationId}
          trigger={
            <div className="relative p-2 rounded-lg transition-colors hover:bg-[var(--mc-surface-elevated)] cursor-pointer" onClick={handleNotificationOpen}>
              <Bell size={20} style={{ color: 'var(--mc-text-secondary)' }} />
              {hasUnread && <span className="absolute top-1.5 end-1.5 w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--mc-orange)' }} />}
            </div>
          }
          align={isRTL ? 'left' : 'right'}
          width={360}
        >
          <NotificationDropdown />
        </Dropdown>

        {/* Profile + Logout */}
        <div className="hidden md:flex items-center gap-3">
          <div className="flex items-center gap-2.5 cursor-pointer">
            <Avatar name={user?.name || 'SM'} size={36} color="var(--mc-gold)" bgColor="var(--mc-surface-elevated)" />
            <div className="hidden xl:block">
              <p className="text-sm font-semibold leading-tight" style={{ color: 'var(--mc-text-primary)' }}>{user?.name || 'Dr. Omar Abu Al-Makarem'}</p>
              <p className="text-xs leading-tight" style={{ color: 'var(--mc-text-secondary)' }}>{(user as any)?.specialization || user?.role || t('app.administrator')}</p>
            </div>
            <ChevronDown size={14} style={{ color: 'var(--mc-text-secondary)' }} />
          </div>
          <button
            onClick={logout}
            className="p-2 rounded-lg transition-colors hover:bg-[var(--mc-red-bg)]"
            style={{ color: 'var(--mc-text-muted)' }}
            title={isRTL ? 'تسجيل الخروج' : 'Logout'}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--mc-red)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--mc-text-muted)')}
          >
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </motion.header>
  );
}
