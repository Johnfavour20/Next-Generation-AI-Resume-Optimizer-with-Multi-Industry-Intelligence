import React from 'react';
import { TrendingUp } from 'lucide-react';

const StatCard = ({ icon: Icon, title, value, trend, color = "blue", subtitle }) => (
  <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 cursor-pointer hover:scale-105">
    <div className="flex items-center justify-between">
      <div className="flex-1">
        <p className="text-gray-500 text-sm font-medium">{title}</p>
        <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
        {subtitle && <p className="text-gray-600 text-sm mt-1">{subtitle}</p>}
        {trend && (
          <p className="text-green-600 text-sm mt-1 flex items-center">
            <TrendingUp className="w-4 h-4 mr-1" />
            {trend}
          </p>
        )}
      </div>
      <div className={`p-3 rounded-xl bg-${color}-100 ml-4`}>
        <Icon className={`w-8 h-8 text-${color}-600`} />
      </div>
    </div>
  </div>
);

export default StatCard;