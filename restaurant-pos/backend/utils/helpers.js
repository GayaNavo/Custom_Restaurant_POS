/**
 * Helper functions for the Restaurant POS system
 */

/**
 * Generate receipt template based on business settings
 */
const generateReceiptTemplate = (orderData, businessSettings = {}) => {
  const {
    orderNumber,
    date,
    customer,
    items,
    subtotal,
    tax,
    discount,
    total,
    status,
    orderType,
    tableNumber
  } = orderData;

  // Default business settings
  const settings = {
    businessName: businessSettings.businessName || 'Restaurant Name',
    address: businessSettings.address || '123 Restaurant St.',
    phone: businessSettings.phone || '(555) 123-4567',
    taxId: businessSettings.taxId || '123-456-789',
    thankYouMessage: businessSettings.thankYouMessage || 'Thank you for dining with us!',
    customMessage: businessSettings.customMessage || 'Come again soon!',
    logo: businessSettings.logo || null,
    ...businessSettings
  };

  // Create receipt object
  const receipt = {
    header: {
      businessName: settings.businessName,
      address: settings.address,
      phone: settings.phone,
      taxId: settings.taxId
    },
    orderDetails: {
      orderNumber,
      date: new Date(date).toLocaleString(),
      tableNumber: tableNumber || 'N/A',
      orderType: orderType.toUpperCase(),
      customer: customer ? `${customer.firstName} ${customer.lastName}` : 'Walk-in Customer'
    },
    items: items.map(item => ({
      name: item.name || item.menuItem?.name,
      quantity: item.quantity,
      price: item.price,
      total: item.total || (item.price * item.quantity)
    })),
    totals: {
      subtotal: parseFloat(subtotal).toFixed(2),
      tax: parseFloat(tax).toFixed(2),
      discount: parseFloat(discount || 0).toFixed(2),
      total: parseFloat(total).toFixed(2)
    },
    footer: {
      thankYouMessage: settings.thankYouMessage,
      customMessage: settings.customMessage
    },
    status,
    timestamp: new Date().toISOString()
  };

  return receipt;
};

/**
 * Generate KOT (Kitchen Order Ticket) template
 */
const generateKOTTemplate = (orderData) => {
  const {
    orderNumber,
    createdAt,
    customer,
    items,
    tableNumber,
    orderType
  } = orderData;

  const kot = {
    ticketType: 'KITCHEN ORDER TICKET',
    orderNumber,
    timestamp: new Date(createdAt).toLocaleString(),
    customerName: customer ? `${customer.firstName} ${customer.lastName}` : 'Walk-in Customer',
    tableNumber: tableNumber || 'N/A',
    orderType: orderType.toUpperCase(),
    items: items.map(item => ({
      name: item.name || item.menuItem?.name,
      quantity: item.quantity,
      specialInstructions: item.specialInstructions || item.specialInstructions || ''
    })),
    priority: 'NORMAL' // Could be HIGH, NORMAL, LOW based on business rules
  };

  return kot;
};

/**
 * Format currency based on locale
 */
const formatCurrency = (amount, locale = 'en-US', currency = 'USD') => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency
  }).format(amount);
};

/**
 * Validate email format
 */
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Generate order number
 */
const generateOrderNumber = () => {
  return `ORD${Date.now()}`;
};

module.exports = {
  generateReceiptTemplate,
  generateKOTTemplate,
  formatCurrency,
  isValidEmail,
  generateOrderNumber
};