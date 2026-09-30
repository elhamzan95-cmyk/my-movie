import { useState } from 'react';
import { addReply } from '../../services/comments';

const ReplyForm = ({ commentId, user, onReplyAdded, onCancel }) => {
  const [text, setText] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    setSubmitting(true);
    try {
      const response = await addReply(commentId, text);
      if (response.success) {
        const newReply = {
          text: response.data?.text || text,
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            avatar: user.avatar
          },
          createdAt: new Date().toISOString()
        };
        onReplyAdded(newReply);
        setText('');
        onCancel?.();
      }
    } catch (error) {
      console.error('❌ Error sending reply:', error);
      alert('Error sending reply');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-start">
      <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-xs text-white mr-2">
        {user.name?.charAt(0) || 'U'}
      </div>
      <div className="flex-1">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write your reply..."
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-1 focus:ring-blue-500 focus:border-transparent resize-none"
          rows={2}
          maxLength={300}
          disabled={submitting}
        />
        <div className="flex justify-between items-center mt-2">
          <span className="text-xs text-gray-500">{text.length}/300</span>
          <div className="flex space-x-2">
            <button
              type="button"
              onClick={onCancel}
              className="px-3 py-1 text-gray-600 text-sm hover:text-gray-800 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting || !text.trim()}
              className="px-3 py-1 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
            >
              {submitting ? '...' : 'Send'}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default ReplyForm;