import React, { useState, useEffect } from 'react';

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: ''
    }
  });

  // Mock data for now - will connect to API later
  useEffect(() => {
    // Simulate fetching customers
    setCustomers([
      {
        _id: 1,
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        phone: '+1234567890',
        loyaltyPoints: 150
      },
      {
        _id: 2,
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane.smith@example.com',
        phone: '+0987654321',
        loyaltyPoints: 75
      }
    ]);
  }, []);

  const onChange = (e) => {
    if (e.target.name.includes('.')) {
      const [parent, child] = e.target.name.split('.');
      setFormData({
        ...formData,
        [parent]: {
          ...formData[parent],
          [child]: e.target.value
        }
      });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement customer creation logic
    console.log('Customer submitted:', formData);
    setShowForm(false);
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: {
        street: '',
        city: '',
        state: '',
        zipCode: '',
        country: ''
      }
    });
  };

  return (
    <div className="container">
      <h1 style={{ color: '#1F5F3B' }}>Customer Management</h1>
      
      <div className="card" style={{ backgroundColor: '#F8E8C8', border: '1px solid #4F7F2F' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h2 style={{ color: '#1F5F3B' }}>Customers</h2>
          <button className="btn btn-primary" style={{ backgroundColor: '#1F5F3B', border: 'none' }} onClick={() => setShowForm(!showForm)}>
            {showForm ? 'Cancel' : 'Add Customer'}
          </button>
        </div>
        
        {showForm && (
          <form onSubmit={onSubmit} className="card" style={{ marginBottom: '1.5rem', backgroundColor: '#F8E8C8', border: '1px solid #4F7F2F' }}>
            <div className="form-row" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <div className="form-group" style={{ flex: 1 }}>
                <label htmlFor="firstName" className="form-label" style={{ color: '#1F5F3B' }}>First Name</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  className="form-input"
                  style={{ backgroundColor: 'white', borderColor: '#4F7F2F', color: '#1F5F3B' }}
                  value={formData.firstName}
                  onChange={onChange}
                  required
                />
              </div>
              
              <div className="form-group" style={{ flex: 1 }}>
                <label htmlFor="lastName" className="form-label">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  className="form-input"
                  value={formData.lastName}
                  onChange={onChange}
                  required
                />
              </div>
            </div>
            
            <div className="form-row" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
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
              
              <div className="form-group" style={{ flex: 1 }}>
                <label htmlFor="phone" className="form-label">Phone</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="form-input"
                  value={formData.phone}
                  onChange={onChange}
                  required
                />
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="address.street" className="form-label">Street Address</label>
              <input
                type="text"
                id="address.street"
                name="address.street"
                className="form-input"
                value={formData.address.street}
                onChange={onChange}
              />
            </div>
            
            <div className="form-row" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <div className="form-group" style={{ flex: 1 }}>
                <label htmlFor="address.city" className="form-label">City</label>
                <input
                  type="text"
                  id="address.city"
                  name="address.city"
                  className="form-input"
                  value={formData.address.city}
                  onChange={onChange}
                />
              </div>
              
              <div className="form-group" style={{ flex: 1 }}>
                <label htmlFor="address.state" className="form-label">State</label>
                <input
                  type="text"
                  id="address.state"
                  name="address.state"
                  className="form-input"
                  value={formData.address.state}
                  onChange={onChange}
                />
              </div>
              
              <div className="form-group" style={{ flex: 1 }}>
                <label htmlFor="address.zipCode" className="form-label">ZIP Code</label>
                <input
                  type="text"
                  id="address.zipCode"
                  name="address.zipCode"
                  className="form-input"
                  value={formData.address.zipCode}
                  onChange={onChange}
                />
              </div>
            </div>
            
            <button type="submit" className="btn btn-success" style={{ backgroundColor: '#4F7F2F', border: 'none' }}>Save Customer</button>
          </form>
        )}
        
        <table className="table">
          <thead>
            <tr>
              <th style={{ color: 'white' }}>Name</th>
              <th style={{ color: 'white' }}>Email</th>
              <th style={{ color: 'white' }}>Phone</th>
              <th style={{ color: 'white' }}>Loyalty Points</th>
              <th style={{ color: 'white' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {customers.map(customer => (
              <tr key={customer._id}>
                <td>{customer.firstName} {customer.lastName}</td>
                <td>{customer.email}</td>
                <td>{customer.phone}</td>
                <td>{customer.loyaltyPoints}</td>
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

export default Customers;