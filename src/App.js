import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  Link,
} from "react-router-dom";

import ATSResumeOptimizer from "./components/ATSResumeOptimizer";

function Home() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 sm:px-6 lg:px-8">
      <div className="text-center p-6 sm:p-8 lg:p-10 rounded-2xl shadow-lg bg-white max-w-md w-full">
        <div className="mx-auto h-16 w-16 sm:h-20 sm:w-20 lg:h-24 lg:w-24 flex items-center justify-center rounded-full bg-blue-600 text-white text-xl sm:text-2xl lg:text-3xl font-bold mb-4 sm:mb-6">
          R
        </div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-2">Resume Optimizer</h1>
        <p className="mt-2 text-sm sm:text-base text-gray-600 leading-relaxed">
          Build and optimize your resume with ease using our AI-powered platform.
        </p>

        <div className="mt-6 sm:mt-8">
          <button
            onClick={() => navigate("/login")}
            className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-all duration-300 font-semibold text-sm sm:text-base transform hover:scale-105 shadow-lg"
          >
            Get Started
          </button>
        </div>

        <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-100">
          <p className="text-xs sm:text-sm text-gray-500 mb-3">Trusted by professionals worldwide</p>
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4 text-xs text-gray-400">
            <span>• ATS Compatible</span>
            <span>• AI-Powered</span>
            <span>• Multi-Language</span>
            <span>• Enterprise Ready</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function Login({ onLogin }) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate loading
    setTimeout(() => {
      onLogin();
      navigate("/optimizer");
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 sm:px-6 lg:px-8">
      <div className="bg-white p-6 sm:p-8 lg:p-10 rounded-2xl shadow-lg w-full max-w-sm sm:max-w-md">
        <div className="text-center mb-6 sm:mb-8">
          <div className="mx-auto h-12 w-12 sm:h-16 sm:w-16 flex items-center justify-center rounded-full bg-blue-600 text-white text-lg sm:text-xl font-bold mb-4">
            R
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Welcome Back</h2>
          <p className="text-sm sm:text-base text-gray-600">Sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              required
              className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base transition-all duration-200"
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              required
              className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base transition-all duration-200"
            />
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center">
              <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
              <span className="ml-2 text-gray-600">Remember me</span>
            </label>
            <a href="#" className="text-blue-600 hover:text-blue-700 hover:underline">
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2 sm:py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 font-semibold text-sm sm:text-base transform hover:scale-105 shadow-lg"
          >
            {isLoading ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Signing in...</span>
              </div>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-200">
          <p className="text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-600 hover:text-blue-700 font-semibold hover:underline">
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

function Register() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    const fullName = e.target.fullName.value;
    
    // Simulate registration process
    setTimeout(() => {
      // Note: In a real app, avoid localStorage for sensitive data
      localStorage.setItem("userName", fullName);
      setIsLoading(false);
      navigate("/login");
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 sm:px-6 lg:px-8">
      <div className="bg-white p-6 sm:p-8 lg:p-10 rounded-2xl shadow-lg w-full max-w-sm sm:max-w-md">
        <div className="text-center mb-6 sm:mb-8">
          <div className="mx-auto h-12 w-12 sm:h-16 sm:w-16 flex items-center justify-center rounded-full bg-blue-600 text-white text-lg sm:text-xl font-bold mb-4">
            R
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Create Account</h2>
          <p className="text-sm sm:text-base text-gray-600">Join thousands of professionals</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
              Full Name
            </label>
            <input
              id="fullName"
              type="text"
              name="fullName"
              placeholder="Enter your full name"
              required
              className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base transition-all duration-200"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              required
              className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base transition-all duration-200"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Create a strong password"
              required
              className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base transition-all duration-200"
            />
            <p className="mt-1 text-xs text-gray-500">Must be at least 8 characters</p>
          </div>

          <div className="flex items-start">
            <input
              id="terms"
              type="checkbox"
              required
              className="mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor="terms" className="ml-2 text-xs sm:text-sm text-gray-600 leading-relaxed">
              I agree to the{" "}
              <a href="#" className="text-blue-600 hover:text-blue-700 hover:underline">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="text-blue-600 hover:text-blue-700 hover:underline">
                Privacy Policy
              </a>
            </label>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2 sm:py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 font-semibold text-sm sm:text-base transform hover:scale-105 shadow-lg"
          >
            {isLoading ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Creating account...</span>
              </div>
            ) : (
              'Create Account'
            )}
          </button>
        </form>

        <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-200">
          <p className="text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 hover:text-blue-700 font-semibold hover:underline">
              Sign In
            </Link>
          </p>
        </div>

        <div className="mt-4 sm:mt-6 text-center">
          <div className="flex items-center justify-center space-x-2 text-xs text-gray-400">
            <span>🔒 Secure</span>
            <span>•</span>
            <span>🚀 Fast Setup</span>
            <span>•</span>
            <span>🎯 ATS Ready</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function OptimizerWrapper({ onLogout }) {
  const navigate = useNavigate();
  const userName = localStorage.getItem("userName") || "User";
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  return (
    <div className="relative min-h-screen">
      {/* Enhanced Top Navigation Bar */}
      <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg">
        <div className="flex items-center space-x-3">
          <div className="h-8 w-8 sm:h-10 sm:w-10 flex items-center justify-center rounded-full bg-white bg-opacity-20 text-sm sm:text-base font-bold">
            R
          </div>
          <div className="hidden sm:block">
            <h2 className="text-sm sm:text-base lg:text-lg font-semibold">Welcome, {userName}</h2>
            <p className="text-xs text-blue-100">Resume Optimizer Platform</p>
          </div>
          <div className="sm:hidden">
            <h2 className="text-sm font-semibold">Hi, {userName.split(' ')[0]}</h2>
          </div>
        </div>

        <div className="flex items-center space-x-2 sm:space-x-4">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="sm:hidden p-2 rounded-lg bg-white bg-opacity-20 hover:bg-opacity-30 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden sm:flex items-center space-x-3 lg:space-x-4">
            <div className="flex items-center space-x-2 px-3 py-1.5 bg-white bg-opacity-20 rounded-lg">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-xs lg:text-sm">Online</span>
            </div>
            
            <button
              onClick={() => {
                onLogout();
                navigate("/");
              }}
              className="px-3 sm:px-4 lg:px-6 py-1.5 sm:py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all duration-300 text-xs sm:text-sm font-medium transform hover:scale-105"
            >
              <span className="hidden lg:inline">Logout</span>
              <span className="lg:hidden">Exit</span>
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {showMobileMenu && (
          <div className="absolute top-full left-0 right-0 bg-white shadow-lg border-t border-gray-200 sm:hidden z-50">
            <div className="py-2">
              <div className="px-4 py-3 border-b border-gray-100">
                <p className="text-sm font-medium text-gray-900">Welcome, {userName}</p>
                <p className="text-xs text-gray-500">Resume Optimizer Platform</p>
              </div>
              
              <div className="px-4 py-3 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-sm text-gray-700">Status: Online</span>
                </div>
              </div>
              
              <div className="px-4 py-2">
                <button
                  onClick={() => {
                    onLogout();
                    navigate("/");
                    setShowMobileMenu(false);
                  }}
                  className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <ATSResumeOptimizer />
    </div>
  );
}

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate checking authentication state
    setTimeout(() => {
      const storedAuth = localStorage.getItem("isAuthenticated");
      if (storedAuth === "true") setIsAuthenticated(true);
      setIsLoading(false);
    }, 500);
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem("isAuthenticated", "true");
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userName");
  };

  // Loading screen
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="text-center">
          <div className="h-16 w-16 sm:h-20 sm:w-20 mx-auto mb-4 flex items-center justify-center rounded-full bg-blue-600 text-white text-xl sm:text-2xl font-bold animate-pulse">
            R
          </div>
          <div className="flex items-center justify-center space-x-2">
            <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
          <p className="mt-3 text-sm sm:text-base text-gray-600">Loading Resume Optimizer...</p>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/optimizer"
          element={
            isAuthenticated ? (
              <OptimizerWrapper onLogout={handleLogout} />
            ) : (
              <Register />
            )
          }
        />
      </Routes>
    </Router>
  );
}
