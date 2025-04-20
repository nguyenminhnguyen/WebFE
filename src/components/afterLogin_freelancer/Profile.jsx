import React, { useState, useEffect } from "react";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaBriefcase,
  FaGraduationCap,
  FaStar,
  FaEdit,
} from "react-icons/fa";
import { getFreelancerProfile } from "../../api/freelancer";

const Profile = () => {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    skills: [],
    experience: [],
    education: [],
    rating: 0,
    completedProjects: 0,
    bio: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const freelancerId = "67f2baeaf02bec90fc68a766"; // ID của freelancer cần lấy hồ sơ
        console.log("Fetching profile for freelancerId:", freelancerId);
        const response = await getFreelancerProfile(freelancerId);

        if (response.data) {
          // Kiểm tra cấu trúc dữ liệu
          const profileData = {
            name: response.data.fullName || "",
            email: response.data.email || "",
            phone: response.data.phone || "",
            location: response.data.address || "",
            skills: response.data.skills || [],
            experience: response.data.experience || [],
            education: response.data.education || [],
            rating: response.data.rating || 0,
            completedProjects: response.data.completedProjects || 0,
            bio: response.data.bio || "",
          };
          console.log("Processed profile data:", profileData);
          console.log("email:", response.data.email);
          console.log("email:", response);
          setProfile(profileData);
          setError(null);
        } else {
          throw new Error("Không có dữ liệu profile");
        }
      } catch (err) {
        console.error("Error fetching profile:", err);
        setError("Không thể tải thông tin hồ sơ");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSkillChange = (index, value) => {
    const newSkills = [...profile.skills];
    newSkills[index] = value;
    setProfile((prev) => ({
      ...prev,
      skills: newSkills,
    }));
  };

  const addSkill = () => {
    setProfile((prev) => ({
      ...prev,
      skills: [...prev.skills, ""],
    }));
  };

  const removeSkill = (index) => {
    setProfile((prev) => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // TODO: Implement update profile API call
      setIsEditing(false);
    } catch (err) {
      console.error(err);
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
                    <FaUser className="w-full h-full text-gray-300" />
                  </div>
                  <button className="absolute bottom-0 right-0 bg-[#14a800] text-white p-2 rounded-full hover:bg-[#108a00] transition-colors shadow-sm">
                    <FaEdit className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex-1">
                  <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                    {profile.name}
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

              {/* Stats */}
              <div className="flex flex-wrap gap-4 w-full sm:w-auto justify-center sm:justify-end">
                <div className="bg-gray-50 rounded-lg p-4 w-[140px] text-center border border-gray-200">
                  <div className="text-gray-500 text-sm font-medium">
                    Đánh giá
                  </div>
                  <div className="text-2xl font-bold text-gray-900">
                    {profile.rating}
                  </div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 w-[140px] text-center border border-gray-200">
                  <div className="text-gray-500 text-sm font-medium">
                    Dự án đã hoàn thành
                  </div>
                  <div className="text-2xl font-bold text-gray-900">
                    {profile.completedProjects}
                  </div>
                </div>
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
            {/* About */}
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Giới thiệu
              </h2>
              <p className="text-gray-600 text-center sm:text-left">
                {profile.bio || "Chưa có thông tin giới thiệu"}
              </p>
            </div>

            {/* Skills */}
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Kỹ năng
              </h2>
              <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                {profile.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-[#14a800]/10 text-[#14a800] px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Experience */}
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Kinh nghiệm
              </h2>
              {profile.experience && profile.experience.length > 0 ? (
                <div className="space-y-6">
                  {profile.experience.map((exp, index) => (
                    <div
                      key={index}
                      className="border-l-4 border-[#14a800] pl-4"
                    >
                      <h3 className="text-lg font-semibold text-gray-900">
                        {exp.title}
                      </h3>
                      <p className="text-[#14a800]">{exp.company}</p>
                      <p className="text-sm text-gray-500">
                        {exp.startDate} - {exp.endDate || "Hiện tại"}
                      </p>
                      <p className="mt-2 text-gray-600">{exp.description}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center">Chưa có kinh nghiệm</p>
              )}
            </div>

            {/* Education */}
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Học vấn
              </h2>
              {profile.education && profile.education.length > 0 ? (
                <div className="space-y-6">
                  {profile.education.map((edu, index) => (
                    <div
                      key={index}
                      className="border-l-4 border-[#14a800] pl-4"
                    >
                      <h3 className="text-lg font-semibold text-gray-900">
                        {edu.school}
                      </h3>
                      <p className="text-[#14a800]">{edu.degree}</p>
                      <p className="text-sm text-gray-500">
                        {edu.startDate} - {edu.endDate || "Hiện tại"}
                      </p>
                      <p className="mt-2 text-gray-600">{edu.description}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center">
                  Chưa có thông tin học vấn
                </p>
              )}
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Availability */}
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Tình trạng
              </h2>
              <div className="flex items-center justify-center gap-2">
                <div className="w-3 h-3 bg-[#14a800] rounded-full"></div>
                <span className="text-gray-600">Đang tìm việc</span>
              </div>
            </div>

            {/* Languages */}
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Ngôn ngữ
              </h2>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Tiếng Việt</span>
                  <span className="text-gray-500">Bản ngữ</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Tiếng Anh</span>
                  <span className="text-gray-500">Thành thạo</span>
                </div>
              </div>
            </div>

            {/* Hourly Rate */}
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Mức lương
              </h2>
              <div className="text-2xl font-bold text-[#14a800] text-center">
                $20 - $30 / giờ
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
