import React, { useState } from 'react';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement login logic
    console.log('Login submitted:', formData);
  };

  return (
    <div className="container">
      <div className="card" style={{ maxWidth: '400px', margin: '2rem auto', backgroundColor: '#F8E8C8', border: '2px solid #4F7F2F', textAlign: 'center' }}>
        <h2 style={{ color: '#1F5F3B' }}>Login to Restaurant POS</h2>
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="email" className="form-label" style={{ color: '#1F5F3B' }}>Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-input"
              style={{ backgroundColor: 'white', borderColor: '#4F7F2F', color: '#1F5F3B' }}
              value={formData.email}
              onChange={onChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password" className="form-label" style={{ color: '#1F5F3B' }}>Password</label>
            <input
              type="password"
              id="password"
              name="password"
              className="form-input"
              style={{ backgroundColor: 'white', borderColor: '#4F7F2F', color: '#1F5F3B' }}
              value={formData.password}
              onChange={onChange}
              required
            />
          </div>
          
          <button type="submit" className="btn btn-primary" style={{ width: '100%', backgroundColor: '#1F5F3B', border: 'none', padding: '12px' }}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;