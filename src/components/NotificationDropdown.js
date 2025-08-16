import React, { useState, useEffect } from 'react';
import { Bell, Check, X, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const NotificationDropdown = ({ participantId, unreadCount, onRequestUpdate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [respondingTo, setRespondingTo] = useState(null);

  useEffect(() => {
    if (isOpen && participantId) {
      loadNotifications();
    }
  }, [isOpen, participantId]);

  const loadNotifications = async () => {
    if (!participantId) return;
    
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:8000/api/team-formation/notifications/${participantId}`);
      console.log('Notifications API response:', response.data);
      console.log('Notifications array:', response.data.notifications);
      console.log('Notifications length:', response.data.notifications ? response.data.notifications.length : 0);
      setNotifications(response.data.notifications || []);
    } catch (err) {
      console.error('Error loading notifications:', err);
      setNotifications([]);
    } finally {
      setLoading(false);
    }
  };

  const handleAcceptRequest = async (requestId) => {
    if (!participantId) return;
    
    setRespondingTo(requestId);
    try {
      console.log('Accepting request:', requestId);
      
      // Call the API to accept the request
      const response = await axios.post(`http://localhost:8000/api/team-formation/respond-request/${requestId}/${participantId}`, {
        status: 'accepted'
      });
      
      console.log('Request accepted:', response.data);
      
      // Update the notification status locally
      setNotifications(prev => prev.map(notif => 
        notif.request_id === requestId 
          ? { ...notif, status: 'accepted' }
          : notif
      ));
      
      // Update the unread count
      onRequestUpdate();
      
      // Update participant data in localStorage if team was created
      if (response.data.team) {
        // Update the participant's team_id in localStorage
        const currentParticipant = JSON.parse(localStorage.getItem('participant') || '{}');
        const updatedParticipant = { ...currentParticipant, team_id: response.data.team.team_id };
        localStorage.setItem('participant', JSON.stringify(updatedParticipant));
        
        alert(`Team request accepted successfully! You are now part of team: ${response.data.team.team_name}`);
        
        // Reload the page to show updated team status
        window.location.reload();
      } else {
        alert('Team request accepted successfully!');
      }
      
    } catch (err) {
      console.error('Error accepting request:', err);
      alert('Failed to accept request. Please try again.');
    } finally {
      setRespondingTo(null);
    }
  };

  const handleDeclineRequest = async (requestId) => {
    if (!participantId) return;
    
    setRespondingTo(requestId);
    try {
      console.log('Declining request:', requestId);
      
      // Call the API to decline the request
      const response = await axios.post(`http://localhost:8000/api/team-formation/respond-request/${requestId}/${participantId}`, {
        status: 'declined'
      });
      
      console.log('Request declined:', response.data);
      
      // Update the notification status locally
      setNotifications(prev => prev.map(notif => 
        notif.request_id === requestId 
          ? { ...notif, status: 'declined' }
          : notif
      ));
      
      // Update the unread count
      onRequestUpdate();
      
      // Show success message
      alert(response.data.message || 'Team request declined.');
      
    } catch (err) {
      console.error('Error declining request:', err);
      alert('Failed to decline request. Please try again.');
    } finally {
      setRespondingTo(null);
    }
  };

  const handleNotificationClick = async (requestId) => {
    try {
      console.log('=== NOTIFICATION CLICK START ===');
      console.log('Notification clicked:', requestId);
      console.log('Current notifications:', notifications);
      
      // Find the notification that was clicked
      const notification = notifications.find(n => n.request_id === requestId);
      if (notification) {
        console.log('Notification details:', notification);
        
        // Show more details about the team request
        if (notification.status === 'pending') {
          // For pending requests, we could show a modal or expand the notification
          console.log('Pending team request from:', notification.from_participant?.name);
        } else if (notification.status === 'accepted') {
          console.log('Request was accepted');
        } else if (notification.status === 'declined') {
          console.log('Request was declined');
        }
      }
      
      console.log('About to call onRequestUpdate...');
      // Update the unread count
      onRequestUpdate();
      console.log('onRequestUpdate called successfully');
      
      // Don't close the dropdown immediately, let user see the details
      // loadNotifications();
      console.log('=== NOTIFICATION CLICK END ===');
    } catch (err) {
      console.error('Error handling notification click:', err);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-secondary-600 hover:text-secondary-900 transition-colors"
      >
        <Bell className="h-6 w-6" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-96 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-secondary-200 dark:border-gray-600 z-50">
          <div className="p-4 border-b border-secondary-200 dark:border-gray-600">
            <h3 className="text-lg font-semibold text-secondary-900 dark:text-white">Notifications</h3>
          </div>
          
          <div className="max-h-96 overflow-y-auto">
            {console.log('Rendering notifications:', notifications)}
            {loading ? (
              <div className="p-4 text-center text-secondary-600">
                Loading notifications...
              </div>
            ) : notifications.length === 0 ? (
              <div className="p-4 text-center text-secondary-600">  
                No notifications (length: {notifications.length})
              </div>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.request_id}
                  className={`p-4 border-b border-secondary-100 dark:border-gray-600 ${
                    notification.status === 'pending' ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                  }`}
                >
                  <div className="space-y-3">
                    {/* Notification Header */}
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0">
                        <div className={`w-2 h-2 rounded-full ${
                          notification.status === 'pending' ? 'bg-blue-500' : 
                          notification.status === 'accepted' ? 'bg-green-500' : 'bg-gray-500'
                        }`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-secondary-900 dark:text-white">
                          {notification.status === 'pending' ? 'New Team Request' : 
                           notification.status === 'accepted' ? 'Request Accepted' : 'Request Declined'}
                        </p>
                        <p className="text-sm text-secondary-600 dark:text-gray-300 mt-1">
                          {notification.message || `From: ${notification.from_participant?.name || 'Unknown'}`}
                        </p>
                        <p className="text-xs text-secondary-500 dark:text-gray-400 mt-2">
                          {new Date(notification.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    {/* Action Buttons for Pending Requests */}
                    {notification.status === 'pending' && (
                      <div className="flex space-x-2 pt-2">
                        <button
                          onClick={() => handleAcceptRequest(notification.request_id)}
                          disabled={respondingTo === notification.request_id}
                          className="flex-1 flex items-center justify-center space-x-2 px-3 py-2 bg-green-500 text-white text-sm rounded-md hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {respondingTo === notification.request_id ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <Check className="h-4 w-4" />
                          )}
                          <span>Accept</span>
                        </button>
                        <button
                          onClick={() => handleDeclineRequest(notification.request_id)}
                          disabled={respondingTo === notification.request_id}
                          className="flex-1 flex items-center justify-center space-x-2 px-3 py-2 bg-red-500 text-white text-sm rounded-md hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {respondingTo === notification.request_id ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <X className="h-4 w-4" />
                          )}
                          <span>Decline</span>
                        </button>
                      </div>
                    )}

                    {/* Status Display for Non-Pending Requests */}
                    {notification.status !== 'pending' && (
                      <div className="pt-2">
                        <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                          notification.status === 'accepted' 
                            ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200' 
                            : 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200'
                        }`}>
                          {notification.status === 'accepted' ? 'Accepted' : 'Declined'}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
          
          <div className="p-4 border-t border-secondary-200 dark:border-gray-600">
            <Link
              to={`/discovery/${participantId}`}
              className="text-sm text-primary-600 hover:text-primary-800 dark:text-primary-400 dark:hover:text-primary-300 font-medium"
              onClick={(e) => {
                e.stopPropagation();
                setIsOpen(false);
              }}
            >
              View All Notifications
            </Link>
          </div>
        </div>
      )}
      
      {/* Click outside to close */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default NotificationDropdown;
