import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Registration from './pages/Registration';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import TeamDashboard from './pages/TeamDashboard';
import TeammateSuggestions from './pages/TeammateSuggestions';
import TeammateDiscovery from './pages/TeammateDiscovery';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-secondary-50 dark:bg-gray-900 transition-colors duration-200">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/team/:teamId" element={<TeamDashboard />} />
          <Route path="/suggestions/:participantId" element={<TeammateSuggestions />} />
          <Route path="/discovery/:participantId" element={<TeammateDiscovery />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;

