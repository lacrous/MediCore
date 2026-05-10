import { motion } from 'framer-motion';
import { CalendarCheck, Pill, FlaskConical, Stethoscope, CreditCard, Syringe, AlertCircle, HeartPulse } from 'lucide-react';

interface TimelineEvent {
  id: string;
  type: string;
  title: string;
  description: string;
  date: string;
  doctor: string;
  status?: string;
}

const eventIcons: Record<string, { icon: React.ElementType; color: string; bg: string }> = {
  appointment: { icon: CalendarCheck, color: 'var(--mc-orange)', bg: 'var(--mc-orange-muted)' },
  prescription: { icon: Pill, color: 'var(--mc-green)', bg: 'var(--mc-green-bg)' },
  lab: { icon: FlaskConical, color: 'var(--mc-blue)', bg: 'var(--mc-blue-bg)' },
  diagnosis: { icon: Stethoscope, color: 'var(--mc-gold)', bg: 'var(--mc-gold-muted)' },
  invoice: { icon: CreditCard, color: 'var(--mc-purple)', bg: 'var(--mc-purple-bg)' },
  vaccination: { icon: Syringe, color: 'var(--mc-cyan)', bg: 'var(--mc-cyan-bg)' },
  surgery: { icon: AlertCircle, color: 'var(--mc-red)', bg: 'var(--mc-red-bg)' },
  vitals: { icon: HeartPulse, color: 'var(--mc-pink)', bg: 'var(--mc-pink-bg)' },
};

interface Props {
  events: TimelineEvent[];
}

export default function PatientTimeline({ events }: Props) {
  return (
    <div className="relative">
      <div className="absolute top-0 bottom-0 left-[19px] w-px" style={{ backgroundColor: 'var(--mc-border)' }} />
      <div className="space-y-0">
        {events.map((event, i) => {
          const style = eventIcons[event.type] || eventIcons.diagnosis;
          const Icon = style.icon;
          return (
            <motion.div key={event.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
              className="flex items-start gap-4 py-4 group cursor-pointer transition-colors hover:bg-black/[0.02] px-2 -mx-2 rounded-xl">
              <div className="relative z-10 w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: style.bg }}>
                <Icon size={16} style={{ color: style.color }} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium" style={{ color: 'var(--mc-text-primary)' }}>{event.title}</p>
                  <span className="text-[11px] flex-shrink-0" style={{ color: 'var(--mc-text-muted)' }}>{event.date}</span>
                </div>
                <p className="text-xs mt-0.5" style={{ color: 'var(--mc-text-secondary)' }}>{event.description}</p>
                <div className="flex items-center gap-2 mt-1.5">
                  <span className="text-[11px]" style={{ color: 'var(--mc-text-muted)' }}>{event.doctor}</span>
                  {event.status && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded-full font-medium" style={{ backgroundColor: style.bg, color: style.color }}>
                      {event.status}
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
