import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  Link,
} from "react-router-dom";

import ATSResumeOptimizer from "./components/ATSResumeOptimizer";
import WelcomePage from "./components/WelcomePage";

function Home() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center p-8 rounded-2xl shadow bg-white">
        <h1 className="text-3xl font-bold text-gray-800">Resume Optimizer</h1>
        <p className="mt-2 text-gray-600">
          Build and optimize your resume with ease.
        </p>

        <div className="mt-6">
          <button
            onClick={() => navigate("/login")}
            className="px-6 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
}

function Login({ onLogin }) {
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin();
    navigate("/optimizer");
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="email" placeholder="Email" required className="w-full px-4 py-2 border rounded-lg" />
          <input type="password" placeholder="Password" required className="w-full px-4 py-2 border rounded-lg" />
          <button type="submit" className="w-full py-2 bg-blue-600 text-white rounded-lg">Login</button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          Don’t have an account?{" "}
          <Link to="/register" className="text-blue-600 hover:underline">Register</Link>
        </p>
      </div>
    </div>
  );
}

function Register() {
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const fullName = e.target.fullName.value;
    localStorage.setItem("userName", fullName);
    navigate("/login");
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Register</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" name="fullName" placeholder="Full Name" required className="w-full px-4 py-2 border rounded-lg" />
          <input type="email" placeholder="Email" required className="w-full px-4 py-2 border rounded-lg" />
          <input type="password" placeholder="Password" required className="w-full px-4 py-2 border rounded-lg" />
          <button type="submit" className="w-full py-2 bg-blue-600 text-white rounded-lg">Register</button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
}

function OptimizerWrapper({ onLogout }) {
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    const userName = localStorage.getItem('userName');
    const hasCompletedWelcome = localStorage.getItem('hasCompletedWelcome');
    
    // Show welcome page if user doesn't have a name or hasn't completed welcome
    if (!userName || !hasCompletedWelcome) {
      setShowWelcome(true);
    }
  }, []);

  const handleProceedFromWelcome = () => {
    localStorage.setItem('hasCompletedWelcome', 'true');
    setShowWelcome(false);
  };

  if (showWelcome) {
    return <WelcomePage onProceed={handleProceedFromWelcome} />;
  }

  return (
    <div className="relative min-h-screen">
      <ATSResumeOptimizer />
    </div>
  );
}

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const storedAuth = localStorage.getItem("isAuthenticated");
    if (storedAuth === "true") setIsAuthenticated(true);
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem("isAuthenticated", "true");
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userName");
    localStorage.removeItem("hasCompletedWelcome");
  };

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
              // 🔴 Instead of showing message, redirect to /register
              <Register />
            )
          }
        />
      </Routes>
    </Router>
  );
}
