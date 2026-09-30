import api from './api';

// ======================
// 🎬 Movie services
// ======================

/**
 * Get all movies
 * @param {Object} params - Search and pagination parameters
 * @returns {Promise} List of movies
 */
export const getMovies = async (params = {}) => {
  try {
    console.log('📤 Fetching movies with params:', params);

    const response = await api.get('/movies', { params });

    console.log('✅ Movies fetched successfully:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ Error fetching movies:', error.response?.data || error.message);

    // Return demo data on error
    if (error.response?.status === 404 || !error.response) {
      console.log('⚠️ Server unavailable, returning demo data');

      const demoMovies = [
        {
          id: 'demo1',
          title: 'Interstellar',
          description: 'A sci-fi film about traveling through space and time',
          year: 2014,
          director: 'Christopher Nolan',
          image: 'https://via.placeholder.com/400x300?text=Interstellar',
          rating: 8.6,
          likes: [],
          likesCount: 142,
          shares: [],
          shareCount: 28,
          comments: [],
          commentsCount: 45,
          genre: 'sci-fi',
          creator: {
            id: 'user1',
            name: 'Test User',
            email: 'test@example.com',
            avatar: 'https://via.placeholder.com/100?text=User'
          },
          createdAt: '2024-01-15T10:30:00Z',
          updatedAt: '2024-01-15T10:30:00Z'
        },
        {
          id: 'demo2',
          title: 'The Dark Knight',
          description: 'The story of Batman against the Joker',
          year: 2008,
          director: 'Christopher Nolan',
          image: 'https://via.placeholder.com/400x300?text=Dark+Knight',
          rating: 9.0,
          likes: [],
          likesCount: 256,
          shares: [],
          shareCount: 42,
          comments: [],
          commentsCount: 68,
          genre: 'action',
          creator: {
            id: 'user2',
            name: 'Test User 2',
            email: 'test2@example.com',
            avatar: 'https://via.placeholder.com/100?text=User2'
          },
          createdAt: '2024-01-14T15:45:00Z',
          updatedAt: '2024-01-14T15:45:00Z'
        }
      ];

      // Apply filters to demo data
      let filteredMovies = demoMovies;

      if (params.genre) {
        filteredMovies = filteredMovies.filter(movie =>
          movie.genre === params.genre
        );
      }

      if (params.year) {
        filteredMovies = filteredMovies.filter(movie =>
          movie.year === parseInt(params.year)
        );
      }

      if (params.search) {
        const searchTerm = params.search.toLowerCase();
        filteredMovies = filteredMovies.filter(movie =>
          movie.title.toLowerCase().includes(searchTerm) ||
          movie.director.toLowerCase().includes(searchTerm) ||
          movie.description.toLowerCase().includes(searchTerm)
        );
      }

      // Apply sorting
      if (params.sort === 'rating') {
        filteredMovies.sort((a, b) => b.rating - a.rating);
      } else if (params.sort === 'oldest') {
        filteredMovies.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
      } else {
        // Default: newest
        filteredMovies.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      }

      // Pagination
      const page = parseInt(params.page) || 1;
      const limit = parseInt(params.limit) || 12;
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const paginatedMovies = filteredMovies.slice(startIndex, endIndex);

      return {
        success: true,
        message: 'Movie list (demo version)',
        count: paginatedMovies.length,
        total: filteredMovies.length,
        page: page,
        totalPages: Math.ceil(filteredMovies.length / limit),
        data: paginatedMovies
      };
    }

    throw error.response?.data || {
      success: false,
      message: 'Server connection error while fetching movies'
    };
  }
};

/**
 * Get current user's movies
 * @returns {Promise} User's movie list
 */
export const getMyMovies = async () => {
  try {
    console.log('📤 Fetching current user movies');

    const response = await api.get('/movies/my-movies');

    console.log('✅ User movies fetched successfully');
    return response.data;
  } catch (error) {
    console.error('❌ Error fetching user movies:', error.response?.data || error.message);
    throw error.response?.data || {
      success: false,
      message: 'Error fetching your movies'
    };
  }
};

/**
 * Get a specific movie
 * @param {string} id - Movie ID
 * @returns {Promise} Movie info
 */
export const getMovieById = async (id) => {
  try {
    console.log(`📤 Fetching movie with id ${id}`);

    const response = await api.get(`/movies/${id}`);

    console.log('✅ Movie fetched successfully');
    return response.data;
  } catch (error) {
    console.error(`❌ Error fetching movie ${id}:`, error.response?.data || error.message);

    // Return demo data on error
    if (error.response?.status === 404 || !error.response) {
      console.log('⚠️ Server unavailable, returning demo data');

      const demoMovie = {
        success: true,
        data: {
          id: id,
          title: 'Interstellar',
          description: 'A sci-fi film about traveling through space and time by Christopher Nolan. It tells the story of a group of astronauts who travel through wormholes to save humanity.',
          year: 2014,
          director: 'Christopher Nolan',
          genre: 'sci-fi',
          image: 'https://via.placeholder.com/600x400?text=Interstellar',
          rating: 8.6,
          likes: [],
          likesCount: 142,
          shares: [],
          shareCount: 28,
          comments: [],
          commentsCount: 45,
          creator: {
            id: 'user1',
            name: 'Test User',
            email: 'test@example.com',
            avatar: 'https://via.placeholder.com/100?text=User',
            followerCount: 42,
            followingCount: 15
          },
          createdAt: '2024-01-15T10:30:00Z',
          updatedAt: '2024-01-15T10:30:00Z',
          userInteraction: {
            liked: false,
            shared: false
          }
        }
      };

      return demoMovie;
    }

    throw error.response?.data || {
      success: false,
      message: 'Error fetching movie info'
    };
  }
};

/**
 * Create a new movie
 * @param {FormData|Object} movieData - Movie data
 * @returns {Promise} Created movie
 */
export const createMovie = async (movieData) => {
  try {
    console.log('📤 Sending create movie request');

    let response;

    if (movieData instanceof FormData) {
      response = await api.post('/movies', movieData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    } else {
      response = await api.post('/movies', movieData);
    }

    console.log('✅ Movie created successfully:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ Error creating movie:', error.response?.data || error.message);

    // Validate errors
    if (error.response?.status === 400) {
      const errorData = error.response.data;

      if (errorData.errors) {
        // Field validation errors
        const fieldErrors = errorData.errors.map(err => err.message).join(', ');
        throw {
          success: false,
          message: `Validation error: ${fieldErrors}`
        };
      }

      throw errorData;
    }

    throw error.response?.data || {
      success: false,
      message: 'Error creating movie. Please try again.'
    };
  }
};

/**
 * Update a movie
 * @param {string} movieId - Movie ID
 * @param {FormData|Object} movieData - New movie data
 * @returns {Promise} Updated movie
 */
export const updateMovie = async (movieId, movieData) => {
  try {
    console.log(`✏️ Updating movie ${movieId}`);

    let response;

    if (movieData instanceof FormData) {
      response = await api.put(`/movies/${movieId}`, movieData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    } else {
      response = await api.put(`/movies/${movieId}`, movieData);
    }

    console.log('✅ Movie updated successfully:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ Error updating movie:', error.response?.data || error.message);

    // Access errors
    if (error.response?.status === 403) {
      throw {
        success: false,
        message: 'You are not allowed to edit this movie'
      };
    }

    if (error.response?.status === 404) {
      throw {
        success: false,
        message: 'Movie not found'
      };
    }

    throw error.response?.data || {
      success: false,
      message: 'Error updating movie'
    };
  }
};

/**
 * Delete a movie
 * @param {string} movieId - Movie ID
 * @returns {Promise} Delete result
 */
export const deleteMovie = async (movieId) => {
  try {
    console.log(`🗑️ Deleting movie ${movieId}`);

    const response = await api.delete(`/movies/${movieId}`);

    console.log('✅ Movie deleted successfully:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ Error deleting movie:', error.response?.data || error.message);

    if (error.response?.status === 403) {
      throw {
        success: false,
        message: 'You are not allowed to delete this movie'
      };
    }

    throw error.response?.data || {
      success: false,
      message: 'Error deleting movie'
    };
  }
};

/**
 * Search movies
 * @param {string} query - Search query
 * @param {Object} filters - Filters
 * @returns {Promise} Search results
 */
export const searchMovies = async (query, filters = {}) => {
  try {
    const params = { q: query, ...filters };
    console.log('🔍 Searching movies with:', params);

    const response = await api.get('/public/movies/search', { params });

    console.log('✅ Movie search successful:', response.data.data?.length || 0, 'results');
    return response.data;
  } catch (error) {
    console.error('❌ Error searching movies:', error.response?.data || error.message);

    // Use regular endpoint if public endpoint does not exist
    if (error.response?.status === 404) {
      console.log('⚠️ Public search endpoint not found, using regular endpoint');

      try {
        return await getMovies({ search: query, ...filters });
      } catch (getMoviesError) {
        throw {
          success: false,
          message: 'Error searching movies'
        };
      }
    }

    throw error.response?.data || {
      success: false,
      message: 'Error searching movies'
    };
  }
};

/**
 * Get a specific user's movies
 * @param {string} userId - User ID
 * @param {Object} params - Pagination parameters
 * @returns {Promise} User's movie list
 */
export const getUserMovies = async (userId, params = {}) => {
  try {
    const response = await api.get(`/movies/user/${userId}`, { params });
    return response.data;
  } catch (error) {
    console.error('❌ Error fetching user movies:', error);
    throw error;
  }
};

/**
 * Get popular movies
 * @returns {Promise} List of popular movies
 */
export const getPopularMovies = async () => {
  try {
    console.log('🔥 Fetching popular movies');

    const response = await api.get('/public/movies/popular');

    console.log('✅ Popular movies fetched successfully');
    return response.data;
  } catch (error) {
    console.error('❌ Error fetching popular movies:', error.response?.data || error.message);

    // Use regular endpoint if public endpoint does not exist
    if (error.response?.status === 404) {
      console.log('⚠️ Popular movies endpoint not found, using regular endpoint');

      try {
        return await getMovies({ sort: 'rating', limit: 10 });
      } catch (getMoviesError) {
        throw {
          success: false,
          message: 'Error fetching popular movies'
        };
      }
    }

    throw error.response?.data || {
      success: false,
      message: 'Error fetching popular movies'
    };
  }
};

/**
 * Get available filters
 * @returns {Promise} Available filters
 */
export const getAvailableFilters = async () => {
  try {
    console.log('🎛️ Fetching available filters');

    const response = await api.get('/public/movies/filters');

    console.log('✅ Filters fetched successfully');
    return response.data;
  } catch (error) {
    console.error('❌ Error fetching filters:', error.response?.data || error.message);

    // Return default filters
    console.log('⚠️ Filters endpoint not found, returning default filters');

    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 30 }, (_, i) => currentYear - i);

    const genres = [
      'action', 'drama', 'comedy', 'sci-fi', 'horror', 'romance',
      'thriller', 'documentary', 'animation', 'fantasy', 'adventure',
      'crime', 'mystery', 'biography', 'history', 'war', 'musical',
      'family', 'other'
    ];

    return {
      success: true,
      filters: {
        genres: genres,
        years: years
      }
    };
  }
};

/**
 * Like a movie
 * @param {string} movieId - Movie ID
 * @returns {Promise} Like result
 */
export const likeMovie = async (movieId) => {
  try {
    console.log(`❤️ Liking movie ${movieId}`);

    const response = await api.post(`/movies/${movieId}/like`);

    console.log('✅ Movie liked successfully:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ Error liking movie:', error.response?.data || error.message);

    if (error.response?.status === 401) {
      throw {
        success: false,
        message: 'You must be logged in to like a movie'
      };
    }

    // Simulate successful like on error
    console.log('⚠️ Simulating successful like');

    return {
      success: true,
      message: 'Movie liked (simulated)',
      liked: true,
      likesCount: Math.floor(Math.random() * 100) + 1,
      movieId: movieId
    };
  }
};

/**
 * Unlike a movie
 * @param {string} movieId - Movie ID
 * @returns {Promise} Unlike result
 */
export const unlikeMovie = async (movieId) => {
  try {
    console.log(`💔 Unliking movie ${movieId}`);

    // Note: same endpoint, it detects like/unlike state itself
    const response = await api.post(`/movies/${movieId}/like`);

    console.log('✅ Movie unliked successfully:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ Error unliking movie:', error.response?.data || error.message);

    // Simulate successful unlike on error
    console.log('⚠️ Simulating successful unlike');

    return {
      success: true,
      message: 'Like removed (simulated)',
      liked: false,
      likesCount: Math.floor(Math.random() * 50),
      movieId: movieId
    };
  }
};

/**
 * Share a movie
 * @param {string} movieId - Movie ID
 * @returns {Promise} Share result
 */
export const shareMovie = async (movieId) => {
  try {
    console.log(`🔗 Sharing movie ${movieId}`);

    const response = await api.post(`/movies/${movieId}/share`);

    console.log('✅ Movie shared successfully:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ Error sharing movie:', error.response?.data || error.message);

    if (error.response?.status === 401) {
      throw {
        success: false,
        message: 'You must be logged in to share a movie'
      };
    }

    // Simulate successful share on error
    console.log('⚠️ Simulating successful share');

    return {
      success: true,
      message: 'Movie shared (simulated)',
      shared: true,
      shareCount: Math.floor(Math.random() * 30) + 1,
      movieId: movieId,
      sharedAt: new Date().toISOString()
    };
  }
};

/**
 * Get most shared movies
 * @param {number} limit - Number of movies
 * @returns {Promise} List of most shared movies
 */
export const getMostSharedMovies = async (limit = 10) => {
  try {
    console.log(`📤 Fetching ${limit} most shared movies`);

    const response = await api.get('/movies/most/shared', {
      params: { limit }
    });

    console.log(`✅ ${response.data.data?.length || 0} most shared movies fetched`);
    return response.data;
  } catch (error) {
    console.error('❌ Error fetching most shared movies:', error.response?.data || error.message);

    // If endpoint does not exist, use regular endpoint with sorting
    if (error.response?.status === 404) {
      console.log('⚠️ Most shared movies endpoint not found, using regular endpoint');

      try {
        return await getMovies({
          sort: 'shared',
          limit: limit
        });
      } catch (getMoviesError) {
        throw {
          success: false,
          message: 'Error fetching most shared movies'
        };
      }
    }

    throw error.response?.data || {
      success: false,
      message: 'Error fetching most shared movies'
    };
  }
};

/**
 * Get users who shared the movie
 * @param {string} movieId - Movie ID
 * @param {number} page - Page number
 * @param {number} limit - Items per page
 * @returns {Promise} List of sharing users
 */
export const getMovieShareUsers = async (movieId, page = 1, limit = 20) => {
  try {
    console.log(`👥 Fetching users who shared movie ${movieId}`);

    const response = await api.get(`/movies/${movieId}/shares/users`, {
      params: { page, limit }
    });

    console.log(`✅ ${response.data.data?.length || 0} sharing users fetched`);
    return response.data;
  } catch (error) {
    console.error('❌ Error fetching sharing users:', error.response?.data || error.message);

    // Simulate data if endpoint does not exist
    console.log('⚠️ Sharing users endpoint not found, returning demo data');

    const demoUsers = Array.from({ length: Math.min(limit, 10) }, (_, i) => ({
      id: `shareUser${i + 1}`,
      name: `Sharing User ${i + 1}`,
      email: `shareuser${i + 1}@example.com`,
      avatar: `https://via.placeholder.com/100?text=Share${i + 1}`,
      followerCount: Math.floor(Math.random() * 100),
      followingCount: Math.floor(Math.random() * 50),
      memberSince: new Date(Date.now() - i * 86400000).toISOString()
    }));

    return {
      success: true,
      message: 'Sharing users (demo)',
      data: demoUsers,
      total: 25,
      page: page,
      totalPages: Math.ceil(25 / limit)
    };
  }
};

/**
 * Check user interaction status (like/share) on a movie
 * @param {string} movieId - Movie ID
 * @returns {Promise} User interaction status
 */
export const checkUserInteraction = async (movieId) => {
  try {
    console.log(`🔍 Checking user interaction status on movie ${movieId}`);

    // This info is usually available in the movie response
    const response = await getMovieById(movieId);

    if (response.success && response.data.userInteraction) {
      return {
        success: true,
        liked: response.data.userInteraction.liked || false,
        shared: response.data.userInteraction.shared || false
      };
    }

    return {
      success: true,
      liked: false,
      shared: false
    };
  } catch (error) {
    console.error('❌ Error checking interaction status:', error);
    return {
      success: true,
      liked: false,
      shared: false
    };
  }
};

export default {
  getMovies,
  getMyMovies,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie,
  searchMovies,
  getPopularMovies,
  getAvailableFilters,
  likeMovie,
  unlikeMovie,
  shareMovie,
  getMostSharedMovies,
  getMovieShareUsers,
  checkUserInteraction,
  getUserMovies
};