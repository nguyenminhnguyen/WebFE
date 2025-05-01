import React, { useState } from "react";
import AuthLayout from "../../../components/layout/AuthLayout";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaEnvelope, FaLock } from "react-icons/fa";
import SocialButtons from "../../../components/login/social-button";
import { connectSocket } from "../../../services/socket";

export default function AuthLogin() {
  const navigate = useNavigate();
  const location = useLocation();
  const dest = new URLSearchParams(location.search).get("dest");
  const [role, setRole] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  /* Khi kết nối thành công và trả về data.role thì navigate dựa vào role, ví dụ khi data.role trả về employer*/
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!role) {
      alert("Vui lòng chọn vai trò trước khi đăng nhập.");
      return;
    }

    try {
      // 👇 Chọn endpoint API tùy theo vai trò
      const endpoint =
        role === "freelancer"
          ? "http://localhost:3000/api/freelancer/login"
          : "http://localhost:3000/api/employer/login";

      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData), // `formData` chứa email, password,...
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Đăng nhập thất bại!");
      }

      // 👉 Lưu token, role và user data vào localStorage
      localStorage.setItem("token", data.access_token);
      localStorage.setItem("role", data.user.role);
      localStorage.setItem("user", JSON.stringify(data.user));

      // 👉 Kết nối socket sau khi đăng nhập thành công
      connectSocket();

      // 👉 Chuyển trang tùy theo vai trò hoặc dest
      if (dest) {
        return navigate(dest);
      }

      if (data.user.role === "freelancer") {
        return navigate("/freelancer/dashboard");
      } else {
        return navigate("/employer/dashboard");
      }
    } catch (err) {
      console.error("Login error:", err);
      alert(err.message || "Đăng nhập thất bại.");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSocialLogin = (provider) => {
    if (!role) {
      alert("Vui lòng chọn vai trò trước khi đăng nhập.");
      return;
    }

    if (provider === "google") {
      // Redirect to Google OAuth endpoint
      const endpoint =
        role === "freelancer"
          ? `http://localhost:3000/auth/freelancer/google`
          : `http://localhost:3000/auth/employer/google`;
      window.location.href = endpoint;
    } else if (provider === "facebook") {
      // Handle Facebook login if needed
      window.location.href = "http://localhost:3000/auth/employer/facebook";
    }
    
  };
  const handleBack = () => {
    navigate("/");
  };
  return (
    <AuthLayout>
      <div>
        <h1 className="text-2xl font-bold text-center text-gray-800">
          Đăng nhập vào <span className="text-green-600">Freelancer AI</span>
        </h1>
        <p
          onClick={handleBack}
          className="text-gray-500 cursor-pointer hover:underline mt-4 mb-2"
        >
          ← Trở về trang chủ
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <div className="flex gap-6 mt-2">
              <p className="font-semibold">Bạn là:</p>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="role"
                  value="freelancer"
                  checked={role === "freelancer"}
                  onChange={(e) => setRole(e.target.value)}
                  className="mr-2"
                />
                Freelancer
              </label>

              <label className="flex items-center">
                <input
                  type="radio"
                  name="role"
                  value="employer"
                  checked={role === "employer"}
                  onChange={(e) => setRole(e.target.value)}
                  className="mr-2"
                />
                Nhà tuyển dụng
              </label>
            </div>
          </div>
          {/* Username/Email */}
          <div className="relative">
            <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
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
              name="password"
              value={formData.password}
              onChange={handleChange}
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
