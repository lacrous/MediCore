import { useState } from 'react';
import { User, Mail, Phone } from 'lucide-react';
import PrimaryButton from '@/components/PrimaryButton';
import { useToast } from '@/context/ToastContext';
import { useLanguage } from '@/context/LanguageContext';

interface PatientFormProps { onClose: () => void; }

export default function PatientForm({ onClose }: PatientFormProps) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', age: '', gender: 'Male', status: 'Active' });
  const { success } = useToast();
  const { isRTL } = useLanguage();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    success(isRTL ? `تم إضافة المريض ${form.name} بنجاح!` : `Patient ${form.name} added successfully!`);
    onClose();
  };

  const inputClass = "w-full px-4 py-2.5 rounded-lg border text-sm outline-none transition-colors focus:border-[var(--mc-orange)]";
  const inputStyle = { backgroundColor: 'var(--mc-bg)', borderColor: 'var(--mc-border)', color: 'var(--mc-text-primary)' };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--mc-text-secondary)' }}>{isRTL ? 'الاسم الكامل' : 'Full Name'} *</label>
        <div className="relative">
          <User size={15} className="absolute start-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--mc-text-muted)' }} />
          <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder={isRTL ? 'أدخل اسم المريض' : 'Enter patient name'} className={`${inputClass} ps-10`} style={inputStyle} />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--mc-text-secondary)' }}>Email</label>
          <div className="relative">
            <Mail size={15} className="absolute start-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--mc-text-muted)' }} />
            <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="patient@email.com" className={`${inputClass} ps-10`} style={inputStyle} />
          </div>
        </div>
        <div>
          <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--mc-text-secondary)' }}>{isRTL ? 'الهاتف' : 'Phone'}</label>
          <div className="relative">
            <Phone size={15} className="absolute start-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--mc-text-muted)' }} />
            <input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
              placeholder="+1 234 567 8900" className={`${inputClass} ps-10`} style={inputStyle} />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--mc-text-secondary)' }}>{isRTL ? 'العمر' : 'Age'}</label>
          <input type="number" value={form.age} onChange={(e) => setForm({ ...form, age: e.target.value })}
            placeholder="35" className={inputClass} style={inputStyle} />
        </div>
        <div>
          <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--mc-text-secondary)' }}>{isRTL ? 'الجنس' : 'Gender'}</label>
          <select value={form.gender} onChange={(e) => setForm({ ...form, gender: e.target.value })}
            className={inputClass} style={inputStyle}>
            <option value="Male">{isRTL ? 'ذكر' : 'Male'}</option>
            <option value="Female">{isRTL ? 'أنثى' : 'Female'}</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--mc-text-secondary)' }}>{isRTL ? 'الحالة' : 'Status'}</label>
          <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}
            className={inputClass} style={inputStyle}>
            <option value="Active">{isRTL ? 'نشط' : 'Active'}</option>
            <option value="Inactive">{isRTL ? 'غير نشط' : 'Inactive'}</option>
            <option value="Critical">{isRTL ? 'حرج' : 'Critical'}</option>
          </select>
        </div>
      </div>
      <div className="pt-2 flex justify-end gap-3">
        <button type="button" onClick={onClose} className="px-5 py-2.5 rounded-lg border text-sm font-medium transition-colors hover:bg-[var(--mc-surface-elevated)]"
          style={{ borderColor: 'var(--mc-border)', color: 'var(--mc-text-primary)' }}>
          {isRTL ? 'إلغاء' : 'Cancel'}
        </button>
        <PrimaryButton>{isRTL ? 'إضافة مريض' : 'Add Patient'}</PrimaryButton>
      </div>
    </form>
  );
}
