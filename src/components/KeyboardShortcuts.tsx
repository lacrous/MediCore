import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Command, Search, ArrowLeft, Moon, Globe } from 'lucide-react';

interface ShortcutItem {
  key: string;
  description: string;
  icon: React.ElementType;
}

const shortcuts: ShortcutItem[] = [
  { key: 'Ctrl + K', description: 'Global search', icon: Search },
  { key: 'Ctrl + B', description: 'Toggle sidebar', icon: ArrowLeft },
  { key: 'Ctrl + T', description: 'Toggle theme', icon: Moon },
  { key: 'Ctrl + L', description: 'Toggle language', icon: Globe },
  { key: 'Ctrl + ?', description: 'Show shortcuts', icon: Command },
  { key: 'Esc', description: 'Close modal / dialog', icon: X },
];

export default function KeyboardShortcuts() {
  const [show, setShow] = useState(false);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') { setShow(false); return; }
    if (e.ctrlKey && e.key === '?') { e.preventDefault(); setShow(s => !s); }
    if (e.ctrlKey && e.key.toLowerCase() === 'b') { e.preventDefault(); document.dispatchEvent(new CustomEvent('toggle-sidebar')); }
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-[75] flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }} onClick={() => setShow(false)}>
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
            className="w-full max-w-sm rounded-2xl p-6 shadow-xl" style={{ backgroundColor: 'var(--mc-surface)' }} onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-semibold" style={{ color: 'var(--mc-text-primary)' }}>Keyboard Shortcuts</h3>
              <button onClick={() => setShow(false)} className="p-1 rounded-lg hover:bg-black/5" style={{ color: 'var(--mc-text-muted)' }}><X size={16} /></button>
            </div>
            <div className="space-y-3">
              {shortcuts.map((s) => (
                <div key={s.key} className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-3">
                    <s.icon size={16} style={{ color: 'var(--mc-text-muted)' }} />
                    <span className="text-sm" style={{ color: 'var(--mc-text-secondary)' }}>{s.description}</span>
                  </div>
                  <kbd className="px-2 py-1 rounded-md text-xs font-mono font-medium border" style={{ backgroundColor: 'var(--mc-bg)', borderColor: 'var(--mc-border)', color: 'var(--mc-text-primary)' }}>
                    {s.key}
                  </kbd>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
