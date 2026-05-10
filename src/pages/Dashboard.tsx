import { motion } from 'framer-motion';
import { Users, CalendarCheck, Stethoscope, DollarSign, TrendingUp, TrendingDown, Activity, UserPlus, Pill, AlertCircle, CheckCircle2, Clock } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, PieChart, Pie, Cell } from 'recharts';
import { Link } from 'react-router-dom';
import Sparkline from '@/components/Sparkline';
import Avatar from '@/components/Avatar';
import StatusBadge from '@/components/StatusBadge';
import Skeleton, { StatCardsSkeleton } from '@/components/Skeleton';
import { useDashboard } from '@/hooks/useApi';
import { useAuth } from '@/context/AuthContext';
import SmartAlerts from '@/components/SmartAlerts';

const COLORS = ['#D4AF37', '#FF6B00', '#22C55E', '#3B82F6', '#EF4444'];

function StatCard({ icon: Icon, label, value, trend, positive, accent, sparkData, index }: {
  icon: React.ElementType; label: string; value: string; trend: string; positive: boolean;
  accent: 'gold' | 'orange' | 'green' | 'blue'; sparkData: number[]; index: number;
}) {
  const colors = {
    gold: { icon: 'var(--mc-gold)', bg: 'var(--mc-gold-muted)' },
    orange: { icon: 'var(--mc-orange)', bg: 'var(--mc-orange-muted)' },
    green: { icon: 'var(--mc-green)', bg: 'var(--mc-green-bg)' },
    blue: { icon: 'var(--mc-blue)', bg: 'var(--mc-blue-bg)' },
  };
  const c = colors[accent];
  const TrendIcon = positive ? TrendingUp : TrendingDown;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.35, delay: 0.15 + index * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="rounded-2xl p-6 shadow-mc-card transition-all duration-200 hover:shadow-mc-card-hover hover:-translate-y-0.5 relative overflow-hidden"
      style={{ backgroundColor: 'var(--mc-surface)' }}
    >
      <div className="absolute top-0 start-4 end-4 h-px rounded-full" style={{ backgroundColor: 'rgba(128,128,128,0.08)' }} />
      <div className="flex items-center justify-between">
        <div className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: c.bg }}>
          <Icon size={22} style={{ color: c.icon }} />
        </div>
        <Sparkline data={sparkData} color={c.icon} width={80} height={36} />
      </div>
      <div className="mt-4 text-[32px] font-bold leading-tight tracking-tight" style={{ color: 'var(--mc-text-primary)' }}>{value}</div>
      <div className="mt-1 text-[13px] font-medium" style={{ color: 'var(--mc-text-secondary)' }}>{label}</div>
      <div className="flex items-center gap-1.5 mt-2">
        <TrendIcon size={12} style={{ color: positive ? 'var(--mc-green)' : 'var(--mc-red)' }} />
        <span className="text-xs font-medium" style={{ color: positive ? 'var(--mc-green)' : 'var(--mc-red)' }}>{trend}</span>
        <span className="text-xs" style={{ color: 'var(--mc-text-muted)' }}>from last month</span>
      </div>
    </motion.div>
  );
}

function ActivityItem({ icon: Icon, iconBg, iconColor, title, time }: { icon: React.ElementType; iconBg: string; iconColor: string; title: string; time: string }) {
  return (
    <div className="flex items-center gap-3 py-3 px-4 rounded-lg transition-colors hover:bg-black/[0.02] cursor-pointer">
      <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: iconBg }}>
        <Icon size={16} style={{ color: iconColor }} />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm truncate" style={{ color: 'var(--mc-text-primary)' }}>{title}</p>
        <p className="text-xs" style={{ color: 'var(--mc-text-muted)' }}>{time}</p>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const { data: stats, isLoading } = useDashboard();
  const { user } = useAuth();

  if (isLoading || !stats) {
    return (
      <div className="space-y-6">
        <Skeleton width={250} height={28} />
        <Skeleton width={300} height={16} />
        <StatCardsSkeleton />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Skeleton height={300} />
          <Skeleton height={300} />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
        <h1 className="text-2xl font-semibold tracking-tight" style={{ color: 'var(--mc-text-primary)' }}>Welcome back, {user?.name || 'Doctor'}</h1>
        <p className="text-sm mt-1" style={{ color: 'var(--mc-text-secondary)' }}>Here's what's happening at MediCore today</p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        <Link to="/patients" className="no-underline">
          <StatCard icon={Users} label="Total Patients" value={String(stats.totalPatients)} trend={stats.patientChange} positive accent="gold" sparkData={[20,28,24,35,42]} index={0} />
        </Link>
        <Link to="/appointments" className="no-underline">
          <StatCard icon={CalendarCheck} label="Today's Appointments" value={String(stats.todayAppointments)} trend={stats.appointmentChange} positive accent="orange" sparkData={[15,18,22,20,24]} index={1} />
        </Link>
        <StatCard icon={Stethoscope} label="Available Doctors" value={String(stats.availableDoctors)} trend="-2.1%" positive={false} accent="gold" sparkData={[22,20,21,18,18]} index={2} />
        <Link to="/billing" className="no-underline">
          <StatCard icon={DollarSign} label="Revenue This Month" value={`$${stats.revenueThisMonth.toLocaleString()}`} trend={stats.revenueChange} positive accent="gold" sparkData={[30,35,42,48,55]} index={3} />
        </Link>
      </div>

      <SmartAlerts />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Weekly Bar Chart */}
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.45 }}
          className="lg:col-span-2 rounded-2xl p-6 shadow-mc-card" style={{ backgroundColor: 'var(--mc-surface)' }}>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold" style={{ color: 'var(--mc-text-primary)' }}>Weekly Appointments</h2>
              <p className="text-xs mt-0.5" style={{ color: 'var(--mc-text-muted)' }}>Jan 11 — Jan 17, 2026</p>
            </div>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5 text-xs" style={{ color: 'var(--mc-text-secondary)' }}><span className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--mc-orange)' }} />Scheduled</span>
              <span className="flex items-center gap-1.5 text-xs" style={{ color: 'var(--mc-text-secondary)' }}><span className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--mc-gold)' }} />Completed</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={stats.weeklyData} barGap={4}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--mc-border)" vertical={false} />
              <XAxis dataKey="day" tick={{ fill: 'var(--mc-text-muted)', fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: 'var(--mc-text-muted)', fontSize: 12 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ backgroundColor: 'var(--mc-surface)', border: '1px solid var(--mc-border)', borderRadius: 8, color: 'var(--mc-text-primary)' }} />
              <Bar dataKey="scheduled" fill="var(--mc-orange)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="completed" fill="var(--mc-gold)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Revenue Area Chart */}
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.5 }}
          className="rounded-2xl p-6 shadow-mc-card" style={{ backgroundColor: 'var(--mc-surface)' }}>
          <h2 className="text-lg font-semibold mb-1" style={{ color: 'var(--mc-text-primary)' }}>Revenue Trend</h2>
          <p className="text-xs mb-4" style={{ color: 'var(--mc-text-muted)' }}>Jul — Dec 2025</p>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={stats.revenueData}>
              <defs>
                <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#D4AF37" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#D4AF37" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--mc-border)" vertical={false} />
              <XAxis dataKey="month" tick={{ fill: 'var(--mc-text-muted)', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: 'var(--mc-text-muted)', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v / 1000}k`} />
              <Tooltip contentStyle={{ backgroundColor: 'var(--mc-surface)', border: '1px solid var(--mc-border)', borderRadius: 8 }} formatter={(v: number) => [`$${v.toLocaleString()}`, 'Revenue']} />
              <Area type="monotone" dataKey="value" stroke="#D4AF37" strokeWidth={2} fill="url(#revGrad)" />
            </AreaChart>
          </ResponsiveContainer>
          <div className="mt-4 flex items-center justify-between p-3 rounded-xl" style={{ backgroundColor: 'var(--mc-bg)' }}>
            <div>
              <p className="text-xs" style={{ color: 'var(--mc-text-muted)' }}>6-Month Total</p>
              <p className="text-lg font-bold" style={{ color: 'var(--mc-gold)' }}>${stats.totalRevenueAll.toLocaleString()}</p>
            </div>
            <div className="text-end">
              <p className="text-xs font-medium" style={{ color: 'var(--mc-green)' }}>{stats.revenueChange}</p>
              <p className="text-xs" style={{ color: 'var(--mc-text-muted)' }}>vs prev 6mo</p>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Department Pie Chart */}
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.55 }}
          className="rounded-2xl p-6 shadow-mc-card" style={{ backgroundColor: 'var(--mc-surface)' }}>
          <h2 className="text-lg font-semibold mb-4" style={{ color: 'var(--mc-text-primary)' }}>Department Overview</h2>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={stats.departments} cx="50%" cy="50%" innerRadius={55} outerRadius={85} paddingAngle={4} dataKey="patients">
                {stats.departments.map((_: any, i: number) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: 'var(--mc-surface)', border: '1px solid var(--mc-border)', borderRadius: 8 }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {stats.departments.map((d: any, i: number) => (
              <div key={d.id} className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                <span className="text-xs truncate" style={{ color: 'var(--mc-text-secondary)' }}>{d.name}: {d.patients}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.55 }}
          className="rounded-2xl p-6 shadow-mc-card" style={{ backgroundColor: 'var(--mc-surface)' }}>
          <h2 className="text-lg font-semibold mb-4" style={{ color: 'var(--mc-text-primary)' }}>Recent Activity</h2>
          <div className="space-y-1">
            <ActivityItem icon={UserPlus} iconBg="var(--mc-orange-muted)" iconColor="var(--mc-orange)" title="New patient: Charlotte Clark" time="2 min ago" />
            <ActivityItem icon={CheckCircle2} iconBg="var(--mc-green-bg)" iconColor="var(--mc-green)" title="Appointment completed" time="15 min ago" />
            <ActivityItem icon={AlertCircle} iconBg="var(--mc-red-bg)" iconColor="var(--mc-red)" title="Low stock: Amoxicillin" time="32 min ago" />
            <ActivityItem icon={Activity} iconBg="var(--mc-blue-bg)" iconColor="var(--mc-blue)" title="Dr. Chen updated schedule" time="1 hour ago" />
            <ActivityItem icon={Pill} iconBg="var(--mc-gold-muted)" iconColor="var(--mc-gold)" title="Prescription filled" time="2 hours ago" />
            <ActivityItem icon={Clock} iconBg="var(--mc-amber-bg)" iconColor="var(--mc-amber)" title="Appointment rescheduled" time="3 hours ago" />
          </div>
        </motion.div>

        {/* Upcoming Appointments */}
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.6 }}
          className="rounded-2xl p-6 shadow-mc-card" style={{ backgroundColor: 'var(--mc-surface)' }}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold" style={{ color: 'var(--mc-text-primary)' }}>Upcoming Appointments</h2>
            <Link to="/appointments" className="text-xs font-medium hover:underline" style={{ color: 'var(--mc-orange)' }}>View all</Link>
          </div>
          <div className="space-y-3">
            {[
              { name: 'Olivia Brown', doctor: 'Dr. Michael Chen', time: '10:00 AM', status: 'Pending' as const },
              { name: 'William Davis', doctor: 'Dr. James Rodriguez', time: '10:30 AM', status: 'In Progress' as const },
              { name: 'Sophia Martinez', doctor: 'Dr. Omar Abu Al-Makarem', time: '11:00 AM', status: 'Pending' as const },
              { name: 'Ava Thomas', doctor: 'Dr. Michael Chen', time: '02:00 PM', status: 'Pending' as const },
            ].map((apt, i) => (
              <div key={i} className="flex items-center justify-between py-2 px-3 rounded-lg transition-colors hover:bg-black/[0.02]">
                <div className="flex items-center gap-3">
                  <Avatar name={apt.name} size={32} />
                  <div>
                    <p className="text-sm font-medium" style={{ color: 'var(--mc-text-primary)' }}>{apt.name}</p>
                    <p className="text-xs" style={{ color: 'var(--mc-text-muted)' }}>{apt.doctor}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-medium" style={{ color: 'var(--mc-text-secondary)' }}>{apt.time}</span>
                  <StatusBadge status={apt.status} />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
