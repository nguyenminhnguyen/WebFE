import React from "react";
import {
  FaTimes,
  FaMapMarkerAlt,
  FaClock,
  FaUserFriends,
  FaStar,
  FaDollarSign,
  FaCheck,
} from "react-icons/fa";

const ProjectDetailModal = ({ job, onClose, onApply, isApplying }) => {
  if (!job) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-3xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{job.title}</h2>
              <div className="mt-2 flex items-center space-x-4 text-sm text-gray-500">
                <span className="flex items-center">
                  <FaMapMarkerAlt className="w-4 h-4 mr-1" />
                  {job.location}
                </span>
                <span className="flex items-center">
                  <FaClock className="w-4 h-4 mr-1" />
                  {new Date(job.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <FaTimes className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Budget and Timeline */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center text-gray-500 mb-2">
                <FaDollarSign className="w-4 h-4 mr-2" />
                <span className="text-sm font-medium">Ngân sách</span>
              </div>
              <p className="text-2xl font-bold text-[#14a800]">
                ${job.salary ? job.salary.toLocaleString() : "N/A"}
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center text-gray-500 mb-2">
                <FaClock className="w-4 h-4 mr-2" />
                <span className="text-sm font-medium">Thời gian</span>
              </div>
              <p className="text-2xl font-bold text-gray-900">
                {job.duration || "Không xác định"}
              </p>
            </div>
          </div>

          {/* Description */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Mô tả công việc
            </h3>
            <p className="text-gray-600 whitespace-pre-line">
              {job.description}
            </p>
          </div>

          {/* Skills */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Kỹ năng yêu cầu
            </h3>
            <div className="flex flex-wrap gap-2">
              {(Array.isArray(job.skills)
                ? job.skills
                : [job.skills].filter(Boolean)
              ).map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 text-sm text-[#14a800] bg-[#14a800]/10 rounded-full"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Requirements */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Thông tin công việc
            </h3>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              {job.requirements?.map((req, index) => (
                <li key={index}>{req}</li>
              ))}
            </ul>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="flex items-center text-gray-600">
              <FaUserFriends className="w-5 h-5 mr-2" />
              <span>{job.appliedCount || 0} ứng viên</span>
            </div>
            <div className="flex items-center text-gray-600">
              <FaStar className="w-5 h-5 mr-2" />
              <span>{job.experienceLevel}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <FaClock className="w-5 h-5 mr-2" />
              <span>{job.estimatedHours || "Không xác định"} giờ</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200">
          <div className="flex justify-end space-x-4">
            <button
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Đóng
            </button>
            <button
              onClick={onApply}
              disabled={job.hasApplied || isApplying}
              className={`px-6 py-2 rounded-lg transition-colors ${
                job.hasApplied
                  ? "bg-gray-100 text-gray-500 cursor-not-allowed"
                  : "bg-[#14a800] text-white hover:bg-[#108a00]"
              }`}
            >
              {isApplying ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Đang ứng tuyển...
                </div>
              ) : job.hasApplied ? (
                <div className="flex items-center">
                  <FaCheck className="mr-2" />
                  Đã ứng tuyển
                </div>
              ) : (
                "Ứng tuyển ngay"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailModal;
