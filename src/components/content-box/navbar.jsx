import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaSearch, FaUserTie, FaBriefcase } from "react-icons/fa";
import Login from "../auth/login";
import Register from "../auth/register";

function NavBar() {
  const location = useLocation();
  const isAuthPage = ["/register", "/login"].some((path) =>
    location.pathname.startsWith(path)
  );

  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState("freelancer"); // or 'job'
  const [showDropdown, setShowDropdown] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchType === "freelancer") {
      window.location.href = `/freelancer?search=${searchTerm}`;
    } else {
      window.location.href = `/jobs?search=${searchTerm}`;
    }
  };

  return (
    <nav className="bg-white px-4 py-3 flex flex-col md:flex-row md:justify-between md:items-center sticky top-0 z-50 border-b border-gray-200 shadow-sm space-y-3 md:space-y-0">
      {/* Logo + Menu */}
      <div className="flex items-center justify-between md:space-x-6 w-full md:w-auto">
        <Link to="/" className="flex items-center space-x-2">
          {/* 👇 Thay hình ảnh logo tại đây */}
          <img src="/plain.svg" alt="Logo" className="w-8 h-8" />
          <h1 className="text-xl md:text-2xl font-bold hover:text-green-800 transition duration-200">
            Freelancer AI
          </h1>
        </Link>

        {/* Mobile search hidden toggle (optional) */}
      </div>

      {/* Search bar */}
      {!isAuthPage && (
        <form
          onSubmit={handleSearch}
          className="relative flex items-center w-full md:max-w-md"
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

            {/* Dropdown Trigger */}
            <button
              type="button"
              onClick={() => setShowDropdown((prev) => !prev)}
              className="absolute right-1 top-1 bottom-1 px-3 text-sm bg-gray-100 rounded-full hover:bg-gray-200 transition"
            >
              {searchType === "freelancer" ? "Freelancer" : "Công việc"}
            </button>

            {/* Dropdown List */}
            {showDropdown && (
              <div
                className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow z-10 overflow-hidden text-sm
               transition-all duration-200 ease-out transform origin-top scale-95 opacity-0 animate-dropdown"
              >
                <button
                  type="button"
                  className="w-full px-4 py-2 hover:bg-gray-100 flex items-center gap-2"
                  onClick={() => {
                    setSearchType("freelancer");
                    setShowDropdown(false);
                  }}
                >
                  <FaUserTie className="text-green-500" />
                  Freelancer
                </button>
                <button
                  type="button"
                  className="w-full px-4 py-2 hover:bg-gray-100 flex items-center gap-2"
                  onClick={() => {
                    setSearchType("job");
                    setShowDropdown(false);
                  }}
                >
                  <FaBriefcase className="text-green-500" />
                  Công việc
                </button>
              </div>
            )}
          </div>
        </form>
      )}

      {/* Menu */}
      {!isAuthPage && (
        <div className="flex items-center justify-between w-full md:w-auto space-x-4">
          <ul className="hidden md:flex space-x-4 text-sm md:text-base">
            {[
              { label: "Trang chủ", path: "/" },
              { label: "Dự án", path: "/project" },
              { label: "Freelancer", path: "/freelancer" },
            ].map(({ label, path }) => (
              <li key={path}>
                <Link
                  to={path}
                  className="group relative text-gray-800 hover:text-green-700 px-2 py-1 transition duration-200"
                >
                  <span className="relative inline-block">
                    {label}
                    <span className="absolute left-1/2 bottom-0 h-[2px] w-0 bg-green-500 transition-all duration-300 ease-out group-hover:left-0 group-hover:w-1/2" />
                    <span className="absolute right-1/2 bottom-0 h-[2px] w-0 bg-green-500 transition-all duration-300 ease-out group-hover:right-0 group-hover:w-1/2" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          {/* Auth buttons */}
          <div className="flex items-center space-x-2 md:space-x-4">
            <Login />
            <Register />
          </div>
        </div>
      )}
    </nav>
  );
}

export default NavBar;
