const express = require('express');
const router = express.Router();
const { getOrders, getOrder, createOrder, updateOrder, deleteOrder, updateOrderStatus } = require('../controllers/orderController');
const auth = require('../middleware/authMiddleware');
const { checkPermission, PERMISSIONS } = require('../middleware/permissionMiddleware');

// Apply auth middleware to all routes
router.use(auth);

// Apply permission checks based on route
router.route('/')
  .get(checkPermission(PERMISSIONS.VIEW_ORDERS), getOrders)
  .post(checkPermission(PERMISSIONS.MANAGE_ORDERS), createOrder);

router.route('/:id')
  .get(checkPermission(PERMISSIONS.VIEW_ORDERS), getOrder)
  .put(checkPermission(PERMISSIONS.MANAGE_ORDERS), updateOrder)
  .delete(checkPermission(PERMISSIONS.MANAGE_ORDERS), deleteOrder);

router.route('/:id/status')
  .put(checkPermission(PERMISSIONS.MANAGE_ORDERS), updateOrderStatus);

module.exports = router;