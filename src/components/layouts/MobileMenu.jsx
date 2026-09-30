import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

const MobileMenu = ({ isOpen, onClose }) => {
  const { user, isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to log out?')) {
      logout();
      onClose();
    }
  };

  const isAuth = isAuthenticated?.();
  const currentUserId = user?._id || user?.id || user?.uid;

  if (!isOpen) return null;

  return (
    <div className="md:hidden mt-4 bg-white rounded-lg shadow-lg p-4">
      <div className="flex flex-col space-y-3">
        <Link
          to="/"
          className="text-gray-700 hover:text-blue-600 transition py-2"
          onClick={onClose}
        >
          Home
        </Link>
        <Link
          to="/movies"
          className="text-gray-700 hover:text-blue-600 transition py-2"
          onClick={onClose}
        >
          Movies
        </Link>
        <Link
          to="/users"
          className="text-gray-700 hover:text-blue-600 transition py-2"
          onClick={onClose}
        >
          Users
        </Link>
        <Link
          to="/about"
          className="text-gray-700 hover:text-blue-600 transition py-2"
          onClick={onClose}
        >
          About Us
        </Link>

        {isAuth ? (
          <>
            <Link
              to="/dashboard"
              className="text-gray-700 hover:text-blue-600 transition py-2"
              onClick={onClose}
            >
              Dashboard
            </Link>
            {user?.role === 'admin' && (
              <Link
                to="/admin"
                className="flex items-center py-2 px-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:from-purple-700 hover:to-indigo-700 transition"
                onClick={onClose}
              >
                <span className="mr-1">🛡️</span>
                Admin Panel
              </Link>
            )}
            <Link
              to={`/profile/${currentUserId}`}
              className="text-gray-700 hover:text-blue-600 transition py-2"
              onClick={onClose}
            >
              Profile
            </Link>
            <button
              onClick={handleLogout}
              className="text-left text-red-600 hover:text-red-700 transition py-2"
            >
              Log Out
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="text-gray-700 hover:text-blue-600 transition py-2"
              onClick={onClose}
            >
              Sign In
            </Link>
            <Link
              to="/register"
              className="bg-blue-600 text-white text-center py-2 rounded-lg hover:bg-blue-700 transition"
              onClick={onClose}
            >
              Register
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default MobileMenu;