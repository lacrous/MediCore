import { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Pill, ShieldAlert } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface Interaction {
  drug1: string;
  drug2: string;
  severity: 'contraindicated' | 'major' | 'moderate' | 'minor';
  description: string;
}

const interactions: Interaction[] = [
  { drug1: 'Warfarin', drug2: 'Aspirin', severity: 'major', description: 'Increased bleeding risk. Monitor INR closely.' },
  { drug1: 'Metformin', drug2: 'Contrast Dye', severity: 'contraindicated', description: 'Risk of lactic acidosis. Hold metformin 48h before/after.' },
  { drug1: 'Amoxicillin', drug2: 'Allopurinol', severity: 'moderate', description: 'Increased risk of rash when used together.' },
  { drug1: 'ACE Inhibitors', drug2: 'Potassium Supplements', severity: 'major', description: 'Risk of hyperkalemia. Monitor potassium levels.' },
];

const severityConfig = {
  contraindicated: { label: 'Contraindicated', color: 'var(--mc-red)', bg: 'var(--mc-red-bg)', border: 'rgba(239,68,68,0.3)' },
  major: { label: 'Major', color: 'var(--mc-orange)', bg: 'var(--mc-orange-muted)', border: 'rgba(255,107,0,0.3)' },
  moderate: { label: 'Moderate', color: 'var(--mc-amber)', bg: 'var(--mc-amber-bg)', border: 'rgba(245,158,11,0.3)' },
  minor: { label: 'Minor', color: 'var(--mc-blue)', bg: 'var(--mc-blue-bg)', border: 'rgba(59,130,246,0.3)' },
};

interface Props {
  patientDrugs?: string[];
}

export default function DrugAlert({ patientDrugs }: Props) {
  const { t } = useLanguage();
  const [dismissed, setDismissed] = useState<Set<string>>(new Set());
  if (!patientDrugs || patientDrugs.length < 2) return null;

  const matches = interactions.filter(ix =>
    !dismissed.has(`${ix.drug1}-${ix.drug2}`) &&
    ((patientDrugs.includes(ix.drug1) && patientDrugs.includes(ix.drug2)))
  );
  if (matches.length === 0) return null;

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl overflow-hidden" style={{ backgroundColor: 'var(--mc-surface)', border: '1px solid var(--mc-red-bg)' }}>
      <div className="px-5 py-3 flex items-center gap-3" style={{ backgroundColor: 'var(--mc-red-bg)' }}>
        <ShieldAlert size={18} style={{ color: 'var(--mc-red)' }} />
        <div className="flex-1">
          <h3 className="text-sm font-semibold" style={{ color: 'var(--mc-red)' }}>{t('patientDetail.drugInteractionAlert')}</h3>
          <p className="text-xs" style={{ color: 'var(--mc-text-secondary)' }}>{matches.length} {t('patientDetail.drugInteractionDesc')}</p>
        </div>
      </div>
      <div className="divide-y" style={{ borderColor: 'var(--mc-border)' }}>
        {matches.map((ix) => {
          const s = severityConfig[ix.severity];
          return (
            <div key={`${ix.drug1}-${ix.drug2}`} className="flex items-start gap-3 px-5 py-3 group">
              <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: s.bg }}>
                <Pill size={14} style={{ color: s.color }} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm font-medium" style={{ color: 'var(--mc-text-primary)' }}>{ix.drug1}</span>
                  <span className="text-xs" style={{ color: 'var(--mc-text-muted)' }}>+</span>
                  <span className="text-sm font-medium" style={{ color: 'var(--mc-text-primary)' }}>{ix.drug2}</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded-full font-medium" style={{ backgroundColor: s.bg, color: s.color, border: `1px solid ${s.border}` }}>{s.label}</span>
                </div>
                <p className="text-xs mt-1" style={{ color: 'var(--mc-text-secondary)' }}>{ix.description}</p>
              </div>
              <button onClick={() => setDismissed(prev => new Set(prev).add(`${ix.drug1}-${ix.drug2}`))}
                className="p-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: 'var(--mc-text-muted)' }}>
                <X size={14} />
              </button>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
