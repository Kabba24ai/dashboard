# Integration Guide

Complete guide for integrating the TaskMaster Pro Dashboard v2.0 with Reports Section with your existing systems, APIs, and backend services.

## 🔌 API Integration

### 1. Task Data Integration

Replace the placeholder `taskData` object with real API calls:

```typescript
// hooks/useTaskData.ts
import { useState, useEffect } from 'react';

interface TaskData {
  deliveriesTruck: { due: number; completed: number };
  deliveriesStore: { due: number; completed: number };
  returnsTruck: { due: number; completed: number };
  returnsStore: { due: number; completed: number };
  maintenanceHold: { due: number; completed: number };
  damaged: { due: number; completed: number };
  tasksOverdue: { due: number; completed: number };
  tasksDue: { due: number; completed: number };
}

export const useTaskData = () => {
  const [taskData, setTaskData] = useState<TaskData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTaskData = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/tasks/summary`);
        if (!response.ok) throw new Error('Failed to fetch task data');
        const data = await response.json();
        setTaskData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchTaskData();
    
    // Set up real-time updates
    const interval = setInterval(fetchTaskData, 30000); // Update every 30 seconds
    return () => clearInterval(interval);
  }, []);

  return { taskData, loading, error };
};
```

### 2. Sales Data Integration

```typescript
// hooks/useSalesData.ts
interface SalesDataPoint {
  date: string;
  current: number;
  previous: number;
}

interface SalesData {
  [key: string]: SalesDataPoint[];
}

export const useSalesData = (period: string) => {
  const [salesData, setSalesData] = useState<SalesData>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/api/sales/trend?period=${period}`
        );
        const data = await response.json();
        setSalesData(data);
      } catch (error) {
        console.error('Failed to fetch sales data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSalesData();
  }, [period]);

  return { salesData, loading };
};
```

### 3. Maintenance & Damaged Items Data Integration (NEW in v2.0)

```typescript
// hooks/useMaintenanceData.ts
interface MaintenanceDataPoint {
  date: string;
  due: number;
  completed: number;
}

export const useMaintenanceData = () => {
  const [maintenanceData, setMaintenanceData] = useState<MaintenanceDataPoint[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMaintenanceData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/api/maintenance/trend?days=14`
        );
        const data = await response.json();
        setMaintenanceData(data);
      } catch (error) {
        console.error('Failed to fetch maintenance data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMaintenanceData();
  }, []);

  return { maintenanceData, loading };
};

// hooks/useDamagedItemsData.ts
interface DamagedItemsDataPoint {
  date: string;
  due: number;
  completed: number;
}

export const useDamagedItemsData = () => {
  const [damagedData, setDamagedData] = useState<DamagedItemsDataPoint[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDamagedData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/api/damaged-items/trend?days=14`
        );
        const data = await response.json();
        setDamagedData(data);
      } catch (error) {
        console.error('Failed to fetch damaged items data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDamagedData();
  }, []);

  return { damagedData, loading };
};
```

### 4. Category & Product Data Integration

```typescript
// hooks/useCategoryData.ts
interface CategoryData {
  name: string;
  sales: number;
}

export const useCategoryData = (period: string) => {
  const [categoryData, setCategoryData] = useState<CategoryData[]>([]);
  
  useEffect(() => {
    const fetchCategoryData = async () => {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/categories/top?period=${period}&limit=10`
      );
      const data = await response.json();
      setCategoryData(data);
    };

    fetchCategoryData();
  }, [period]);

  return { categoryData };
};

// hooks/useProductData.ts
interface ProductData {
  name: string;
  sales: number;
}

export const useProductData = (period: string) => {
  const [productData, setProductData] = useState<ProductData[]>([]);
  
  useEffect(() => {
    const fetchProductData = async () => {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/products/top?period=${period}&limit=10`
      );
      const data = await response.json();
      setProductData(data);
    };

    fetchProductData();
  }, [period]);

  return { productData };
};
```

## 🔄 Real-time Updates

### WebSocket Integration

```typescript
// hooks/useWebSocket.ts
import { useEffect, useRef } from 'react';

export const useWebSocket = (url: string, onMessage: (data: any) => void) => {
  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    ws.current = new WebSocket(url);
    
    ws.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      onMessage(data);
    };

    ws.current.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    return () => {
      ws.current?.close();
    };
  }, [url, onMessage]);

  const sendMessage = (message: any) => {
    if (ws.current?.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify(message));
    }
  };

  return { sendMessage };
};

// Usage in Dashboard
const Dashboard = () => {
  const [taskData, setTaskData] = useState(initialTaskData);
  const [maintenanceData, setMaintenanceData] = useState(initialMaintenanceData);
  const [damagedData, setDamagedData] = useState(initialDamagedData);

  useWebSocket(
    `${import.meta.env.VITE_WS_URL}/tasks`,
    (data) => setTaskData(data)
  );

  useWebSocket(
    `${import.meta.env.VITE_WS_URL}/maintenance`,
    (data) => setMaintenanceData(data)
  );

  useWebSocket(
    `${import.meta.env.VITE_WS_URL}/damaged-items`,
    (data) => setDamagedData(data)
  );

  // ... rest of component
};
```

### Server-Sent Events (SSE)

```typescript
// hooks/useSSE.ts
export const useSSE = (url: string, onMessage: (data: any) => void) => {
  useEffect(() => {
    const eventSource = new EventSource(url);
    
    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      onMessage(data);
    };

    eventSource.onerror = (error) => {
      console.error('SSE error:', error);
    };

    return () => eventSource.close();
  }, [url, onMessage]);
};
```

## 🧭 Navigation Integration (NEW in v2.0)

### React Router Integration

The v2.0 dashboard now includes React Router for navigation between Dashboard and Reports sections.

```typescript
// App.tsx structure
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Reports from './pages/Reports';
import SalesReport from './pages/SalesReport';

const App = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/reports/sales" element={<SalesReport />} />
          {/* Add more report routes as needed */}
          <Route path="/reports/inventory" element={<InventoryReport />} />
          <Route path="/reports/customers" element={<CustomerReport />} />
          <Route path="/reports/operations" element={<OperationsReport />} />
          <Route path="/reports/financial" element={<FinancialReport />} />
          <Route path="/reports/rentals" element={<RentalReport />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};
```

### Navigation Handler Updates

```typescript
// utils/navigation.ts
import { useNavigate } from 'react-router-dom';

export const useTaskNavigation = () => {
  const navigate = useNavigate();

  const handleTaskClick = (taskType: string) => {
    switch(taskType) {
      case 'deliveries-truck':
        navigate('/deliveries?filter=truck');
        break;
      case 'deliveries-store':
        navigate('/deliveries?filter=store');
        break;
      case 'returns-truck':
        navigate('/returns?filter=truck');
        break;
      case 'returns-store':
        navigate('/returns?filter=store');
        break;
      case 'maintenance':
        navigate('/maintenance');
        break;
      case 'damaged':
        navigate('/damaged-items');
        break;
      case 'overdue':
        navigate('/tasks?status=overdue');
        break;
      case 'due-today':
        navigate('/tasks?due=today');
        break;
      default:
        console.log(`Navigate to ${taskType} section`);
    }
  };

  return { handleTaskClick };
};

// Report navigation
export const useReportNavigation = () => {
  const navigate = useNavigate();

  const navigateToReport = (reportType: string) => {
    navigate(`/reports/${reportType}`);
  };

  const navigateToReports = () => {
    navigate('/reports');
  };

  const navigateToDashboard = () => {
    navigate('/');
  };

  return { navigateToReport, navigateToReports, navigateToDashboard };
};
```

### Layout Component Integration

```typescript
// components/Layout.tsx integration points
const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();

  // Add custom navigation logic
  const handleMenuClick = (path: string) => {
    // Add analytics tracking
    trackNavigation(path);
    
    // Add custom logic before navigation
    if (path === '/reports' && hasUnsavedChanges()) {
      showConfirmDialog();
      return;
    }
    
    // Navigate normally
    navigate(path);
  };

  // ... rest of component
};
```

## 🔐 Authentication Integration

### JWT Token Management

```typescript
// utils/auth.ts
export class AuthService {
  private static TOKEN_KEY = 'auth_token';

  static setToken(token: string) {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  static getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  static removeToken() {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  static isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) return false;
    
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp > Date.now() / 1000;
    } catch {
      return false;
    }
  }
}

// API interceptor
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

apiClient.interceptors.request.use((config) => {
  const token = AuthService.getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

### Protected Routes (v2.0 Compatible)

```typescript
// components/ProtectedRoute.tsx
import { Navigate, useLocation } from 'react-router-dom';
import { AuthService } from '../utils/auth';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const location = useLocation();

  if (!AuthService.isAuthenticated()) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

// Usage in App.tsx
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/*" element={
          <ProtectedRoute>
            <Layout>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/reports" element={<Reports />} />
                <Route path="/reports/sales" element={<SalesReport />} />
              </Routes>
            </Layout>
          </ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  );
};
```

## 📊 Analytics Integration

### Google Analytics 4 (v2.0 Compatible)

```typescript
// utils/analytics.ts
import { gtag } from 'ga-gtag';

export const trackEvent = (eventName: string, parameters?: any) => {
  if (import.meta.env.PROD) {
    gtag('event', eventName, parameters);
  }
};

export const trackPageView = (path: string) => {
  if (import.meta.env.PROD) {
    gtag('config', 'GA_MEASUREMENT_ID', {
      page_path: path
    });
  }
};

// Usage in Layout component
const Layout = ({ children }) => {
  const location = useLocation();

  useEffect(() => {
    trackPageView(location.pathname);
  }, [location]);

  // ... rest of component
};

// Usage in components
const TaskBadge = ({ taskType, ...props }) => {
  const handleClick = () => {
    trackEvent('task_badge_click', {
      task_type: taskType,
      page: 'dashboard',
      timestamp: new Date().toISOString()
    });
    
    handleTaskClick(taskType);
  };

  return (
    <div onClick={handleClick}>
      {/* Badge content */}
    </div>
  );
};

const ReportCard = ({ reportType, ...props }) => {
  const handleClick = () => {
    trackEvent('report_access', {
      report_type: reportType,
      page: 'reports',
      timestamp: new Date().toISOString()
    });
    
    navigateToReport(reportType);
  };

  return (
    <div onClick={handleClick}>
      {/* Report card content */}
    </div>
  );
};
```

### Custom Analytics

```typescript
// utils/customAnalytics.ts
export class AnalyticsService {
  static async trackPageView(page: string, additionalData?: any) {
    await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/analytics/page-view`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        page,
        timestamp: new Date().toISOString(),
        user_agent: navigator.userAgent,
        ...additionalData
      })
    });
  }

  static async trackChartInteraction(chartType: string, action: string, page: string) {
    await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/analytics/interaction`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'chart_interaction',
        chart_type: chartType,
        action,
        page,
        timestamp: new Date().toISOString()
      })
    });
  }

  static async trackNavigation(from: string, to: string) {
    await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/analytics/navigation`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'navigation',
        from,
        to,
        timestamp: new Date().toISOString()
      })
    });
  }
}
```

## 🔄 State Management

### Redux Toolkit Integration (v2.0 Compatible)

```typescript
// Install Redux Toolkit
npm install @reduxjs/toolkit react-redux

// store/dashboardSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchTaskData = createAsyncThunk(
  'dashboard/fetchTaskData',
  async () => {
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/tasks/summary`);
    return response.json();
  }
);

export const fetchMaintenanceData = createAsyncThunk(
  'dashboard/fetchMaintenanceData',
  async () => {
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/maintenance/trend?days=14`);
    return response.json();
  }
);

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState: {
    taskData: null,
    salesData: {},
    maintenanceData: [],
    damagedData: [],
    loading: false,
    error: null
  },
  reducers: {
    updateTaskData: (state, action) => {
      state.taskData = action.payload;
    },
    updateMaintenanceData: (state, action) => {
      state.maintenanceData = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTaskData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTaskData.fulfilled, (state, action) => {
        state.loading = false;
        state.taskData = action.payload;
      })
      .addCase(fetchTaskData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export default dashboardSlice.reducer;

// store/reportsSlice.ts
const reportsSlice = createSlice({
  name: 'reports',
  initialState: {
    salesData: {},
    categoryData: [],
    productData: [],
    currentPeriod: 'rolling30',
    loading: false,
    error: null
  },
  reducers: {
    setPeriod: (state, action) => {
      state.currentPeriod = action.payload;
    },
    updateSalesData: (state, action) => {
      state.salesData = action.payload;
    }
  }
});

export default reportsSlice.reducer;
```

### Zustand (Lightweight Alternative)

```typescript
// Install Zustand
npm install zustand

// store/dashboardStore.ts
import { create } from 'zustand';

interface DashboardState {
  taskData: any;
  salesData: any;
  maintenanceData: any[];
  damagedData: any[];
  loading: boolean;
  fetchTaskData: () => Promise<void>;
  fetchMaintenanceData: () => Promise<void>;
  updateTaskData: (data: any) => void;
}

export const useDashboardStore = create<DashboardState>((set, get) => ({
  taskData: null,
  salesData: {},
  maintenanceData: [],
  damagedData: [],
  loading: false,
  
  fetchTaskData: async () => {
    set({ loading: true });
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/tasks/summary`);
      const data = await response.json();
      set({ taskData: data, loading: false });
    } catch (error) {
      set({ loading: false });
      console.error('Failed to fetch task data:', error);
    }
  },

  fetchMaintenanceData: async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/maintenance/trend?days=14`);
      const data = await response.json();
      set({ maintenanceData: data });
    } catch (error) {
      console.error('Failed to fetch maintenance data:', error);
    }
  },
  
  updateTaskData: (data) => set({ taskData: data })
}));

// store/reportsStore.ts
interface ReportsState {
  salesData: any;
  categoryData: any[];
  productData: any[];
  currentPeriod: string;
  setPeriod: (period: string) => void;
  fetchSalesData: (period: string) => Promise<void>;
}

export const useReportsStore = create<ReportsState>((set, get) => ({
  salesData: {},
  categoryData: [],
  productData: [],
  currentPeriod: 'rolling30',
  
  setPeriod: (period) => set({ currentPeriod: period }),
  
  fetchSalesData: async (period) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/sales/trend?period=${period}`);
      const data = await response.json();
      set({ salesData: { ...get().salesData, [period]: data } });
    } catch (error) {
      console.error('Failed to fetch sales data:', error);
    }
  }
}));
```

## 🔧 Configuration Management

### Environment-Specific Configs

```typescript
// config/index.ts
interface Config {
  apiBaseUrl: string;
  wsUrl: string;
  analyticsKey: string;
  refreshInterval: number;
  environment: 'development' | 'staging' | 'production';
  features: {
    realTimeUpdates: boolean;
    advancedAnalytics: boolean;
    exportFeatures: boolean;
    darkMode: boolean;
  };
}

const config: Config = {
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001',
  wsUrl: import.meta.env.VITE_WS_URL || 'ws://localhost:3001',
  analyticsKey: import.meta.env.VITE_ANALYTICS_KEY || '',
  refreshInterval: parseInt(import.meta.env.VITE_REFRESH_INTERVAL || '30000'),
  environment: (import.meta.env.VITE_ENVIRONMENT as Config['environment']) || 'development',
  features: {
    realTimeUpdates: import.meta.env.VITE_ENABLE_REAL_TIME === 'true',
    advancedAnalytics: import.meta.env.VITE_ENABLE_ANALYTICS === 'true',
    exportFeatures: import.meta.env.VITE_ENABLE_EXPORT === 'true',
    darkMode: import.meta.env.VITE_ENABLE_DARK_MODE === 'true'
  }
};

export default config;
```

### Feature Flags

```typescript
// utils/featureFlags.ts
export const featureFlags = {
  realTimeUpdates: import.meta.env.VITE_ENABLE_REAL_TIME === 'true',
  advancedAnalytics: import.meta.env.VITE_ENABLE_ANALYTICS === 'true',
  exportFeatures: import.meta.env.VITE_ENABLE_EXPORT === 'true',
  darkMode: import.meta.env.VITE_ENABLE_DARK_MODE === 'true',
  maintenanceTracking: import.meta.env.VITE_ENABLE_MAINTENANCE_TRACKING === 'true',
  damagedItemsTracking: import.meta.env.VITE_ENABLE_DAMAGED_TRACKING === 'true',
  reportsSection: import.meta.env.VITE_ENABLE_REPORTS === 'true'
};

// Usage in components
const Dashboard = () => {
  return (
    <div>
      {featureFlags.realTimeUpdates && <RealTimeIndicator />}
      {featureFlags.exportFeatures && <ExportButton />}
      {featureFlags.maintenanceTracking && <MaintenanceChart />}
      {featureFlags.damagedItemsTracking && <DamagedItemsChart />}
      {/* ... rest of component */}
    </div>
  );
};

const Layout = () => {
  const navigation = [
    { name: 'Dashboard', href: '/', icon: Home },
    ...(featureFlags.reportsSection ? [{ name: 'Reports', href: '/reports', icon: FileText }] : [])
  ];

  return (
    // ... layout with conditional navigation
  );
};
```

## 🧪 Testing Integration

### API Mocking for Tests

```typescript
// __mocks__/api.ts
export const mockTaskData = {
  deliveriesTruck: { due: 0, completed: 15 },
  deliveriesStore: { due: 3, completed: 8 },
  // ... rest of mock data
};

export const mockMaintenanceData = [
  { date: 'Mon 1/13', due: 5, completed: 3 },
  { date: 'Tue 1/14', due: 3, completed: 4 },
  // ... rest of mock data
];

export const mockApiResponse = (data: any, delay = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ json: () => Promise.resolve(data) }), delay);
  });
};

// tests/Dashboard.test.tsx
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Dashboard } from '../pages/Dashboard';
import { mockTaskData, mockMaintenanceData, mockApiResponse } from '../__mocks__/api';

// Mock fetch
global.fetch = jest.fn(() => mockApiResponse(mockTaskData));

const DashboardWithRouter = () => (
  <BrowserRouter>
    <Dashboard />
  </BrowserRouter>
);

test('renders dashboard with task data', async () => {
  render(<DashboardWithRouter />);
  
  // Wait for data to load
  await screen.findByText('Dashboard Overview');
  
  // Verify task badges are rendered
  expect(screen.getByText('Deliveries - Truck')).toBeInTheDocument();
  expect(screen.getByText('15')).toBeInTheDocument(); // Completed count
});

test('renders maintenance tracking chart', async () => {
  render(<DashboardWithRouter />);
  
  // Wait for maintenance chart to load
  await screen.findByText('Maintenance Hold - 2 Week Trend');
  
  // Verify chart is rendered
  expect(screen.getByRole('img', { name: /chart/i })).toBeInTheDocument();
});

// tests/Reports.test.tsx
import { Reports } from '../pages/Reports';

test('renders reports overview', () => {
  render(
    <BrowserRouter>
      <Reports />
    </BrowserRouter>
  );
  
  expect(screen.getByText('Reports')).toBeInTheDocument();
  expect(screen.getByText('Sales Report')).toBeInTheDocument();
  expect(screen.getByText('Coming Soon')).toBeInTheDocument();
});
```

## 📱 Mobile App Integration

### React Native Bridge

```typescript
// utils/nativeBridge.ts
export const NativeBridge = {
  navigateToTask: (taskType: string) => {
    if (window.ReactNativeWebView) {
      window.ReactNativeWebView.postMessage(JSON.stringify({
        type: 'NAVIGATE_TO_TASK',
        payload: { taskType }
      }));
    }
  },

  navigateToReport: (reportType: string) => {
    if (window.ReactNativeWebView) {
      window.ReactNativeWebView.postMessage(JSON.stringify({
        type: 'NAVIGATE_TO_REPORT',
        payload: { reportType }
      }));
    }
  },

  showNotification: (message: string) => {
    if (window.ReactNativeWebView) {
      window.ReactNativeWebView.postMessage(JSON.stringify({
        type: 'SHOW_NOTIFICATION',
        payload: { message }
      }));
    }
  },

  shareReport: (reportData: any) => {
    if (window.ReactNativeWebView) {
      window.ReactNativeWebView.postMessage(JSON.stringify({
        type: 'SHARE_REPORT',
        payload: { reportData }
      }));
    }
  }
};
```

## 🔄 Data Export Integration

### Export Functionality

```typescript
// utils/exportUtils.ts
export const exportToCSV = (data: any[], filename: string) => {
  const csvContent = convertToCSV(data);
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};

export const exportToPDF = async (elementId: string, filename: string) => {
  const element = document.getElementById(elementId);
  if (!element) return;

  const canvas = await html2canvas(element);
  const imgData = canvas.toDataURL('image/png');
  
  const pdf = new jsPDF();
  const imgWidth = 210;
  const pageHeight = 295;
  const imgHeight = (canvas.height * imgWidth) / canvas.width;
  let heightLeft = imgHeight;

  let position = 0;

  pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
  heightLeft -= pageHeight;

  while (heightLeft >= 0) {
    position = heightLeft - imgHeight;
    pdf.addPage();
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;
  }

  pdf.save(filename);
};

// Usage in components
const SalesReport = () => {
  const handleExportCSV = () => {
    exportToCSV(salesData, 'sales-report.csv');
  };

  const handleExportPDF = () => {
    exportToPDF('sales-report-container', 'sales-report.pdf');
  };

  return (
    <div id="sales-report-container">
      <div className="flex space-x-2">
        <button onClick={handleExportCSV}>Export CSV</button>
        <button onClick={handleExportPDF}>Export PDF</button>
      </div>
      {/* Report content */}
    </div>
  );
};
```

---

**Ready for Seamless Integration v2.0! 🔌**