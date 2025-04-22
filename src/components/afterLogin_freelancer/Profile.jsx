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
  FaSave,
  FaTimes,
} from "react-icons/fa";

const Profile = () => {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    skills: [],
    experience: "",
    education: [],
    rating: 0,
    completedProjects: 0,
    bio: "",
    avatar: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [newSkill, setNewSkill] = useState("");

  useEffect(() => {
    const loadProfile = () => {
      try {
        const userData = JSON.parse(localStorage.getItem("user"));
        if (userData) {
          setProfile({
            name: userData.fname || "",
            email: userData.email || "",
            phone: userData.phone || "",
            location: userData.location || "",
            skills: userData.skills || [],
            experience: userData.experience || "",
            education: userData.education || [],
            rating: userData.rating || 0,
            completedProjects: userData.completedProjects || 0,
            bio: userData.bio || "",
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

  const handleSkillChange = (index, value) => {
    const newSkills = [...profile.skills];
    newSkills[index] = value;
    setProfile((prev) => ({
      ...prev,
      skills: newSkills,
    }));
  };

  const addSkill = () => {
    if (newSkill.trim()) {
      setProfile((prev) => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()],
      }));
      setNewSkill("");
    }
  };

  const removeSkill = (index) => {
    setProfile((prev) => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index),
    }));
  };

  const handleEducationChange = (index, field, value) => {
    const newEducation = [...profile.education];
    newEducation[index] = {
      ...newEducation[index],
      [field]: value
    };
    setProfile(prev => ({
      ...prev,
      education: newEducation
    }));
  };

  const addEducation = () => {
    setProfile(prev => ({
      ...prev,
      education: [...prev.education, {
        school: '',
        degree: '',
        startDate: '',
        endDate: '',
        description: ''
      }]
    }));
  };

  const removeEducation = (index) => {
    setProfile(prev => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3000/api/freelancer/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(profile)
      });

      if (!response.ok) {
        throw new Error('Cập nhật thất bại');
      }

      const data = await response.json();
      console.log('Server response data:', data);
      
      // Cập nhật localStorage với dữ liệu mới
      const userData = JSON.parse(localStorage.getItem('user'));
      const updatedUserData = {
        ...userData,
        bio: data.data.bio,
        skills: data.data.skills,
        experience: data.data.experience,
        education: data.data.education
      };
      localStorage.setItem('user', JSON.stringify(updatedUserData));
      console.log('Updated localStorage:', JSON.parse(localStorage.getItem('user')));
      
      // Cập nhật state profile với dữ liệu mới
      setProfile(prev => ({
        ...prev,
        bio: data.data.bio,
        skills: data.data.skills,
        experience: data.data.experience,
        education: data.data.education
      }));
      
      setIsEditing(false);
      alert('Cập nhật thành công!');
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
                          console.log("Error loading avatar:", e.target.src);
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
            {/* About */}
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Giới thiệu
              </h2>
              {isEditing ? (
                <textarea
                  name="bio"
                  value={profile.bio}
                  onChange={handleInputChange}
                  className="w-full h-32 p-2 border border-gray-300 rounded-lg focus:border-[#14a800] focus:outline-none"
                  placeholder="Nhập thông tin giới thiệu về bản thân"
                />
              ) : (
                <p className="text-gray-600 text-center sm:text-left">
                  {profile.bio || "Chưa có thông tin giới thiệu"}
                </p>
              )}
            </div>

            {/* Skills */}
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Kỹ năng
              </h2>
              {isEditing ? (
                <div className="space-y-4">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      className="flex-1 p-2 border border-gray-300 rounded-lg focus:border-[#14a800] focus:outline-none"
                      placeholder="Thêm kỹ năng mới"
                    />
                    <button
                      onClick={addSkill}
                      className="bg-[#14a800] text-white px-4 py-2 rounded-lg hover:bg-[#108a00] transition-colors"
                    >
                      Thêm
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {profile.skills.map((skill, index) => (
                      <div key={index} className="flex items-center gap-2 bg-[#14a800]/10 text-[#14a800] px-3 py-1 rounded-full">
                        <input
                          type="text"
                          value={skill}
                          onChange={(e) => handleSkillChange(index, e.target.value)}
                          className="bg-transparent border-none focus:outline-none"
                        />
                        <button
                          onClick={() => removeSkill(index)}
                          className="text-red-500 hover:text-red-600"
                        >
                          <FaTimes />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                  {(profile.skills || []).map((skill, index) => (
                    <span
                      key={index}
                      className="bg-[#14a800]/10 text-[#14a800] px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Experience */}
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Kinh nghiệm
              </h2>
              {isEditing ? (
                <textarea
                  name="experience"
                  value={profile.experience}
                  onChange={handleInputChange}
                  className="w-full h-32 p-2 border border-gray-300 rounded-lg focus:border-[#14a800] focus:outline-none"
                  placeholder="Nhập kinh nghiệm làm việc"
                />
              ) : (
                <div className="prose max-w-none">
                  <p className="text-gray-600 whitespace-pre-line">
                    {profile.experience || "Chưa có kinh nghiệm"}
                  </p>
                </div>
              )}
            </div>

            {/* Education */}
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Học vấn
              </h2>
              {isEditing ? (
                <div className="space-y-4">
                  {(profile.education || []).map((edu, index) => (
                    <div key={index} className="space-y-2">
                      <input
                        type="text"
                        name={`school-${index}`}
                        value={edu.school}
                        onChange={(e) => handleEducationChange(index, 'school', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:border-[#14a800] focus:outline-none"
                        placeholder="Tên trường"
                      />
                      <input
                        type="text"
                        name={`degree-${index}`}
                        value={edu.degree}
                        onChange={(e) => handleEducationChange(index, 'degree', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:border-[#14a800] focus:outline-none"
                        placeholder="Bằng cấp"
                      />
                      <div className="flex gap-2">
                        <div className="flex-1">
                          <label className="block text-sm text-gray-600 mb-1">Ngày bắt đầu</label>
                          <input
                            type="date"
                            name={`startDate-${index}`}
                            value={edu.startDate}
                            onChange={(e) => handleEducationChange(index, 'startDate', e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-lg focus:border-[#14a800] focus:outline-none"
                          />
                        </div>
                        <div className="flex-1">
                          <label className="block text-sm text-gray-600 mb-1">Ngày kết thúc</label>
                          <input
                            type="date"
                            name={`endDate-${index}`}
                            value={edu.endDate}
                            onChange={(e) => handleEducationChange(index, 'endDate', e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-lg focus:border-[#14a800] focus:outline-none"
                          />
                        </div>
                      </div>
                      <textarea
                        name={`description-${index}`}
                        value={edu.description}
                        onChange={(e) => handleEducationChange(index, 'description', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:border-[#14a800] focus:outline-none"
                        placeholder="Mô tả"
                      />
                      <button
                        onClick={() => removeEducation(index)}
                        className="text-red-500 hover:text-red-600"
                      >
                        Xóa
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={addEducation}
                    className="bg-[#14a800] text-white px-4 py-2 rounded-lg hover:bg-[#108a00] transition-colors"
                  >
                    Thêm học vấn
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {(profile.education || []).length > 0 ? (
                    (profile.education || []).map((edu, index) => (
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
                    ))
                  ) : (
                    <p className="text-gray-500 text-center">
                      Chưa có thông tin học vấn
                    </p>
                  )}
                </div>
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
