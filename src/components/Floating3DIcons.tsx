import { motion } from 'framer-motion';
import { Heart, Activity, Pill, Stethoscope, Dna, Microscope } from 'lucide-react';

const icons = [
  { Icon: Heart, color: '#EF4444', size: 28, x: '10%', y: '15%', delay: 0, duration: 6 },
  { Icon: Activity, color: '#FF6B00', size: 24, x: '85%', y: '10%', delay: 1, duration: 7 },
  { Icon: Pill, color: '#22C55E', size: 22, x: '75%', y: '75%', delay: 2, duration: 5 },
  { Icon: Stethoscope, color: '#D4AF37', size: 26, x: '15%', y: '70%', delay: 1.5, duration: 8 },
  { Icon: Dna, color: '#3B82F6', size: 20, x: '50%', y: '8%', delay: 0.5, duration: 6.5 },
  { Icon: Microscope, color: '#EC4899', size: 24, x: '90%', y: '45%', delay: 2.5, duration: 7.5 },
];

export default function Floating3DIcons() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ perspective: '1000px' }}>
      {icons.map(({ Icon, color, size, x, y, delay, duration }, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{ left: x, top: y }}
          initial={{ opacity: 0, scale: 0, rotateX: 45, rotateY: -30 }}
          animate={{
            opacity: [0, 0.15, 0.1, 0.15, 0.1],
            scale: [0, 1, 1.1, 1, 0.9],
            y: [0, -20, 10, -15, 0],
            rotateX: [45, 0, 15, -10, 5],
            rotateY: [-30, 20, -15, 10, 0],
            rotateZ: [0, 10, -5, 15, 0],
          }}
          transition={{
            duration,
            delay,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
          }}
        >
          <div
            style={{
              width: size * 2.5,
              height: size * 2.5,
              borderRadius: '50%',
              backgroundColor: `${color}15`,
              backdropFilter: 'blur(8px)',
              border: `1px solid ${color}25`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: `0 8px 32px ${color}20, inset 0 0 20px ${color}10`,
              transformStyle: 'preserve-3d',
            }}
          >
            <Icon size={size} style={{ color }} />
          </div>
        </motion.div>
      ))}
    </div>
  );
}
