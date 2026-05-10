import { Check } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface FilterDropdownProps {
  selected: string;
  onSelect: (value: string) => void;
}

export default function FilterDropdown({ selected, onSelect }: FilterDropdownProps) {
  const { t } = useLanguage();

  const filterOptions = [
    { key: 'All', label: t('appointments.filterAll') },
    { key: 'Completed', label: t('appointments.filterCompleted') },
    { key: 'Pending', label: t('appointments.filterPending') },
    { key: 'In Progress', label: t('appointments.filterInProgress') },
    { key: 'Cancelled', label: t('appointments.filterCancelled') },
  ];

  return (
    <div className="py-1">
      {filterOptions.map((option) => {
        const isSelected = selected === option.key;
        return (
          <button key={option.key} onClick={() => onSelect(option.key)}
            className="w-full flex items-center justify-between px-4 py-2.5 text-sm transition-colors hover:bg-black/[0.02]"
            style={{ color: 'var(--mc-text-primary)' }}>
            <span>{option.label}</span>
            {isSelected && <Check size={14} style={{ color: 'var(--mc-gold)' }} />}
          </button>
        );
      })}
    </div>
  );
}
