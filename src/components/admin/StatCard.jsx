// src/components/admin/StatCard.jsx
const StatCard = ({ title, value, icon, bgColor = 'bg-[#374151]', textColor = 'text-orange-400' }) => {
  return (
    <div className={`${bgColor} rounded-xl p-6 shadow-sm border border-gray-700`}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-2xl text-gray-300">{icon}</span>
        <span className={`text-2xl font-bold ${textColor}`}>
          {value?.toLocaleString('en-US') || '0'}
        </span>
      </div>
      <h3 className="text-gray-300 font-medium">{title}</h3>
    </div>
  );
};

export default StatCard;