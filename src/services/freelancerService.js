import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

// Get freelancers with search and pagination
export const getFreelancers = async (search = '', page = 1, limit = 10) => {
  try {
    const response = await axios.get(`${API_URL}/employer/GetFreelancers`, {
      params: { 
        search,
        page,
        limit 
      }
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Invite a freelancer to a job
export const inviteFreelancer = async (jobId, freelancerId) => {
  try {
    const response = await axios.post(`${API_URL}/employer/InviteFreelancer`, {
      jobId,
      freelancerId
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Remove a freelancer invitation
export const removeInvitation = async (jobId, freelancerId) => {
  try {
    const response = await axios.delete(`${API_URL}/employer/RemoveInvitation/${jobId}/${freelancerId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Get invited freelancers for a job
export const getInvitedFreelancers = async (jobId) => {
  try {
    const response = await axios.get(`${API_URL}/employer/GetInvitedFreelancers/${jobId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getAISuggestedFreelancers = async (jobData) => {
  try {
    const response = await axios.post(`${API_URL}/employer/ai-suggest-freelancers`, jobData);
    return response.data;
  } catch (error) {
    throw error;
  }
}; 