import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Users, Home, UserPlus, Shield, LogIn, BarChart3, Power, Sun, Moon, Sparkles } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [participant, setParticipant] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const { isDarkMode, toggleTheme } = useTheme();

  useEffect(() => {
    // Check if user is logged in
    const storedParticipant = localStorage.getItem('participant');
    if (storedParticipant) {
      try {
        const parsedParticipant = JSON.parse(storedParticipant);
        setParticipant(parsedParticipant);
      } catch (err) {
        console.error('Error parsing participant data:', err);
        localStorage.removeItem('participant');
      }
    }
  }, [location.pathname]); // Re-check when location changes

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('participant');
    setParticipant(null);
    navigate('/');  
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-white/20 dark:border-gray-700/50 shadow-lg' 
        : 'bg-transparent backdrop-blur-md'
    }`}>
      {/* Floating background elements when transparent */}
      {!isScrolled && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className={`w-2 h-2 rounded-full animate-pulse ${
            isDarkMode ? 'bg-purple-400/30' : 'bg-amber-400/30'
          }`} style={{ position: 'absolute', top: '16px', left: '25%' }}></div>
          <div className={`w-1.5 h-1.5 rounded-full animate-pulse delay-1000 ${
            isDarkMode ? 'bg-blue-400/30' : 'bg-orange-400/30'
          }`} style={{ position: 'absolute', top: '24px', right: '33.33%' }}></div>
          <div className={`w-1 h-1 rounded-full animate-pulse delay-2000 ${
            isDarkMode ? 'bg-cyan-400/30' : 'bg-rose-400/30'
          }`} style={{ position: 'absolute', top: '32px', left: '66.67%' }}></div>
        </div>
      )}
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group relative">
            <div className={`p-2 rounded-xl shadow-lg transition-all duration-300 transform group-hover:scale-105 ${
              isDarkMode 
                ? 'bg-gradient-to-r from-purple-500 to-blue-500 group-hover:shadow-purple-500/25' 
                : 'bg-gradient-to-r from-amber-500 to-orange-500 group-hover:shadow-amber-500/25'
            }`}>
              <Sparkles className="h-7 w-7 text-white group-hover:animate-spin transition-all duration-300" />
            </div>
            <span className={`text-2xl font-bold bg-clip-text text-transparent transition-all duration-300 ${
              isDarkMode 
                ? 'bg-gradient-to-r from-purple-400 to-blue-400 group-hover:from-purple-500 group-hover:to-blue-500' 
                : 'bg-gradient-to-r from-amber-500 to-orange-500 group-hover:from-amber-600 group-hover:to-orange-600'
            }`}>
              MATHRIX
            </span>
            {/* Hover glow effect */}
            <div className={`absolute inset-0 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 ${
              isDarkMode 
                ? 'bg-gradient-to-r from-purple-400/20 to-blue-400/20' 
                : 'bg-gradient-to-r from-amber-400/20 to-orange-400/20'
            }`}></div>
          </Link>

          {/* Navigation Links */}
          <div className="hidden lg:flex items-center space-x-2">
            <Link
              to="/"
              className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 transform hover:scale-105 relative overflow-hidden ${
                isActive('/')
                  ? isDarkMode 
                    ? 'bg-gradient-to-r from-purple-500/20 to-blue-500/20 text-purple-600 dark:text-purple-400 border border-purple-400/30 dark:border-purple-500/30 backdrop-blur-sm'
                    : 'bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-700 border border-amber-400/30 backdrop-blur-sm'
                  : isDarkMode
                    ? 'text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-white/50 dark:hover:bg-gray-800/50 backdrop-blur-sm'
                    : 'text-slate-700 hover:text-amber-600 hover:bg-white/50 backdrop-blur-sm'
              }`}
            >
              {/* Shimmer effect for active items */}
              {isActive('/') && (
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-shimmer"></div>
              )}
              <div className="flex items-center space-x-2 relative z-10">
                <Home className="h-4 w-4" />
                <span>Home</span>
              </div>
            </Link>
            
            {participant ? (
              // Logged in user - show dashboard and logout
              <>
                <Link
                  to="/dashboard"
                  className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 transform hover:scale-105 relative overflow-hidden ${
                    isActive('/dashboard')
                      ? isDarkMode 
                        ? 'bg-gradient-to-r from-purple-500/20 to-blue-500/20 text-purple-600 dark:text-purple-400 border border-purple-400/30 dark:border-purple-500/30 backdrop-blur-sm'
                        : 'bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-700 border border-amber-400/30 backdrop-blur-sm'
                      : isDarkMode
                        ? 'text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-white/50 dark:hover:bg-gray-800/50 backdrop-blur-sm'
                        : 'text-slate-700 hover:text-amber-600 hover:bg-white/50 backdrop-blur-sm'
                  }`}
                >
                  {/* Shimmer effect for active items */}
                  {isActive('/dashboard') && (
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-shimmer"></div>
                  )}
                  <div className="flex items-center space-x-2 relative z-10">
                    <BarChart3 className="h-4 w-4" />
                    <span>Dashboard</span>
                  </div>
                </Link>
                
                {/* Removed duplicate CTA: Go to Dashboard */}
                
                <button
                  onClick={handleLogout}
                  className="px-4 py-2.5 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 backdrop-blur-sm transition-all duration-300 transform hover:scale-105 border border-transparent hover:border-red-400/30"
                >
                  <div className="flex items-center space-x-2">
                    <Power className="h-4 w-4" />
                    <span>Logout</span>
                  </div>
                </button>
              </>
            ) : (
              // Not logged in - show register and login
              <>
                <Link
                  to="/register"
                  className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
                    isActive('/register')
                      ? isDarkMode 
                        ? 'bg-gradient-to-r from-purple-500/20 to-blue-500/20 text-purple-600 dark:text-purple-400 border border-purple-400/30 dark:border-purple-500/30 backdrop-blur-sm'
                        : 'bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-700 border border-amber-400/30 backdrop-blur-sm'
                      : isDarkMode
                        ? 'text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-white/50 dark:hover:bg-gray-800/50 backdrop-blur-sm'
                        : 'text-slate-700 hover:text-amber-600 hover:bg-white/50 backdrop-blur-sm'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <UserPlus className="h-4 w-4" />
                    <span>Register</span>
                  </div>
                </Link>
                
                <Link
                  to="/login"
                  className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
                    isActive('/login')
                      ? isDarkMode 
                        ? 'bg-gradient-to-r from-purple-500/20 to-blue-500/20 text-purple-600 dark:text-purple-400 border border-purple-400/30 dark:border-purple-500/30 backdrop-blur-sm'
                        : 'bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-700 border border-amber-400/30 backdrop-blur-sm'
                      : isDarkMode
                        ? 'text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-white/50 dark:hover:bg-gray-800/50 backdrop-blur-sm'
                        : 'text-slate-700 hover:text-amber-600 hover:bg-white/50 backdrop-blur-sm'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <LogIn className="h-4 w-4" />
                    <span>Login</span>
                  </div>
                </Link>
                
                {/* Removed duplicate CTA: Get Started */}
              </>
            )}
            
            <Link
              to="/admin"
              className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
                isActive('/admin')
                  ? isDarkMode 
                    ? 'bg-gradient-to-r from-purple-500/20 to-blue-500/20 text-purple-600 dark:text-purple-400 border border-purple-400/30 dark:border-purple-500/30 backdrop-blur-sm'
                    : 'bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-700 border border-amber-400/30 backdrop-blur-sm'
                  : isDarkMode
                    ? 'text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-white/50 dark:hover:bg-gray-800/50 backdrop-blur-sm'
                    : 'text-slate-700 hover:text-amber-600 hover:bg-white/50 backdrop-blur-sm'
              }`}
            >
              <div className="flex items-center space-x-2">
                <Shield className="h-4 w-4" />
                <span>Admin</span>
              </div>
            </Link>
          </div>

          {/* Right Side Controls */}
          <div className="flex items-center space-x-3">
            {/* Enhanced Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`relative w-12 h-12 rounded-2xl transition-all duration-500 ease-in-out transform hover:scale-110 active:scale-95 ${
                isDarkMode
                  ? 'bg-gradient-to-br from-slate-800 to-slate-900 shadow-lg shadow-black/30 border border-slate-700/50'
                  : 'bg-gradient-to-br from-amber-100 to-orange-100 shadow-lg shadow-amber-200/50 border border-amber-200/50'
              }`}
              title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              <div className={`absolute inset-0 rounded-2xl transition-all duration-500 ${
                isDarkMode 
                  ? 'bg-gradient-to-br from-purple-500/20 via-blue-500/20 to-cyan-500/20' 
                  : 'bg-gradient-to-br from-amber-400/20 via-orange-400/20 to-rose-400/20'
              }`}></div>
              
              {/* Sun Icon - Shows in dark mode to switch to light */}
              <div className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${
                isDarkMode ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 rotate-90 scale-0'
              }`}>
                <Sun className={`h-5 w-5 text-amber-500 drop-shadow-lg`} />
              </div>
              
              {/* Moon Icon - Shows in light mode to switch to dark */}
              <div className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${
                isDarkMode ? 'opacity-0 -rotate-90 scale-0' : 'opacity-100 rotate-0 scale-100'
              }`}>
                <Moon className={`h-5 w-5 text-blue-600 drop-shadow-lg`} />
              </div>
              
              {/* Glow Effect */}
              <div className={`absolute inset-0 rounded-2xl transition-all duration-500 ${
                isDarkMode 
                  ? 'bg-gradient-to-br from-purple-500/10 via-blue-500/10 to-cyan-500/10' 
                  : 'bg-gradient-to-br from-amber-400/10 via-orange-400/10 to-rose-400/10'
              } blur-sm`}></div>
            </button>
            
            {/* Mobile Menu Button */}
            <div className="lg:hidden">
              <button className={`p-2.5 rounded-xl backdrop-blur-sm transition-all duration-300 transform hover:scale-105 border border-transparent ${
                isDarkMode 
                  ? 'text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-white/50 dark:hover:bg-gray-800/50 hover:border-purple-400/30' 
                  : 'text-slate-700 hover:text-amber-600 hover:bg-white/50 hover:border-amber-400/30'
              }`}>
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Subtle bottom border when transparent */}
      {!isScrolled && (
        <>
          <div className={`absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent ${
            isDarkMode ? 'via-purple-400/20' : 'via-amber-400/20'
          } to-transparent`}></div>
          {/* Animated wave effect */}
          <div className="absolute bottom-0 left-0 right-0 h-0.5">
            <div className={`w-full h-full animate-pulse ${
              isDarkMode 
                ? 'bg-gradient-to-r from-purple-400/30 via-blue-400/30 to-cyan-400/30' 
                : 'bg-gradient-to-r from-amber-400/30 via-orange-400/30 to-rose-400/30'
            }`}></div>
          </div>
        </>
      )}
    </nav>
  );
};

export default Navbar;
