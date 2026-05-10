import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Hospital, Mail, Lock, LogIn, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import { useLanguage } from '@/context/LanguageContext';

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
    <div className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: 'var(--mc-bg)' }}>
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="w-full max-w-md"
      >
        {/* Card */}
        <div className="rounded-2xl shadow-mc-card overflow-hidden" style={{ backgroundColor: 'var(--mc-surface)' }}>
          {/* Header */}
          <div className="px-8 pt-8 pb-6 text-center">
            <div className="w-16 h-16 rounded-2xl mx-auto flex items-center justify-center mb-4" style={{ backgroundColor: 'var(--mc-orange-muted)' }}>
              <Hospital size={32} style={{ color: 'var(--mc-orange)' }} />
            </div>
            <h1 className="text-2xl font-bold" style={{ color: 'var(--mc-text-primary)' }}>{t('app.name')}</h1>
            <p className="text-sm mt-1" style={{ color: 'var(--mc-text-secondary)' }}>
              {isRTL ? 'تسجيل الدخول إلى حسابك' : 'Sign in to your account'}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="px-8 pb-6 space-y-4">
            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--mc-text-secondary)' }}>Email</label>
              <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-lg border" style={{ backgroundColor: 'var(--mc-bg)', borderColor: 'var(--mc-border)' }}>
                <Mail size={16} style={{ color: 'var(--mc-text-muted)' }} />
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@medicore.com"
                  className="bg-transparent text-sm outline-none w-full" style={{ color: 'var(--mc-text-primary)' }} />
              </div>
            </div>

            <div>
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
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded" />
                <span className="text-xs" style={{ color: 'var(--mc-text-secondary)' }}>{isRTL ? 'تذكرني' : 'Remember me'}</span>
              </label>
              <a href="#" className="text-xs hover:underline" style={{ color: 'var(--mc-orange)' }}>
                {isRTL ? 'نسيت كلمة المرور؟' : 'Forgot password?'}
              </a>
            </div>

            <button type="submit" disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-px active:translate-y-0"
              style={{ backgroundColor: 'var(--mc-orange)', boxShadow: '0 2px 8px rgba(255,107,0,0.3)' }}>
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <><LogIn size={16} /> {isRTL ? 'تسجيل الدخول' : 'Sign In'}</>
              )}
            </button>
          </form>

          {/* Quick Login */}
          <div className="px-8 pb-6">
            <div className="h-px mb-4" style={{ backgroundColor: 'var(--mc-border)' }} />
            <p className="text-xs mb-3 text-center" style={{ color: 'var(--mc-text-muted)' }}>{isRTL ? 'تسجيل دخول سريع' : 'Quick Login'}</p>
            <div className="grid grid-cols-2 gap-2">
              {[
                { email: 'admin@medicore.com', password: 'admin123', label: 'Admin' },
                { email: 'doctor@medicore.com', password: 'doctor123', label: 'Doctor' },
                { email: 'nurse@medicore.com', password: 'nurse123', label: 'Nurse' },
                { email: 'reception@medicore.com', password: 'reception123', label: 'Reception' },
              ].map((u) => (
                <button key={u.email} onClick={() => quickLogin(u.email, u.password)}
                  className="px-3 py-2 rounded-lg border text-xs font-medium transition-colors hover:bg-[var(--mc-surface-elevated)]"
                  style={{ borderColor: 'var(--mc-border)', color: 'var(--mc-text-secondary)' }}>
                  {u.label}
                </button>
              ))}
            </div>
          </div>

          {/* Register link */}
          <div className="px-8 py-4 border-t text-center" style={{ backgroundColor: 'var(--mc-bg)', borderColor: 'var(--mc-border)' }}>
            <span className="text-sm" style={{ color: 'var(--mc-text-secondary)' }}>
              {isRTL ? 'ليس لديك حساب؟' : "Don't have an account?"}{' '}
              <Link to="/register" className="font-semibold hover:underline" style={{ color: 'var(--mc-orange)' }}>
                {isRTL ? 'إنشاء حساب' : 'Sign Up'}
              </Link>
            </span>
          </div>
        </div>

        {/* Credits */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
          className="mt-6 text-center space-y-1">
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
