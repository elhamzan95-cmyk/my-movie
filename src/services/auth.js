import api from './api';

// Register a new user
export const register = async (userData) => {
  try {
    console.log('📤 Sending register request:', userData);

    const response = await api.post('/auth/register', userData);

    console.log('✅ Register response:', response.data);

    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }

    return response.data;
  } catch (error) {
    console.error('❌ Register error:', error.response?.data || error.message);
    throw error.response?.data || { message: 'Server connection error' };
  }
};

// User login
export const login = async (credentials) => {
  try {
    console.log('📤 Sending login request:', { ...credentials, password: '***' });

    const response = await api.post('/auth/login', credentials);

    console.log('✅ Login response:', response.data);

    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }

    return response.data;
  } catch (error) {
    console.error('❌ Login error:', error.response?.data || error.message);
    throw error.response?.data || { message: 'Server connection error' };
  }
};

// Get current user info
export const getCurrentUser = async () => {
  try {
    const response = await api.get('/auth/me');
    return response.data;
  } catch (error) {
    console.error('❌ Error getting current user:', error);
    throw error;
  }
};

// Log out user
export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  console.log('✅ User logged out successfully');
};

// Check authentication status
export const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  console.log('🔍 Checking auth status:', !!token);
  return !!token;
};

// Get token
export const getToken = () => {
  return localStorage.getItem('token');
};

// Get user data
export const getUser = () => {
  const userStr = localStorage.getItem('user');
  return userStr ? JSON.parse(userStr) : null;
};