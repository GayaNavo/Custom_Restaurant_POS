import React, { useState, useEffect } from 'react';

const Receipts = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [receiptType, setReceiptType] = useState('receipt'); // 'receipt' or 'kot'

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
      }
    ]);
  }, []);

  const handleGenerateReceipt = (order) => {
    setSelectedOrder(order);
    setReceiptType('receipt');
  };

  const handleGenerateKOT = (order) => {
    setSelectedOrder(order);
    setReceiptType('kot');
  };

  const handlePrint = () => {
    // In a real app, this would send the receipt to a printer
    window.print();
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <div className="container">
      <h1 style={{ color: '#1F5F3B' }}>Receipt & KOT Generation</h1>
      
      <div className="card" style={{ backgroundColor: '#F8E8C8', border: '1px solid #4F7F2F' }}>
        <h2 style={{ color: '#1F5F3B' }}>Recent Orders</h2>
        <table className="table">
          <thead>
            <tr>
              <th style={{ color: 'white' }}>Order #</th>
              <th style={{ color: 'white' }}>Customer</th>
              <th style={{ color: 'white' }}>Date</th>
              <th style={{ color: 'white' }}>Total</th>
              <th style={{ color: 'white' }}>Status</th>
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
                <td>{formatDate(order.createdAt)}</td>
                <td>${order.total.toFixed(2)}</td>
                <td>{order.status.charAt(0).toUpperCase() + order.status.slice(1)}</td>
                <td>
                  <button 
                    className="btn btn-success" 
                    style={{ backgroundColor: '#4F7F2F', border: 'none', marginRight: '0.5rem' }}
                    onClick={() => handleGenerateReceipt(order)}
                  >
                    Receipt
                  </button>
                  <button 
                    className="btn btn-primary"
                    style={{ backgroundColor: '#1F5F3B', border: 'none' }}
                    onClick={() => handleGenerateKOT(order)}
                  >
                    KOT
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {selectedOrder && (
        <div className="card" style={{ backgroundColor: '#F8E8C8', border: '1px solid #4F7F2F' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h2 style={{ color: '#1F5F3B' }}>
              {receiptType === 'receipt' ? 'Receipt Preview' : 'KOT Preview'} - {selectedOrder.orderNumber}
            </h2>
            <button className="btn btn-primary" style={{ backgroundColor: '#1F5F3B', border: 'none' }} onClick={handlePrint}>Print</button>
          </div>
          
          {receiptType === 'receipt' ? (
            <div className="receipt-preview" style={{ maxWidth: '400px', margin: '0 auto', padding: '1rem', border: '1px solid #ccc', fontFamily: 'monospace' }}>
              <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
                <h3>RESTAURANT NAME</h3>
                <p>Address: 123 Restaurant St.</p>
                <p>Phone: (555) 123-4567</p>
                <p>Tax ID: 123-456-789</p>
                <hr />
              </div>
              
              <div style={{ marginBottom: '1rem' }}>
                <p>Order #: {selectedOrder.orderNumber}</p>
                <p>Date: {formatDate(selectedOrder.createdAt)}</p>
                <p>Table: {selectedOrder.tableNumber}</p>
                <p>Order Type: {selectedOrder.orderType.toUpperCase()}</p>
                <p>Customer: {selectedOrder.customer ? `${selectedOrder.customer.firstName} ${selectedOrder.customer.lastName}` : 'Walk-in'}</p>
                <hr />
              </div>
              
              <div style={{ marginBottom: '1rem' }}>
                {selectedOrder.items.map((item, index) => (
                  <div key={index} style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>{item.quantity}x {item.menuItem.name}</span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
                <hr />
              </div>
              
              <div style={{ marginBottom: '0.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Subtotal:</span>
                  <span>${selectedOrder.subtotal.toFixed(2)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Tax:</span>
                  <span>${selectedOrder.tax.toFixed(2)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Discount:</span>
                  <span>-${selectedOrder.discount.toFixed(2)}</span>
                </div>
                <hr />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
                  <span>TOTAL:</span>
                  <span>${selectedOrder.total.toFixed(2)}</span>
                </div>
              </div>
              
              <div style={{ textAlign: 'center', marginTop: '1rem' }}>
                <p>Thank you for dining with us!</p>
                <p>Come again soon!</p>
              </div>
            </div>
          ) : (
            <div className="kot-preview" style={{ maxWidth: '400px', margin: '0 auto', padding: '1rem', border: '1px solid #ccc', fontFamily: 'monospace' }}>
              <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
                <h3>KITCHEN ORDER TICKET</h3>
                <p>Order #: {selectedOrder.orderNumber}</p>
                <p>Date: {formatDate(selectedOrder.createdAt)}</p>
                <p>Table: {selectedOrder.tableNumber}</p>
                <p>Order Type: {selectedOrder.orderType.toUpperCase()}</p>
                <hr />
              </div>
              
              <div style={{ marginBottom: '1rem' }}>
                <h4>Items to Prepare:</h4>
                {selectedOrder.items.map((item, index) => (
                  <div key={index} style={{ marginBottom: '0.5rem' }}>
                    <p><strong>{item.quantity}x {item.menuItem.name}</strong></p>
                    {item.specialInstructions && (
                      <p style={{ fontStyle: 'italic', marginLeft: '1rem' }}>Special: {item.specialInstructions}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Receipts;