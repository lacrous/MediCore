import { motion } from 'framer-motion';
import { AlertTriangle, ShieldCheck, ShieldAlert, Shield } from 'lucide-react';

interface Props {
  age: number;
  hasChronic: boolean;
  abnormalVitals: number;
  allergies: number;
}

export default function RiskScore({ age, hasChronic, abnormalVitals, allergies }: Props) {
  // Simple risk calculation
  let score = 0;
  if (age > 65) score += 2;
  else if (age > 45) score += 1;
  if (hasChronic) score += 2;
  score += abnormalVitals;
  score += Math.min(allergies, 2);

  const getRisk = () => {
    if (score >= 5) return { label: 'High Risk', color: 'var(--mc-red)', bg: 'var(--mc-red-bg)', icon: ShieldAlert, desc: 'Multiple risk factors detected. Close monitoring recommended.' };
    if (score >= 3) return { label: 'Medium Risk', color: 'var(--mc-amber)', bg: 'var(--mc-amber-bg)', icon: AlertTriangle, desc: 'Some risk factors present. Regular follow-up advised.' };
    if (score >= 1) return { label: 'Low Risk', color: 'var(--mc-blue)', bg: 'var(--mc-blue-bg)', icon: Shield, desc: 'Minimal risk factors. Routine care sufficient.' };
    return { label: 'Very Low Risk', color: 'var(--mc-green)', bg: 'var(--mc-green-bg)', icon: ShieldCheck, desc: 'No significant risk factors detected.' };
  };

  const risk = getRisk();
  const Icon = risk.icon;
  const maxScore = 8;
  const percentage = Math.min(100, (score / maxScore) * 100);

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl p-5 shadow-mc-card" style={{ backgroundColor: 'var(--mc-surface)' }}>
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: risk.bg }}>
          <Icon size={18} style={{ color: risk.color }} />
        </div>
        <div>
          <h3 className="text-sm font-semibold" style={{ color: 'var(--mc-text-primary)' }}>Patient Risk Score</h3>
          <p className="text-xs" style={{ color: 'var(--mc-text-muted)' }}>Based on age, conditions, vitals</p>
        </div>
        <div className="ms-auto text-end">
          <p className="text-lg font-bold" style={{ color: risk.color }}>{score}/{maxScore}</p>
          <p className="text-[10px] font-medium" style={{ color: risk.color }}>{risk.label}</p>
        </div>
      </div>
      <div className="w-full h-2 rounded-full overflow-hidden mb-3" style={{ backgroundColor: 'var(--mc-bg)' }}>
        <motion.div initial={{ width: 0 }} animate={{ width: `${percentage}%` }} transition={{ duration: 0.8, ease: 'easeOut' }}
          className="h-full rounded-full" style={{ backgroundColor: risk.color }} />
      </div>
      <p className="text-xs" style={{ color: 'var(--mc-text-secondary)' }}>{risk.desc}</p>
    </motion.div>
  );
}
