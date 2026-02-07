const Order = require('../models/Order');
const MenuItem = require('../models/MenuItem');

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private
const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({})
      .populate('customer', 'firstName lastName email phone')
      .populate('items.menuItem', 'name price')
      .sort({ createdAt: -1 });
    
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single order
// @route   GET /api/orders/:id
// @access  Private
const getOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('customer', 'firstName lastName email phone')
      .populate('items.menuItem', 'name price');

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const createOrder = async (req, res) => {
  try {
    const { customer, items, tableNumber, orderType, discount = 0 } = req.body;

    // Validate items and calculate totals
    let subtotal = 0;
    const orderItems = [];

    for (const item of items) {
      const menuItem = await MenuItem.findById(item.menuItem);
      
      if (!menuItem) {
        return res.status(400).json({ message: `Menu item with ID ${item.menuItem} not found` });
      }

      const itemTotal = menuItem.price * item.quantity;
      subtotal += itemTotal;

      orderItems.push({
        menuItem: item.menuItem,
        quantity: item.quantity,
        price: menuItem.price,
        specialInstructions: item.specialInstructions
      });
    }

    // Calculate tax (assuming 10% tax rate)
    const taxRate = 0.10;
    const tax = subtotal * taxRate;
    const total = subtotal + tax - discount;

    // Generate order number (simple implementation)
    const orderNumber = `ORD${Date.now()}`;

    const order = new Order({
      orderNumber,
      customer,
      items: orderItems,
      subtotal,
      tax,
      discount,
      total,
      tableNumber,
      orderType
    });

    const createdOrder = await order.save();
    
    // Populate the created order before sending response
    const populatedOrder = await Order.findById(createdOrder._id)
      .populate('customer', 'firstName lastName email phone')
      .populate('items.menuItem', 'name price');

    res.status(201).json(populatedOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update order
// @route   PUT /api/orders/:id
// @access  Private
const updateOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Update order fields
    Object.keys(req.body).forEach(key => {
      if (key !== 'items' && key !== 'subtotal' && key !== 'tax' && key !== 'total') {
        // Don't allow direct updates to calculated fields
        order[key] = req.body[key];
      }
    });

    // If items are being updated, recalculate totals
    if (req.body.items) {
      let subtotal = 0;
      const orderItems = [];

      for (const item of req.body.items) {
        const menuItem = await MenuItem.findById(item.menuItem);
        
        if (!menuItem) {
          return res.status(400).json({ message: `Menu item with ID ${item.menuItem} not found` });
        }

        const itemTotal = menuItem.price * item.quantity;
        subtotal += itemTotal;

        orderItems.push({
          menuItem: item.menuItem,
          quantity: item.quantity,
          price: menuItem.price,
          specialInstructions: item.specialInstructions
        });
      }

      // Recalculate tax and total
      const taxRate = 0.10;
      const tax = subtotal * taxRate;
      const total = subtotal + tax - (req.body.discount || order.discount);

      order.items = orderItems;
      order.subtotal = subtotal;
      order.tax = tax;
      order.total = total;
    }

    const updatedOrder = await order.save();
    
    // Populate the updated order before sending response
    const populatedOrder = await Order.findById(updatedOrder._id)
      .populate('customer', 'firstName lastName email phone')
      .populate('items.menuItem', 'name price');

    res.json(populatedOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete order
// @route   DELETE /api/orders/:id
// @access  Private
const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    await order.remove();
    res.json({ message: 'Order removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update order status
// @route   PUT /api/orders/:id/status
// @access  Private
const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const allowedStatuses = ['pending', 'in-progress', 'ready', 'completed', 'cancelled'];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    order.status = status;
    const updatedOrder = await order.save();

    // Populate the updated order before sending response
    const populatedOrder = await Order.findById(updatedOrder._id)
      .populate('customer', 'firstName lastName email phone')
      .populate('items.menuItem', 'name price');

    res.json(populatedOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getOrders,
  getOrder,
  createOrder,
  updateOrder,
  deleteOrder,
  updateOrderStatus
};