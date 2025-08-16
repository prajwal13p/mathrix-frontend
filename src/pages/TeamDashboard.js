import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Users, Crown, UserPlus, Settings, Trash2 } from 'lucide-react';
import axios from 'axios';

const TeamDashboard = () => {
  const { teamId } = useParams();
  const [team, setTeam] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTeamData();
  }, [teamId]);

  const fetchTeamData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:8000/api/teams/${teamId}`);
      setTeam(response.data);
    } catch (err) {
      setError('Failed to load team data');
      console.error('Error fetching team:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 dark:border-primary-400"></div>
      </div>
    );
  }

  if (error || !team) {
    return (
      <div className="text-center py-20">
        <div className="text-red-600 dark:text-red-400 text-xl mb-4">{error || 'Team not found'}</div>
        <Link to="/" className="btn-primary">
          Back to Home
        </Link>
      </div>
    );
  }

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

  return (
    <div className="max-w-4xl mx-auto pt-24 sm:pt-20">
      {/* Team Header */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md dark:shadow-gray-900/20 p-6 mb-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-primary-100 dark:bg-primary-900/30 rounded-lg">
              <Users className="h-8 w-8 text-primary-600 dark:text-primary-400" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-secondary-900 dark:text-white">{team.team_name}</h1>
              <p className="text-secondary-600 dark:text-gray-300">Team Dashboard</p>
            </div>
          </div>
          <div className="flex space-x-3">
            <Link
              to={`/suggestions/${team.leader_id}`}
              className="btn-primary flex items-center space-x-2"
            >
              <UserPlus className="h-4 w-4" />
              <span>Find Teammates</span>
            </Link>
            <button className="btn-outline flex items-center space-x-2">
              <Settings className="h-4 w-4" />
              <span>Settings</span>
            </button>
          </div>
        </div>

        {/* Team Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4 bg-secondary-50 dark:bg-gray-700 rounded-lg">
            <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">{team.members.length}</div>
            <div className="text-secondary-600 dark:text-gray-300">Team Members</div>
          </div>
          <div className="text-center p-4 bg-secondary-50 dark:bg-gray-700 rounded-lg">
            <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">4</div>
            <div className="text-secondary-600 dark:text-gray-300">Max Capacity</div>
          </div>
          <div className="text-center p-4 bg-secondary-50 dark:bg-gray-700 rounded-lg">
            <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">
              {team.members.length === 4 ? 'Full' : `${4 - team.members.length} spots left`}
            </div>
            <div className="text-secondary-600 dark:text-gray-300">Status</div>
          </div>
        </div>
      </div>

      {/* Team Members */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md dark:shadow-gray-900/20 p-6">
        <h2 className="text-2xl font-bold text-secondary-900 dark:text-white mb-6">Team Members</h2>
        
        {team.members.length === 0 ? (
          <div className="text-center py-12 text-secondary-600 dark:text-gray-400">
            <Users className="h-16 w-16 mx-auto mb-4 text-secondary-300 dark:text-gray-500" />
            <p className="text-lg">No team members yet</p>
            <p className="text-sm">Start by adding members to your team</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {team.members.map((member) => (
              <div
                key={member.participant_id}
                className="flex items-center justify-between p-4 border border-secondary-200 dark:border-gray-600 rounded-lg hover:bg-secondary-50 dark:hover:bg-gray-700 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center">
                    <span className="text-lg font-semibold text-primary-600 dark:text-primary-400">
                      {member.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="font-semibold text-secondary-900 dark:text-white">{member.name}</h3>
                      {member.participant_id === team.leader_id && (
                        <Crown className="h-4 w-4 text-yellow-500" />
                      )}
                    </div>
                    <div className="text-sm text-secondary-600 dark:text-gray-300">
                      {member.department} • Year {member.year} • {getClusterName(member.interest_cluster)}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  {member.participant_id === team.leader_id ? (
                    <span className="px-3 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200 text-sm font-medium rounded-full">
                      Leader
                    </span>
                  ) : (
                    <div className="flex space-x-2">
                      <button className="btn-outline text-sm px-3 py-1">
                        Make Leader
                      </button>
                      <button className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 p-1">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Team Actions */}
      {team.members.length < 4 && (
        <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-200 mb-3">
            Team Not Full Yet?
          </h3>
          <p className="text-blue-700 dark:text-blue-300 mb-4">
            You have {4 - team.members.length} spot(s) remaining. Use our intelligent teammate suggestions to find the perfect additions to your team.
          </p>
          <Link
            to={`/suggestions/${team.leader_id}`}
            className="btn-primary bg-blue-600 hover:bg-blue-700"
          >
            Get Teammate Suggestions
          </Link>
        </div>
      )}

      {/* Team Code */}
      <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow-md dark:shadow-gray-900/20 p-6">
        <h3 className="text-lg font-semibold text-secondary-900 dark:text-white mb-4">Team Invite Code</h3>
        <div className="flex items-center space-x-4">
          <div className="flex-1 p-3 bg-secondary-100 dark:bg-gray-700 rounded-lg font-mono text-lg text-secondary-900 dark:text-white">
            {team.team_id}
          </div>
          <button className="btn-secondary">
            Copy Code
          </button>
        </div>
        <p className="text-sm text-secondary-600 dark:text-gray-300 mt-2">
          Share this code with others so they can join your team
        </p>
      </div>
    </div>
  );
};

export default TeamDashboard;
