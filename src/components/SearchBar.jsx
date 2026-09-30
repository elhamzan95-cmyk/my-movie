import { FaSearch } from 'react-icons/fa';

const SearchBar = ({ searchQuery, onSearchChange, onSearchSubmit }) => {
  return (
    <form
      onSubmit={onSearchSubmit}
      className="flex flex-col md:flex-row gap-4 border border-orange-500/30 rounded-xl p-6 bg-[#2A2A2A] shadow-md"
    >
      <div className="flex-1 relative">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search movies, directors, or memories..."
          className="w-full px-4 py-3 pr-12 bg-[#374151] border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
        />
        <button
          type="submit"
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-orange-400 transition"
        >
          <FaSearch />
        </button>
      </div>
      <button
        type="submit"
        className="px-6 py-3 bg-[#4B5563] text-white rounded-lg hover:bg-[#5f6b7a] transition font-bold"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;