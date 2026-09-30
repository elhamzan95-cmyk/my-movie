import api from './api';

const handleError = (error) => {
  if (error.response?.data) {
    return error.response.data;
  }
  return {
    success: false,
    message: 'Server connection error'
  };
};

// ======================
// 📊 System statistics
// ======================
export const getAdminStats = async () => {
  try {
    const response = await api.get('/admin/stats');
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

// ======================
// 👥 User management
// ======================
export const getUsers = async (params = {}) => {
  try {
    const response = await api.get('/admin/users', { params });
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

export const getUser = async (userId) => {
  try {
    const response = await api.get(`/admin/users/${userId}`);
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

export const deleteUser = async (userId) => {
  try {
    const response = await api.delete(`/admin/users/${userId}`);
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

export const updateUserRole = async (userId, role) => {
  try {
    const response = await api.patch(`/admin/users/${userId}/role`, { role });
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

export const deleteMultipleUsers = async (userIds) => {
  try {
    const response = await api.delete('/admin/users', { data: { userIds } });
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

// ======================
// 🎬 Movie management
// ======================
export const getMovies = async (params = {}) => {
  try {
    const response = await api.get('/admin/movies', { params });
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

export const deleteMovie = async (movieId) => {
  try {
    const response = await api.delete(`/admin/movies/${movieId}`);
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

export const deleteMultipleMovies = async (movieIds) => {
  try {
    const response = await api.delete('/admin/movies', { data: { movieIds } });
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

// ======================
// 💬 Comment management
// ======================
export const getComments = async (params = {}) => {
  try {
    const response = await api.get('/admin/comments', { params });
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

export const approveComment = async (commentId) => {
  try {
    const response = await api.patch(`/admin/comments/${commentId}/approve`);
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

export const deleteComment = async (commentId) => {
  try {
    const response = await api.delete(`/admin/comments/${commentId}`);
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

// ======================
// 🧪 Admin access test
// ======================
export const testAdminAccess = async () => {
  try {
    const response = await api.get('/admin/test');
    return response.data;
  } catch (error) {
    if (error.response?.status === 403) {
      throw {
        success: false,
        message: 'Access denied. You are not an admin.'
      };
    }
    throw handleError(error);
  }
};

// ======================
// 📈 Activity report
// ======================
export const getActivityReport = async (params = {}) => {
  try {
    const response = await api.get('/admin/reports/activity', { params });
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};