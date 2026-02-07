import { configureStore } from '@reduxjs/toolkit';

// Initial state
const initialState = {
  auth: {
    user: null,
    isAuthenticated: false,
    loading: true
  },
  customers: {
    list: [],
    loading: false
  },
  users: {
    list: [],
    loading: false
  },
  menu: {
    items: [],
    loading: false
  },
  stock: {
    items: [],
    loading: false
  },
  orders: {
    list: [],
    loading: false
  },
  cart: {
    items: [],
    isOpen: false
  }
};

// Simple reducer for now (will expand with RTK)
const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_AUTH_USER':
      return {
        ...state,
        auth: {
          ...state.auth,
          user: action.payload,
          isAuthenticated: true,
          loading: false
        }
      };
    case 'LOGOUT_USER':
      return {
        ...state,
        auth: {
          ...state.auth,
          user: null,
          isAuthenticated: false
        }
      };
    case 'ADD_TO_CART':
      const item = action.payload;
      const existItem = state.cart.items.find((x) => x._id === item._id);
      if (existItem) {
        return {
          ...state,
          cart: {
            ...state.cart,
            items: state.cart.items.map((x) =>
              x._id === existItem._id ? { ...x, qty: (x.qty || 1) + 1 } : x
            ),
          },
        };
      } else {
        return {
          ...state,
          cart: {
            ...state.cart,
            items: [...state.cart.items, { ...item, qty: 1 }],
          },
        };
      }
    case 'REMOVE_FROM_CART':
      const itemToDec = state.cart.items.find((x) => x._id === action.payload);
      if (itemToDec.qty > 1) {
        return {
          ...state,
          cart: {
            ...state.cart,
            items: state.cart.items.map((x) =>
              x._id === action.payload ? { ...x, qty: x.qty - 1 } : x
            ),
          },
        };
      } else {
        return {
          ...state,
          cart: {
            ...state.cart,
            items: state.cart.items.filter((x) => x._id !== action.payload),
          },
        };
      }
    case 'TOGGLE_CART':
      return {
        ...state,
        cart: {
          ...state.cart,
          isOpen: !state.cart.isOpen,
        },
      };
    case 'CLEAR_CART':
      return {
        ...state,
        cart: {
          ...state.cart,
          items: [],
        },
      };
    default:
      return state;
  }
};

// Configure store
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

export default store;