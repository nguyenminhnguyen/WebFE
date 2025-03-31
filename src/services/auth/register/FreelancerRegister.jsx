import React, { useState } from "react";
import {
  FaUser,
  FaLock,
  FaEnvelope,
  FaBriefcase,
  FaCamera,
  FaIdCard,
} from "react-icons/fa";
import BirthAndPhoneSelect from "../../../components/register/BirthdayAndPhoneNumberSelect";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../AuthLayout";
export default function FreelancerRegister({ onBack }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    fname: "",
    birthday: "",
    phone: "",
    experience: "",
    email: "",
    avatar: null,
  });

  const navigate = useNavigate();
  const handleBack = () => {
    if (onBack) {
      onBack(); // Nếu có onBack từ props, gọi nó
    } else {
      navigate("/register"); // Nếu không, điều hướng về trang chọn vai trò
    }
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, avatar: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
      return;
    }
    try {
      const response = await fetch(
        "http://localhost:5000/api/reg/freelancerRegister",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Đăng ký thất bại!");

      alert("Đăng ký thành công!");
      navigate("/login");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <AuthLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2 text-gray-800">
          {step === 1 ? "Đăng ký Freelancer" : "Hoàn tất hồ sơ"}
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
              {/* Họ và Tên */}
              <div className="relative">
                <FaUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  name="fname"
                  type="text"
                  value={formData.fname}
                  placeholder="Họ và tên"
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 transition text-sm"
                  required
                />
              </div>
              {/*Username*/}
              <div className="relative">
                <FaIdCard className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  placeholder="Username"
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 transition text-sm"
                  required
                />
              </div>

              {/* Email */}
              <div className="relative">
                <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  placeholder="Email"
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 transition text-sm"
                  required
                />
              </div>

              {/* Ngày sinh & Số điện thoại */}
              <BirthAndPhoneSelect
                selectedDate={formData.birthday}
                setSelectedDate={(date) =>
                  setFormData({ ...formData, birthday: date })
                }
                phone={formData.phone}
                setPhone={(phone) => setFormData({ ...formData, phone })}
              />

              {/* Password */}
              <div className="relative">
                <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  placeholder="Mật khẩu"
                  onChange={handleChange}
                  onBlur={handleChange}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 transition text-sm"
                  required
                />
              </div>
            </>
          ) : (
            <>
              {/* Kinh nghiệm */}
              <div className="relative">
                <FaBriefcase className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <textarea
                  name="experience"
                  placeholder="Mô tả kinh nghiệm làm việc của bạn"
                  value={formData.experience}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 transition text-sm h-24"
                  required
                />
              </div>

              {/* Ảnh đại diện */}
              <div className="relative">
                <FaCamera className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="file"
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 transition text-sm"
                  accept="image/*"
                />
              </div>
            </>
          )}

          {/* Nút Submit */}
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-xl hover:bg-green-700 transition font-semibold shadow-md"
          >
            {step === 1 ? "Tiếp tục" : "Tạo tài khoản"}
          </button>
        </form>
      </div>
    </AuthLayout>
  );
}
