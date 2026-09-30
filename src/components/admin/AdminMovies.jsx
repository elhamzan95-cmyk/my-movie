// src/components/admin/AdminMovies.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getMovies as getAdminMovies, deleteMovie } from '@/services/admin';
import { formatDate } from '@/utils/formatters';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import { FaSearch, FaTrash, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const AdminMovies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedMovies, setSelectedMovies] = useState([]);
  const [bulkDeleteLoading, setBulkDeleteLoading] = useState(false);

  const fetchMovies = async (currentPage = page, search = searchTerm) => {
    try {
      setLoading(true);
      const response = await getAdminMovies({
        page: currentPage,
        limit: 10,
        search: search || undefined,
      });
      if (response.success) {
        setMovies(response.movies || []);
        setTotalPages(response.totalPages || 1);
        setSelectedMovies([]);
      }
    } catch (err) {
      setError(err.message || 'Error fetching movies');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, [page]);

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    fetchMovies(1, searchTerm);
  };

  const handleDelete = async (movieId, movieTitle) => {
    if (!window.confirm(`Delete the movie "${movieTitle}"?`)) return;
    try {
      await deleteMovie(movieId);
      setMovies((prev) => prev.filter((m) => m._id !== movieId));
    } catch (err) {
      alert(err.message || 'Error deleting movie');
    }
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedMovies(movies.map((m) => m._id));
    } else {
      setSelectedMovies([]);
    }
  };

  const handleSelectMovie = (movieId) => {
    setSelectedMovies((prev) =>
      prev.includes(movieId)
        ? prev.filter((id) => id !== movieId)
        : [...prev, movieId]
    );
  };

  const handleBulkDelete = async () => {
    if (selectedMovies.length === 0) return;
    if (!window.confirm(`Delete ${selectedMovies.length} selected movies?`)) return;
    setBulkDeleteLoading(true);
    try {
      await Promise.all(selectedMovies.map((id) => deleteMovie(id)));
      setMovies((prev) => prev.filter((m) => !selectedMovies.includes(m._id)));
      setSelectedMovies([]);
    } catch (err) {
      alert(err.message || 'Error during bulk delete');
    } finally {
      setBulkDeleteLoading(false);
    }
  };

  if (loading && movies.length === 0) return <LoadingSpinner />;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-xl font-bold text-white">Movie Management</h2>
        <form onSubmit={handleSearch} className="flex w-full sm:w-auto">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by title, director..."
            className="flex-1 px-4 py-2 bg-[#374151] border border-gray-600 rounded-l-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-orange-500 text-white rounded-r-lg hover:bg-orange-600 flex items-center gap-2"
          >
            <FaSearch />
            Search
          </button>
        </form>
      </div>

      {error && <div className="bg-red-900/50 border border-red-700 text-red-200 p-4 rounded-lg">{error}</div>}

      {selectedMovies.length > 0 && (
        <div className="bg-[#374151] p-4 rounded-lg border border-gray-600 flex items-center justify-between">
          <span className="text-sm font-medium text-white">
            {selectedMovies.length} movie(s) selected
          </span>
          <button
            onClick={handleBulkDelete}
            disabled={bulkDeleteLoading}
            className="px-4 py-2 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 disabled:opacity-50 flex items-center gap-2"
          >
            <FaTrash />
            {bulkDeleteLoading ? 'Deleting...' : 'Delete Selected'}
          </button>
        </div>
      )}

      <div className="bg-[#2A2A2A] rounded-lg shadow-sm overflow-x-auto border border-gray-700">
        <table className="min-w-full divide-y divide-gray-700">
          <thead className="bg-[#374151]">
            <tr>
              <th className="px-6 py-3 text-left">
                <input
                  type="checkbox"
                  checked={selectedMovies.length === movies.length && movies.length > 0}
                  onChange={handleSelectAll}
                  className="rounded border-gray-600 bg-[#171717] text-orange-500 focus:ring-orange-500"
                />
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Director
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Year
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Creator
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Release Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-[#2A2A2A] divide-y divide-gray-700">
            {movies.map((movie) => (
              <tr key={movie._id} className="hover:bg-[#333333] transition">
                <td className="px-6 py-4">
                  <input
                    type="checkbox"
                    checked={selectedMovies.includes(movie._id)}
                    onChange={() => handleSelectMovie(movie._id)}
                    className="rounded border-gray-600 bg-[#171717] text-orange-500 focus:ring-orange-500"
                  />
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-[#374151] rounded flex-shrink-0 overflow-hidden border border-gray-600">
                      <img
                        src={movie.image || 'https://via.placeholder.com/40'}
                        alt={movie.title}
                        className="w-full h-full object-cover"
                        onError={(e) =>
                          (e.target.src = 'https://via.placeholder.com/40')
                        }
                      />
                    </div>
                    <div className="ml-3">
                      <Link
                        to={`/movies/${movie._id}`}
                        className="text-sm font-medium text-white hover:text-orange-400"
                      >
                        {movie.title}
                      </Link>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-300">{movie.director}</td>
                <td className="px-6 py-4 text-sm text-gray-300">{movie.year}</td>
                <td className="px-6 py-4 text-sm text-gray-300">
                  <Link
                    to={`/profile/${movie.creator?._id}`}
                    className="hover:text-orange-400"
                  >
                    {movie.creator?.name || 'User'}
                  </Link>
                </td>
                <td className="px-6 py-4 text-sm text-gray-300">
                  {formatDate(movie.createdAt, false)}
                </td>
                <td className="px-6 py-4 text-sm">
                  <button
                    onClick={() => handleDelete(movie._id, movie.title)}
                    className="text-red-400 hover:text-red-300 flex items-center gap-1"
                  >
                    <FaTrash size={14} />
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {movies.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-400">No movies found</p>
          </div>
        )}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2">
          <button
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            disabled={page === 1}
            className="p-2 bg-[#2A2A2A] border border-gray-600 text-gray-300 rounded-lg hover:bg-[#374151] disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            <FaChevronLeft />
          </button>
          <span className="px-4 py-2 bg-orange-500 text-white rounded-lg">
            {page}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
            disabled={page === totalPages}
            className="p-2 bg-[#2A2A2A] border border-gray-600 text-gray-300 rounded-lg hover:bg-[#374151] disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            <FaChevronRight />
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminMovies;