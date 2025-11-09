# TaskMaster Pro - React Dashboard

A comprehensive, production-ready dashboard for rental and sales management systems built with React, TypeScript, Tailwind CSS, and Recharts.

## 🚀 Features

### 📊 **Interactive Analytics Dashboard**
- **Task Management Badges** - Real-time tracking of deliveries, returns, maintenance, and operational tasks
- **Sales Trend Analysis** - Advanced line chart with period comparisons and growth metrics
- **Maintenance Hold Tracking** - 2-week trend analysis with due vs completed comparison
- **Damaged Items Tracking** - 2-week trend analysis for quality monitoring

### 📋 **Comprehensive Reports Section**
- **Sales Report** - Complete sales analysis with trends, categories, and product performance
- **Category Performance** - Top 10 categories with market share analysis
- **Product Analytics** - Top 10 products with performance gap insights
- **Additional Reports** - Inventory, Customer, Operations, Financial, and Rental reports (coming soon)

### 🎨 **Professional UI/UX**
- **Apple-level Design Aesthetics** - Clean, sophisticated visual presentation
- **Responsive Design** - Optimized for all screen sizes (mobile to desktop)
- **Interactive Elements** - Hover states, transitions, and micro-interactions
- **Consistent Color System** - Professional color palette with proper contrast ratios

### 📈 **Advanced Data Visualization**
- **Enhanced Tooltips** - Rich information display with calculations and comparisons
- **Dynamic Metrics Cards** - Real-time calculated KPIs and performance indicators
- **Period Selectors** - Multiple time range options (rolling 30 days, monthly, yearly)
- **Professional Charts** - Gradient fills, proper formatting, and interactive elements

## 🛠 Tech Stack

- **Frontend Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS
- **Charts**: Recharts for data visualization
- **Icons**: Lucide React
- **Routing**: React Router DOM
- **Build Tool**: Vite
- **Development**: Hot Module Replacement (HMR)

## 📁 Project Structure

```
src/
├── components/
│   └── Layout.tsx             # Navigation layout with sidebar
├── pages/
│   ├── Dashboard.tsx          # Main operational dashboard
│   ├── Reports.tsx            # Reports overview page
│   └── SalesReport.tsx        # Detailed sales analysis
├── App.tsx                    # Main app with routing
├── main.tsx                   # Application entry point
├── index.css                  # Global styles and Tailwind imports
└── vite-env.d.ts             # Vite type definitions
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start development server**
   ```bash
   npm run dev
   ```

3. **Build for production**
   ```bash
   npm run build
   ```

4. **Preview production build**
   ```bash
   npm run preview
   ```

## 📊 Dashboard Components

### 1. Task Management Badges
- **Schedule Section**: Deliveries (Truck/Store), Returns (Truck/Store)
- **Operations Section**: Maintenance Hold, Damaged Items, Overdue Tasks, Due Today
- **Interactive Features**: Click handlers for navigation, progress indicators, completion celebrations

### 2. Sales Trend Analysis
- **Metrics Cards**: Total Sales, Previous Period, Growth Rate, Daily Average
- **Interactive Chart**: Line chart with current vs previous period comparison
- **Period Options**: Rolling 30 days, Current/Last Month, Current/Last Year, Year Comparison
- **Enhanced Tooltips**: Detailed breakdowns with trend indicators

### 3. Maintenance Hold Tracking (NEW)
- **2-Week Trend Analysis**: Daily due vs completed tracking
- **Visual Indicators**: Orange theme matching maintenance operations
- **Interactive Tooltips**: Daily breakdown with completion rates

### 4. Damaged Items Tracking (NEW)
- **2-Week Trend Analysis**: Daily due vs completed tracking
- **Visual Indicators**: Red theme matching alert status
- **Interactive Tooltips**: Quality monitoring insights

## 📋 Reports Section

### 1. Sales Report (Active)
- **Sales Trend Analysis**: Comprehensive line chart with multiple period options
- **Top 10 Categories**: Bar chart with market share analysis and metrics
- **Top 10 Products**: Bar chart with performance gap analysis and rankings
- **Enhanced Features**: All charts include rich tooltips, metrics cards, and export options

### 2. Additional Reports (Coming Soon)
- **Inventory Report**: Stock levels, movements, and availability tracking
- **Customer Report**: Analytics, rental history, and satisfaction metrics
- **Operations Report**: Efficiency, maintenance, and task completion analysis
- **Financial Report**: Revenue analysis, profit margins, and performance
- **Rental Report**: Patterns, duration analysis, and booking trends

## 🎨 Design System

### Color Palette
- **Primary**: Blue (#3B82F6) - Main actions and current data
- **Secondary**: Green (#10B981) - Previous period data and success states
- **Accent Colors**: Purple (#8B5CF6), Orange (#F59E0B), Amber (#F59E0B)
- **Status Colors**: Red (#EF4444), Yellow (#EAB308), Emerald (#10B981)

### Typography
- **Font System**: Figtree with proper hierarchy
- **Line Heights**: 150% for body text, 120% for headings
- **Font Weights**: Regular (400), Medium (500), Semibold (600), Bold (700)

### Spacing System
- **8px Grid System**: Consistent spacing throughout the interface
- **Component Padding**: 24px (p-6) for cards, 20px (p-5) for badges
- **Gap Spacing**: 24px (gap-6) for main sections, 16px (gap-4) for metrics

## 🧭 Navigation

### Desktop Navigation
- **Sidebar Layout**: Fixed sidebar with TaskMaster Pro branding
- **Menu Items**: Dashboard, Reports with active state indicators
- **Professional Styling**: Clean, modern design with hover effects

### Mobile Navigation
- **Responsive Header**: Collapsible menu with hamburger toggle
- **Touch-Friendly**: Optimized for mobile interactions
- **Consistent Experience**: Same functionality across all devices

## 🔧 Customization

### Task Navigation Handlers
```typescript
const handleTaskClick = (taskType: string) => {
  switch(taskType) {
    case 'deliveries-truck':
      // Navigate to deliveries screen with truck filter
      break;
    case 'maintenance':
      // Navigate to maintenance screen
      break;
    // ... additional cases
  }
};
```

### Data Integration
Replace placeholder data with your actual data sources:
- `taskData` - Real-time task status from your API
- `salesData` - Sales metrics from your analytics system
- `maintenanceData` - 2-week maintenance tracking data
- `damagedData` - 2-week damaged items tracking data

## 📱 Responsive Breakpoints

- **Mobile**: < 640px (sm)
- **Tablet**: 640px - 1024px (md/lg)
- **Desktop**: > 1024px (xl)
- **Large Desktop**: > 1280px (2xl)

## 🚀 Performance Optimizations

- **Vite**: Fast build tool with HMR
- **Tree Shaking**: Automatic dead code elimination
- **Code Splitting**: Optimized bundle sizes
- **Lazy Loading**: Components loaded on demand

## 🧪 Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Code Quality
- **TypeScript**: Full type safety
- **ESLint**: Code linting and formatting
- **Prettier**: Code formatting (recommended)

## 🎯 Key Features Summary

### Dashboard (Operational Focus)
- ✅ **Task Management**: Schedule and Operations blocks with interactive badges
- ✅ **Sales Trend**: Professional line chart with comprehensive metrics
- ✅ **Maintenance Tracking**: 2-week trend analysis (NEW)
- ✅ **Damaged Items**: 2-week quality monitoring (NEW)

### Reports (Analytical Focus)
- ✅ **Sales Report**: Complete sales analysis with 3 detailed charts
- 🔄 **Additional Reports**: 5 more reports coming soon
- ✅ **Professional Navigation**: Dedicated reports section
- ✅ **Export Ready**: Download and refresh functionality

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For technical support or questions:
- Create GitHub issues for bugs
- Use discussions for feature requests
- Contact development team for urgent issues

---

**Built with ❤️ using React, TypeScript, and Tailwind CSS**