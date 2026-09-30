import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { searchUsers } from '../services/users';
import LoadingSpinner from '../components/LoadingSpinner';

const UserSearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({ page: 1, total: 0, pages: 1 });

  useEffect(() => {
    if (query.trim()) {
      performSearch();
    }
  }, [query]);

  const performSearch = async (page = 1) => {
    setLoading(true);
    try {
      const data = await searchUsers(query, page);
      setUsers(data.users || []);
      setPagination({
        page: data.page || 1,
        total: data.total || 0,
        pages: data.pages || 1
      });
    } catch (error) {
      console.error('Error searching users:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="container mx-auto px-4 py-8 rounded-b-3xl overflow-hidden">
      <h1 className="text-2xl font-bold mb-6">User Search Results for: "{query}"</h1>

      {users.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {users.map((user) => (
              <Link
                key={user._id}
                to={`/profile/${user._id}`}
                className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                  {user.name?.charAt(0) || 'U'}
                </div>
                <div className="ml-4">
                  <p className="font-bold">{user.name}</p>
                  <p className="text-sm text-gray-600">@{user.username}</p>
                  <p className="text-xs text-gray-500">{user.email}</p>
                </div>
              </Link>
            ))}
          </div>

          {pagination.pages > 1 && (
            <div className="flex justify-center mt-8 gap-2">
              {/* Pagination buttons - implement as needed */}
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">👥</div>
          <h3 className="text-xl font-bold mb-2">No users found with these details</h3>
          <p className="text-gray-600">Try a different search query</p>
        </div>
      )}
    </div>
  );
};

export default UserSearchPage;