import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { LogIn, User, ArrowLeft, Lock, Mail, Eye, EyeOff, Sun, Moon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();
  const { isDarkMode, toggleTheme } = useTheme();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [participant, setParticipant] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (error) {
      setError(null);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    
    if (!formData.email.trim() || !formData.password.trim()) {
      setError('Please enter both email and password');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.post('http://localhost:8000/api/auth/login', {
        email: formData.email.trim(),
        password: formData.password
      });
      
      setParticipant(response.data.participant);
      
      // Store participant info in localStorage for session management
      localStorage.setItem('participant', JSON.stringify(response.data.participant));
      
      // Redirect to dashboard or team creation
      if (response.data.participant.team_id) {
        navigate(`/team/${response.data.participant.team_id}`);
      } else {
        navigate('/dashboard');
      }
      
    } catch (err) {
      if (err.response?.status === 401) {
        setError('Invalid email or password. Please try again.');
      } else {
        setError('Login failed. Please try again.');
      }
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen relative overflow-hidden transition-all duration-500 pt-24 sm:pt-20 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-black via-slate-900 via-purple-900 via-slate-800 to-black' 
        : 'bg-gradient-to-br from-amber-50 via-orange-50 via-rose-50 via-pink-50 to-white'
    }`}>
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {isDarkMode ? (
          <>
            <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-purple-500/25 via-pink-500/20 to-blue-500/25 rounded-full blur-3xl animate-float"></div>
            <div className="absolute top-40 right-20 w-96 h-96 bg-gradient-to-r from-blue-500/25 via-cyan-500/20 to-indigo-500/25 rounded-full blur-3xl animate-float delay-1000"></div>
            <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-gradient-to-r from-cyan-500/25 via-teal-500/20 to-green-500/25 rounded-full blur-3xl animate-float delay-2000"></div>
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
          </>
        ) : (
          <>
            <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-amber-100/50 via-orange-100/40 to-rose-100/50 rounded-full blur-3xl animate-float"></div>
            <div className="absolute top-40 right-20 w-96 h-96 bg-gradient-to-r from-rose-100/50 via-pink-100/40 to-fuchsia-100/50 rounded-full blur-3xl animate-float delay-1000"></div>
            <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-gradient-to-r from-teal-100/50 via-emerald-100/40 to-amber-100/50 rounded-full blur-3xl animate-float delay-2000"></div>
          </>
        )}
      </div>

      {/* Header */}
      <div className="relative z-10 px-4 sm:px-6 pt-16 pb-4">
        <div className="flex justify-center items-center">
          <Link to="/" className={`flex items-center space-x-2 sm:space-x-3 transition-colors ${
            isDarkMode ? 'text-purple-400 hover:text-purple-300' : 'text-amber-600 hover:text-amber-700'
          }`}>
            <ArrowLeft className="h-5 w-5 sm:h-6 sm:w-6" />
            <span className="text-sm sm:text-base font-medium">Back to Home</span>
          </Link>
        </div>
      </div>

      {/* Login Container */}
      <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-120px)] px-4 sm:px-6 pb-16">
        <div className={`w-full sm:w-[90%] md:w-[70%] lg:w-[45%] ${
          isDarkMode 
            ? 'bg-slate-900/40 backdrop-blur-xl border border-slate-700/50 shadow-2xl shadow-black/40' 
            : 'bg-white/40 backdrop-blur-xl border border-amber-200/50 shadow-2xl shadow-amber-200/40'
        } rounded-2xl sm:rounded-3xl p-6 sm:p-8`}>
          <div className="text-center mb-6 sm:mb-8">
            <div className="flex justify-center mb-3 sm:mb-4">
              <LogIn className={`h-10 w-6 sm:h-12 sm:w-8 ${isDarkMode ? 'text-purple-400' : 'text-amber-600'}`} />
            </div>
            <h1 className={`text-2xl sm:text-3xl font-bold mb-2 ${
              isDarkMode ? 'text-white' : 'text-amber-900'
            }`}>
              Welcome Back!
            </h1>
            <p className={`text-xs sm:text-sm ${
              isDarkMode ? 'text-slate-300' : 'text-amber-700'
            }`}>
              Login with your registered email and password to access your account
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-800">
              <div className="flex items-center space-x-2">
                <span>{error}</span>
              </div>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4 sm:space-y-6">
            <div>
              <label htmlFor="email" className={`block text-sm font-medium mb-2 ${
                isDarkMode ? 'text-slate-200' : 'text-amber-700'
              }`}>
                Email Address
              </label>
              <div className="relative">
                <Mail className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 ${
                  isDarkMode ? 'text-slate-400' : 'text-gray-400'
                }`} />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2.5 sm:py-3 text-sm sm:text-base rounded-lg sm:rounded-xl border-2 transition-all duration-300 focus:outline-none focus:ring-4 ${
                    isDarkMode
                      ? 'bg-slate-800/50 border-slate-600 text-white placeholder-slate-400 focus:border-purple-500 focus:ring-purple-500/25'
                      : 'bg-white/50 border-amber-300 text-amber-900 placeholder-amber-500 focus:border-amber-500 focus:ring-amber-500/25'
                  } backdrop-blur-sm`}
                  placeholder="Enter your email address"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className={`block text-sm font-medium mb-2 ${
                isDarkMode ? 'text-slate-200' : 'text-amber-700'
              }`}>
                Password
              </label>
              <div className="relative">
                <Lock className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 ${
                  isDarkMode ? 'text-slate-400' : 'text-gray-400'
                }`} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full pl-9 sm:pl-10 pr-10 sm:pr-12 py-2.5 sm:py-3 text-sm sm:text-base rounded-lg sm:rounded-xl border-2 transition-all duration-300 focus:outline-none focus:ring-4 ${
                    isDarkMode
                      ? 'bg-slate-800/50 border-slate-600 text-white placeholder-slate-400 focus:border-purple-500 focus:ring-purple-500/25'
                      : 'bg-white/50 border-amber-300 text-amber-900 placeholder-amber-500 focus:border-amber-500 focus:ring-amber-500/25'
                  } backdrop-blur-sm`}
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={`absolute right-3 top-1/2 transform -translate-y-1/2 p-1 rounded-md transition-colors ${
                    isDarkMode ? 'text-slate-400 hover:text-slate-300' : 'text-gray-400 hover:text-gray-600'
                  }`}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full text-white py-2.5 sm:py-3 rounded-lg sm:rounded-xl text-base sm:text-lg font-semibold shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${
                isDarkMode 
                  ? 'bg-gradient-to-r from-purple-500 to-blue-500 shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-500/40' 
                  : 'bg-gradient-to-r from-amber-500 to-orange-500 shadow-amber-500/25 hover:shadow-xl hover:shadow-amber-500/40'
              }`}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          {participant && (
            <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-xl">
              <div className="flex items-center space-x-2 text-green-800">
                <User className="h-4 w-4" />
                <span>Welcome, {participant.name}!</span>
              </div>
              <p className="text-sm text-green-700 mt-1">
                Redirecting to your dashboard...
              </p>
            </div>
          )}

          <div className="mt-6 sm:mt-8 text-center">
            <p className={`mb-3 sm:mb-4 text-xs sm:text-sm ${
              isDarkMode ? 'text-slate-400' : 'text-amber-700'
            }`}>
              Don't have an account yet?
            </p>
            <Link to="/register" className={`inline-block px-4 sm:px-6 py-2.5 sm:py-3 border-2 rounded-lg sm:rounded-xl text-sm sm:text-base font-medium transition-all duration-300 ${
              isDarkMode 
                ? 'border-purple-600 text-purple-500 hover:bg-purple-500 hover:text-white' 
                : 'border-amber-600 text-amber-600 hover:bg-amber-500 hover:text-white'
            }`}>
              Register Now
            </Link>
          </div>

          <div className="mt-4 sm:mt-6 text-center text-xs sm:text-sm text-amber-700">
            <p>
              Use the same email and password you used during registration.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
