// frontend/src/components/SaveButton.jsx
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { saveMovie, unsaveMovie } from '../services/users';

const SaveButton = ({ movieId, initialSaved = false }) => {
  const { user } = useAuth();
  const [isSaved, setIsSaved] = useState(initialSaved);
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!user) {
      alert('You must be logged in to save');
      return;
    }

    setLoading(true);
    try {
      if (isSaved) {
        await unsaveMovie(movieId);
        setIsSaved(false);
        alert('Movie removed from favorites');
      } else {
        await saveMovie(movieId);
        setIsSaved(true);
        alert('Movie added to favorites');
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleSave}
      disabled={loading}
      className={`px-4 py-2 rounded-lg transition ${
        isSaved
          ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
          : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
      }`}
    >
      {loading ? '...' : isSaved ? '★ Saved' : '☆ Save'}
    </button>
  );
};

export default SaveButton;