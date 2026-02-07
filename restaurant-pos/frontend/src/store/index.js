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