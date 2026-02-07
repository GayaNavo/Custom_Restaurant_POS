const express = require('express');
const router = express.Router();
const { getUsers, getUser, createUser, updateUser, deleteUser, updateUserPermissions } = require('../controllers/userController');
const auth = require('../middleware/authMiddleware');
const { checkPermission, PERMISSIONS } = require('../middleware/permissionMiddleware');

// Apply auth middleware to all routes
router.use(auth);

// Apply permission checks based on route
router.route('/')
  .get(checkPermission(PERMISSIONS.VIEW_USERS), getUsers)
  .post(checkPermission(PERMISSIONS.MANAGE_USERS), createUser);

router.route('/:id')
  .get(checkPermission(PERMISSIONS.VIEW_USERS), getUser)
  .put(checkPermission(PERMISSIONS.MANAGE_USERS), updateUser)
  .delete(checkPermission(PERMISSIONS.MANAGE_USERS), deleteUser);

router.route('/:id/permissions')
  .put(checkPermission(PERMISSIONS.MANAGE_USERS), updateUserPermissions);

module.exports = router;