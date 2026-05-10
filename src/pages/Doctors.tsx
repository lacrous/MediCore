import { useState } from 'react';
import { motion } from 'framer-motion';
import { Stethoscope, Search, Star, Users, Clock, CalendarCheck, ChevronRight } from 'lucide-react';
import Avatar from '@/components/Avatar';
import DataTable from '@/components/DataTable';

interface Doctor {
  id: string;
  name: string;
  specialization: string;
  department: string;
  rating: number;
  patients: number;
  experience: number;
  status: 'Active' | 'On Leave' | 'Off Duty';
  schedule: string;
  avatar: string;
}

const doctors: Doctor[] = [
  { id: '1', name: 'Dr. Omar Abu Al-Makarem', specialization: 'Gastroenterologist & Diabetologist', department: 'Gastroenterology', rating: 4.9, patients: 342, experience: 18, status: 'Active', schedule: 'Sun-Thu 9AM-5PM', avatar: 'OA' },
  { id: '2', name: 'Dr. Michael Chen', specialization: 'Cardiologist', department: 'Cardiology', rating: 4.8, patients: 289, experience: 15, status: 'Active', schedule: 'Sun-Thu 8AM-4PM', avatar: 'MC' },
  { id: '3', name: 'Dr. Emily Watson', specialization: 'Pediatrician', department: 'Pediatrics', rating: 4.7, patients: 198, experience: 12, status: 'Active', schedule: 'Sat-Wed 9AM-5PM', avatar: 'EW' },
  { id: '4', name: 'Dr. James Rodriguez', specialization: 'Orthopedic Surgeon', department: 'Orthopedics', rating: 4.9, patients: 156, experience: 20, status: 'On Leave', schedule: 'N/A', avatar: 'JR' },
  { id: '5', name: 'Dr. Sarah Kim', specialization: 'Neurologist', department: 'Neurology', rating: 4.6, patients: 120, experience: 10, status: 'Active', schedule: 'Sun-Thu 10AM-6PM', avatar: 'SK' },
  { id: '6', name: 'Dr. Ahmed Hassan', specialization: 'General Physician', department: 'General Medicine', rating: 4.5, patients: 456, experience: 8, status: 'Off Duty', schedule: 'Mon-Fri 8AM-3PM', avatar: 'AH' },
];

const statusColors: Record<string, { bg: string; color: string }> = {
  'Active': { bg: 'var(--mc-green-bg)', color: 'var(--mc-green)' },
  'On Leave': { bg: 'var(--mc-amber-bg)', color: 'var(--mc-amber)' },
  'Off Duty': { bg: 'var(--mc-surface-elevated)', color: 'var(--mc-text-muted)' },
};

export default function DoctorsPage() {
  const [search, setSearch] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filtered = doctors.filter(d => d.name.toLowerCase().includes(search.toLowerCase()) || d.specialization.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
        <h1 className="text-2xl font-semibold tracking-tight" style={{ color: 'var(--mc-text-primary)' }}>Doctors Directory</h1>
        <p className="text-sm mt-1" style={{ color: 'var(--mc-text-secondary)' }}>Manage and view all medical staff</p>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Total Doctors', value: doctors.length, icon: Stethoscope, color: 'var(--mc-orange)' },
          { label: 'Active Now', value: doctors.filter(d => d.status === 'Active').length, icon: Clock, color: 'var(--mc-green)' },
          { label: 'Total Patients', value: doctors.reduce((s, d) => s + d.patients, 0), icon: Users, color: 'var(--mc-blue)' },
          { label: 'On Leave', value: doctors.filter(d => d.status === 'On Leave').length, icon: CalendarCheck, color: 'var(--mc-amber)' },
        ].map((s, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.05 }}
            className="rounded-xl p-4 shadow-mc-card" style={{ backgroundColor: 'var(--mc-surface)' }}>
            <s.icon size={18} style={{ color: s.color }} className="mb-2" />
            <p className="text-2xl font-bold" style={{ color: 'var(--mc-text-primary)' }}>{s.value}</p>
            <p className="text-xs mt-0.5" style={{ color: 'var(--mc-text-secondary)' }}>{s.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Search + View Toggle */}
      <div className="flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--mc-text-muted)' }} />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search doctors..."
            className="w-full pl-9 pr-4 py-2 rounded-xl border text-sm outline-none" style={{ backgroundColor: 'var(--mc-bg)', borderColor: 'var(--mc-border)', color: 'var(--mc-text-primary)' }} />
        </div>
        <div className="flex items-center gap-1 p-1 rounded-lg border" style={{ backgroundColor: 'var(--mc-bg)', borderColor: 'var(--mc-border)' }}>
          <button onClick={() => setViewMode('grid')} className="px-3 py-1 rounded-md text-xs font-medium transition-all" style={{ backgroundColor: viewMode === 'grid' ? 'var(--mc-surface)' : 'transparent', boxShadow: viewMode === 'grid' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none', color: viewMode === 'grid' ? 'var(--mc-text-primary)' : 'var(--mc-text-muted)' }}>Grid</button>
          <button onClick={() => setViewMode('list')} className="px-3 py-1 rounded-md text-xs font-medium transition-all" style={{ backgroundColor: viewMode === 'list' ? 'var(--mc-surface)' : 'transparent', boxShadow: viewMode === 'list' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none', color: viewMode === 'list' ? 'var(--mc-text-primary)' : 'var(--mc-text-muted)' }}>List</button>
        </div>
      </div>

      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((doc, i) => (
            <motion.div key={doc.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              className="rounded-2xl p-5 shadow-mc-card transition-all hover:shadow-mc-card-hover cursor-pointer group" style={{ backgroundColor: 'var(--mc-surface)' }}>
              <div className="flex items-start gap-4">
                <Avatar name={doc.avatar} size={48} color="var(--mc-gold)" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold truncate" style={{ color: 'var(--mc-text-primary)' }}>{doc.name}</h3>
                    <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: 'var(--mc-text-muted)' }} />
                  </div>
                  <p className="text-xs mt-0.5" style={{ color: 'var(--mc-text-secondary)' }}>{doc.specialization}</p>
                  <span className="inline-block mt-1.5 text-[10px] px-2 py-0.5 rounded-full font-medium" style={{ backgroundColor: statusColors[doc.status].bg, color: statusColors[doc.status].color }}>{doc.status}</span>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t grid grid-cols-3 gap-2 text-center" style={{ borderColor: 'var(--mc-border)' }}>
                <div>
                  <p className="text-lg font-bold" style={{ color: 'var(--mc-text-primary)' }}>{doc.rating}</p>
                  <div className="flex items-center justify-center gap-0.5">
                    <Star size={10} style={{ color: 'var(--mc-gold)' }} fill="var(--mc-gold)" />
                    <span className="text-[10px]" style={{ color: 'var(--mc-text-muted)' }}>Rating</span>
                  </div>
                </div>
                <div>
                  <p className="text-lg font-bold" style={{ color: 'var(--mc-text-primary)' }}>{doc.patients}</p>
                  <p className="text-[10px]" style={{ color: 'var(--mc-text-muted)' }}>Patients</p>
                </div>
                <div>
                  <p className="text-lg font-bold" style={{ color: 'var(--mc-text-primary)' }}>{doc.experience}y</p>
                  <p className="text-[10px]" style={{ color: 'var(--mc-text-muted)' }}>Experience</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <DataTable
          data={filtered}
          keyExtractor={r => r.id}
          searchKeys={['name', 'specialization', 'department']}
          columns={[
            { key: 'name', header: 'Doctor', sortable: true, render: row => <div className="flex items-center gap-3"><Avatar name={row.avatar} size={32} /><span>{row.name}</span></div> },
            { key: 'specialization', header: 'Specialization', sortable: true },
            { key: 'department', header: 'Department', sortable: true },
            { key: 'patients', header: 'Patients', sortable: true },
            { key: 'rating', header: 'Rating', sortable: true, render: row => <div className="flex items-center gap-1"><Star size={12} style={{ color: 'var(--mc-gold)' }} fill="var(--mc-gold)" />{row.rating}</div> },
            { key: 'status', header: 'Status', sortable: true, render: row => <span className="text-xs px-2 py-1 rounded-full font-medium" style={{ backgroundColor: statusColors[row.status].bg, color: statusColors[row.status].color }}>{row.status}</span> },
          ]}
        />
      )}
    </div>
  );
}
