// Utility functions for formatting data

/**
 * Format date to dd/MM/yyyy format
 * @param {string|Date} date - Date string or Date object
 * @returns {string} Formatted date string in dd/MM/yyyy format
 */
export const formatDate = (date) => {
  if (!date || date === '—' || date === '-') return '—';
  
  try {
    let dateObj;
    
    // If it's already in dd/MM/yy or dd/MM/yyyy format, return as is or convert
    if (typeof date === 'string' && /^\d{2}\/\d{2}\/\d{2,4}$/.test(date)) {
      const parts = date.split('/');
      if (parts[2].length === 2) {
        // Convert yy to yyyy
        return `${parts[0]}/${parts[1]}/20${parts[2]}`;
      }
      return date;
    }
    
    // If it's in "13 Jan 2026" format, convert to dd/MM/yyyy
    if (typeof date === 'string' && /^\d{1,2}\s+\w{3}\s+\d{4}$/.test(date)) {
      dateObj = new Date(date);
    } else if (typeof date === 'string') {
      dateObj = new Date(date);
    } else {
      dateObj = date;
    }
    
    if (isNaN(dateObj.getTime())) {
      return date; // Return original if invalid
    }
    
    const day = String(dateObj.getDate()).padStart(2, '0');
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const year = dateObj.getFullYear();
    
    return `${day}/${month}/${year}`;
  } catch (error) {
    return date; // Return original if error
  }
};

/**
 * Format billing cycle text
 * @param {string} cycle - Billing cycle value
 * @returns {string} Formatted billing cycle text
 */
export const formatBillingCycle = (cycle) => {
  if (!cycle || cycle === '—' || cycle === '-') return '—';
  
  const cycleMap = {
    'one_time': 'One time',
    'One Time': 'One time',
    'Monthly': 'Monthly',
    'Quarterly': 'Quarterly',
    'Semester': 'Semester',
    'Installment': 'Installment'
  };
  
  return cycleMap[cycle] || cycle;
};

/**
 * Format payment method text
 * @param {string} method - Payment method value
 * @returns {string} Formatted payment method text
 */
export const formatPaymentMethod = (method) => {
  if (!method || method === '—' || method === '-') return '—';
  
  const methodMap = {
    'PayNow': 'Account Balance',
    'Account Balance': 'Account Balance',
    'Bank Transfer': 'Bank Transfer',
    'Credit Card': 'Credit Card',
    'Giro': 'Giro',
    'GrabPay': 'GrabPay'
  };
  
  return methodMap[method] || method;
};

/**
 * Format status text by adding spaces between words
 * @param {string} status - Status value (e.g., "NotInSchool", "PostSecondary")
 * @returns {string} Formatted status text with spaces
 */
export const formatStatus = (status) => {
  if (!status || status === '—' || status === '-') return '—';
  
  // Add space before capital letters (camelCase to Title Case)
  return status.replace(/([A-Z])/g, ' $1').trim();
};
