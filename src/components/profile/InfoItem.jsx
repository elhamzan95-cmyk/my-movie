// src/components/InfoItem.jsx
import React from 'react';

const InfoItem = ({ icon: Icon, label, value, isMultiLine = false }) => {
  return (
    <div className="bg-[#374151] p-4 rounded-lg border border-gray-700">
      <div className="flex items-start gap-3">
        {Icon && <Icon className="text-orange-400 text-xl mt-0.5" />}
        <div className="flex-1">
          <p className="text-gray-300 text-sm mb-1">{label}</p>
          {isMultiLine ? (
            <p className="text-white whitespace-pre-line">{value}</p>
          ) : (
            <p className="text-white font-bold">{value}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default InfoItem;