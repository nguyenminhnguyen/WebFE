import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const PaymentReturn = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const jobId = params.get('jobId');
    const timer = setTimeout(() => {
      if (jobId) {
        navigate(`/employer/job/${jobId}`);
      } else {
        navigate('/employer/dashboard');
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [navigate, location]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-center text-gray-600">Đang chuyển hướng về trang công việc...</p>
        </div>
      </div>
    </div>
  );
};

export default PaymentReturn;