import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, LogOut, RefreshCw } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const TIMEOUT_MS = 30 * 60 * 1000; // 30 minutes
const WARNING_MS = 2 * 60 * 1000;  // 2 minutes warning

export default function SessionTimeout() {
  const { logout } = useAuth();
  const [showWarning, setShowWarning] = useState(false);
  const [remaining, setRemaining] = useState(120);
  let timer: ReturnType<typeof setTimeout>;
  let countdown: ReturnType<typeof setInterval>;

  const resetTimer = useCallback(() => {
    setShowWarning(false);
    clearTimeout(timer);
    clearInterval(countdown);
    timer = setTimeout(() => {
      setShowWarning(true);
      setRemaining(120);
      countdown = setInterval(() => {
        setRemaining((prev) => {
          if (prev <= 1) { clearInterval(countdown); logout(); return 0; }
          return prev - 1;
        });
      }, 1000);
    }, TIMEOUT_MS - WARNING_MS);
  }, [logout]);

  useEffect(() => {
    const events = ['mousedown', 'keydown', 'touchstart', 'scroll'];
    events.forEach(e => document.addEventListener(e, resetTimer));
    resetTimer();
    return () => {
      events.forEach(e => document.removeEventListener(e, resetTimer));
      clearTimeout(timer);
      clearInterval(countdown);
    };
  }, [resetTimer]);

  const formatTime = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;

  return (
    <AnimatePresence>
      {showWarning && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-[70] flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}>
          <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
            className="w-full max-w-sm rounded-2xl p-6 shadow-xl text-center" style={{ backgroundColor: 'var(--mc-surface)' }}>
            <div className="w-14 h-14 rounded-full mx-auto flex items-center justify-center mb-4" style={{ backgroundColor: 'var(--mc-amber-bg)' }}>
              <Clock size={24} style={{ color: 'var(--mc-amber)' }} />
            </div>
            <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--mc-text-primary)' }}>Session Expiring Soon</h3>
            <p className="text-sm mb-4" style={{ color: 'var(--mc-text-secondary)' }}>
              Your session will expire in <span className="font-bold" style={{ color: 'var(--mc-orange)' }}>{formatTime(remaining)}</span> due to inactivity.
            </p>
            <div className="flex items-center justify-center gap-3">
              <button onClick={logout}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium border transition-all"
                style={{ borderColor: 'var(--mc-border)', color: 'var(--mc-text-primary)' }}>
                <LogOut size={14} /> Logout
              </button>
              <button onClick={resetTimer}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all hover:opacity-90"
                style={{ backgroundColor: 'var(--mc-orange)', color: 'white' }}>
                <RefreshCw size={14} /> Stay Logged In
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
