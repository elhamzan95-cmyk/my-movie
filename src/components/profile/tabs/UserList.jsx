import { Link } from 'react-router-dom';

const UserList = ({ users, emptyMessage }) => (
  <div>
    {users && users.length > 0 ? (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {users.map((user, index) => {
          const userId = user._id || user.id || index;
          return (
            <Link
              key={userId}
              to={`/profile/${userId}`}
              className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition"
            >
              <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                {user.name?.charAt(0) || 'U'}
              </div>
              <div className="ml-4">
                <p className="font-bold">{user.name || `User ${index + 1}`}</p>
                <p className="text-sm text-gray-600">{user.email}</p>
              </div>
            </Link>
          );
        })}
      </div>
    ) : (
      <div className="text-center py-12">
        <div className="text-5xl mb-4">👥</div>
        <h3 className="text-xl font-bold mb-2">{emptyMessage}</h3>
      </div>
    )}
  </div>
);

export default UserList;