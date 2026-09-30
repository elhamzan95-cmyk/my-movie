// src/components/dashboard/StatsCard.jsx
const StatsCard = ({ 
  icon: IconComponent,
  title, 
  value, 
  bgColor = 'bg-[#2A2A2A]', 
  borderColor = 'border-orange-500',
  textColor = 'text-white',
  iconBgColor = 'bg-gray-700'
}) => {
  return (
    <div className={`${bgColor} rounded-xl shadow-md p-6 border-l-4 ${borderColor}`}>
      <div className="flex items-center gap-4">
        <div className={`${iconBgColor} p-3 rounded-lg`}>
          {IconComponent && <IconComponent className="text-2xl text-white" />}
        </div>
        <div>
          <h3 className={`text-2xl font-bold ${textColor}`}>
            {value?.toLocaleString('en-US') || 0}
          </h3>
          <p className="text-gray-300">{title}</p>
        </div>
      </div>
    </div>
  );
};

export default StatsCard;