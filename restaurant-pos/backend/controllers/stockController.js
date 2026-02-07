const StockItem = require('../models/StockItem');

// @desc    Get all stock items
// @route   GET /api/stock
// @access  Private
const getStockItems = async (req, res) => {
  try {
    const stockItems = await StockItem.find({}).sort({ name: 1 });
    res.json(stockItems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single stock item
// @route   GET /api/stock/:id
// @access  Private
const getStockItem = async (req, res) => {
  try {
    const stockItem = await StockItem.findById(req.params.id);

    if (!stockItem) {
      return res.status(404).json({ message: 'Stock item not found' });
    }

    res.json(stockItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create new stock item
// @route   POST /api/stock
// @access  Private
const createStockItem = async (req, res) => {
  try {
    const { name, type, description, brand, category, image, unit, costPrice, sellingPrice, originalPrice, supplier } = req.body;

    // Check if stock item already exists
    const existingItem = await StockItem.findOne({ name });

    if (existingItem) {
      return res.status(400).json({ message: 'Stock item with this name already exists' });
    }

    const stockItem = new StockItem({
      name,
      type,
      description,
      brand,
      category,
      image,
      unit,
      costPrice,
      sellingPrice,
      originalPrice,
      supplier
    });

    const createdStockItem = await stockItem.save();
    res.status(201).json(createdStockItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update stock item
// @route   PUT /api/stock/:id
// @access  Private
const updateStockItem = async (req, res) => {
  try {
    const stockItem = await StockItem.findById(req.params.id);

    if (!stockItem) {
      return res.status(404).json({ message: 'Stock item not found' });
    }

    // Update stock item fields
    Object.keys(req.body).forEach(key => {
      stockItem[key] = req.body[key];
    });

    const updatedStockItem = await stockItem.save();
    res.json(updatedStockItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete stock item
// @route   DELETE /api/stock/:id
// @access  Private
const deleteStockItem = async (req, res) => {
  try {
    const stockItem = await StockItem.findById(req.params.id);

    if (!stockItem) {
      return res.status(404).json({ message: 'Stock item not found' });
    }

    await stockItem.remove();
    res.json({ message: 'Stock item removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update stock quantity
// @route   PUT /api/stock/:id/quantity
// @access  Private
const updateStockQuantity = async (req, res) => {
  try {
    const { quantity, operation } = req.body; // operation: 'add', 'subtract', 'set'
    const stockItem = await StockItem.findById(req.params.id);

    if (!stockItem) {
      return res.status(404).json({ message: 'Stock item not found' });
    }

    if (operation === 'add') {
      stockItem.quantity += parseInt(quantity);
    } else if (operation === 'subtract') {
      stockItem.quantity -= parseInt(quantity);
      // Ensure quantity doesn't go below 0
      if (stockItem.quantity < 0) stockItem.quantity = 0;
    } else if (operation === 'set') {
      stockItem.quantity = parseInt(quantity);
    } else {
      return res.status(400).json({ message: 'Invalid operation. Use add, subtract, or set.' });
    }

    const updatedStockItem = await stockItem.save();
    res.json(updatedStockItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get low stock items
// @route   GET /api/stock/low-stock
// @access  Private
const getLowStockItems = async (req, res) => {
  try {
    const lowStockItems = await StockItem.find({
      type: 'inventory',
      isActive: true,
      $expr: { $lte: ['$quantity', '$minLevel'] }
    }).sort({ quantity: 1 });

    res.json(lowStockItems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getStockItems,
  getStockItem,
  createStockItem,
  updateStockItem,
  deleteStockItem,
  updateStockQuantity,
  getLowStockItems
};