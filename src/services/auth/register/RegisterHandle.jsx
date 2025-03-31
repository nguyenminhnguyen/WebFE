import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AuthLayout from "../../../components/layout/AuthLayout";
import { FaUserTie, FaBriefcase } from "react-icons/fa";

export default function AuthRegister() {
  const navigate = useNavigate();

  const handleRoleSelect = (role) => {
    if (role === "freelancer") {
      navigate("/register/freelancer");
    } else if (role === "client") {
      navigate("/register/employer");
    }
  };

  return (
    <AuthLayout>
      <>
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Bạn là ai?
        </h1>
        <div className="space-y-4">
          {/* Freelancer */}
          <button
            onClick={() => handleRoleSelect("freelancer")}
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
            onClick={() => handleRoleSelect("client")}
            className="flex items-center gap-4 w-full p-5 border border-gray-300 rounded-2xl hover:border-green-500 hover:shadow-md transition duration-200 text-left bg-white"
          >
            <FaUserTie className="text-2xl text-green-600" />
            <div>
              <strong className="block text-lg">Doanh nghiệp</strong>
              <p className="text-sm text-gray-600">
                Tìm kiếm freelancer để làm việc cho bạn.
              </p>
            </div>
          </button>
        </div>
      </>
    </AuthLayout>
  );
}
