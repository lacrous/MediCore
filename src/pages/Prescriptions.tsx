import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Plus, Pill, Printer, MoreHorizontal, User, Clock } from 'lucide-react';
import Modal from '@/components/Modal';
import PrimaryButton from '@/components/PrimaryButton';
import Dropdown from '@/components/Dropdown';
import { useDropdown } from '@/hooks/useDropdown';
import { usePrescriptions } from '@/hooks/useApi';
import { TableSkeleton } from '@/components/Skeleton';
import { useLanguage } from '@/context/LanguageContext';
import { useToast } from '@/context/ToastContext';

function PrescriptionForm({ onClose }: { onClose: () => void }) {
  const { isRTL } = useLanguage();
  const { success } = useToast();
  const [form, setForm] = useState({ patientName: '', medicationName: '', dosage: '', frequency: '', duration: '', notes: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    success(isRTL ? 'تم إنشاء الوصفة بنجاح!' : 'Prescription created successfully!');
    onClose();
  };

  const inputStyle = { backgroundColor: 'var(--mc-bg)', borderColor: 'var(--mc-border)', color: 'var(--mc-text-primary)' };
  const inputClass = 'w-full px-4 py-2.5 rounded-lg border text-sm outline-none';

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {[
        { label: isRTL ? 'المريض' : 'Patient', key: 'patientName', placeholder: 'Emma Johnson' },
        { label: isRTL ? 'الدواء' : 'Medication', key: 'medicationName', placeholder: 'Amoxicillin 500mg' },
        { label: isRTL ? 'الجرعة' : 'Dosage', key: 'dosage', placeholder: '1 tablet' },
        { label: isRTL ? 'التكرار' : 'Frequency', key: 'frequency', placeholder: '3x daily' },
        { label: isRTL ? 'المدة' : 'Duration', key: 'duration', placeholder: '7 days' },
      ].map((field) => (
        <div key={field.key}>
          <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--mc-text-secondary)' }}>{field.label}</label>
          <input type="text" required placeholder={field.placeholder} className={inputClass} style={inputStyle}
            value={(form as any)[field.key]} onChange={(e) => setForm({ ...form, [field.key]: e.target.value })} />
        </div>
      ))}
      <div>
        <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--mc-text-secondary)' }}>{isRTL ? 'ملاحظات' : 'Notes'}</label>
        <textarea placeholder={isRTL ? 'أي ملاحظات...' : 'Any notes...'} rows={2} className={`${inputClass} resize-none`} style={inputStyle}
          value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} />
      </div>
      <div className="pt-2 flex justify-end gap-3">
        <button type="button" onClick={onClose} className="px-5 py-2.5 rounded-lg border text-sm font-medium" style={{ borderColor: 'var(--mc-border)', color: 'var(--mc-text-primary)' }}>{isRTL ? 'إلغاء' : 'Cancel'}</button>
        <PrimaryButton icon={<Plus size={16} />}>{isRTL ? 'إنشاء وصفة' : 'Create Prescription'}</PrimaryButton>
      </div>
    </form>
  );
}

export default function Prescriptions() {
  const { data: prescriptions, isLoading } = usePrescriptions();
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const { getDropdownId } = useDropdown();
  const { isRTL } = useLanguage();

  const filtered = (prescriptions || []).filter((p: any) =>
    p.patientName.toLowerCase().includes(search.toLowerCase()) ||
    p.medicationName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
        <h1 className="text-2xl font-semibold tracking-tight" style={{ color: 'var(--mc-text-primary)' }}>{isRTL ? 'الوصفات الطبية' : 'Prescriptions'}</h1>
        <p className="text-sm mt-1" style={{ color: 'var(--mc-text-secondary)' }}>{isRTL ? 'إدارة وصفات الأدوية للمرضى' : 'Manage patient medication prescriptions'}</p>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
        className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 flex items-center gap-2.5 px-4 py-2.5 rounded-lg border" style={{ backgroundColor: 'var(--mc-surface)', borderColor: 'var(--mc-border)' }}>
          <Search size={16} style={{ color: 'var(--mc-text-muted)' }} />
          <input type="text" placeholder={isRTL ? 'البحث في الوصفات...' : 'Search prescriptions...'} value={search} onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent text-sm outline-none w-full" style={{ color: 'var(--mc-text-primary)' }} />
        </div>
        <PrimaryButton icon={<Plus size={16} />} onClick={() => setShowModal(true)}>{isRTL ? 'وصفة جديدة' : 'New Prescription'}</PrimaryButton>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
        className="rounded-2xl shadow-mc-card overflow-hidden" style={{ backgroundColor: 'var(--mc-surface)' }}>
        {isLoading ? <div className="p-6"><TableSkeleton rows={5} cols={6} /></div> : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px]">
              <thead>
                <tr className="border-b" style={{ borderColor: 'var(--mc-border)' }}>
                  {['Patient', 'Medication', 'Dosage', 'Frequency', 'Duration', 'Status', ''].map((h, i) => (
                    <th key={i} className="px-6 py-3 text-left text-[11px] font-semibold uppercase tracking-[0.06em]" style={{ color: 'var(--mc-text-muted)' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((rx: any, idx: number) => {
                  const did = getDropdownId();
                  return (
                    <tr key={idx} className="border-b transition-colors hover:bg-black/[0.02]" style={{ borderColor: 'var(--mc-border)' }}>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--mc-blue-bg)' }}>
                            <User size={16} style={{ color: 'var(--mc-blue)' }} />
                          </div>
                          <span className="text-sm font-medium" style={{ color: 'var(--mc-text-primary)' }}>{rx.patientName}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'var(--mc-orange-muted)' }}>
                            <Pill size={16} style={{ color: 'var(--mc-orange)' }} />
                          </div>
                          <span className="text-sm font-medium" style={{ color: 'var(--mc-text-primary)' }}>{rx.medicationName}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm" style={{ color: 'var(--mc-text-primary)' }}>{rx.dosage}</td>
                      <td className="px-6 py-4 text-sm" style={{ color: 'var(--mc-text-secondary)' }}>{rx.frequency}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1.5 text-sm" style={{ color: 'var(--mc-text-secondary)' }}>
                          <Clock size={13} />{rx.duration}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${rx.status === 'Active' ? '' : ''}`}
                          style={rx.status === 'Active'
                            ? { backgroundColor: 'var(--mc-green-bg)', color: 'var(--mc-green)', borderColor: 'rgba(34,197,94,0.25)' }
                            : { backgroundColor: 'var(--mc-amber-bg)', color: 'var(--mc-amber)', borderColor: 'rgba(245,158,11,0.25)' }}>
                          <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: rx.status === 'Active' ? 'var(--mc-green)' : 'var(--mc-amber)' }} />{rx.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Dropdown id={did} trigger={
                          <button className="p-1.5 rounded-md transition-colors hover:bg-[var(--mc-surface-elevated)]"><MoreHorizontal size={16} style={{ color: 'var(--mc-text-muted)' }} /></button>
                        } align="right" width={160}>
                          <div className="py-1">
                            {['View Details', 'Print', 'Edit'].map((a, i) => (
                              <button key={i} className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm hover:bg-black/[0.02]" style={{ color: 'var(--mc-text-primary)' }}>
                                {i === 1 && <Printer size={14} />}{a}
                              </button>
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
        )}
      </motion.div>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title={isRTL ? 'وصفة جديدة' : 'New Prescription'}>
        <PrescriptionForm onClose={() => setShowModal(false)} />
      </Modal>
    </div>
  );
}
