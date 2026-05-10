import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, X } from 'lucide-react';
import { create } from 'zustand';

interface ConfirmState {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText: string;
  cancelText: string;
  variant: 'danger' | 'warning' | 'info';
  onConfirm: (() => void) | null;
  onCancel: (() => void) | null;
  open: (opts: Partial<Omit<ConfirmState, 'isOpen' | 'open' | 'close'>>) => void;
  close: () => void;
}

export const useConfirmStore = create<ConfirmState>((set) => ({
  isOpen: false,
  title: 'Are you sure?',
  message: '',
  confirmText: 'Confirm',
  cancelText: 'Cancel',
  variant: 'danger',
  onConfirm: null,
  onCancel: null,
  open: (opts) => set({ isOpen: true, ...opts }),
  close: () => set({ isOpen: false, onConfirm: null, onCancel: null }),
}));

export function confirm(opts: { title?: string; message: string; confirmText?: string; cancelText?: string; variant?: 'danger' | 'warning' | 'info' }) {
  return new Promise<boolean>((resolve) => {
    useConfirmStore.getState().open({
      ...opts,
      onConfirm: () => { useConfirmStore.getState().close(); resolve(true); },
      onCancel: () => { useConfirmStore.getState().close(); resolve(false); },
    });
  });
}

export default function ConfirmDialog() {
  const { isOpen, title, message, confirmText, cancelText, variant, onConfirm, onCancel, close } = useConfirmStore();
  const colors = {
    danger: { bg: 'var(--mc-red-bg)', icon: 'var(--mc-red)', btn: 'var(--mc-red)' },
    warning: { bg: 'var(--mc-amber-bg)', icon: 'var(--mc-amber)', btn: 'var(--mc-orange)' },
    info: { bg: 'var(--mc-blue-bg)', icon: 'var(--mc-blue)', btn: 'var(--mc-blue)' },
  };
  const c = colors[variant];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-[70] flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
            className="w-full max-w-md rounded-2xl p-6 shadow-xl" style={{ backgroundColor: 'var(--mc-surface)' }}>
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: c.bg }}>
                <AlertTriangle size={20} style={{ color: c.icon }} />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-lg font-semibold" style={{ color: 'var(--mc-text-primary)' }}>{title}</h3>
                  <button onClick={close} className="p-1 rounded-lg hover:bg-black/5" style={{ color: 'var(--mc-text-muted)' }}><X size={16} /></button>
                </div>
                <p className="text-sm mb-6" style={{ color: 'var(--mc-text-secondary)' }}>{message}</p>
                <div className="flex items-center justify-end gap-3">
                  <button onClick={() => onCancel?.()}
                    className="px-4 py-2 rounded-xl text-sm font-medium border transition-all hover:bg-[var(--mc-surface-elevated)]"
                    style={{ borderColor: 'var(--mc-border)', color: 'var(--mc-text-primary)' }}>{cancelText}</button>
                  <button onClick={() => onConfirm?.()}
                    className="px-4 py-2 rounded-xl text-sm font-medium transition-all hover:opacity-90"
                    style={{ backgroundColor: c.btn, color: 'white' }}>{confirmText}</button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
