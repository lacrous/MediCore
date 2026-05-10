import { motion } from 'framer-motion';
import { Home, Search, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';

export default function NotFound() {
  const navigate = useNavigate();
  const { t, isRTL } = useLanguage();
  return (
    <div className="min-h-screen flex items-center justify-center p-6" style={{ backgroundColor: 'var(--mc-bg)' }}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
        className="max-w-lg w-full text-center">
        <div className="relative inline-block mb-8">
          <div className="text-[120px] font-black leading-none tracking-tighter" style={{ color: 'var(--mc-orange)', opacity: 0.15 }}>404</div>
          <div className="absolute inset-0 flex items-center justify-center">
            <Search size={48} style={{ color: 'var(--mc-orange)' }} />
          </div>
        </div>
        <h1 className="text-2xl font-bold mb-2" style={{ color: 'var(--mc-text-primary)' }}>{t('app.pageNotFound')}</h1>
        <p className="text-sm mb-8" style={{ color: 'var(--mc-text-secondary)' }}>
          {t('app.pageNotFoundMessage')}
        </p>
        <div className="flex items-center justify-center gap-3">
          <button onClick={() => navigate(-1)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all border hover:bg-[var(--mc-surface)]"
            style={{ borderColor: 'var(--mc-border)', color: 'var(--mc-text-primary)' }}>
            <ArrowLeft size={16} className={isRTL ? 'rotate-180' : ''} /> {t('app.goBack')}
          </button>
          <button onClick={() => navigate('/')}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all hover:opacity-90"
            style={{ backgroundColor: 'var(--mc-orange)', color: 'white' }}>
            <Home size={16} /> {t('app.goDashboard')}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
