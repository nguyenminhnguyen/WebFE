import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import NavBar from "./navbar";
import Login from "../auth/loginButtonMenu";
import Register from "../auth/registerButtonMenu";
import { FaUserCircle } from "react-icons/fa";

export default function NavBarWrapper() {
  const location = useLocation();

  const isMinimalNav =
    location.pathname === "/login" ||
    location.pathname === "/register" ||
    location.pathname === "/register/freelancer" ||
    location.pathname === "/register/employer";

  const isFreelancerPage = location.pathname.startsWith("/freelancer") || location.pathname === "/login/freelancer";

  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const freelancerMenu = [
    { label: "Việc làm của bạn", path: "#" },
    { label: "Tài chính", path: "#" },
    { label: "Chat", path: "#" },
  ];

  const profileDropdown = (
    <div className="relative">
      <button
        onClick={() => setShowProfileMenu((prev) => !prev)}
        className="flex items-center gap-2 px-3 py-2 rounded-full hover:bg-gray-100 transition"
      >
        <FaUserCircle className="text-2xl text-gray-600" />
        <span className="hidden md:inline text-sm font-medium">Người dùng</span>
      </button>
      {showProfileMenu && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50 animate-slide-down">
          <button className="w-full px-4 py-2 text-left hover:bg-gray-100">
            Thông tin cá nhân
          </button>
          <button className="w-full px-4 py-2 text-left hover:bg-gray-100">
            Cài đặt
          </button>
          <button className="w-full px-4 py-2 text-left text-red-600 hover:bg-gray-100">
            Đăng xuất
          </button>
        </div>
      )}
    </div>
  );

  return (
    <NavBar
      showLogo
      showSearch={!isMinimalNav}
      menuItems={
        isMinimalNav
          ? []
          : isFreelancerPage
          ? freelancerMenu
          : [
              { label: "Trang chủ", path: "/" },
              { label: "Dự án", path: "/projects" },
              { label: "Freelancer", path: "/freelancer" },
            ]
      }
      showAuthButtons={!isMinimalNav}
      authButtons={
        isMinimalNav ? null : isFreelancerPage ? profileDropdown : (
          <>
            <Login />
            <Register />
          </>
        )
      }
    />
  );
}
