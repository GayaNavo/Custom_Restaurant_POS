import React, { useState, useEffect } from 'react';

const Menu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'Main Course',
    image: '',
    ingredients: '',
    preparationTime: 15,
    isAvailable: true
  });

  // Mock data for now - will connect to API later
  useEffect(() => {
    // Simulate fetching menu items
    setMenuItems([
      {
        _id: 1,
        name: 'Margherita Pizza',
        description: 'Classic pizza with tomato sauce and mozzarella',
        price: 12.99,
        category: 'Pizza',
        ingredients: ['Tomato Sauce', 'Mozzarella', 'Basil'],
        preparationTime: 15,
        isAvailable: true
      },
      {
        _id: 2,
        name: 'Caesar Salad',
        description: 'Fresh romaine lettuce with Caesar dressing',
        price: 8.99,
        category: 'Salad',
        ingredients: ['Romaine Lettuce', 'Caesar Dressing', 'Croutons', 'Parmesan'],
        preparationTime: 5,
        isAvailable: true
      },
      {
        _id: 3,
        name: 'Grilled Chicken',
        description: 'Juicy grilled chicken breast with vegetables',
        price: 16.99,
        category: 'Main Course',
        ingredients: ['Chicken Breast', 'Mixed Vegetables', 'Herbs'],
        preparationTime: 20,
        isAvailable: false
      }
    ]);
  }, []);

  const onChange = (e) => {
    if (e.target.name === 'ingredients') {
      setFormData({ ...formData, [e.target.name]: e.target.value.split(',').map(item => item.trim()) });
    } else if (e.target.type === 'number') {
      setFormData({ ...formData, [e.target.name]: parseFloat(e.target.value) });
    } else if (e.target.type === 'checkbox') {
      setFormData({ ...formData, [e.target.name]: e.target.checked });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement menu item creation logic
    console.log('Menu item submitted:', formData);
    setShowForm(false);
    setFormData({
      name: '',
      description: '',
      price: '',
      category: 'Main Course',
      image: '',
      ingredients: '',
      preparationTime: 15,
      isAvailable: true
    });
  };

  return (
    <div className="container">
      <h1 style={{ color: '#1F5F3B' }}>Menu Management</h1>
      
      <div className="card" style={{ backgroundColor: '#F8E8C8', border: '1px solid #4F7F2F' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h2 style={{ color: '#1F5F3B' }}>Menu Items</h2>
          <button className="btn btn-primary" style={{ backgroundColor: '#1F5F3B', border: 'none' }} onClick={() => setShowForm(!showForm)}>
            {showForm ? 'Cancel' : 'Add Menu Item'}
          </button>
        </div>
        
        {showForm && (
          <form onSubmit={onSubmit} className="card" style={{ marginBottom: '1.5rem', backgroundColor: '#F8E8C8', border: '1px solid #4F7F2F' }}>
            <div className="form-row" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <div className="form-group" style={{ flex: 1 }}>
                <label htmlFor="name" className="form-label" style={{ color: '#1F5F3B' }}>Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="form-input"
                  style={{ backgroundColor: 'white', borderColor: '#4F7F2F', color: '#1F5F3B' }}
                  value={formData.name}
                  onChange={onChange}
                  required
                />
              </div>
              
              <div className="form-group" style={{ flex: 1 }}>
                <label htmlFor="category" className="form-label">Category</label>
                <select
                  id="category"
                  name="category"
                  className="form-select"
                  value={formData.category}
                  onChange={onChange}
                  required
                >
                  <option value="Appetizer">Appetizer</option>
                  <option value="Main Course">Main Course</option>
                  <option value="Dessert">Dessert</option>
                  <option value="Beverage">Beverage</option>
                  <option value="Pizza">Pizza</option>
                  <option value="Salad">Salad</option>
                  <option value="Soup">Soup</option>
                </select>
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="description" className="form-label">Description</label>
              <textarea
                id="description"
                name="description"
                className="form-input"
                rows="3"
                value={formData.description}
                onChange={onChange}
                required
              ></textarea>
            </div>
            
            <div className="form-row" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <div className="form-group" style={{ flex: 1 }}>
                <label htmlFor="price" className="form-label">Price ($)</label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  className="form-input"
                  value={formData.price}
                  onChange={onChange}
                  min="0"
                  step="0.01"
                  required
                />
              </div>
              
              <div className="form-group" style={{ flex: 1 }}>
                <label htmlFor="preparationTime" className="form-label">Preparation Time (min)</label>
                <input
                  type="number"
                  id="preparationTime"
                  name="preparationTime"
                  className="form-input"
                  value={formData.preparationTime}
                  onChange={onChange}
                  min="1"
                  required
                />
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="ingredients" className="form-label">Ingredients (comma separated)</label>
              <input
                type="text"
                id="ingredients"
                name="ingredients"
                className="form-input"
                value={formData.ingredients.join(', ')}
                onChange={onChange}
                placeholder="e.g., Tomato, Cheese, Basil"
              />
            </div>
            
            <div className="form-group">
              <label>
                <input
                  type="checkbox"
                  name="isAvailable"
                  checked={formData.isAvailable}
                  onChange={onChange}
                /> Available
              </label>
            </div>
            
            <button type="submit" className="btn btn-success" style={{ backgroundColor: '#4F7F2F', border: 'none' }}>Save Menu Item</button>
          </form>
        )}
        
        <table className="table">
          <thead>
            <tr>
              <th style={{ color: 'white' }}>Name</th>
              <th style={{ color: 'white' }}>Category</th>
              <th style={{ color: 'white' }}>Price</th>
              <th style={{ color: 'white' }}>Prep Time</th>
              <th style={{ color: 'white' }}>Status</th>
              <th style={{ color: 'white' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {menuItems.map(item => (
              <tr key={item._id}>
                <td>
                  <strong>{item.name}</strong>
                  <br />
                  <small style={{ color: '#666' }}>{item.description}</small>
                </td>
                <td>{item.category}</td>
                <td>${item.price.toFixed(2)}</td>
                <td>{item.preparationTime} min</td>
                <td>
                  {item.isAvailable ? (
                    <span style={{ color: 'green', fontWeight: 'bold' }}>Available</span>
                  ) : (
                    <span style={{ color: 'red', fontWeight: 'bold' }}>Unavailable</span>
                  )}
                </td>
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

export default Menu;