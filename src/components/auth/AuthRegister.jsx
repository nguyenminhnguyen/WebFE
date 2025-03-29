import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AuthLayout from "../../pages/AuthLayout";
import {
  FaUserTie,
  FaBriefcase,
  FaUser,
  FaLock,
  FaEnvelope,
  FaCamera,
  FaIdCard,
} from "react-icons/fa";
import SocialButtons from "../content-box/social-button";
import BirthAndPhoneSelect from "../BirthdayAndPhoneNumberSelect";

export default function AuthRegister() {
  const [role, setRole] = useState(""); // 'freelancer' | 'client'
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const location = useLocation();
  const dest = new URLSearchParams(location.search).get("dest") || "/";
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    fname: "",
    birthday: "",
    phone: "",
    experience: "",
    email: "",
    companyName: "",
    companyPassword: "",
    contactEmail: "",
    phoneNumber: "",
    companyDescription: "",
    companyLogo: null,
    location: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, companyLogo: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
      return;
    }

    try {
      const formDataToSend = { role, ...formData };

      const response = await fetch("http://localhost:5000/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formDataToSend),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Đăng ký thất bại!");

      alert("Đăng ký thành công!");
      navigate("/");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <AuthLayout>
      {!role ? (
        <>
          <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
            Bạn là ai?
          </h1>
          <div className="space-y-4">
            {/* Freelancer */}
            <button
              onClick={() =>{ setRole("freelancer"); resetForm();}}
              className="flex items-center gap-4 w-full p-5 border border-gray-300 rounded-2xl hover:border-green-500 hover:shadow-md transition duration-200 text-left bg-white"
            >
              <FaBriefcase className="text-2xl text-green-600" />
              <div>
                <strong className="block text-lg">Freelancer</strong>
                <p className="text-sm text-gray-600">
                  Tìm kiếm việc làm, dự án và khách hàng mới.
                </p>
              </div>
            </button>

            {/* Client */}
            <button
              onClick={() => {setRole("client"); resetForm();}}
              className="flex items-center gap-4 w-full p-5 border border-gray-300 rounded-2xl hover:border-green-500 hover:shadow-md transition duration-200 text-left bg-white"
            >
              <FaUserTie className="text-2xl text-green-600" />
              <div>
                <strong className="block text-lg">
                  Doanh nghiệp hoặc Cá nhân tuyển dụng
                </strong>
                <p className="text-sm text-gray-600">
                  Tìm kiếm freelancer để làm việc cho bạn.
                </p>
              </div>
            </button>
          </div>
        </>
      ) : role === "freelancer" ? (
        <>
          <div className="mb-6">
            <h1 className="text-2xl font-bold mb-2 text-gray-800">
              {step === 1 ? "Đăng ký với vai trò" : "Hoàn tất hồ sơ"}{" "}
              <span className="text-green-600 font-semibold">
                {role === "freelancer" ? "Freelancer" : "Doanh nghiệp"}
              </span>
            </h1>
            <p
              onClick={() => (step === 1 ? setRole("") : setStep(1))}
              className="text-sm text-gray-400 mt-2 hover:underline cursor-pointer"
            >
              ← {step === 1 ? "Quay lại chọn vai trò" : "Quay lại bước trước"}
            </p>
          </div>

          {/* FORM */}
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
        </>
      ) : role === "client" ? (
        <>
          <div className="mb-6">
            <h1 className="text-2xl font-bold mb-2 text-gray-800">
              {step === 1 ? "Đăng ký với vai trò" : "Hoàn tất hồ sơ"}{" "}
              <span className="text-green-600 font-semibold">Doanh nghiệp</span>
            </h1>
            <p
              onClick={() => (step === 1 ? setRole("") : setStep(1))}
              className="text-sm text-gray-400 mt-2 hover:underline cursor-pointer"
            >
              ← {step === 1 ? "Quay lại chọn vai trò" : "Quay lại bước trước"}
            </p>
          </div>

          {/* FORM */}
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
                  <FaIdCard className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
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
                  <FaIdCard className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
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
              {step === 1 ? "Tiếp tục" : "Tạo tài khoản"}
            </button>
          </form>
        </>
      ) : null}
    </AuthLayout>
  );
}
