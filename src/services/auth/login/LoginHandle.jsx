import React from "react";
import AuthLayout from "../../../components/layout/AuthLayout";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaEnvelope, FaLock } from "react-icons/fa";
import SocialButtons from "../../../components/login/social-button";
import { useAuth } from "../../../context/AuthContext";

export default function AuthLogin() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const dest = new URLSearchParams(location.search).get("dest");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Giả sử đây là response từ API đăng nhập
      const response = {
        success: true,
        data: {
          user: {
            name: "John Doe",
            email: "john@example.com",
            role: "freelancer",
          },
          freelancerId: "67f2baeaf02bec90fc68a766", // ID của freelancer
        },
      };

      if (response.success) {
        // Lưu thông tin đăng nhập vào context và localStorage
        login(response.data.user, response.data.freelancerId);

        // 👉 Nếu có dest (bị redirect từ ProtectedRoute), ưu tiên nó
        if (dest) {
          return navigate(dest);
        }

        // 👉 Nếu không có dest, redirect theo vai trò
        if (response.data.user.role === "freelancer") {
          return navigate("/freelancer/dashboard");
        } else if (response.data.user.role === "employer") {
          return navigate("/employer/dashboard");
        } else {
          return navigate("/"); // fallback
        }
      }
    } catch (error) {
      console.error("Login error:", error);
      // Hiển thị thông báo lỗi
    }
  };

  const handleSocialLogin = (provider) => {
    console.log(`Login with ${provider}`);
    // TODO: redirect tới OAuth tương ứng
  };

  return (
    <AuthLayout>
      <div>
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Đăng nhập vào <span className="text-green-600">Freelancer AI</span>
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username/Email */}
          <div className="relative">
            <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Email hoặc tên đăng nhập"
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
            Đăng nhập
          </button>
        </form>

        {/* Divider */}
        <div className="my-6 text-center text-gray-400 text-sm flex items-center justify-center">
          <div className="h-px bg-gray-300 flex-1 mx-2" />
          hoặc đăng nhập bằng
          <div className="h-px bg-gray-300 flex-1 mx-2" />
        </div>

        <SocialButtons onClick={handleSocialLogin} />

        {/* Redirect to Register */}
        <p className="text-center text-sm text-gray-600">
          Bạn chưa có tài khoản?{" "}
          <Link
            to="/register"
            className="text-green-600 font-semibold hover:underline"
          >
            Đăng ký ngay
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}
