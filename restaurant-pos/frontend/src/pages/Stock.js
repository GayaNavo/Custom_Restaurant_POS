import React, { useState, useEffect } from 'react';

const Stock = () => {
  const [stockItems, setStockItems] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    type: 'inventory',
    description: '',
    brand: '',
    category: '',
    image: '',
    quantity: 0,
    unit: 'pieces',
    minLevel: 0,
    maxLevel: 1000,
    costPrice: 0,
    sellingPrice: 0,
    originalPrice: 0,
    supplier: '',
    isActive: true
  });

  // Mock data for now - will connect to API later
  useEffect(() => {
    // Simulate fetching stock items
    setStockItems([
      {
        _id: 1,
        name: 'Flour',
        type: 'inventory',
        quantity: 25,
        unit: 'kg',
        minLevel: 10,
        maxLevel: 100,
        costPrice: 1.20,
        sellingPrice: 2.00,
        supplier: 'ABC Supplier',
        isActive: true
      },
      {
        _id: 2,
        name: 'Tomato Sauce',
        type: 'inventory',
        quantity: 5,
        unit: 'l',
        minLevel: 2,
        maxLevel: 20,
        costPrice: 3.50,
        sellingPrice: 5.00,
        supplier: 'XYZ Supplier',
        isActive: true
      },
      {
        _id: 3,
        name: 'Takeaway Boxes',
        type: 'non-inventory',
        quantity: 0,
        unit: 'pieces',
        minLevel: 0,
        maxLevel: 0,
        costPrice: 0.50,
        sellingPrice: 0.75,
        supplier: 'Packaging Co.',
        isActive: true
      }
    ]);
  }, []);

  const onChange = (e) => {
    if (e.target.type === 'number') {
      setFormData({ ...formData, [e.target.name]: parseFloat(e.target.value) });
    } else if (e.target.type === 'checkbox') {
      setFormData({ ...formData, [e.target.name]: e.target.checked });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement stock item creation logic
    console.log('Stock item submitted:', formData);
    setShowForm(false);
    setFormData({
      name: '',
      type: 'inventory',
      description: '',
      brand: '',
      category: '',
      image: '',
      quantity: 0,
      unit: 'pieces',
      minLevel: 0,
      maxLevel: 1000,
      costPrice: 0,
      sellingPrice: 0,
      originalPrice: 0,
      supplier: '',
      isActive: true
    });
  };

  return (
    <div className="container">
      <h1 style={{ color: '#1F5F3B' }}>Stock Management</h1>
      
      <div className="card" style={{ backgroundColor: '#F8E8C8', border: '1px solid #4F7F2F' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h2 style={{ color: '#1F5F3B' }}>Stock Items</h2>
          <button className="btn btn-primary" style={{ backgroundColor: '#1F5F3B', border: 'none' }} onClick={() => setShowForm(!showForm)}>
            {showForm ? 'Cancel' : 'Add Stock Item'}
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
                <label htmlFor="type" className="form-label">Type</label>
                <select
                  id="type"
                  name="type"
                  className="form-select"
                  value={formData.type}
                  onChange={onChange}
                  required
                >
                  <option value="inventory">Inventory</option>
                  <option value="non-inventory">Non-Inventory</option>
                </select>
              </div>
            </div>
            
            <div className="form-row" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <div className="form-group" style={{ flex: 1 }}>
                <label htmlFor="brand" className="form-label">Brand</label>
                <input
                  type="text"
                  id="brand"
                  name="brand"
                  className="form-input"
                  value={formData.brand}
                  onChange={onChange}
                />
              </div>
              <div className="form-group" style={{ flex: 1 }}>
                <label htmlFor="category" className="form-label">Category</label>
                <input
                  type="text"
                  id="category"
                  name="category"
                  className="form-input"
                  value={formData.category}
                  onChange={onChange}
                />
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="description" className="form-label">Description</label>
              <textarea
                id="description"
                name="description"
                className="form-input"
                rows="2"
                value={formData.description}
                onChange={onChange}
              ></textarea>
            </div>
            
            <div className="form-row" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <div className="form-group" style={{ flex: 1 }}>
                <label htmlFor="quantity" className="form-label">Quantity</label>
                <input
                  type="number"
                  id="quantity"
                  name="quantity"
                  className="form-input"
                  value={formData.quantity}
                  onChange={onChange}
                  min="0"
                  disabled={formData.type === 'non-inventory'} // Disable for non-inventory items
                />
              </div>
              
              <div className="form-group" style={{ flex: 1 }}>
                <label htmlFor="unit" className="form-label">Unit</label>
                <input
                  type="text"
                  id="unit"
                  name="unit"
                  className="form-input"
                  value={formData.unit}
                  onChange={onChange}
                  required
                />
              </div>
            </div>
            
            <div className="form-row" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <div className="form-group" style={{ flex: 1 }}>
                <label htmlFor="minLevel" className="form-label">Min Level</label>
                <input
                  type="number"
                  id="minLevel"
                  name="minLevel"
                  className="form-input"
                  value={formData.minLevel}
                  onChange={onChange}
                  min="0"
                  disabled={formData.type === 'non-inventory'} // Disable for non-inventory items
                />
              </div>
              
              <div className="form-group" style={{ flex: 1 }}>
                <label htmlFor="maxLevel" className="form-label">Max Level</label>
                <input
                  type="number"
                  id="maxLevel"
                  name="maxLevel"
                  className="form-input"
                  value={formData.maxLevel}
                  onChange={onChange}
                  min="0"
                  disabled={formData.type === 'non-inventory'} // Disable for non-inventory items
                />
              </div>
            </div>
            
            <div className="form-row" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <div className="form-group" style={{ flex: 1 }}>
                <label htmlFor="costPrice" className="form-label">Cost Price ($)</label>
                <input
                  type="number"
                  id="costPrice"
                  name="costPrice"
                  className="form-input"
                  value={formData.costPrice}
                  onChange={onChange}
                  min="0"
                  step="0.01"
                  required
                />
              </div>
              
              <div className="form-group" style={{ flex: 1 }}>
                <label htmlFor="originalPrice" className="form-label">Original Price ($)</label>
                <input
                  type="number"
                  id="originalPrice"
                  name="originalPrice"
                  className="form-input"
                  value={formData.originalPrice}
                  onChange={onChange}
                  min="0"
                  step="0.01"
                />
              </div>

              <div className="form-group" style={{ flex: 1 }}>
                <label htmlFor="sellingPrice" className="form-label">Selling Price ($)</label>
                <input
                  type="number"
                  id="sellingPrice"
                  name="sellingPrice"
                  className="form-input"
                  value={formData.sellingPrice}
                  onChange={onChange}
                  min="0"
                  step="0.01"
                  required
                />
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="supplier" className="form-label">Supplier</label>
              <input
                type="text"
                id="supplier"
                name="supplier"
                className="form-input"
                value={formData.supplier}
                onChange={onChange}
              />
            </div>
            
            <div className="form-group">
              <label>
                <input
                  type="checkbox"
                  name="isActive"
                  checked={formData.isActive}
                  onChange={onChange}
                /> Active
              </label>
            </div>
            
            <button type="submit" className="btn btn-success" style={{ backgroundColor: '#4F7F2F', border: 'none' }}>Save Stock Item</button>
          </form>
        )}
        
        <table className="table">
          <thead>
            <tr>
              <th style={{ color: 'white' }}>Name</th>
              <th style={{ color: 'white' }}>Type</th>
              <th style={{ color: 'white' }}>Quantity</th>
              <th style={{ color: 'white' }}>Unit</th>
              <th style={{ color: 'white' }}>Min/Max Level</th>
              <th style={{ color: 'white' }}>Cost/Selling Price</th>
              <th style={{ color: 'white' }}>Status</th>
              <th style={{ color: 'white' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {stockItems.map(item => (
              <tr key={item._id} style={item.type === 'inventory' && item.quantity <= item.minLevel ? { backgroundColor: '#ffebee' } : {}}>
                <td>
                  <strong>{item.name}</strong>
                  <br />
                  <small style={{ color: '#666' }}>{item.supplier}</small>
                </td>
                <td>
                  <span style={{
                    padding: '0.25rem 0.5rem',
                    borderRadius: '4px',
                    backgroundColor: item.type === 'inventory' ? '#e3f2fd' : '#f3e5f5',
                    color: item.type === 'inventory' ? '#1976d2' : '#7b1fa2'
                  }}>
                    {item.type}
                  </span>
                </td>
                <td>
                  {item.type === 'inventory' ? `${item.quantity} ${item.unit}` : 'N/A'}
                </td>
                <td>{item.unit}</td>
                <td>
                  {item.type === 'inventory' ? `${item.minLevel}/${item.maxLevel}` : 'N/A'}
                </td>
                <td>
                  ${item.costPrice.toFixed(2)} / ${item.sellingPrice.toFixed(2)}
                </td>
                <td>
                  {item.isActive ? (
                    <span style={{ color: 'green', fontWeight: 'bold' }}>Active</span>
                  ) : (
                    <span style={{ color: 'red', fontWeight: 'bold' }}>Inactive</span>
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

export default Stock;