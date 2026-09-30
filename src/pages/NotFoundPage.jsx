import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-[#171717] text-white flex items-center justify-center rounded-b-3xl overflow-hidden">
      <div className="text-center px-4 py-20">
        <div className="text-9xl font-bold text-orange-500/70 mb-4">404</div>
        <h1 className="text-3xl font-bold text-white mb-4">Page Not Found</h1>
        <p className="text-gray-300 mb-8 max-w-md mx-auto">
          Sorry, the page you are looking for does not exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition font-bold"
          >
            Back to Home
          </Link>
          <Link
            to="/movies"
            className="px-6 py-3 bg-[#374151] hover:bg-[#4B5563] text-white rounded-lg transition font-bold"
          >
            Browse Movies
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;