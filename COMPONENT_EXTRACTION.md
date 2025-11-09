# Component Extraction Guide - Customer Alerts

## Overview
This guide shows how to extract the Customer Alerts functionality into reusable components for better maintainability and testing.

## Recommended Component Structure

### 1. CustomerAlertsBlock Component
```typescript
// components/CustomerAlertsBlock.tsx
import React from 'react';
import { AlertItem } from './AlertItem';
import { AlertModal } from './AlertModal';
import { useCustomerAlerts } from '../hooks/useCustomerAlerts';

interface CustomerAlertsBlockProps {
  title: string;
  icon: React.ComponentType;
  alertType: 'fuel' | 'damage';
  color: string;
  initialAlerts: Alert[];
}

export const CustomerAlertsBlock: React.FC<CustomerAlertsBlockProps> = ({
  title,
  icon: Icon,
  alertType,
  color,
  initialAlerts
}) => {
  const {
    alerts,
    modals,
    handlers,
    editingAlert,
    tempValues
  } = useCustomerAlerts(initialAlerts, alertType);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-300">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <div className={`p-2.5 rounded-lg bg-gradient-to-br ${color} mr-3`}>
            <Icon className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
            <p className="text-sm text-gray-600">
              {alerts.length} pending alert{alerts.length !== 1 ? 's' : ''}
            </p>
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
      
      {/* Alert List */}
      {alerts.length > 0 ? (
        <div className="space-y-3 max-h-80 overflow-y-auto">
          {alerts.slice(0, 5).map((alert) => (
            <AlertItem
              key={alert.id}
              alert={alert}
              onAmountClick={handlers.handleAmountClick}
              onNotesClick={handlers.handleNotesClick}
              onUpdateClick={handlers.handleUpdateClick}
              onOrderClick={handlers.handleOrderClick}
              showUpdateDropdown={modals.showUpdateDropdown}
              onStatusUpdate={handlers.handleStatusUpdate}
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

      {/* Modals */}
      <AlertModal
        type="amount"
        isOpen={modals.showAmountModal}
        onClose={handlers.closeAmountModal}
        onSave={handlers.saveAmount}
        editingAlert={editingAlert}
        tempValue={tempValues.tempAmount}
        onValueChange={handlers.setTempAmount}
      />

      <AlertModal
        type="notes"
        isOpen={modals.showNotesModal}
        onClose={handlers.closeNotesModal}
        onSave={handlers.saveNotes}
        editingAlert={editingAlert}
        tempValue={tempValues.tempNotes}
        onValueChange={handlers.setTempNotes}
      />
    </div>
  );
};
```

### 2. AlertItem Component
```typescript
// components/AlertItem.tsx
import React from 'react';
import { DollarSign, ChevronDown, FileText, ExternalLink } from 'lucide-react';

interface AlertItemProps {
  alert: Alert;
  onAmountClick: (alert: Alert) => void;
  onNotesClick: (alert: Alert) => void;
  onUpdateClick: (alertId: number) => void;
  onOrderClick: (orderId: string) => void;
  showUpdateDropdown: number | null;
  onStatusUpdate: (alertType: string, alertId: number, status: string) => void;
}

export const AlertItem: React.FC<AlertItemProps> = ({
  alert,
  onAmountClick,
  onNotesClick,
  onUpdateClick,
  onOrderClick,
  showUpdateDropdown,
  onStatusUpdate
}) => {
  return (
    <div className="bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors">
      {/* Single Row with 6 Columns */}
      <div className="flex items-center justify-between p-3">
        {/* Column 1: Customer Name */}
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-semibold text-gray-800 truncate">
            {alert.customerName}
          </h4>
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
                onClick={() => onStatusUpdate(alert.type, alert.id, 'paid')}
                className="w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 rounded-t-lg"
              >
                Mark as Paid
              </button>
              <button
                onClick={() => onStatusUpdate(alert.type, alert.id, 'uncollectible')}
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

      {/* Notes Row (conditional) */}
      {alert.notes && (
        <div className="px-3 pb-3">
          <div className="p-2 bg-blue-50 border border-blue-200 rounded text-xs text-blue-800">
            <strong>Notes:</strong> {alert.notes}
          </div>
        </div>
      )}
    </div>
  );
};
```

### 3. AlertModal Component
```typescript
// components/AlertModal.tsx
import React from 'react';

interface AlertModalProps {
  type: 'amount' | 'notes';
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  editingAlert: Alert | null;
  tempValue: string;
  onValueChange: (value: string) => void;
}

export const AlertModal: React.FC<AlertModalProps> = ({
  type,
  isOpen,
  onClose,
  onSave,
  editingAlert,
  tempValue,
  onValueChange
}) => {
  if (!isOpen) return null;

  const isAmount = type === 'amount';
  const title = isAmount 
    ? (editingAlert?.amountOwed === 'Pending' ? 'Add Amount' : 'Edit Amount')
    : (editingAlert?.notes ? 'Edit Notes' : 'Add Notes');

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96 max-w-90vw">
        <h3 className="text-lg font-semibold mb-4">{title}</h3>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {isAmount ? 'Amount ($)' : 'Notes'}
          </label>
          {isAmount ? (
            <input
              type="number"
              step="0.01"
              value={tempValue}
              onChange={(e) => onValueChange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="0.00"
              autoFocus
            />
          ) : (
            <textarea
              value={tempValue}
              onChange={(e) => onValueChange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={4}
              placeholder="Add notes about this alert..."
              autoFocus
            />
          )}
        </div>
        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onSave}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};
```

### 4. Custom Hook - useCustomerAlerts
```typescript
// hooks/useCustomerAlerts.ts
import { useState } from 'react';

export const useCustomerAlerts = (initialAlerts: Alert[], alertType: 'fuel' | 'damage') => {
  const [alerts, setAlerts] = useState(initialAlerts);
  const [showAmountModal, setShowAmountModal] = useState(false);
  const [showNotesModal, setShowNotesModal] = useState(false);
  const [showUpdateDropdown, setShowUpdateDropdown] = useState<number | null>(null);
  const [editingAlert, setEditingAlert] = useState<Alert | null>(null);
  const [tempAmount, setTempAmount] = useState('');
  const [tempNotes, setTempNotes] = useState('');

  const handleAmountClick = (alert: Alert) => {
    setEditingAlert(alert);
    setTempAmount(alert.amountOwed === 'Pending' ? '' : alert.amountOwed.replace('$', ''));
    setShowAmountModal(true);
  };

  const handleNotesClick = (alert: Alert) => {
    setEditingAlert(alert);
    setTempNotes(alert.notes || '');
    setShowNotesModal(true);
  };

  const handleUpdateClick = (alertId: number) => {
    setShowUpdateDropdown(showUpdateDropdown === alertId ? null : alertId);
  };

  const handleOrderClick = (orderId: string) => {
    console.log(`Navigate to order ${orderId}`);
    // API integration point for navigation
  };

  const handleStatusUpdate = (alertType: string, alertId: number, status: 'paid' | 'uncollectible') => {
    console.log(`Mark alert ${alertId} as ${status}`);
    // API integration point
    setAlerts(prev => prev.filter(alert => alert.id !== alertId));
    setShowUpdateDropdown(null);
  };

  const saveAmount = () => {
    if (editingAlert) {
      const formattedAmount = tempAmount ? `$${parseFloat(tempAmount).toFixed(2)}` : 'Pending';
      // API integration point
      setAlerts(prev => prev.map(alert => 
        alert.id === editingAlert.id 
          ? { ...alert, amountOwed: formattedAmount }
          : alert
      ));
    }
    setShowAmountModal(false);
    setEditingAlert(null);
    setTempAmount('');
  };

  const saveNotes = () => {
    if (editingAlert) {
      // API integration point
      setAlerts(prev => prev.map(alert => 
        alert.id === editingAlert.id 
          ? { ...alert, notes: tempNotes }
          : alert
      ));
    }
    setShowNotesModal(false);
    setEditingAlert(null);
    setTempNotes('');
  };

  const closeAmountModal = () => {
    setShowAmountModal(false);
    setEditingAlert(null);
    setTempAmount('');
  };

  const closeNotesModal = () => {
    setShowNotesModal(false);
    setEditingAlert(null);
    setTempNotes('');
  };

  return {
    alerts,
    modals: {
      showAmountModal,
      showNotesModal,
      showUpdateDropdown
    },
    handlers: {
      handleAmountClick,
      handleNotesClick,
      handleUpdateClick,
      handleOrderClick,
      handleStatusUpdate,
      saveAmount,
      saveNotes,
      closeAmountModal,
      closeNotesModal,
      setTempAmount,
      setTempNotes
    },
    editingAlert,
    tempValues: {
      tempAmount,
      tempNotes
    }
  };
};
```

### 5. Type Definitions
```typescript
// types/Alert.ts
export interface Alert {
  id: number;
  customerName: string;
  orderId: string;
  amountOwed: string;
  date: string;
  type: 'fuel' | 'damage';
  notes: string;
}
```

### 6. Updated Dashboard Usage
```typescript
// pages/Dashboard.tsx (simplified)
import { CustomerAlertsBlock } from '../components/CustomerAlertsBlock';
import { Fuel, AlertTriangle } from 'lucide-react';

const Dashboard = () => {
  // ... other dashboard code

  return (
    <div className="p-6">
      {/* ... other sections */}
      
      {/* Section 2: Customer Alerts */}
      <div className="mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <CustomerAlertsBlock
            title="Fuel Charge Alerts"
            icon={Fuel}
            alertType="fuel"
            color="from-orange-500 to-orange-600"
            initialAlerts={fuelAlerts}
          />
          <CustomerAlertsBlock
            title="New Damage Alerts"
            icon={AlertTriangle}
            alertType="damage"
            color="from-red-500 to-red-600"
            initialAlerts={damageAlerts}
          />
        </div>
      </div>
      
      {/* ... other sections */}
    </div>
  );
};
```

## Benefits of This Structure

### 1. Maintainability
- **Single Responsibility**: Each component has one clear purpose
- **Easy Updates**: Changes to alert logic only affect relevant components
- **Code Reuse**: AlertModal can be used for both amount and notes

### 2. Testing
- **Unit Testing**: Each component can be tested in isolation
- **Mock Data**: Easy to provide test data to individual components
- **Hook Testing**: Business logic in custom hook can be tested separately

### 3. Performance
- **Optimized Renders**: Only affected components re-render on state changes
- **Lazy Loading**: Components can be lazy-loaded if needed
- **Memory Efficiency**: Better garbage collection with smaller components

### 4. Developer Experience
- **Clear Interfaces**: Props and types are well-defined
- **Easy Debugging**: Smaller components are easier to debug
- **Team Collaboration**: Different developers can work on different components

## Migration Strategy

### Phase 1: Extract Components
1. Create component files with current functionality
2. Test components in isolation
3. Ensure all functionality works as expected

### Phase 2: Implement Custom Hook
1. Move state management to custom hook
2. Add API integration points
3. Test hook functionality

### Phase 3: Update Dashboard
1. Replace inline components with extracted components
2. Verify all functionality still works
3. Clean up unused code

### Phase 4: Add Enhancements
1. Add error handling
2. Implement loading states
3. Add accessibility improvements
4. Optimize performance

---

**Extraction Priority**: Medium - Good for long-term maintainability
**Estimated Time**: 1-2 days for full extraction
**Benefits**: Better testing, maintainability, and team collaboration