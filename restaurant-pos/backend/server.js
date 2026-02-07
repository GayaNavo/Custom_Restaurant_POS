const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const connectDB = require('./config/database');

// Import routes
const authRoutes = require('./routes/authRoutes');
const customerRoutes = require('./routes/customersRoutes');
const userRoutes = require('./routes/usersRoutes');
const menuRoutes = require('./routes/menuRoutes');
const stockRoutes = require('./routes/stockRoutes');
const orderRoutes = require('./routes/ordersRoutes');
const receiptRoutes = require('./routes/receiptsRoutes');

const app = express();

// Connect to database
connectDB().then(() => {
  console.log('Database connection established successfully');
}).catch((error) => {
  console.error('Failed to connect to database:', error);
  process.exit(1);
});

// Security middlewares
app.use(helmet());
app.use(cors());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Body parser middleware
app.use(express.json({ extended: false }));

// Define routes
app.use('/api/auth', authRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/users', userRoutes);
app.use('/api/menu', menuRoutes);
app.use('/api/stock', stockRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/receipts', receiptRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));