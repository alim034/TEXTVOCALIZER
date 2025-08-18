import { createContext, useContext, useEffect, useReducer } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Auth reducer
const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
    case 'REGISTER_SUCCESS':
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
        loading: false,
        error: null
      };
    case 'LOGOUT':
      localStorage.removeItem('token');
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        token: null,
        loading: false,
        error: null
      };
    case 'USER_LOADED':
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
        loading: false,
        error: null
      };
    case 'AUTH_ERROR':
      localStorage.removeItem('token');
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        token: null,
        loading: false,
        error: action.payload
      };
    case 'SET_LOADING':
      return {
        ...state,
        loading: true,
        error: null
      };
    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null
      };
    default:
      return state;
  }
};

// Initial state
const initialState = {
  isAuthenticated: false,
  user: null,
  token: localStorage.getItem('token'),
  loading: false,
  error: null
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Set auth token for axios
  const setAuthToken = (token) => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  };

  // Load user
  const loadUser = async () => {
    const token = localStorage.getItem('token');
    
    if (token) {
      setAuthToken(token);
      dispatch({ type: 'SET_LOADING' });
      
      try {
        const res = await axios.get('/api/auth/me');
        
        if (res.data.success) {
          dispatch({
            type: 'USER_LOADED',
            payload: res.data.user
          });
        } else {
          dispatch({ type: 'AUTH_ERROR', payload: 'Failed to load user' });
        }
      } catch (error) {
        dispatch({ 
          type: 'AUTH_ERROR', 
          payload: error.response?.data?.message || 'Server error' 
        });
      }
    }
  };

  // Register user
  const register = async (userData) => {
    dispatch({ type: 'SET_LOADING' });
    
    try {
      const res = await axios.post('/api/auth/register', userData);
      
      if (res.data.success) {
        dispatch({
          type: 'REGISTER_SUCCESS',
          payload: res.data
        });
        setAuthToken(res.data.token);
        return { success: true, message: res.data.message };
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Registration failed';
      dispatch({ type: 'AUTH_ERROR', payload: errorMessage });
      return { success: false, message: errorMessage };
    }
  };

  // Login user
  const login = async (userData) => {
    dispatch({ type: 'SET_LOADING' });
    
    try {
      const res = await axios.post('/api/auth/login', userData);
      
      if (res.data.success) {
        dispatch({
          type: 'LOGIN_SUCCESS',
          payload: res.data
        });
        setAuthToken(res.data.token);
        return { success: true, message: res.data.message };
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Login failed';
      dispatch({ type: 'AUTH_ERROR', payload: errorMessage });
      return { success: false, message: errorMessage };
    }
  };

  // Logout user
  const logout = () => {
    setAuthToken(null);
    dispatch({ type: 'LOGOUT' });
  };

  // Clear errors
  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  useEffect(() => {
    loadUser();
  }, []);

  const value = {
    ...state,
    register,
    login,
    logout,
    loadUser,
    clearError
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
