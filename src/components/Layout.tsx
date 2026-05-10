import { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import MobileMenu from './MobileMenu';
import Footer from './Footer';
import Breadcrumb from './Breadcrumb';
import { AnimatePresence, motion } from 'framer-motion';

function useBreakpoint() {
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return {
    isMobile: width < 768,
    isTablet: width >= 768 && width < 1280,
    isDesktop: width >= 1280,
  };
}

const pageVariants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
};

export default function Layout() {
  const { isMobile, isTablet } = useBreakpoint();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { isRTL } = useLanguage();
  const sidebarWidth = isMobile ? 0 : isTablet ? 72 : 260;

  const getPageName = () => {
    const path = location.pathname.slice(1) || 'dashboard';
    return path.charAt(0).toUpperCase() + path.slice(1);
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--mc-bg)' }}>
      {!isMobile && <Sidebar collapsed={isTablet} />}
      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
      <TopBar
        sidebarWidth={sidebarWidth}
        onMenuClick={() => setMobileMenuOpen(true)}
        pageName={getPageName()}
      />
      <main
        className="pt-16 pb-8 px-4 sm:px-6 lg:px-8 overflow-y-auto"
        style={{
          marginLeft: isRTL ? 0 : sidebarWidth,
          marginRight: isRTL ? sidebarWidth : 0,
          minHeight: '100vh',
        }}
      >
        <div className="max-w-[1440px] mx-auto pt-6">
          <Breadcrumb />
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
          <Footer />
        </div>
      </main>
    </div>
  );
}
