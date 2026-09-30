import { useAuth } from '@/context/AuthContext';
import { useUserMovies } from '@/hooks/useUserMovies';
import StatsCard from '@/components/dashboard/StatsCard';
import QuickActions from '@/components/dashboard/QuickActions';
import AccountInfo from '@/components/dashboard/AccountInfo';
import RecentMoviesList from '@/components/dashboard/RecentMoviesList';
import { FaFilm, FaHeart, FaComment } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const DashboardPage = () => {
  const { user, logout } = useAuth();
  const { movies, loading, stats } = useUserMovies();

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to log out?')) {
      logout();
    }
  };

  const userId = user?._id || user?.id;

  return (
    <div className="w-full min-h-screen bg-[#171717] rounded-b-3xl overflow-hidden">
      <div className="max-w-7xl mx-auto px-8 pt-14 pb-8 text-white">
        {/* Dashboard header */}
        <div className="bg-[#2A2A2A] border-b-4 border-orange-500 rounded-2xl p-8 mb-8 shadow-lg">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h1 className="text-3xl font-bold mb-2 text-white">User Dashboard</h1>
              <p className="text-gray-300">
                Welcome <span className="font-bold text-orange-400">{user?.name}</span>!
              </p>
            </div>
            <div className="mt-4 md:mt-0 flex gap-3">
              <Link
                to={`/profile/${userId}`}
                className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-2 rounded-lg transition shadow-md min-w-[120px] text-center"
              >
                View Profile
              </Link>
              <button
                onClick={handleLogout}
                className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg transition shadow-md min-w-[120px] text-center"
              >
                Log Out
              </button>
            </div>
          </div>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatsCard
            icon={FaFilm}
            title="Movies Added"
            value={stats.totalMovies}
            bgColor="bg-[#2A2A2A]"
            borderColor="border-orange-500"
            textColor="text-white"
            iconBgColor="bg-[#374151]"
          />
          <StatsCard
            icon={FaHeart}
            title="Likes Received"
            value={stats.totalLikes}
            bgColor="bg-[#2A2A2A]"
            borderColor="border-orange-500"
            textColor="text-white"
            iconBgColor="bg-[#374151]"
          />
          <StatsCard
            icon={FaComment}
            title="Comments Received"
            value={stats.totalComments}
            bgColor="bg-[#2A2A2A]"
            borderColor="border-orange-500"
            textColor="text-white"
            iconBgColor="bg-[#374151]"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-6">
            <QuickActions />
            <AccountInfo user={user} />
          </div>
          <div className="lg:col-span-2">
            <div className="bg-[#2A2A2A] rounded-xl shadow-lg overflow-hidden border border-gray-700">
              <div className="border-b border-gray-700 p-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold text-white">Your Recent Movies</h2>
                  <Link to="/my-movies" className="text-orange-400 hover:text-orange-300 text-sm font-medium transition">
                    View all →
                  </Link>
                </div>
              </div>
              <RecentMoviesList movies={movies} loading={loading} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;