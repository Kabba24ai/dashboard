# Integration Guide

Complete guide for integrating the TaskMaster Pro Dashboard with your existing systems, APIs, and backend services.

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

### 3. Category & Product Data Integration

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

  useWebSocket(
    `${import.meta.env.VITE_WS_URL}/tasks`,
    (data) => setTaskData(data)
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

## 🧭 Navigation Integration

### React Router Integration

```typescript
// Install React Router
npm install react-router-dom @types/react-router-dom

// App.tsx with routing
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './Dashboard';
import DeliveriesPage from './pages/DeliveriesPage';
import MaintenancePage from './pages/MaintenancePage';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/deliveries" element={<DeliveriesPage />} />
        <Route path="/maintenance" element={<MaintenancePage />} />
        <Route path="/returns" element={<ReturnsPage />} />
        <Route path="/damaged" element={<DamagedItemsPage />} />
      </Routes>
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

### Protected Routes

```typescript
// components/ProtectedRoute.tsx
import { Navigate } from 'react-router-dom';
import { AuthService } from '../utils/auth';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  if (!AuthService.isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};
```

## 📊 Analytics Integration

### Google Analytics 4

```typescript
// utils/analytics.ts
import { gtag } from 'ga-gtag';

export const trackEvent = (eventName: string, parameters?: any) => {
  if (import.meta.env.PROD) {
    gtag('event', eventName, parameters);
  }
};

// Usage in components
const TaskBadge = ({ taskType, ...props }) => {
  const handleClick = () => {
    trackEvent('task_badge_click', {
      task_type: taskType,
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
```

### Custom Analytics

```typescript
// utils/customAnalytics.ts
export class AnalyticsService {
  static async trackDashboardView() {
    await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/analytics/page-view`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        page: 'dashboard',
        timestamp: new Date().toISOString(),
        user_agent: navigator.userAgent
      })
    });
  }

  static async trackChartInteraction(chartType: string, action: string) {
    await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/analytics/interaction`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'chart_interaction',
        chart_type: chartType,
        action,
        timestamp: new Date().toISOString()
      })
    });
  }
}
```

## 🔄 State Management

### Redux Toolkit Integration

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

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState: {
    taskData: null,
    salesData: {},
    loading: false,
    error: null
  },
  reducers: {
    updateTaskData: (state, action) => {
      state.taskData = action.payload;
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
  loading: boolean;
  fetchTaskData: () => Promise<void>;
  updateTaskData: (data: any) => void;
}

export const useDashboardStore = create<DashboardState>((set, get) => ({
  taskData: null,
  salesData: {},
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
  
  updateTaskData: (data) => set({ taskData: data })
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
}

const config: Config = {
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001',
  wsUrl: import.meta.env.VITE_WS_URL || 'ws://localhost:3001',
  analyticsKey: import.meta.env.VITE_ANALYTICS_KEY || '',
  refreshInterval: parseInt(import.meta.env.VITE_REFRESH_INTERVAL || '30000'),
  environment: (import.meta.env.VITE_ENVIRONMENT as Config['environment']) || 'development'
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
  darkMode: import.meta.env.VITE_ENABLE_DARK_MODE === 'true'
};

// Usage in components
const Dashboard = () => {
  return (
    <div>
      {featureFlags.realTimeUpdates && <RealTimeIndicator />}
      {featureFlags.exportFeatures && <ExportButton />}
      {/* ... rest of component */}
    </div>
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

export const mockApiResponse = (data: any, delay = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ json: () => Promise.resolve(data) }), delay);
  });
};

// tests/Dashboard.test.tsx
import { render, screen } from '@testing-library/react';
import { Dashboard } from '../Dashboard';
import { mockTaskData, mockApiResponse } from '../__mocks__/api';

// Mock fetch
global.fetch = jest.fn(() => mockApiResponse(mockTaskData));

test('renders dashboard with task data', async () => {
  render(<Dashboard />);
  
  // Wait for data to load
  await screen.findByText('Dashboard Overview');
  
  // Verify task badges are rendered
  expect(screen.getByText('Deliveries - Truck')).toBeInTheDocument();
  expect(screen.getByText('15')).toBeInTheDocument(); // Completed count
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

  showNotification: (message: string) => {
    if (window.ReactNativeWebView) {
      window.ReactNativeWebView.postMessage(JSON.stringify({
        type: 'SHOW_NOTIFICATION',
        payload: { message }
      }));
    }
  }
};
```

---

**Ready for Seamless Integration! 🔌**