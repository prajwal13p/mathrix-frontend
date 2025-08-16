// API Configuration
const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://mathrix-backend.onrender.com';

export const API_ENDPOINTS = {
  // Auth
  LOGIN: `${API_BASE_URL}/api/auth/login`,
  
  // Participants
  CHECK_EMAIL: (email) => `${API_BASE_URL}/api/participants/check-email/${encodeURIComponent(email)}`,
  CHECK_USN: (usn) => `${API_BASE_URL}/api/participants/check-usn/${encodeURIComponent(usn)}`,
  REGISTER: `${API_BASE_URL}/api/participants/register`,
  
  // Teams
  CREATE_TEAM: `${API_BASE_URL}/api/teams/create-by-email`,
  GET_TEAM: (teamId) => `${API_BASE_URL}/api/teams/${teamId}`,
  
  // Team Formation
  DISCOVER: (participantId) => `${API_BASE_URL}/api/team-formation/discover/${participantId}`,
  REQUESTS: (participantId) => `${API_BASE_URL}/api/team-formation/requests/${participantId}`,
  SEND_REQUEST: (participantId) => `${API_BASE_URL}/api/team-formation/send-request/${participantId}`,
  RESPOND_REQUEST: (requestId, participantId) => `${API_BASE_URL}/api/team-formation/respond-request/${requestId}/${participantId}`,
  NOTIFICATIONS: (participantId) => `${API_BASE_URL}/api/team-formation/notifications/${participantId}`,
  UNREAD_COUNT: (participantId) => `${API_BASE_URL}/api/team-formation/unread-count/${participantId}`,
  
  // Admin
  SYSTEM_OVERVIEW: `${API_BASE_URL}/api/admin/system-overview`,
  
  // Health
  HEALTH: `${API_BASE_URL}/health`
};

export default API_BASE_URL;
