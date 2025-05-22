import React, { useState, useEffect } from "react";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaBuilding,
  FaIndustry,
  FaEdit,
  FaSave,
  FaTimes,
} from "react-icons/fa";

const EmployerProfile = () => {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    companyName: "",
    companySize: "",
    industry: "",
    foundedYear: "",
    website: "",
    description: "",
    avatar: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const loadProfile = () => {
      try {
        const userData = JSON.parse(localStorage.getItem("user"));
        if (userData) {
          setProfile({
            name: userData.fname || "",
            email: userData.email || "",
            phone: userData.phoneNumber || "",
            location: userData.location || "",
            companyName: userData.companyName || "",
            companySize: userData.companySize || "",
            industry: userData.industry || "",
            foundedYear: userData.foundedYear || "",
            website: userData.website || "",
            description: userData.companyDescription || "",
            avatar: userData.avatar || "",
          });
        }
      } catch (err) {
        console.error("Error loading profile:", err);
        setError("Không thể tải thông tin hồ sơ");
      }
    };

    loadProfile();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        "http://localhost:3000/api/employer/profile",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(profile),
        }
      );

      if (!response.ok) {
        throw new Error("Cập nhật thất bại");
      }

      const data = await response.json();
      console.log("Server response data:", data);

      // Update localStorage with new data
      const userData = JSON.parse(localStorage.getItem("user"));
      const updatedUserData = {
        ...userData,
        ...data.data,
      };
      localStorage.setItem("user", JSON.stringify(updatedUserData));

      // Update profile state with new data
      setProfile((prev) => ({
        ...prev,
        ...data.data,
      }));

      setIsEditing(false);
      alert("Cập nhật thành công!");
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Profile Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              {/* Avatar and Basic Info */}
              <div className="flex items-center gap-6 w-full sm:w-auto">
                <div className="relative group">
                  <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-white border-4 border-[#14a800] shadow-sm overflow-hidden transform group-hover:scale-105 transition-all duration-300">
                    {profile.avatar ? (
                      <img
                        src={`http://localhost:3000/${profile.avatar.replace(
                          /\\/g,
                          "/"
                        )}`}
                        alt="Profile"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.style.display = "none";
                          e.target.parentElement.querySelector(
                            ".fallback-icon"
                          ).style.display = "block";
                        }}
                      />
                    ) : null}
                    <FaUser
                      className="w-full h-full text-gray-300 fallback-icon"
                      style={{ display: profile.avatar ? "none" : "block" }}
                    />
                  </div>
                  {isEditing && (
                    <button className="absolute bottom-0 right-0 bg-[#14a800] text-white p-2 rounded-full hover:bg-[#108a00] transition-colors shadow-sm">
                      <FaEdit className="w-4 h-4" />
                    </button>
                  )}
                </div>
                <div className="flex-1">
                  <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                    {profile.companyName}
                  </h1>
                  <div className="mt-3 flex flex-wrap items-center gap-6">
                    <div className="flex items-center text-gray-600 hover:text-[#14a800] transition-colors">
                      <FaMapMarkerAlt className="mr-2 text-[#14a800]" />
                      <span>{profile.location}</span>
                    </div>
                    <div className="flex items-center text-gray-600 hover:text-[#14a800] transition-colors">
                      <FaEnvelope className="mr-2 text-[#14a800]" />
                      <span>{profile.email}</span>
                    </div>
                    <div className="flex items-center text-gray-600 hover:text-[#14a800] transition-colors">
                      <FaPhone className="mr-2 text-[#14a800]" />
                      <span>{profile.phone}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Edit/Save Button */}
              <div className="flex gap-2">
                {isEditing ? (
                  <>
                    <button
                      onClick={handleSubmit}
                      className="bg-[#14a800] text-white px-4 py-2 rounded-lg hover:bg-[#108a00] transition-colors flex items-center gap-2"
                    >
                      <FaSave />
                      Lưu thay đổi
                    </button>
                    <button
                      onClick={() => setIsEditing(false)}
                      className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors flex items-center gap-2"
                    >
                      <FaTimes />
                      Hủy
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="bg-[#14a800] text-white px-4 py-2 rounded-lg hover:bg-[#108a00] transition-colors flex items-center gap-2"
                  >
                    <FaEdit />
                    Chỉnh sửa
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Company Information */}
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Thông tin công ty
              </h2>
              {isEditing ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Tên công ty
                    </label>
                    <input
                      type="text"
                      name="companyName"
                      value={profile.companyName}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:border-[#14a800] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Quy mô công ty
                    </label>
                    <input
                      type="text"
                      name="companySize"
                      value={profile.companySize}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:border-[#14a800] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Ngành nghề
                    </label>
                    <input
                      type="text"
                      name="industry"
                      value={profile.industry}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:border-[#14a800] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Năm thành lập
                    </label>
                    <input
                      type="text"
                      name="foundedYear"
                      value={profile.foundedYear}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:border-[#14a800] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Website
                    </label>
                    <input
                      type="url"
                      name="website"
                      value={profile.website}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:border-[#14a800] focus:outline-none"
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <FaBuilding className="text-[#14a800]" />
                    <span className="font-medium">Tên công ty:</span>
                    <span>{profile.companyName || "Chưa cập nhật"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaIndustry className="text-[#14a800]" />
                    <span className="font-medium">Quy mô:</span>
                    <span>{profile.companySize || "Chưa cập nhật"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaIndustry className="text-[#14a800]" />
                    <span className="font-medium">Ngành nghề:</span>
                    <span>{profile.industry || "Chưa cập nhật"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaIndustry className="text-[#14a800]" />
                    <span className="font-medium">Năm thành lập:</span>
                    <span>{profile.foundedYear || "Chưa cập nhật"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaIndustry className="text-[#14a800]" />
                    <span className="font-medium">Website:</span>
                    <a
                      href={profile.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#14a800] hover:underline"
                    >
                      {profile.website || "Chưa cập nhật"}
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* Company Description */}
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Giới thiệu công ty
              </h2>
              {isEditing ? (
                <textarea
                  name="description"
                  value={profile.description}
                  onChange={handleInputChange}
                  className="w-full h-32 p-2 border border-gray-300 rounded-lg focus:border-[#14a800] focus:outline-none"
                  placeholder="Nhập thông tin giới thiệu về công ty"
                />
              ) : (
                <p className="text-gray-600">
                  {profile.description || "Chưa có thông tin giới thiệu"}
                </p>
              )}
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Company Status */}
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Trạng thái
              </h2>
              <div className="flex items-center justify-center gap-2">
                <div className="w-3 h-3 bg-[#14a800] rounded-full"></div>
                <span className="text-gray-600">Đang tuyển dụng</span>
              </div>
            </div>

            {/* Posted Jobs */}
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Việc làm đã đăng
              </h2>
              <div className="text-2xl font-bold text-[#14a800] text-center">
                0
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployerProfile;
