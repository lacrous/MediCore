import { useRef, useState, type ReactNode } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface Props {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  tiltAmount?: number;
  glowColor?: string;
}

export default function TiltCard3D({ children, className = '', style = {}, tiltAmount = 12, glowColor = 'rgba(212,175,55,0.15)' }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  const springConfig = { damping: 20, stiffness: 200 };
  const rotateX = useSpring(useTransform(y, [0, 1], [tiltAmount, -tiltAmount]), springConfig);
  const rotateY = useSpring(useTransform(x, [0, 1], [-tiltAmount, tiltAmount]), springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    x.set(px);
    y.set(py);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0.5);
    y.set(0.5);
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        ...style,
        perspective: 1000,
        transformStyle: 'preserve-3d',
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
          width: '100%',
          height: '100%',
        }}
      >
        {/* Glow effect */}
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            background: `radial-gradient(circle at ${x.get() * 100}% ${y.get() * 100}%, ${glowColor}, transparent 70%)`,
            opacity: isHovered ? 1 : 0,
            transition: 'opacity 0.3s',
          }}
        />
        {children}
      </motion.div>
    </motion.div>
  );
}
