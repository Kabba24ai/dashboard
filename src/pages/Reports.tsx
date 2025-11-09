import React from 'react';
import { Link } from 'react-router-dom';
import { BarChart3, TrendingUp, Package, Users, FileText, Calendar, DollarSign, ShoppingCart } from 'lucide-react';

const Reports = () => {
  const reports = [
    {
      id: 'sales-report',
      title: 'Sales Report',
      description: 'Comprehensive sales analysis with trends, categories, and product performance',
      icon: DollarSign,
      color: 'blue',
      href: '/reports/sales',
      features: ['Sales Trend Analysis', 'Top 10 Categories', 'Top 10 Products', 'Performance Metrics']
    },
    {
      id: 'inventory-report',
      title: 'Inventory Report',
      description: 'Track inventory levels, stock movements, and availability',
      icon: Package,
      color: 'green',
      href: '/reports/inventory',
      features: ['Stock Levels', 'Low Stock Alerts', 'Movement History', 'Availability Tracking'],
      comingSoon: true
    },
    {
      id: 'customer-report',
      title: 'Customer Report',
      description: 'Customer analytics, rental history, and satisfaction metrics',
      icon: Users,
      color: 'purple',
      href: '/reports/customers',
      features: ['Customer Analytics', 'Rental History', 'Satisfaction Scores', 'Loyalty Metrics'],
      comingSoon: true
    },
    {
      id: 'operations-report',
      title: 'Operations Report',
      description: 'Operational efficiency, maintenance, and task completion analysis',
      icon: BarChart3,
      color: 'orange',
      href: '/reports/operations',
      features: ['Task Completion', 'Maintenance Tracking', 'Efficiency Metrics', 'Resource Utilization'],
      comingSoon: true
    },
    {
      id: 'financial-report',
      title: 'Financial Report',
      description: 'Revenue analysis, profit margins, and financial performance',
      icon: TrendingUp,
      color: 'emerald',
      href: '/reports/financial',
      features: ['Revenue Analysis', 'Profit Margins', 'Cost Breakdown', 'Financial Trends'],
      comingSoon: true
    },
    {
      id: 'rental-report',
      title: 'Rental Report',
      description: 'Rental patterns, duration analysis, and booking trends',
      icon: Calendar,
      color: 'indigo',
      href: '/reports/rentals',
      features: ['Rental Patterns', 'Duration Analysis', 'Booking Trends', 'Seasonal Insights'],
      comingSoon: true
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: {
        bg: 'bg-blue-50',
        border: 'border-blue-200',
        icon: 'bg-blue-100 text-blue-600',
        title: 'text-blue-900',
        button: 'bg-blue-600 hover:bg-blue-700 text-white',
        comingSoon: 'bg-blue-100 text-blue-800'
      },
      green: {
        bg: 'bg-green-50',
        border: 'border-green-200',
        icon: 'bg-green-100 text-green-600',
        title: 'text-green-900',
        button: 'bg-green-600 hover:bg-green-700 text-white',
        comingSoon: 'bg-green-100 text-green-800'
      },
      purple: {
        bg: 'bg-purple-50',
        border: 'border-purple-200',
        icon: 'bg-purple-100 text-purple-600',
        title: 'text-purple-900',
        button: 'bg-purple-600 hover:bg-purple-700 text-white',
        comingSoon: 'bg-purple-100 text-purple-800'
      },
      orange: {
        bg: 'bg-orange-50',
        border: 'border-orange-200',
        icon: 'bg-orange-100 text-orange-600',
        title: 'text-orange-900',
        button: 'bg-orange-600 hover:bg-orange-700 text-white',
        comingSoon: 'bg-orange-100 text-orange-800'
      },
      emerald: {
        bg: 'bg-emerald-50',
        border: 'border-emerald-200',
        icon: 'bg-emerald-100 text-emerald-600',
        title: 'text-emerald-900',
        button: 'bg-emerald-600 hover:bg-emerald-700 text-white',
        comingSoon: 'bg-emerald-100 text-emerald-800'
      },
      indigo: {
        bg: 'bg-indigo-50',
        border: 'border-indigo-200',
        icon: 'bg-indigo-100 text-indigo-600',
        title: 'text-indigo-900',
        button: 'bg-indigo-600 hover:bg-indigo-700 text-white',
        comingSoon: 'bg-indigo-100 text-indigo-800'
      }
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Reports</h1>
          <p className="text-gray-600">Comprehensive analytics and reporting for your business</p>
        </div>

        {/* Reports Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reports.map((report) => {
            const Icon = report.icon;
            const colors = getColorClasses(report.color);
            
            return (
              <div
                key={report.id}
                className={`${colors.bg} ${colors.border} border rounded-xl p-6 hover:shadow-lg transition-all duration-300 relative`}
              >
                {/* Coming Soon Badge */}
                {report.comingSoon && (
                  <div className="absolute top-4 right-4">
                    <span className={`${colors.comingSoon} px-2 py-1 rounded-full text-xs font-medium`}>
                      Coming Soon
                    </span>
                  </div>
                )}

                {/* Icon */}
                <div className={`${colors.icon} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
                  <Icon className="w-6 h-6" />
                </div>

                {/* Title and Description */}
                <h3 className={`${colors.title} text-xl font-semibold mb-2`}>
                  {report.title}
                </h3>
                <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                  {report.description}
                </p>

                {/* Features */}
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Features:</h4>
                  <ul className="space-y-1">
                    {report.features.map((feature, index) => (
                      <li key={index} className="text-sm text-gray-600 flex items-center">
                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Action Button */}
                <div className="mt-auto">
                  {report.comingSoon ? (
                    <button
                      disabled
                      className="w-full bg-gray-300 text-gray-500 px-4 py-2 rounded-lg text-sm font-medium cursor-not-allowed"
                    >
                      Coming Soon
                    </button>
                  ) : (
                    <Link
                      to={report.href}
                      className={`${colors.button} w-full inline-flex items-center justify-center px-4 py-2 rounded-lg text-sm font-medium transition-colors`}
                    >
                      <FileText className="w-4 h-4 mr-2" />
                      View Report
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Stats */}
        <div className="mt-12 bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Quick Stats</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600 mb-1">6</div>
              <div className="text-sm text-gray-600">Total Reports</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600 mb-1">1</div>
              <div className="text-sm text-gray-600">Available Now</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600 mb-1">5</div>
              <div className="text-sm text-gray-600">Coming Soon</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600 mb-1">24/7</div>
              <div className="text-sm text-gray-600">Data Updates</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;