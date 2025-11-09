import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Trophy, Truck, Store, Wrench, AlertTriangle, Clock, CheckCircle, TrendingUp, TrendingDown, RefreshCw, Download, Fuel, DollarSign, ExternalLink, ChevronDown, FileText } from 'lucide-react';

const Dashboard = () => {
  const [salesPeriod, setSalesPeriod] = useState('rolling30');
  const [fuelAlerts, setFuelAlerts] = useState([
    { id: 1, customerName: 'ABC Events LLC', orderId: 'ORD-2024-001', amountOwed: 'Pending', date: '2024-01-27', type: 'fuel', notes: '' },
    { id: 2, customerName: 'Wedding Bliss Co', orderId: 'ORD-2024-002', amountOwed: '$45.00', date: '2024-01-26', type: 'fuel', notes: 'Customer disputed charge initially' },
    { id: 3, customerName: 'Corporate Solutions', orderId: 'ORD-2024-003', amountOwed: 'Pending', date: '2024-01-25', type: 'fuel', notes: '' },
    { id: 4, customerName: 'Party Time Rentals', orderId: 'ORD-2024-004', amountOwed: '$32.50', date: '2024-01-24', type: 'fuel', notes: 'Awaiting payment confirmation' },
    { id: 5, customerName: 'Elite Celebrations', orderId: 'ORD-2024-005', amountOwed: 'Pending', date: '2024-01-23', type: 'fuel', notes: 'Need to calculate mileage' },
    { id: 6, customerName: 'Dream Weddings Inc', orderId: 'ORD-2024-006', amountOwed: '$28.75', date: '2024-01-22', type: 'fuel', notes: '' }
  ]);
  
  const [damageAlerts, setDamageAlerts] = useState([
    { id: 1, customerName: 'Luxury Events Co', orderId: 'ORD-2024-007', amountOwed: '$150.00', date: '2024-01-27', type: 'damage', notes: 'Tablecloth stain - professional cleaning required' },
    { id: 2, customerName: 'Premier Parties', orderId: 'ORD-2024-008', amountOwed: 'Pending', date: '2024-01-26', type: 'damage', notes: '' },
    { id: 3, customerName: 'Celebration Central', orderId: 'ORD-2024-009', amountOwed: '$89.99', date: '2024-01-25', type: 'damage', notes: 'Chair leg broken during event' },
    { id: 4, customerName: 'Event Masters LLC', orderId: 'ORD-2024-010', amountOwed: 'Pending', date: '2024-01-24', type: 'damage', notes: 'Assessing tent damage from wind' },
    { id: 5, customerName: 'Perfect Day Events', orderId: 'ORD-2024-011', amountOwed: '$225.00', date: '2024-01-23', type: 'damage', notes: 'Multiple items damaged - invoice sent' },
    { id: 6, customerName: 'Grand Occasions', orderId: 'ORD-2024-012', amountOwed: 'Pending', date: '2024-01-22', type: 'damage', notes: '' }
  ]);

  // Modal states
  const [showAmountModal, setShowAmountModal] = useState(false);
  const [showNotesModal, setShowNotesModal] = useState(false);
  const [showUpdateDropdown, setShowUpdateDropdown] = useState(null);
  const [editingAlert, setEditingAlert] = useState(null);
  const [tempAmount, setTempAmount] = useState('');
  const [tempNotes, setTempNotes] = useState('');

  // Placeholder task data
  const taskData = {
    deliveriesTruck: { due: 0, completed: 15 },
    deliveriesStore: { due: 3, completed: 8 },
    returnsTruck: { due: 2, completed: 12 },
    returnsStore: { due: 1, completed: 6 },
    maintenanceHold: { due: 4, completed: 3 },
    damaged: { due: 1, completed: 2 },
    tasksOverdue: { due: 2, completed: 0 },
    tasksDue: { due: 5, completed: 18 }
  };

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
    ]
  };

  // 2-week maintenance data
  const maintenanceData = [
    { date: 'Mon 1/13', due: 5, completed: 3 },
    { date: 'Tue 1/14', due: 3, completed: 4 },
    { date: 'Wed 1/15', due: 7, completed: 2 },
    { date: 'Thu 1/16', due: 4, completed: 6 },
    { date: 'Fri 1/17', due: 6, completed: 5 },
    { date: 'Sat 1/18', due: 2, completed: 3 },
    { date: 'Sun 1/19', due: 1, completed: 2 },
    { date: 'Mon 1/20', due: 8, completed: 4 },
    { date: 'Tue 1/21', due: 5, completed: 7 },
    { date: 'Wed 1/22', due: 3, completed: 5 },
    { date: 'Thu 1/23', due: 6, completed: 3 },
    { date: 'Fri 1/24', due: 4, completed: 8 },
    { date: 'Sat 1/25', due: 2, completed: 4 },
    { date: 'Sun 1/26', due: 3, completed: 2 }
  ];

  // 2-week damaged items data
  const damagedData = [
    { date: 'Mon 1/13', due: 2, completed: 1 },
    { date: 'Tue 1/14', due: 1, completed: 3 },
    { date: 'Wed 1/15', due: 4, completed: 2 },
    { date: 'Thu 1/16', due: 3, completed: 4 },
    { date: 'Fri 1/17', due: 2, completed: 3 },
    { date: 'Sat 1/18', due: 1, completed: 2 },
    { date: 'Sun 1/19', due: 0, completed: 1 },
    { date: 'Mon 1/20', due: 5, completed: 2 },
    { date: 'Tue 1/21', due: 3, completed: 4 },
    { date: 'Wed 1/22', due: 2, completed: 3 },
    { date: 'Thu 1/23', due: 4, completed: 1 },
    { date: 'Fri 1/24', due: 1, completed: 5 },
    { date: 'Sat 1/25', due: 2, completed: 3 },
    { date: 'Sun 1/26', due: 1, completed: 2 }
  ];

  const handleTaskClick = (taskType: string) => {
    console.log(`Navigate to ${taskType} section`);
  };

  const handleOrderClick = (orderId: string) => {
    console.log(`Navigate to order ${orderId}`);
    // This will be replaced with actual navigation to order details
  };

  const handleAmountClick = (alert) => {
    setEditingAlert(alert);
    setTempAmount(alert.amountOwed === 'Pending' ? '' : alert.amountOwed.replace('$', ''));
    setShowAmountModal(true);
  };

  const handleNotesClick = (alert) => {
    setEditingAlert(alert);
    setTempNotes(alert.notes || '');
    setShowNotesModal(true);
  };

  const handleUpdateClick = (alertId) => {
    setShowUpdateDropdown(showUpdateDropdown === alertId ? null : alertId);
  };

  const handleStatusUpdate = (alertType: 'fuel' | 'damage', alertId: number, status: 'paid' | 'uncollectible') => {
    console.log(`Mark alert ${alertId} as ${status}`);
    
    if (alertType === 'fuel') {
      setFuelAlerts(prev => prev.filter(alert => alert.id !== alertId));
    } else {
      setDamageAlerts(prev => prev.filter(alert => alert.id !== alertId));
    }
    setShowUpdateDropdown(null);
  };

  const saveAmount = () => {
    if (editingAlert) {
      const formattedAmount = tempAmount ? `$${parseFloat(tempAmount).toFixed(2)}` : 'Pending';
      
      if (editingAlert.type === 'fuel') {
        setFuelAlerts(prev => prev.map(alert => 
          alert.id === editingAlert.id 
            ? { ...alert, amountOwed: formattedAmount }
            : alert
        ));
      } else {
        setDamageAlerts(prev => prev.map(alert => 
          alert.id === editingAlert.id 
            ? { ...alert, amountOwed: formattedAmount }
            : alert
        ));
      }
    }
    setShowAmountModal(false);
    setEditingAlert(null);
    setTempAmount('');
  };

  const saveNotes = () => {
    if (editingAlert) {
      if (editingAlert.type === 'fuel') {
        setFuelAlerts(prev => prev.map(alert => 
          alert.id === editingAlert.id 
            ? { ...alert, notes: tempNotes }
            : alert
        ));
      } else {
        setDamageAlerts(prev => prev.map(alert => 
          alert.id === editingAlert.id 
            ? { ...alert, notes: tempNotes }
            : alert
        ));
      }
    }
    setShowNotesModal(false);
    setEditingAlert(null);
    setTempNotes('');
  };

  const AlertItem = ({ alert, onAmountClick, onNotesClick, onUpdateClick, onOrderClick }) => (
    <div className="bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors">
      {/* Single Row with 6 Columns */}
      <div className="flex items-center justify-between p-3">
        {/* Column 1: Customer Name */}
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-semibold text-gray-800 truncate">{alert.customerName}</h4>
        </div>
        
        {/* Column 2: Order ID */}
        <div className="flex-1 min-w-0 px-2">
          <button
            onClick={() => onOrderClick(alert.orderId)}
            className="flex items-center text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors"
          >
            {alert.orderId}
            <ExternalLink className="w-3 h-3 ml-1" />
          </button>
        </div>
        
        {/* Column 3: Amount Icon */}
        <div className="px-1">
          <button
            onClick={() => onAmountClick(alert)}
            className="p-1.5 text-blue-600 hover:text-blue-800 hover:bg-blue-100 rounded transition-colors"
            title="Edit Amount"
          >
            <DollarSign className="w-4 h-4" />
          </button>
        </div>
        
        {/* Column 4: Mark as Paid Icon */}
        <div className="px-1 relative">
          <button
            onClick={() => onUpdateClick(alert.id)}
            className="p-1.5 text-green-600 hover:text-green-800 hover:bg-green-100 rounded transition-colors"
            title="Update Status"
          >
            <ChevronDown className="w-4 h-4" />
          </button>
          
          {showUpdateDropdown === alert.id && (
            <div className="absolute top-full right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 min-w-[140px]">
              <button
                onClick={() => handleStatusUpdate(alert.type, alert.id, 'paid')}
                className="w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 rounded-t-lg"
              >
                Mark as Paid
              </button>
              <button
                onClick={() => handleStatusUpdate(alert.type, alert.id, 'uncollectible')}
                className="w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 rounded-b-lg"
              >
                Mark as Uncollectible
              </button>
            </div>
          )}
        </div>
        
        {/* Column 5: Notes Icon */}
        <div className="px-1">
          <button
            onClick={() => onNotesClick(alert)}
            className="p-1.5 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded transition-colors"
            title="Edit Notes"
          >
            <FileText className="w-4 h-4" />
          </button>
        </div>
        
        {/* Column 6: Amount */}
        <div className="flex-shrink-0 text-right min-w-[80px]">
          <span className={`text-sm font-semibold ${
            alert.amountOwed === 'Pending' 
              ? 'text-orange-600 bg-orange-100 px-2 py-1 rounded-full' 
              : 'text-green-700'
          }`}>
            {alert.amountOwed}
          </span>
        </div>
      </div>

      {/* Notes Row (only shows if notes exist) */}
      {alert.notes && (
        <div className="px-3 pb-3">
          <div className="p-2 bg-blue-50 border border-blue-200 rounded text-xs text-blue-800">
            <strong>Notes:</strong> {alert.notes}
          </div>
        </div>
      )}
    </div>
  );

  const AlertBlock = ({ title, icon: Icon, alerts, alertType, color }) => (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-300">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <div className={`p-2.5 rounded-lg bg-gradient-to-br ${color} mr-3`}>
            <Icon className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
            <p className="text-sm text-gray-600">{alerts.length} pending alert{alerts.length !== 1 ? 's' : ''}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
            alerts.length > 0 
              ? 'bg-red-100 text-red-800' 
              : 'bg-green-100 text-green-800'
          }`}>
            {alerts.length > 0 ? `${alerts.length} Active` : 'All Clear'}
          </span>
        </div>
      </div>
      
      {alerts.length > 0 ? (
        <div className="space-y-3 max-h-80 overflow-y-auto">
          {alerts.slice(0, 5).map((alert) => (
            <AlertItem
              key={alert.id}
              alert={alert}
              onAmountClick={handleAmountClick}
              onNotesClick={handleNotesClick}
              onUpdateClick={handleUpdateClick}
              onOrderClick={handleOrderClick}
            />
          ))}
          {alerts.length > 5 && (
            <div className="text-center pt-2 border-t border-gray-200">
              <span className="text-sm text-gray-500">
                +{alerts.length - 5} more alert{alerts.length - 5 !== 1 ? 's' : ''}
              </span>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-8">
          <div className="text-gray-400 mb-2">
            <CheckCircle className="w-12 h-12 mx-auto" />
          </div>
          <p className="text-gray-500">No pending alerts</p>
        </div>
      )}
    </div>
  );

  const TaskBadge = ({ icon: Icon, label, due, completed, taskType, color = "blue" }) => (
    <div 
      className="bg-white rounded-xl shadow-sm border border-gray-300 p-5 cursor-pointer hover:shadow-lg hover:border-blue-400 transition-all duration-300 group"
      onClick={() => handleTaskClick(taskType)}
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`p-2.5 rounded-lg bg-gradient-to-br ${getColorGradient(color)} group-hover:scale-110 transition-transform duration-200`}>
          <Icon className="w-5 h-5 text-white" />
        </div>
      </div>

      <h3 className="text-sm font-semibold text-gray-800 mb-4 leading-tight">{label}</h3>

      <div className="flex items-center">
        <div className="flex-1 flex flex-col items-center justify-center">
          <div className={`text-2xl font-bold ${due === 0 ? 'text-gray-400' : 'text-red-600'} mb-1`}>
            {due}
          </div>
          <div className="text-xs text-gray-500 font-medium tracking-wide text-center">
            DUE
          </div>
        </div>

        <div className="h-12 w-px bg-gray-300"></div>

        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="text-2xl font-bold text-green-600 mb-1">
            {completed}
          </div>
          <div className="text-xs text-gray-500 font-medium tracking-wide text-center">
            COMPLETED
          </div>
        </div>
      </div>

      {due > 0 && (
        <div className="mt-4 pt-3 border-t border-gray-300">
          <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
            <span>Progress</span>
            <span>{Math.round((completed / (completed + due)) * 100)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-1.5">
            <div 
              className={`h-1.5 rounded-full bg-gradient-to-r ${getProgressGradient(color)} transition-all duration-500`}
              style={{ width: `${(completed / (completed + due)) * 100}%` }}
            ></div>
          </div>
        </div>
      )}

      {due === 0 && completed > 0 && (
        <div className="mt-4 pt-3 border-t border-gray-300">
          <div className="flex items-center justify-center">
            <div className="flex items-center bg-gradient-to-r from-yellow-400 to-amber-500 px-3 py-1.5 rounded-full shadow-sm">
              <Trophy className="w-4 h-4 text-white mr-1.5" />
              <span className="text-white font-semibold text-xs tracking-wide">ALL DONE!</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const getColorGradient = (color: string) => {
    const gradients = {
      blue: 'from-blue-500 to-blue-600',
      green: 'from-green-500 to-green-600',
      purple: 'from-purple-500 to-purple-600',
      indigo: 'from-indigo-500 to-indigo-600',
      orange: 'from-orange-500 to-orange-600',
      red: 'from-red-500 to-red-600',
      yellow: 'from-yellow-500 to-yellow-600'
    };
    return gradients[color] || gradients.blue;
  };

  const getProgressGradient = (color: string) => {
    const gradients = {
      blue: 'from-blue-400 to-blue-500',
      green: 'from-green-400 to-green-500',
      purple: 'from-purple-400 to-purple-500',
      indigo: 'from-indigo-400 to-indigo-500',
      orange: 'from-orange-400 to-orange-500',
      red: 'from-red-400 to-red-500',
      yellow: 'from-yellow-400 to-yellow-500'
    };
    return gradients[color] || gradients.blue;
  };

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

  const periodOptions = [
    { value: 'rolling30', label: 'Rolling 30 Days' },
    { value: 'currentMonth', label: 'Current Month' },
    { value: 'lastMonth', label: 'Last Month' }
  ];

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

  const currentSalesData = salesData[salesPeriod] || salesData.rolling30;
  const salesMetrics = calculateSalesMetrics(currentSalesData);

  // Custom tooltip for sales chart
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

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard Overview</h1>
          <p className="text-gray-600">Rental & Sales Management System</p>
        </div>

        {/* Section 1: Task Badges */}
        <div className="mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Block 1: Schedule */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-300">
              <div className="flex items-center mb-4">
                <Clock className="w-6 h-6 text-blue-600 mr-3" />
                <h3 className="text-lg font-semibold text-gray-800">Schedule</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <TaskBadge
                  icon={Truck}
                  label="Deliveries - Truck"
                  due={taskData.deliveriesTruck.due}
                  completed={taskData.deliveriesTruck.completed}
                  taskType="deliveries-truck"
                  color="blue"
                />
                <TaskBadge
                  icon={Store}
                  label="Deliveries - In Store"
                  due={taskData.deliveriesStore.due}
                  completed={taskData.deliveriesStore.completed}
                  taskType="deliveries-store"
                  color="green"
                />
                <TaskBadge
                  icon={Truck}
                  label="Returns - Truck"
                  due={taskData.returnsTruck.due}
                  completed={taskData.returnsTruck.completed}
                  taskType="returns-truck"
                  color="purple"
                />
                <TaskBadge
                  icon={Store}
                  label="Returns - In Store"
                  due={taskData.returnsStore.due}
                  completed={taskData.returnsStore.completed}
                  taskType="returns-store"
                  color="indigo"
                />
              </div>
            </div>

            {/* Block 2: Operations */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-300">
              <div className="flex items-center mb-4">
                <Wrench className="w-6 h-6 text-orange-600 mr-3" />
                <h3 className="text-lg font-semibold text-gray-800">Operations</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <TaskBadge
                  icon={Wrench}
                  label="Maintenance Hold"
                  due={taskData.maintenanceHold.due}
                  completed={taskData.maintenanceHold.completed}
                  taskType="maintenance"
                  color="orange"
                />
                <TaskBadge
                  icon={AlertTriangle}
                  label="Damaged Items"
                  due={taskData.damaged.due}
                  completed={taskData.damaged.completed}
                  taskType="damaged"
                  color="red"
                />
                <TaskBadge
                  icon={Clock}
                  label="Tasks Overdue"
                  due={taskData.tasksOverdue.due}
                  completed={taskData.tasksOverdue.completed}
                  taskType="overdue"
                  color="red"
                />
                <TaskBadge
                  icon={CheckCircle}
                  label="Tasks Due Today"
                  due={taskData.tasksDue.due}
                  completed={taskData.tasksDue.completed}
                  taskType="due-today"
                  color="yellow"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Customer Alerts */}
        <div className="mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <AlertBlock
              title="Fuel Charge Alerts"
              icon={Fuel}
              alerts={fuelAlerts}
              alertType="fuel"
              color="from-orange-500 to-orange-600"
            />
            <AlertBlock
              title="New Damage Alerts"
              icon={AlertTriangle}
              alerts={damageAlerts}
              alertType="damage"
              color="from-red-500 to-red-600"
            />
          </div>
        </div>

        {/* Section 3: Sales Trend Analysis */}
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
        </div>

        {/* Section 4: Maintenance Hold Tracking */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-300">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-800">Maintenance Hold - 2 Week Trend</h2>
              <Wrench className="w-5 h-5 text-orange-600" />
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={maintenanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis 
                  dataKey="date" 
                  fontSize={10}
                  angle={-45}
                  textAnchor="end"
                  height={60}
                  stroke="#64748b"
                />
                <YAxis 
                  fontSize={12}
                  stroke="#64748b"
                />
                <Tooltip 
                  formatter={(value, name) => [value, name === 'due' ? 'Due' : 'Completed']}
                  labelStyle={{ color: '#374151' }}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="due" 
                  stroke="#F59E0B" 
                  strokeWidth={2}
                  name="Due"
                  dot={{ fill: '#F59E0B', strokeWidth: 1, r: 3 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="completed" 
                  stroke="#10B981" 
                  strokeWidth={2}
                  name="Completed"
                  dot={{ fill: '#10B981', strokeWidth: 1, r: 3 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Section 4: Damaged Items Tracking */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-300">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-800">Damaged Items - 2 Week Trend</h2>
              <AlertTriangle className="w-5 h-5 text-red-600" />
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={damagedData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis 
                  dataKey="date" 
                  fontSize={10}
                  angle={-45}
                  textAnchor="end"
                  height={60}
                  stroke="#64748b"
                />
                <YAxis 
                  fontSize={12}
                  stroke="#64748b"
                />
                <Tooltip 
                  formatter={(value, name) => [value, name === 'due' ? 'Due' : 'Completed']}
                  labelStyle={{ color: '#374151' }}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="due" 
                  stroke="#EF4444" 
                  strokeWidth={2}
                  name="Due"
                  dot={{ fill: '#EF4444', strokeWidth: 1, r: 3 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="completed" 
                  stroke="#10B981" 
                  strokeWidth={2}
                  name="Completed"
                  dot={{ fill: '#10B981', strokeWidth: 1, r: 3 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Amount Modal */}
        {showAmountModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-96 max-w-90vw">
              <h3 className="text-lg font-semibold mb-4">
                {editingAlert?.amountOwed === 'Pending' ? 'Add Amount' : 'Edit Amount'}
              </h3>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Amount ($)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={tempAmount}
                  onChange={(e) => setTempAmount(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="0.00"
                  autoFocus
                />
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowAmountModal(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={saveAmount}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Notes Modal */}
        {showNotesModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-96 max-w-90vw">
              <h3 className="text-lg font-semibold mb-4">
                {editingAlert?.notes ? 'Edit Notes' : 'Add Notes'}
              </h3>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Notes
                </label>
                <textarea
                  value={tempNotes}
                  onChange={(e) => setTempNotes(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={4}
                  placeholder="Add notes about this alert..."
                  autoFocus
                />
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowNotesModal(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={saveNotes}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;