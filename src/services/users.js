import api from './api';

// ======================
// 👥 User services
// ======================

export const saveMovie = async (movieId) => {
  try {
    console.log(`📥 Requesting to save movie ${movieId}`);
    const response = await api.post(`/users/save-movie/${movieId}`);
    console.log('✅ Movie saved');
    return response.data;
  } catch (error) {
    console.error('❌ Error saving movie:', error.response?.data || error.message);
    throw error.response?.data || {
      success: false,
      message: 'Error saving movie. Please try again.'
    };
  }
};

export const unsaveMovie = async (movieId) => {
  try {
    console.log(`🗑️ Requesting to remove movie ${movieId} from saved list`);
    const response = await api.delete(`/users/unsave-movie/${movieId}`);
    console.log('✅ Movie removed from saved list');
    return response.data;
  } catch (error) {
    console.error('❌ Error removing movie:', error.response?.data || error.message);
    throw error.response?.data || {
      success: false,
      message: 'Error removing movie. Please try again.'
    };
  }
};

export const getSavedMovies = async () => {
  try {
    console.log('📥 Fetching saved movies');
    const response = await api.get('/users/saved-movies');
    console.log(`✅ ${response.data.savedMovies?.length || 0} saved movies fetched`);
    return response.data;
  } catch (error) {
    console.error('❌ Error fetching saved movies:', error.response?.data || error.message);
    throw error.response?.data || {
      success: false,
      message: 'Error fetching saved movies'
    };
  }
};

export const followUser = async (userId) => {
  try {
    console.log(`📤 Requesting to follow user ${userId}`);
    const response = await api.post(`/users/${userId}/follow`);
    console.log('✅ Follow response:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ Error following user:', error.response?.data || error.message);
    throw error.response?.data || {
      success: false,
      message: 'Server connection error. Please try again.'
    };
  }
};

export const getUserById = async (userId) => {
  try {
    console.log(`📤 Fetching user info for ${userId}`);
    const response = await api.get(`/users/${userId}`);
    console.log('✅ User info fetched');
    return response.data;
  } catch (error) {
    console.error('❌ Error fetching user:', error.response?.data || error.message);
    if (error.response?.status === 404) {
      throw { success: false, message: 'User not found' };
    }
    throw error.response?.data || {
      success: false,
      message: 'Error fetching user info'
    };
  }
};

export const getSuggestedUsers = async () => {
  try {
    console.log('📤 Fetching suggested users');
    const response = await api.get('/users/suggestions');
    console.log(`✅ ${response.data.count} suggested users fetched`);
    return response.data;
  } catch (error) {
    console.error('❌ Error fetching suggestions:', error.response?.data || error.message);
    throw error.response?.data || {
      success: false,
      message: 'Error fetching suggested users'
    };
  }
};

export const getUserFollowers = async (userId, page = 1, limit = 20) => {
  try {
    console.log(`📤 Fetching followers of user ${userId}`);
    const response = await api.get(`/users/${userId}`);
    if (response.data.success) {
      const followers = response.data.user.followers || [];
      const total = followers.length;
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const paginatedFollowers = followers.slice(startIndex, endIndex);
      return {
        success: true,
        data: paginatedFollowers,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit)
        }
      };
    }
    throw new Error('Invalid user data');
  } catch (error) {
    console.error('❌ Error fetching followers:', error);
    throw {
      success: false,
      message: 'Error fetching followers'
    };
  }
};

export const getUserFollowing = async (userId, page = 1, limit = 20) => {
  try {
    console.log(`📤 Fetching following list of user ${userId}`);
    const response = await api.get(`/users/${userId}`);
    if (response.data.success) {
      const following = response.data.user.following || [];
      const total = following.length;
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const paginatedFollowing = following.slice(startIndex, endIndex);
      return {
        success: true,
        data: paginatedFollowing,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit)
        }
      };
    }
    throw new Error('Invalid user data');
  } catch (error) {
    console.error('❌ Error fetching following list:', error);
    throw {
      success: false,
      message: 'Error fetching following list'
    };
  }
};

export const updateProfile = async (userData) => {
  try {
    console.log('📤 Updating profile:', userData);
    const response = await api.put('/users/profile', userData);
    console.log('✅ Profile updated');
    return response.data;
  } catch (error) {
    console.error('❌ Error updating profile:', error.response?.data || error.message);
    throw error.response?.data || {
      success: false,
      message: 'Error updating profile'
    };
  }
};

export const uploadAvatar = async (avatarFile) => {
  try {
    console.log('📤 Uploading avatar:', avatarFile.name);
    const formData = new FormData();
    formData.append('avatar', avatarFile);
    const response = await api.post('/users/avatar', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    console.log('✅ Avatar uploaded');
    return response.data;
  } catch (error) {
    console.error('❌ Error uploading avatar:', error.response?.data || error.message);
    throw error.response?.data || {
      success: false,
      message: 'Error uploading avatar'
    };
  }
};

export const getUserStats = async (userId) => {
  try {
    console.log(`📊 Fetching stats for user ${userId}`);
    const response = await api.get(`/users/${userId}`);
    if (response.data.success) {
      const user = response.data.user;
      const stats = {
        followers: user.followerCount || 0,
        following: user.followingCount || 0,
        savedMovies: user.savedMoviesCount || user.savedMovies?.length || 0,
        favoriteMovies: user.favoriteMovies?.length || 0,
        activityScore: 0
      };
      return { success: true, stats };
    }
    throw new Error('Invalid user data');
  } catch (error) {
    console.error('❌ Error fetching user stats:', error);
    throw {
      success: false,
      message: 'Error fetching user stats'
    };
  }
};

export const checkFollowingStatus = async (userId) => {
  try {
    const response = await api.get(`/users/${userId}`);
    if (response.data.success) {
      const targetUser = response.data.user;
      const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
      const currentUserId = currentUser.id || currentUser._id;

      const isFollowing = targetUser.followers?.some(
        (follower) => (follower.id || follower._id) === currentUserId
      ) || false;

      return {
        isFollowing,
        followerCount: targetUser.followerCount || targetUser.followers?.length || 0
      };
    }
    return { isFollowing: false, followerCount: 0 };
  } catch (error) {
    console.error('❌ Error checking follow status:', error);
    return { isFollowing: false, followerCount: 0 };
  }
};

export const checkMovieSavedStatus = async (movieId) => {
  try {
    console.log(`🔍 Checking saved status for movie ${movieId}`);
    const response = await api.get(`/users/check-saved/${movieId}`);
    return response.data;
  } catch (error) {
    try {
      const savedResponse = await getSavedMovies();
      const isSaved = savedResponse.savedMovies?.some(
        (item) => item.movie?._id === movieId || item.movie === movieId
      ) || false;
      return { success: true, isSaved };
    } catch (savedError) {
      console.error('❌ Error checking saved status:', error);
      throw {
        success: false,
        message: 'Error checking movie saved status'
      };
    }
  }
};

export const getAllUsers = async (params = {}) => {
  try {
    console.log('👥 Fetching all users');
    const response = await api.get('/users/all', { params });
    console.log(`✅ ${response.data.users?.length || 0} users fetched`);
    return response.data;
  } catch (error) {
    console.error('❌ Error fetching users list:', error.response?.data || error.message);
    throw error.response?.data || {
      success: false,
      message: 'Error fetching users list'
    };
  }
};

export const deleteAccount = async (userId) => {
  try {
    console.log(`🗑️ Requesting to delete account for user ${userId}`);
    const response = await api.delete(`/users/${userId}`);
    console.log('✅ Account deleted');
    return response.data;
  } catch (error) {
    console.error('❌ Error deleting account:', error.response?.data || error.message);
    throw error.response?.data || {
      success: false,
      message: 'Error deleting account'
    };
  }
};

// ======================
// 🔍 Search users
// ======================
export const searchUsers = async (query, page = 1, limit = 10) => {
  try {
    console.log(`🔍 Searching users: "${query}"`);
    const response = await api.get('/users/search', {
      params: { q: query, page, limit }
    });
    console.log(`✅ ${response.data.users?.length || 0} search results fetched`);
    return response.data;
  } catch (error) {
    console.error('❌ Error searching users:', error.response?.data || error.message);
    throw error.response?.data || {
      success: false,
      message: 'Error searching users'
    };
  }
};

// ======================
// 🖼️ Upload avatar (with patch)
// ======================
export const updateUserAvatar = async (avatarFile) => {
  const formData = new FormData();
  formData.append('avatar', avatarFile);

  try {
    const response = await api.patch('/users/profile/avatar', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || {
      success: false,
      message: 'Error uploading image'
    };
  }
};

export default {
  saveMovie,
  unsaveMovie,
  getSavedMovies,
  checkMovieSavedStatus,
  followUser,
  getUserById,
  getSuggestedUsers,
  getUserFollowers,
  getUserFollowing,
  updateProfile,
  uploadAvatar,
  getUserStats,
  checkFollowingStatus,
  getAllUsers,
  deleteAccount,
  searchUsers,
  updateUserAvatar,
};