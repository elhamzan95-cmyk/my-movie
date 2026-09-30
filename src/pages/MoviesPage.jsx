import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import MovieCard from '../components/MovieCard';
import SearchFilters from '@/components/SearchFilters';
import SearchBar from '../components/SearchBar';
import Pagination from '../components/common/Pagination';
import LoadingSpinner from '@/components/common/LoadingSpinner';

const MOVIES_PER_PAGE = 9;

const MoviesPage = () => {
  const { isAuthenticated } = useAuth();

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({ genre: '', year: '', rating: '' });

  useEffect(() => {
    try {
      const raw = localStorage.getItem('movies');
      const parsed = raw ? JSON.parse(raw) : [];
      setMovies(Array.isArray(parsed) ? parsed : []);
    } catch {
      setMovies([]);
    }
    setLoading(false);
  }, []);

  const filteredMovies = useMemo(() => {
    let result = [...movies];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (m) =>
          m.title?.toLowerCase().includes(q) ||
          m.director?.toLowerCase().includes(q)
      );
    }

    if (filters.genre) {
      result = result.filter((m) => m.genre === filters.genre);
    }
    if (filters.year) {
      result = result.filter((m) => String(m.year) === String(filters.year));
    }
    if (filters.rating) {
      result = result.filter((m) => Number(m.rating) >= Number(filters.rating));
    }

    return result;
  }, [movies, searchQuery, filters]);

  const totalPages = Math.max(1, Math.ceil(filteredMovies.length / MOVIES_PER_PAGE));
  const paginatedMovies = filteredMovies.slice(
    (currentPage - 1) * MOVIES_PER_PAGE,
    currentPage * MOVIES_PER_PAGE
  );

  const handleSearch = (e) => {
    if (e) e.preventDefault();
    setCurrentPage(1);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading && movies.length === 0) {
    return <LoadingSpinner />;
  }

  return (
    <div className="w-full min-h-screen bg-[#171717] text-white rounded-b-3xl overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Movies & Memories</h1>
              <p className="text-gray-300">Movie memories from our community</p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                to="/users"
                className="inline-flex items-center bg-[#48A07B] hover:bg-[#3A8060] text-white px-6 py-3 rounded-lg transition font-bold shadow-md"
              >
                CineHub Users
              </Link>

              {isAuthenticated() && (
                <Link
                  to="/add-movie"
                  className="inline-flex items-center bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg transition font-bold shadow-md"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Add New Movie
                </Link>
              )}
            </div>
          </div>

          <SearchBar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onSearchSubmit={handleSearch}
          />
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-1/4">
            <SearchFilters filters={filters} onFilterChange={handleFilterChange} />
          </div>

          <div className="lg:w-3/4">
            {/* Stats bar - styled like the empty state box */}
            <div className="bg-[#2A2A2A] rounded-xl border border-gray-700 px-6 py-4 mb-6 flex items-center justify-between">
              <div className="text-gray-300">
                Showing {paginatedMovies.length} of {filteredMovies.length} movies
                {searchQuery && <span> for "{searchQuery}"</span>}
              </div>
              <div className="text-sm text-gray-400">
                Page {currentPage} of {totalPages}
              </div>
            </div>

            {paginatedMovies.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                  {paginatedMovies.map((movie) => (
                    <MovieCard key={movie.id || movie._id} movie={movie} />
                  ))}
                </div>
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </>
            ) : (
              <div className="text-center py-16 bg-[#2A2A2A] rounded-xl border border-gray-700">
                <div className="text-6xl mb-4">🎬</div>
                <h3 className="text-xl font-bold mb-2 text-white">No movies found</h3>
                <p className="text-gray-300 mb-6">
                  {searchQuery
                    ? `No results found for "${searchQuery}"`
                    : 'No movies have been added yet'}
                </p>
                {isAuthenticated() && (
                  <Link
                    to="/add-movie"
                    className="inline-block bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg transition shadow-md"
                  >
                    Add the first movie
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoviesPage;