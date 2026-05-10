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
  nationalId: z.string().optional().or(z.literal('')),
  email: z.string().email('Invalid email address').optional().or(z.literal('')),
  phone: z.string().optional().or(z.literal('')),
  gender: z.enum(['Male', 'Female'], { message: 'Select a gender' }),
  address: z.string().optional().or(z.literal('')),
});

export type PatientFormData = z.infer<typeof patientSchema>;

interface Props {
  onSubmit: (data: PatientFormData) => void;
  onCancel: () => void;
}

export default function PatientForm({ onSubmit, onCancel }: Props) {
  const { t, isRTL } = useLanguage();
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
      <div>
        <label className="text-sm font-medium mb-1 block" style={{ color: 'var(--mc-text-primary)' }}>{t('patients.fullName')} *</label>
        <input {...register('name')} className={inputClass} style={{ ...inputStyle, borderColor: errors.name ? 'var(--mc-red)' : 'var(--mc-border)' }} placeholder={t('patients.enterFullName')} />
        {errors.name && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs mt-1 flex items-center gap-1" style={errorStyle}><AlertCircle size={10} />{errors.name.message}</motion.p>}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium mb-1 block" style={{ color: 'var(--mc-text-primary)' }}>{t('patients.dateOfBirth')} *</label>
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
          <label className="text-sm font-medium mb-1 block" style={{ color: 'var(--mc-text-primary)' }}>{isRTL ? 'الجنس' : 'Gender'} *</label>
          <select {...register('gender')} className={inputClass} style={{ ...inputStyle, borderColor: errors.gender ? 'var(--mc-red)' : 'var(--mc-border)' }}>
            <option value="">{t('patients.selectGender')}</option>
            <option value="Male">{t('patients.male')}</option>
            <option value="Female">{t('patients.female')}</option>
          </select>
          {errors.gender && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs mt-1 flex items-center gap-1" style={errorStyle}><AlertCircle size={10} />{errors.gender.message}</motion.p>}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium mb-1 block" style={{ color: 'var(--mc-text-primary)' }}>{t('patients.nationalId')}</label>
          <input {...register('nationalId')} inputMode="numeric" className={inputClass} style={{ ...inputStyle, borderColor: errors.nationalId ? 'var(--mc-red)' : 'var(--mc-border)' }} placeholder={isRTL ? '30010170101701' : '30010170101701'} />
          {errors.nationalId && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs mt-1 flex items-center gap-1" style={errorStyle}><AlertCircle size={10} />{errors.nationalId.message}</motion.p>}
        </div>
        <div>
          <label className="text-sm font-medium mb-1 block" style={{ color: 'var(--mc-text-primary)' }}>{isRTL ? 'الهاتف' : 'Phone'}</label>
          <input {...register('phone')} type="tel" inputMode="numeric" className={inputClass} style={{ ...inputStyle, borderColor: errors.phone ? 'var(--mc-red)' : 'var(--mc-border)' }} placeholder={isRTL ? '01xxxxxxxxx' : '01x xxxx xxxx'} dir="ltr" />
          {errors.phone && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs mt-1 flex items-center gap-1" style={errorStyle}><AlertCircle size={10} />{errors.phone.message}</motion.p>}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium mb-1 block" style={{ color: 'var(--mc-text-primary)' }}>Email</label>
          <input {...register('email')} type="email" className={inputClass} style={{ ...inputStyle, borderColor: errors.email ? 'var(--mc-red)' : 'var(--mc-border)' }} placeholder="email@example.com" />
          {errors.email && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs mt-1 flex items-center gap-1" style={errorStyle}><AlertCircle size={10} />{errors.email.message}</motion.p>}
        </div>
        <div>
          <label className="text-sm font-medium mb-1 block" style={{ color: 'var(--mc-text-primary)' }}>{t('patients.address')}</label>
          <input {...register('address')} className={inputClass} style={{ ...inputStyle, borderColor: errors.address ? 'var(--mc-red)' : 'var(--mc-border)' }} placeholder={isRTL ? 'شارع القصر العيني، القاهرة، مصر' : 'El-Kasr El-Aini St, Cairo, Egypt'} />
          {errors.address && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs mt-1 flex items-center gap-1" style={errorStyle}><AlertCircle size={10} />{errors.address.message}</motion.p>}
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-2">
        <button type="button" onClick={onCancel} className="px-4 py-2 rounded-xl text-sm font-medium border transition-all" style={{ borderColor: 'var(--mc-border)', color: 'var(--mc-text-primary)' }}>{t('app.cancel')}</button>
        <button type="submit" className="px-4 py-2 rounded-xl text-sm font-medium transition-all hover:opacity-90" style={{ backgroundColor: 'var(--mc-orange)', color: 'white' }}>{t('patients.addPatientBtn')}</button>
      </div>
    </form>
  );
}
