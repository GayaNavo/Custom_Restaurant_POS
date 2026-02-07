const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  menuItem: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'MenuItem',
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  specialInstructions: {
    type: String,
    trim: true
  }
});

const orderSchema = new mongoose.Schema({
  orderNumber: {
    type: String,
    required: true,
    unique: true
  },
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer'
  },
  items: [orderItemSchema],
  subtotal: {
    type: Number,
    required: true,
    min: 0
  },
  tax: {
    type: Number,
    default: 0
  },
  discount: {
    type: Number,
    default: 0
  },
  total: {
    type: Number,
    required: true,
    min: 0
  },
  status: {
    type: String,
    required: true,
    enum: ['pending', 'in-progress', 'ready', 'completed', 'cancelled'],
    default: 'pending'
  },
  tableNumber: {
    type: String,
    trim: true
  },
  orderType: {
    type: String,
    required: true,
    enum: ['dine-in', 'takeout', 'delivery'],
    default: 'dine-in'
  },
  paymentMethod: {
    type: String,
    enum: ['cash', 'card', 'mobile-payment', 'other']
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'partially-paid', 'failed'],
    default: 'pending'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Order', orderSchema);