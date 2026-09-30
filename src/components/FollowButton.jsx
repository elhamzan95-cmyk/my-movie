import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { followUser } from '../services/users';

const FollowButton = ({ userId, initialIsFollowing = false, initialFollowerCount = 0 }) => {
  const { user } = useAuth();
  const [isFollowing, setIsFollowing] = useState(initialIsFollowing);
  const [followerCount, setFollowerCount] = useState(initialFollowerCount);
  const [loading, setLoading] = useState(false);

  if (!userId) {
    console.warn('⚠️ FollowButton: userId is required but not provided');
    return null;
  }

  const currentUserId = user?._id || user?.id || user?.uid;

  const handleFollow = async () => {
    if (!user) {
      alert('You must be logged in to follow');
      return;
    }

    if (currentUserId === userId) {
      alert('You cannot follow yourself');
      return;
    }

    setLoading(true);
    try {
      const result = await followUser(userId);

      setIsFollowing(result.following);
      setFollowerCount(result.followerCount);
    } catch (error) {
      console.error('❌ Error following user:', error);
      alert(error.message || 'Error performing operation');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={handleFollow}
        disabled={loading}
        className={`px-4 py-2 rounded-lg font-medium transition ${
          isFollowing
            ? 'bg-[#374151] text-white hover:bg-[#4B5563]'
            : 'bg-orange-500 text-white hover:bg-orange-600'
        } disabled:opacity-50 disabled:cursor-not-allowed`}
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span>...</span>
          </span>
        ) : isFollowing ? (
          'Following'
        ) : (
          'Follow'
        )}
      </button>
      <span className="text-sm text-gray-300">
        {followerCount.toLocaleString('en-US')} followers
      </span>
    </div>
  );
};

export default FollowButton;