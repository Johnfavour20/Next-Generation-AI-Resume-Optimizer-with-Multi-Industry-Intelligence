import React from 'react';

const IndustryCard = ({ industry, isSelected, onClick }) => {
  const Icon = industry.icon;
  
  return (
    <div
      onClick={onClick}
      className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 hover:shadow-lg ${
        isSelected
          ? `border-${industry.color}-500 bg-${industry.color}-50 shadow-lg`
          : 'border-gray-200 bg-white hover:border-gray-300'
      }`}
    >
      <div className="flex items-center space-x-3">
        <div className={`p-2 rounded-lg bg-${industry.color}-100`}>
          <Icon className={`w-6 h-6 text-${industry.color}-600`} />
        </div>
        <div>
          <h4 className="font-semibold text-gray-900">{industry.name}</h4>
        </div>
      </div>
    </div>
  );
};

export default IndustryCard;