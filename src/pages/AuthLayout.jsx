import React from "react";

export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
      {/* Left side */}
      <div className="relative hidden md:flex flex-col justify-center items-center w-full md:w-1/2 bg-gradient-to-br from-green-400 to-emerald-500 text-white overflow-hidden p-10">
        <div className="absolute inset-0 bg-black/10 z-0 backdrop-blur-sm" />

        <div className="z-10 text-center">
          <h2 className="text-4xl font-bold mb-4 drop-shadow">
            Tạo tài khoản để bắt đầu
          </h2>
          <p className="text-white/90 text-lg max-w-md mx-auto">
            Tham gia cùng hàng triệu freelancer và nhà tuyển dụng toàn cầu.
          </p>
          <img
            src="/img/freelancer_AI.png"
            className="mt-10 w-3/4 max-w-sm mx-auto drop-shadow-lg rounded-xl"
            alt="Freelancer AI"
          />
        </div>
      </div>

      {/* Right side (form) */}
      <div className="flex flex-col justify-center items-center w-full md:w-1/2 p-6 sm:p-8 bg-white">
        <div className="w-full max-w-md">
          {children}
        </div>
      </div>
    </div>
  );
}
