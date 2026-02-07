const express = require('express');
const router = express.Router();
const { generateReceipt, generateKOT } = require('../controllers/receiptController');
const { getReceiptSettings, updateReceiptSettings, generateCustomizedReceipt } = require('../controllers/receiptCustomizationController');
const auth = require('../middleware/authMiddleware');
const { checkPermission, PERMISSIONS } = require('../middleware/permissionMiddleware');

// Apply auth middleware to all routes
router.use(auth);

// Apply permission checks for receipt generation
router.route('/:id')
  .get(checkPermission(PERMISSIONS.GENERATE_RECEIPTS), generateReceipt);

router.route('/:id/kot')
  .get(checkPermission(PERMISSIONS.GENERATE_RECEIPTS), generateKOT);

// Receipt customization routes
router.route('/settings')
  .get(checkPermission(PERMISSIONS.CUSTOMIZE_RECEIPTS), getReceiptSettings)
  .put(checkPermission(PERMISSIONS.CUSTOMIZE_RECEIPTS), updateReceiptSettings);

router.route('/generate')
  .post(checkPermission(PERMISSIONS.GENERATE_RECEIPTS), generateCustomizedReceipt);

module.exports = router;