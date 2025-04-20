import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaSearch,
  FaBell,
  FaEnvelope,
  FaUserCircle,
  FaBriefcase,
  FaFileAlt,
  FaBars,
} from "react-icons/fa";

export default function DashboardNavbar() {
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMessages, setShowMessages] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    // Handle search functionality
    console.log("Searching for:", searchTerm);
  };

  const menuItems = [
    { label: "Tìm việc", path: "/freelancer/dashboard", icon: FaBriefcase },
    { label: "Đề xuất", path: "/freelancer/proposals", icon: FaFileAlt },
  ];

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm">
      <div className="flex items-center justify-between h-16 px-4">
        {/* Left section: Logo and Menu */}
        <div className="flex items-center space-x-4">
          {/* Mobile menu button */}
          <button
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="md:hidden p-2 text-gray-600 hover:text-green-600"
          >
            <FaBars className="w-5 h-5" />
          </button>

          <Link to="/" className="flex items-center">
            <img src="/plain.svg" alt="Logo" className="w-8 h-8" />
            <h1 className="ml-2 text-xl font-bold text-green-600 whitespace-nowrap">
              Freelancer AI
            </h1>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1">
            {menuItems.map(({ label, path, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  location.pathname === path
                    ? "text-green-600 bg-green-50"
                    : "text-gray-600 hover:text-green-600 hover:bg-green-50"
                }`}
              >
                <Icon className="w-4 h-4 mr-2" />
                {label}
              </Link>
            ))}
          </div>
        </div>

        {/* Right section: Search and Actions */}
        <div className="flex items-center space-x-4">
          {/* Search - Hidden on mobile */}
          <form onSubmit={handleSearch} className="hidden md:block">
            <div className="relative">
              <input
                type="text"
                placeholder="Tìm kiếm công việc..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition text-sm"
              />
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </form>

          {/* Quick Actions */}
          <div className="flex items-center space-x-2">
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
            <Link
              to="/freelancer/profile"
              className="p-2 text-gray-600 hover:text-green-600"
            >
              <FaUserCircle className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {showMobileMenu && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-4 py-2">
            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="mb-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Tìm kiếm công việc..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition text-sm"
                />
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </form>

            {/* Mobile Menu Items */}
            <div className="space-y-1">
              {menuItems.map(({ label, path, icon: Icon }) => (
                <Link
                  key={path}
                  to={path}
                  onClick={() => setShowMobileMenu(false)}
                  className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    location.pathname === path
                      ? "text-green-600 bg-green-50"
                      : "text-gray-600 hover:text-green-600 hover:bg-green-50"
                  }`}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Notifications Dropdown */}
      {showNotifications && (
        <div className="absolute right-4 mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
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
        <div className="absolute right-4 mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
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
