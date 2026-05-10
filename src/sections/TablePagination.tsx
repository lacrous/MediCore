import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

export default function TablePagination() {
  const [currentPage, setCurrentPage] = useState(1);
  const { t } = useLanguage();
  const totalItems = 24;
  const itemsPerPage = 10;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, delay: 0.6 }}
      className="flex flex-col sm:flex-row items-center justify-end gap-4 pt-4 px-6 pb-5 border-t"
      style={{ borderColor: 'var(--mc-border)' }}
    >
      <span className="text-[13px]" style={{ color: 'var(--mc-text-secondary)' }}>
        {t('app.showing')} {startItem}-{endItem} {t('app.of')} {totalItems} {t('sidebar.appointments').toLowerCase()}
      </span>
      <div className="flex items-center gap-2">
        <button onClick={() => setCurrentPage((p) => Math.max(1, p - 1))} disabled={currentPage === 1}
          className="w-9 h-9 flex items-center justify-center rounded-lg border transition-colors disabled:cursor-not-allowed"
          style={{ borderColor: 'var(--mc-border)', backgroundColor: 'transparent', color: currentPage === 1 ? 'var(--mc-text-muted)' : 'var(--mc-text-secondary)', opacity: currentPage === 1 ? 0.4 : 1 }}>
          <ChevronLeft size={16} />
        </button>
        <div className="hidden sm:flex items-center gap-2">
          {[1, 2, 3].map((page) => (
            <button key={page} onClick={() => setCurrentPage(page)}
              className="w-9 h-9 flex items-center justify-center rounded-lg border text-sm font-medium transition-all duration-200"
              style={{
                borderColor: page === currentPage ? 'var(--mc-gold)' : 'var(--mc-border)',
                backgroundColor: page === currentPage ? 'var(--mc-gold)' : 'transparent',
                color: page === currentPage ? 'var(--mc-bg)' : 'var(--mc-text-secondary)',
                boxShadow: page === currentPage ? '0 0 8px rgba(212,175,55,0.3)' : 'none',
              }}>{page}</button>
          ))}
        </div>
        <span className="sm:hidden text-sm font-medium px-2" style={{ color: 'var(--mc-text-secondary)' }}>{currentPage} / {totalPages}</span>
        <button onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}
          className="w-9 h-9 flex items-center justify-center rounded-lg border transition-colors disabled:cursor-not-allowed"
          style={{ borderColor: 'var(--mc-border)', backgroundColor: 'transparent', color: currentPage === totalPages ? 'var(--mc-text-muted)' : 'var(--mc-text-secondary)', opacity: currentPage === totalPages ? 0.4 : 1 }}>
          <ChevronRight size={16} />
        </button>
      </div>
    </motion.div>
  );
}
