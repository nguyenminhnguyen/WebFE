import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AuthLayout from "../../pages/HomePage_AuthPage/AuthLayout";
import {
  FaUserTie,
  FaBriefcase,
  FaUser,
  FaLock,
  FaEnvelope,
} from "react-icons/fa";
import SocialButtons from "../content-box/social-button";

export default function AuthRegister() {
  const [role, setRole] = useState(""); // 'freelancer' | 'client'
  const navigate = useNavigate();
  const location = useLocation();
  const dest = new URLSearchParams(location.search).get("dest") || "/";

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Validate form...
    navigate(dest);
  };
  const handleSocialRegister = (provider) => {
    console.log(`Register with ${provider}`);
    // TODO: redirect tới OAuth tương ứng
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
              onClick={() => setRole("freelancer")}
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
              onClick={() => setRole("client")}
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
      ) : (
        <>
          <div className="mb-6">
            <h1 className="text-2xl font-bold mb-2 text-gray-800">
              Đăng ký với vai trò{" "}
              <span className="text-green-600 font-semibold">
                {role === "freelancer" ? "Freelancer" : "Doanh nghiệp"}
              </span>
            </h1>
            <p
              onClick={() => setRole("")}
              className="text-sm text-gray-400 mt-2 hover:underline cursor-pointer"
            >
              ← Quay lại chọn vai trò
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name */}
            <div className="relative">
              <FaUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Tên đầy đủ"
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 transition text-sm"
                required
              />
            </div>

            {/* Email */}
            <div className="relative">
              <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                placeholder="Email"
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 transition text-sm"
                required
              />
            </div>

            {/* Password */}
            <div className="relative">
              <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="password"
                placeholder="Mật khẩu"
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 transition text-sm"
                required
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-3 rounded-xl hover:bg-green-700 transition font-semibold shadow-md"
            >
              Tạo tài khoản
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 text-center text-gray-400 text-sm flex items-center justify-center">
            <div className="h-px bg-gray-300 flex-1 mx-2" />
            hoặc tiếp tục với
            <div className="h-px bg-gray-300 flex-1 mx-2" />
          </div>

          <SocialButtons onClick={handleSocialRegister} />

          {/* Redirect to Login */}
          <p className="text-center text-sm text-gray-600">
            Bạn đã có tài khoản?{" "}
            <Link
              to={`/login`}
              className="text-green-600 font-semibold hover:underline"
            >
              Đăng nhập ngay
            </Link>
          </p>
        </>
      )}
    </AuthLayout>
  );
}
