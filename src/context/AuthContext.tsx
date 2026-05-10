import { createContext, useContext, useState, useCallback } from 'react';

export type UserRole = 'admin' | 'doctor' | 'nurse' | 'receptionist';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  specialization?: string;
}

interface AuthContextValue {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string, role: UserRole) => Promise<boolean>;
  logout: () => void;
  hasRole: (roles: UserRole[]) => boolean;
}

const AuthContext = createContext<AuthContextValue | null>(null);

// Demo users
const DEMO_USERS: Record<string, { password: string; user: User }> = {
  'admin@medicore.com': {
    password: 'admin123',
    user: { id: '1', name: 'Dr. Omar Abu Al-Makarem', email: 'admin@medicore.com', role: 'admin', specialization: 'Gastroenterologist and Diabetologist' }
  },
  'doctor@medicore.com': {
    password: 'doctor123',
    user: { id: '2', name: 'Dr. Michael Chen', email: 'doctor@medicore.com', role: 'doctor' },
  },
  'nurse@medicore.com': {
    password: 'nurse123',
    user: { id: '3', name: 'Nurse Emma Wilson', email: 'nurse@medicore.com', role: 'nurse' },
  },
  'reception@medicore.com': {
    password: 'reception123',
    user: { id: '4', name: 'James Rodriguez', email: 'reception@medicore.com', role: 'receptionist' },
  },
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('medicore-user');
    return saved ? JSON.parse(saved) : null;
  });

  const isAuthenticated = !!user;

  const login = useCallback(async (email: string, password: string): Promise<boolean> => {
    const demoUser = DEMO_USERS[email.toLowerCase()];
    if (demoUser && demoUser.password === password) {
      setUser(demoUser.user);
      localStorage.setItem('medicore-user', JSON.stringify(demoUser.user));
      return true;
    }
    // Also accept any email/password for demo purposes
    if (email && password) {
      const newUser: User = { id: Date.now().toString(), name: email.split('@')[0], email, role: 'admin' };
      setUser(newUser);
      localStorage.setItem('medicore-user', JSON.stringify(newUser));
      return true;
    }
    return false;
  }, []);

  const register = useCallback(async (name: string, email: string, _password: string, role: UserRole): Promise<boolean> => {
    const newUser: User = { id: Date.now().toString(), name, email, role };
    setUser(newUser);
    localStorage.setItem('medicore-user', JSON.stringify(newUser));
    return true;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('medicore-user');
  }, []);

  const hasRole = useCallback((roles: UserRole[]) => {
    if (!user) return false;
    return roles.includes(user.role);
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, register, logout, hasRole }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
