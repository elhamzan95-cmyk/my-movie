import { Link } from 'react-router-dom';

const RecentMoviesList = ({ movies, loading }) => {
  if (loading) {
    return (
      <div className="p-6 text-center text-gray-500">
        Loading...
      </div>
    );
  }

  if (!movies || movies.length === 0) {
    return (
      <div className="p-6 text-center text-gray-500">
        You have not added any movies yet.
      </div>
    );
  }

  return (
    <div className="divide-y divide-gray-200">
      {movies.map((movie) => (
        <Link
          key={movie.id}
          to={`/movies/${movie.id}`}
          className="flex items-center p-4 hover:bg-[#333333] transition-colors"
        >
          {/* Movie image */}
          <img
            src={movie.image || '/placeholder-image.jpg'}
            alt={movie.title}
            className="w-16 h-16 object-cover rounded-lg mr-4"
          />
          <div className="flex-1">
            <h4 className="font-bold text-gray-100">{movie.title}</h4>
            <p className="text-sm text-gray-200">
              {movie.director} • {movie.year}
            </p>
          </div>
          <span className="text-sm text-gray-400">
            {new Date(movie.createdAt).toLocaleDateString('en-US')}
          </span>
        </Link>
      ))}
    </div>
  );
};

export default RecentMoviesList;