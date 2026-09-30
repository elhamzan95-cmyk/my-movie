import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/context/AuthContext';
import * as commentService from '@/services/comments';

export const useComments = (movieId, initialPage = 1, limit = 10) => {
  const { user } = useAuth(); // Get current user info
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(initialPage);
  const [totalPages, setTotalPages] = useState(1);

  const fetchComments = useCallback(async (pageNum = page) => {
    try {
      setLoading(true);
      const data = await commentService.getMovieComments(movieId, pageNum, limit);
      if (data.success) {
        const newComments = data.comments || data.data || [];
        setComments(prev => (pageNum === 1 ? newComments : [...prev, ...newComments]));
        setTotalPages(data.pagination?.pages || data.totalPages || 1);
      }
    } catch (error) {
      console.error('❌ Error fetching comments:', error);
    } finally {
      setLoading(false);
    }
  }, [movieId, page, limit]);

  useEffect(() => {
    if (movieId) fetchComments(1);
  }, [movieId]);

  const addComment = async (text, rating = null) => {
    try {
      const response = await commentService.createComment(movieId, text, rating);

      let newComment = null;
      if (response.success && response.comment) {
        newComment = response.comment;
      } else if (response.data && response.data._id) {
        newComment = response.data;
      } else if (response._id) {
        newComment = response;
      }

      if (newComment && (newComment._id || newComment.id)) {
        setComments(prev => [newComment, ...prev]);
        return { success: true, comment: newComment };
      } else {
        console.error('❌ Created comment has no ID:', response);
        return { success: false, error: 'Invalid comment ID' };
      }
    } catch (error) {
      console.error('❌ Error adding comment:', error);
      return { success: false, error };
    }
  };

  const toggleLike = async (commentId) => {
    if (!user) return; // If user is not logged in, do nothing

    try {
      const response = await commentService.likeComment(commentId);
      if (response.success) {
        setComments(prev =>
          prev.map(comment => {
            if (comment._id === commentId || comment.id === commentId) {
              // Manually compute likes array based on new state
              const newLikes = response.likes
                ? response.likes
                : (response.liked
                  ? [...(comment.likes || []), user.id] // add userId
                  : (comment.likes || []).filter(id => id !== user.id)); // remove userId

              return {
                ...comment,
                likes: newLikes,
                likesCount: response.likeCount || newLikes.length,
                liked: response.liked !== undefined ? response.liked : !comment.liked,
              };
            }
            return comment;
          })
        );
      }
      return response;
    } catch (error) {
      console.error('❌ Error liking comment:', error);
    }
  };

  const addReply = async (commentId, text) => {
    try {
      const response = await commentService.addReply(commentId, text);
      if (response.success) {
        setComments(prev =>
          prev.map(comment => {
            if (comment._id === commentId || comment.id === commentId) {
              return {
                ...comment,
                replies: [...(comment.replies || []), response.data],
              };
            }
            return comment;
          })
        );
      }
      return response;
    } catch (error) {
      console.error('❌ Error adding reply:', error);
    }
  };

  const loadMore = () => {
    if (page < totalPages) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchComments(nextPage);
    }
  };

  return {
    comments,
    loading,
    hasMore: page < totalPages,
    loadMore,
    addComment,
    toggleLike,
    addReply,
  };
};