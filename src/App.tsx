import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useAuth, AuthProvider } from '@/context/AuthContext';
import { ToastProvider } from '@/context/ToastContext';
import { ThemeProvider } from '@/context/ThemeContext';
import { LanguageProvider } from '@/context/LanguageContext';
import { DropdownProvider } from '@/context/DropdownContext';
import AppErrorBoundary from '@/components/ErrorBoundary';
import ConfirmDialog from '@/components/ConfirmDialog';
import KeyboardShortcuts from '@/components/KeyboardShortcuts';
import OfflineIndicator from '@/components/OfflineIndicator';
import SessionTimeout from '@/components/SessionTimeout';
import GlobalSearch from '@/components/GlobalSearch';
import Layout from '@/components/Layout';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import Dashboard from '@/pages/Dashboard';
import Appointments from '@/pages/Appointments';
import Patients from '@/pages/Patients';
import PatientDetail from '@/pages/PatientDetail';
import Pharmacy from '@/pages/Pharmacy';
import Billing from '@/pages/Billing';
import Settings from '@/pages/Settings';
import CalendarPage from '@/pages/Calendar';
import Prescriptions from '@/pages/Prescriptions';
import AuditLogs from '@/pages/AuditLogs';
import LabTests from '@/pages/LabTests';
import Doctors from '@/pages/Doctors';
import NotFound from '@/pages/NotFound';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
}

function PublicRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  return !isAuthenticated ? <>{children}</> : <Navigate to="/" replace />;
}

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -15 },
};

function AnimatedOutlet() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <Routes location={location}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/patients" element={<Patients />} />
          <Route path="/patients/:id" element={<PatientDetail />} />
          <Route path="/prescriptions" element={<Prescriptions />} />
          <Route path="/pharmacy" element={<Pharmacy />} />
          <Route path="/billing" element={<Billing />} />
          <Route path="/lab-tests" element={<LabTests />} />
          <Route path="/doctors" element={<Doctors />} />
          <Route path="/audit-logs" element={<AuditLogs />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

function AppRoutes() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
        <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
          <Route path="/*" element={<AnimatedOutlet />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ConfirmDialog />
      <KeyboardShortcuts />
      <OfflineIndicator />
      <SessionTimeout />
      <GlobalSearch />
    </>
  );
}

export default function App() {
  return (
    <AppErrorBoundary>
      <AuthProvider>
        <LanguageProvider>
          <ThemeProvider>
            <DropdownProvider>
              <ToastProvider>
                <AppRoutes />
              </ToastProvider>
            </DropdownProvider>
          </ThemeProvider>
        </LanguageProvider>
      </AuthProvider>
    </AppErrorBoundary>
  );
}
