const express = require('express');
const router = express.Router();
const { getMenuItems, getAllMenuItems, getMenuItem, createMenuItem, updateMenuItem, deleteMenuItem } = require('../controllers/menuController');
const auth = require('../middleware/authMiddleware');
const { checkPermission, PERMISSIONS } = require('../middleware/permissionMiddleware');

// Apply auth middleware to all routes
router.use(auth);

// Public route for active menu items
router.route('/').get(getMenuItems);

// Protected routes with permissions
router.route('/admin')
  .get(checkPermission(PERMISSIONS.VIEW_MENU), getAllMenuItems);

router.route('/:id')
  .get(getMenuItem);

// Admin routes for menu management
router.route('/')
  .post(checkPermission(PERMISSIONS.MANAGE_MENU), createMenuItem);

router.route('/:id')
  .put(checkPermission(PERMISSIONS.MANAGE_MENU), updateMenuItem)
  .delete(checkPermission(PERMISSIONS.MANAGE_MENU), deleteMenuItem);

module.exports = router;