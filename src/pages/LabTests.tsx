import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Filter, CheckCircle2, Clock, AlertCircle, FileText } from 'lucide-react';
import PrimaryButton from '@/components/PrimaryButton';
import DataTable from '@/components/DataTable';
import Modal from '@/components/Modal';
import { useLanguage } from '@/context/LanguageContext';

interface LabTest {
  id: string;
  patientName: string;
  testName: string;
  category: string;
  doctor: string;
  date: string;
  status: 'Pending' | 'In Progress' | 'Completed' | 'Critical';
  result?: string;
}

const labTests: LabTest[] = [
  { id: 'LAB-001', patientName: 'Emma Johnson', testName: 'Complete Blood Count (CBC)', category: 'Blood', doctor: 'Dr. Omar Abu Al-Makarem', date: '2026-01-15', status: 'Completed', result: 'Normal' },
  { id: 'LAB-002', patientName: 'James Wilson', testName: 'Lipid Profile', category: 'Blood', doctor: 'Dr. Michael Chen', date: '2026-01-15', status: 'Completed', result: 'Elevated LDL' },
  { id: 'LAB-003', patientName: 'William Davis', testName: 'HbA1c', category: 'Blood', doctor: 'Dr. Omar Abu Al-Makarem', date: '2026-01-14', status: 'Critical', result: '8.5% (High)' },
  { id: 'LAB-004', patientName: 'Olivia Brown', testName: 'Urine Analysis', category: 'Urine', doctor: 'Dr. Emily Watson', date: '2026-01-14', status: 'In Progress' },
  { id: 'LAB-005', patientName: 'Sophia Martinez', testName: 'Chest X-Ray', category: 'Imaging', doctor: 'Dr. James Rodriguez', date: '2026-01-13', status: 'Completed', result: 'Clear' },
  { id: 'LAB-006', patientName: 'Noah Jackson', testName: 'Blood Glucose (Fasting)', category: 'Blood', doctor: 'Dr. Omar Abu Al-Makarem', date: '2026-01-13', status: 'Pending' },
  { id: 'LAB-007', patientName: 'Ava Thomas', testName: 'Thyroid Function Test', category: 'Blood', doctor: 'Dr. Michael Chen', date: '2026-01-12', status: 'Completed', result: 'Normal' },
  { id: 'LAB-008', patientName: 'Isabella White', testName: 'ECG', category: 'Cardiology', doctor: 'Dr. Omar Abu Al-Makarem', date: '2026-01-12', status: 'Completed', result: 'Normal sinus rhythm' },
];

const statusConfig: Record<string, { bg: string; color: string; icon: React.ElementType }> = {
  'Completed': { bg: 'var(--mc-green-bg)', color: 'var(--mc-green)', icon: CheckCircle2 },
  'In Progress': { bg: 'var(--mc-blue-bg)', color: 'var(--mc-blue)', icon: Clock },
  'Pending': { bg: 'var(--mc-amber-bg)', color: 'var(--mc-amber)', icon: Clock },
  'Critical': { bg: 'var(--mc-red-bg)', color: 'var(--mc-red)', icon: AlertCircle },
};

function StatusBadge({ status }: { status: string }) {
  const c = statusConfig[status] || statusConfig['Pending'];
  const Icon = c.icon;
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: c.bg, color: c.color }}>
      <Icon size={12} /> {status}
    </span>
  );
}

export default function LabTests() {
  const { t } = useLanguage();
  const [showAdd, setShowAdd] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState('All');

  const categories = [t('lab.allCategories') || 'All', 'Blood', 'Urine', 'Imaging', 'Cardiology'];
  const filtered = categoryFilter === (t('lab.allCategories') || 'All') ? labTests : labTests.filter(l => l.category === categoryFilter);

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
        <h1 className="text-2xl font-semibold tracking-tight" style={{ color: 'var(--mc-text-primary)' }}>{t('lab.title')}</h1>
        <p className="text-sm mt-1" style={{ color: 'var(--mc-text-secondary)' }}>{t('lab.subtitle')}</p>
      </motion.div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: t('lab.totalTests'), value: labTests.length, color: 'var(--mc-blue)' },
          { label: t('lab.pending'), value: labTests.filter(l => l.status === 'Pending').length, color: 'var(--mc-amber)' },
          { label: t('lab.inProgress'), value: labTests.filter(l => l.status === 'In Progress').length, color: 'var(--mc-blue)' },
          { label: t('lab.critical'), value: labTests.filter(l => l.status === 'Critical').length, color: 'var(--mc-red)' },
        ].map((s, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.05 }}
            className="rounded-xl p-4 shadow-mc-card" style={{ backgroundColor: 'var(--mc-surface)' }}>
            <p className="text-2xl font-bold" style={{ color: s.color }}>{s.value}</p>
            <p className="text-xs mt-0.5" style={{ color: 'var(--mc-text-secondary)' }}>{s.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-2">
          <Filter size={14} style={{ color: 'var(--mc-text-muted)' }} />
          <div className="flex items-center gap-1 p-1 rounded-lg border" style={{ backgroundColor: 'var(--mc-bg)', borderColor: 'var(--mc-border)' }}>
            {categories.map(cat => (
              <button key={cat} onClick={() => setCategoryFilter(cat)}
                className="px-3 py-1 rounded-md text-xs font-medium transition-all"
                style={{
                  backgroundColor: categoryFilter === cat ? 'var(--mc-surface)' : 'transparent',
                  color: categoryFilter === cat ? 'var(--mc-text-primary)' : 'var(--mc-text-muted)',
                  boxShadow: categoryFilter === cat ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'
                }}>{cat}</button>
            ))}
          </div>
        </div>
        <PrimaryButton icon={<Plus size={16} />} onClick={() => setShowAdd(true)}>{t('lab.orderTest')}</PrimaryButton>
      </div>

      <DataTable
        data={filtered}
        keyExtractor={r => r.id}
        searchKeys={['patientName', 'testName', 'doctor']}
        columns={[
          { key: 'id', header: t('lab.testId') || 'Test ID', sortable: true },
          { key: 'patientName', header: t('lab.patient') || 'Patient', sortable: true },
          { key: 'testName', header: t('lab.test') || 'Test', sortable: true },
          { key: 'category', header: t('lab.category') || 'Category', sortable: true },
          { key: 'doctor', header: t('lab.doctor') || 'Doctor', sortable: true },
          { key: 'date', header: t('lab.date') || 'Date', sortable: true },
          { key: 'status', header: t('lab.status') || 'Status', sortable: true, render: row => <StatusBadge status={row.status} /> },
          { key: 'result', header: t('lab.result') || 'Result', sortable: true, render: row => <span style={{ color: row.status === 'Critical' ? 'var(--mc-red)' : 'var(--mc-text-secondary)' }}>{row.result || '—'}</span> },
        ]}
        actions={() => (
          <button className="p-1.5 rounded-lg hover:bg-[var(--mc-bg)] transition-colors" style={{ color: 'var(--mc-text-muted)' }}>
            <FileText size={14} />
          </button>
        )}
      />

      <Modal isOpen={showAdd} onClose={() => setShowAdd(false)} title={t('lab.orderTest') || 'Order Lab Test'}>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-1 block" style={{ color: 'var(--mc-text-primary)' }}>{t('lab.patient')}</label>
            <select className="w-full px-3 py-2 rounded-xl border text-sm outline-none" style={{ backgroundColor: 'var(--mc-bg)', borderColor: 'var(--mc-border)', color: 'var(--mc-text-primary)' }}>
              <option>{t('lab.selectPatient')}</option>
              <option>Emma Johnson (P-2026-001)</option>
              <option>James Wilson (P-2026-002)</option>
              <option>William Davis (P-2026-004)</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-medium mb-1 block" style={{ color: 'var(--mc-text-primary)' }}>{t('lab.test')}</label>
            <select className="w-full px-3 py-2 rounded-xl border text-sm outline-none" style={{ backgroundColor: 'var(--mc-bg)', borderColor: 'var(--mc-border)', color: 'var(--mc-text-primary)' }}>
              <option>{t('lab.selectTest')}</option>
              <option>Complete Blood Count (CBC)</option>
              <option>Lipid Profile</option>
              <option>HbA1c</option>
              <option>Blood Glucose (Fasting)</option>
              <option>Urine Analysis</option>
              <option>Chest X-Ray</option>
              <option>Thyroid Function Test</option>
              <option>ECG</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-medium mb-1 block" style={{ color: 'var(--mc-text-primary)' }}>{t('lab.notes')}</label>
            <textarea rows={3} placeholder={t('lab.additionalInstructions') || 'Additional instructions...'}
              className="w-full px-3 py-2 rounded-xl border text-sm outline-none resize-none" style={{ backgroundColor: 'var(--mc-bg)', borderColor: 'var(--mc-border)', color: 'var(--mc-text-primary)' }} />
          </div>
          <div className="flex justify-end gap-2">
            <button onClick={() => setShowAdd(false)} className="px-4 py-2 rounded-xl text-sm border transition-all" style={{ borderColor: 'var(--mc-border)', color: 'var(--mc-text-primary)' }}>{t('app.cancel')}</button>
            <PrimaryButton onClick={() => setShowAdd(false)}>{t('lab.orderTest')}</PrimaryButton>
          </div>
        </div>
      </Modal>
    </div>
  );
}
