import React from "react";
import AuthLayout from "../../pages/AuthLayout";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  FaEnvelope,
  FaLock,
  FaGoogle,
  FaFacebookF,
  FaLinkedinIn,
} from "react-icons/fa";
import SocialButtons from "../content-box/social-button";

export default function AuthLogin() {
  const navigate = useNavigate();
  const location = useLocation();
  const dest = new URLSearchParams(location.search).get("dest") || "/";

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: xử lý login
    navigate(dest);
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

       <SocialButtons onClick={handleSocialLogin}/>

        {/* Redirect to Register */}
        <p className="text-center text-sm text-gray-600">
          Bạn chưa có tài khoản?{" "}
          <Link
            to={`/register`}
            className="text-green-600 font-semibold hover:underline"
          >
            Đăng ký ngay
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}
