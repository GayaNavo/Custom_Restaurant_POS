# Restaurant POS System

A comprehensive Point of Sale system for restaurants built with the MERN stack (MongoDB, Express, React, Node.js).

## Features

- **Customer Management**: Track customer information and loyalty points
- **User Management**: Role-based access control with different permission levels
- **Menu Management**: Create and manage menu items with categories and pricing
- **Stock Management**: Inventory tracking for both inventory and non-inventory items
- **Order Processing**: Complete order management system with multiple order types
- **Receipt & KOT Generation**: Generate receipts and kitchen order tickets
- **Receipt Customization**: Configurable receipt templates

## Tech Stack

- **Frontend**: React, Redux Toolkit, React Router
- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT tokens with role-based permissions
- **Styling**: CSS Modules

## Installation

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local instance or cloud)

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the backend directory with the following:
```
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/restaurant_pos
JWT_SECRET=your_jwt_secret_key
```

4. Start the backend server:
```bash
npm run dev
```

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update user profile

### Customers
- `GET /api/customers` - Get all customers
- `POST /api/customers` - Create a new customer
- `GET /api/customers/:id` - Get a specific customer
- `PUT /api/customers/:id` - Update a customer
- `DELETE /api/customers/:id` - Delete a customer

### Users
- `GET /api/users` - Get all users
- `POST /api/users` - Create a new user
- `GET /api/users/:id` - Get a specific user
- `PUT /api/users/:id` - Update a user
- `DELETE /api/users/:id` - Delete a user

### Menu
- `GET /api/menu` - Get all menu items
- `POST /api/menu` - Create a new menu item
- `GET /api/menu/:id` - Get a specific menu item
- `PUT /api/menu/:id` - Update a menu item
- `DELETE /api/menu/:id` - Delete a menu item

### Stock
- `GET /api/stock` - Get all stock items
- `POST /api/stock` - Create a new stock item
- `GET /api/stock/:id` - Get a specific stock item
- `PUT /api/stock/:id` - Update a stock item
- `DELETE /api/stock/:id` - Delete a stock item
- `PUT /api/stock/:id/quantity` - Update stock quantity
- `GET /api/stock/low-stock` - Get low stock items

### Orders
- `GET /api/orders` - Get all orders
- `POST /api/orders` - Create a new order
- `GET /api/orders/:id` - Get a specific order
- `PUT /api/orders/:id` - Update an order
- `DELETE /api/orders/:id` - Delete an order
- `PUT /api/orders/:id/status` - Update order status

### Receipts
- `GET /api/receipts/:id` - Generate receipt for an order
- `GET /api/receipts/:id/kot` - Generate KOT for an order

## Roles and Permissions

- **Admin**: Full access to all features
- **Manager**: Access to most features except some admin functions
- **Cashier**: Access to customer, menu, and order features
- **Kitchen Staff**: Access to orders and KOT generation

## License

This project is licensed under the MIT License.