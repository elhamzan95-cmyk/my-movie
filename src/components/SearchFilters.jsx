import { useState } from 'react';

const GENRE_MAP = {
  action: 'Action',
  drama: 'Drama',
  comedy: 'Comedy',
  'sci-fi': 'Sci-Fi',
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
  other: 'Other'
};

const GENRES = Object.keys(GENRE_MAP);

const CURRENT_YEAR = new Date().getFullYear();
const YEARS = Array.from({ length: 50 }, (_, i) => CURRENT_YEAR - i);

const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest' },
  { value: 'oldest', label: 'Oldest' },
  { value: 'rating', label: 'Highest Rated' }
];

const SearchFilters = ({ filters = {}, onFilterChange }) => {
  const [localFilters, setLocalFilters] = useState({
    genre: filters.genre || '',
    year: filters.year || '',
    sortBy: filters.sortBy || 'newest'
  });

  const handleChange = (key, value) => {
    const newFilters = { ...localFilters, [key]: value };
    setLocalFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearFilters = () => {
    const cleared = { genre: '', year: '', sortBy: 'newest' };
    setLocalFilters(cleared);
    onFilterChange(cleared);
  };

  return (
    <div className="bg-[#2A2A2A] rounded-xl shadow-md p-6 border border-orange-500/30">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-bold text-lg text-white">Filters</h3>
        <button
          onClick={clearFilters}
          className="text-sm text-orange-400 hover:text-orange-300 transition"
        >
          Clear Filters
        </button>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-gray-300 mb-3">Genre</label>
          <select
            value={localFilters.genre}
            onChange={(e) => handleChange('genre', e.target.value)}
            className="w-full px-4 py-2 bg-[#374151] border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          >
            <option value="" className="bg-[#374151]">All Genres</option>
            {GENRES.map((genre) => (
              <option key={genre} value={genre} className="bg-[#374151]">
                {GENRE_MAP[genre]}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-gray-300 mb-3">Release Year</label>
          <select
            value={localFilters.year}
            onChange={(e) => handleChange('year', e.target.value)}
            className="w-full px-4 py-2 bg-[#374151] border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          >
            <option value="" className="bg-[#374151]">All Years</option>
            {YEARS.map((year) => (
              <option key={year} value={year} className="bg-[#374151]">{year}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-gray-300 mb-3">Sort By</label>
          <select
            value={localFilters.sortBy}
            onChange={(e) => handleChange('sortBy', e.target.value)}
            className="w-full px-4 py-2 bg-[#374151] border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          >
            {SORT_OPTIONS.map(({ value, label }) => (
              <option key={value} value={value} className="bg-[#374151]">{label}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default SearchFilters;