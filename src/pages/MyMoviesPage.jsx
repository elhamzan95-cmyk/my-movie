import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import LoadingSpinner from '@/components/common/LoadingSpinner';

const MyMoviesPage = () => {
  const { user } = useAuth();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const raw = localStorage.getItem('movies');
      const all = raw ? JSON.parse(raw) : [];
      const userId = user?._id || user?.id;
      const mine = Array.isArray(all)
        ? all.filter(
            (m) =>
              (m.creator?._id || m.creator?.id || m.creatorId) === userId
          )
        : [];
      setMovies(mine);
    } catch {
      setMovies([]);
    }
    setLoading(false);
  }, [user]);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="w-full min-h-screen bg-[#171717] text-white rounded-b-3xl overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">My Movies</h1>
          <p className="text-gray-300">List of movies you have added</p>
        </div>

        {movies.length === 0 ? (
          <div className="text-center py-12 bg-[#2A2A2A] rounded-xl border border-gray-700">
            <div className="text-6xl mb-4">🎬</div>
            <h3 className="text-xl font-bold mb-2 text-white">You haven't added any movies yet</h3>
            <p className="text-gray-300 mb-6">Add your first movie</p>
            <Link
              to="/add-movie"
              className="inline-block bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg transition font-bold shadow-md"
            >
              Add New Movie
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {movies.map((movie) => (
              <Link
                key={movie.id || movie._id}
                to={`/movies/${movie.id || movie._id}`}
                className="bg-[#2A2A2A] rounded-xl shadow-md overflow-hidden hover:shadow-lg transition border border-gray-700 hover:border-orange-500/50"
              >
                <div className="aspect-video overflow-hidden">
                  <img
                    src={movie.image || 'https://via.placeholder.com/400x225?text=No+Image'}
                    alt={movie.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/400x225?text=No+Image';
                    }}
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-white text-lg mb-1 line-clamp-1">{movie.title}</h3>
                  <p className="text-gray-300 text-sm mb-2">
                    {movie.director} • {movie.year}
                  </p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">⭐ {movie.rating || 0}/10</span>
                    <span className="text-orange-400 hover:text-orange-300 transition">
                      View →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyMoviesPage;