import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Plus, Package, AlertTriangle, Pill, MoreHorizontal, TrendingDown } from 'lucide-react';
import PrimaryButton from '@/components/PrimaryButton';
import Dropdown from '@/components/Dropdown';
import { useDropdown } from '@/hooks/useDropdown';
import { useLanguage } from '@/context/LanguageContext';

interface Medication { name: string; category: string; stock: number; unit: string; expiry: string; status: 'In Stock' | 'Low Stock' | 'Out of Stock'; price: string; }

const medications: Medication[] = [
  { name: 'Amoxicillin 500mg', category: 'Antibiotic', stock: 1240, unit: 'tablets', expiry: 'Dec 2026', status: 'In Stock', price: '$0.45' },
  { name: 'Lisinopril 10mg', category: 'Antihypertensive', stock: 856, unit: 'tablets', expiry: 'Nov 2026', status: 'In Stock', price: '$0.32' },
  { name: 'Metformin 850mg', category: 'Antidiabetic', stock: 45, unit: 'tablets', expiry: 'Oct 2026', status: 'Low Stock', price: '$0.28' },
  { name: 'Atorvastatin 20mg', category: 'Statin', stock: 2100, unit: 'tablets', expiry: 'Jan 2027', status: 'In Stock', price: '$0.55' },
  { name: 'Albuterol Inhaler', category: 'Bronchodilator', stock: 0, unit: 'inhalers', expiry: 'Sep 2026', status: 'Out of Stock', price: '$18.50' },
  { name: 'Omeprazole 20mg', category: 'PPI', stock: 1890, unit: 'capsules', expiry: 'Mar 2027', status: 'In Stock', price: '$0.22' },
  { name: 'Ibuprofen 400mg', category: 'NSAID', stock: 67, unit: 'tablets', expiry: 'Aug 2026', status: 'Low Stock', price: '$0.12' },
  { name: 'Insulin Glargine', category: 'Antidiabetic', stock: 23, unit: 'vials', expiry: 'Jul 2026', status: 'Low Stock', price: '$142.00' },
  { name: 'Cetirizine 10mg', category: 'Antihistamine', stock: 3450, unit: 'tablets', expiry: 'Apr 2027', status: 'In Stock', price: '$0.15' },
  { name: 'Amlodipine 5mg', category: 'Antihypertensive', stock: 1560, unit: 'tablets', expiry: 'Feb 2027', status: 'In Stock', price: '$0.38' },
];

function StockBadge({ status }: { status: string }) {
  const { t } = useLanguage();
  const colors: Record<string, { bg: string; color: string; border: string }> = {
    'In Stock': { bg: 'var(--mc-green-bg)', color: 'var(--mc-green)', border: 'rgba(34,197,94,0.25)' },
    'Low Stock': { bg: 'var(--mc-amber-bg)', color: 'var(--mc-amber)', border: 'rgba(245,158,11,0.25)' },
    'Out of Stock': { bg: 'var(--mc-red-bg)', color: 'var(--mc-red)', border: 'rgba(239,68,68,0.25)' },
  };
  const c = colors[status];
  const statusMap: Record<string, string> = { 'In Stock': 'status.inStock', 'Low Stock': 'status.lowStock', 'Out of Stock': 'status.outOfStock' };

  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border" style={{ backgroundColor: c.bg, color: c.color, borderColor: c.border }}>
      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: c.color }} />{t(statusMap[status] || status)}
    </span>
  );
}

function StockBar({ stock, max = 3500 }: { stock: number; max?: number }) {
  const pct = Math.min((stock / max) * 100, 100);
  const color = stock === 0 ? 'var(--mc-red)' : stock < 100 ? 'var(--mc-amber)' : 'var(--mc-green)';
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--mc-surface-elevated)' }}>
        <div className="h-full rounded-full" style={{ width: `${pct}%`, backgroundColor: color }} />
      </div>
      <span className="text-xs font-medium w-10 text-end" style={{ color: 'var(--mc-text-muted)' }}>{stock}</span>
    </div>
  );
}

export default function Pharmacy() {
  const [search, setSearch] = useState('');
  const { getDropdownId } = useDropdown();
  const { t } = useLanguage();

  const filtered = medications.filter((m) => m.name.toLowerCase().includes(search.toLowerCase()) || m.category.toLowerCase().includes(search.toLowerCase()));
  const lowStock = medications.filter(m => m.status === 'Low Stock').length;
  const outOfStock = medications.filter(m => m.status === 'Out of Stock').length;
  const totalItems = medications.reduce((sum, m) => sum + m.stock, 0);

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
        <h1 className="text-2xl font-semibold tracking-tight" style={{ color: 'var(--mc-text-primary)' }}>{t('pharmacy.title')}</h1>
        <p className="text-sm mt-1" style={{ color: 'var(--mc-text-secondary)' }}>{t('pharmacy.subtitle')}</p>
      </motion.div>

      {(lowStock > 0 || outOfStock > 0) && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.1 }}
          className="flex items-center gap-3 px-4 py-3 rounded-xl border"
          style={{ backgroundColor: 'var(--mc-red-bg)', borderColor: 'rgba(239,68,68,0.2)' }}>
          <AlertTriangle size={18} style={{ color: 'var(--mc-red)' }} />
          <p className="text-sm" style={{ color: 'var(--mc-red)' }}><strong>{lowStock + outOfStock}</strong> {t('pharmacy.alertMessage')}: {lowStock} {t('pharmacy.lowStock')}, {outOfStock} {t('pharmacy.outOfStock')}</p>
        </motion.div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { icon: Package, label: t('pharmacy.totalItems'), value: medications.length.toString(), color: 'var(--mc-gold)' },
          { icon: Pill, label: t('pharmacy.totalUnits'), value: totalItems.toLocaleString(), color: 'var(--mc-orange)' },
          { icon: TrendingDown, label: t('pharmacy.lowStock'), value: lowStock.toString(), color: 'var(--mc-amber)' },
          { icon: AlertTriangle, label: t('pharmacy.outOfStock'), value: outOfStock.toString(), color: 'var(--mc-red)' },
        ].map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.15 + i * 0.06 }}
            className="rounded-xl p-4 shadow-mc-card" style={{ backgroundColor: 'var(--mc-surface)' }}>
            <div className="flex items-center gap-2 mb-2"><s.icon size={16} style={{ color: s.color }} /><span className="text-xs font-medium" style={{ color: 'var(--mc-text-muted)' }}>{s.label}</span></div>
            <p className="text-xl font-bold" style={{ color: 'var(--mc-text-primary)' }}>{s.value}</p>
          </motion.div>
        ))}
      </div>

      <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: 0.3 }}
        className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 flex items-center gap-2.5 px-4 py-2.5 rounded-lg border" style={{ backgroundColor: 'var(--mc-surface)', borderColor: 'var(--mc-border)' }}>
          <Search size={16} style={{ color: 'var(--mc-text-muted)' }} />
          <input type="text" placeholder={t('pharmacy.searchPlaceholder')} value={search} onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent text-sm outline-none w-full" style={{ color: 'var(--mc-text-primary)' }} />
        </div>
        <PrimaryButton icon={<Plus size={16} />}>{t('pharmacy.addMedication')}</PrimaryButton>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.4 }}
        className="rounded-2xl shadow-mc-card overflow-hidden" style={{ backgroundColor: 'var(--mc-surface)' }}>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px]">
            <thead>
              <tr className="border-b" style={{ borderColor: 'var(--mc-border)' }}>
                {[t('pharmacy.medication'), t('pharmacy.category'), t('pharmacy.stockLevel'), t('pharmacy.expiry'), t('pharmacy.status'), t('pharmacy.price'), ''].map((h, i) => (
                  <th key={i} className="px-6 py-3 text-left text-[11px] font-semibold uppercase tracking-[0.06em]" style={{ color: 'var(--mc-text-muted)' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((m, idx) => {
                const did = getDropdownId();
                return (
                  <tr key={idx} className="border-b transition-colors hover:bg-black/[0.02]" style={{ borderColor: 'var(--mc-border)' }}>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'var(--mc-orange-muted)' }}>
                          <Pill size={16} style={{ color: 'var(--mc-orange)' }} />
                        </div>
                        <span className="text-sm font-medium" style={{ color: 'var(--mc-text-primary)' }}>{m.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm" style={{ color: 'var(--mc-text-secondary)' }}>{m.category}</td>
                    <td className="px-6 py-4 w-40"><StockBar stock={m.stock} /></td>
                    <td className="px-6 py-4 text-sm" style={{ color: 'var(--mc-text-secondary)' }}>{m.expiry}</td>
                    <td className="px-6 py-4"><StockBadge status={m.status} /></td>
                    <td className="px-6 py-4 text-sm font-medium" style={{ color: 'var(--mc-text-primary)' }}>{m.price}</td>
                    <td className="px-6 py-4 text-end">
                      <Dropdown id={did} trigger={<button className="p-1.5 rounded-md transition-colors hover:bg-[var(--mc-surface-elevated)]"><MoreHorizontal size={16} style={{ color: 'var(--mc-text-muted)' }} /></button>} align="right" width={160}>
                        <div className="py-1">
                          {[t('actions.viewDetails'), t('actions.editStock'), t('actions.orderMore')].map((a, i) => (
                            <button key={i} className="w-full text-start px-4 py-2 text-sm transition-colors hover:bg-black/[0.02]" style={{ color: 'var(--mc-text-primary)' }}>{a}</button>
                          ))}
                        </div>
                      </Dropdown>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
