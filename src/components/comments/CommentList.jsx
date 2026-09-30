import { useState } from 'react';
import CommentItem from './CommentItem';
import LoadingSpinner from '@/components/common/LoadingSpinner';

const CommentList = ({ comments, loading, user, onLoadMore, hasMore, onLike, onReply }) => {
  const [replyingTo, setReplyingTo] = useState(null);

  const handleReply = async (commentId, text) => {
    await onReply(commentId, text);
    setReplyingTo(null);
  };

  if (loading && comments.length === 0) {
    return <LoadingSpinner />;
  }

  if (comments.length === 0) {
    return (
      <div className="text-center py-8 text-gray-400">
        No comments yet. Be the first to comment!
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {comments.map((comment) => {
        // Extract comment ID (supports both _id and id formats)
        const commentId = comment._id || comment.id;
        if (!commentId) {
          console.warn('Comment without ID:', comment);
          return null;
        }

        return (
          <CommentItem
            key={commentId}
            comment={comment}
            user={user}
            onLike={() => onLike(commentId)}
            onReply={(text) => handleReply(commentId, text)}
            replyingTo={replyingTo === commentId}
            setReplyingTo={(val) => setReplyingTo(val ? commentId : null)}
          />
        );
      })}

      {hasMore && (
        <div className="text-center mt-4">
          <button
            onClick={onLoadMore}
            disabled={loading}
            className="px-4 py-2 bg-[#374151] text-white rounded-lg hover:bg-[#4B5563] transition disabled:opacity-50"
          >
            {loading ? 'Loading...' : 'Load More Comments'}
          </button>
        </div>
      )}
    </div>
  );
};

export default CommentList;