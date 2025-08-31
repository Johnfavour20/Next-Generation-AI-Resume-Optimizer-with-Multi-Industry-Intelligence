import React from 'react';

const ProgressTracker = ({ atsScore = 0 }) => (
  <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
    <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Progress</h3>
    <div className="space-y-4">
      {[
        { label: 'Profile Completeness', progress: 85, color: 'blue' },
        { label: 'ATS Optimization', progress: atsScore, color: 'green' },
        { label: 'Industry Alignment', progress: 72, color: 'purple' },
        { label: 'Keyword Density', progress: 68, color: 'orange' }
      ].map((item, index) => (
        <div key={index}>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">{item.label}</span>
            <span className="text-sm text-gray-500">{item.progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className={`bg-${item.color}-500 h-2 rounded-full transition-all duration-1000`}
              style={{ width: `${item.progress}%` }}
            ></div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default ProgressTracker;