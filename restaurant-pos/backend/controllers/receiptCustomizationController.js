const { generateReceiptTemplate, generateKOTTemplate } = require('../utils/helpers');

// @desc    Get receipt customization settings
// @route   GET /api/receipts/settings
// @access  Private
const getReceiptSettings = async (req, res) => {
  try {
    // In a real application, this would fetch from a database
    const settings = {
      businessName: 'Restaurant Name',
      address: '123 Restaurant St.',
      phone: '(555) 123-4567',
      taxId: '123-456-789',
      thankYouMessage: 'Thank you for dining with us!',
      customMessage: 'Come again soon!',
      logo: null,
      receiptTemplate: 'standard', // 'standard', 'minimal', 'detailed'
      showTax: true,
      showDiscount: true,
      showLoyaltyPoints: false
    };

    res.json(settings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update receipt customization settings
// @route   PUT /api/receipts/settings
// @access  Private
const updateReceiptSettings = async (req, res) => {
  try {
    // In a real application, this would save to a database
    const {
      businessName,
      address,
      phone,
      taxId,
      thankYouMessage,
      customMessage,
      logo,
      receiptTemplate,
      showTax,
      showDiscount,
      showLoyaltyPoints
    } = req.body;

    const settings = {
      businessName: businessName || 'Restaurant Name',
      address: address || '123 Restaurant St.',
      phone: phone || '(555) 123-4567',
      taxId: taxId || '123-456-789',
      thankYouMessage: thankYouMessage || 'Thank you for dining with us!',
      customMessage: customMessage || 'Come again soon!',
      logo: logo || null,
      receiptTemplate: receiptTemplate || 'standard',
      showTax: typeof showTax === 'boolean' ? showTax : true,
      showDiscount: typeof showDiscount === 'boolean' ? showDiscount : true,
      showLoyaltyPoints: typeof showLoyaltyPoints === 'boolean' ? showLoyaltyPoints : false
    };

    res.json(settings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Generate customized receipt for an order
// @route   POST /api/receipts/generate
// @access  Private
const generateCustomizedReceipt = async (req, res) => {
  try {
    const { orderData, businessSettings } = req.body;

    // Generate receipt using helper function
    const receipt = generateReceiptTemplate(orderData, businessSettings);

    res.json(receipt);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getReceiptSettings,
  updateReceiptSettings,
  generateCustomizedReceipt
};