import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

const CartDrawer = () => {
  const dispatch = useDispatch();
  const { items, isOpen } = useSelector(state => state.cart);

  if (!isOpen) return null;

  const total = items.reduce((acc, item) => acc + (item.sellingPrice * item.qty), 0);

  const styles = {
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      zIndex: 1000
    },
    drawer: {
      position: 'fixed',
      top: 0,
      right: 0,
      bottom: 0,
      width: '350px',
      backgroundColor: 'white',
      boxShadow: '-2px 0 10px rgba(0,0,0,0.1)',
      zIndex: 1001,
      display: 'flex',
      flexDirection: 'column',
      padding: '20px'
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '20px',
      borderBottom: '1px solid #eee',
      paddingBottom: '10px'
    },
    itemList: {
      flex: 1,
      overflowY: 'auto',
      marginBottom: '20px'
    },
    item: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '10px 0',
      borderBottom: '1px solid #f9f9f9'
    },
    qtyControl: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px'
    },
    footer: {
      borderTop: '1px solid #eee',
      paddingTop: '20px'
    },
    totalRow: {
      display: 'flex',
      justifyContent: 'space-between',
      fontWeight: 'bold',
      fontSize: '18px',
      marginBottom: '20px'
    },
    checkoutBtn: {
      width: '100%',
      backgroundColor: '#38B28B',
      color: 'white',
      border: 'none',
      padding: '15px',
      borderRadius: '8px',
      fontWeight: 'bold',
      fontSize: '16px',
      cursor: 'pointer'
    },
    closeBtn: {
      background: 'none',
      border: 'none',
      fontSize: '24px',
      cursor: 'pointer'
    }
  };

  return (
    <>
      <div style={styles.overlay} onClick={() => dispatch({ type: 'TOGGLE_CART' })}></div>
      <div style={styles.drawer}>
        <div style={styles.header}>
          <h2>Your Cart</h2>
          <button style={styles.closeBtn} onClick={() => dispatch({ type: 'TOGGLE_CART' })}>&times;</button>
        </div>
        
        <div style={styles.itemList}>
          {items.length === 0 ? (
            <p style={{ textAlign: 'center', marginTop: '50px', color: '#888' }}>Your cart is empty</p>
          ) : (
            items.map(item => (
              <div key={item._id} style={styles.item}>
                <div>
                  <div style={{ fontWeight: 'bold' }}>{item.name}</div>
                  <div style={{ fontSize: '14px', color: '#666' }}>Rs. {item.sellingPrice.toFixed(2)}</div>
                </div>
                <div style={styles.qtyControl}>
                  <button onClick={() => dispatch({ type: 'REMOVE_FROM_CART', payload: item._id })}>-</button>
                  <span>{item.qty}</span>
                  <button onClick={() => dispatch({ type: 'ADD_TO_CART', payload: item })}>+</button>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div style={styles.footer}>
            <div style={styles.totalRow}>
              <span>Total:</span>
              <span>Rs. {total.toFixed(2)}</span>
            </div>
            <button style={styles.checkoutBtn}>Proceed to Checkout</button>
            <button 
              style={{ background: 'none', border: 'none', width: '100%', marginTop: '10px', color: '#888', cursor: 'pointer' }}
              onClick={() => dispatch({ type: 'CLEAR_CART' })}
            >
              Clear Cart
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;
