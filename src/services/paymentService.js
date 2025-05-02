import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const createPaymentOrder = async (jobId) => {
  try {
    const response = await axios.post(`${API_URL}/jobs/${jobId}/create-order`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const capturePayment = async (orderId) => {
  try {
    const response = await axios.post(`${API_URL}/jobs/${orderId}/capture`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
}; 