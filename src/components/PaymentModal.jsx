import React, { useState } from 'react';
import { createPaymentOrder, capturePayment } from '../services/paymentService';

const PaymentModal = ({ isOpen, onClose, jobId, freelancerName, bidAmount }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handlePayment = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Tạo đơn hàng thanh toán
      const orderData = await createPaymentOrder(jobId);
      
      // Chuyển hướng đến trang thanh toán PayPal
      window.location.href = orderData.data.approvalUrl;
    } catch (err) {
      setError(err.message || 'Có lỗi xảy ra khi tạo đơn hàng');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Xác nhận thanh toán</h2>
        
        <div className="mb-4">
          <p className="text-gray-600">Freelancer: {freelancerName}</p>
          <p className="text-gray-600">Số tiền: ${bidAmount}</p>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
            disabled={loading}
          >
            Hủy
          </button>
          <button
            onClick={handlePayment}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? 'Đang xử lý...' : 'Thanh toán ngay'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal; 