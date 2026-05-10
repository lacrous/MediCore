import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WifiOff, Wifi } from 'lucide-react';

export default function OfflineIndicator() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [showBack, setShowBack] = useState(false);

  useEffect(() => {
    const handleOnline = () => { setIsOnline(true); setShowBack(true); setTimeout(() => setShowBack(false), 3000); };
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => { window.removeEventListener('online', handleOnline); window.removeEventListener('offline', handleOffline); };
  }, []);

  return (
    <AnimatePresence>
      {!isOnline ? (
        <motion.div initial={{ y: -40 }} animate={{ y: 0 }} exit={{ y: -40 }}
          className="fixed top-0 left-0 right-0 z-[80] flex items-center justify-center gap-2 py-2 px-4 text-xs font-medium text-white"
          style={{ backgroundColor: 'var(--mc-amber)' }}>
          <WifiOff size={14} /> You are offline. Some features may be limited.
        </motion.div>
      ) : showBack ? (
        <motion.div initial={{ y: -40 }} animate={{ y: 0 }} exit={{ y: -40 }}
          className="fixed top-0 left-0 right-0 z-[80] flex items-center justify-center gap-2 py-2 px-4 text-xs font-medium text-white"
          style={{ backgroundColor: 'var(--mc-green)' }}>
          <Wifi size={14} /> You are back online.
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
