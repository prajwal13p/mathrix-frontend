import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, Users, Plus, Target, ArrowRight, Bell } from 'lucide-react';
import axios from 'axios';
import NotificationDropdown from '../components/NotificationDropdown';

const Dashboard = () => {
  const navigate = useNavigate();
  const [participant, setParticipant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [teamName, setTeamName] = useState('');
  const [creatingTeam, setCreatingTeam] = useState(false);
  const [error, setError] = useState(null);
  const [unreadRequests, setUnreadRequests] = useState(0);

  useEffect(() => {
    // Get participant from localStorage
    const storedParticipant = localStorage.getItem('participant');
    console.log('Stored participant data:', storedParticipant);
    if (storedParticipant) {
      const parsedParticipant = JSON.parse(storedParticipant);
      console.log('Parsed participant:', parsedParticipant);
      setParticipant(parsedParticipant);
      // Load unread request count
      loadUnreadCount(parsedParticipant.participant_id);
    } else {
      // Redirect to login if no participant data
      navigate('/login');
      return;
    }
    setLoading(false);
  }, [navigate]);

  const loadUnreadCount = async (participantId) => {
    try {
      const response = await axios.get(`http://localhost:8000/api/team-formation/unread-count/${participantId}`);
      setUnreadRequests(response.data.unread_count);
    } catch (err) {
      console.error('Error loading unread count:', err);
    }
  };

  const handleCreateTeam = async (e) => {
    e.preventDefault();
    
    if (!teamName.trim()) {
      setError('Please enter a team name');
      return;
    }

    setCreatingTeam(true);
    setError(null);

    try {
      const response = await axios.post('http://localhost:8000/api/teams/create-by-email', {
        team_name: teamName.trim(),
        leader_email: participant.email
      });
      
      // Update participant data with team info
      const updatedParticipant = { ...participant, team_id: response.data.team_id };
      setParticipant(updatedParticipant);
      localStorage.setItem('participant', JSON.stringify(updatedParticipant));
      
      // Redirect to team dashboard
      navigate(`/team/${response.data.team_id}`);
      
    } catch (err) {
      if (err.response?.status === 400) {
        setError(err.response.data.detail);
      } else {
        setError('Failed to create team. Please try again.');
      }
      console.error('Team creation error:', err);
    } finally {
      setCreatingTeam(false);
    }
  };

  const getClusterName = (clusterId) => {
    const clusters = {
      1: 'AI/ML',
      2: 'Web Development',
      3: 'App Development',
      4: 'Cybersecurity',
      5: 'Electronics'
    };
    return clusters[clusterId] || `Cluster ${clusterId}`;
  };

  const getClusterColor = (clusterId) => {
    const colors = {
      1: 'bg-purple-100 text-purple-800',
      2: 'bg-blue-100 text-blue-800',
      3: 'bg-green-100 text-green-800',
      4: 'bg-red-100 text-red-800',
      5: 'bg-orange-100 text-orange-800'
    };
    return colors[clusterId] || 'bg-gray-100 text-gray-800';
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!participant) {
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto pt-24 sm:pt-20">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-primary-100 rounded-lg">
              <User className="h-8 w-8 text-primary-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-secondary-900">Dashboard</h1>
              <p className="text-secondary-600">Welcome back, {participant.name}!</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            {/* Notification Dropdown */}
            {console.log('Dashboard participant ID:', participant?.participant_id)}
            <NotificationDropdown
              participantId={participant?.participant_id}
              unreadCount={unreadRequests}
              onRequestUpdate={() => {
                console.log('=== onRequestUpdate called ===');
                console.log('Loading unread count for participant:', participant?.participant_id);
                loadUnreadCount(participant?.participant_id);
                console.log('=== onRequestUpdate completed ===');
              }}
            />
            
            <button
              onClick={() => {
                localStorage.removeItem('participant');
                navigate('/');
              }}
              className="btn-outline"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Profile Card */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8 dark:shadow-gray-900/20">
        <h2 className="text-xl font-semibold text-secondary-900 dark:text-white mb-4">Your Profile</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-secondary-600 dark:text-gray-400">Name</label>
              <p className="text-secondary-900 dark:text-white">{participant.name}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-secondary-600 dark:text-gray-400">Email</label>
              <p className="text-secondary-900 dark:text-white">{participant.email}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-secondary-600 dark:text-gray-400">Department</label>
              <p className="text-secondary-900 dark:text-white">{participant.department}</p>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-secondary-600 dark:text-gray-400">Year</label>
              <p className="text-secondary-900 dark:text-white">Year {participant.year}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-secondary-600 dark:text-gray-400">Interest Cluster</label>
              <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getClusterColor(participant.interest_cluster)}`}>
                {getClusterName(participant.interest_cluster)}
              </span>
            </div>
            <div>
              <label className="text-sm font-medium text-secondary-600 dark:text-gray-400">Team Status</label>
              <p className="text-secondary-900 dark:text-white">
                {participant.team_id ? 'Already in a team' : 'Not in a team yet'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Team Management */}
      {!participant.team_id ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8 dark:shadow-gray-900/20">
          <h2 className="text-xl font-semibold text-secondary-900 dark:text-white mb-4">Create Your Team</h2>
          <p className="text-secondary-600 dark:text-gray-300 mb-6">
            Ready to form a team? Create one and start inviting teammates!
          </p>
          
          {error && (
            <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-800 dark:text-red-200">
              {error}
            </div>
          )}
          
          <form onSubmit={handleCreateTeam} className="space-y-4">
            <div>
              <label htmlFor="teamName" className="block text-sm font-medium text-secondary-700 dark:text-gray-300 mb-2">
                Team Name *
              </label>
              <input
                type="text"
                id="teamName"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                className="input-field dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
                placeholder="Enter your team name"
                required
              />
            </div>
            
            <button
              type="submit"
              disabled={creatingTeam}
              className="btn-primary flex items-center space-x-2"
            >
              <Plus className="h-4 w-4" />
              <span>{creatingTeam ? 'Creating Team...' : 'Create Team'}</span>
            </button>
          </form>
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8 dark:shadow-gray-900/20">
          <h2 className="text-xl font-semibold text-secondary-900 dark:text-white mb-4">Your Team</h2>
          <p className="text-secondary-600 dark:text-gray-300 mb-4">
            You're already part of a team. Manage it here.
          </p>
          <Link
            to={`/team/${participant.team_id}`}
            className="btn-primary inline-flex items-center space-x-2"
          >
            <Users className="h-4 w-4" />
            <span>Go to Team Dashboard</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      )}

      {/* Quick Actions */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 dark:shadow-gray-900/20">
        <h2 className="text-xl font-semibold text-secondary-900 dark:text-white mb-4">Quick Actions</h2>
        <div className="grid md:grid-cols-2 gap-4">
                     <Link
             to={`/discovery/${participant.participant_id}`}
             className="p-4 border border-secondary-200 dark:border-gray-600 rounded-lg hover:bg-secondary-50 dark:hover:bg-gray-700 transition-colors"
           >
             <div className="flex items-center space-x-3">
               <Target className="h-6 w-6 text-primary-600 dark:text-primary-400" />
               <div>
                 <h3 className="font-medium text-secondary-900 dark:text-white">Find Your Likemate</h3>
                 <p className="text-sm text-secondary-600 dark:text-gray-300">Discover teammates and build amazing teams</p>
               </div>
             </div>
           </Link>
          
          <Link
            to="/admin"
            className="p-4 border border-secondary-200 dark:border-gray-600 rounded-lg hover:bg-secondary-50 dark:hover:bg-gray-700 transition-colors"
          >
            <div className="flex items-center space-x-3">
              <Users className="h-6 w-6 text-primary-600 dark:text-primary-400" />
              <div>
                <h3 className="font-medium text-secondary-900 dark:text-white">System Overview</h3>
                <p className="text-sm text-secondary-600 dark:text-gray-300">View event statistics and admin panel</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
