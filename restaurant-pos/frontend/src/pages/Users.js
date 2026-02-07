import React, { useState, useEffect } from 'react';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: 'cashier',
    permissions: []
  });

  // Mock data for now - will connect to API later
  useEffect(() => {
    // Simulate fetching users
    setUsers([
      {
        _id: 1,
        username: 'admin',
        email: 'admin@example.com',
        role: 'admin',
        permissions: ['view_customers', 'manage_customers', 'view_users', 'manage_users', 'view_menu', 'manage_menu', 'view_stock', 'manage_stock', 'view_orders', 'manage_orders', 'generate_receipts'],
        isActive: true
      },
      {
        _id: 2,
        username: 'manager',
        email: 'manager@example.com',
        role: 'manager',
        permissions: ['view_customers', 'manage_customers', 'view_menu', 'manage_menu', 'view_stock', 'manage_stock', 'view_orders', 'manage_orders', 'generate_receipts'],
        isActive: true
      },
      {
        _id: 3,
        username: 'cashier',
        email: 'cashier@example.com',
        role: 'cashier',
        permissions: ['view_customers', 'view_menu', 'view_orders', 'generate_receipts'],
        isActive: true
      }
    ]);
  }, []);

  const onChange = (e) => {
    if (e.target.type === 'checkbox') {
      const { name, checked } = e.target;
      if (name === 'permissions') {
        if (checked) {
          setFormData({
            ...formData,
            permissions: [...formData.permissions, e.target.value]
          });
        } else {
          setFormData({
            ...formData,
            permissions: formData.permissions.filter(p => p !== e.target.value)
          });
        }
      } else {
        setFormData({ ...formData, [name]: checked });
      }
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement user creation logic
    console.log('User submitted:', formData);
    setShowForm(false);
    setFormData({
      username: '',
      email: '',
      password: '',
      role: 'cashier',
      permissions: []
    });
  };

  return (
    <div className="container">
      <h1 style={{ color: '#1F5F3B' }}>User Management</h1>
      
      <div className="card" style={{ backgroundColor: '#F8E8C8', border: '1px solid #4F7F2F' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h2 style={{ color: '#1F5F3B' }}>Users</h2>
          <button className="btn btn-primary" style={{ backgroundColor: '#1F5F3B', border: 'none' }} onClick={() => setShowForm(!showForm)}>
            {showForm ? 'Cancel' : 'Add User'}
          </button>
        </div>
        
        {showForm && (
          <form onSubmit={onSubmit} className="card" style={{ marginBottom: '1.5rem', backgroundColor: '#F8E8C8', border: '1px solid #4F7F2F' }}>
            <div className="form-row" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <div className="form-group" style={{ flex: 1 }}>
                <label htmlFor="username" className="form-label" style={{ color: '#1F5F3B' }}>Username</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  className="form-input"
                  style={{ backgroundColor: 'white', borderColor: '#4F7F2F', color: '#1F5F3B' }}
                  value={formData.username}
                  onChange={onChange}
                  required
                />
              </div>
              
              <div className="form-group" style={{ flex: 1 }}>
                <label htmlFor="email" className="form-label">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="form-input"
                  value={formData.email}
                  onChange={onChange}
                  required
                />
              </div>
            </div>
            
            <div className="form-row" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <div className="form-group" style={{ flex: 1 }}>
                <label htmlFor="role" className="form-label">Role</label>
                <select
                  id="role"
                  name="role"
                  className="form-select"
                  value={formData.role}
                  onChange={onChange}
                  required
                >
                  <option value="admin">Admin</option>
                  <option value="manager">Manager</option>
                  <option value="cashier">Cashier</option>
                  <option value="kitchen-staff">Kitchen Staff</option>
                </select>
              </div>
              
              <div className="form-group" style={{ flex: 1 }}>
                <label htmlFor="password" className="form-label">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="form-input"
                  value={formData.password}
                  onChange={onChange}
                  required={!showForm} // Required only for new users
                />
              </div>
            </div>
            
            <div className="form-group">
              <label className="form-label">Permissions</label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '0.5rem' }}>
                <label>
                  <input
                    type="checkbox"
                    name="permissions"
                    value="view_customers"
                    checked={formData.permissions.includes('view_customers')}
                    onChange={onChange}
                  /> View Customers
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="permissions"
                    value="manage_customers"
                    checked={formData.permissions.includes('manage_customers')}
                    onChange={onChange}
                  /> Manage Customers
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="permissions"
                    value="view_users"
                    checked={formData.permissions.includes('view_users')}
                    onChange={onChange}
                  /> View Users
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="permissions"
                    value="manage_users"
                    checked={formData.permissions.includes('manage_users')}
                    onChange={onChange}
                  /> Manage Users
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="permissions"
                    value="view_menu"
                    checked={formData.permissions.includes('view_menu')}
                    onChange={onChange}
                  /> View Menu
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="permissions"
                    value="manage_menu"
                    checked={formData.permissions.includes('manage_menu')}
                    onChange={onChange}
                  /> Manage Menu
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="permissions"
                    value="view_stock"
                    checked={formData.permissions.includes('view_stock')}
                    onChange={onChange}
                  /> View Stock
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="permissions"
                    value="manage_stock"
                    checked={formData.permissions.includes('manage_stock')}
                    onChange={onChange}
                  /> Manage Stock
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="permissions"
                    value="view_orders"
                    checked={formData.permissions.includes('view_orders')}
                    onChange={onChange}
                  /> View Orders
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="permissions"
                    value="manage_orders"
                    checked={formData.permissions.includes('manage_orders')}
                    onChange={onChange}
                  /> Manage Orders
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="permissions"
                    value="generate_receipts"
                    checked={formData.permissions.includes('generate_receipts')}
                    onChange={onChange}
                  /> Generate Receipts
                </label>
              </div>
            </div>
            
            <button type="submit" className="btn btn-success" style={{ backgroundColor: '#4F7F2F', border: 'none' }}>Save User</button>
          </form>
        )}
        
        <table className="table">
          <thead>
            <tr>
              <th style={{ color: 'white' }}>Username</th>
              <th style={{ color: 'white' }}>Email</th>
              <th style={{ color: 'white' }}>Role</th>
              <th style={{ color: 'white' }}>Status</th>
              <th style={{ color: 'white' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id}>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>{user.isActive ? 'Active' : 'Inactive'}</td>
                <td>
                  <button className="btn btn-primary" style={{ backgroundColor: '#1F5F3B', border: 'none', marginRight: '0.5rem' }}>Edit</button>
                  <button className="btn btn-danger" style={{ backgroundColor: '#8B5A2B', border: 'none' }}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;