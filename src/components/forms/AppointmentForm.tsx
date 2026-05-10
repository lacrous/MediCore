import { useState } from 'react';
import { CalendarCheck, Clock, User, Stethoscope } from 'lucide-react';
import PrimaryButton from '@/components/PrimaryButton';
import { useToast } from '@/context/ToastContext';
import { useLanguage } from '@/context/LanguageContext';

interface AppointmentFormProps { onClose: () => void; }

const doctors = ['Dr. Michael Chen', 'Dr. Omar Abu Al-Makarem', 'Dr. James Rodriguez', 'Dr. Emily Watson'];
const patients = ['Emma Johnson', 'James Wilson', 'Olivia Brown', 'William Davis', 'Sophia Martinez', 'Liam Anderson', 'Ava Thomas', 'Noah Jackson'];

export default function AppointmentForm({ onClose }: AppointmentFormProps) {
  const [form, setForm] = useState({ patient: '', doctor: doctors[0], date: '', time: '', notes: '' });
  const { success } = useToast();
  const { isRTL } = useLanguage();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    success(isRTL ? 'تم حجز الموعد بنجاح!' : 'Appointment booked successfully!');
    onClose();
  };

  const inputClass = "w-full px-4 py-2.5 rounded-lg border text-sm outline-none transition-colors focus:border-[var(--mc-orange)]";
  const inputStyle = { backgroundColor: 'var(--mc-bg)', borderColor: 'var(--mc-border)', color: 'var(--mc-text-primary)' };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--mc-text-secondary)' }}>{isRTL ? 'المريض' : 'Patient'} *</label>
        <div className="relative">
          <User size={15} className="absolute start-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--mc-text-muted)' }} />
          <select required value={form.patient} onChange={(e) => setForm({ ...form, patient: e.target.value })}
            className={`${inputClass} ps-10`} style={inputStyle}>
            <option value="">{isRTL ? 'اختر مريضاً' : 'Select patient'}</option>
            {patients.map(p => <option key={p} value={p}>{p}</option>)}
          </select>
        </div>
      </div>
      <div>
        <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--mc-text-secondary)' }}>{isRTL ? 'الطبيب' : 'Doctor'} *</label>
        <div className="relative">
          <Stethoscope size={15} className="absolute start-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--mc-text-muted)' }} />
          <select value={form.doctor} onChange={(e) => setForm({ ...form, doctor: e.target.value })}
            className={`${inputClass} ps-10`} style={inputStyle}>
            {doctors.map(d => <option key={d} value={d}>{d}</option>)}
          </select>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--mc-text-secondary)' }}>{isRTL ? 'التاريخ' : 'Date'} *</label>
          <div className="relative">
            <CalendarCheck size={15} className="absolute start-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--mc-text-muted)' }} />
            <input type="date" required value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })}
              className={`${inputClass} ps-10`} style={inputStyle} />
          </div>
        </div>
        <div>
          <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--mc-text-secondary)' }}>{isRTL ? 'الوقت' : 'Time'} *</label>
          <div className="relative">
            <Clock size={15} className="absolute start-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--mc-text-muted)' }} />
            <input type="time" required value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })}
              className={`${inputClass} ps-10`} style={inputStyle} />
          </div>
        </div>
      </div>
      <div>
        <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--mc-text-secondary)' }}>{isRTL ? 'ملاحظات' : 'Notes'}</label>
        <textarea value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })}
          placeholder={isRTL ? 'أي ملاحظات إضافية...' : 'Any additional notes...'}
          rows={3} className={`${inputClass} resize-none`} style={inputStyle} />
      </div>
      <div className="pt-2 flex justify-end gap-3">
        <button type="button" onClick={onClose} className="px-5 py-2.5 rounded-lg border text-sm font-medium transition-colors hover:bg-[var(--mc-surface-elevated)]"
          style={{ borderColor: 'var(--mc-border)', color: 'var(--mc-text-primary)' }}>{isRTL ? 'إلغاء' : 'Cancel'}</button>
        <PrimaryButton>{isRTL ? 'حجز الموعد' : 'Book Appointment'}</PrimaryButton>
      </div>
    </form>
  );
}
