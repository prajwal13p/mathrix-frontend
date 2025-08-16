import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Users, Target, TrendingUp, Star, ArrowRight, Sparkles, Zap, Globe, Shield, Rocket, Sun, Moon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const Home = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [participant, setParticipant] = useState(null);
  const { isDarkMode, toggleTheme } = useTheme();

  useEffect(() => {
    const storedParticipant = localStorage.getItem('participant');
    if (storedParticipant) {
      try {
        const parsedParticipant = JSON.parse(storedParticipant);
        setParticipant(parsedParticipant);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Error parsing participant data:', error);
      }
    }
  }, []);

  return (
    <div className={`min-h-screen relative overflow-hidden transition-all duration-500 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-black via-slate-900 via-purple-900 via-slate-800 to-black' 
        : 'bg-gradient-to-br from-amber-50 via-orange-50 via-rose-50 via-pink-50 to-white'
    }`}>
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Flowing Galaxy Orbs - Dark mode only */}
        {isDarkMode && (
          <>
            <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-purple-500/25 via-pink-500/20 to-blue-500/25 rounded-full blur-3xl animate-cosmic-float"></div>
            <div className="absolute top-40 right-20 w-96 h-96 bg-gradient-to-r from-blue-500/25 via-cyan-500/20 to-indigo-500/25 rounded-full blur-3xl animate-cosmic-float delay-1000"></div>
            <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-gradient-to-r from-cyan-500/25 via-teal-500/20 to-green-500/25 rounded-full blur-3xl animate-cosmic-float delay-2000"></div>
            
                    {/* Additional flowing elements */}
        <div className={`absolute top-1/3 left-10 w-32 h-32 rounded-full blur-2xl animate-float delay-500 ${
          isDarkMode 
            ? 'bg-gradient-to-r from-pink-500/20 via-rose-500/15 to-purple-500/20' 
            : 'bg-gradient-to-r from-pink-300/25 via-rose-300/20 to-purple-300/25'
        }`}></div>
        <div className={`absolute bottom-1/3 right-10 w-40 h-40 rounded-full blur-2xl animate-float delay-1500 ${
          isDarkMode 
            ? 'bg-gradient-to-r from-indigo-500/20 via-purple-500/15 to-pink-500/20' 
            : 'bg-gradient-to-r from-indigo-300/25 via-purple-300/20 to-pink-300/25'
        }`}></div>
            
            {/* More galaxy elements */}
            <div className="absolute top-1/4 right-1/3 w-48 h-48 bg-gradient-to-r from-cyan-500/20 via-blue-500/15 to-indigo-500/20 rounded-full blur-2xl animate-cosmic-float delay-300"></div>
            <div className="absolute bottom-1/3 left-1/5 w-56 h-56 bg-gradient-to-r from-green-500/20 via-teal-500/15 to-cyan-500/20 rounded-full blur-2xl animate-cosmic-float delay-800"></div>
            
            {/* Flowing dark depth layers */}
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/40 via-transparent to-black/60 animate-pulse"></div>
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-black/30 via-transparent to-black/30 animate-pulse delay-1000"></div>
            
            {/* Additional flowing dark orbs */}
            <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-gradient-to-r from-slate-800/25 via-gray-800/20 to-slate-700/25 rounded-full blur-3xl animate-float delay-300"></div>
            <div className="absolute bottom-1/4 left-1/4 w-56 h-56 bg-gradient-to-r from-gray-900/30 via-slate-900/25 to-gray-800/30 rounded-full blur-3xl animate-float delay-700"></div>
            <div className="absolute top-3/4 left-1/2 w-48 h-48 bg-gradient-to-r from-black/35 via-gray-900/30 to-black/35 rounded-full blur-2xl animate-float delay-1200"></div>
            
            {/* Grid Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
            
            {/* Darker grid overlay for depth */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.3)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.3)_1px,transparent_1px)] bg-[size:100px_100px]"></div>
            
            {/* Hexagon Pattern */}
            <div className="absolute inset-0 opacity-30">
              <div className="absolute top-20 left-20 w-32 h-32 border border-purple-400/15 transform rotate-45"></div>
              <div className="absolute top-40 right-32 w-24 h-24 border border-blue-400/15 transform rotate-45"></div>
              <div className="absolute bottom-32 left-1/4 w-28 h-28 border border-cyan-400/15 transform rotate-45"></div>
            </div>
            
            {/* Geometric shapes for depth */}
            <div className="absolute inset-0 opacity-40">
              <div className={`absolute top-10 left-1/3 w-20 h-20 border transform rotate-12 ${
                isDarkMode ? 'border-slate-700/30' : 'border-amber-300/30'
              }`}></div>
              <div className={`absolute top-60 right-20 w-16 h-16 border transform -rotate-45 ${
                isDarkMode ? 'border-gray-800/40' : 'border-orange-300/40'
              }`}></div>
              <div className={`absolute bottom-40 right-1/3 w-24 h-24 border transform rotate-30 ${
                isDarkMode ? 'border-black/50' : 'border-rose-300/50'
              }`}></div>
            </div>
            
            {/* Animated Lines */}
            <div className="absolute top-0 left-0 w-full h-full">
              <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-400/40 to-transparent animate-pulse"></div>
              <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-400/40 to-transparent animate-pulse delay-1000"></div>
              <div className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent animate-pulse delay-2000"></div>
            </div>
            
            {/* Horizontal lines for depth */}
            <div className="absolute top-0 left-0 w-full h-full">
              <div className={`absolute top-1/6 left-0 w-full h-0.5 bg-gradient-to-r from-transparent to-transparent ${
                isDarkMode ? 'via-black/60' : 'via-amber-300/40'
              }`}></div>
              <div className={`absolute top-2/3 left-0 w-full h-0.5 bg-gradient-to-r from-transparent to-transparent ${
                isDarkMode ? 'via-slate-800/50' : 'via-orange-300/40'
              }`}></div>
              <div className={`absolute bottom-1/6 left-0 w-full h-0.5 bg-gradient-to-r from-transparent to-transparent ${
                isDarkMode ? 'via-gray-900/70' : 'via-rose-300/40'
              }`}></div>
            </div>
            
            {/* Enhanced Galaxy Particle System */}
            <div className="absolute inset-0">
              {/* Main particles */}
              {[...Array(25)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 bg-purple-400/20 rounded-full animate-pulse"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 2}s`,
                    animationDuration: `${3 + Math.random() * 1}s`
                  }}
                />
              ))}
              
              {/* Blue particles */}
              {[...Array(20)].map((_, i) => (
                <div
                  key={`blue-${i}`}
                  className="absolute w-1 h-1 bg-blue-400/18 rounded-full animate-pulse"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 3}s`,
                    animationDuration: `${4 + Math.random() * 2}s`
                  }}
                />
              ))}
              
              {/* Cyan particles */}
              {[...Array(18)].map((_, i) => (
                <div
                  key={`cyan-${i}`}
                  className="absolute w-1 h-1 bg-cyan-400/16 rounded-full animate-pulse"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 4}s`,
                    animationDuration: `${5 + Math.random() * 2}s`
                  }}
                />
              ))}
              
              {/* Pink particles */}
              {[...Array(15)].map((_, i) => (
                <div
                  key={`pink-${i}`}
                  className="absolute w-1 h-1 bg-pink-400/14 rounded-full animate-pulse"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 5}s`,
                    animationDuration: `${6 + Math.random() * 2}s`
                  }}
                />
              ))}
            </div>
            
            {/* Stable depth elements */}
            <div className="absolute inset-0">
              <div className={`absolute top-1/5 left-1/5 w-96 h-96 rounded-full blur-3xl ${
                isDarkMode ? 'bg-black/25' : 'bg-amber-200/20'
              }`}></div>
              <div className={`absolute bottom-1/5 right-1/5 w-80 h-80 rounded-full blur-3xl ${
                isDarkMode ? 'bg-slate-900/30' : 'bg-orange-200/25'
              }`}></div>
              <div className={`absolute top-1/2 left-1/2 w-64 h-64 rounded-full blur-2xl ${
                isDarkMode ? 'bg-gray-900/35' : 'bg-rose-200/30'
              }`}></div>
            </div>
            
            {/* Enhanced cosmic streams */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-900/15 via-transparent to-blue-900/15"></div>
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-bl from-cyan-900/15 via-transparent to-indigo-900/15"></div>
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tr from-pink-900/12 via-transparent to-purple-900/12"></div>
            </div>
            
            {/* Moving cosmic clouds */}
            <div className="absolute inset-0">
              <div className="absolute top-1/4 left-0 w-1/2 h-1/2 bg-gradient-to-r from-purple-500/8 via-transparent to-blue-500/8 rounded-full blur-3xl animate-float"></div>
              <div className="absolute bottom-1/4 right-0 w-1/2 h-1/2 bg-gradient-to-l from-cyan-500/8 via-transparent to-indigo-500/8 rounded-full blur-3xl animate-float delay-1000"></div>
              <div className="absolute top-1/2 left-1/2 w-1/3 h-1/3 bg-gradient-to-r from-pink-500/6 via-transparent to-purple-500/6 rounded-full blur-2xl animate-float delay-500"></div>
              
              {/* Additional moving clouds */}
              <div className="absolute top-1/6 right-1/4 w-1/4 h-1/4 bg-gradient-to-r from-indigo-500/7 via-transparent to-purple-500/7 rounded-full blur-2xl animate-float delay-1500"></div>
              <div className="absolute bottom-1/6 left-1/3 w-1/5 h-1/5 bg-gradient-to-r from-cyan-500/6 via-transparent to-blue-500/6 rounded-full blur-xl animate-float delay-2000"></div>
            </div>
          </>
        )}

        {/* Light mode background elements */}
        {!isDarkMode && (
          <>
            {/* Warm earth tone gradients for light theme */}
            <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-amber-100/50 via-orange-100/40 to-rose-100/50 rounded-full blur-3xl animate-float"></div>
            <div className="absolute top-40 right-20 w-96 h-96 bg-gradient-to-r from-rose-100/50 via-pink-100/40 to-fuchsia-100/50 rounded-full blur-3xl animate-float delay-1000"></div>
            <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-gradient-to-r from-teal-100/50 via-emerald-100/40 to-amber-100/50 rounded-full blur-3xl animate-float delay-2000"></div>
            
            {/* Additional warm tone orbs for depth */}
            <div className="absolute top-1/3 left-10 w-32 h-32 rounded-full blur-2xl animate-float delay-500 bg-gradient-to-r from-orange-100/40 via-amber-100/30 to-yellow-100/40"></div>
            <div className="absolute bottom-1/3 right-10 w-40 h-40 rounded-full blur-2xl animate-float delay-1500 bg-gradient-to-r from-teal-100/40 via-emerald-100/30 to-green-100/40"></div>
            
            {/* Warm grid pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(245,101,101,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(245,101,101,0.08)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
            
            {/* Warm geometric shapes */}
            <div className="absolute inset-0 opacity-25">
              <div className="absolute top-20 left-20 w-32 h-32 border border-amber-200 transform rotate-45"></div>
              <div className="absolute top-40 right-32 w-24 h-24 border border-orange-200 transform rotate-45"></div>
              <div className="absolute bottom-32 left-1/4 w-28 h-28 border border-teal-200 transform rotate-45"></div>
            </div>
            
            {/* Warm tone particles for atmosphere */}
            <div className="absolute inset-0">
              {[...Array(15)].map((_, i) => (
                <div
                  key={`light-${i}`}
                  className="absolute w-1 h-1 bg-orange-300/30 rounded-full animate-pulse"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 2}s`,
                    animationDuration: `${3 + Math.random() * 1}s`
                  }}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <div className="px-6 pt-32 pb-20 text-center">
          <div className="max-w-6xl mx-auto">
            {/* Animated Badge */}
            <div className="flex items-center justify-center space-x-4 mb-8">
              <div className={`inline-flex items-center space-x-2 px-4 py-2 border rounded-full text-sm font-medium backdrop-blur-sm ${
                isDarkMode 
                  ? 'bg-gradient-to-r from-purple-500/20 to-blue-500/20 border-purple-400/30 text-purple-300' 
                  : 'bg-gradient-to-r from-amber-500/20 to-orange-500/20 border-amber-400/30 text-amber-700'
              }`}>
                <Zap className="h-4 w-4 animate-pulse" />
                <span>AI-Powered Team Formation</span>
              </div>
            </div>

            {/* Main Heading */}
            <h1 className="text-6xl md:text-7xl font-bold mb-8 relative">
              {/* Glowing cosmic background layer - Dark mode only */}
              {isDarkMode && (
                <>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-cyan-500/20 blur-3xl -z-10 animate-pulse"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/15 via-purple-500/15 to-pink-500/15 blur-2xl -z-10 animate-pulse delay-1000"></div>
                </>
              )}
              
              {/* Light theme creative background - Subtle warm shimmer */}
              {!isDarkMode && (
                <>
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-200/20 via-orange-200/15 to-rose-200/20 blur-2xl -z-10 animate-gentle-pulse"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-200/15 via-amber-200/10 to-orange-200/15 blur-xl -z-10 animate-gentle-pulse delay-1000"></div>
                </>
              )}
              
              {/* Text with different effects for each theme */}
              <span className={`bg-clip-text text-transparent relative z-10 ${
                isDarkMode 
                  ? 'bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 animate-text-blink' 
                  : 'bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 animate-shimmer-text'
              }`}>
                Mathrix
              </span>
              <br />
            </h1>

            {/* Subtitle */}
            <p className={`text-lg sm:text-xl md:text-2xl mb-8 sm:mb-12 px-4 sm:px-0 max-w-4xl mx-auto leading-relaxed ${
              isDarkMode ? 'text-gray-300' : 'text-amber-800'
            }`}>
              <span className="inline-block animate-fade-in-up">
                Experience the future of team formation with our AI-powered platform.
              </span>
              <br />
              <span className="inline-block animate-fade-in-up delay-500">
                Discover perfect teammates, build winning teams, and dominate college events.
              </span>
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-12 sm:mb-16 px-4 sm:px-0">
              {isAuthenticated ? (
                <div className="text-center">
                  <p className={`text-base sm:text-lg mb-4 ${
                    isDarkMode ? 'text-purple-300' : 'text-amber-600'
                  }`}>Welcome back! Use the navigation above to access your dashboard.</p>
                </div>
              ) : (
                <>
                  <Link 
                    to="/register" 
                    className={`group px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-semibold rounded-xl sm:rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl flex items-center space-x-2 ${
                      isDarkMode 
                        ? 'bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 hover:shadow-purple-500/25' 
                        : 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 hover:shadow-amber-500/25'
                    } text-white`}
                  >
                    <span>Get Started</span>
                    <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </Link>
                  <Link 
                    to="/login" 
                    className={`px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base border-2 font-semibold rounded-xl sm:rounded-2xl transition-all duration-300 transform hover:scale-105 backdrop-blur-sm ${
                      isDarkMode 
                        ? 'border-purple-400/50 text-purple-300 hover:bg-purple-400/10' 
                        : 'border-orange-500/50 text-orange-600 hover:bg-orange-50'
                    }`}
                  >
                    Sign In
                  </Link>
                </>
              )}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-4xl mx-auto px-4 sm:px-0">
              <div className="text-center group">
                <div className="relative">
                  <div className={`text-3xl sm:text-4xl font-bold bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300 ${
                    isDarkMode 
                      ? 'bg-gradient-to-r from-purple-400 to-blue-400' 
                      : 'bg-gradient-to-r from-amber-500 to-orange-500'
                  }`}>
                    500+
                  </div>
                  {/* Animated underline */}
                  <div className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-clip-text transition-all duration-500 ${
                    isDarkMode 
                      ? 'bg-gradient-to-r from-purple-400 to-blue-400' 
                      : 'bg-gradient-to-r from-amber-500 to-orange-500'
                  } group-hover:w-full`}></div>
                </div>
                <div className={`text-sm sm:text-base group-hover:text-purple-300 transition-colors duration-300 ${
                  isDarkMode ? 'text-gray-400' : 'text-amber-700'
                }`}>Students Registered</div>
              </div>
              <div className="text-center group">
                <div className="relative">
                  <div className={`text-3xl sm:text-4xl font-bold bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300 ${
                    isDarkMode 
                      ? 'bg-gradient-to-r from-blue-400 to-cyan-400' 
                      : 'bg-gradient-to-r from-orange-500 to-rose-500'
                  }`}>
                    100+
                  </div>
                  {/* Animated underline */}
                  <div className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-clip-text transition-all duration-500 ${
                    isDarkMode 
                      ? 'bg-gradient-to-r from-blue-400 to-cyan-400' 
                      : 'bg-gradient-to-r from-orange-500 to-rose-500'
                  } group-hover:w-full`}></div>
                </div>
                <div className={`text-sm sm:text-base group-hover:text-blue-300 transition-colors duration-300 ${
                  isDarkMode ? 'text-gray-400' : 'text-orange-700'
                }`}>Teams Formed</div>
              </div>
              <div className="text-center group">
                <div className="relative">
                  <div className={`text-3xl sm:text-4xl font-bold bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300 ${
                    isDarkMode 
                      ? 'bg-gradient-to-r from-cyan-400 to-purple-400' 
                      : 'bg-gradient-to-r from-teal-500 to-emerald-500'
                  }`}>
                    95%
                  </div>
                  {/* Animated underline */}
                  <div className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-clip-text transition-all duration-500 ${
                    isDarkMode 
                      ? 'bg-gradient-to-r from-cyan-400 to-purple-400' 
                      : 'bg-gradient-to-r from-teal-500 to-emerald-500'
                  } group-hover:w-full`}></div>
                </div>
                <div className={`text-sm sm:text-base group-hover:text-cyan-300 transition-colors duration-300 ${
                  isDarkMode ? 'text-gray-400' : 'text-teal-700'
                }`}>Success Rate</div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="px-6 py-20">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className={`text-4xl md:text-5xl font-bold bg-clip-text text-transparent mb-6 ${
                isDarkMode 
                  ? 'bg-gradient-to-r from-purple-400 to-blue-400' 
                  : 'bg-gradient-to-r from-amber-500 to-orange-500'
              }`}>
                Why Choose Matrix?
              </h2>
              <p className={`text-xl max-w-3xl mx-auto ${
                isDarkMode ? 'text-gray-300' : 'text-amber-800'
              }`}>
                Our AI-powered platform revolutionizes team formation with intelligent matching, 
                real-time collaboration, and seamless event management.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: Sparkles,
                  title: "AI-Powered Matching",
                  description: "Advanced algorithms analyze skills, interests, and compatibility to find your perfect teammates.",
                  gradient: isDarkMode ? "from-purple-500 to-pink-500" : "from-amber-500 to-orange-500"
                },
                {
                  icon: Target,
                  title: "Smart Team Formation",
                  description: "Intelligent clustering ensures balanced teams with complementary skills and shared interests.",
                  gradient: isDarkMode ? "from-blue-500 to-cyan-500" : "from-orange-500 to-rose-500"
                },
                {
                  icon: TrendingUp,
                  title: "Performance Analytics",
                  description: "Track team progress, identify strengths, and optimize performance with detailed insights.",
                  gradient: isDarkMode ? "from-green-500 to-emerald-500" : "from-teal-500 to-emerald-500"
                },
                {
                  icon: Users,
                  title: "Collaborative Workspace",
                  description: "Real-time communication, file sharing, and project management tools for seamless teamwork.",
                  gradient: isDarkMode ? "from-orange-500 to-red-500" : "from-rose-500 to-pink-500"
                },
                {
                  icon: Shield,
                  title: "Secure & Private",
                  description: "Enterprise-grade security ensures your data and communications remain confidential.",
                  gradient: isDarkMode ? "from-indigo-500 to-purple-500" : "from-indigo-500 to-purple-500"
                },
                {
                  icon: Rocket,
                  title: "Event Management",
                  description: "Streamlined registration, team coordination, and event tracking for organizers.",
                  gradient: isDarkMode ? "from-pink-500 to-rose-500" : "from-fuchsia-500 to-purple-500"
                }
              ].map((feature, index) => (
                <div 
                  key={index}
                  className={`group p-6 sm:p-8 border rounded-xl sm:rounded-2xl backdrop-blur-sm transition-all duration-300 transform hover:scale-105 hover:shadow-xl relative overflow-hidden ${
                    isDarkMode 
                      ? 'bg-gradient-to-br from-gray-800/50 to-gray-900/50 border-gray-700/50 hover:border-purple-500/50 hover:shadow-purple-500/10' 
                      : 'bg-gradient-to-br from-amber-50/90 to-orange-50/90 border-amber-200/60 shadow-xl shadow-amber-200/50 hover:border-orange-500/50 hover:shadow-orange-500/10'
                  }`}
                >
                  {/* Shimmer effect - different for each theme */}
                  <div className={`absolute inset-0 bg-gradient-to-r from-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ${
                    isDarkMode 
                      ? 'via-purple-500/10 to-transparent' 
                      : 'via-amber-500/15 to-transparent'
                  }`}></div>
                  <div className={`w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r ${feature.gradient} rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                  </div>
                  <h3 className={`text-lg sm:text-xl font-semibold mb-3 sm:mb-4 ${
                    isDarkMode ? 'text-white' : 'text-amber-900'
                  }`}>{feature.title}</h3>
                  <p className={`text-sm sm:text-base leading-relaxed ${
                    isDarkMode ? 'text-gray-300' : 'text-amber-800'
                  }`}>{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Interest Clusters Section */}
        <div className="px-4 sm:px-6 py-16 sm:py-20">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className={`text-3xl sm:text-4xl md:text-5xl font-bold bg-clip-text text-transparent mb-4 sm:mb-6 ${
                isDarkMode 
                  ? 'bg-gradient-to-r from-purple-400 to-blue-400' 
                  : 'bg-gradient-to-r from-amber-500 to-orange-500'
              }`}>
                Explore Interest Clusters
              </h2>
              <p className={`text-lg sm:text-xl max-w-3xl mx-auto px-4 sm:px-0 ${
                isDarkMode ? 'text-gray-300' : 'text-amber-800'
              }`}>
                Join specialized communities based on your interests and expertise areas.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 px-4 sm:px-0">
              {[
                { name: "AI/ML", color: isDarkMode ? "from-purple-500 to-pink-500" : "from-amber-500 to-orange-500", icon: Sparkles },
                { name: "Web Development", color: isDarkMode ? "from-blue-500 to-cyan-500" : "from-orange-500 to-rose-500", icon: Globe },
                { name: "App Development", color: isDarkMode ? "from-green-500 to-emerald-500" : "from-teal-500 to-emerald-500", icon: Target },
                { name: "Cybersecurity", color: isDarkMode ? "from-red-500 to-orange-500" : "from-rose-500 to-pink-500", icon: Shield },
                { name: "Electronics", color: isDarkMode ? "from-yellow-500 to-orange-500" : "from-yellow-500 to-amber-500", icon: Zap },
                { name: "Mechanical", color: isDarkMode ? "from-indigo-500 to-purple-500" : "from-indigo-500 to-purple-500", icon: Rocket }
              ].map((cluster, index) => (
                <div 
                  key={index}
                  className={`group p-4 sm:p-6 border rounded-lg sm:rounded-xl backdrop-blur-sm transition-all duration-300 transform hover:scale-105 relative overflow-hidden ${
                    isDarkMode 
                      ? 'bg-gradient-to-br from-gray-800/50 to-gray-900/50 border-gray-700/50 hover:border-purple-500/50' 
                      : 'bg-gradient-to-br from-amber-50/90 to-orange-50/90 border-amber-200/60 shadow-xl shadow-amber-200/50 hover:border-orange-500/50'
                  }`}
                >
                  {/* Shimmer effect - different for each theme */}
                  <div className={`absolute inset-0 bg-gradient-to-r from-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ${
                    isDarkMode 
                      ? 'via-white/5 to-transparent' 
                      : 'via-amber-400/20 to-transparent'
                  }`}></div>
                  
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r ${cluster.color} rounded-lg sm:rounded-xl flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <cluster.icon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                  </div>
                  <h3 className={`text-base sm:text-lg font-semibold transition-colors duration-300 ${
                    isDarkMode 
                      ? 'text-white group-hover:text-purple-300' 
                      : 'text-amber-900 group-hover:text-orange-600'
                  }`}>{cluster.name}</h3>
                  
                  {/* Hover glow effect - different for each theme */}
                  <div className={`absolute inset-0 rounded-lg sm:rounded-xl transition-opacity duration-300 ${
                    isDarkMode 
                      ? `bg-gradient-to-r ${cluster.color} opacity-0 group-hover:opacity-5` 
                      : 'bg-gradient-to-r from-amber-400/10 to-orange-400/10 opacity-0 group-hover:opacity-20'
                  }`}></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="px-6 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <div className={`p-12 border rounded-3xl backdrop-blur-sm ${
              isDarkMode 
                ? 'bg-gradient-to-r from-purple-500/10 to-blue-500/10 border-purple-400/30' 
                : 'bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200/60 shadow-xl shadow-amber-200/50'
            }`}>
              <h2 className={`text-4xl md:text-5xl font-bold bg-clip-text text-transparent mb-6 ${
                isDarkMode 
                  ? 'bg-gradient-to-r from-purple-400 to-blue-400' 
                  : 'bg-gradient-to-r from-amber-500 to-orange-500'
              }`}>
                Ready to Build Your Dream Team?
              </h2>
              <p className={`text-xl mb-8 max-w-2xl mx-auto ${
                isDarkMode ? 'text-gray-300' : 'text-amber-800'
              }`}>
                Join thousands of students who are already using Matrix to form winning teams 
                and dominate college events.
              </p>
              {isAuthenticated ? (
                <div className="text-center">
                  <p className={`text-lg ${
                    isDarkMode ? 'text-purple-300' : 'text-amber-600'
                  }`}>Welcome back! Use the navigation above to access your dashboard.</p>
                </div>
              ) : (
                <Link 
                  to="/register" 
                  className={`inline-flex items-center space-x-2 px-8 py-4 font-semibold rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl ${
                    isDarkMode 
                      ? 'bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 hover:shadow-purple-500/25' 
                      : 'border-2 border-orange-500/50 text-orange-600 hover:bg-orange-50 hover:shadow-orange-500/25'
                  }`}
                >
                  <span>Get Started Now</span>
                  <ArrowRight className="h-5 w-5" />
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className={`px-6 py-12 border-t ${
          isDarkMode ? 'border-gray-800/50' : 'border-amber-200/60'
        }`}>
          <div className="max-w-7xl mx-auto text-center">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <div className={`p-2 rounded-lg ${
                isDarkMode 
                  ? 'bg-gradient-to-r from-purple-500 to-blue-500' 
                  : 'bg-gradient-to-r from-amber-500 to-orange-500'
              }`}>
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <span className={`text-xl font-bold bg-clip-text text-transparent ${
                isDarkMode 
                  ? 'bg-gradient-to-r from-purple-400 to-blue-400' 
                  : 'bg-gradient-to-r from-amber-500 to-orange-500'
              }`}>
                MATHRIX
              </span>
            </div>
            <p className={`${
              isDarkMode ? 'text-gray-400' : 'text-amber-700'
            }`}>
              © 2024 MATHRIX. Revolutionizing team formation with AI.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;