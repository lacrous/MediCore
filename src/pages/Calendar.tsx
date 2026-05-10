import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, CalendarCheck, Clock, Plus } from 'lucide-react';
import Avatar from '@/components/Avatar';
import StatusBadge from '@/components/StatusBadge';
import PrimaryButton from '@/components/PrimaryButton';
import Modal from '@/components/Modal';
import AppointmentForm from '@/components/forms/AppointmentForm';
import { useLanguage } from '@/context/LanguageContext';

interface CalendarEvent {
  id: string; patient: string; doctor: string; time: string; status: 'Completed' | 'Pending' | 'In Progress' | 'Cancelled';
}

const monthEvents: Record<number, CalendarEvent[]> = {
  0: [
    { id: '1', patient: 'Emma Johnson', doctor: 'Dr. Michael Chen', time: '09:00 AM', status: 'Completed' },
    { id: '2', patient: 'Olivia Brown', doctor: 'Dr. Omar Abu Al-Makarem', time: '11:00 AM', status: 'Pending' },
    { id: '3', patient: 'William Davis', doctor: 'Dr. James Rodriguez', time: '02:00 PM', status: 'In Progress' },
  ],
  1: [
    { id: '4', patient: 'Sophia Martinez', doctor: 'Dr. Emily Watson', time: '10:00 AM', status: 'Pending' },
    { id: '5', patient: 'Ava Thomas', doctor: 'Dr. Michael Chen', time: '03:00 PM', status: 'Pending' },
  ],
  4: [
    { id: '6', patient: 'Noah Jackson', doctor: 'Dr. Omar Abu Al-Makarem', time: '09:30 AM', status: 'Completed' },
  ],
  9: [
    { id: '7', patient: 'Isabella White', doctor: 'Dr. Emily Watson', time: '01:00 PM', status: 'Pending' },
  ],
  14: [
    { id: '8', patient: 'Mason Harris', doctor: 'Dr. Michael Chen', time: '11:30 AM', status: 'Completed' },
  ],
  16: [
    { id: '9', patient: 'James Wilson', doctor: 'Dr. James Rodriguez', time: '10:00 AM', status: 'Pending' },
  ],
  20: [
    { id: '10', patient: 'Charlotte Clark', doctor: 'Dr. Omar Abu Al-Makarem', time: '04:00 PM', status: 'Pending' },
  ],
};

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 0, 15));
  const [selectedDay, setSelectedDay] = useState(14);
  const [showModal, setShowModal] = useState(false);
  const { isRTL } = useLanguage();

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const monthName = currentDate.toLocaleString(isRTL ? 'ar' : 'en', { month: 'long', year: 'numeric' });
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const adjustedFirstDay = isRTL ? (6 - firstDayOfMonth + 1) % 7 : firstDayOfMonth;

  const weekDays = isRTL
    ? ['Sat', 'Fri', 'Thu', 'Wed', 'Tue', 'Mon', 'Sun']
    : ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  const todayEvents = monthEvents[selectedDay] || [];

  const calendarDays = [];
  for (let i = 0; i < adjustedFirstDay; i++) calendarDays.push(null);
  for (let d = 1; d <= daysInMonth; d++) calendarDays.push(d);

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight" style={{ color: 'var(--mc-text-primary)' }}>{isRTL ? 'تقويم المواعيد' : 'Appointment Calendar'}</h1>
          <p className="text-sm mt-1" style={{ color: 'var(--mc-text-secondary)' }}>{isRTL ? 'عرض وإدارة المواعيد' : 'View and manage appointments'}</p>
        </div>
        <PrimaryButton icon={<Plus size={16} />} onClick={() => setShowModal(true)}>{isRTL ? 'موعد جديد' : 'New Appointment'}</PrimaryButton>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar Grid */}
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="lg:col-span-2 rounded-2xl p-6 shadow-mc-card" style={{ backgroundColor: 'var(--mc-surface)' }}>
          {/* Month Navigation */}
          <div className="flex items-center justify-between mb-6">
            <button onClick={prevMonth} className="p-2 rounded-lg border transition-colors hover:bg-[var(--mc-surface-elevated)]" style={{ borderColor: 'var(--mc-border)' }}>
              <ChevronLeft size={18} style={{ color: 'var(--mc-text-secondary)' }} className={isRTL ? 'rotate-180' : ''} />
            </button>
            <h2 className="text-lg font-semibold" style={{ color: 'var(--mc-text-primary)' }}>{monthName}</h2>
            <button onClick={nextMonth} className="p-2 rounded-lg border transition-colors hover:bg-[var(--mc-surface-elevated)]" style={{ borderColor: 'var(--mc-border)' }}>
              <ChevronRight size={18} style={{ color: 'var(--mc-text-secondary)' }} className={isRTL ? 'rotate-180' : ''} />
            </button>
          </div>

          {/* Weekday Headers */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {weekDays.map((d) => (
              <div key={d} className="text-center py-2 text-[11px] font-semibold uppercase tracking-wider" style={{ color: 'var(--mc-text-muted)' }}>{d}</div>
            ))}
          </div>

          {/* Days Grid */}
          <div className="grid grid-cols-7 gap-1">
            {calendarDays.map((day, i) => {
              if (day === null) return <div key={`empty-${i}`} className="aspect-square" />;
              const hasEvents = monthEvents[day - 1] && monthEvents[day - 1].length > 0;
              const isSelected = day === selectedDay;
              const isToday = day === 15;

              return (
                <button key={day} onClick={() => setSelectedDay(day - 1)}
                  className="aspect-square rounded-xl flex flex-col items-center justify-center gap-0.5 transition-all duration-200 relative"
                  style={{
                    backgroundColor: isSelected ? 'var(--mc-orange-muted)' : 'transparent',
                    color: isSelected ? 'var(--mc-orange)' : 'var(--mc-text-primary)',
                    border: isToday && !isSelected ? '1px solid var(--mc-gold)' : '1px solid transparent',
                  }}>
                  <span className={`text-sm font-medium ${isToday ? 'font-bold' : ''}`}>{day}</span>
                  {hasEvents && (
                    <div className="flex gap-0.5">
                      {monthEvents[day - 1].slice(0, 3).map((_, j) => (
                        <div key={j} className="w-1 h-1 rounded-full" style={{ backgroundColor: isSelected ? 'var(--mc-orange)' : 'var(--mc-gold)' }} />
                      ))}
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Legend */}
          <div className="flex items-center gap-4 mt-4 pt-4 border-t" style={{ borderColor: 'var(--mc-border)' }}>
            <span className="flex items-center gap-1.5 text-xs" style={{ color: 'var(--mc-text-muted)' }}>
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--mc-gold)' }} /> {isRTL ? 'مواعيد مجدولة' : 'Scheduled'}
            </span>
            <span className="flex items-center gap-1.5 text-xs" style={{ color: 'var(--mc-text-muted)' }}>
              <span className="w-2 h-2 rounded-full border" style={{ borderColor: 'var(--mc-gold)' }} /> {isRTL ? 'اليوم' : 'Today'}
            </span>
          </div>
        </motion.div>

        {/* Selected Day Events */}
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="rounded-2xl p-6 shadow-mc-card" style={{ backgroundColor: 'var(--mc-surface)' }}>
          <h2 className="text-base font-semibold mb-1" style={{ color: 'var(--mc-text-primary)' }}>
            {isRTL ? `مواعيد ${selectedDay + 1} يناير` : `Appointments for Jan ${selectedDay + 1}`}
          </h2>
          <p className="text-xs mb-4" style={{ color: 'var(--mc-text-muted)' }}>{todayEvents.length} {isRTL ? 'مواعيد' : 'appointments'}</p>

          {todayEvents.length === 0 ? (
            <div className="text-center py-8">
              <CalendarCheck size={32} style={{ color: 'var(--mc-text-muted)', margin: '0 auto' }} />
              <p className="text-sm mt-2" style={{ color: 'var(--mc-text-muted)' }}>{isRTL ? 'لا توجد مواعيد' : 'No appointments'}</p>
            </div>
          ) : (
            <div className="space-y-3">
              {todayEvents.map((evt) => (
                <div key={evt.id} className="p-3 rounded-xl border transition-colors hover:bg-black/[0.02]" style={{ borderColor: 'var(--mc-border)' }}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Avatar name={evt.patient} size={28} />
                      <span className="text-sm font-medium" style={{ color: 'var(--mc-text-primary)' }}>{evt.patient}</span>
                    </div>
                    <StatusBadge status={evt.status} />
                  </div>
                  <div className="flex items-center gap-3 mt-2 text-xs" style={{ color: 'var(--mc-text-muted)' }}>
                    <span className="flex items-center gap-1"><Clock size={11} /> {evt.time}</span>
                    <span>{evt.doctor}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>

      {/* Modal */}
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title={isRTL ? 'حجز موعد جديد' : 'Book New Appointment'}>
        <AppointmentForm onClose={() => setShowModal(false)} />
      </Modal>
    </div>
  );
}
