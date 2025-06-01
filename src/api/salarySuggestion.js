import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

export const getSalarySuggestion = async (jobData) => {
  try {
    const response = await axios.post(`${API_URL}/employer/salary-suggestion`, jobData);
    return response.data;
  } catch (error) {
    console.error('Error getting salary suggestion:', error);
    throw error;
  }
}; 