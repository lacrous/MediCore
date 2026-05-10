import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { AlertCircle, Calendar } from 'lucide-react';
import { useMemo } from 'react';
import { differenceInYears, parseISO } from 'date-fns';
import { useLanguage } from '@/context/LanguageContext';

const patientSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  dateOfBirth: z.string().min(1, 'Date of birth is required'),
  nationalId: z.string().min(5, 'National ID must be at least 5 characters'),
  email: z.string().email('Invalid email address').optional().or(z.literal('')),
  phone: z.string().min(8, 'Phone must be at least 8 digits'),
  gender: z.enum(['Male', 'Female'], { message: 'Select a gender' }),
  address: z.string().min(5, 'Address must be at least 5 characters'),
  allergies: z.string().optional(),
});

export type PatientFormData = z.infer<typeof patientSchema>;

interface Props {
  onSubmit: (data: PatientFormData) => void;
  onCancel: () => void;
}

export default function PatientForm({ onSubmit, onCancel }: Props) {
  const { isRTL } = useLanguage();
  const { register, handleSubmit, control, formState: { errors }, reset } = useForm<PatientFormData>({
    resolver: zodResolver(patientSchema),
  });

  const dateOfBirth = useWatch({ control, name: 'dateOfBirth' });

  const calculatedAge = useMemo(() => {
    if (!dateOfBirth) return null;
    try {
      const birthDate = parseISO(dateOfBirth);
      const age = differenceInYears(new Date(), birthDate);
      return age >= 0 ? age : null;
    } catch {
      return null;
    }
  }, [dateOfBirth]);

  const handleFormSubmit = (data: PatientFormData) => {
    onSubmit(data);
    reset();
  };

  const inputClass = 'w-full px-3 py-2.5 rounded-xl border text-sm outline-none transition-all focus:ring-2 focus:ring-[var(--mc-orange-muted)]';
  const inputStyle = { backgroundColor: 'var(--mc-bg)', borderColor: 'var(--mc-border)', color: 'var(--mc-text-primary)' };
  const errorStyle = { color: 'var(--mc-red)' };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4" noValidate>
      {/* Full Name */}
      <div>
        <label className="text-sm font-medium mb-1 block" style={{ color: 'var(--mc-text-primary)' }}>{isRTL ? 'الاسم الكامل' : 'Full Name'} *</label>
        <input {...register('name')} className={inputClass} style={{ ...inputStyle, borderColor: errors.name ? 'var(--mc-red)' : 'var(--mc-border)' }} placeholder={isRTL ? 'أدخل الاسم الكامل' : 'Enter full name'} />
        {errors.name && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs mt-1 flex items-center gap-1" style={errorStyle}><AlertCircle size={10} />{errors.name.message}</motion.p>}
      </div>

      {/* Date of Birth + National ID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium mb-1 block" style={{ color: 'var(--mc-text-primary)' }}>{isRTL ? 'تاريخ الميلاد' : 'Date of Birth'} *</label>
          <div className="relative">
            <input {...register('dateOfBirth')} type="date" className={inputClass + ' pr-10'} style={{ ...inputStyle, borderColor: errors.dateOfBirth ? 'var(--mc-red)' : 'var(--mc-border)' }} />
            <Calendar size={16} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: 'var(--mc-text-muted)' }} />
          </div>
          {calculatedAge !== null && (
            <p className="text-xs mt-1 font-medium" style={{ color: 'var(--mc-orange)' }}>
              {isRTL ? `العمر: ${calculatedAge} سنة` : `Age: ${calculatedAge} years`}
            </p>
          )}
          {errors.dateOfBirth && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs mt-1 flex items-center gap-1" style={errorStyle}><AlertCircle size={10} />{errors.dateOfBirth.message}</motion.p>}
        </div>
        <div>
          <label className="text-sm font-medium mb-1 block" style={{ color: 'var(--mc-text-primary)' }}>{isRTL ? 'الرقم القومي' : 'National ID'} *</label>
          <input {...register('nationalId')} className={inputClass} style={{ ...inputStyle, borderColor: errors.nationalId ? 'var(--mc-red)' : 'var(--mc-border)' }} placeholder={isRTL ? 'أدخل الرقم القومي' : 'Enter national ID'} />
          {errors.nationalId && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs mt-1 flex items-center gap-1" style={errorStyle}><AlertCircle size={10} />{errors.nationalId.message}</motion.p>}
        </div>
      </div>

      {/* Phone + Gender */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium mb-1 block" style={{ color: 'var(--mc-text-primary)' }}>{isRTL ? 'رقم الهاتف' : 'Phone'} *</label>
          <input {...register('phone')} type="tel" className={inputClass} style={{ ...inputStyle, borderColor: errors.phone ? 'var(--mc-red)' : 'var(--mc-border)' }} placeholder="+1 234 567 8901" />
          {errors.phone && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs mt-1 flex items-center gap-1" style={errorStyle}><AlertCircle size={10} />{errors.phone.message}</motion.p>}
        </div>
        <div>
          <label className="text-sm font-medium mb-1 block" style={{ color: 'var(--mc-text-primary)' }}>{isRTL ? 'الجنس' : 'Gender'} *</label>
          <select {...register('gender')} className={inputClass} style={{ ...inputStyle, borderColor: errors.gender ? 'var(--mc-red)' : 'var(--mc-border)' }}>
            <option value="">{isRTL ? 'اختر الجنس' : 'Select gender'}</option>
            <option value="Male">{isRTL ? 'ذكر' : 'Male'}</option>
            <option value="Female">{isRTL ? 'أنثى' : 'Female'}</option>
          </select>
          {errors.gender && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs mt-1 flex items-center gap-1" style={errorStyle}><AlertCircle size={10} />{errors.gender.message}</motion.p>}
        </div>
      </div>

      {/* Email (Optional) + Address */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium mb-1 block" style={{ color: 'var(--mc-text-primary)' }}>Email ({isRTL ? 'اختياري' : 'Optional'})</label>
          <input {...register('email')} type="email" className={inputClass} style={{ ...inputStyle, borderColor: errors.email ? 'var(--mc-red)' : 'var(--mc-border)' }} placeholder="email@example.com" />
          {errors.email && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs mt-1 flex items-center gap-1" style={errorStyle}><AlertCircle size={10} />{errors.email.message}</motion.p>}
        </div>
        <div>
          <label className="text-sm font-medium mb-1 block" style={{ color: 'var(--mc-text-primary)' }}>{isRTL ? 'العنوان' : 'Address'} *</label>
          <input {...register('address')} className={inputClass} style={{ ...inputStyle, borderColor: errors.address ? 'var(--mc-red)' : 'var(--mc-border)' }} placeholder="123 Medical St, Cairo, Egypt" />
          {errors.address && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs mt-1 flex items-center gap-1" style={errorStyle}><AlertCircle size={10} />{errors.address.message}</motion.p>}
        </div>
      </div>

      {/* Allergies */}
      <div>
        <label className="text-sm font-medium mb-1 block" style={{ color: 'var(--mc-text-primary)' }}>{isRTL ? 'الحساسية (اختياري)' : 'Allergies (Optional)'}</label>
        <input {...register('allergies')} className={inputClass} style={inputStyle} placeholder="e.g., Penicillin, Latex" />
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-3 pt-2">
        <button type="button" onClick={onCancel} className="px-4 py-2 rounded-xl text-sm font-medium border transition-all" style={{ borderColor: 'var(--mc-border)', color: 'var(--mc-text-primary)' }}>{isRTL ? 'إلغاء' : 'Cancel'}</button>
        <button type="submit" className="px-4 py-2 rounded-xl text-sm font-medium transition-all hover:opacity-90" style={{ backgroundColor: 'var(--mc-orange)', color: 'white' }}>{isRTL ? 'إضافة مريض' : 'Add Patient'}</button>
      </div>
    </form>
  );
}
