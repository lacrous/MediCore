import { useState } from 'react';
import StatCardsRow from '@/sections/StatCardsRow';
import AppointmentsHeader from '@/sections/AppointmentsHeader';
import AppointmentsTable from '@/sections/AppointmentsTable';
import TablePagination from '@/sections/TablePagination';
import Modal from '@/components/Modal';
import AppointmentForm from '@/components/forms/AppointmentForm';
import { useLanguage } from '@/context/LanguageContext';

export default function Appointments() {
  const [showModal, setShowModal] = useState(false);
  const { t } = useLanguage();

  return (
    <div className="space-y-6">
      {/* KPI Stat Cards */}
      <StatCardsRow />

      {/* Appointments Header + Actions */}
      <AppointmentsHeader onNewAppointment={() => setShowModal(true)} />

      {/* Data Table */}
      <AppointmentsTable />

      {/* Pagination */}
      <TablePagination />

      {/* New Appointment Modal */}
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title={t('appointments.newAppointment')}>
        <AppointmentForm onClose={() => setShowModal(false)} />
      </Modal>
    </div>
  );
}
