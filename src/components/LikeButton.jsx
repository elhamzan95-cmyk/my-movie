// LikeButton.jsx
import { useState, useEffect, useMemo } from 'react';
import { useAuth } from '../context/AuthContext';
import { likeMovie, unlikeMovie } from '../services/movies';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

const LikeButton = ({
  movieId,
  initialLikes = [],
  initialLiked = false,
  showCount = true,
  size = 'md',
  onLikeChange
}) => {
  const { user, loading: authLoading } = useAuth();
  const [likes, setLikes] = useState([]);
  const [isLiked, setIsLiked] = useState(false);
  const [processing, setProcessing] = useState(false);

  const currentUserId = useMemo(() => {
    if (!user) return null;
    return String(user.id || user._id || user.uid).trim();
  }, [user]);

  useEffect(() => {
    if (Array.isArray(initialLikes)) {
      const validLikes = initialLikes
        .map(id => id ? String(id).trim() : null)
        .filter(Boolean);
      setLikes(validLikes);
    }
    setIsLiked(!!initialLiked);
  }, [initialLikes, initialLiked]);

  const validLikesCount = useMemo(() => likes.filter(Boolean).length, [likes]);

  const handleLike = async () => {
    if (authLoading) return;
    if (!user || !currentUserId) {
      alert('You must be logged in to like');
      return;
    }

    setProcessing(true);
    try {
      if (isLiked) {
        const result = await unlikeMovie(movieId);
        setLikes(prev => prev.filter(id => id !== currentUserId));
        setIsLiked(false);
        onLikeChange?.(false, result?.likesCount ?? (likes.length - 1));
      } else {
        const result = await likeMovie(movieId);
        setLikes(prev => (prev.includes(currentUserId) ? prev : [...prev, currentUserId]));
        setIsLiked(true);
        onLikeChange?.(true, result?.likesCount ?? (likes.length + 1));
      }
    } catch (error) {
      console.error('❌ Error:', error);
      alert(error.message || 'Operation error');
      setIsLiked(prev => !prev);
    } finally {
      setProcessing(false);
    }
  };

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
  };

  if (authLoading) {
    return (
      <div className="flex items-center gap-2">
        <button disabled className={`${sizeClasses[size]} rounded-lg bg-orange-500/50 text-white opacity-50 cursor-not-allowed flex items-center gap-2`}>
          <FaRegHeart className="text-lg" />
          <span>...</span>
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={handleLike}
        disabled={processing || !user}
        className={`
          ${sizeClasses[size]} rounded-lg font-medium transition-all duration-200
          bg-orange-500 text-white hover:bg-orange-600
          ${!user ? 'opacity-70 cursor-not-allowed' : ''}
          flex items-center justify-center gap-2
        `}
        title={!user ? 'Log in to like' : ''}
      >
        {processing ? (
          <span className="flex items-center gap-2">
            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            <span>...</span>
          </span>
        ) : (
          <>
            <span className="text-lg">
              {isLiked ? <FaHeart className="text-white" /> : <FaRegHeart className="text-white" />}
            </span>
            <span>{isLiked ? 'Liked' : 'Like'}</span>
          </>
        )}
      </button>
      {showCount && validLikesCount > 0 && (
        <span className={`text-sm ${isLiked ? 'text-orange-400 font-medium' : 'text-gray-400'}`}>
          {validLikesCount.toLocaleString('en-US')}
        </span>
      )}
    </div>
  );
};

export default LikeButton;