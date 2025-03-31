import React, { useState } from 'react';
import {
  FaBriefcase,
  FaEnvelope,
  FaLock,
  FaUser,
  FaMapMarkerAlt,
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import AuthLayout from '../../../components/layout/AuthLayout';
export default function ClientRegister({ onBack }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    companyName: '',
    companyPassword: '',
    contactEmail: '',
    phoneNumber: '',
    companyDescription: '',
    location: '',
  });

  const navigate = useNavigate();
  const handleBack = () => {
    if (onBack) {
      onBack(); // Nếu có onBack từ props, gọi nó
    } else {
      navigate('/register'); // Nếu không, điều hướng về trang chọn vai trò
    }
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
      return;
    }
    try {
      const response = await fetch(
        'http://localhost:5000/api/reg/employerRegister',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Đăng ký thất bại!');

      alert('Đăng ký thành công!');
      navigate('/login');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <AuthLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2 text-gray-800">
          {step === 1 ? 'Đăng ký Doanh nghiệp' : 'Hoàn tất Hồ sơ Công ty'}
        </h1>
        <p
          onClick={handleBack}
          className="text-sm text-gray-400 mt-2 hover:underline cursor-pointer"
        >
          ← Quay lại chọn vai trò
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {step === 1 ? (
            <>
              {/* Tên công ty */}
              <div className="relative">
                <FaBriefcase className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  name="companyName"
                  type="text"
                  value={formData.companyName}
                  placeholder="Tên công ty"
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 transition text-sm"
                  required
                />
              </div>

              {/* Email liên hệ */}
              <div className="relative">
                <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  name="contactEmail"
                  value={formData.contactEmail}
                  placeholder="Email liên hệ"
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 transition text-sm"
                  required
                />
              </div>

              {/* Số điện thoại */}
              <div className="relative">
                <FaUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  placeholder="Số điện thoại"
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 transition text-sm"
                  required
                />
              </div>

              {/* Mật khẩu */}
              <div className="relative">
                <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="password"
                  name="companyPassword"
                  value={formData.companyPassword}
                  placeholder="Mật khẩu"
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 transition text-sm"
                  required
                />
              </div>
            </>
          ) : (
            <>
              {/* Mô tả về công ty */}
              <div className="relative">
                <FaBriefcase className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <textarea
                  name="companyDescription"
                  placeholder="Mô tả về công ty"
                  value={formData.companyDescription}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 transition text-sm h-24"
                  required
                />
              </div>

              {/* Vị trí công ty */}
              <div className="relative">
                <FaMapMarkerAlt className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  placeholder="Vị trí công ty (Địa chỉ)"
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 transition text-sm"
                  required
                />
              </div>
            </>
          )}

          {/* Nút Submit */}
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-xl hover:bg-green-700 transition font-semibold shadow-md"
          >
            {step === 1 ? 'Tiếp tục' : 'Tạo tài khoản'}
          </button>
        </form>
      </div>
    </AuthLayout>
  );
}
