import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Users, CalendarCheck, Stethoscope, DollarSign, TrendingUp, TrendingDown, Activity, UserPlus, Pill, AlertCircle, CheckCircle2, Clock } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, PieChart, Pie, Cell } from 'recharts';
import { Link } from 'react-router-dom';
import Sparkline from '@/components/Sparkline';
import Avatar from '@/components/Avatar';
import StatusBadge from '@/components/StatusBadge';
import Skeleton, { StatCardsSkeleton } from '@/components/Skeleton';
import { useDashboard } from '@/hooks/useApi';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
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

  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);
  const springConfig = { damping: 25, stiffness: 180 };
  const rotateX = useSpring(useTransform(y, [0, 1], [10, -10]), springConfig);
  const rotateY = useSpring(useTransform(x, [0, 1], [-10, 10]), springConfig);
  const glowX = useTransform(x, [0, 1], ['0%', '100%']);
  const glowY = useTransform(y, [0, 1], ['0%', '100%']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width);
    y.set((e.clientY - rect.top) / rect.height);
  };
  const handleMouseLeave = () => { x.set(0.5); y.set(0.5); };

  const glowColor = accent === 'gold' ? 'rgba(212,175,55,0.15)' : accent === 'orange' ? 'rgba(255,107,0,0.12)' : accent === 'green' ? 'rgba(34,197,94,0.12)' : 'rgba(59,130,246,0.12)';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.98, rotateX: 10 }}
      animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
      transition={{ duration: 0.5, delay: 0.15 + index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="relative"
      style={{ perspective: 1000 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className="rounded-2xl p-6 shadow-mc-card relative overflow-hidden"
        style={{
          backgroundColor: 'var(--mc-surface)',
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        whileHover={{ boxShadow: '0 20px 60px rgba(0,0,0,0.15)', y: -4 }}
        transition={{ duration: 0.3 }}
      >
        {/* 3D glow */}
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            background: `radial-gradient(circle at ${useTransform(glowX, v => v)} ${useTransform(glowY, v => v)}, ${glowColor}, transparent 60%)`,
            opacity: 1,
          }}
        />
        <div style={{ transform: 'translateZ(20px)' }}>
          <div className="absolute top-0 start-4 end-4 h-px rounded-full" style={{ backgroundColor: 'rgba(128,128,128,0.08)' }} />
          <div className="flex items-center justify-between">
            <motion.div
              className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: c.bg }}
              whileHover={{ scale: 1.15, rotateZ: 10 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <Icon size={22} style={{ color: c.icon }} />
            </motion.div>
            <div style={{ transform: 'translateZ(10px)' }}>
              <Sparkline data={sparkData} color={c.icon} width={80} height={36} />
            </div>
          </div>
          <div className="mt-4 text-[32px] font-bold leading-tight tracking-tight" style={{ color: 'var(--mc-text-primary)', transform: 'translateZ(15px)' }}>{value}</div>
          <div className="mt-1 text-[13px] font-medium" style={{ color: 'var(--mc-text-secondary)' }}>{label}</div>
          <div className="flex items-center gap-1.5 mt-2">
            <TrendIcon size={12} style={{ color: positive ? 'var(--mc-green)' : 'var(--mc-red)' }} />
            <span className="text-xs font-medium" style={{ color: positive ? 'var(--mc-green)' : 'var(--mc-red)' }}>{trend}</span>
          </div>
        </div>
      </motion.div>
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
  const { t } = useLanguage();

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
        <h1 className="text-2xl font-semibold tracking-tight" style={{ color: 'var(--mc-text-primary)' }}>{t('dashboard.welcome')} {user?.name || 'Doctor'}</h1>
        <p className="text-sm mt-1" style={{ color: 'var(--mc-text-secondary)' }}>{t('dashboard.subtitle')}</p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        <Link to="/patients" className="no-underline">
          <StatCard icon={Users} label={t('dashboard.totalPatients')} value={String(stats.totalPatients)} trend={stats.patientChange} positive accent="gold" sparkData={[20,28,24,35,42]} index={0} />
        </Link>
        <Link to="/appointments" className="no-underline">
          <StatCard icon={CalendarCheck} label={t('dashboard.todaysAppointments')} value={String(stats.todayAppointments)} trend={stats.appointmentChange} positive accent="orange" sparkData={[15,18,22,20,24]} index={1} />
        </Link>
        <StatCard icon={Stethoscope} label={t('dashboard.availableDoctors')} value={String(stats.availableDoctors)} trend="-2.1%" positive={false} accent="gold" sparkData={[22,20,21,18,18]} index={2} />
        <Link to="/billing" className="no-underline">
          <StatCard icon={DollarSign} label={t('dashboard.revenueThisMonth')} value={`$${stats.revenueThisMonth.toLocaleString()}`} trend={stats.revenueChange} positive accent="gold" sparkData={[30,35,42,48,55]} index={3} />
        </Link>
      </div>

      <SmartAlerts />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Weekly Bar Chart */}
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.45 }}
          className="lg:col-span-2 rounded-2xl p-6 shadow-mc-card" style={{ backgroundColor: 'var(--mc-surface)' }}>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold" style={{ color: 'var(--mc-text-primary)' }}>{t('dashboard.weeklyAppointments')}</h2>
              <p className="text-xs mt-0.5" style={{ color: 'var(--mc-text-muted)' }}>{t('dashboard.weeklySubtitle')}</p>
            </div>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5 text-xs" style={{ color: 'var(--mc-text-secondary)' }}><span className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--mc-orange)' }} />{t('dashboard.scheduled')}</span>
              <span className="flex items-center gap-1.5 text-xs" style={{ color: 'var(--mc-text-secondary)' }}><span className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--mc-gold)' }} />{t('dashboard.completed')}</span>
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
          <h2 className="text-lg font-semibold mb-1" style={{ color: 'var(--mc-text-primary)' }}>{t('dashboard.weeklySubtitle')}</h2>
          <p className="text-xs mb-4" style={{ color: 'var(--mc-text-muted)' }}>{t('dashboard.weeklySubtitle')}</p>
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
              <p className="text-xs" style={{ color: 'var(--mc-text-muted)' }}>{t('dashboard.totalRevenue')}</p>
              <p className="text-lg font-bold" style={{ color: 'var(--mc-gold)' }}>${stats.totalRevenueAll.toLocaleString()}</p>
            </div>
            <div className="text-end">
              <p className="text-xs font-medium" style={{ color: 'var(--mc-green)' }}>{stats.revenueChange}</p>
              <p className="text-xs" style={{ color: 'var(--mc-text-muted)' }}>{t('app.fromLastMonth')}</p>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Department Pie Chart */}
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.55 }}
          className="rounded-2xl p-6 shadow-mc-card" style={{ backgroundColor: 'var(--mc-surface)' }}>
          <h2 className="text-lg font-semibold mb-4" style={{ color: 'var(--mc-text-primary)' }}>{t('dashboard.departmentOverview')}</h2>
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
          <h2 className="text-lg font-semibold mb-4" style={{ color: 'var(--mc-text-primary)' }}>{t('dashboard.recentActivity')}</h2>
          <div className="space-y-1">
            <ActivityItem icon={UserPlus} iconBg="var(--mc-orange-muted)" iconColor="var(--mc-orange)" title={t('dashboard.newPatient')} time={t('dashboard.minAgo').replace('{}', '2')} />
            <ActivityItem icon={CheckCircle2} iconBg="var(--mc-green-bg)" iconColor="var(--mc-green)" title={t('dashboard.appointmentCompleted')} time={t('dashboard.minAgo').replace('{}', '15')} />
            <ActivityItem icon={AlertCircle} iconBg="var(--mc-red-bg)" iconColor="var(--mc-red)" title={t('dashboard.lowStock')} time={t('dashboard.minAgo').replace('{}', '32')} />
            <ActivityItem icon={Activity} iconBg="var(--mc-blue-bg)" iconColor="var(--mc-blue)" title={t('dashboard.scheduleUpdated')} time={t('dashboard.hourAgo').replace('{}', '1')} />
            <ActivityItem icon={Pill} iconBg="var(--mc-gold-muted)" iconColor="var(--mc-gold)" title={t('dashboard.prescriptionFilled')} time={t('dashboard.hoursAgo').replace('{}', '2')} />
            <ActivityItem icon={Clock} iconBg="var(--mc-amber-bg)" iconColor="var(--mc-amber)" title={t('dashboard.appointmentRescheduled')} time={t('dashboard.hoursAgo').replace('{}', '3')} />
          </div>
        </motion.div>

        {/* Upcoming Appointments */}
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.6 }}
          className="rounded-2xl p-6 shadow-mc-card" style={{ backgroundColor: 'var(--mc-surface)' }}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold" style={{ color: 'var(--mc-text-primary)' }}>{t('dashboard.upcomingAppointments')}</h2>
            <Link to="/appointments" className="text-xs font-medium hover:underline" style={{ color: 'var(--mc-orange)' }}>{t('dashboard.viewAll')}</Link>
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
