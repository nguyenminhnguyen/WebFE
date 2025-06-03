import { useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { capturePayment } from '../services/paymentService';
import axios from 'axios';
import { toast } from 'react-toastify';

const PaymentReturn = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isProcessing = useRef(false);
  const hasNavigated = useRef(false);

  useEffect(() => {
    const handlePaymentReturn = async () => {
      // Nếu đang xử lý hoặc đã chuyển hướng thì không chạy lại
      if (isProcessing.current || hasNavigated.current) return;
      isProcessing.current = true;

      const params = new URLSearchParams(location.search);
      const jobId = params.get('jobId');
      const orderId = params.get('token'); // PayPal trả về token là orderId
      const proposalId = localStorage.getItem('pendingAcceptProposalId');
      const freelancerId = localStorage.getItem('pendingAcceptFreelancerId');

      // Xóa các ID khỏi localStorage ngay từ đầu
      localStorage.removeItem('pendingAcceptProposalId');
      localStorage.removeItem('pendingAcceptFreelancerId');

      // Kiểm tra thông tin cần thiết
      if (!orderId || !jobId || !freelancerId) {
        toast.error('Thiếu thông tin cần thiết. Vui lòng thử lại sau.');
        hasNavigated.current = true;
        navigate('/employer/dashboard');
        return;
      }

      try {
        // Kiểm tra trạng thái order trước khi capture
        const token = localStorage.getItem('token');
        const orderResponse = await axios.get(`https://findwork-backend.onrender.com/api/jobs/order/${orderId}`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        const orderData = orderResponse.data;
        console.log('Order status:', orderData);

        // Nếu order chưa được thanh toán, chuyển hướng về trang chi tiết công việc
        if (orderData.status !== 'Success' || !['APPROVED', 'COMPLETED'].includes(orderData.data.status)) {
          toast.error('Thanh toán chưa hoàn tất. Vui lòng hoàn tất thanh toán trên PayPal.');
          hasNavigated.current = true;
          navigate(`/employer/job/${jobId}`);
          return;
        }

        // Capture payment sau khi thanh toán thành công
        const result = await capturePayment(orderId, jobId, freelancerId);
        console.log('Capture payment result:', result);

        // Xử lý kết quả
        if (result.status === "Success") {
          toast.success('Thanh toán thành công!');
          hasNavigated.current = true;
          navigate(`/employer/job/${jobId}?refresh=true`);
        } else {
          toast.error(result.message || 'Thanh toán không hoàn thành. Vui lòng thử lại sau.');
          hasNavigated.current = true;
          navigate('/employer/dashboard');
        }
      } catch (error) {
        console.error('Error:', error);
        toast.error('Có lỗi xảy ra khi xác nhận thanh toán. Vui lòng liên hệ hỗ trợ.');
        hasNavigated.current = true;
        navigate('/employer/dashboard');
      } finally {
        isProcessing.current = false;
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