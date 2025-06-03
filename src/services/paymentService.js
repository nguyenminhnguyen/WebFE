import axios from 'axios';

const API_URL = 'https://findwork-backend.onrender.com/api';

export const createPaymentOrder = async (jobId) => {
  try {
    const token = localStorage.getItem("token");
    console.log("Sending request to create payment order with jobId:", jobId);
    console.log("Token:", token);
    const response = await axios.post(
      `${API_URL}/jobs/${jobId}/create-order`,
      {},
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      }
    );
    console.log("Response from create payment order:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error creating payment order:", error.response?.data || error.message);
    throw error.response?.data || error.message;
  }
};

export const capturePayment = async (orderId, jobId, freelancerId) => {
  try {
    const token = localStorage.getItem("token");
    console.log("Sending request to capture payment with orderId:", orderId, "jobId:", jobId, "freelancerId:", freelancerId);
    const response = await axios.post(
      `${API_URL}/jobs/${jobId}/capture`,
      { orderId, freelancerId },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      }
    );
    console.log("Response from capture payment:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error capturing payment:", error.response?.data || error.message);
    // Nếu có response từ backend, trả về data
    if (error.response?.data) {
      return error.response.data;
    }
    // Nếu không có response, trả về object error
    return {
      status: "Error",
      message: error.message || "Failed to capture payment"
    };
  }
}; 