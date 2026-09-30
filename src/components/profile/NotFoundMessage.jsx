import { Link } from 'react-router-dom';

const NotFoundMessage = () => (
  <div className="text-center py-20">
    <div className="text-6xl mb-4">👤</div>
    <h1 className="text-2xl font-bold mb-4">User not found</h1>
    <Link to="/" className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
      Back to Home
    </Link>
  </div>
);

export default NotFoundMessage;