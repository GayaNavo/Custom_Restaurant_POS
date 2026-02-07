import React from 'react';

const Dashboard = () => {
  return (
    <div className="container">
      <h1>Restaurant POS Dashboard</h1>
      <div className="dashboard-stats">
        <div className="card" style={{ backgroundColor: '#F8E8C8', border: '2px solid #4F7F2F', textAlign: 'center' }}>
          <h2 style={{ color: '#1F5F3B' }}>Welcome to Restaurant POS System</h2>
          <p style={{ color: '#1F5F3B' }}>Manage your restaurant operations efficiently with our comprehensive POS system.</p>
        </div>
        
        <div className="stats-grid">
          <div className="card stat-card" style={{ backgroundColor: '#F8E8C8', border: '1px solid #4F7F2F', textAlign: 'center' }}>
            <h3 style={{ color: '#1F5F3B' }}>Total Orders</h3>
            <p style={{ color: '#1F5F3B', fontSize: '1.5em', fontWeight: 'bold' }}>0</p>
          </div>
          <div className="card stat-card" style={{ backgroundColor: '#F8E8C8', border: '1px solid #4F7F2F', textAlign: 'center' }}>
            <h3 style={{ color: '#1F5F3B' }}>Today's Revenue</h3>
            <p style={{ color: '#1F5F3B', fontSize: '1.5em', fontWeight: 'bold' }}>$0.00</p>
          </div>
          <div className="card stat-card" style={{ backgroundColor: '#F8E8C8', border: '1px solid #4F7F2F', textAlign: 'center' }}>
            <h3 style={{ color: '#1F5F3B' }}>Pending Orders</h3>
            <p style={{ color: '#1F5F3B', fontSize: '1.5em', fontWeight: 'bold' }}>0</p>
          </div>
          <div className="card stat-card" style={{ backgroundColor: '#F8E8C8', border: '1px solid #4F7F2F', textAlign: 'center' }}>
            <h3 style={{ color: '#1F5F3B' }}>Low Stock Items</h3>
            <p style={{ color: '#1F5F3B', fontSize: '1.5em', fontWeight: 'bold' }}>0</p>
          </div>
        </div>
        
        <div className="quick-actions">
          <h2>Quick Actions</h2>
          <div className="card" style={{ backgroundColor: '#F8E8C8', border: '1px solid #4F7F2F' }}>
            <div className="actions-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', textAlign: 'center' }}>
              <button className="btn btn-primary" style={{ backgroundColor: '#1F5F3B', border: 'none', padding: '12px' }}>New Order</button>
              <button className="btn btn-success" style={{ backgroundColor: '#4F7F2F', border: 'none', padding: '12px' }}>View Menu</button>
              <button className="btn btn-primary" style={{ backgroundColor: '#1F5F3B', border: 'none', padding: '12px' }}>Manage Stock</button>
              <button className="btn btn-success" style={{ backgroundColor: '#4F7F2F', border: 'none', padding: '12px' }}>View Customers</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;