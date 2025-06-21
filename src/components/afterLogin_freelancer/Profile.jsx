import React, { useState, useEffect, useRef } from "react";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaEdit,
  FaSave,
  FaTimes,
  FaCamera,
  FaFilePdf,
} from "react-icons/fa";
import { toast } from "react-toastify";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

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
    avatarUrl: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [newSkill, setNewSkill] = useState("");

  const [selectedAvatarFile, setSelectedAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [avatarError, setAvatarError] = useState("");
  const profileRef = useRef(null);

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
            avatarUrl: userData.avatar || "",
          });
          if (userData.avatar) {
            setAvatarPreview(
              `https://findwork-backend.onrender.com/${userData.avatar.replace(
                /\\/g,
                "/"
              )}`
            );
          }
        }
      } catch (err) {
        console.error("Error loading profile:", err);
        setError("Không thể tải thông tin hồ sơ");
        toast.error("Không thể tải thông tin hồ sơ");
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
    setProfile((prev) => ({ ...prev, skills: newSkills }));
  };

  const handleAddSkill = () => {
    if (newSkill.trim() && !profile.skills.includes(newSkill.trim())) {
      setProfile((prev) => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()],
      }));
      setNewSkill("");
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setProfile((prev) => ({
      ...prev,
      skills: prev.skills.filter((skill) => skill !== skillToRemove),
    }));
  };

  const handleAvatarFileChange = (e) => {
    const file = e.target.files[0];
    setAvatarError("");

    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setAvatarError("Kích thước ảnh không được vượt quá 5MB");
        setSelectedAvatarFile(null);
        setAvatarPreview(null);
        return;
      }

      const validTypes = ["image/jpeg", "image/png", "image/jpg"];
      if (!validTypes.includes(file.type.toLowerCase())) {
        setAvatarError("Chỉ chấp nhận file ảnh định dạng JPG, JPEG hoặc PNG");
        setSelectedAvatarFile(null);
        setAvatarPreview(null);
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);

      setSelectedAvatarFile(file);
    } else {
      setSelectedAvatarFile(null);
      setAvatarPreview(
        profile.avatarUrl
          ? `http://https://findwork-backend.onrender.com:3000/${profile.avatarUrl.replace(
              /\\/g,
              "/"
            )}`
          : null
      );
    }
  };

  const handleRemoveSelectedAvatar = () => {
    setSelectedAvatarFile(null);
    setAvatarPreview(
      profile.avatarUrl
        ? `http://https://findwork-backend.onrender.com:3000/${profile.avatarUrl.replace(
            /\\/g,
            "/"
          )}`
        : null
    );
    setAvatarError("");
  };

  const handleEducationChange = (index, field, value) => {
    const newEducation = [...profile.education];
    newEducation[index] = {
      ...newEducation[index],
      [field]: value,
    };
    setProfile((prev) => ({
      ...prev,
      education: newEducation,
    }));
  };

  const addEducation = () => {
    setProfile((prev) => ({
      ...prev,
      education: [
        ...prev.education,
        {
          school: "",
          degree: "",
          startDate: "",
          endDate: "",
          description: "",
        },
      ],
    }));
  };

  const removeEducation = (index) => {
    setProfile((prev) => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index),
    }));
  };

  const handleExportPDF = () => {
    if (!profileRef.current) return;

    const buttonsContainer = profileRef.current.querySelector(
      ".action-buttons-container"
    );
    if (buttonsContainer) {
      buttonsContainer.style.display = "none";
    }

    toast.info("Đang xuất CV của bạn ra PDF...");

    html2canvas(profileRef.current, {
      useCORS: true,
      scale: 2,
    })
      .then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4");
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();

        const imgProps = pdf.getImageProperties(imgData);
        const imgWidth = pdfWidth;
        const imgHeight = (imgProps.height * imgWidth) / imgProps.width;

        let heightLeft = imgHeight;
        let position = 0;

        // Thêm trang đầu tiên
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pdfHeight;

        // Thêm các trang tiếp theo nếu cần
        while (heightLeft > 0) {
          position -= pdfHeight;
          pdf.addPage();
          pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
          heightLeft -= pdfHeight;
        }

        pdf.save(`CV-${profile.name}.pdf`);
        toast.success("Xuất PDF thành công!");
      })
      .catch((err) => {
        console.error("Lỗi khi xuất PDF:", err);
        toast.error("Có lỗi xảy ra khi xuất PDF.");
      })
      .finally(() => {
        // Đảm bảo các nút được hiển thị lại
        if (buttonsContainer) {
          buttonsContainer.style.display = "flex";
        }
      });
  };

  const handleSave = async () => {
    setLoading(true);
    setError(null);

    try {
      const formDataToSend = new FormData();

      Object.keys(profile).forEach((key) => {
        if (
          key !== "avatarUrl" &&
          key !== "skills" &&
          key !== "education" &&
          key !== "rating" &&
          key !== "completedProjects"
        ) {
          if (profile[key] !== null && profile[key] !== undefined) {
            if (
              key === "location" &&
              typeof profile[key] === "object" &&
              profile[key] !== null
            ) {
              formDataToSend.append(key, profile[key].label);
            } else {
              formDataToSend.append(key, profile[key]);
            }
          }
        }
      });

      (profile.skills || []).forEach((skill, index) => {
        formDataToSend.append(`skills[${index}]`, skill || "");
      });

      (profile.education || []).forEach((edu, index) => {
        formDataToSend.append(`education[${index}][school]`, edu.school || "");
        formDataToSend.append(`education[${index}][degree]`, edu.degree || "");
        formDataToSend.append(
          `education[${index}][startDate]`,
          edu.startDate || ""
        );
        formDataToSend.append(
          `education[${index}][endDate]`,
          edu.endDate || ""
        );
        formDataToSend.append(
          `education[${index}][description]`,
          edu.description || ""
        );
      });

      if (selectedAvatarFile) {
        formDataToSend.append("avatar", selectedAvatarFile);
      }

      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Không tìm thấy token xác thực.");
      }

      const response = await fetch(
        "https://findwork-backend.onrender.com/api/freelancer/profile",
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formDataToSend,
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || data.error || "Cập nhật hồ sơ thất bại!"
        );
      }

      if (data.profile) {
        const updatedProfileData = data.profile;
        setProfile((prev) => ({
          ...prev,
          ...updatedProfileData,
          avatarUrl: updatedProfileData.avatar || prev.avatarUrl,
        }));

        if (
          updatedProfileData.avatar &&
          updatedProfileData.avatar !== profile.avatarUrl
        ) {
          setAvatarPreview(
            `http://https://findwork-backend.onrender.com:3000/${updatedProfileData.avatar.replace(
              /\\/g,
              "/"
            )}`
          );
        }
        setSelectedAvatarFile(null);

        const userData = JSON.parse(localStorage.getItem("user"));
        if (userData) {
          const updatedUserData = {
            ...userData,
            ...updatedProfileData,
            avatar: updatedProfileData.avatar || userData.avatar,
          };
          localStorage.setItem("user", JSON.stringify(updatedUserData));
        }
      } else if (data.avatarUrl) {
        setProfile((prev) => ({ ...prev, avatarUrl: data.avatarUrl }));
        setAvatarPreview(
          `https://findwork-backend.onrender.com/${data.avatarUrl.replace(
            /\\/g,
            "/"
          )}`
        );
        setSelectedAvatarFile(null);
      }

      setIsEditing(false);
      toast.success("Cập nhật hồ sơ thành công!");
    } catch (err) {
      console.error("Error saving profile:", err);
      setError(err.message || "Đã xảy ra lỗi khi cập nhật hồ sơ.");
      toast.error(err.message || "Đã xảy ra lỗi khi cập nhật hồ sơ.");
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
    <div className="min-h-screen bg-gray-50" ref={profileRef}>
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6 sm:py-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 w-full sm:w-auto">
                <div className="relative group">
                  <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-white border-4 border-[#14a800] shadow-sm overflow-hidden transform group-hover:scale-105 transition-all duration-300 flex items-center justify-center">
                    {avatarPreview ? (
                      <img
                        src={avatarPreview}
                        alt="Profile Preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <FaUser className="w-full h-full text-gray-300" />
                    )}
                    {isEditing && (
                      <label
                        htmlFor="avatarUpload"
                        className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <FaCamera className="w-6 h-6 text-white" />
                        <input
                          id="avatarUpload"
                          type="file"
                          className="hidden"
                          accept="image/png, image/jpeg, image/jpg"
                          onChange={handleAvatarFileChange}
                        />
                      </label>
                    )}
                  </div>
                  {isEditing && selectedAvatarFile && (
                    <button
                      type="button"
                      onClick={handleRemoveSelectedAvatar}
                      className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition"
                    >
                      <FaTimes className="w-4 h-4" />
                    </button>
                  )}
                </div>
                {isEditing && avatarError && (
                  <p className="text-red-500 text-sm mt-2">{avatarError}</p>
                )}
                <div className="flex-1 text-center sm:text-left">
                  <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                    {profile.name}
                  </h1>
                  <div className="mt-3 flex flex-col sm:flex-row flex-wrap items-center sm:items-start gap-4 sm:gap-6">
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

              <div className="flex gap-2 w-full sm:w-auto action-buttons-container">
                {isEditing ? (
                  <button
                    onClick={handleSave}
                    disabled={loading}
                    className="flex-1 sm:flex-none bg-[#14a800] text-white px-4 py-2 rounded-lg hover:bg-[#108a00] transition-colors flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      "Đang lưu..."
                    ) : (
                      <>
                        <FaSave /> Lưu
                      </>
                    )}
                  </button>
                ) : (
                  <>
                    <button
                      onClick={() => setIsEditing(true)}
                      className="w-full sm:w-auto bg-[#14a800] text-white px-4 py-2 rounded-lg hover:bg-[#108a00] transition-colors flex items-center justify-center gap-2"
                    >
                      <FaEdit />
                      Chỉnh sửa
                    </button>
                    <button
                      onClick={handleExportPDF}
                      className="w-full sm:w-auto bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
                    >
                      <FaFilePdf className="mr-2" />
                      Xuất PDF
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 border border-gray-200">
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

            <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Kỹ năng
              </h2>
              {isEditing ? (
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row gap-2">
                    <input
                      type="text"
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      className="flex-1 p-2 border border-gray-300 rounded-lg focus:border-[#14a800] focus:outline-none"
                      placeholder="Thêm kỹ năng mới"
                    />
                    <button
                      onClick={handleAddSkill}
                      className="bg-[#14a800] text-white px-4 py-2 rounded-lg hover:bg-[#108a00] transition-colors"
                    >
                      Thêm
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {profile.skills.map((skill, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 bg-[#14a800]/10 text-[#14a800] px-3 py-1 rounded-full"
                      >
                        <input
                          type="text"
                          value={skill}
                          onChange={(e) =>
                            handleSkillChange(index, e.target.value)
                          }
                          className="bg-transparent border-none focus:outline-none"
                        />
                        <button
                          onClick={() => handleRemoveSkill(skill)}
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

            <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 border border-gray-200">
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

            <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 border border-gray-200">
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
                        value={edu.school || ""}
                        onChange={(e) =>
                          handleEducationChange(index, "school", e.target.value)
                        }
                        className="w-full p-2 border border-gray-300 rounded-lg focus:border-[#14a800] focus:outline-none"
                        placeholder="Tên trường"
                      />
                      <input
                        type="text"
                        name={`degree-${index}`}
                        value={edu.degree || ""}
                        onChange={(e) =>
                          handleEducationChange(index, "degree", e.target.value)
                        }
                        className="w-full p-2 border border-gray-300 rounded-lg focus:border-[#14a800] focus:outline-none"
                        placeholder="Bằng cấp"
                      />
                      <div className="flex flex-col sm:flex-row gap-2">
                        <div className="flex-1">
                          <label className="block text-sm text-gray-600 mb-1">
                            Ngày bắt đầu
                          </label>
                          <input
                            type="date"
                            name={`startDate-${index}`}
                            value={edu.startDate || ""}
                            onChange={(e) =>
                              handleEducationChange(
                                index,
                                "startDate",
                                e.target.value
                              )
                            }
                            className="w-full p-2 border border-gray-300 rounded-lg focus:border-[#14a800] focus:outline-none"
                          />
                        </div>
                        <div className="flex-1">
                          <label className="block text-sm text-gray-600 mb-1">
                            Ngày kết thúc
                          </label>
                          <input
                            type="date"
                            name={`endDate-${index}`}
                            value={edu.endDate || ""}
                            onChange={(e) =>
                              handleEducationChange(
                                index,
                                "endDate",
                                e.target.value
                              )
                            }
                            className="w-full p-2 border border-gray-300 rounded-lg focus:border-[#14a800] focus:outline-none"
                          />
                        </div>
                      </div>
                      <textarea
                        name={`description-${index}`}
                        value={edu.description || ""}
                        onChange={(e) =>
                          handleEducationChange(
                            index,
                            "description",
                            e.target.value
                          )
                        }
                        className="w-full h-24 p-2 border border-gray-300 rounded-lg focus:border-[#14a800] focus:outline-none"
                        placeholder="Mô tả"
                      />
                      <button
                        type="button"
                        onClick={() => removeEducation(index)}
                        className="text-red-500 hover:text-red-600"
                      >
                        Xóa
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addEducation}
                    className="w-full sm:w-auto bg-[#14a800] text-white px-4 py-2 rounded-lg hover:bg-[#108a00] transition-colors"
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
                          {edu.school || "Chưa có thông tin trường"}
                        </h3>
                        <p className="text-[#14a800]">
                          {edu.degree || "Chưa có thông tin bằng cấp"}
                        </p>
                        <p className="text-sm text-gray-500">
                          {edu.startDate || "Không rõ"} -{" "}
                          {edu.endDate || "Hiện tại"}
                        </p>
                        <p className="mt-2 text-gray-600">
                          {edu.description || "Chưa có mô tả"}
                        </p>
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

          <div className="space-y-8">
            <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Tình trạng
              </h2>
              <div className="flex items-center justify-center gap-2">
                <div className="w-3 h-3 bg-[#14a800] rounded-full"></div>
                <span className="text-gray-600">Đang tìm việc</span>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 border border-gray-200">
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
