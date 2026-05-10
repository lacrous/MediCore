import { Filter, Plus } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import PrimaryButton from '@/components/PrimaryButton';
import SecondaryButton from '@/components/SecondaryButton';
import Dropdown from '@/components/Dropdown';
import FilterDropdown from '@/components/FilterDropdown';
import { useDropdown } from '@/hooks/useDropdown';
import { useLanguage } from '@/context/LanguageContext';

interface AppointmentsHeaderProps {
  onNewAppointment?: () => void;
}

export default function AppointmentsHeader({ onNewAppointment }: AppointmentsHeaderProps) {
  const [filterLabel, setFilterLabel] = useState('Filter');
  const { getDropdownId } = useDropdown();
  const { t, isRTL } = useLanguage();
  const filterId = getDropdownId();

  const handleFilterSelect = (value: string) => {
    const labels: Record<string, string> = {
      'All': t('appointments.filter'),
      'Completed': `${t('appointments.filter')}: ${t('appointments.filterCompleted')}`,
      'Pending': `${t('appointments.filter')}: ${t('appointments.filterPending')}`,
      'In Progress': `${t('appointments.filter')}: ${t('appointments.filterInProgress')}`,
      'Cancelled': `${t('appointments.filter')}: ${t('appointments.filterCancelled')}`,
    };
    setFilterLabel(labels[value] || t('appointments.filter'));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b"
      style={{ borderColor: 'var(--mc-border)' }}
    >
      <div>
        <h1 className="text-2xl font-semibold tracking-tight" style={{ color: 'var(--mc-text-primary)' }}>
          {t('appointments.title')}
        </h1>
        <p className="text-sm mt-1" style={{ color: 'var(--mc-text-secondary)' }}>
          {t('appointments.subtitle')}
        </p>
      </div>
      <div className="flex flex-col sm:flex-row gap-3" style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
        <Dropdown
          id={filterId}
          trigger={
            <div>
              <SecondaryButton icon={<Filter size={16} />} className="w-full sm:w-auto">
                {filterLabel}
              </SecondaryButton>
            </div>
          }
          align={isRTL ? 'left' : 'right'}
          width={180}
        >
          <FilterDropdown selected={filterLabel === t('appointments.filter') ? 'All' : ''} onSelect={handleFilterSelect} />
        </Dropdown>
        <PrimaryButton icon={<Plus size={16} />} className="w-full sm:w-auto" onClick={onNewAppointment}>
          {t('appointments.newAppointment')}
        </PrimaryButton>
      </div>
    </motion.div>
  );
}
