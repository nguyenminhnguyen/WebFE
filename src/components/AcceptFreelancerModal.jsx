import React, { useState } from 'react';
import PaymentModal from './PaymentModal';
import axios from 'axios';

const AcceptFreelancerModal = ({ isOpen, onClose, jobId, application }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showPayment, setShowPayment] = useState(false);

  const handleAccept = async () => {
    try {
      setLoading(true);
      setError(null);

      // Gọi API chấp nhận freelancer
      await axios.put(`http://localhost:5000/api/jobs/proposals/${application._id}/accept`);
      
      // Hiển thị modal thanh toán
      setShowPayment(true);
    } catch (err) {
      setError(err.response?.data?.message || 'Có lỗi xảy ra khi chấp nhận freelancer');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white rounded-lg p-6 w-full max-w-md">
          <h2 className="text-2xl font-bold mb-4">Xác nhận chấp nhận freelancer</h2>
          
          <div className="mb-4">
            <p className="text-gray-600">Freelancer: {application.freelancer.name}</p>
            <p className="text-gray-600">Số tiền đề xuất: ${application.bidAmount}</p>
            <p className="text-gray-600">Nội dung đề xuất: {application.proposalText}</p>
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
              onClick={handleAccept}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
              disabled={loading}
            >
              {loading ? 'Đang xử lý...' : 'Chấp nhận và thanh toán'}
            </button>
          </div>
        </div>
      </div>

      <PaymentModal
        isOpen={showPayment}
        onClose={() => {
          setShowPayment(false);
          onClose();
        }}
        jobId={jobId}
        freelancerName={application.freelancer.name}
        bidAmount={application.bidAmount}
      />
    </>
  );
};

export default AcceptFreelancerModal; 