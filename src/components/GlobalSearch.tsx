import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Users, CalendarCheck, Pill, CreditCard, FlaskConical, Stethoscope, FileText, ClipboardList } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface SearchItem {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ElementType;
  color: string;
  path: string;
}

const allItems: SearchItem[] = [
  { id: 'p1', title: 'Emma Johnson', subtitle: 'Patient · P-2026-001 · O+', icon: Users, color: 'var(--mc-gold)', path: '/patients/P-2026-001' },
  { id: 'p2', title: 'James Wilson', subtitle: 'Patient · P-2026-002 · A+', icon: Users, color: 'var(--mc-gold)', path: '/patients/P-2026-002' },
  { id: 'p3', title: 'William Davis', subtitle: 'Patient · P-2026-004 · B+', icon: Users, color: 'var(--mc-gold)', path: '/patients/P-2026-004' },
  { id: 'a1', title: 'Appointment Today', subtitle: 'Appointments · 4 scheduled', icon: CalendarCheck, color: 'var(--mc-orange)', path: '/appointments' },
  { id: 'rx1', title: 'Amoxicillin 500mg', subtitle: 'Prescription · Active', icon: FileText, color: 'var(--mc-blue)', path: '/prescriptions' },
  { id: 'ph1', title: 'Metformin 850mg', subtitle: 'Pharmacy · 45 units left', icon: Pill, color: 'var(--mc-green)', path: '/pharmacy' },
  { id: 'ph2', title: 'Amoxicillin 500mg', subtitle: 'Pharmacy · 120 units', icon: Pill, color: 'var(--mc-green)', path: '/pharmacy' },
  { id: 'b1', title: 'Invoice INV-2026-005', subtitle: 'Billing · $180 · Overdue', icon: CreditCard, color: 'var(--mc-purple)', path: '/billing' },
  { id: 'lab1', title: 'Blood Work - Emma Johnson', subtitle: 'Laboratory · Completed', icon: FlaskConical, color: 'var(--mc-cyan)', path: '/lab-tests' },
  { id: 'lab2', title: 'HbA1c - William Davis', subtitle: 'Laboratory · Critical', icon: FlaskConical, color: 'var(--mc-red)', path: '/lab-tests' },
  { id: 'd1', title: 'Dr. Omar Abu Al-Makarem', subtitle: 'Doctor · Gastroenterology', icon: Stethoscope, color: 'var(--mc-orange)', path: '/doctors' },
  { id: 'd2', title: 'Dr. Michael Chen', subtitle: 'Doctor · Cardiology', icon: Stethoscope, color: 'var(--mc-orange)', path: '/doctors' },
  { id: 'al1', title: 'Audit Logs', subtitle: 'System · 48 entries today', icon: ClipboardList, color: 'var(--mc-text-muted)', path: '/audit-logs' },
];

export default function GlobalSearch() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); setOpen(o => !o); }
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => { if (open) { setQuery(''); setSelected(0); setTimeout(() => inputRef.current?.focus(), 100); } }, [open]);

  const filtered = query.length < 1 ? allItems.slice(0, 6) : allItems.filter(item =>
    item.title.toLowerCase().includes(query.toLowerCase()) || item.subtitle.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = useCallback((item: SearchItem) => {
    setOpen(false);
    navigate(item.path);
  }, [navigate]);

  const handleKeyNav = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setSelected(s => Math.min(filtered.length - 1, s + 1)); }
    if (e.key === 'ArrowUp') { e.preventDefault(); setSelected(s => Math.max(0, s - 1)); }
    if (e.key === 'Enter' && filtered[selected]) handleSelect(filtered[selected]);
  }, [filtered, selected, handleSelect]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-[80] flex items-start justify-center pt-[15vh] p-4" style={{ backgroundColor: 'rgba(0,0,0,0.6)' }} onClick={() => setOpen(false)}>
          <motion.div initial={{ scale: 0.95, opacity: 0, y: -20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0, y: -20 }}
            className="w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden" style={{ backgroundColor: 'var(--mc-surface)' }} onClick={e => e.stopPropagation()}>
            <div className="flex items-center gap-3 px-4 py-3.5 border-b" style={{ borderColor: 'var(--mc-border)' }}>
              <Search size={18} style={{ color: 'var(--mc-text-muted)' }} />
              <input ref={inputRef} value={query} onChange={e => { setQuery(e.target.value); setSelected(0); }}
                onKeyDown={handleKeyNav} placeholder="Search patients, appointments, medications..."
                className="flex-1 bg-transparent outline-none text-sm" style={{ color: 'var(--mc-text-primary)' }} />
              <kbd className="hidden sm:inline-block px-1.5 py-0.5 rounded text-[10px] font-mono border" style={{ borderColor: 'var(--mc-border)', color: 'var(--mc-text-muted)' }}>ESC</kbd>
            </div>
            <div className="max-h-[50vh] overflow-y-auto py-2">
              {filtered.length === 0 ? (
                <div className="py-8 text-center text-sm" style={{ color: 'var(--mc-text-muted)' }}>No results found</div>
              ) : (
                filtered.map((item, i) => {
                  const Icon = item.icon;
                  const isSelected = i === selected;
                  return (
                    <button key={item.id} onClick={() => handleSelect(item)} onMouseEnter={() => setSelected(i)}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-start transition-all"
                      style={{ backgroundColor: isSelected ? 'var(--mc-bg)' : 'transparent' }}>
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${item.color}15` }}>
                        <Icon size={14} style={{ color: item.color }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate" style={{ color: 'var(--mc-text-primary)' }}>{item.title}</p>
                        <p className="text-xs truncate" style={{ color: 'var(--mc-text-muted)' }}>{item.subtitle}</p>
                      </div>
                      {isSelected && <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: 'var(--mc-orange)' }} />}
                    </button>
                  );
                })
              )}
            </div>
            <div className="px-4 py-2.5 border-t flex items-center gap-3" style={{ borderColor: 'var(--mc-border)' }}>
              <span className="text-[10px]" style={{ color: 'var(--mc-text-muted)' }}>
                <kbd className="px-1 py-0.5 rounded border text-[9px] font-mono mr-0.5" style={{ borderColor: 'var(--mc-border)' }}>↑↓</kbd> Navigate
              </span>
              <span className="text-[10px]" style={{ color: 'var(--mc-text-muted)' }}>
                <kbd className="px-1 py-0.5 rounded border text-[9px] font-mono mr-0.5" style={{ borderColor: 'var(--mc-border)' }}>Enter</kbd> Select
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
