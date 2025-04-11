import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaSearch, FaUserTie, FaBriefcase } from "react-icons/fa";

export default function NavBar({
  showLogo = true,
  showSearch = true,
  menuItems = [],
  showAuthButtons = true,
  authButtons = null,
}) {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState("freelancer");
  const [showDropdown, setShowDropdown] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    const path = searchType === "freelancer" ? "/freelancer" : "/employer";
    window.location.href = `${path}?search=${searchTerm}`;
  };
  const handleLogoClick = () => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    if (!token) {
      navigate("/"); // Chưa đăng nhập → về trang chủ
    } else if (role === "freelancer") {
      navigate("/freelancer/dashboard"); // Freelancer → Điều hướng đến Dashboard
    } else if (role === "employer") {
      navigate("/employer/dashboard"); // Employer → Điều hướng đến Dashboard
    } else {
      navigate("/"); // Nếu role không hợp lệ → về trang chủ
    }
  };
  return (
    <nav className="bg-white px-4 py-3 sticky top-0 z-30 border-b border-gray-200 shadow-sm">
      <div className="max-w-[1400px] mx-auto flex flex-wrap items-center justify-between">
        {/* Logo */}
        {showLogo && (
          <div className="flex items-center space-x-2">
              <img src="/plain.svg" alt="Logo" className="w-8 h-8" />
              <h1
                onClick={handleLogoClick}
                className="text-xl md:text-2xl font-bold hover:text-green-800 transition duration-200 whitespace-nowrap"
              >
                Freelancer AI
              </h1>
          </div>
        )}

        {/* Searchbar */}
        {showSearch && (
          <form
            onSubmit={handleSearch}
            className="hidden md:flex items-center relative w-full max-w-md mx-6 flex-grow"
          >
            <div className="relative w-full">
              <input
                type="text"
                placeholder={`Tìm kiếm ${
                  searchType === "freelancer" ? "freelancer" : "công việc"
                }...`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-32 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-400 transition text-sm"
              />
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <button
                type="button"
                onClick={() => setShowDropdown((prev) => !prev)}
                className="absolute right-1 top-1 bottom-1 px-3 text-sm bg-gray-100 rounded-full hover:bg-gray-200 transition"
              >
                {searchType === "freelancer" ? "Freelancer" : "Công việc"}
              </button>
              {showDropdown && (
                <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow z-10 text-sm">
                  <button
                    type="button"
                    onClick={() => {
                      setSearchType("freelancer");
                      setShowDropdown(false);
                    }}
                    className="w-full px-4 py-2 hover:bg-gray-100 flex items-center gap-2"
                  >
                    <FaUserTie className="text-green-500" />
                    Freelancer
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setSearchType("job");
                      setShowDropdown(false);
                    }}
                    className="w-full px-4 py-2 hover:bg-gray-100 flex items-center gap-2"
                  >
                    <FaBriefcase className="text-green-500" />
                    Công việc
                  </button>
                </div>
              )}
            </div>
          </form>
        )}

        {/* Desktop Menu + Auth buttons */}
        <div className="hidden md:flex items-center space-x-4">
          {menuItems.map(({ label, path }) => (
            <Link
              key={path}
              to={path}
              className="text-gray-800 hover:text-green-600 px-2 text-sm"
            >
              {label}
            </Link>
          ))}
          {showAuthButtons && authButtons}
        </div>

        {/* Hamburger Icon */}
        <button
          className="md:hidden text-gray-700"
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

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden mt-2 bg-white border-t border-gray-200 py-2 px-4 rounded-b-xl shadow-sm">
          {menuItems.map(({ label, path }) => (
            <Link
              key={path}
              to={path}
              className="block text-gray-800 hover:text-green-700 py-2 border-b last:border-none"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {label}
            </Link>
          ))}
          {showAuthButtons && authButtons && (
            <div className="flex flex-col space-y-2 pt-2">{authButtons}</div>
          )}
        </div>
      )}
    </nav>
  );
}
