import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Users, Search, Filter, Send, UserPlus, Lock, Unlock, Settings, MessageCircle } from 'lucide-react';
import axios from 'axios';

const TeammateDiscovery = () => {
  const { participantId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('discover');
  const [discoveryData, setDiscoveryData] = useState(null);
  const [requests, setRequests] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    interest_cluster: '',
    department: '',
    year: '',
    max_team_size: '4'
  });
  const [selectedParticipant, setSelectedParticipant] = useState(null);
  const [requestMessage, setRequestMessage] = useState('');
  const [sendingRequest, setSendingRequest] = useState(false);

  useEffect(() => {
    loadDiscoveryData();
    loadRequests();
  }, [participantId, filters]);

  const loadDiscoveryData = async () => {
    try {
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value) params.append(key, value);
      });
      
      const response = await axios.get(`http://localhost:8000/api/team-formation/discover/${participantId}?${params}`);
      setDiscoveryData(response.data);
    } catch (err) {
      console.error('Error loading discovery data:', err);
    } finally {
      setLoading(false);
    }
  };

  const loadRequests = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/team-formation/requests/${participantId}`);
      setRequests(response.data);
    } catch (err) {
      console.error('Error loading requests:', err);
    }
  };

  const sendTeamRequest = async (toParticipantId, teamId = null) => {
    // Message is optional now
    const message = requestMessage.trim() || null;

    setSendingRequest(true);
    try {
      await axios.post(`http://localhost:8000/api/team-formation/send-request/${participantId}`, {
        to_participant_id: toParticipantId,
        team_id: teamId,
        message: message
      });
      
      setRequestMessage('');
      setSelectedParticipant(null);
      loadRequests(); // Refresh requests
      alert('Team request sent successfully!');
    } catch (err) {
      alert(err.response?.data?.detail || 'Failed to send request');
    } finally {
      setSendingRequest(false);
    }
  };

  const respondToRequest = async (requestId, status) => {
    try {
      await axios.post(`http://localhost:8000/api/team-formation/respond-request/${requestId}/${participantId}`, {
        status: status
      });
      
      loadRequests(); // Refresh requests
      if (status === 'accepted') {
        alert('Request accepted! You are now teammates!');
      } else {
        alert('Request declined');
      }
    } catch (err) {
      alert(err.response?.data?.detail || 'Failed to respond to request');
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
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 dark:border-primary-400"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto pt-24 sm:pt-20">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-primary-100 dark:bg-primary-900/30 rounded-lg">
              <Users className="h-8 w-8 text-primary-600 dark:text-primary-400" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-secondary-900 dark:text-white">Find Your Likemate</h1>
              <p className="text-secondary-600 dark:text-gray-300">Discover teammates and build amazing teams together!</p>
            </div>
          </div>
          <Link to="/dashboard" className="btn-outline">
            Back to Dashboard
          </Link>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="mb-6">
        <div className="border-b border-secondary-200 dark:border-gray-600">
          <nav className="-mb-px flex space-x-8">
            {[
              { id: 'discover', name: 'Find Teammate for New Team', icon: Search },
              { id: 'join', name: 'Join Teams', icon: UserPlus },
              { id: 'requests', name: 'Team Requests', icon: MessageCircle }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
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
      </div>

      {/* Filters */}
      {activeTab === 'discover' && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md dark:shadow-gray-900/20 p-6 mb-6">
          <div className="flex items-center space-x-2 mb-4">
            <Filter className="h-5 w-5 text-secondary-600 dark:text-gray-400" />
            <h3 className="text-lg font-medium text-secondary-900 dark:text-white">Discovery Filters</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <select
              value={filters.interest_cluster}
              onChange={(e) => setFilters({...filters, interest_cluster: e.target.value})}
              className="input-field"
            >
              <option value="">All Interest Areas</option>
              <option value="1">AI/ML</option>
              <option value="2">Web Development</option>
              <option value="3">App Development</option>
              <option value="4">Cybersecurity</option>
              <option value="5">Electronics</option>
            </select>
            <select
              value={filters.department}
              onChange={(e) => setFilters({...filters, department: e.target.value})}
              className="input-field"
            >
              <option value="">All Departments</option>
              <option value="Computer Science">Computer Science</option>
              <option value="Information Technology">Information Technology</option>
              <option value="Electronics">Electronics</option>
              <option value="Mechanical">Mechanical</option>
            </select>
            <select
              value={filters.year}
              onChange={(e) => setFilters({...filters, year: e.target.value})}
              className="input-field"
            >
              <option value="">All Years</option>
              <option value="1">Year 1</option>
              <option value="2">Year 2</option>
              <option value="3">Year 3</option>
              <option value="4">Year 4</option>
            </select>
            <select
              value={filters.max_team_size}
              onChange={(e) => setFilters({...filters, max_team_size: e.target.value})}
              className="input-field"
            >
              <option value="2">Max 2 members</option>
              <option value="3">Max 3 members</option>
              <option value="4">Max 4 members</option>
            </select>
          </div>
        </div>
      )}

      {/* Tab Content */}
      <div className="min-h-96">
        {/* Discover Tab */}
        {activeTab === 'discover' && discoveryData && (
          <div className="space-y-6">
            {/* Potential Teammates */}
            <div>
              <h2 className="text-2xl font-bold text-secondary-900 dark:text-white mb-4">
                Potential Teammates ({discoveryData.potential_teammates.length})
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {discoveryData.potential_teammates.map((suggestion) => (
                  <div key={suggestion.participant.participant_id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md dark:shadow-gray-900/20 p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center">
                          <span className="text-lg font-semibold text-primary-600 dark:text-primary-400">
                            {suggestion.participant.name.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <h3 className="font-semibold text-secondary-900 dark:text-white">{suggestion.participant.name}</h3>
                          <p className="text-sm text-secondary-600 dark:text-gray-300">{suggestion.participant.department}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">{suggestion.compatibility_score}</div>
                        <div className="text-xs text-secondary-500 dark:text-gray-400">Score</div>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getClusterColor(suggestion.participant.interest_cluster)}`}>
                        {getClusterName(suggestion.participant.interest_cluster)}
                      </span>
                      <span className="ml-2 text-sm text-secondary-600 dark:text-gray-300">Year {suggestion.participant.year}</span>
                    </div>
                    
                    <div className="mb-4">
                      <h4 className="font-medium text-secondary-900 dark:text-white mb-2">Why they're a great match:</h4>
                      <ul className="text-sm text-secondary-600 dark:text-gray-300 space-y-1">
                        {suggestion.reasons.map((reason, index) => (
                          <li key={index} className="flex items-center space-x-2">
                            <div className="w-1.5 h-1.5 bg-primary-400 rounded-full"></div>
                            <span>{reason}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <button
                      onClick={() => setSelectedParticipant(suggestion.participant)}
                      className="w-full btn-primary"
                    >
                      <Send className="h-4 w-4 mr-2" />
                      Send Team Request
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Available Teams */}
            <div>
              <h2 className="text-2xl font-bold text-secondary-900 dark:text-white mb-4">
                Available Teams ({discoveryData.available_teams.length})
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {discoveryData.available_teams.map((discovery) => (
                  <div key={discovery.team.team_id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md dark:shadow-gray-900/20 p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-semibold text-secondary-900 dark:text-white">{discovery.team.team_name}</h3>
                      <div className="text-right">
                        <div className="text-lg font-bold text-primary-600 dark:text-primary-400">{discovery.compatibility_score}</div>
                        <div className="text-xs text-secondary-500 dark:text-gray-400">Score</div>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <p className="text-secondary-600 dark:text-gray-300 mb-2">{discovery.team.description || 'No description available'}</p>
                      <div className="flex items-center space-x-2 text-sm text-secondary-500 dark:text-gray-400">
                        <span>{discovery.team.member_count} members</span>
                        <span>•</span>
                        <span>{discovery.open_slots} open slots</span>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <h4 className="font-medium text-secondary-900 dark:text-white mb-2">Why this team is great:</h4>
                      <ul className="text-sm text-secondary-600 dark:text-gray-300 space-y-1">
                        {discovery.reasons.map((reason, index) => (
                          <li key={index} className="flex items-center space-x-2">
                            <div className="w-1.5 h-1.5 bg-primary-400 rounded-full"></div>
                            <span>{reason}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <button
                      onClick={() => setSelectedParticipant({...discovery.team, isTeam: true})}
                      className="w-full btn-outline"
                    >
                      <UserPlus className="h-4 w-4 mr-2" />
                      Request to Join Team
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Join Teams Tab */}
        {activeTab === 'join' && (
          <div className="text-center py-20">
            <Users className="h-16 w-16 text-secondary-400 dark:text-gray-500 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-secondary-900 dark:text-white mb-2">Join Teams</h3>
            <p className="text-secondary-600 dark:text-gray-300 mb-6">
              Teams you're part of will appear here. You can manage team settings and accept new members.
            </p>
            <Link to="/dashboard" className="btn-primary">
              Go to Dashboard
            </Link>
          </div>
        )}

        {/* Requests Tab */}
        {activeTab === 'requests' && requests && (
          <div className="space-y-6">
            {/* Incoming Requests */}
            <div>
              <h2 className="text-2xl font-bold text-secondary-900 dark:text-white mb-4">
                Incoming Requests ({requests.incoming_requests.length})
              </h2>
              {requests.incoming_requests.length === 0 ? (
                <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow-md dark:shadow-gray-900/20">
                  <MessageCircle className="h-12 w-12 text-secondary-400 dark:text-gray-500 mx-auto mb-4" />
                  <p className="text-secondary-600 dark:text-gray-300">No incoming requests yet</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {requests.incoming_requests.map((request) => (
                    <div key={request.request_id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md dark:shadow-gray-900/20 p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center">
                            <span className="text-lg font-semibold text-primary-600 dark:text-primary-400">
                              {request.from_participant.name.charAt(0)}
                            </span>
                          </div>
                          <div>
                            <h3 className="font-semibold text-secondary-900 dark:text-white">{request.from_participant.name}</h3>
                            <p className="text-sm text-secondary-600 dark:text-gray-300">{request.from_participant.department}</p>
                          </div>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          request.status === 'pending' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200' :
                          request.status === 'accepted' ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200' :
                          'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200'
                        }`}>
                          {request.status}
                        </span>
                      </div>
                      
                      {request.message && (
                        <div className="mb-4 p-3 bg-secondary-50 dark:bg-gray-700 rounded-lg">
                          <p className="text-secondary-700 dark:text-gray-200">{request.message}</p>
                        </div>
                      )}
                      
                      {request.status === 'pending' && (
                        <div className="flex space-x-3">
                          <button
                            onClick={() => respondToRequest(request.request_id, 'accepted')}
                            className="btn-primary flex-1"
                          >
                            Accept Request
                          </button>
                          <button
                            onClick={() => respondToRequest(request.request_id, 'declined')}
                            className="btn-outline flex-1"
                          >
                            Decline Request
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Outgoing Requests */}
            <div>
              <h2 className="text-2xl font-bold text-secondary-900 dark:text-white mb-4">
                Outgoing Requests ({requests.outgoing_requests.length})
              </h2>
              {requests.outgoing_requests.length === 0 ? (
                <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow-md dark:shadow-gray-900/20">
                  <Send className="h-12 w-12 text-secondary-400 dark:text-gray-500 mx-auto mb-4" />
                  <p className="text-secondary-600 dark:text-gray-300">No outgoing requests yet</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {requests.outgoing_requests.map((request) => (
                    <div key={request.request_id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md dark:shadow-gray-900/20 p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center">
                              <span className="text-lg font-semibold text-primary-600 dark:text-primary-400">
                              {request.to_participant.name.charAt(0)}
                            </span>
                          </div>
                          <div>
                            <h3 className="font-semibold text-secondary-900 dark:text-white">{request.to_participant.name}</h3>
                            <p className="text-sm text-secondary-600 dark:text-gray-300">{request.to_participant.department}</p>
                          </div>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          request.status === 'pending' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200' :
                          request.status === 'accepted' ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200' :
                          'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200'
                        }`}>
                          {request.status}
                        </span>
                      </div>
                      
                      {request.message && (
                        <div className="mb-4 p-3 bg-secondary-50 dark:bg-gray-700 rounded-lg">
                          <p className="text-secondary-700 dark:text-gray-200">{request.message}</p>
                        </div>
                      )}
                      
                      {request.status === 'pending' && (
                        <button
                          onClick={() => {/* Cancel request logic */}}
                          className="btn-outline w-full"
                        >
                          Cancel Request
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Team Request Modal */}
      {selectedParticipant && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-secondary-900 dark:text-white mb-4">
              Send Team Request to {selectedParticipant.isTeam ? selectedParticipant.team_name : selectedParticipant.name}
            </h3>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-secondary-700 dark:text-gray-300 mb-2">
                Message (optional)
              </label>
              <textarea
                value={requestMessage}
                onChange={(e) => setRequestMessage(e.target.value)}
                placeholder="Tell them why you'd like to team up..."
                className="input-field h-24 resize-none"
                maxLength={200}
              />
              <div className="text-right text-sm text-secondary-500 dark:text-gray-400 mt-1">
                {requestMessage.length}/200
              </div>
            </div>
            
            <div className="flex space-x-3">
              <button
                onClick={() => setSelectedParticipant(null)}
                className="btn-outline flex-1"
              >
                Cancel
              </button>
              <button
                onClick={() => sendTeamRequest(
                  selectedParticipant.isTeam ? selectedParticipant.team_id : selectedParticipant.participant_id,
                  selectedParticipant.isTeam ? selectedParticipant.team_id : null
                )}
                disabled={sendingRequest}
                className="btn-primary flex-1"
              >
                {sendingRequest ? 'Sending...' : 'Send Request'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeammateDiscovery;
