import React from "react";
import { FaFacebook, FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-100 border-t border-gray-200 mt-16">
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Logo + mô tả */}
        <div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Freelancer AI</h2>
          <p className="text-gray-600 text-sm">
            Nền tảng kết nối freelancer và nhà tuyển dụng, tích hợp trí tuệ nhân tạo giúp tối ưu tìm kiếm, gợi ý và kết nối.
          </p>
        </div>

        {/* Liên kết */}
        <div>
          <h3 className="text-md font-semibold text-gray-800 mb-2">Liên kết nhanh</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li><a href="/" className="hover:text-green-600">Trang chủ</a></li>
            <li><a href="/freelancer" className="hover:text-green-600">Freelancer</a></li>
            <li><a href="/project" className="hover:text-green-600">Dự án</a></li>
            <li><a href="/login" className="hover:text-green-600">Đăng nhập</a></li>
          </ul>
        </div>

        {/* Mạng xã hội */}
        <div>
          <h3 className="text-md font-semibold text-gray-800 mb-2">Kết nối với chúng tôi</h3>
          <div className="flex space-x-4 text-gray-500">
            <a href="#"><FaFacebook className="hover:text-blue-600 text-xl" /></a>
            <a href="#"><FaTwitter className="hover:text-blue-400 text-xl" /></a>
            <a href="#"><FaLinkedin className="hover:text-blue-700 text-xl" /></a>
            <a href="#"><FaGithub className="hover:text-gray-800 text-xl" /></a>
          </div>
        </div>
      </div>

      <div className="text-center text-sm text-gray-500 py-4 border-t border-gray-200">
        © {new Date().getFullYear()} Freelancer AI. All rights reserved.
      </div>
    </footer>
  );
}
