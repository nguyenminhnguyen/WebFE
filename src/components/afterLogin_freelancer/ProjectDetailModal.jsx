import React from "react";
import {
  FaTimes,
  FaMapMarkerAlt,
  FaClock,
  FaUserFriends,
  FaBriefcase,
  FaDollarSign,
} from "react-icons/fa";

const ProjectDetailModal = ({ job, onClose, onApply, isApplying }) => {
  if (!job) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
            <div className="flex-1">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 break-words">
                {job.title}
              </h2>
              <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-gray-500">
                <span className="flex items-center">
                  <FaMapMarkerAlt className="w-4 h-4 mr-1" />
                  {job.location}
                </span>
                <span className="flex items-center">
                  <FaClock className="w-4 h-4 mr-1" />
                  {new Date(job.createdAt).toLocaleDateString("vi-VN")}
                </span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500 p-2 -m-2"
            >
              <FaTimes className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6">
          {/* Budget and Timeline */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center text-gray-500 mb-2">
                <FaDollarSign className="w-4 h-4 mr-2" />
                <span className="text-sm font-medium">Ngân sách</span>
              </div>
              <p className="text-xl sm:text-2xl font-bold text-[#14a800]">
                {job.minSalary?.toLocaleString()} -{" "}
                {job.maxSalary?.toLocaleString()} USD
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center text-gray-500 mb-2">
                <FaClock className="w-4 h-4 mr-2" />
                <span className="text-sm font-medium">Thời gian dự kiến</span>
              </div>
              <p className="text-xl sm:text-2xl font-bold text-gray-900">
                {job.timeEstimation}
              </p>
            </div>
          </div>

          {/* Description */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Mô tả công việc
            </h3>
            <p className="text-gray-600 whitespace-pre-line break-words">
              {job.description}
            </p>
          </div>

          {/* Skills */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Kỹ năng yêu cầu
            </h3>
            <div className="flex flex-wrap gap-2">
              {job.skills?.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 text-sm text-[#14a800] bg-[#14a800]/10 rounded-full break-words"
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
                <li key={index} className="break-words">
                  {req}
                </li>
              ))}
            </ul>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div className="flex items-center text-gray-600">
              <FaBriefcase className="w-5 h-5 mr-2" />
              <span>Kinh nghiệm: {job.experienceLevel}</span>
            </div>
          </div>

          {/* Status and Dates */}
          <div className="text-sm text-gray-500 mb-6 space-y-1">
            <p>
              Trạng thái:{" "}
              <span
                className={`font-medium ${
                  job.status === "Open" ? "text-green-600" : "text-red-600"
                }`}
              >
                {job.status === "Open" ? "Đang mở" : "Đã đóng"}
              </span>
            </p>
            <p>
              Ngày đăng: {new Date(job.createdAt).toLocaleDateString("vi-VN")}
            </p>
            <p>
              Cập nhật lần cuối:{" "}
              {new Date(job.updatedAt).toLocaleDateString("vi-VN")}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-6 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row justify-end gap-4">
            <button
              onClick={onClose}
              className="w-full sm:w-auto px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Đóng
            </button>
            {job.status === "Open" && (
              <button
                onClick={onApply}
                disabled={isApplying}
                className="w-full sm:w-auto px-6 py-2 bg-[#14a800] text-white rounded-lg hover:bg-[#108a00] transition-colors disabled:bg-gray-400"
              >
                {isApplying ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Đang ứng tuyển...
                  </div>
                ) : (
                  "Ứng tuyển ngay"
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailModal;
