// src/components/dashboard/QuickActions.jsx
import { Link } from 'react-router-dom';
import { FaPlus, FaList } from 'react-icons/fa';

const QuickActions = () => {
  return (
    <div className="bg-[#2A2A2A] rounded-xl shadow-md p-6 text-white">
      <h3 className="text-lg font-bold mb-4">Quick Actions</h3>
      <div className="space-y-3">
        <Link
          to="/add-movie"
          className="block w-full bg-gray-700 hover:bg-gray-600 text-white py-3 px-4 rounded-lg transition flex items-center gap-3"
        >
          <div className="bg-[#374151] p-2 rounded-lg">
            <FaPlus className="text-white text-lg" />
          </div>
          <span className="font-medium">Add New Movie</span>
        </Link>
        <Link
          to="/my-movies"
          className="block w-full bg-gray-700 hover:bg-gray-600 text-white py-3 px-4 rounded-lg transition flex items-center gap-3"
        >
          <div className="bg-[#374151] p-2 rounded-lg">
            <FaList className="text-white text-lg" />
          </div>
          <span className="font-medium">Manage Movies</span>
        </Link>
      </div>
    </div>
  );
};

export default QuickActions;