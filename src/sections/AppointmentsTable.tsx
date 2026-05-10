import { MoreHorizontal } from 'lucide-react';
import { motion } from 'framer-motion';
import StatusBadge from '@/components/StatusBadge';
import Avatar from '@/components/Avatar';
import Dropdown from '@/components/Dropdown';
import RowActionMenu from '@/components/RowActionMenu';
import { useDropdown } from '@/hooks/useDropdown';
import { useLanguage } from '@/context/LanguageContext';

type StatusType = 'Completed' | 'Pending' | 'In Progress' | 'Cancelled';

interface AppointmentRow {
  patient: string; doctor: string; date: string; time: string; status: StatusType;
}

const rows: AppointmentRow[] = [
  { patient: 'Emma Johnson', doctor: 'Dr. Michael Chen', date: 'Jan 15, 2026', time: '09:00 AM', status: 'Completed' },
  { patient: 'James Wilson', doctor: 'Dr. Omar Abu Al-Makarem', date: 'Jan 15, 2026', time: '09:30 AM', status: 'Completed' },
  { patient: 'Olivia Brown', doctor: 'Dr. Michael Chen', date: 'Jan 15, 2026', time: '10:00 AM', status: 'Pending' },
  { patient: 'William Davis', doctor: 'Dr. James Rodriguez', date: 'Jan 15, 2026', time: '10:30 AM', status: 'In Progress' },
  { patient: 'Sophia Martinez', doctor: 'Dr. Omar Abu Al-Makarem', date: 'Jan 15, 2026', time: '11:00 AM', status: 'Pending' },
  { patient: 'Liam Anderson', doctor: 'Dr. Emily Watson', date: 'Jan 15, 2026', time: '11:30 AM', status: 'Cancelled' },
  { patient: 'Ava Thomas', doctor: 'Dr. Michael Chen', date: 'Jan 15, 2026', time: '02:00 PM', status: 'Pending' },
  { patient: 'Noah Jackson', doctor: 'Dr. James Rodriguez', date: 'Jan 15, 2026', time: '02:30 PM', status: 'Completed' },
  { patient: 'Isabella White', doctor: 'Dr. Emily Watson', date: 'Jan 15, 2026', time: '03:00 PM', status: 'Pending' },
  { patient: 'Mason Harris', doctor: 'Dr. Omar Abu Al-Makarem', date: 'Jan 15, 2026', time: '03:30 PM', status: 'Completed' },
];

export default function AppointmentsTable() {
  const { getDropdownId } = useDropdown();
  const { t } = useLanguage();

  const columns = [
    { key: 'patient', label: t('appointments.patientName') },
    { key: 'doctor', label: t('appointments.doctor') },
    { key: 'date', label: t('appointments.date') },
    { key: 'time', label: t('appointments.time'), center: true },
    { key: 'status', label: t('appointments.status') },
    { key: 'actions', label: '', right: true },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="rounded-2xl shadow-mc-card overflow-hidden"
      style={{ backgroundColor: 'var(--mc-surface)' }}
    >
      <div className="overflow-x-auto">
        <table className="w-full min-w-[700px]">
          <thead>
            <tr className="border-b" style={{ borderColor: 'var(--mc-border)' }}>
              {columns.map((col) => (
                <th key={col.key} className={`px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.06em] ${col.center ? 'text-center' : ''} ${col.right ? 'text-right' : 'text-left'}`}
                  style={{ color: 'var(--mc-text-muted)' }}>{col.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, idx) => {
              const dropdownId = getDropdownId();
              return (
                <tr key={idx} className="border-b transition-colors hover:bg-black/[0.02]" style={{ borderColor: 'var(--mc-border)' }}>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <Avatar name={row.patient} size={32} />
                      <span className="text-sm" style={{ color: 'var(--mc-text-primary)' }}>{row.patient}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm" style={{ color: 'var(--mc-text-primary)' }}>{row.doctor}</td>
                  <td className="px-6 py-4 text-sm" style={{ color: 'var(--mc-text-primary)' }}>{row.date}</td>
                  <td className="px-6 py-4 text-sm text-center" style={{ color: 'var(--mc-text-primary)' }}>{row.time}</td>
                  <td className="px-6 py-4"><StatusBadge status={row.status} /></td>
                  <td className="px-6 py-4 text-right">
                    <Dropdown id={dropdownId} trigger={
                      <button className="p-1.5 rounded-md transition-colors hover:bg-[var(--mc-surface-elevated)]"
                        onClick={(e) => e.stopPropagation()}>
                        <MoreHorizontal size={16} style={{ color: 'var(--mc-text-muted)' }} />
                      </button>
                    } align="right" width={160}>
                      <RowActionMenu />
                    </Dropdown>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
