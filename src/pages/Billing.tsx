import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Plus, DollarSign, TrendingUp, CheckCircle2, Clock, AlertCircle, MoreHorizontal, Download } from 'lucide-react';
import PrimaryButton from '@/components/PrimaryButton';
import SecondaryButton from '@/components/SecondaryButton';
import Dropdown from '@/components/Dropdown';
import { useDropdown } from '@/hooks/useDropdown';
import { useLanguage } from '@/context/LanguageContext';
import { useToast } from '@/context/ToastContext';
import { exportToCsv } from '@/utils/exportCsv';

interface Invoice { id: string; patient: string; serviceKey: string; amount: string; date: string; dueDate: string; status: 'Paid' | 'Pending' | 'Overdue'; method: string; }

const invoices: Invoice[] = [
  { id: 'INV-2026-001', patient: 'Emma Johnson', serviceKey: 'billing.generalConsultation', amount: '$120.00', date: 'Jan 15, 2026', dueDate: 'Jan 30, 2026', status: 'Paid', method: 'Credit Card' },
  { id: 'INV-2026-002', patient: 'James Wilson', serviceKey: 'billing.labTests', amount: '$345.00', date: 'Jan 15, 2026', dueDate: 'Jan 30, 2026', status: 'Paid', method: 'Insurance' },
  { id: 'INV-2026-003', patient: 'Olivia Brown', serviceKey: 'billing.specialistVisit', amount: '$250.00', date: 'Jan 14, 2026', dueDate: 'Jan 29, 2026', status: 'Pending', method: '—' },
  { id: 'INV-2026-004', patient: 'William Davis', serviceKey: 'billing.surgery', amount: '$4,850.00', date: 'Jan 10, 2026', dueDate: 'Jan 25, 2026', status: 'Pending', method: '—' },
  { id: 'INV-2026-005', patient: 'Sophia Martinez', serviceKey: 'billing.physicalTherapy', amount: '$180.00', date: 'Jan 8, 2026', dueDate: 'Jan 23, 2026', status: 'Overdue', method: '—' },
  { id: 'INV-2026-006', patient: 'Liam Anderson', serviceKey: 'billing.emergencyCare', amount: '$890.00', date: 'Jan 5, 2026', dueDate: 'Jan 20, 2026', status: 'Paid', method: 'Debit Card' },
  { id: 'INV-2026-007', patient: 'Ava Thomas', serviceKey: 'billing.vaccination', amount: '$75.00', date: 'Jan 4, 2026', dueDate: 'Jan 19, 2026', status: 'Paid', method: 'Cash' },
  { id: 'INV-2026-008', patient: 'Noah Jackson', serviceKey: 'billing.dental', amount: '$520.00', date: 'Jan 3, 2026', dueDate: 'Jan 18, 2026', status: 'Overdue', method: '—' },
  { id: 'INV-2026-009', patient: 'Isabella White', serviceKey: 'billing.eyeExam', amount: '$150.00', date: 'Jan 2, 2026', dueDate: 'Jan 17, 2026', status: 'Paid', method: 'Credit Card' },
  { id: 'INV-2026-010', patient: 'Mason Harris', serviceKey: 'billing.cardiology', amount: '$380.00', date: 'Jan 1, 2026', dueDate: 'Jan 16, 2026', status: 'Pending', method: '—' },
];

function PaymentBadge({ status }: { status: string }) {
  const { t } = useLanguage();
  const colors: Record<string, { bg: string; color: string; border: string; icon: typeof CheckCircle2 }> = {
    Paid: { bg: 'var(--mc-green-bg)', color: 'var(--mc-green)', border: 'rgba(34,197,94,0.25)', icon: CheckCircle2 },
    Pending: { bg: 'var(--mc-amber-bg)', color: 'var(--mc-amber)', border: 'rgba(245,158,11,0.25)', icon: Clock },
    Overdue: { bg: 'var(--mc-red-bg)', color: 'var(--mc-red)', border: 'rgba(239,68,68,0.25)', icon: AlertCircle },
  };
  const c = colors[status];
  const Icon = c.icon;
  const statusMap: Record<string, string> = { Paid: 'status.paid', Pending: 'status.pending', Overdue: 'status.overdue' };

  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border whitespace-nowrap" style={{ backgroundColor: c.bg, color: c.color, borderColor: c.border }}>
      <Icon size={12} /> {t(statusMap[status] || status)}
    </span>
  );
}

export default function Billing() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const { getDropdownId } = useDropdown();
  const { t, isRTL } = useLanguage();
  const { success } = useToast();

  const filtered = invoices.filter((inv) => {
    const matchSearch = inv.patient.toLowerCase().includes(search.toLowerCase()) || inv.id.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'All' || inv.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const totalRevenue = invoices.filter(i => i.status === 'Paid').reduce((sum, i) => sum + parseFloat(i.amount.replace('$','').replace(',','')), 0);
  const outstanding = invoices.filter(i => i.status !== 'Paid').reduce((sum, i) => sum + parseFloat(i.amount.replace('$','').replace(',','')), 0);
  const paidCount = invoices.filter(i => i.status === 'Paid').length;

  const stats = [
    { label: t('billing.totalRevenue'), value: `$${totalRevenue.toLocaleString()}`, icon: DollarSign, color: 'var(--mc-gold)', change: '+18.3%' },
    { label: t('billing.outstanding'), value: `$${outstanding.toLocaleString()}`, icon: AlertCircle, color: 'var(--mc-red)', change: t('billing.pending') },
    { label: t('billing.paidInvoices'), value: paidCount.toString(), icon: CheckCircle2, color: 'var(--mc-green)', change: t('billing.paid') },
    { label: t('billing.collectionRate'), value: '87%', icon: TrendingUp, color: 'var(--mc-orange)', change: '+4.2%' },
  ];

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
        <h1 className="text-2xl font-semibold tracking-tight" style={{ color: 'var(--mc-text-primary)' }}>{t('billing.title')}</h1>
        <p className="text-sm mt-1" style={{ color: 'var(--mc-text-secondary)' }}>{t('billing.subtitle')}</p>
      </motion.div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.1 + i * 0.06 }}
            className="rounded-xl p-4 shadow-mc-card" style={{ backgroundColor: 'var(--mc-surface)' }}>
            <div className="flex items-center gap-2 mb-2"><s.icon size={16} style={{ color: s.color }} /><span className="text-xs font-medium" style={{ color: 'var(--mc-text-muted)' }}>{s.label}</span></div>
            <p className="text-xl font-bold" style={{ color: 'var(--mc-text-primary)' }}>{s.value}</p>
            <p className="text-xs mt-0.5" style={{ color: 'var(--mc-text-muted)' }}>{s.change}</p>
          </motion.div>
        ))}
      </div>

      <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: 0.3 }}
        className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 flex items-center gap-2.5 px-4 py-2.5 rounded-lg border" style={{ backgroundColor: 'var(--mc-surface)', borderColor: 'var(--mc-border)' }}>
          <Search size={16} style={{ color: 'var(--mc-text-muted)' }} />
          <input type="text" placeholder={t('billing.searchPlaceholder')} value={search} onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent text-sm outline-none w-full" style={{ color: 'var(--mc-text-primary)' }} />
        </div>
        <div className="flex gap-2">
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2.5 rounded-lg border text-sm outline-none cursor-pointer"
            style={{ backgroundColor: 'var(--mc-surface)', borderColor: 'var(--mc-border)', color: 'var(--mc-text-primary)' }}>
            <option value="All">{t('patients.allStatus')}</option>
            <option value="Paid">{t('status.paid')}</option>
            <option value="Pending">{t('status.pending')}</option>
            <option value="Overdue">{t('status.overdue')}</option>
          </select>
          <SecondaryButton icon={<Download size={16} />} onClick={() => {
            exportToCsv('invoices.csv', ['Invoice ID', 'Patient', 'Service', 'Amount', 'Date', 'Due Date', 'Status', 'Method'],
              filtered.map(i => [i.id, i.patient, t(i.serviceKey), i.amount, i.date, i.dueDate, i.status, i.method]));
            success(isRTL ? 'تم تصدير الفواتير!' : 'Invoices exported!');
          }}>{t('app.export')}</SecondaryButton>
          <PrimaryButton icon={<Plus size={16} />}>{t('billing.newInvoice')}</PrimaryButton>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.4 }}
        className="rounded-2xl shadow-mc-card overflow-hidden" style={{ backgroundColor: 'var(--mc-surface)' }}>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead>
              <tr className="border-b" style={{ borderColor: 'var(--mc-border)' }}>
                {[t('billing.invoiceID'), t('billing.patient'), t('billing.service'), t('billing.amount'), t('appointments.date'), t('billing.dueDate'), t('appointments.status'), t('billing.method'), ''].map((h, i) => (
                  <th key={i} className="px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-[0.06em]" style={{ color: 'var(--mc-text-muted)' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((inv, idx) => {
                const did = getDropdownId();
                return (
                  <tr key={idx} className="border-b transition-colors hover:bg-black/[0.02]" style={{ borderColor: 'var(--mc-border)' }}>
                    <td className="px-5 py-4 text-sm font-mono" style={{ color: 'var(--mc-text-primary)' }}>{inv.id}</td>
                    <td className="px-5 py-4 text-sm font-medium" style={{ color: 'var(--mc-text-primary)' }}>{inv.patient}</td>
                    <td className="px-5 py-4 text-sm" style={{ color: 'var(--mc-text-secondary)' }}>{t(inv.serviceKey)}</td>
                    <td className="px-5 py-4 text-sm font-semibold" style={{ color: 'var(--mc-text-primary)' }}>{inv.amount}</td>
                    <td className="px-5 py-4 text-sm" style={{ color: 'var(--mc-text-muted)' }}>{inv.date}</td>
                    <td className="px-5 py-4 text-sm" style={{ color: 'var(--mc-text-muted)' }}>{inv.dueDate}</td>
                    <td className="px-5 py-4"><PaymentBadge status={inv.status} /></td>
                    <td className="px-5 py-4 text-sm" style={{ color: 'var(--mc-text-secondary)' }}>{inv.method}</td>
                    <td className="px-5 py-4 text-end">
                      <Dropdown id={did} trigger={<button className="p-1.5 rounded-md transition-colors hover:bg-[var(--mc-surface-elevated)]"><MoreHorizontal size={16} style={{ color: 'var(--mc-text-muted)' }} /></button>} align="right" width={160}>
                        <div className="py-1">
                          {[t('actions.viewDetails'), t('actions.downloadPDF'), t('actions.sendReminder')].map((a, i) => (
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
