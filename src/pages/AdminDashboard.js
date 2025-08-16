import React, { useState, useEffect } from 'react';
import { Shield, Users, Users2, TrendingUp, BarChart3, Settings } from 'lucide-react';
import axios from 'axios';

const AdminDashboard = () => {
  const [systemOverview, setSystemOverview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    fetchSystemOverview();
  }, []);

  const fetchSystemOverview = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:8000/api/admin/system-overview');
      setSystemOverview(response.data);
    } catch (err) {
      setError('Failed to load system overview');
      console.error('Error fetching system overview:', err);
    } finally {
      setLoading(false);
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
      1: 'bg-purple-500',
      2: 'bg-blue-500',
      3: 'bg-green-500',
      4: 'bg-red-500',
      5: 'bg-orange-500'
    };
    return colors[clusterId] || 'bg-gray-500';
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 dark:border-primary-400"></div>
      </div>
    );
  }

  if (error || !systemOverview) {
    return (
      <div className="text-center py-20">
        <div className="text-red-600 dark:text-red-400 text-xl mb-4">{error || 'Failed to load system data'}</div>
        <button onClick={fetchSystemOverview} className="btn-primary">
          Retry
        </button>
      </div>
    );
  }

  const tabs = [
    { id: 'overview', name: 'System Overview', icon: BarChart3 },
    { id: 'participants', name: 'Participants', icon: Users },
    { id: 'teams', name: 'Teams', icon: Users2 },
    { id: 'analytics', name: 'Analytics', icon: TrendingUp },
    { id: 'settings', name: 'Settings', icon: Settings }
  ];

  return (
    <div className="max-w-7xl mx-auto pt-24 sm:pt-20">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-4 mb-4">
          <div className="p-3 bg-primary-100 dark:bg-primary-900/30 rounded-lg">
            <Shield className="h-8 w-8 text-primary-600 dark:text-primary-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-secondary-900 dark:text-white">Admin Dashboard</h1>
            <p className="text-secondary-600 dark:text-gray-300">System overview and administrative functions</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-secondary-200 dark:border-gray-600 mb-8">
        <nav className="flex space-x-8">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-primary-500 dark:border-primary-400 text-primary-600 dark:text-primary-400'
                    : 'border-transparent text-secondary-500 dark:text-gray-400 hover:text-secondary-700 dark:hover:text-gray-200 hover:border-secondary-300 dark:hover:border-gray-500'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{tab.name}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="space-y-8">
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md dark:shadow-gray-900/20 p-6">
              <div className="flex items-center">
                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                  <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-secondary-600 dark:text-gray-400">Total Participants</p>
                  <p className="text-2xl font-bold text-secondary-900 dark:text-white">
                    {systemOverview.participants.total}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md dark:shadow-gray-900/20 p-6">
              <div className="flex items-center">
                <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
                  <Users2 className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-secondary-600 dark:text-gray-400">Total Teams</p>
                  <p className="text-2xl font-bold text-secondary-900 dark:text-white">
                    {systemOverview.teams.total}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md dark:shadow-gray-900/20 p-6">
              <div className="flex items-center">
                <div className="p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
                  <Users className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-secondary-600 dark:text-gray-400">Unassigned</p>
                  <p className="text-2xl font-bold text-secondary-900 dark:text-white">
                    {systemOverview.participants.unassigned}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md dark:shadow-gray-900/20 p-6">
              <div className="flex items-center">
                <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-secondary-600 dark:text-gray-400">Assigned</p>
                  <p className="text-2xl font-bold text-secondary-900 dark:text-white">
                    {systemOverview.participants.assigned}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Cluster Distribution */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md dark:shadow-gray-900/20 p-6">
            <h2 className="text-xl font-semibold text-secondary-900 dark:text-white mb-6">Interest Cluster Distribution</h2>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {Object.entries(systemOverview.participants.cluster_distribution).map(([cluster, count]) => (
                <div key={cluster} className="text-center">
                  <div className={`w-16 h-16 ${getClusterColor(parseInt(cluster))} rounded-full flex items-center justify-center mx-auto mb-3`}>
                    <span className="text-white font-bold text-lg">{cluster}</span>
                  </div>
                  <div className="text-2xl font-bold text-secondary-900 dark:text-white mb-1">{count}</div>
                  <div className="text-sm text-secondary-600 dark:text-gray-300">{getClusterName(parseInt(cluster))}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Team Statistics */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md dark:shadow-gray-900/20 p-6">
            <h2 className="text-xl font-semibold text-secondary-900 dark:text-white mb-6">Team Statistics</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-secondary-50 dark:bg-gray-700 rounded-lg">
                <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                  {systemOverview.teams.statistics.full_teams}
                </div>
                <div className="text-secondary-600 dark:text-gray-300">Full Teams (4 members)</div>
              </div>
              <div className="text-center p-4 bg-secondary-50 dark:bg-gray-700 rounded-lg">
                <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                  {systemOverview.teams.statistics.teams_with_members}
                </div>
                <div className="text-secondary-600 dark:text-gray-300">Teams with Members</div>
              </div>
              <div className="text-center p-4 bg-secondary-50 dark:bg-gray-700 rounded-lg">
                <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                  {systemOverview.teams.statistics.empty_teams}
                </div>
                <div className="text-secondary-600 dark:text-gray-300">Empty Teams</div>
              </div>
            </div>
          </div>

          {/* Auto Assignment */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md dark:shadow-gray-900/20 p-6">
            <h2 className="text-xl font-semibold text-secondary-900 dark:text-white mb-6">Auto Assignment Analysis</h2>
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
              <h3 className="font-medium text-blue-900 dark:text-blue-200 mb-2">Recommendation</h3>
              <p className="text-blue-800 dark:text-blue-300">{systemOverview.auto_assignment.recommendation}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div className="text-center p-3 bg-secondary-50 dark:bg-gray-700 rounded-lg">
                <div className="text-lg font-semibold text-secondary-900 dark:text-white">
                  {systemOverview.auto_assignment.total_participants}
                </div>
                <div className="text-sm text-secondary-600 dark:text-gray-300">Unassigned</div>
              </div>
              <div className="text-center p-3 bg-secondary-50 dark:bg-gray-700 rounded-lg">
                <div className="text-lg font-semibold text-secondary-900 dark:text-white">
                  {systemOverview.auto_assignment.optimal_teams}
                </div>
                <div className="text-sm text-secondary-600 dark:text-gray-300">Optimal Teams</div>
              </div>
              <div className="text-center p-3 bg-secondary-50 dark:bg-gray-700 rounded-lg">
                <div className="text-lg font-semibold text-secondary-900 dark:text-white">
                  {systemOverview.auto_assignment.remaining_participants}
                </div>
                <div className="text-sm text-secondary-600 dark:text-gray-300">Remaining</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'participants' && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md dark:shadow-gray-900/20 p-6">
          <h2 className="text-xl font-semibold text-secondary-900 dark:text-white mb-4">Participants Management</h2>
          <p className="text-secondary-600 dark:text-gray-300">Participant management features coming soon...</p>
        </div>
      )}

      {activeTab === 'teams' && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md dark:shadow-gray-900/20 p-6">
          <h2 className="text-xl font-semibold text-secondary-900 dark:text-white mb-4">Team Management</h2>
          <p className="text-secondary-600 dark:text-gray-300">Team management features coming soon...</p>
        </div>
      )}

      {activeTab === 'analytics' && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md dark:shadow-gray-900/20 p-6">
          <h2 className="text-xl font-semibold text-secondary-900 dark:text-white mb-4">Analytics & Reports</h2>
          <p className="text-secondary-600 dark:text-gray-300">Analytics and reporting features coming soon...</p>
        </div>
      )}

      {activeTab === 'settings' && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md dark:shadow-gray-900/20 p-6">
          <h2 className="text-xl font-semibold text-secondary-900 dark:text-white mb-4">System Settings</h2>
          <p className="text-secondary-600 dark:text-gray-300">System configuration features coming soon...</p>
        </div>
      )}

      {/* Quick Actions */}
      <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow-md dark:shadow-gray-900/20 p-6">
        <h2 className="text-xl font-semibold text-secondary-900 dark:text-white mb-6">Quick Actions</h2>
        <div className="flex flex-wrap gap-4">
          <button className="btn-primary">
            Generate Auto Assignment
          </button>
          <button className="btn-secondary">
            Export Participant Data
          </button>
          <button className="btn-outline">
            System Backup
          </button>
          <button className="btn-outline">
            View Logs
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
