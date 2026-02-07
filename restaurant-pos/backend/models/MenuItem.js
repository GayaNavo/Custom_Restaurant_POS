const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  category: {
    type: String,
    required: true,
    trim: true
  },
  image: {
    type: String,
    trim: true
  },
  isAvailable: {
    type: Boolean,
    default: true
  },
  ingredients: [{
    type: String,
    trim: true
  }],
  preparationTime: {
    type: Number, // in minutes
    default: 15
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('MenuItem', menuItemSchema);