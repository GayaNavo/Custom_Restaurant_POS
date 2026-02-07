const MenuItem = require('../models/MenuItem');
const StockItem = require('../models/StockItem');

// @desc    Get menu items from non-inventory stock (for tablet)
// @route   GET /api/menu/tablet
// @access  Private
const getTabletMenuItems = async (req, res) => {
  try {
    const items = await StockItem.find({ type: 'non-inventory', isActive: true }).sort({ category: 1, name: 1 });
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all menu items
// @route   GET /api/menu
// @access  Private
const getMenuItems = async (req, res) => {
  try {
    const menuItems = await MenuItem.find({ isActive: true, isAvailable: true }).sort({ category: 1, name: 1 });
    res.json(menuItems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all menu items (including inactive)
// @route   GET /api/menu/admin
// @access  Private
const getAllMenuItems = async (req, res) => {
  try {
    const menuItems = await MenuItem.find({}).sort({ category: 1, name: 1 });
    res.json(menuItems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single menu item
// @route   GET /api/menu/:id
// @access  Private
const getMenuItem = async (req, res) => {
  try {
    const menuItem = await MenuItem.findById(req.params.id);

    if (!menuItem) {
      return res.status(404).json({ message: 'Menu item not found' });
    }

    res.json(menuItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create new menu item
// @route   POST /api/menu
// @access  Private
const createMenuItem = async (req, res) => {
  try {
    const { name, description, price, category, image, ingredients, preparationTime } = req.body;

    const menuItem = new MenuItem({
      name,
      description,
      price,
      category,
      image,
      ingredients,
      preparationTime
    });

    const createdMenuItem = await menuItem.save();
    res.status(201).json(createdMenuItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update menu item
// @route   PUT /api/menu/:id
// @access  Private
const updateMenuItem = async (req, res) => {
  try {
    const menuItem = await MenuItem.findById(req.params.id);

    if (!menuItem) {
      return res.status(404).json({ message: 'Menu item not found' });
    }

    // Update menu item fields
    Object.keys(req.body).forEach(key => {
      menuItem[key] = req.body[key];
    });

    const updatedMenuItem = await menuItem.save();
    res.json(updatedMenuItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete menu item
// @route   DELETE /api/menu/:id
// @access  Private
const deleteMenuItem = async (req, res) => {
  try {
    const menuItem = await MenuItem.findById(req.params.id);

    if (!menuItem) {
      return res.status(404).json({ message: 'Menu item not found' });
    }

    await menuItem.remove();
    res.json({ message: 'Menu item removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getMenuItems,
  getAllMenuItems,
  getMenuItem,
  getTabletMenuItems,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem
};