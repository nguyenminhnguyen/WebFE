import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

const PaymentReturn = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState('processing');

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        const token = localStorage.getItem("token");
        const jobId = localStorage.getItem("pendingJobId");
        const paymentToken = searchParams.get('token');
        const payerId = searchParams.get('PayerID');

        // Kiểm tra nếu người dùng hủy thanh toán
        if (searchParams.get('cancel')) {
          setStatus('cancelled');
          return;
        }

        // Kiểm tra xem có đủ thông tin không
        if (!paymentToken || !payerId || !jobId) {
          setStatus('error');
          throw new Error('Missing payment information');
        }

        const response = await fetch('http://localhost:3000/api/payment/verify', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            paymentToken,
            payerId,
            jobId
          })
        });

        const result = await response.json();

        if (response.ok) {
          setStatus('success');
          // Xóa jobId đã lưu
          localStorage.removeItem("pendingJobId");
          // Chuyển về trang dashboard sau 3 giây
          setTimeout(() => {
            navigate('/employer/dashboard');
          }, 3000);
        } else {
          setStatus('error');
          throw new Error(result.message || 'Verification failed');
        }
      } catch (error) {
        console.error('Payment verification error:', error);
        setStatus('error');
      }
    };

    // Chỉ gọi verify khi có PayerID từ PayPal
    if (searchParams.get('PayerID')) {
      verifyPayment();
    } else if (!searchParams.get('cancel')) {
      // Nếu không có PayerID và không phải là cancel, set error
      setStatus('error');
    }
  }, [searchParams, navigate]);

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
        <div className="text-center">
          {status === 'processing' && (
            <>
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
              <p className="mt-4 text-gray-600">Đang xác thực thanh toán...</p>
            </>
          )}

          {status === 'success' && (
            <>
              <div className="text-green-500 text-6xl mb-4">✓</div>
              <h2 className="text-2xl font-bold mb-4">Thanh toán thành công!</h2>
              <p className="text-gray-600 mb-4">
                Cảm ơn bạn đã thanh toán. Bài đăng của bạn đã được kích hoạt.
              </p>
              <p className="text-sm text-gray-500">
                Đang chuyển hướng về trang chủ...
              </p>
            </>
          )}

          {status === 'cancelled' && (
            <>
              <div className="text-yellow-500 text-6xl mb-4">!</div>
              <h2 className="text-2xl font-bold mb-4">Thanh toán đã bị hủy</h2>
              <p className="text-gray-600 mb-4">
                Bạn đã hủy quá trình thanh toán.
              </p>
              <button
                onClick={() => {
                  localStorage.removeItem("pendingJobId");
                  navigate('/employer/dashboard');
                }}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Quay về trang chủ
              </button>
            </>
          )}

          {status === 'error' && (
            <>
              <div className="text-red-500 text-6xl mb-4">✕</div>
              <h2 className="text-2xl font-bold mb-4">Thanh toán thất bại</h2>
              <p className="text-gray-600 mb-4">
                Có lỗi xảy ra trong quá trình xác thực thanh toán.
              </p>
              <button
                onClick={() => {
                  localStorage.removeItem("pendingJobId");
                  navigate('/employer/dashboard');
                }}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Quay về trang chủ
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentReturn;