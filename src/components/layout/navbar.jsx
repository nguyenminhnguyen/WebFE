import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FaSearch,
  FaUserTie,
  FaBriefcase,
  FaBell,
  FaEnvelope,
  FaUserCircle,
  FaPlus,
  FaSignOutAlt,
  FaUser,
} from "react-icons/fa";

export default function NavBar({
  showLogo = true,
  showSearch = true,
  menuItems = [],
  showAuthButtons = true,
  authButtons = null,
}) {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState("freelancer");
  const [showDropdown, setShowDropdown] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMessages, setShowMessages] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);

  // Check if we're on pages that should hide the navbar
  const isAuthPage =
    location.pathname === "/login" ||
    location.pathname === "/register" ||
    location.pathname === "/register/freelancer" ||
    location.pathname === "/register/employer";

  // Hide navbar on auth pages and dashboards
  if (isAuthPage) {
    return null;
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    setIsLoggedIn(!!token);
    setUserRole(role);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUserRole(null);
    navigate("/");
  };
  const handleSearch = (e) => {
    e.preventDefault();
    const path = searchType === "freelancer" ? "/freelancer" : "/employer";
    window.location.href = `${path}?search=${searchTerm}`;
  };

  const handleLogoClick = () => {
    if (!isLoggedIn) {
      navigate("/");
    } else if (userRole === "freelancer") {
      navigate("/freelancer/dashboard");
    } else if (userRole === "employer") {
      navigate("/employer/dashboard");
    } else {
      navigate("/");
    }
  };

  const freelancerMenuItems = [
    { label: "Tìm việc", path: "/freelancer/dashboard", icon: FaBriefcase },
    { label: "Hồ sơ", path: "/freelancer/profile", icon: FaUserCircle },
    { label: "Tin nhắn", path: "/freelancer/messages", icon: FaEnvelope },
    { label: "Thông báo", path: "/freelancer/notifications", icon: FaBell },
  ];

  const employerMenuItems = [
    { label: "Quản lý dự án", path: "/employer/dashboard", icon: FaBriefcase },
    { label: "Hồ sơ", path: "/employer/profile", icon: FaUserCircle },
    { label: "Tin nhắn", path: "/employer/messages", icon: FaEnvelope },
    { label: "Thông báo", path: "/employer/notifications", icon: FaBell },
  ];

  const activeMenuItems = isLoggedIn
    ? userRole === "freelancer"
      ? freelancerMenuItems
      : employerMenuItems
    : menuItems;

  return (
    <nav className="bg-white px-4 py-3 border-b border-gray-200 shadow-sm">
      <div className="max-w-[1400px] mx-auto flex items-center justify-between">
        {/* Left section: Logo and Menu Items */}
        <div className="flex items-center space-x-8">
          {/* Logo */}
          {showLogo && (
            <Link to="/" className="flex items-center">
              <img src="/plain.svg" alt="Logo" className="w-8 h-8" />
              <h1
                onClick={handleLogoClick}
                className="ml-2 text-xl font-bold text-green-600 whitespace-nowrap"
              >
                Freelancer AI
              </h1>
            </Link>
          )}

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1">
            {activeMenuItems.map(({ label, path, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  location.pathname === path
                    ? "text-green-600 bg-green-50"
                    : "text-gray-600 hover:text-green-600 hover:bg-green-50"
                }`}
              >
                {Icon && <Icon className="w-4 h-4 mr-2" />}
                {label}
              </Link>
            ))}
          </div>
        </div>

        {/* Right section: Search and Auth */}
        <div className="flex items-center space-x-4">
          {/* Searchbar */}
          {showSearch && (
            <form onSubmit={handleSearch} className="hidden md:block">
              <div className="relative">
                <input
                  type="text"
                  placeholder={`Tìm kiếm ${
                    searchType === "freelancer" ? "freelancer" : "công việc"
                  }...`}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition text-sm"
                />
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </form>
          )}

          {/* Quick Actions - Only show when logged in */}
          {isLoggedIn && (
            <div className="hidden md:flex items-center space-x-2">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2 text-gray-600 hover:text-green-600 relative"
              >
                <FaBell className="w-5 h-5" />
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <button
                onClick={() => setShowMessages(!showMessages)}
                className="p-2 text-gray-600 hover:text-green-600 relative"
              >
                <FaEnvelope className="w-5 h-5" />
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              {/* Profile Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                  className="p-2 text-gray-600 hover:text-green-600"
                >
                  <FaUserCircle className="w-5 h-5" />
                </button>

                {showProfileDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                    <div className="py-1">
                      <Link
                        to={
                          userRole === "freelancer"
                            ? "/freelancer/profile"
                            : "/employer/profile"
                        }
                        onClick={() => setShowProfileDropdown(false)}
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <FaUser className="w-4 h-4 mr-2" />
                        Hồ sơ
                      </Link>
                      <button
                        onClick={() => {
                          handleLogout();
                          setShowProfileDropdown(false);
                        }}
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <FaSignOutAlt className="w-4 h-4 mr-2" />
                        Đăng xuất
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Auth buttons - Only show when not logged in */}
          {!isLoggedIn && showAuthButtons && authButtons}

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700 p-2 rounded-lg hover:bg-gray-100"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden mt-2 bg-white border-t border-gray-200 py-2 px-4 rounded-b-xl shadow-sm">
          {activeMenuItems.map(({ label, path, icon: Icon }) => (
            <Link
              key={path}
              to={path}
              className={`flex items-center py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                location.pathname === path
                  ? "text-green-600 bg-green-50"
                  : "text-gray-600 hover:text-green-600 hover:bg-green-50"
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {Icon && <Icon className="w-4 h-4 mr-2" />}
              {label}
            </Link>
          ))}

          {/* Mobile Profile and Logout - Only show when logged in */}
          {isLoggedIn && (
            <>
              <Link
                to={
                  userRole === "freelancer"
                    ? "/freelancer/profile"
                    : "/employer/profile"
                }
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center py-2 px-3 rounded-lg text-sm font-medium text-gray-600 hover:text-green-600 hover:bg-green-50"
              >
                <FaUser className="w-4 h-4 mr-2" />
                Hồ sơ
              </Link>
              <button
                onClick={() => {
                  handleLogout();
                  setIsMobileMenuOpen(false);
                }}
                className="flex items-center w-full py-2 px-3 rounded-lg text-sm font-medium text-gray-600 hover:text-green-600 hover:bg-green-50"
              >
                <FaSignOutAlt className="w-4 h-4 mr-2" />
                Đăng xuất
              </button>
            </>
          )}

          {/* Auth buttons - Only show when not logged in */}
          {!isLoggedIn && showAuthButtons && authButtons && (
            <div className="flex flex-col space-y-2 pt-2">{authButtons}</div>
          )}
        </div>
      )}

      {/* Notifications Dropdown */}
      {showNotifications && (
        <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
          <div className="p-4">
            <h3 className="font-medium text-gray-900">Thông báo mới</h3>
            <div className="mt-2 space-y-2">
              <div className="p-2 hover:bg-gray-50 rounded-lg cursor-pointer">
                <p className="text-sm text-gray-600">Bạn có một đề xuất mới</p>
                <span className="text-xs text-gray-400">2 phút trước</span>
              </div>
              <div className="p-2 hover:bg-gray-50 rounded-lg cursor-pointer">
                <p className="text-sm text-gray-600">
                  Công việc mới phù hợp với bạn
                </p>
                <span className="text-xs text-gray-400">10 phút trước</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Messages Dropdown */}
      {showMessages && (
        <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
          <div className="p-4">
            <h3 className="font-medium text-gray-900">Tin nhắn</h3>
            <div className="mt-2 space-y-2">
              <div className="p-2 hover:bg-gray-50 rounded-lg cursor-pointer">
                <p className="text-sm text-gray-600">John Doe: Xin chào!</p>
                <span className="text-xs text-gray-400">5 phút trước</span>
              </div>
              <div className="p-2 hover:bg-gray-50 rounded-lg cursor-pointer">
                <p className="text-sm text-gray-600">
                  Jane Smith: Bạn có thể bắt đầu dự án vào tuần sau không?
                </p>
                <span className="text-xs text-gray-400">1 giờ trước</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
