import api from './api';

export const getMovieComments = async (movieId, page = 1, limit = 10) => {
  const response = await api.get(`/comments/movie/${movieId}`, {
    params: { page, limit }
  });
  return response.data;
};

export const createComment = async (movieId, text, rating = null) => {
  const response = await api.post('/comments', { movieId, text, rating });
  return response.data;
};

export const likeComment = async (commentId) => {
  const response = await api.post(`/comments/${commentId}/like`);
  return response.data;
};

export const addReply = async (commentId, text) => {
  const response = await api.post(`/comments/${commentId}/replies`, { text });
  return response.data;
};

export const updateComment = async (commentId, text, rating) => {
  const response = await api.put(`/comments/${commentId}`, { text, rating });
  return response.data;
};

export const deleteComment = async (commentId) => {
  const response = await api.delete(`/comments/${commentId}`);
  return response.data;
};