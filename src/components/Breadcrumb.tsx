import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const routeLabels: Record<string, string> = {
  '': 'sidebar.dashboard',
  'appointments': 'sidebar.appointments',
  'calendar': 'app.calendar',
  'patients': 'sidebar.patients',
  'prescriptions': 'Prescriptions',
  'pharmacy': 'sidebar.pharmacy',
  'billing': 'sidebar.billing',
  'audit-logs': 'Audit Logs',
  'settings': 'sidebar.settings',
  'lab-tests': 'Laboratory',
  'radiology': 'Radiology',
  'surgery': 'Surgery',
  'rooms': 'Rooms & Beds',
  'doctors': 'Doctors',
  'reports': 'Reports',
};

export default function Breadcrumb() {
  const location = useLocation();
  const { t } = useLanguage();
  const paths = location.pathname.split('/').filter(Boolean);
  if (paths.length === 0) return null;

  return (
    <nav className="flex items-center gap-1.5 text-sm mb-4" aria-label="Breadcrumb">
      <Link to="/" className="flex items-center gap-1 transition-colors hover:opacity-80" style={{ color: 'var(--mc-text-muted)' }}>
        <Home size={14} />
      </Link>
      {paths.map((segment, i) => {
        const isLast = i === paths.length - 1;
        const to = '/' + paths.slice(0, i + 1).join('/');
        return (
          <div key={i} className="flex items-center gap-1.5">
            <ChevronRight size={14} style={{ color: 'var(--mc-text-muted)' }} />
            {isLast ? (
              <span className="font-medium" style={{ color: 'var(--mc-orange)' }}>
                {routeLabels[segment] ? t(routeLabels[segment]) : segment}
              </span>
            ) : (
              <Link to={to} className="transition-colors hover:opacity-80" style={{ color: 'var(--mc-text-muted)' }}>
                {routeLabels[segment] ? t(routeLabels[segment]) : segment}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
}
