import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import NavBar from "./navbar";
import Login from "../../components/login/loginButtonMenu";
import Register from "../../components/register/registerButtonMenu";
import { FaUserCircle } from "react-icons/fa";
export default function NavBarWrapper() {
  const location = useLocation();
  const navigate = useNavigate();
  const [role, setRole] = useState(localStorage.getItem("role"));
  const [token, setToken] = useState(localStorage.getItem("token"));
  const isMinimalNav =
    location.pathname === "/login" ||
    location.pathname === "/register" ||
    location.pathname === "/register/freelancer" ||
    location.pathname === "/register/employer";

  const isFreelancerPage = location.pathname.startsWith("/freelancer");
  const isEmployerPage = location.pathname.startsWith("/employer");

  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const freelancerMenu = [
    { label: "Việc làm của bạn", path: "#" },
    { label: "Tài chính", path: "#" },
    { label: "Chat", path: "#" },
  ];

  const employerMenu = [
    { label: "Đăng việc", path: "/employer/jobpost" },
    { label: "Quản lý công việc", path: "employer/job-manage" },
    { label: "Tin nhắn", path: "/employer/message" },
  ];

  const defaultMenu = [
    { label: "Trang chủ", path: "/" },
    { label: "Tuyển dụng", path: "/info/employer" },
    { label: "Freelancer", path: "/info/freelancer" },
  ];
  const handleLogout = () => {
    // Xóa dữ liệu khỏi sessionStorage và localStorage
    sessionStorage.removeItem("role");
    sessionStorage.removeItem("token");
    localStorage.removeItem("role"); // Nếu bạn lưu role ở localStorage
    localStorage.removeItem("token"); // Nếu bạn lưu token ở localStorage
    // Cập nhật lại state trong React
    setRole(null);
    setToken(null);
    navigate("/login");
  };
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
          <button
            onClick={handleLogout}
            className="w-full px-4 py-2 text-left text-red-600 hover:bg-gray-100"
          >
            Đăng xuất
          </button>
        </div>
      )}
    </div>
  );

  const getMenuItems = () => {
    if (isMinimalNav) return [];
    if (isFreelancerPage) return freelancerMenu;
    if (isEmployerPage) return employerMenu;
    return defaultMenu;
  };

  const getAuthButtons = () => {
    if (isMinimalNav) return null;
    if (isFreelancerPage || isEmployerPage) return profileDropdown;
    return (
      <>
        <Login />
        <Register />
      </>
    );
  };

  return (
    <NavBar
      showLogo
      showSearch={!isMinimalNav}
      menuItems={getMenuItems()}
      showAuthButtons={!isMinimalNav}
      authButtons={getAuthButtons()}
    />
  );
}
