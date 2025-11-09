import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown, Download, RefreshCw, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const SalesReport = () => {
  const [salesPeriod, setSalesPeriod] = useState('rolling30');
  const [categoryPeriod, setCategoryPeriod] = useState('rolling30');
  const [productPeriod, setProductPeriod] = useState('rolling30');

  // Sales data for line chart
  const salesData = {
    rolling30: [
      { date: '6/1', current: 8500, previous: 7200 },
      { date: '6/2', current: 12500, previous: 9800 },
      { date: '6/3', current: 15200, previous: 11200 },
      { date: '6/4', current: 9800, previous: 8500 },
      { date: '6/5', current: 18500, previous: 14200 },
      { date: '6/6', current: 22000, previous: 18500 },
      { date: '6/7', current: 25500, previous: 21000 },
      { date: '6/8', current: 19200, previous: 16800 },
      { date: '6/9', current: 13500, previous: 12100 },
      { date: '6/10', current: 16800, previous: 14500 },
      { date: '6/11', current: 14200, previous: 13200 },
      { date: '6/12', current: 19500, previous: 17200 },
      { date: '6/13', current: 28000, previous: 24500 },
      { date: '6/14', current: 31500, previous: 27800 },
      { date: '6/15', current: 29200, previous: 25200 },
      { date: '6/16', current: 17500, previous: 15800 },
      { date: '6/17', current: 12800, previous: 11500 },
      { date: '6/18', current: 15200, previous: 13800 },
      { date: '6/19', current: 18500, previous: 16200 },
      { date: '6/20', current: 22800, previous: 19500 },
      { date: '6/21', current: 26500, previous: 23200 },
      { date: '6/22', current: 24200, previous: 21800 },
      { date: '6/23', current: 16800, previous: 14500 },
      { date: '6/24', current: 13500, previous: 12200 },
      { date: '6/25', current: 17200, previous: 15500 },
      { date: '6/26', current: 20500, previous: 18200 },
      { date: '6/27', current: 35000, previous: 31500 },
      { date: '6/28', current: 38500, previous: 34200 },
      { date: '6/29', current: 32500, previous: 28800 },
      { date: '6/30', current: 21500, previous: 19200 }
    ],
    currentMonth: [
      { date: 'Week 1', current: 45000, previous: 42000 },
      { date: 'Week 2', current: 52000, previous: 48000 },
      { date: 'Week 3', current: 48000, previous: 51000 },
      { date: 'Week 4', current: 55000, previous: 47000 }
    ],
    lastMonth: [
      { date: 'Week 1', current: 42000, previous: 38000 },
      { date: 'Week 2', current: 48000, previous: 44000 },
      { date: 'Week 3', current: 51000, previous: 46000 },
      { date: 'Week 4', current: 47000, previous: 43000 }
    ],
    currentYear: [
      { date: 'Jan', current: 180000, previous: 165000 },
      { date: 'Feb', current: 195000, previous: 172000 },
      { date: 'Mar', current: 210000, previous: 188000 },
      { date: 'Apr', current: 225000, previous: 195000 },
      { date: 'May', current: 240000, previous: 208000 },
      { date: 'Jun', current: 255000, previous: 220000 }
    ],
    lastYear: [
      { date: 'Jan', current: 165000, previous: 150000 },
      { date: 'Feb', current: 172000, previous: 158000 },
      { date: 'Mar', current: 188000, previous: 175000 },
      { date: 'Apr', current: 195000, previous: 182000 },
      { date: 'May', current: 208000, previous: 195000 },
      { date: 'Jun', current: 220000, previous: 205000 }
    ],
    yearComparison: [
      { date: 'Jan', current: 180000, previous: 165000 },
      { date: 'Feb', current: 195000, previous: 172000 },
      { date: 'Mar', current: 210000, previous: 188000 },
      { date: 'Apr', current: 225000, previous: 195000 },
      { date: 'May', current: 240000, previous: 208000 },
      { date: 'Jun', current: 255000, previous: 220000 }
    ]
  };

  // Category data
  const categoryData = {
    rolling30: [
      { name: 'Party Supplies', sales: 85000 },
      { name: 'Wedding Decor', sales: 72000 },
      { name: 'Corporate Events', sales: 68000 },
      { name: 'Tables & Chairs', sales: 55000 },
      { name: 'Audio/Visual', sales: 48000 },
      { name: 'Linens', sales: 42000 },
      { name: 'Lighting', sales: 38000 },
      { name: 'Tents', sales: 35000 },
      { name: 'Catering Equipment', sales: 32000 },
      { name: 'Games & Entertainment', sales: 28000 }
    ],
    currentMonth: [
      { name: 'Wedding Decor', sales: 95000 },
      { name: 'Party Supplies', sales: 88000 },
      { name: 'Tables & Chairs', sales: 75000 },
      { name: 'Corporate Events', sales: 62000 },
      { name: 'Audio/Visual', sales: 58000 },
      { name: 'Linens', sales: 45000 },
      { name: 'Lighting', sales: 42000 },
      { name: 'Tents', sales: 38000 },
      { name: 'Catering Equipment', sales: 35000 },
      { name: 'Games & Entertainment', sales: 32000 }
    ],
    lastMonth: [
      { name: 'Party Supplies', sales: 78000 },
      { name: 'Wedding Decor', sales: 71000 },
      { name: 'Corporate Events', sales: 65000 },
      { name: 'Tables & Chairs', sales: 52000 },
      { name: 'Audio/Visual', sales: 47000 },
      { name: 'Linens', sales: 41000 },
      { name: 'Lighting', sales: 37000 },
      { name: 'Tents', sales: 34000 },
      { name: 'Catering Equipment', sales: 31000 },
      { name: 'Games & Entertainment', sales: 27000 }
    ],
    currentYear: [
      { name: 'Party Supplies', sales: 485000 },
      { name: 'Wedding Decor', sales: 472000 },
      { name: 'Corporate Events', sales: 368000 },
      { name: 'Tables & Chairs', sales: 355000 },
      { name: 'Audio/Visual', sales: 248000 },
      { name: 'Linens', sales: 242000 },
      { name: 'Lighting', sales: 238000 },
      { name: 'Tents', sales: 235000 },
      { name: 'Catering Equipment', sales: 232000 },
      { name: 'Games & Entertainment', sales: 228000 }
    ],
    lastYear: [
      { name: 'Wedding Decor', sales: 445000 },
      { name: 'Party Supplies', sales: 425000 },
      { name: 'Corporate Events', sales: 342000 },
      { name: 'Tables & Chairs', sales: 335000 },
      { name: 'Audio/Visual', sales: 228000 },
      { name: 'Linens', sales: 222000 },
      { name: 'Lighting', sales: 218000 },
      { name: 'Tents', sales: 215000 },
      { name: 'Catering Equipment', sales: 212000 },
      { name: 'Games & Entertainment', sales: 208000 }
    ],
    yearComparison: [
      { name: 'Party Supplies', sales: 485000 },
      { name: 'Wedding Decor', sales: 472000 },
      { name: 'Corporate Events', sales: 368000 },
      { name: 'Tables & Chairs', sales: 355000 },
      { name: 'Audio/Visual', sales: 248000 },
      { name: 'Linens', sales: 242000 },
      { name: 'Lighting', sales: 238000 },
      { name: 'Tents', sales: 235000 },
      { name: 'Catering Equipment', sales: 232000 },
      { name: 'Games & Entertainment', sales: 228000 }
    ]
  };

  // Product data
  const productData = {
    rolling30: [
      { name: 'Round Table (8-seat)', sales: 25000 },
      { name: 'White Chiavari Chair', sales: 22000 },
      { name: 'Dance Floor (20x20)', sales: 18000 },
      { name: 'LED Uplighting', sales: 15000 },
      { name: 'White Tablecloth', sales: 12000 },
      { name: 'Wireless Microphone', sales: 11000 },
      { name: 'Cocktail Table', sales: 9500 },
      { name: 'Projector & Screen', sales: 8500 },
      { name: 'Centerpiece (Gold)', sales: 7200 },
      { name: 'Photo Booth Props', sales: 6800 }
    ],
    currentMonth: [
      { name: 'White Chiavari Chair', sales: 28000 },
      { name: 'Round Table (8-seat)', sales: 26000 },
      { name: 'Dance Floor (20x20)', sales: 22000 },
      { name: 'LED Uplighting', sales: 18000 },
      { name: 'White Tablecloth', sales: 15000 },
      { name: 'Wireless Microphone', sales: 13000 },
      { name: 'Cocktail Table', sales: 11500 },
      { name: 'Projector & Screen', sales: 9500 },
      { name: 'Centerpiece (Gold)', sales: 8200 },
      { name: 'Photo Booth Props', sales: 7800 }
    ],
    lastMonth: [
      { name: 'Round Table (8-seat)', sales: 23000 },
      { name: 'White Chiavari Chair', sales: 21000 },
      { name: 'Dance Floor (20x20)', sales: 17000 },
      { name: 'LED Uplighting', sales: 14000 },
      { name: 'White Tablecloth', sales: 11000 },
      { name: 'Wireless Microphone', sales: 10000 },
      { name: 'Cocktail Table', sales: 8500 },
      { name: 'Projector & Screen', sales: 7500 },
      { name: 'Centerpiece (Gold)', sales: 6200 },
      { name: 'Photo Booth Props', sales: 5800 }
    ],
    currentYear: [
      { name: 'Round Table (8-seat)', sales: 145000 },
      { name: 'White Chiavari Chair', sales: 142000 },
      { name: 'Dance Floor (20x20)', sales: 108000 },
      { name: 'LED Uplighting', sales: 95000 },
      { name: 'White Tablecloth', sales: 72000 },
      { name: 'Wireless Microphone', sales: 71000 },
      { name: 'Cocktail Table', sales: 59500 },
      { name: 'Projector & Screen', sales: 48500 },
      { name: 'Centerpiece (Gold)', sales: 47200 },
      { name: 'Photo Booth Props', sales: 36800 }
    ],
    lastYear: [
      { name: 'White Chiavari Chair', sales: 135000 },
      { name: 'Round Table (8-seat)', sales: 132000 },
      { name: 'Dance Floor (20x20)', sales: 98000 },
      { name: 'LED Uplighting', sales: 85000 },
      { name: 'White Tablecloth', sales: 65000 },
      { name: 'Wireless Microphone', sales: 64000 },
      { name: 'Cocktail Table', sales: 52500 },
      { name: 'Projector & Screen', sales: 41500 },
      { name: 'Centerpiece (Gold)', sales: 40200 },
      { name: 'Photo Booth Props', sales: 29800 }
    ],
    yearComparison: [
      { name: 'Round Table (8-seat)', sales: 145000 },
      { name: 'White Chiavari Chair', sales: 142000 },
      { name: 'Dance Floor (20x20)', sales: 108000 },
      { name: 'LED Uplighting', sales: 95000 },
      { name: 'White Tablecloth', sales: 72000 },
      { name: 'Wireless Microphone', sales: 71000 },
      { name: 'Cocktail Table', sales: 59500 },
      { name: 'Projector & Screen', sales: 48500 },
      { name: 'Centerpiece (Gold)', sales: 47200 },
      { name: 'Photo Booth Props', sales: 36800 }
    ]
  };

  const periodOptions = [
    { value: 'rolling30', label: 'Rolling 30 Days' },
    { value: 'currentMonth', label: 'Current Month' },
    { value: 'lastMonth', label: 'Last Month' },
    { value: 'currentYear', label: 'Current Year' },
    { value: 'lastYear', label: 'Last Year' },
    { value: 'yearComparison', label: 'Year vs Year' }
  ];

  const PeriodSelector = ({ value, onChange, options }) => (
    <div className="flex space-x-2 mb-4">
      {options.map(option => (
        <button
          key={option.value}
          onClick={() => onChange(option.value)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            value === option.value
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );

  // Calculate sales metrics
  const calculateSalesMetrics = (data) => {
    const currentTotal = data.reduce((sum, item) => sum + item.current, 0);
    const previousTotal = data.reduce((sum, item) => sum + item.previous, 0);
    const percentChange = ((currentTotal - previousTotal) / previousTotal) * 100;
    const avgDaily = currentTotal / data.length;
    
    return {
      currentTotal,
      previousTotal,
      percentChange,
      avgDaily,
      isPositive: percentChange >= 0
    };
  };

  // Calculate category metrics
  const calculateCategoryMetrics = (data) => {
    const totalSales = data.reduce((sum, item) => sum + item.sales, 0);
    const avgSales = totalSales / data.length;
    const topCategory = data[0];
    const marketShare = (topCategory.sales / totalSales) * 100;
    
    return {
      totalSales,
      avgSales,
      topCategory: topCategory.name,
      topCategorySales: topCategory.sales,
      marketShare
    };
  };

  // Calculate product metrics
  const calculateProductMetrics = (data) => {
    const totalSales = data.reduce((sum, item) => sum + item.sales, 0);
    const avgSales = totalSales / data.length;
    const topProduct = data[0];
    const marketShare = (topProduct.sales / totalSales) * 100;
    const bottomProduct = data[data.length - 1];
    const performanceGap = ((topProduct.sales - bottomProduct.sales) / bottomProduct.sales) * 100;
    
    return {
      totalSales,
      avgSales,
      topProduct: topProduct.name,
      topProductSales: topProduct.sales,
      marketShare,
      bottomProduct: bottomProduct.name,
      bottomProductSales: bottomProduct.sales,
      performanceGap
    };
  };

  const currentSalesData = salesData[salesPeriod] || salesData.rolling30;
  const currentCategoryData = categoryData[categoryPeriod] || categoryData.rolling30;
  const currentProductData = productData[productPeriod] || productData.rolling30;

  const salesMetrics = calculateSalesMetrics(currentSalesData);
  const categoryMetrics = calculateCategoryMetrics(currentCategoryData);
  const productMetrics = calculateProductMetrics(currentProductData);

  // Custom tooltips
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const current = payload.find(p => p.dataKey === 'current')?.value || 0;
      const previous = payload.find(p => p.dataKey === 'previous')?.value || 0;
      const change = ((current - previous) / previous) * 100;
      
      return (
        <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-semibold text-gray-800 mb-2">{label}</p>
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-blue-600">Current:</span>
              <span className="font-medium">${current.toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-green-600">Previous:</span>
              <span className="font-medium">${previous.toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between pt-1 border-t">
              <span className="text-gray-600">Change:</span>
              <span className={`font-medium flex items-center ${change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {change >= 0 ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
                {change.toFixed(1)}%
              </span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  const CategoryTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const sales = payload[0].value;
      const percentage = (sales / categoryMetrics.totalSales) * 100;
      
      return (
        <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-semibold text-gray-800 mb-2">{label}</p>
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-purple-600">Sales:</span>
              <span className="font-medium">${sales.toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Market Share:</span>
              <span className="font-medium">{percentage.toFixed(1)}%</span>
            </div>
            <div className="flex items-center justify-between pt-1 border-t">
              <span className="text-gray-600">vs Average:</span>
              <span className={`font-medium ${sales > categoryMetrics.avgSales ? 'text-green-600' : 'text-red-600'}`}>
                {sales > categoryMetrics.avgSales ? '+' : ''}{((sales - categoryMetrics.avgSales) / categoryMetrics.avgSales * 100).toFixed(1)}%
              </span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  const ProductTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const sales = payload[0].value;
      const percentage = (sales / productMetrics.totalSales) * 100;
      const rank = currentProductData.findIndex(item => item.name === label) + 1;
      
      return (
        <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-semibold text-gray-800 mb-2">{label}</p>
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-amber-600">Sales:</span>
              <span className="font-medium">${sales.toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Market Share:</span>
              <span className="font-medium">{percentage.toFixed(1)}%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Rank:</span>
              <span className="font-medium">#{rank}</span>
            </div>
            <div className="flex items-center justify-between pt-1 border-t">
              <span className="text-gray-600">vs Average:</span>
              <span className={`font-medium ${sales > productMetrics.avgSales ? 'text-green-600' : 'text-red-600'}`}>
                {sales > productMetrics.avgSales ? '+' : ''}{((sales - productMetrics.avgSales) / productMetrics.avgSales * 100).toFixed(1)}%
              </span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <Link 
              to="/reports" 
              className="mr-4 p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Sales Report</h1>
              <p className="text-gray-600">Comprehensive sales analysis with trends, categories, and product performance</p>
            </div>
          </div>
        </div>

        {/* Sales Trend Analysis */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Sales Trend Analysis</h2>
            <div className="flex items-center space-x-2">
              <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                <RefreshCw className="w-4 h-4" />
              </button>
              <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                <Download className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          {/* Sales Metrics Cards */}
          <div className="flex justify-center mb-6">
            <div className="flex flex-wrap justify-center gap-4 max-w-5xl">
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 min-w-[168px] text-center">
                <div className="text-xs text-gray-600 font-medium mb-1">Total Sales</div>
                <div className="text-lg font-semibold text-blue-800 whitespace-nowrap">${salesMetrics.currentTotal.toLocaleString()}</div>
              </div>
              <div className="bg-green-50 p-4 rounded-lg border border-green-200 min-w-[168px] text-center">
                <div className="text-xs text-gray-600 font-medium mb-1">Previous Period</div>
                <div className="text-lg font-semibold text-green-800 whitespace-nowrap">${salesMetrics.previousTotal.toLocaleString()}</div>
              </div>
              <div className={`p-4 rounded-lg border min-w-[168px] text-center ${
                salesMetrics.isPositive 
                  ? 'bg-emerald-50 border-emerald-200' 
                  : 'bg-red-50 border-red-200'
              }`}>
                <div className="text-xs text-gray-600 font-medium mb-1 text-center">
                  Growth Rate
                </div>
                <div className={`text-lg font-semibold flex items-center justify-center whitespace-nowrap ${
                  salesMetrics.isPositive ? 'text-emerald-800' : 'text-red-800'
                }`}>
                  {salesMetrics.isPositive ? <TrendingUp className="w-4 h-4 mr-1" /> : <TrendingDown className="w-4 h-4 mr-1" />}
                  {salesMetrics.percentChange.toFixed(1)}%
                </div>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg border border-purple-200 min-w-[168px] text-center">
                <div className="text-xs text-gray-600 font-medium mb-1">Daily Average</div>
                <div className="text-lg font-semibold text-purple-800 whitespace-nowrap">${salesMetrics.avgDaily.toLocaleString()}</div>
              </div>
            </div>
          </div>
          
          <PeriodSelector 
            value={salesPeriod} 
            onChange={setSalesPeriod} 
            options={periodOptions}
          />
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={currentSalesData}>
              <defs>
                <linearGradient id="currentGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.05}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis 
                dataKey="date" 
                fontSize={11}
                angle={-45}
                textAnchor="end"
                height={60}
                interval={0}
                stroke="#64748b"
              />
              <YAxis 
                fontSize={12}
                stroke="#64748b"
                tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                wrapperStyle={{ paddingTop: '20px' }}
                iconType="line"
              />
              <Line 
                type="monotone" 
                dataKey="current" 
                stroke="#3B82F6" 
                strokeWidth={3}
                name="Current Period"
                dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: '#3B82F6', strokeWidth: 2, fill: '#ffffff' }}
                fill="url(#currentGradient)"
              />
              <Line 
                type="monotone" 
                dataKey="previous" 
                stroke="#10B981" 
                strokeWidth={2}
                strokeDasharray="5 5"
                name="Previous Period"
                dot={{ fill: '#10B981', strokeWidth: 1, r: 3 }}
                activeDot={{ r: 5, stroke: '#10B981', strokeWidth: 2, fill: '#ffffff' }}
              />
            </LineChart>
          </ResponsiveContainer>
          
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
            <div className="text-sm text-gray-500">
              Last updated: {new Date().toLocaleString()}
            </div>
            <div className="text-sm text-gray-500">
              Data points: {currentSalesData.length}
            </div>
          </div>
        </div>

        {/* Top 10 Categories by Sales */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Top 10 Categories by Sales</h2>
            <div className="flex items-center space-x-2">
              <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                <RefreshCw className="w-4 h-4" />
              </button>
              <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                <Download className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          {/* Category Metrics Cards */}
          <div className="flex justify-center mb-6">
            <div className="flex flex-wrap justify-center gap-4 max-w-5xl">
              <div className="bg-purple-50 p-4 rounded-lg border border-purple-200 min-w-[168px] text-center">
                <div className="text-xs text-gray-600 font-medium mb-1">Total Sales</div>
                <div className="text-lg font-semibold text-purple-800 whitespace-nowrap">${categoryMetrics.totalSales.toLocaleString()}</div>
              </div>
              <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-200 min-w-[168px] text-center">
                <div className="text-xs text-gray-600 font-medium mb-1">Average per Category</div>
                <div className="text-lg font-semibold text-indigo-800 whitespace-nowrap">${categoryMetrics.avgSales.toLocaleString()}</div>
              </div>
              <div className="bg-amber-50 p-4 rounded-lg border border-amber-200 min-w-[168px] text-center">
                <div className="text-xs text-gray-600 font-medium mb-1">Top Category</div>
                <div className="text-lg font-semibold text-amber-800 whitespace-nowrap">{categoryMetrics.topCategory}</div>
              </div>
              <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-200 min-w-[168px] text-center">
                <div className="text-xs text-gray-600 font-medium mb-1">Market Share</div>
                <div className="text-lg font-semibold text-emerald-800 whitespace-nowrap">{categoryMetrics.marketShare.toFixed(1)}%</div>
              </div>
            </div>
          </div>
          
          <PeriodSelector 
            value={categoryPeriod} 
            onChange={setCategoryPeriod} 
            options={periodOptions}
          />
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={currentCategoryData}>
              <defs>
                <linearGradient id="categoryGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0.6}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis 
                dataKey="name" 
                angle={-45}
                textAnchor="end"
                height={100}
                fontSize={12}
                stroke="#64748b"
              />
              <YAxis 
                fontSize={12}
                stroke="#64748b"
                tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
              />
              <Tooltip content={<CategoryTooltip />} />
              <Bar 
                dataKey="sales" 
                fill="url(#categoryGradient)"
                radius={[4, 4, 0, 0]}
                stroke="#7C3AED"
                strokeWidth={1}
              />
            </BarChart>
          </ResponsiveContainer>
          
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
            <div className="text-sm text-gray-500">
              Showing top {currentCategoryData.length} categories
            </div>
            <div className="text-sm text-gray-500">
              Last updated: {new Date().toLocaleString()}
            </div>
          </div>
        </div>

        {/* Top 10 Products by Sales */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Top 10 Products by Sales</h2>
            <div className="flex items-center space-x-2">
              <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                <RefreshCw className="w-4 h-4" />
              </button>
              <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                <Download className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          {/* Product Metrics Cards */}
          <div className="flex justify-center mb-6">
            <div className="flex flex-wrap justify-center gap-4 max-w-5xl">
              <div className="bg-amber-50 p-4 rounded-lg border border-amber-200 min-w-[168px] text-center">
                <div className="text-xs text-gray-600 font-medium mb-1">Total Sales</div>
                <div className="text-lg font-semibold text-amber-800 whitespace-nowrap">${productMetrics.totalSales.toLocaleString()}</div>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg border border-orange-200 min-w-[168px] text-center">
                <div className="text-xs text-gray-600 font-medium mb-1">Average per Product</div>
                <div className="text-lg font-semibold text-orange-800 whitespace-nowrap">${productMetrics.avgSales.toLocaleString()}</div>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200 min-w-[168px] text-center">
                <div className="text-xs text-gray-600 font-medium mb-1">Top Product</div>
                <div className="text-lg font-semibold text-yellow-800 whitespace-nowrap">{productMetrics.topProduct}</div>
              </div>
              <div className="bg-rose-50 p-4 rounded-lg border border-rose-200 min-w-[168px] text-center">
                <div className="text-xs text-gray-600 font-medium mb-1">Performance Gap</div>
                <div className="text-lg font-semibold text-rose-800 whitespace-nowrap">{productMetrics.performanceGap.toFixed(0)}%</div>
              </div>
            </div>
          </div>
          
          <PeriodSelector 
            value={productPeriod} 
            onChange={setProductPeriod} 
            options={periodOptions}
          />
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={currentProductData}>
              <defs>
                <linearGradient id="productGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#F59E0B" stopOpacity={0.6}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis 
                dataKey="name" 
                angle={-45}
                textAnchor="end"
                height={100}
                fontSize={12}
                stroke="#64748b"
              />
              <YAxis 
                fontSize={12}
                stroke="#64748b"
                tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
              />
              <Tooltip content={<ProductTooltip />} />
              <Bar 
                dataKey="sales" 
                fill="url(#productGradient)"
                radius={[4, 4, 0, 0]}
                stroke="#D97706"
                strokeWidth={1}
              />
            </BarChart>
          </ResponsiveContainer>
          
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
            <div className="text-sm text-gray-500">
              Showing top {currentProductData.length} products
            </div>
            <div className="text-sm text-gray-500">
              Last updated: {new Date().toLocaleString()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesReport;