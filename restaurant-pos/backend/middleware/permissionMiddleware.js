const User = require('../models/User');

// Permission constants
const PERMISSIONS = {
  // Customer permissions
  VIEW_CUSTOMERS: 'view_customers',
  MANAGE_CUSTOMERS: 'manage_customers',
  
  // User permissions
  VIEW_USERS: 'view_users',
  MANAGE_USERS: 'manage_users',
  
  // Menu permissions
  VIEW_MENU: 'view_menu',
  MANAGE_MENU: 'manage_menu',
  
  // Stock permissions
  VIEW_STOCK: 'view_stock',
  MANAGE_STOCK: 'manage_stock',
  
  // Order permissions
  VIEW_ORDERS: 'view_orders',
  MANAGE_ORDERS: 'manage_orders',
  
  // Receipt permissions
  GENERATE_RECEIPTS: 'generate_receipts',
  CUSTOMIZE_RECEIPTS: 'customize_receipts'
};

const checkPermission = (requiredPermission) => {
  return async (req, res, next) => {
    try {
      // Check if user has the required permission
      if (!req.user.permissions.includes(requiredPermission)) {
        return res.status(403).json({ 
          message: `Access denied. Required permission: ${requiredPermission}` 
        });
      }
      
      next();
    } catch (error) {
      return res.status(500).json({ message: 'Server error' });
    }
  };
};

module.exports = {
  PERMISSIONS,
  checkPermission
};