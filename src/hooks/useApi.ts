import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  patientsApi, appointmentsApi, medicationsApi, invoicesApi,
  departmentsApi, vitalsApi, historyApi, prescriptionsApi,
  logsApi, notificationsApi, dashboardApi,
} from '@/api';

// Query keys
export const keys = {
  patients: ['patients'],
  patient: (id: string) => ['patients', id],
  appointments: ['appointments'],
  medications: ['medications'],
  invoices: ['invoices'],
  departments: ['departments'],
  vitals: ['vitals'],
  history: ['medicalHistory'],
  prescriptions: ['prescriptions'],
  logs: ['activityLogs'],
  notifications: ['notifications'],
  dashboard: ['dashboard'],
};

// Dashboard
export function useDashboard() {
  return useQuery({ queryKey: keys.dashboard, queryFn: dashboardApi.stats });
}

// Patients
export function usePatients() {
  return useQuery({ queryKey: keys.patients, queryFn: patientsApi.list });
}
export function usePatient(id: string) {
  return useQuery({ queryKey: keys.patient(id), queryFn: () => patientsApi.get(id), enabled: !!id });
}
export function useCreatePatient() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: patientsApi.create, onSuccess: () => qc.invalidateQueries({ queryKey: keys.patients }) });
}
export function useDeletePatient() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: patientsApi.delete, onSuccess: () => qc.invalidateQueries({ queryKey: keys.patients }) });
}

// Appointments
export function useAppointments() {
  return useQuery({ queryKey: keys.appointments, queryFn: appointmentsApi.list });
}
export function useCreateAppointment() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: appointmentsApi.create, onSuccess: () => qc.invalidateQueries({ queryKey: keys.appointments }) });
}
export function useUpdateAppointment() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: ({ id, data }: { id: string; data: any }) => appointmentsApi.update(id, data), onSuccess: () => qc.invalidateQueries({ queryKey: keys.appointments }) });
}

// Medications
export function useMedications() {
  return useQuery({ queryKey: keys.medications, queryFn: medicationsApi.list });
}

// Invoices
export function useInvoices() {
  return useQuery({ queryKey: keys.invoices, queryFn: invoicesApi.list });
}

// Departments
export function useDepartments() {
  return useQuery({ queryKey: keys.departments, queryFn: departmentsApi.list });
}

// Vitals
export function useVitalsByPatient(patientId: string) {
  return useQuery({ queryKey: ['vitals', patientId], queryFn: () => vitalsApi.getByPatient(patientId), enabled: !!patientId });
}

// History
export function useHistoryByPatient(patientId: string) {
  return useQuery({ queryKey: ['medicalHistory', patientId], queryFn: () => historyApi.getByPatient(patientId), enabled: !!patientId });
}

// Prescriptions
export function usePrescriptions() {
  return useQuery({ queryKey: keys.prescriptions, queryFn: prescriptionsApi.list });
}
export function usePrescriptionsByPatient(patientId: string) {
  return useQuery({ queryKey: ['prescriptions', patientId], queryFn: () => prescriptionsApi.getByPatient(patientId), enabled: !!patientId });
}
export function useCreatePrescription() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: prescriptionsApi.create, onSuccess: () => qc.invalidateQueries({ queryKey: keys.prescriptions }) });
}

// Activity Logs
export function useActivityLogs() {
  return useQuery({ queryKey: keys.logs, queryFn: logsApi.list });
}

// Notifications
export function useNotifications() {
  return useQuery({ queryKey: keys.notifications, queryFn: notificationsApi.list });
}
