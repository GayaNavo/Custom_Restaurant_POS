import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import './App.css';

// Import pages
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Customers from './pages/Customers';
import Users from './pages/Users';
import Menu from './pages/Menu';
import TabletMenu from './pages/TabletMenu';
import Stock from './pages/Stock';
import Orders from './pages/Orders';
import Receipts from './pages/Receipts';

// Import store
import store from './store';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/users" element={<Users />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/tablet-menu" element={<TabletMenu />} />
            <Route path="/stock" element={<Stock />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/receipts" element={<Receipts />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;