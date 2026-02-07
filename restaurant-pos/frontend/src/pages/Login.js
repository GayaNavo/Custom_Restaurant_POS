import React, { useState } from 'react';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement login logic
    console.log('Login submitted:', formData);
  };

  return (
    <div className="login-page">
      <div className="login-logo-container">
        <img src="/logo.png" alt="Patuwa Villa" className="login-logo" />
      </div>
      
      <div className="login-card">
        <div className="login-card-header">
          <h2>Sign in to your Account</h2>
        </div>
        
        <div className="login-card-body">
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <label htmlFor="email">User name</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={onChange}
                required
              />
            </div>
            
            <div className="forgot-password-link">
              <a href="#forgot">Forgot Password</a>
            </div>
            
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="password-input-container">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={onChange}
                  required
                />
                <button 
                  type="button" 
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>
            </div>
            
            <button type="submit" className="login-button">
              Log in
            </button>
          </form>
        </div>
        
        <div className="login-card-footer">
          <p>Version 2.0</p>
        </div>
      </div>
    </div>
  );
};

export default Login;