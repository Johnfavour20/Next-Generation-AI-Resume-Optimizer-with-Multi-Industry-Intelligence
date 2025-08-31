
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 w-full max-w-md border border-gray-200">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mb-4">
            <User className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Welcome to Resume Optimizer!</h2>
          <p className="text-sm sm:text-base text-gray-600">We'd love to know your name to personalize your experience</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
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
