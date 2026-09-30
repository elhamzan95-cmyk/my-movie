// src/components/comments/CommentForm.jsx
import { useState } from 'react';
import { FaPaperPlane } from 'react-icons/fa';
import Avatar from '@/components/common/Avatar';

const CommentForm = ({ movieId, user, onSubmit }) => {
  const [text, setText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    setIsSubmitting(true);
    try {
      await onSubmit({ text, movieId });
      setText('');
    } catch (error) {
      console.error('Error submitting comment:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user) {
    return (
      <div className="bg-[#374151] rounded-lg p-4 text-center text-gray-300 border border-gray-600">
        To post a comment, please <a href="/login" className="text-orange-400 hover:underline">sign in</a> first.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-4">
      <Avatar user={user} size="md" />
      <div className="flex-1 relative">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write your comment..."
          className="w-full px-4 py-3 pr-24 bg-[#374151] border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          disabled={isSubmitting}
        />
        <button
          type="submit"
          disabled={!text.trim() || isSubmitting}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 px-4 py-1.5 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {isSubmitting ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              ...
            </span>
          ) : (
            <FaPaperPlane />
          )}
        </button>
      </div>
    </form>
  );
};

export default CommentForm;