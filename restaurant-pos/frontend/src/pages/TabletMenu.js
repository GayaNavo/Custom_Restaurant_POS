import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import CartDrawer from '../components/orders/CartDrawer';

const TabletMenu = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('All Brands');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);
  const cartTotalQty = cartItems.reduce((acc, item) => acc + item.qty, 0);

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const fetchMenuItems = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('/api/menu/tablet', {
        headers: {
          'x-auth-token': token
        }
      });
      setItems(res.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching menu items:', err);
      setLoading(false);
      // Mock data if API fails or for testing
      setItems([
        { _id: '1', name: 'KultureP', category: 'Rice', brand: 'Kulture', sellingPrice: 1000, originalPrice: 1100, quantity: 15, image: '' },
        { _id: '2', name: 'res_pos_01', category: 'Beverages', brand: 'restaurant', sellingPrice: 198, originalPrice: 200, quantity: 493, image: '' },
        { _id: '3', name: 'COCACOLA', category: 'Beverages', brand: 'Coca cola', sellingPrice: 4500, quantity: 10, image: '' },
        { _id: '4', name: 'foriegn local2', category: 'Beverages', brand: 'Kulture', sellingPrice: 885, originalPrice: 900, quantity: 20, image: '' },
      ]);
    }
  };

  const addToCart = (item) => {
    dispatch({ type: 'ADD_TO_CART', payload: item });
  };

  const brands = ['All Brands', ...new Set(items.map(item => item.brand).filter(Boolean))];
  const categories = ['All Categories', ...new Set(items.map(item => item.category).filter(Boolean))];

  const filteredItems = items.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBrand = selectedBrand === 'All Brands' || item.brand === selectedBrand;
    const matchesCategory = selectedCategory === 'All Categories' || item.category === selectedCategory;
    return matchesSearch && matchesBrand && matchesCategory;
  });

  const styles = {
    container: {
      padding: '20px',
      backgroundColor: '#f9f9f9',
      minHeight: '100vh',
      fontFamily: 'Arial, sans-serif'
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '20px'
    },
    backButton: {
      backgroundColor: '#38B28B',
      color: 'white',
      border: 'none',
      borderRadius: '50%',
      width: '40px',
      height: '40px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer'
    },
    cartButton: {
      backgroundColor: '#38B28B',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      padding: '10px 20px',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      fontWeight: 'bold',
      cursor: 'pointer'
    },
    searchContainer: {
      marginBottom: '20px',
      position: 'relative'
    },
    searchInput: {
      width: '100%',
      padding: '12px 40px',
      borderRadius: '8px',
      border: '1px solid #ddd',
      fontSize: '16px',
      outline: 'none'
    },
    filterSection: {
      marginBottom: '20px',
      display: 'flex',
      flexDirection: 'column',
      gap: '10px'
    },
    filterLabel: {
      fontWeight: 'bold',
      color: '#333'
    },
    filterGroup: {
      display: 'flex',
      gap: '10px',
      overflowX: 'auto',
      paddingBottom: '5px'
    },
    filterPill: (active) => ({
      padding: '8px 20px',
      borderRadius: '20px',
      backgroundColor: active ? '#38B28B' : '#e0e0e0',
      color: active ? 'white' : '#555',
      border: 'none',
      whiteSpace: 'nowrap',
      cursor: 'pointer',
      fontSize: '14px',
      transition: 'all 0.2s'
    }),
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
      gap: '20px'
    },
    card: {
      backgroundColor: 'white',
      borderRadius: '12px',
      overflow: 'hidden',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      position: 'relative',
      display: 'flex',
      flexDirection: 'column'
    },
    imagePlaceholder: {
      height: '180px',
      backgroundColor: '#f0f0f0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#ccc'
    },
    saveBadge: {
      position: 'absolute',
      top: '10px',
      left: '10px',
      backgroundColor: '#F8A59B',
      color: 'white',
      padding: '4px 10px',
      borderRadius: '12px',
      fontSize: '12px',
      fontWeight: 'bold'
    },
    optionsBadge: {
      position: 'absolute',
      top: '10px',
      right: '10px',
      backgroundColor: '#0E715C',
      color: 'white',
      padding: '4px 10px',
      borderRadius: '8px',
      fontSize: '12px'
    },
    cardContent: {
      padding: '15px',
      textAlign: 'center'
    },
    itemName: {
      fontWeight: 'bold',
      fontSize: '16px',
      marginBottom: '4px',
      color: '#333'
    },
    itemCategory: {
      fontSize: '13px',
      color: '#888',
      marginBottom: '10px'
    },
    priceSection: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'baseline',
      gap: '8px',
      marginBottom: '4px'
    },
    sellingPrice: {
      fontWeight: 'bold',
      fontSize: '18px',
      color: '#0E715C'
    },
    originalPrice: {
      fontSize: '14px',
      color: '#aaa',
      textDecoration: 'line-through'
    },
    availableQty: {
      fontSize: '12px',
      color: '#888'
    },
    addButton: {
      position: 'absolute',
      bottom: '10px',
      right: '10px',
      backgroundColor: 'transparent',
      color: '#38B28B',
      border: 'none',
      fontSize: '24px',
      cursor: 'pointer',
      fontWeight: 'bold'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <button style={styles.backButton}>&lt;</button>
        </div>
        <button style={styles.cartButton} onClick={() => dispatch({ type: 'TOGGLE_CART' })}>
          <span>🛒</span> Cart ({cartTotalQty})
        </button>
      </div>

      <div style={styles.searchContainer}>
        <span style={{ position: 'absolute', left: '15px', top: '12px', color: '#888' }}>🔍</span>
        <input
          type="text"
          placeholder="Search menu items..."
          style={styles.searchInput}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div style={styles.filterSection}>
        <div style={{ display: 'flex', gap: '40px' }}>
          <div style={{ flex: 1 }}>
            <div style={styles.filterLabel}>Filter by Brand</div>
            <div style={styles.filterGroup}>
              {brands.map(brand => (
                <button
                  key={brand}
                  style={styles.filterPill(selectedBrand === brand)}
                  onClick={() => setSelectedBrand(brand)}
                >
                  {brand}
                </button>
              ))}
            </div>
          </div>
          <div style={{ flex: 1 }}>
            <div style={styles.filterLabel}>Filter by Category</div>
            <div style={styles.filterGroup}>
              {categories.map(cat => (
                <button
                  key={cat}
                  style={styles.filterPill(selectedCategory === cat)}
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div style={styles.grid}>
        {filteredItems.map(item => {
          const savings = item.originalPrice ? Math.round(item.originalPrice - item.sellingPrice) : 0;
          return (
            <div key={item._id} style={styles.card}>
              {savings > 0 && <div style={styles.saveBadge}>Save Rs. {savings}</div>}
              <div style={styles.optionsBadge}>Options</div>
              <div style={styles.imagePlaceholder}>
                <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 3h18v18H3zM3 9h18M9 3v18" />
                </svg>
              </div>
              <div style={styles.cardContent}>
                <div style={styles.itemName}>{item.name}</div>
                <div style={styles.itemCategory}>{item.category}</div>
                <div style={styles.priceSection}>
                  <div style={styles.sellingPrice}>Rs. {item.sellingPrice.toFixed(2)}</div>
                  {item.originalPrice && <div style={styles.originalPrice}>Rs. {item.originalPrice.toFixed(2)}</div>}
                </div>
                <div style={styles.availableQty}>{item.quantity} available</div>
              </div>
              <button style={styles.addButton} onClick={() => addToCart(item)}>+</button>
            </div>
          );
        })}
      </div>
      
      {loading && <p style={{ textAlign: 'center', marginTop: '20px' }}>Loading items...</p>}
      {!loading && filteredItems.length === 0 && <p style={{ textAlign: 'center', marginTop: '20px' }}>No items found.</p>}
      
      <CartDrawer />
    </div>
  );
};

export default TabletMenu;
