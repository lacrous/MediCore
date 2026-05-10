import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Plus, MoreHorizontal, Phone, Mail, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import Avatar from '@/components/Avatar';
import PrimaryButton from '@/components/PrimaryButton';
import Dropdown from '@/components/Dropdown';
import RowActionMenu from '@/components/RowActionMenu';
import Modal from '@/components/Modal';
import PatientForm, { type PatientFormData } from '@/components/PatientForm';
import { useDropdown } from '@/hooks/useDropdown';
import { useLanguage } from '@/context/LanguageContext';

interface Patient { name: string; age: number; gender: string; phone: string; email: string; lastVisit: string; status: 'Active' | 'Inactive' | 'Critical'; }

const patients: Patient[] = [
  { name: 'Emma Johnson', age: 34, gender: 'Female', phone: '+1 234 567 8901', email: 'emma.j@email.com', lastVisit: 'Jan 15, 2026', status: 'Active' },
  { name: 'James Wilson', age: 45, gender: 'Male', phone: '+1 234 567 8902', email: 'james.w@email.com', lastVisit: 'Jan 15, 2026', status: 'Active' },
  { name: 'Olivia Brown', age: 28, gender: 'Female', phone: '+1 234 567 8903', email: 'olivia.b@email.com', lastVisit: 'Jan 14, 2026', status: 'Active' },
  { name: 'William Davis', age: 62, gender: 'Male', phone: '+1 234 567 8904', email: 'william.d@email.com', lastVisit: 'Jan 13, 2026', status: 'Critical' },
  { name: 'Sophia Martinez', age: 41, gender: 'Female', phone: '+1 234 567 8905', email: 'sophia.m@email.com', lastVisit: 'Jan 12, 2026', status: 'Active' },
  { name: 'Liam Anderson', age: 55, gender: 'Male', phone: '+1 234 567 8906', email: 'liam.a@email.com', lastVisit: 'Jan 10, 2026', status: 'Inactive' },
  { name: 'Ava Thomas', age: 29, gender: 'Female', phone: '+1 234 567 8907', email: 'ava.t@email.com', lastVisit: 'Jan 11, 2026', status: 'Active' },
  { name: 'Noah Jackson', age: 38, gender: 'Male', phone: '+1 234 567 8908', email: 'noah.j@email.com', lastVisit: 'Jan 9, 2026', status: 'Active' },
  { name: 'Isabella White', age: 50, gender: 'Female', phone: '+1 234 567 8909', email: 'isabella.w@email.com', lastVisit: 'Jan 8, 2026', status: 'Active' },
  { name: 'Mason Harris', age: 67, gender: 'Male', phone: '+1 234 567 8910', email: 'mason.h@email.com', lastVisit: 'Jan 7, 2026', status: 'Inactive' },
  { name: 'Charlotte Clark', age: 22, gender: 'Female', phone: '+1 234 567 8911', email: 'charlotte.c@email.com', lastVisit: 'Jan 6, 2026', status: 'Active' },
  { name: 'Ethan Lewis', age: 73, gender: 'Male', phone: '+1 234 567 8912', email: 'ethan.l@email.com', lastVisit: 'Jan 5, 2026', status: 'Critical' },
];

function PatientStatusBadge({ status }: { status: string }) {
  const { t } = useLanguage();
  const colors: Record<string, { bg: string; color: string; border: string }> = {
    Active: { bg: 'var(--mc-green-bg)', color: 'var(--mc-green)', border: 'rgba(34,197,94,0.25)' },
    Inactive: { bg: 'var(--mc-amber-bg)', color: 'var(--mc-amber)', border: 'rgba(245,158,11,0.25)' },
    Critical: { bg: 'var(--mc-red-bg)', color: 'var(--mc-red)', border: 'rgba(239,68,68,0.25)' },
  };
  const c = colors[status];
  const statusMap: Record<string, string> = { Active: 'status.active', Inactive: 'status.inactive', Critical: 'status.critical' };

  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border" style={{ backgroundColor: c.bg, color: c.color, borderColor: c.border }}>
      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: c.color }} />{t(statusMap[status] || status)}
    </span>
  );
}

export default function Patients() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [showAddModal, setShowAddModal] = useState(false);
  const { getDropdownId } = useDropdown();
  const { t } = useLanguage();

  const filtered = patients.filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'All' || p.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const statCards = [
    { label: t('patients.totalPatients'), value: '2,847', change: '+156' },
    { label: t('patients.active'), value: '2,104', change: '+89' },
    { label: t('patients.newThisMonth'), value: '156', change: '+23' },
    { label: t('patients.critical'), value: '12', change: '-3' },
  ];

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
        <h1 className="text-2xl font-semibold tracking-tight" style={{ color: 'var(--mc-text-primary)' }}>{t('patients.title')}</h1>
        <p className="text-sm mt-1" style={{ color: 'var(--mc-text-secondary)' }}>{t('patients.subtitle')}</p>
      </motion.div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {statCards.map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.1 + i * 0.06 }}
            className="rounded-xl p-4 shadow-mc-card" style={{ backgroundColor: 'var(--mc-surface)' }}>
            <p className="text-xs font-medium" style={{ color: 'var(--mc-text-muted)' }}>{s.label}</p>
            <p className="text-xl font-bold mt-1" style={{ color: 'var(--mc-text-primary)' }}>{s.value}</p>
            <p className="text-xs mt-0.5" style={{ color: 'var(--mc-green)' }}>{s.change} this month</p>
          </motion.div>
        ))}
      </div>

      <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: 0.25 }}
        className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 flex items-center gap-2.5 px-4 py-2.5 rounded-lg border" style={{ backgroundColor: 'var(--mc-surface)', borderColor: 'var(--mc-border)' }}>
          <Search size={16} style={{ color: 'var(--mc-text-muted)' }} />
          <input type="text" placeholder={t('patients.searchPlaceholder')} value={search} onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent text-sm outline-none w-full" style={{ color: 'var(--mc-text-primary)' }} />
        </div>
        <div className="flex gap-2">
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2.5 rounded-lg border text-sm outline-none cursor-pointer"
            style={{ backgroundColor: 'var(--mc-surface)', borderColor: 'var(--mc-border)', color: 'var(--mc-text-primary)' }}>
            <option value="All">{t('patients.allStatus')}</option>
            <option value="Active">{t('status.active')}</option>
            <option value="Inactive">{t('status.inactive')}</option>
            <option value="Critical">{t('status.critical')}</option>
          </select>
          <PrimaryButton icon={<Plus size={16} />} onClick={() => setShowAddModal(true)}>{t('patients.addPatient')}</PrimaryButton>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.35 }}
        className="rounded-2xl shadow-mc-card overflow-hidden" style={{ backgroundColor: 'var(--mc-surface)' }}>
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b" style={{ borderColor: 'var(--mc-border)' }}>
                {[t('patients.patient'), t('patients.contact'), t('patients.ageGender'), t('patients.lastVisit'), t('patients.status'), ''].map((h, i) => (
                  <th key={i} className="px-6 py-3 text-left text-[11px] font-semibold uppercase tracking-[0.06em]" style={{ color: 'var(--mc-text-muted)' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((p, idx) => {
                const did = getDropdownId();
                return (
                  <tr key={idx} className="border-b transition-colors hover:bg-black/[0.02]" style={{ borderColor: 'var(--mc-border)' }}>
                    <td className="px-6 py-4">
                      <Link to={`/patients/${idx + 1}`} className="flex items-center gap-3 no-underline group">
                        <Avatar name={p.name} size={32} />
                        <span className="text-sm font-medium transition-colors group-hover:text-[var(--mc-orange)]" style={{ color: 'var(--mc-text-primary)' }}>{p.name}</span>
                      </Link>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-1.5 text-xs" style={{ color: 'var(--mc-text-secondary)' }}><Phone size={11} />{p.phone}</div>
                        <div className="flex items-center gap-1.5 text-xs" style={{ color: 'var(--mc-text-muted)' }}><Mail size={11} />{p.email}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm" style={{ color: 'var(--mc-text-secondary)' }}>{p.age} {t('patients.yrs')} / {p.gender}</td>
                    <td className="px-6 py-4"><div className="flex items-center gap-1.5 text-sm" style={{ color: 'var(--mc-text-secondary)' }}><Calendar size={13} />{p.lastVisit}</div></td>
                    <td className="px-6 py-4"><PatientStatusBadge status={p.status} /></td>
                    <td className="px-6 py-4 text-right">
                      <Dropdown id={did} trigger={<button className="p-1.5 rounded-md transition-colors hover:bg-[var(--mc-surface-elevated)]"><MoreHorizontal size={16} style={{ color: 'var(--mc-text-muted)' }} /></button>} align="right" width={160}>
                        <RowActionMenu />
                      </Dropdown>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="md:hidden divide-y" style={{ borderColor: 'var(--mc-border)' }}>
          {filtered.map((p, idx) => (
            <div key={idx} className="p-4 flex items-start gap-3">
              <Avatar name={p.name} size={40} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium truncate" style={{ color: 'var(--mc-text-primary)' }}>{p.name}</p>
                  <PatientStatusBadge status={p.status} />
                </div>
                <p className="text-xs mt-0.5" style={{ color: 'var(--mc-text-muted)' }}>{p.age} {t('patients.yrs')} / {p.gender}</p>
                <p className="text-xs mt-1" style={{ color: 'var(--mc-text-secondary)' }}>{p.phone}</p>
                <p className="text-xs" style={{ color: 'var(--mc-text-muted)' }}>{t('patients.lastVisit')}: {p.lastVisit}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Add Patient Modal */}
      <Modal isOpen={showAddModal} onClose={() => setShowAddModal(false)} title={t('patients.addPatient')}>
        <PatientForm onSubmit={(data: PatientFormData) => { console.log('New patient:', data); setShowAddModal(false); }} onCancel={() => setShowAddModal(false)} />
      </Modal>
    </div>
  );
}
