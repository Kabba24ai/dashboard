# Customer Alerts Feature Specification

## Overview
The Customer Alerts system provides administrators with a streamlined interface to manage fuel charges and damage alerts from customers. This specification documents the final approved design and functionality.

## Visual Layout

### Alert Block Structure
Each alert block (Fuel Charge Alerts, New Damage Alerts) contains:
- **Header**: Icon, title, alert count, and active status badge
- **Alert List**: Scrollable list of individual alerts (max height with overflow)
- **Empty State**: "All Clear" message when no alerts present

### Individual Alert Layout (Single Row - 6 Columns)
Each alert displays on a single row with the following columns:

| Column | Content | Width | Alignment | Functionality |
|--------|---------|-------|-----------|---------------|
| 1 | Customer Name | flex-1 | Left | Display only |
| 2 | Order ID | flex-1 | Left | Clickable link with external icon |
| 3 | Amount Icon | Fixed | Center | Dollar sign button - opens amount modal |
| 4 | Update Icon | Fixed | Center | Dropdown button - mark as paid/uncollectible |
| 5 | Notes Icon | Fixed | Center | File text button - opens notes modal |
| 6 | Amount Value | min-w-[80px] | Right | "Pending" or "$XX.XX" display |

### Notes Display
- **Conditional**: Only shows when notes exist
- **Position**: Below the main row
- **Styling**: Blue background with border
- **Format**: "Notes: [note content]"

## Functionality Specifications

### 1. Amount Management
**Trigger**: Click dollar sign icon (Column 3)
**Modal**: "Add Amount" or "Edit Amount" based on current state
**Behavior**:
- If current amount is "Pending" → "Add Amount" modal
- If current amount has value → "Edit Amount" modal with pre-filled value
- Input validation: Numbers only, 2 decimal places
- Auto-formatting: Adds "$" prefix and formats to currency
- **Important**: Does NOT remove alert from list

### 2. Status Updates
**Trigger**: Click dropdown icon (Column 4)
**Dropdown Options**:
- "Mark as Paid" → Removes alert from list
- "Mark as Uncollectible" → Removes alert from list
**Behavior**:
- Immediate action (no confirmation dialog)
- Alert removed from UI instantly
- Console logs action for API integration

### 3. Notes Management
**Trigger**: Click notes icon (Column 5)
**Modal**: "Add Notes" or "Edit Notes" based on current state
**Behavior**:
- Textarea input for multi-line notes
- Saves notes to alert object
- Notes display below main row when present
- **Important**: Does NOT remove alert from list

### 4. Order Navigation
**Trigger**: Click Order ID link (Column 2)
**Behavior**: 
- Console logs order ID for navigation
- Ready for integration with order detail page

## Data Structure

### Alert Object
```typescript
interface Alert {
  id: number;
  customerName: string;
  orderId: string;
  amountOwed: string; // "Pending" or "$XX.XX"
  date: string; // Not displayed but kept for data integrity
  type: 'fuel' | 'damage';
  notes: string; // Optional, empty string if no notes
}
```

### Sample Data
```typescript
// Fuel Alerts
const fuelAlerts = [
  {
    id: 1,
    customerName: 'ABC Events LLC',
    orderId: 'ORD-2024-001',
    amountOwed: 'Pending',
    date: '2024-01-27',
    type: 'fuel',
    notes: ''
  },
  {
    id: 2,
    customerName: 'Wedding Bliss Co',
    orderId: 'ORD-2024-002',
    amountOwed: '$45.00',
    date: '2024-01-26',
    type: 'fuel',
    notes: 'Customer disputed charge initially'
  }
  // ... more alerts
];

// Damage Alerts
const damageAlerts = [
  {
    id: 1,
    customerName: 'Luxury Events Co',
    orderId: 'ORD-2024-007',
    amountOwed: '$150.00',
    date: '2024-01-27',
    type: 'damage',
    notes: 'Tablecloth stain - professional cleaning required'
  }
  // ... more alerts
];
```

## State Management

### Modal States
```typescript
const [showAmountModal, setShowAmountModal] = useState(false);
const [showNotesModal, setShowNotesModal] = useState(false);
const [showUpdateDropdown, setShowUpdateDropdown] = useState(null);
const [editingAlert, setEditingAlert] = useState(null);
const [tempAmount, setTempAmount] = useState('');
const [tempNotes, setTempNotes] = useState('');
```

### Alert States
```typescript
const [fuelAlerts, setFuelAlerts] = useState(initialFuelAlerts);
const [damageAlerts, setDamageAlerts] = useState(initialDamageAlerts);
```

## API Integration Points

### Required Endpoints
```typescript
// Update alert amount
PUT /api/alerts/{alertId}/amount
Body: { amount: string }

// Update alert status
PUT /api/alerts/{alertId}/status  
Body: { status: 'paid' | 'uncollectible' }

// Update alert notes
PUT /api/alerts/{alertId}/notes
Body: { notes: string }

// Navigate to order
GET /orders/{orderId}
```

### Event Handlers Ready for Integration
```typescript
const handleAmountClick = (alert) => {
  // Opens modal for amount editing
};

const handleStatusUpdate = (alertType, alertId, status) => {
  // API call to update status
  // Remove from UI on success
};

const handleNotesClick = (alert) => {
  // Opens modal for notes editing
};

const handleOrderClick = (orderId) => {
  // Navigate to order details page
};
```

## Styling Specifications

### Colors
- **Fuel Alerts**: Orange theme (`from-orange-500 to-orange-600`)
- **Damage Alerts**: Red theme (`from-red-500 to-red-600`)
- **Action Icons**: Blue (amount), Green (update), Gray (notes)
- **Amount Display**: 
  - "Pending": Orange background (`bg-orange-100 text-orange-600`)
  - Dollar amount: Green text (`text-green-700`)

### Spacing
- **Alert padding**: `p-3` (12px)
- **Icon spacing**: `px-1` between icons
- **Column spacing**: `px-2` for middle columns
- **Notes margin**: `px-3 pb-3` below main row

### Responsive Behavior
- **Mobile**: Single column layout maintained
- **Desktop**: Full 6-column layout
- **Overflow**: Scrollable alert list with max height

## User Experience Features

### Visual Feedback
- **Hover effects**: All clickable elements have hover states
- **Loading states**: Ready for API integration
- **Error handling**: Structure in place for error messages
- **Tooltips**: Icon buttons have title attributes

### Accessibility
- **Keyboard navigation**: All interactive elements focusable
- **Screen readers**: Proper ARIA labels and semantic HTML
- **Color contrast**: Meets WCAG guidelines
- **Focus indicators**: Visible focus states

## Performance Considerations
- **Efficient rendering**: Only shows first 5 alerts with "+X more" indicator
- **State optimization**: Minimal re-renders on updates
- **Memory management**: Proper cleanup of event listeners

## Testing Scenarios

### Amount Management
1. Click amount icon on "Pending" alert → Should show "Add Amount" modal
2. Enter valid amount → Should format as currency and update display
3. Click amount icon on existing amount → Should show "Edit Amount" modal with pre-filled value
4. Cancel modal → Should not change amount
5. Save empty amount → Should revert to "Pending"

### Status Updates
1. Click update dropdown → Should show "Mark as Paid" and "Mark as Uncollectible" options
2. Select "Mark as Paid" → Should remove alert from list immediately
3. Select "Mark as Uncollectible" → Should remove alert from list immediately
4. Click outside dropdown → Should close without action

### Notes Management
1. Click notes icon on alert without notes → Should show "Add Notes" modal
2. Click notes icon on alert with notes → Should show "Edit Notes" modal with existing content
3. Save notes → Should display blue notes box below alert
4. Clear notes → Should remove notes display

### Order Navigation
1. Click order ID link → Should log order ID to console
2. External link icon should be visible
3. Link should have proper hover state

## Implementation Priority
1. **High**: Amount management, Status updates
2. **Medium**: Notes management, Order navigation
3. **Low**: Advanced filtering, Bulk operations

---

**Status**: ✅ Approved Design - Ready for Development
**Last Updated**: January 27, 2025
**Version**: 2.0 - Single Row Layout