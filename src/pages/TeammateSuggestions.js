import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Users, Target, Star, UserPlus, ArrowLeft } from 'lucide-react';
import axios from 'axios';

const TeammateSuggestions = () => {
  const { participantId } = useParams();
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [participant, setParticipant] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      await fetchSuggestions();
      await fetchParticipantInfo();
    };
    loadData();
  }, [participantId]);

  const fetchSuggestions = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:8000/api/participants/${participantId}/suggestions`);
      setSuggestions(response.data.suggestions);
    } catch (err) {
      setError('Failed to load teammate suggestions');
      console.error('Error fetching suggestions:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchParticipantInfo = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/participants/${participantId}`);
      setParticipant(response.data);
    } catch (err) {
      console.error('Error fetching participant info:', err);
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
      1: 'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200',
      2: 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200',
      3: 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200',
      4: 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200',
      5: 'bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-200'
    };
    return colors[clusterId] || 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200';
  };

  const getMatchScoreColor = (score) => {
    if (score >= 15) return 'text-green-600';
    if (score >= 10) return 'text-blue-600';
    if (score >= 5) return 'text-yellow-600';
    return 'text-red-600';
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 dark:border-primary-400"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20">
        <div className="text-red-600 dark:text-red-400 text-xl mb-4">{error}</div>
        <Link to="/" className="btn-primary">
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto pt-24 sm:pt-20">
      {/* Header */}
      <div className="mb-8">
        <Link to="/" className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Link>
        
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <Users className="h-12 w-12 text-primary-600 dark:text-primary-400" />
          </div>
          <h1 className="text-3xl font-bold text-secondary-900 dark:text-white mb-2">
            Teammate Suggestions
          </h1>
          <p className="text-secondary-600 dark:text-gray-300">
            Intelligent recommendations based on skill diversity and interests
          </p>
        </div>
      </div>

      {/* Participant Info */}
      {participant && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md dark:shadow-gray-900/20 p-6 mb-8">
          <h2 className="text-xl font-semibold text-secondary-900 dark:text-white mb-4">Your Profile</h2>
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center">
              <span className="text-2xl font-semibold text-primary-600 dark:text-primary-400">
                {participant.name.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-secondary-900 dark:text-white">{participant.name}</h3>
              <div className="text-secondary-600 dark:text-gray-300">
                {participant.department} • Year {participant.year}
              </div>
              <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium mt-2 ${getClusterColor(participant.interest_cluster)}`}>
                {getClusterName(participant.interest_cluster)}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Suggestions */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md dark:shadow-gray-900/20 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-secondary-900 dark:text-white">
            Recommended Teammates
          </h2>
          <div className="text-secondary-600 dark:text-gray-300">
            {suggestions.length} suggestions found
          </div>
        </div>

        {suggestions.length === 0 ? (
          <div className="text-center py-12 text-secondary-600 dark:text-gray-400">
            <Target className="h-16 w-16 mx-auto mb-4 text-secondary-300 dark:text-gray-500" />
            <p className="text-lg">No suggestions available</p>
            <p className="text-sm">All potential teammates might already be assigned to teams</p>
          </div>
        ) : (
          <div className="space-y-4">
            {suggestions.map((suggestion, index) => (
              <div
                key={suggestion.participant.participant_id}
                className="border border-secondary-200 dark:border-gray-600 rounded-lg p-6 hover:shadow-md dark:hover:shadow-gray-900/20 transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center">
                      <span className="text-xl font-semibold text-primary-600 dark:text-primary-400">
                        {suggestion.participant.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold text-secondary-900 dark:text-white">
                          {suggestion.participant.name}
                        </h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getClusterColor(suggestion.participant.interest_cluster)} dark:text-gray-300`}>
                          {getClusterName(suggestion.participant.interest_cluster)}
                        </span>
                      </div>
                      
                      <div className="text-secondary-600 dark:text-gray-300 mb-3">
                        {suggestion.participant.department} • Year {suggestion.participant.year}
                      </div>
                      
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          <Star className="h-4 w-4 text-yellow-500" />
                          <span className={`text-sm font-medium ${getMatchScoreColor(suggestion.match_score)}`}>
                            Match Score: {suggestion.match_score.toFixed(1)}
                          </span>
                        </div>
                      </div>
                      
                      <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                        <p className="text-sm text-blue-800 dark:text-blue-200">
                          <strong>Why this match?</strong> {suggestion.reason}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col space-y-2">
                    <button className="btn-primary flex items-center space-x-2 px-4 py-2">
                      <UserPlus className="h-4 w-4" />
                      <span>Invite</span>
                    </button>
                    <button className="btn-outline text-sm px-3 py-1">
                      View Profile
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* How It Works */}
      <div className="mt-8 bg-gradient-to-r from-primary-50 to-blue-50 dark:from-primary-900/20 dark:to-blue-900/20 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-secondary-900 dark:text-white mb-4">
          How Our Suggestion Algorithm Works
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-secondary-900 dark:text-white mb-2">Diversity First</h4>
            <p className="text-sm text-secondary-600 dark:text-gray-300">
              We prioritize participants from different interest clusters to ensure balanced teams with varied skills.
            </p>
          </div>
          <div>
            <h4 className="font-medium text-secondary-900 dark:text-white mb-2">Smart Scoring</h4>
            <p className="text-sm text-secondary-600 dark:text-gray-300">
              Each suggestion gets a match score based on cluster diversity, department differences, and year variations.
            </p>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-8 text-center">
        <p className="text-secondary-600 dark:text-gray-300 mb-4">
          Ready to form your team? Start inviting these suggested teammates!
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/" className="btn-secondary">
            Back to Home
          </Link>
          <button className="btn-primary">
            Create New Team
          </button>
        </div>
      </div>
    </div>
  );
};

export default TeammateSuggestions;
