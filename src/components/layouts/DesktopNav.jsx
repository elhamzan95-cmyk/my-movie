import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

const DesktopNav = () => {
  const { user, isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to log out?')) {
      logout();
    }
  };

  const isAuth = isAuthenticated?.();
  const currentUserId = user?._id || user?.id || user?.uid;

  return (
    <nav className="hidden md:flex items-center space-x-6">
      <Link to="/" className="text-gray-700 hover:text-blue-600 transition">
        Home
      </Link>
      <Link to="/movies" className="text-gray-700 hover:text-blue-600 transition">
        Movies
      </Link>
      <Link to="/users" className="text-gray-700 hover:text-blue-600 transition">
        Users
      </Link>
      <Link to="/about" className="text-gray-700 hover:text-blue-600 transition">
        About Us
      </Link>

      {isAuth ? (
        <>
          <Link to="/dashboard" className="text-gray-700 hover:text-blue-600 transition">
            Dashboard
          </Link>
          {user?.role === 'admin' && (
            <Link
              to="/admin"
              className="flex items-center px-3 py-1.5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:from-purple-700 hover:to-indigo-700 transition shadow-sm"
            >
              <span className="mr-1">🛡️</span>
              Admin Panel
            </Link>
          )}
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">Hi, {user?.name || 'User'}</span>
            <Link
              to={`/profile/${currentUserId}`}
              className="text-gray-700 hover:text-blue-600 transition"
            >
              Profile
            </Link>
            <button
              onClick={handleLogout}
              className="text-gray-700 hover:text-red-600 transition"
            >
              Log Out
            </button>
          </div>
        </>
      ) : (
        <>
          <Link to="/login" className="text-gray-700 hover:text-blue-600 transition">
            Sign In
          </Link>
          <Link
            to="/register"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Register
          </Link>
        </>
      )}
    </nav>
  );
};

export default DesktopNav;