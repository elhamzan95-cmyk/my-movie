// src/components/comments/CommentItem.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHeart, FaRegHeart, FaReply } from 'react-icons/fa';
import Avatar from '@/components/common/Avatar';

// Simple date formatter
const formatRelativeTime = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);

  if (diffInSeconds < 60) return 'Just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
  if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)} days ago`;

  return date.toLocaleDateString('en-US');
};

const CommentItem = ({ comment, user, onLike, onReply, replyingTo, setReplyingTo }) => {
  const [replyText, setReplyText] = useState('');
  const [isSubmittingReply, setIsSubmittingReply] = useState(false);

  const handleReplySubmit = async (e) => {
    e.preventDefault();
    if (!replyText.trim()) return;
    setIsSubmittingReply(true);
    try {
      await onReply(replyText);
      setReplyText('');
      setReplyingTo(false);
    } catch (error) {
      console.error('Error submitting reply:', error);
    } finally {
      setIsSubmittingReply(false);
    }
  };

  const isLiked = user && comment.likes?.includes(user.id);

  return (
    <div className="bg-[#2A2A2A] rounded-lg p-4 border border-gray-700">
      <div className="flex items-start gap-3">
        <Link to={`/profile/${comment.user?._id}`}>
          <Avatar user={comment.user} size="md" />
        </Link>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <Link to={`/profile/${comment.user?._id}`} className="font-bold text-white hover:text-orange-400">
              {comment.user?.name || 'User'}
            </Link>
            <span className="text-xs text-gray-400">
              {formatRelativeTime(comment.createdAt)}
            </span>
          </div>
          <p className="text-gray-300 text-sm mb-2">{comment.text}</p>
          <div className="flex items-center gap-4 text-sm">
            <button
              onClick={onLike}
              className={`flex items-center gap-1 ${isLiked ? 'text-orange-400' : 'text-gray-400 hover:text-orange-400'}`}
            >
              {isLiked ? <FaHeart /> : <FaRegHeart />}
              <span>{comment.likes?.length || 0}</span>
            </button>
            {user && (
              <button
                onClick={() => setReplyingTo(!replyingTo)}
                className="flex items-center gap-1 text-gray-400 hover:text-orange-400"
              >
                <FaReply />
                <span>Reply</span>
              </button>
            )}
          </div>

          {/* Reply form */}
          {replyingTo && (
            <form onSubmit={handleReplySubmit} className="mt-3 flex gap-2">
              <input
                type="text"
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Your reply..."
                className="flex-1 px-3 py-2 bg-[#374151] border border-gray-600 rounded-lg text-white placeholder-gray-400 text-sm focus:ring-2 focus:ring-orange-500"
                disabled={isSubmittingReply}
              />
              <button
                type="submit"
                disabled={!replyText.trim() || isSubmittingReply}
                className="px-3 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 text-sm disabled:opacity-50"
              >
                {isSubmittingReply ? '...' : 'Send'}
              </button>
            </form>
          )}

          {/* Nested replies */}
          {comment.replies && comment.replies.length > 0 && (
            <div className="mt-3 ml-4 space-y-3">
              {comment.replies.map((reply) => (
                <div key={reply._id} className="bg-[#374151] rounded-lg p-3 border border-gray-600">
                  <div className="flex items-start gap-2">
                    <Link to={`/profile/${reply.user?._id}`}>
                      <Avatar user={reply.user} size="sm" />
                    </Link>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Link to={`/profile/${reply.user?._id}`} className="font-bold text-white hover:text-orange-400 text-sm">
                          {reply.user?.name || 'User'}
                        </Link>
                        <span className="text-xs text-gray-400">
                          {formatRelativeTime(reply.createdAt)}
                        </span>
                      </div>
                      <p className="text-gray-300 text-sm">{reply.text}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommentItem;