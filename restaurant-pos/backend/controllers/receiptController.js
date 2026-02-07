const Order = require('../models/Order');
const { generateReceiptTemplate, generateKOTTemplate } = require('../utils/helpers');

// @desc    Generate receipt for an order
// @route   GET /api/receipts/:id
// @access  Private
const generateReceipt = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('customer', 'firstName lastName email phone')
      .populate('items.menuItem', 'name price');

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Create receipt object using helper function
    const receipt = generateReceiptTemplate({
      orderNumber: order.orderNumber,
      date: order.createdAt,
      customer: order.customer,
      items: order.items,
      subtotal: order.subtotal,
      tax: order.tax,
      discount: order.discount,
      total: order.total,
      status: order.status,
      orderType: order.orderType,
      tableNumber: order.tableNumber || 'N/A'
    });

    res.json(receipt);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Generate KOT (Kitchen Order Ticket) for an order
// @route   GET /api/receipts/:id/kot
// @access  Private
const generateKOT = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('customer', 'firstName lastName')
      .populate('items.menuItem', 'name');

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Create KOT object using helper function
    const kot = generateKOTTemplate({
      orderNumber: order.orderNumber,
      createdAt: order.createdAt,
      customer: order.customer,
      items: order.items,
      tableNumber: order.tableNumber || 'N/A',
      orderType: order.orderType
    });

    res.json(kot);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  generateReceipt,
  generateKOT
};