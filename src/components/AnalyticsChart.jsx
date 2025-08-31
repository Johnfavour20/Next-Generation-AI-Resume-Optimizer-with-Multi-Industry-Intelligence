import React from 'react';

const AnalyticsChart = () => (
  <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
    <h3 className="text-lg font-semibold text-gray-900 mb-4">Application Success Rate</h3>
    <div className="h-48 flex items-end justify-between space-x-2">
      {[65, 72, 68, 80, 85, 78, 82, 88].map((height, index) => (
        <div key={index} className="flex-1 flex flex-col items-center">
          <div
            className="bg-gradient-to-t from-blue-500 to-blue-400 rounded-t w-full transition-all duration-1000"
            style={{ height: `${(height / 100) * 100}%` }}
          ></div>
          <span className="text-xs text-gray-500 mt-2">{`W${index + 1}`}</span>
        </div>
      ))}
    </div>
    <div className="mt-4 text-center">
      <p className="text-sm text-gray-600">
        88% success rate this week <span className="text-green-600">↑ 12%</span>
      </p>
    </div>
  </div>
);

export default AnalyticsChart;