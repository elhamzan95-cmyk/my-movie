import { Link } from 'react-router-dom';

const TermsPage = () => {
  return (
    <div className="min-h-screen bg-[#171717] text-white rounded-b-3xl overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-white">Terms and Conditions</h1>
        <div className="bg-[#2A2A2A] rounded-xl shadow-md p-8 space-y-6 border border-orange-500/30">
          <section>
            <h2 className="text-xl font-bold mb-3 text-white">1. User Account</h2>
            <p className="text-gray-300">
              To use the website services, you need to register. The information you provide must be accurate and complete.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-bold mb-3 text-white">2. User Content</h2>
            <p className="text-gray-300">
              Users can share movies, comments, and memories. Any inappropriate content will be removed.
            </p>
          </section>

          <div className="pt-6 text-center border-t border-gray-700">
            <Link to="/register" className="text-orange-400 hover:text-orange-300 font-bold transition">
              Back to Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;