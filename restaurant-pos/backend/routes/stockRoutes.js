const express = require('express');
const router = express.Router();
const { getStockItems, getStockItem, createStockItem, updateStockItem, deleteStockItem, updateStockQuantity, getLowStockItems } = require('../controllers/stockController');
const auth = require('../middleware/authMiddleware');
const { checkPermission, PERMISSIONS } = require('../middleware/permissionMiddleware');

// Apply auth middleware to all routes
router.use(auth);

// Apply permission checks based on route
router.route('/')
  .get(checkPermission(PERMISSIONS.VIEW_STOCK), getStockItems)
  .post(checkPermission(PERMISSIONS.MANAGE_STOCK), createStockItem);

router.route('/:id')
  .get(checkPermission(PERMISSIONS.VIEW_STOCK), getStockItem)
  .put(checkPermission(PERMISSIONS.MANAGE_STOCK), updateStockItem)
  .delete(checkPermission(PERMISSIONS.MANAGE_STOCK), deleteStockItem);

router.route('/:id/quantity')
  .put(checkPermission(PERMISSIONS.MANAGE_STOCK), updateStockQuantity);

router.route('/low-stock')
  .get(checkPermission(PERMISSIONS.VIEW_STOCK), getLowStockItems);

module.exports = router;