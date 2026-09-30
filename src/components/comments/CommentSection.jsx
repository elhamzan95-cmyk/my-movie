// src/components/comments/CommentSection.jsx
import { useAuth } from '@/context/AuthContext';
import { useComments } from '@/hooks/useComments';
import CommentForm from './CommentForm';
import CommentList from './CommentList';

const CommentSection = ({ movieId }) => {
  const { user } = useAuth();
  const {
    comments,
    loading,
    hasMore,
    loadMore,
    addComment,
    toggleLike,
    addReply,
  } = useComments(movieId);

  return (
    <div className="bg-[#2A2A2A] rounded-xl shadow-md p-6 border border-gray-700">
      <h3 className="text-xl font-bold text-white mb-6">Comments</h3>
      <CommentForm movieId={movieId} user={user} onSubmit={addComment} />
      <div className="mt-8">
        <CommentList
          comments={comments}
          loading={loading}
          user={user}
          onLoadMore={loadMore}
          hasMore={hasMore}
          onLike={toggleLike}
          onReply={addReply}
        />
      </div>
    </div>
  );
};

export default CommentSection;