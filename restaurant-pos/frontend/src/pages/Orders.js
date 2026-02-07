import React, { useState, useEffect } from 'react';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    customer: '',
    items: [],
    tableNumber: '',
    orderType: 'dine-in',
    discount: 0
  });

  // Mock data for now - will connect to API later
  useEffect(() => {
    // Simulate fetching orders
    setOrders([
      {
        _id: 1,
        orderNumber: 'ORD1234567890',
        customer: { firstName: 'John', lastName: 'Doe' },
        items: [
          { menuItem: { name: 'Margherita Pizza' }, quantity: 1, price: 12.99, specialInstructions: '' },
          { menuItem: { name: 'Caesar Salad' }, quantity: 2, price: 8.99, specialInstructions: 'No onions' }
        ],
        subtotal: 30.97,
        tax: 3.09,
        discount: 0,
        total: 34.06,
        status: 'completed',
        orderType: 'dine-in',
        tableNumber: '5',
        createdAt: new Date().toISOString()
      },
      {
        _id: 2,
        orderNumber: 'ORD1234567891',
        customer: { firstName: 'Jane', lastName: 'Smith' },
        items: [
          { menuItem: { name: 'Grilled Chicken' }, quantity: 1, price: 16.99, specialInstructions: '' }
        ],
        subtotal: 16.99,
        tax: 1.70,
        discount: 2.00,
        total: 16.69,
        status: 'pending',
        orderType: 'takeout',
        tableNumber: 'N/A',
        createdAt: new Date().toISOString()
      },
      {
        _id: 3,
        orderNumber: 'ORD1234567892',
        customer: { firstName: 'Bob', lastName: 'Johnson' },
        items: [
          { menuItem: { name: 'Margherita Pizza' }, quantity: 1, price: 12.99, specialInstructions: 'Extra cheese' }
        ],
        subtotal: 12.99,
        tax: 1.30,
        discount: 0,
        total: 14.29,
        status: 'in-progress',
        orderType: 'delivery',
        tableNumber: 'N/A',
        createdAt: new Date().toISOString()
      }
    ]);
  }, []);

  const onChange = (e) => {
    if (e.target.type === 'number') {
      setFormData({ ...formData, [e.target.name]: parseFloat(e.target.value) });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement order creation logic
    console.log('Order submitted:', formData);
    setShowForm(false);
    setFormData({
      customer: '',
      items: [],
      tableNumber: '',
      orderType: 'dine-in',
      discount: 0
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return '#FFA726';
      case 'in-progress': return '#29B6F6';
      case 'ready': return '#66BB6A';
      case 'completed': return '#388E3C';
      case 'cancelled': return '#EF5350';
      default: return '#9E9E9E';
    }
  };

  return (
    <div className="container">
      <h1 style={{ color: '#1F5F3B' }}>Order Management</h1>
      
      <div className="card" style={{ backgroundColor: '#F8E8C8', border: '1px solid #4F7F2F' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h2 style={{ color: '#1F5F3B' }}>Orders</h2>
          <button className="btn btn-primary" style={{ backgroundColor: '#1F5F3B', border: 'none' }} onClick={() => setShowForm(!showForm)}>
            {showForm ? 'Cancel' : 'New Order'}
          </button>
        </div>
        
        {showForm && (
          <form onSubmit={onSubmit} className="card" style={{ marginBottom: '1.5rem', backgroundColor: '#F8E8C8', border: '1px solid #4F7F2F' }}>
            <div className="form-row" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <div className="form-group" style={{ flex: 1 }}>
                <label htmlFor="customer" className="form-label" style={{ color: '#1F5F3B' }}>Customer</label>
                <select
                  id="customer"
                  name="customer"
                  className="form-select"
                  style={{ backgroundColor: 'white', borderColor: '#4F7F2F', color: '#1F5F3B' }}
                  value={formData.customer}
                  onChange={onChange}
                  required
                >
                  <option value="">Select Customer</option>
                  <option value="1">John Doe</option>
                  <option value="2">Jane Smith</option>
                  <option value="3">Bob Johnson</option>
                </select>
              </div>
              
              <div className="form-group" style={{ flex: 1 }}>
                <label htmlFor="orderType" className="form-label">Order Type</label>
                <select
                  id="orderType"
                  name="orderType"
                  className="form-select"
                  value={formData.orderType}
                  onChange={onChange}
                  required
                >
                  <option value="dine-in">Dine-In</option>
                  <option value="takeout">Takeout</option>
                  <option value="delivery">Delivery</option>
                </select>
              </div>
            </div>
            
            <div className="form-row" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <div className="form-group" style={{ flex: 1 }}>
                <label htmlFor="tableNumber" className="form-label">Table Number</label>
                <input
                  type="text"
                  id="tableNumber"
                  name="tableNumber"
                  className="form-input"
                  value={formData.tableNumber}
                  onChange={onChange}
                  placeholder="e.g., 5"
                />
              </div>
              
              <div className="form-group" style={{ flex: 1 }}>
                <label htmlFor="discount" className="form-label">Discount ($)</label>
                <input
                  type="number"
                  id="discount"
                  name="discount"
                  className="form-input"
                  value={formData.discount}
                  onChange={onChange}
                  min="0"
                  step="0.01"
                />
              </div>
            </div>
            
            <div className="form-group">
              <label className="form-label">Items</label>
              <div className="card" style={{ padding: '1rem' }}>
                <p>No items added yet. Items can be added in the full order form.</p>
              </div>
            </div>
            
            <button type="submit" className="btn btn-success" style={{ backgroundColor: '#4F7F2F', border: 'none' }}>Create Order</button>
          </form>
        )}
        
        <table className="table">
          <thead>
            <tr>
              <th style={{ color: 'white' }}>Order #</th>
              <th style={{ color: 'white' }}>Customer</th>
              <th style={{ color: 'white' }}>Date</th>
              <th style={{ color: 'white' }}>Total</th>
              <th style={{ color: 'white' }}>Status</th>
              <th style={{ color: 'white' }}>Type</th>
              <th style={{ color: 'white' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order._id}>
                <td>{order.orderNumber}</td>
                <td>
                  {order.customer ? `${order.customer.firstName} ${order.customer.lastName}` : 'Walk-in Customer'}
                </td>
                <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                <td>${order.total.toFixed(2)}</td>
                <td>
                  <span style={{
                    padding: '0.25rem 0.5rem',
                    borderRadius: '4px',
                    backgroundColor: getStatusColor(order.status),
                    color: 'white'
                  }}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                </td>
                <td>{order.orderType.charAt(0).toUpperCase() + order.orderType.slice(1)}</td>
                <td>
                  <button className="btn btn-primary" style={{ backgroundColor: '#1F5F3B', border: 'none', marginRight: '0.5rem' }}>View</button>
                  <button className="btn btn-success" style={{ backgroundColor: '#4F7F2F', border: 'none', marginRight: '0.5rem' }}>Receipt</button>
                  <button className="btn btn-danger" style={{ backgroundColor: '#8B5A2B', border: 'none' }}>KOT</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;