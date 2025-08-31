import React, { useState } from 'react';
import { User, ArrowRight, CheckCircle } from 'lucide-react';

const WelcomePage = ({ onProceed }) => {
  const [userName, setUserName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userName.trim()) {
      setIsSubmitting(true);
      // Store the name
      localStorage.setItem('userName', userName.trim());

      // Add a small delay for better UX
      setTimeout(() => {
        onProceed();
      }, 500);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 max-w-md w-full border border-gray-100">
        <div className="text-center space-y-4 sm:space-y-6">
          {/* Welcome Header */}
          <div className="space-y-3 sm:space-y-4">
            <div className="mx-auto w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center">
              <User className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Welcome to Resume Optimizer!</h2>
            <p className="text-sm sm:text-base text-gray-600">Let's get you started with a personalized experience</p>
          </div>

        <form onSubmit={handleSubmit} className="space-y-6 mt-8">
          <div>
            <label htmlFor="userName" className="block text-sm font-medium text-gray-700 mb-2">
              What should we call you?
            </label>
            <input
              type="text"
              id="userName"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Enter your full name"
              className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              required
              autoFocus
            />
          </div>

          <button
            type="submit"
            disabled={!userName.trim() || isSubmitting}
            className="w-full py-2 sm:py-3 px-3 sm:px-4 text-sm sm:text-base bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-indigo-700 disabled:from-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center space-x-2 transform hover:scale-105"
          >
            {isSubmitting ? (
              <>
                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="hidden sm:inline">Setting up your workspace...</span>
                <span className="sm:hidden">Setting up...</span>
              </>
            ) : (
              <>
                <span>Kindly Proceed</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </>
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            Your information is secure and will only be used to enhance your experience
          </p>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;