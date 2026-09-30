import { Link } from 'react-router-dom';

const StatBox = ({ title, value, link }) => (
  <div className="text-center p-4 bg-[#374151] rounded-lg border border-gray-700 shadow-sm hover:border-orange-500/50 transition">
    <div className="text-2xl font-bold text-white">{value.toLocaleString('en-US')}</div>
    <div className="text-sm text-gray-300 mt-1">{title}</div>
    {link && (
      <Link to={link} className="text-xs text-orange-400 hover:text-orange-300 mt-2 inline-block transition">
        View →
      </Link>
    )}
  </div>
);

export default StatBox;