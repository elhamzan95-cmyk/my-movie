// src/components/profile/MoviesTab.jsx
import { Link } from 'react-router-dom';

const MoviesTab = ({ movies, isOwnProfile, loading }) => {
  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
        <p className="mt-4 text-gray-300">Loading movies...</p>
      </div>
    );
  }

  if (movies.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-5xl mb-4">🎬</div>
        <h3 className="text-xl font-bold mb-2 text-white">You haven't added any movies yet</h3>
        <p className="text-gray-300 mb-6">Add your first movie</p>
        {isOwnProfile && (
          <Link
            to="/add-movie"
            className="inline-block bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg transition font-bold shadow-md"
          >
            Add First Movie
          </Link>
        )}
      </div>
    );
  }

  return (
    <div className="divide-y divide-gray-700">
      {movies.map((movie) => (
        <Link
          key={movie._id || movie.id}
          to={`/movies/${movie._id || movie.id}`}
          className="flex items-center p-4 hover:bg-[#333333] transition-colors"
        >
          {/* Movie image */}
          <img
            src={movie.image || '/placeholder-image.jpg'}
            alt={movie.title}
            className="w-16 h-16 object-cover rounded-lg mr-4 border border-gray-600"
          />
          <div className="flex-1">
            <h4 className="font-bold text-white">{movie.title}</h4>
            <p className="text-sm text-gray-300">
              {movie.director} • {movie.year}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-400">
              {new Date(movie.createdAt).toLocaleDateString('en-US')}
            </span>
            <span className="flex items-center text-yellow-400 text-sm">
              ⭐ {movie.rating}/10
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default MoviesTab;