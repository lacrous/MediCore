import db from './db';

const USE_LOCAL_API = false; // Set to true if you start JSON Server locally
const API_URL = 'http://localhost:3001';

// In-memory data (deep clone from db.json)
let memoryDB = JSON.parse(JSON.stringify(db));

function delay(ms: number) {
  return new Promise<void>(resolve => setTimeout(resolve, ms));
}

async function fetcher<T>(path: string, options?: RequestInit): Promise<T> {
  if (USE_LOCAL_API) {
    const res = await fetch(`${API_URL}${path}`, {
      headers: { 'Content-Type': 'application/json' },
      ...options,
    });
    if (!res.ok) throw new Error(`API error: ${res.status}`);
    return res.json();
  }
  // In-memory mode - simulate API
  await delay(300 + Math.random() * 400);
  const method = options?.method || 'GET';
  const table = path.split('/')[1].split('?')[0];
  const id = path.split('/')[2]?.split('?')[0];
  const data = options?.body ? JSON.parse(options.body as string) : null;

  // Parse query params
  const queryStr = path.split('?')[1];
  const query: Record<string, string> = {};
  if (queryStr) {
    queryStr.split('&').forEach(p => {
      const [k, v] = p.split('=');
      if (k && v) query[k] = decodeURIComponent(v);
    });
  }

  const collection: any[] = (memoryDB as any)[table] || [];

  if (method === 'GET') {
    if (id) {
      const item = collection.find((c: any) => c.id === id);
      if (!item) throw new Error('Not found');
      return item as T;
    }
    // Filter by query params
    let result = [...collection];
    Object.entries(query).forEach(([k, v]) => {
      if (k !== '_page' && k !== '_limit' && k !== '_sort') {
        result = result.filter((r: any) => String(r[k]) === v);
      }
    });
    return result as T;
  }

  if (method === 'POST' && data) {
    const newItem = { ...data, id: data.id || `${table.slice(0, 3).toUpperCase()}-${Date.now()}` };
    collection.push(newItem);
    return newItem as T;
  }

  if ((method === 'PUT' || method === 'PATCH') && id && data) {
    const idx = collection.findIndex((c: any) => c.id === id);
    if (idx === -1) throw new Error('Not found');
    collection[idx] = method === 'PUT' ? data : { ...collection[idx], ...data };
    return collection[idx] as T;
  }

  if (method === 'DELETE' && id) {
    const idx = collection.findIndex((c: any) => c.id === id);
    if (idx > -1) collection.splice(idx, 1);
    return undefined as T;
  }

  return collection as T;
}

// ===== API EXPORTS =====

export const patientsApi = {
  list: () => fetcher<any[]>('/patients'),
  get: (id: string) => fetcher<any>(`/patients/${id}`),
  create: (data: any) => fetcher<any>('/patients', { method: 'POST', body: JSON.stringify(data) }),
  update: (id: string, data: any) => fetcher<any>(`/patients/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id: string) => fetcher<void>(`/patients/${id}`, { method: 'DELETE' }),
};

export const appointmentsApi = {
  list: () => fetcher<any[]>('/appointments'),
  get: (id: string) => fetcher<any>(`/appointments/${id}`),
  create: (data: any) => fetcher<any>('/appointments', { method: 'POST', body: JSON.stringify(data) }),
  update: (id: string, data: any) => fetcher<any>(`/appointments/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id: string) => fetcher<void>(`/appointments/${id}`, { method: 'DELETE' }),
};

export const medicationsApi = {
  list: () => fetcher<any[]>('/medications'),
  get: (id: string) => fetcher<any>(`/medications/${id}`),
  updateStock: (id: string, stock: number) => fetcher<any>(`/medications/${id}`, { method: 'PATCH', body: JSON.stringify({ stock }) }),
};

export const invoicesApi = {
  list: () => fetcher<any[]>('/invoices'),
  get: (id: string) => fetcher<any>(`/invoices/${id}`),
  update: (id: string, data: any) => fetcher<any>(`/invoices/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
};

export const departmentsApi = {
  list: () => fetcher<any[]>('/departments'),
};

export const vitalsApi = {
  list: () => fetcher<any[]>('/vitals'),
  getByPatient: (patientId: string) => fetcher<any[]>(`/vitals?patientId=${patientId}`),
};

export const historyApi = {
  list: () => fetcher<any[]>('/medicalHistory'),
  getByPatient: (patientId: string) => fetcher<any[]>(`/medicalHistory?patientId=${patientId}`),
};

export const prescriptionsApi = {
  list: () => fetcher<any[]>('/prescriptions'),
  getByPatient: (patientId: string) => fetcher<any[]>(`/prescriptions?patientId=${patientId}`),
  create: (data: any) => fetcher<any>('/prescriptions', { method: 'POST', body: JSON.stringify(data) }),
};

export const logsApi = {
  list: () => fetcher<any[]>('/activityLogs'),
};

export const notificationsApi = {
  list: () => fetcher<any[]>('/notifications'),
  markRead: (id: string) => fetcher<any>(`/notifications/${id}`, { method: 'PUT', body: JSON.stringify({ read: true }) }),
};

export const dashboardApi = {
  stats: async () => {
    const [patients, appointments, medications, invoices, departments] = await Promise.all([
      fetcher<any[]>('/patients'),
      fetcher<any[]>('/appointments'),
      fetcher<any[]>('/medications'),
      fetcher<any[]>('/invoices'),
      fetcher<any[]>('/departments'),
    ]);

    const todayStr = '2026-01-15';
    const todayApts = appointments.filter(a => a.date === todayStr);
    const paidInvoices = invoices.filter(i => i.status === 'Paid');
    const totalRevenue = paidInvoices.reduce((s, i) => s + i.amount, 0);

    return {
      totalPatients: patients.length,
      todayAppointments: todayApts.length,
      availableDoctors: 6,
      revenueThisMonth: totalRevenue,
      revenueChange: '+18.3%',
      patientChange: '+12.5%',
      appointmentChange: '+8.2%',
      totalRevenueAll: invoices.reduce((s, i) => s + i.amount, 0),
      outstanding: invoices.filter(i => i.status !== 'Paid').reduce((s, i) => s + i.amount, 0),
      paidCount: paidInvoices.length,
      collectionRate: '87%',
      lowStockCount: medications.filter(m => m.status === 'Low Stock').length,
      outOfStockCount: medications.filter(m => m.status === 'Out of Stock').length,
      totalUnits: medications.reduce((s, m) => s + m.stock, 0),
      criticalCount: patients.filter(p => p.status === 'Critical').length,
      departments,
      weeklyData: [
        { day: 'Mon', scheduled: 18, completed: 16 },
        { day: 'Tue', scheduled: 22, completed: 20 },
        { day: 'Wed', scheduled: 20, completed: 19 },
        { day: 'Thu', scheduled: 24, completed: 22 },
        { day: 'Fri', scheduled: 16, completed: 15 },
        { day: 'Sat', scheduled: 8, completed: 8 },
        { day: 'Sun', scheduled: 6, completed: 6 },
      ],
      revenueData: [
        { month: 'Jul', value: 32000 },
        { month: 'Aug', value: 35000 },
        { month: 'Sep', value: 38000 },
        { month: 'Oct', value: 41000 },
        { month: 'Nov', value: 44000 },
        { month: 'Dec', value: 48250 },
      ],
    };
  },
};
