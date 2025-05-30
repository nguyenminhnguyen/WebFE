import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { capturePayment } from '../services/paymentService';

const PaymentReturn = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handlePaymentReturn = async () => {
      const params = new URLSearchParams(location.search);
      const jobId = params.get('jobId');
      const orderId = params.get('token'); // PayPal trả về token là orderId

      try {
        if (orderId && jobId) {
          // Capture payment sau khi thanh toán thành công
          const captureResult = await capturePayment(orderId, jobId);
          
          if (captureResult.status === "Success") {
            // Xóa proposalId khỏi localStorage sau khi xử lý xong
            localStorage.removeItem('pendingAcceptProposalId');
            // Sau đó chuyển hướng về trang job
            navigate(`/employer/job/${jobId}`);
          } else {
            throw new Error(captureResult.message || 'Không thể xác nhận thanh toán');
          }
        } else {
          throw new Error('Thiếu thông tin orderId hoặc jobId');
        }
      } catch (error) {
        console.error('Error capturing payment:', error);
        alert('Có lỗi xảy ra khi xác nhận thanh toán. Vui lòng liên hệ hỗ trợ.');
        navigate('/employer/dashboard');
      }
    };

    handlePaymentReturn();
  }, [navigate, location]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-center text-gray-600">Đang xác nhận thanh toán...</p>
        </div>
      </div>
    </div>
  );
};

export default PaymentReturn;