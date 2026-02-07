const express = require('express');
const router = express.Router();
const { getCustomers, getCustomer, createCustomer, updateCustomer, deleteCustomer } = require('../controllers/customerController');
const auth = require('../middleware/authMiddleware');
const { checkPermission, PERMISSIONS } = require('../middleware/permissionMiddleware');

// Apply auth middleware to all routes
router.use(auth);

// Apply permission checks based on route
router.route('/')
  .get(checkPermission(PERMISSIONS.VIEW_CUSTOMERS), getCustomers)
  .post(checkPermission(PERMISSIONS.MANAGE_CUSTOMERS), createCustomer);

router.route('/:id')
  .get(checkPermission(PERMISSIONS.VIEW_CUSTOMERS), getCustomer)
  .put(checkPermission(PERMISSIONS.MANAGE_CUSTOMERS), updateCustomer)
  .delete(checkPermission(PERMISSIONS.MANAGE_CUSTOMERS), deleteCustomer);

module.exports = router;