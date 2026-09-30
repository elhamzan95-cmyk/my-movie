// src/components/MovieCard.jsx
import { Link } from 'react-router-dom';

const MovieCard = ({ movie }) => {
  const formatRating = (rating) => {
    return rating ? Number(rating).toFixed(1) : '0.0';
  };

  const getGenreLabel = (genre) => {
    const map = {
      'sci-fi': 'Sci-Fi',
      action: 'Action',
      drama: 'Drama',
      comedy: 'Comedy',
      horror: 'Horror',
      romance: 'Romance',
      thriller: 'Thriller',
      documentary: 'Documentary',
      animation: 'Animation',
      fantasy: 'Fantasy',
      adventure: 'Adventure',
      crime: 'Crime',
      mystery: 'Mystery',
      biography: 'Biography',
      history: 'History',
      war: 'War',
      musical: 'Musical',
      family: 'Family',
    };
    return map[genre] || 'Other';
  };

  return (
    <div className="bg-white rounded-b-3xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
      <div className="relative h-48 overflow-hidden">
        <img
          src={movie.image || 'https://via.placeholder.com/400x300?text=Film+Memories'}
          alt={movie.title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/400x300?text=Film+Memories';
          }}
        />
        <div className="absolute top-3 right-3 bg-black/70 text-white text-xs px-2 py-1 rounded">
          {movie.year}
        </div>
      </div>

      <div className="p-4">
        <div className="flex justify-between items-start mb-3">
          <h3 className="font-bold text-lg text-gray-800 line-clamp-1">
            {movie.title}
          </h3>
          <div className="flex items-center bg-yellow-50 px-2 py-1 rounded">
            <span className="text-yellow-500 mr-1">⭐</span>
            <span className="font-bold">{formatRating(movie.rating)}</span>
          </div>
        </div>

        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {movie.description}
        </p>

        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <div className="flex items-center">
            <span className="mr-2">🎬</span>
            <span>{movie.director}</span>
          </div>
          <span className="bg-gray-100 px-2 py-1 rounded text-xs">
            {getGenreLabel(movie.genre)}
          </span>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
              {movie.creator?.name?.charAt(0) || 'U'}
            </div>
            <span className="text-xs text-gray-600 ml-2">
              {movie.creator?.name?.split(' ')[0] || 'User'}
            </span>
          </div>

          <Link
            to={`/movies/${movie.id || movie._id}`}
            className="text-blue-600 hover:text-blue-700 text-sm font-bold"
          >
            View details →
          </Link>
        </div>

        <div className="flex justify-between mt-4 text-xs text-gray-500">
          <div className="flex items-center">
            <span className="text-red-400 mr-1">❤️</span>
            <span>{movie.likes?.length || 0} likes</span>
          </div>
          <div className="flex items-center">
            <span className="text-blue-400 mr-1">💬</span>
            <span>{movie.comments?.length || 0} comments</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;