import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Hospital, Mail, Lock, UserPlus, User, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import { useLanguage } from '@/context/LanguageContext';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState<'admin' | 'doctor' | 'nurse' | 'receptionist'>('doctor');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();
  const { success, error } = useToast();
  const { isRTL } = useLanguage();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) {
      error(isRTL ? 'يرجى ملء جميع الحقول' : 'Please fill in all fields');
      return;
    }
    if (password !== confirmPassword) {
      error(isRTL ? 'كلمتا المرور غير متطابقتين' : 'Passwords do not match');
      return;
    }
    setIsLoading(true);
    await register(name, email, password, role);
    setIsLoading(false);
    success(isRTL ? 'تم إنشاء الحساب بنجاح!' : 'Account created successfully!');
    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: 'var(--mc-bg)' }}>
      <motion.div initial={{ opacity: 0, y: 30, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }} className="w-full max-w-md">
        <div className="rounded-2xl shadow-mc-card overflow-hidden" style={{ backgroundColor: 'var(--mc-surface)' }}>
          <div className="px-8 pt-8 pb-6 text-center">
            <div className="w-16 h-16 rounded-2xl mx-auto flex items-center justify-center mb-4" style={{ backgroundColor: 'var(--mc-gold-muted)' }}>
              <Hospital size={32} style={{ color: 'var(--mc-gold)' }} />
            </div>
            <h1 className="text-2xl font-bold" style={{ color: 'var(--mc-text-primary)' }}>
              {isRTL ? 'إنشاء حساب جديد' : 'Create Account'}
            </h1>
            <p className="text-sm mt-1" style={{ color: 'var(--mc-text-secondary)' }}>
              {isRTL ? 'سجّل للوصول إلى النظام' : 'Register to access the system'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="px-8 pb-6 space-y-4">
            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--mc-text-secondary)' }}>
                {isRTL ? 'الاسم الكامل' : 'Full Name'}
              </label>
              <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-lg border" style={{ backgroundColor: 'var(--mc-bg)', borderColor: 'var(--mc-border)' }}>
                <User size={16} style={{ color: 'var(--mc-text-muted)' }} />
                <input type="text" value={name} onChange={(e) => setName(e.target.value)}
                  placeholder={isRTL ? 'الدكتور أحمد' : 'Dr. Ahmed'}
                  className="bg-transparent text-sm outline-none w-full" style={{ color: 'var(--mc-text-primary)' }} />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--mc-text-secondary)' }}>Email</label>
              <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-lg border" style={{ backgroundColor: 'var(--mc-bg)', borderColor: 'var(--mc-border)' }}>
                <Mail size={16} style={{ color: 'var(--mc-text-muted)' }} />
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                  placeholder="doctor@medicore.com"
                  className="bg-transparent text-sm outline-none w-full" style={{ color: 'var(--mc-text-primary)' }} />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--mc-text-secondary)' }}>
                {isRTL ? 'كلمة المرور' : 'Password'}
              </label>
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

            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--mc-text-secondary)' }}>
                {isRTL ? 'تأكيد كلمة المرور' : 'Confirm Password'}
              </label>
              <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-lg border" style={{ backgroundColor: 'var(--mc-bg)', borderColor: 'var(--mc-border)' }}>
                <Lock size={16} style={{ color: 'var(--mc-text-muted)' }} />
                <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="bg-transparent text-sm outline-none w-full" style={{ color: 'var(--mc-text-primary)' }} />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--mc-text-secondary)' }}>
                {isRTL ? 'الدور' : 'Role'}
              </label>
              <select value={role} onChange={(e) => setRole(e.target.value as any)}
                className="w-full px-4 py-2.5 rounded-lg border text-sm outline-none"
                style={{ backgroundColor: 'var(--mc-bg)', borderColor: 'var(--mc-border)', color: 'var(--mc-text-primary)' }}>
                <option value="admin">{isRTL ? 'مدير' : 'Administrator'}</option>
                <option value="doctor">{isRTL ? 'طبيب' : 'Doctor'}</option>
                <option value="nurse">{isRTL ? 'ممرض' : 'Nurse'}</option>
                <option value="receptionist">{isRTL ? 'موظف استقبال' : 'Receptionist'}</option>
              </select>
            </div>

            <button type="submit" disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-px active:translate-y-0"
              style={{ backgroundColor: 'var(--mc-gold)', boxShadow: '0 2px 8px rgba(212,175,55,0.3)' }}>
              {isLoading ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                : <><UserPlus size={16} /> {isRTL ? 'إنشاء حساب' : 'Sign Up'}</>}
            </button>
          </form>

          <div className="px-8 py-4 border-t text-center" style={{ backgroundColor: 'var(--mc-bg)', borderColor: 'var(--mc-border)' }}>
            <span className="text-sm" style={{ color: 'var(--mc-text-secondary)' }}>
              {isRTL ? 'لديك حساب بالفعل؟' : 'Already have an account?'}{' '}
              <Link to="/login" className="font-semibold hover:underline" style={{ color: 'var(--mc-gold)' }}>
                {isRTL ? 'تسجيل الدخول' : 'Sign In'}
              </Link>
            </span>
          </div>
        </div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="mt-6 text-center">
          <p className="text-xs" style={{ color: 'var(--mc-text-muted)' }}>
            Made with <span style={{ color: 'var(--mc-red)' }}>♥</span> by <span style={{ color: 'var(--mc-gold)' }}>Hassan El-Deghidy</span> — Powered by <span style={{ color: 'var(--mc-orange)' }}>Nurovia</span>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
