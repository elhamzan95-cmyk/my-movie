// src/components/admin/AdminStats.jsx
import { useState, useEffect } from 'react';
import { getAdminStats } from '@/services/admin';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import StatCard from './StatCard';
import { FaUsers, FaFilm, FaComment, FaHeart, FaUser } from 'react-icons/fa';

const AdminStats = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const response = await getAdminStats();
      if (response.success) {
        setStats(response.stats);
      }
    } catch (err) {
      setError(err.message || 'Error fetching statistics');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="text-red-200 bg-red-900/50 p-4 rounded-lg border border-red-700">{error}</div>;
  if (!stats) return null;

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-white">Admin Dashboard</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Users"
          value={stats.totalUsers}
          icon={FaUsers}
          bgColor="bg-[#374151]"
          textColor="text-orange-400"
        />
        <StatCard
          title="Movies"
          value={stats.totalMovies}
          icon={FaFilm}
          bgColor="bg-[#374151]"
          textColor="text-orange-400"
        />
        <StatCard
          title="Comments"
          value={stats.totalComments}
          icon={FaComment}
          bgColor="bg-[#374151]"
          textColor="text-orange-400"
        />
        <StatCard
          title="Likes"
          value={stats.totalLikes}
          icon={FaHeart}
          bgColor="bg-[#374151]"
          textColor="text-orange-400"
        />
      </div>

      {stats.recentUsers?.length > 0 && (
        <div className="bg-[#2A2A2A] rounded-lg p-6 shadow-sm border border-gray-700">
          <h3 className="font-bold text-white mb-4">Recent Users</h3>
          <div className="space-y-3">
            {stats.recentUsers.slice(0, 5).map((user) => (
              <div key={user._id} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-[#374151] rounded-full flex items-center justify-center text-orange-400 border border-gray-600">
                    {user.avatar ? (
                      <img src={user.avatar} alt="" className="w-full h-full object-cover rounded-full" />
                    ) : (
                      <FaUser />
                    )}
                  </div>
                  <span className="ml-3 text-sm text-white">{user.name}</span>
                </div>
                <span className="text-xs text-gray-400">
                  {new Date(user.createdAt).toLocaleDateString('en-US')}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminStats;