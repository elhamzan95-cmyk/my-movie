import { Link } from 'react-router-dom';
import { FaHeart, FaComment, FaUser } from 'react-icons/fa';

const MovieCard = ({ movie = {} }) => {
  const {
    id,
    _id,
    title = 'Untitled',
    year = 'Unknown',
    rating = 0,
    description = 'No description available.',
    image,
    creator = { name: 'User' },
    director = 'Unknown',
    likes = [],
    comments = []
  } = movie;

  const movieId = id || _id;
  const poster = image || 'https://via.placeholder.com/400x300?text=Film+Memories';

  return (
    <div className="bg-[#2A2A2A] rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow border border-gray-700">
      <div className="relative h-48 overflow-hidden">
        <img
          src={poster}
          alt={title}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/400x300?text=Film+Memories';
          }}
        />
        <span className="absolute top-3 left-3 bg-black/70 text-white text-xs font-bold px-2 py-1 rounded">
          {year}
        </span>
      </div>

      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-lg font-bold text-white line-clamp-1">{title}</h3>
          <div className="flex items-center bg-yellow-500/20 text-yellow-300 text-sm font-bold px-2 py-1 rounded">
            ⭐ {rating}/10
          </div>
        </div>

        <p className="text-gray-300 mb-4 line-clamp-2">{description}</p>

        <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
          <div className="flex items-center">
            <FaUser className="w-4 h-4 mr-1 text-gray-400" />
            <span>{creator.name}</span>
          </div>
          <span>{director}</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <FaHeart className="text-red-400 mr-1 w-4 h-4" />
              <span className="text-sm text-gray-300">{likes.length}</span>
            </div>
            <div className="flex items-center">
              <FaComment className="text-blue-400 mr-1 w-4 h-4" />
              <span className="text-sm text-gray-300">{comments.length}</span>
            </div>
          </div>

          <Link
            to={`/movies/${movieId}`}
            className="text-orange-400 hover:text-orange-300 text-sm font-bold transition"
          >
            View details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;