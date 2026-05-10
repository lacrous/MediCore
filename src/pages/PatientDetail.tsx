import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Phone, Mail, MapPin, Calendar, Pill, CreditCard, Activity, Clock } from 'lucide-react';
import Avatar from '@/components/Avatar';
import StatusBadge from '@/components/StatusBadge';
import PatientTimeline from '@/components/PatientTimeline';
import DrugAlert from '@/components/DrugAlert';
import RiskScore from '@/components/RiskScore';
import { useLanguage } from '@/context/LanguageContext';

const patientData = {
  name: 'Emma Johnson', age: 34, gender: 'Female', bloodType: 'O+',
  phone: '+1 234 567 8901', email: 'emma.j@email.com', address: '123 Medical St, Cairo, Egypt',
  status: 'Active' as const, id: 'P-2026-001', lastVisit: 'Jan 15, 2026', registered: 'Mar 12, 2023',
  allergies: ['Penicillin', 'Latex'],
  medications: [
    { name: 'Amoxicillin 500mg', dosage: '1x daily', startDate: 'Jan 10, 2026' },
    { name: 'Ibuprofen 400mg', dosage: 'As needed', startDate: 'Jan 12, 2026' },
  ],
  history: [
    { id: '1', date: 'Jan 15, 2026', type: 'appointment', title: 'Annual Checkup', doctor: 'Dr. Michael Chen', description: 'Routine annual checkup. All vitals normal.', status: 'Completed' },
    { id: '2', date: 'Jan 12, 2026', type: 'prescription', title: 'Amoxicillin Prescribed', doctor: 'Dr. Omar Abu Al-Makarem', description: 'Prescribed for 7 days for bacterial infection.', status: 'Active' },
    { id: '3', date: 'Jan 10, 2026', type: 'vitals', title: 'Vitals Recorded', doctor: 'Nurse Staff', description: 'BP: 120/80, HR: 72, Temp: 36.6C, Weight: 65kg', status: 'Normal' },
    { id: '4', date: 'Oct 3, 2025', type: 'lab', title: 'Blood Work Results', doctor: 'Dr. Omar Abu Al-Makarem', description: 'Cholesterol slightly elevated. Dietary changes recommended.', status: 'Abnormal' },
    { id: '5', date: 'Oct 1, 2025', type: 'lab', title: 'Lipid Profile Ordered', doctor: 'Dr. Omar Abu Al-Makarem', description: 'Fasting lipid profile ordered for cholesterol monitoring.', status: 'Completed' },
    { id: '6', date: 'Jun 20, 2025', type: 'surgery', title: 'Appendectomy', doctor: 'Dr. James Rodriguez', description: 'Laparoscopic appendectomy performed successfully. Recovery normal.', status: 'Completed' },
    { id: '7', date: 'Mar 10, 2025', type: 'appointment', title: 'Allergy Consultation', doctor: 'Dr. Emily Watson', description: 'Seasonal allergies follow-up. Prescribed antihistamines.', status: 'Completed' },
    { id: '8', date: 'Feb 5, 2025', type: 'vaccination', title: 'Flu Vaccination', doctor: 'Nurse Staff', description: 'Annual influenza vaccination administered.', status: 'Completed' },
    { id: '9', date: 'Dec 15, 2024', type: 'diagnosis', title: 'Hypertension Diagnosed', doctor: 'Dr. Michael Chen', description: 'Stage 1 hypertension. Lifestyle modifications recommended.', status: 'Monitoring' },
  ],
  vitals: [
    { label: 'Blood Pressure', value: '120/80', unit: 'mmHg', date: 'Jan 15, 2026' },
    { label: 'Heart Rate', value: '72', unit: 'bpm', date: 'Jan 15, 2026' },
    { label: 'Temperature', value: '36.6', unit: 'C', date: 'Jan 15, 2026' },
    { label: 'Weight', value: '65', unit: 'kg', date: 'Jan 15, 2026' },
    { label: 'Height', value: '168', unit: 'cm', date: 'Jan 15, 2026' },
    { label: 'BMI', value: '23.0', unit: '', date: 'Jan 15, 2026' },
  ],
};

export default function PatientDetail() {
  const { isRTL } = useLanguage();

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
        <Link to="/patients" className="inline-flex items-center gap-1.5 text-sm mb-4 hover:underline" style={{ color: 'var(--mc-orange)' }}>
          <ArrowLeft size={14} className={isRTL ? 'rotate-180' : ''} /> Back to Patients
        </Link>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <Avatar name={patientData.name} size={56} />
          <div>
            <h1 className="text-2xl font-semibold" style={{ color: 'var(--mc-text-primary)' }}>{patientData.name}</h1>
            <p className="text-sm" style={{ color: 'var(--mc-text-secondary)' }}>
              {patientData.id} &middot; {patientData.age} yrs &middot; {patientData.gender} &middot; Blood Type: {patientData.bloodType}
            </p>
          </div>
          <StatusBadge status="Completed" />
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="space-y-6">
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="rounded-2xl p-6 shadow-mc-card" style={{ backgroundColor: 'var(--mc-surface)' }}>
            <h2 className="text-base font-semibold mb-4" style={{ color: 'var(--mc-text-primary)' }}>Contact Information</h2>
            <div className="space-y-3">
              {[
                { icon: Phone, value: patientData.phone },
                { icon: Mail, value: patientData.email },
                { icon: MapPin, value: patientData.address },
                { icon: Calendar, value: `Registered: ${patientData.registered}` },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <item.icon size={15} style={{ color: 'var(--mc-text-muted)' }} />
                  <span className="text-sm" style={{ color: 'var(--mc-text-secondary)' }}>{item.value}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="rounded-2xl p-6 shadow-mc-card" style={{ backgroundColor: 'var(--mc-surface)' }}>
            <h2 className="text-base font-semibold mb-4 flex items-center gap-2" style={{ color: 'var(--mc-text-primary)' }}>
              <Activity size={16} style={{ color: 'var(--mc-orange)' }} /> Latest Vitals
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {patientData.vitals.map((v, i) => (
                <div key={i} className="p-3 rounded-xl" style={{ backgroundColor: 'var(--mc-bg)' }}>
                  <p className="text-[11px] font-medium" style={{ color: 'var(--mc-text-muted)' }}>{v.label}</p>
                  <p className="text-lg font-bold" style={{ color: 'var(--mc-text-primary)' }}>{v.value} <span className="text-xs font-normal" style={{ color: 'var(--mc-text-muted)' }}>{v.unit}</span></p>
                </div>
              ))}
            </div>
          </motion.div>

          <RiskScore age={patientData.age} hasChronic={true} abnormalVitals={1} allergies={patientData.allergies.length} />

          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
            className="rounded-2xl p-6 shadow-mc-card" style={{ backgroundColor: 'var(--mc-surface)' }}>
            <h2 className="text-base font-semibold mb-3" style={{ color: 'var(--mc-text-primary)' }}>Allergies</h2>
            <div className="flex flex-wrap gap-2">
              {patientData.allergies.map((a, i) => (
                <span key={i} className="px-3 py-1 rounded-full text-xs font-semibold border" style={{ backgroundColor: 'var(--mc-red-bg)', color: 'var(--mc-red)', borderColor: 'rgba(239,68,68,0.25)' }}>{a}</span>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
            className="rounded-2xl p-6 shadow-mc-card" style={{ backgroundColor: 'var(--mc-surface)' }}>
            <h2 className="text-base font-semibold mb-4 flex items-center gap-2" style={{ color: 'var(--mc-text-primary)' }}>
              <Pill size={16} style={{ color: 'var(--mc-gold)' }} /> Current Medications
            </h2>
            <div className="divide-y" style={{ borderColor: 'var(--mc-border)' }}>
              {patientData.medications.map((med, i) => (
                <div key={i} className="flex items-center justify-between py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'var(--mc-orange-muted)' }}>
                      <Pill size={16} style={{ color: 'var(--mc-orange)' }} />
                    </div>
                    <div>
                      <p className="text-sm font-medium" style={{ color: 'var(--mc-text-primary)' }}>{med.name}</p>
                      <p className="text-xs" style={{ color: 'var(--mc-text-muted)' }}>{med.startDate}</p>
                    </div>
                  </div>
                  <span className="text-sm" style={{ color: 'var(--mc-text-secondary)' }}>{med.dosage}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <DrugAlert patientDrugs={patientData.medications.map(m => m.name.split(' ')[0])} />

          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="rounded-2xl p-6 shadow-mc-card" style={{ backgroundColor: 'var(--mc-surface)' }}>
            <h2 className="text-base font-semibold mb-4 flex items-center gap-2" style={{ color: 'var(--mc-text-primary)' }}>
              <Clock size={16} style={{ color: 'var(--mc-blue)' }} /> Patient Timeline
            </h2>
            <PatientTimeline events={patientData.history} />
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
            className="rounded-2xl p-6 shadow-mc-card" style={{ backgroundColor: 'var(--mc-surface)' }}>
            <h2 className="text-base font-semibold mb-4 flex items-center gap-2" style={{ color: 'var(--mc-text-primary)' }}>
              <CreditCard size={16} style={{ color: 'var(--mc-green)' }} /> Billing Summary
            </h2>
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: 'Total Invoices', value: '$1,095', color: 'var(--mc-gold)' },
                { label: 'Paid', value: '$895', color: 'var(--mc-green)' },
                { label: 'Pending', value: '$200', color: 'var(--mc-orange)' },
              ].map((s, i) => (
                <div key={i} className="p-4 rounded-xl text-center" style={{ backgroundColor: 'var(--mc-bg)' }}>
                  <p className="text-lg font-bold" style={{ color: s.color }}>{s.value}</p>
                  <p className="text-[11px] mt-0.5" style={{ color: 'var(--mc-text-muted)' }}>{s.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
