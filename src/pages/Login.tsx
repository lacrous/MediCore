import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Hospital, Mail, Lock, LogIn, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import { useLanguage } from '@/context/LanguageContext';
import Floating3DIcons from '@/components/Floating3DIcons';

function LoginCard3D({ children }: { children: React.ReactNode }) {
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  const rotateX = useSpring(useTransform(y, [0, 1], [8, -8]), { damping: 20, stiffness: 150 });
  const rotateY = useSpring(useTransform(x, [0, 1], [-8, 8]), { damping: 20, stiffness: 150 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width);
    y.set((e.clientY - rect.top) / rect.height);
  };

  const handleMouseLeave = () => {
    x.set(0.5);
    y.set(0.5);
  };

  return (
    <motion.div
      className="w-full max-w-md relative"
      style={{ perspective: 1200 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        className="relative"
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const { success, error } = useToast();
  const { t, isRTL } = useLanguage();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      error(isRTL ? 'يرجى ملء جميع الحقول' : 'Please fill in all fields');
      return;
    }
    setIsLoading(true);
    const result = await login(email, password);
    setIsLoading(false);
    if (result) {
      success(isRTL ? 'تم تسجيل الدخول بنجاح!' : 'Login successful!');
      navigate('/');
    } else {
      error(isRTL ? 'بيانات الاعتماد غير صحيحة' : 'Invalid credentials');
    }
  };

  const quickLogin = (email: string, password: string) => {
    setEmail(email);
    setPassword(password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative" style={{ backgroundColor: 'var(--mc-bg)' }}>
      <Floating3DIcons />

      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.9, rotateX: 15 }}
        animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
        transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="w-full max-w-md relative z-10"
        style={{ perspective: 1200, transformStyle: 'preserve-3d' }}
      >
        <LoginCard3D>
          {/* Card */}
          <div className="rounded-2xl shadow-mc-card overflow-hidden" style={{ backgroundColor: 'var(--mc-surface)', transformStyle: 'preserve-3d' }}>
            {/* Header */}
            <motion.div
              className="px-8 pt-8 pb-6 text-center"
              style={{ transform: 'translateZ(30px)' }}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <motion.div
                className="w-16 h-16 rounded-2xl mx-auto flex items-center justify-center mb-4"
                style={{ backgroundColor: 'var(--mc-orange-muted)', boxShadow: '0 8px 32px rgba(255,107,0,0.2)' }}
                whileHover={{ scale: 1.1, rotateY: 15, rotateX: -10 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <Hospital size={32} style={{ color: 'var(--mc-orange)' }} />
              </motion.div>
              <motion.h1
                className="text-2xl font-bold"
                style={{ color: 'var(--mc-text-primary)' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                {t('app.name')}
              </motion.h1>
              <motion.p
                className="text-sm mt-1"
                style={{ color: 'var(--mc-text-secondary)' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                {isRTL ? 'تسجيل الدخول إلى حسابك' : 'Sign in to your account'}
              </motion.p>
            </motion.div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="px-8 pb-6 space-y-4" style={{ transform: 'translateZ(20px)' }}>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--mc-text-secondary)' }}>Email</label>
                <motion.div
                  className="flex items-center gap-2.5 px-4 py-2.5 rounded-lg border"
                  style={{ backgroundColor: 'var(--mc-bg)', borderColor: 'var(--mc-border)' }}
                  whileFocus={{ scale: 1.02 }}
                  whileHover={{ borderColor: 'var(--mc-orange)', boxShadow: '0 0 0 3px var(--mc-orange-muted)' }}
                  transition={{ duration: 0.2 }}
                >
                  <Mail size={16} style={{ color: 'var(--mc-text-muted)' }} />
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@medicore.com"
                    className="bg-transparent text-sm outline-none w-full" style={{ color: 'var(--mc-text-primary)' }} />
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
              >
                <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--mc-text-secondary)' }}>Password</label>
                <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-lg border" style={{ backgroundColor: 'var(--mc-bg)', borderColor: 'var(--mc-border)' }}>
                  <Lock size={16} style={{ color: 'var(--mc-text-muted)' }} />
                  <input type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="bg-transparent text-sm outline-none w-full" style={{ color: 'var(--mc-text-primary)' }} />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ color: 'var(--mc-text-muted)' }}>
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </motion.div>

              <motion.div
                className="flex items-center justify-between"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 rounded" />
                  <span className="text-xs" style={{ color: 'var(--mc-text-secondary)' }}>{isRTL ? 'تذكرني' : 'Remember me'}</span>
                </label>
                <a href="#" className="text-xs hover:underline" style={{ color: 'var(--mc-orange)' }}>
                  {isRTL ? 'نسيت كلمة المرور؟' : 'Forgot password?'}
                </a>
              </motion.div>

              <motion.button
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold text-white transition-all duration-200"
                style={{ backgroundColor: 'var(--mc-orange)', boxShadow: '0 4px 16px rgba(255,107,0,0.35)' }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                whileHover={{ scale: 1.03, y: -2, boxShadow: '0 8px 24px rgba(255,107,0,0.45)' }}
                whileTap={{ scale: 0.97, y: 0 }}
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <><LogIn size={16} /> {isRTL ? 'تسجيل الدخول' : 'Sign In'}</>
                )}
              </motion.button>
            </form>

            {/* Quick Login */}
            <motion.div
              className="px-8 pb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
            >
              <div className="h-px mb-4" style={{ backgroundColor: 'var(--mc-border)' }} />
              <p className="text-xs mb-3 text-center" style={{ color: 'var(--mc-text-muted)' }}>{isRTL ? 'تسجيل دخول سريع' : 'Quick Login'}</p>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { email: 'admin@medicore.com', password: 'admin123', label: 'Admin' },
                  { email: 'doctor@medicore.com', password: 'doctor123', label: 'Doctor' },
                  { email: 'nurse@medicore.com', password: 'nurse123', label: 'Nurse' },
                  { email: 'reception@medicore.com', password: 'reception123', label: 'Reception' },
                ].map((u, i) => (
                  <motion.button
                    key={u.email}
                    onClick={() => quickLogin(u.email, u.password)}
                    className="px-3 py-2 rounded-lg border text-xs font-medium transition-colors"
                    style={{ borderColor: 'var(--mc-border)', color: 'var(--mc-text-secondary)' }}
                    whileHover={{ scale: 1.05, y: -2, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 + i * 0.1 }}
                  >
                    {u.label}
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Register link */}
            <motion.div
              className="px-8 py-4 border-t text-center"
              style={{ backgroundColor: 'var(--mc-bg)', borderColor: 'var(--mc-border)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <span className="text-sm" style={{ color: 'var(--mc-text-secondary)' }}>
                {isRTL ? 'ليس لديك حساب؟' : "Don't have an account?"}{' '}
                <Link to="/register" className="font-semibold hover:underline" style={{ color: 'var(--mc-orange)' }}>
                  {isRTL ? 'إنشاء حساب' : 'Sign Up'}
                </Link>
              </span>
            </motion.div>
          </div>
        </LoginCard3D>

        {/* Credits */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          className="mt-6 text-center space-y-1"
        >
          <p className="text-xs" style={{ color: 'var(--mc-text-muted)' }}>
            Made with <span style={{ color: 'var(--mc-red)' }}>♥</span> by <span style={{ color: 'var(--mc-gold)' }}>Hassan El-Deghidy</span>
          </p>
          <p className="text-xs" style={{ color: 'var(--mc-text-muted)' }}>
            Powered by <span style={{ color: 'var(--mc-orange)' }}>Nurovia</span>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
