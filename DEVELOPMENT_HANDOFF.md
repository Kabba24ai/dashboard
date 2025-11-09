# Development Handoff - Customer Alerts Feature

## Quick Start for Developers

### Component Location
- **File**: `src/pages/Dashboard.tsx`
- **Component**: `AlertBlock` and `AlertItem` components within Dashboard
- **Lines**: Approximately 150-400 (Customer Alerts section)

### Key Implementation Details

#### 1. Alert Item Component Structure
```typescript
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
        <button onClick={() => onOrderClick(alert.orderId)} className="flex items-center text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors">
          {alert.orderId}
          <ExternalLink className="w-3 h-3 ml-1" />
        </button>
      </div>
      
      {/* Column 3: Amount Icon */}
      <div className="px-1">
        <button onClick={() => onAmountClick(alert)} className="p-1.5 text-blue-600 hover:text-blue-800 hover:bg-blue-100 rounded transition-colors" title="Edit Amount">
          <DollarSign className="w-4 h-4" />
        </button>
      </div>
      
      {/* Column 4: Mark as Paid Icon */}
      <div className="px-1 relative">
        <button onClick={() => onUpdateClick(alert.id)} className="p-1.5 text-green-600 hover:text-green-800 hover:bg-green-100 rounded transition-colors" title="Update Status">
          <ChevronDown className="w-4 h-4" />
        </button>
        {/* Dropdown menu implementation */}
      </div>
      
      {/* Column 5: Notes Icon */}
      <div className="px-1">
        <button onClick={() => onNotesClick(alert)} className="p-1.5 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded transition-colors" title="Edit Notes">
          <FileText className="w-4 h-4" />
        </button>
      </div>
      
      {/* Column 6: Amount */}
      <div className="flex-shrink-0 text-right min-w-[80px]">
        <span className={`text-sm font-semibold ${alert.amountOwed === 'Pending' ? 'text-orange-600 bg-orange-100 px-2 py-1 rounded-full' : 'text-green-700'}`}>
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
```

#### 2. Event Handlers for API Integration
```typescript
// Amount Management
const handleAmountClick = (alert) => {
  setEditingAlert(alert);
  setTempAmount(alert.amountOwed === 'Pending' ? '' : alert.amountOwed.replace('$', ''));
  setShowAmountModal(true);
};

const saveAmount = () => {
  if (editingAlert) {
    const formattedAmount = tempAmount ? `$${parseFloat(tempAmount).toFixed(2)}` : 'Pending';
    
    // API Integration Point
    // await updateAlertAmount(editingAlert.type, editingAlert.id, formattedAmount);
    
    if (editingAlert.type === 'fuel') {
      setFuelAlerts(prev => prev.map(alert => 
        alert.id === editingAlert.id ? { ...alert, amountOwed: formattedAmount } : alert
      ));
    } else {
      setDamageAlerts(prev => prev.map(alert => 
        alert.id === editingAlert.id ? { ...alert, amountOwed: formattedAmount } : alert
      ));
    }
  }
  setShowAmountModal(false);
  setEditingAlert(null);
  setTempAmount('');
};

// Status Updates
const handleStatusUpdate = (alertType: 'fuel' | 'damage', alertId: number, status: 'paid' | 'uncollectible') => {
  // API Integration Point
  // await updateAlertStatus(alertType, alertId, status);
  
  console.log(`Mark alert ${alertId} as ${status}`);
  
  if (alertType === 'fuel') {
    setFuelAlerts(prev => prev.filter(alert => alert.id !== alertId));
  } else {
    setDamageAlerts(prev => prev.filter(alert => alert.id !== alertId));
  }
  setShowUpdateDropdown(null);
};

// Notes Management
const handleNotesClick = (alert) => {
  setEditingAlert(alert);
  setTempNotes(alert.notes || '');
  setShowNotesModal(true);
};

const saveNotes = () => {
  if (editingAlert) {
    // API Integration Point
    // await updateAlertNotes(editingAlert.type, editingAlert.id, tempNotes);
    
    if (editingAlert.type === 'fuel') {
      setFuelAlerts(prev => prev.map(alert => 
        alert.id === editingAlert.id ? { ...alert, notes: tempNotes } : alert
      ));
    } else {
      setDamageAlerts(prev => prev.map(alert => 
        alert.id === editingAlert.id ? { ...alert, notes: tempNotes } : alert
      ));
    }
  }
  setShowNotesModal(false);
  setEditingAlert(null);
  setTempNotes('');
};

// Order Navigation
const handleOrderClick = (orderId: string) => {
  // API Integration Point
  // navigate(`/orders/${orderId}`);
  
  console.log(`Navigate to order ${orderId}`);
};
```

#### 3. Modal Components
```typescript
// Amount Modal
{showAmountModal && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white rounded-lg p-6 w-96 max-w-90vw">
      <h3 className="text-lg font-semibold mb-4">
        {editingAlert?.amountOwed === 'Pending' ? 'Add Amount' : 'Edit Amount'}
      </h3>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Amount ($)</label>
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
        <button onClick={() => setShowAmountModal(false)} className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors">Cancel</button>
        <button onClick={saveAmount} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">Save</button>
      </div>
    </div>
  </div>
)}

// Notes Modal
{showNotesModal && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white rounded-lg p-6 w-96 max-w-90vw">
      <h3 className="text-lg font-semibold mb-4">
        {editingAlert?.notes ? 'Edit Notes' : 'Add Notes'}
      </h3>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
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
        <button onClick={() => setShowNotesModal(false)} className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors">Cancel</button>
        <button onClick={saveNotes} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">Save</button>
      </div>
    </div>
  </div>
)}
```

### Required Dependencies
```json
{
  "lucide-react": "^0.294.0" // For icons: DollarSign, ChevronDown, FileText, ExternalLink
}
```

### State Variables Needed
```typescript
// Alert data
const [fuelAlerts, setFuelAlerts] = useState(initialFuelAlerts);
const [damageAlerts, setDamageAlerts] = useState(initialDamageAlerts);

// Modal states
const [showAmountModal, setShowAmountModal] = useState(false);
const [showNotesModal, setShowNotesModal] = useState(false);
const [showUpdateDropdown, setShowUpdateDropdown] = useState(null);

// Editing states
const [editingAlert, setEditingAlert] = useState(null);
const [tempAmount, setTempAmount] = useState('');
const [tempNotes, setTempNotes] = useState('');
```

### CSS Classes Used
- **Layout**: `flex`, `items-center`, `justify-between`, `flex-1`, `min-w-0`, `px-1`, `px-2`, `px-3`
- **Styling**: `bg-gray-50`, `rounded-lg`, `border`, `hover:bg-gray-100`, `transition-colors`
- **Typography**: `text-sm`, `font-semibold`, `text-gray-800`, `truncate`
- **Colors**: `text-blue-600`, `text-green-600`, `text-gray-600`, `bg-orange-100`, `text-orange-600`
- **Spacing**: `p-3`, `p-1.5`, `min-w-[80px]`

### API Endpoints to Implement
```typescript
// Update alert amount
PUT /api/alerts/{alertId}/amount
Request: { amount: string }
Response: { success: boolean, alert: Alert }

// Update alert status  
PUT /api/alerts/{alertId}/status
Request: { status: 'paid' | 'uncollectible' }
Response: { success: boolean }

// Update alert notes
PUT /api/alerts/{alertId}/notes  
Request: { notes: string }
Response: { success: boolean, alert: Alert }

// Get order details
GET /api/orders/{orderId}
Response: { order: Order }
```

### Error Handling Structure
```typescript
const handleApiError = (error, action) => {
  console.error(`Failed to ${action}:`, error);
  // Show toast notification or error modal
  // Revert optimistic UI updates if needed
};

// Usage in API calls
try {
  await updateAlertAmount(alertId, amount);
  // Update UI optimistically
} catch (error) {
  handleApiError(error, 'update amount');
  // Revert UI changes
}
```

### Testing Checklist
- [ ] Amount modal opens with correct title based on current state
- [ ] Amount formatting works correctly (adds $ and 2 decimals)
- [ ] Status dropdown shows both options and removes alert on selection
- [ ] Notes modal saves and displays notes correctly
- [ ] Order ID links are clickable and log correct order ID
- [ ] All hover states work properly
- [ ] Mobile responsive layout functions correctly
- [ ] Keyboard navigation works for accessibility
- [ ] Error states handle API failures gracefully

### Performance Notes
- Component renders efficiently with proper key props
- State updates are batched appropriately
- No unnecessary re-renders on modal open/close
- Alert list scrolling performs well with large datasets

---

**Ready for Development** ✅
**Estimated Development Time**: 2-3 days
**Priority**: High - Core business functionality