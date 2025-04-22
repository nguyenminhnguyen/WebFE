import React from "react";

const FreelancerDetailModal = ({ 
  selectedProposal, 
  setShowModal, 
  handleProposalAction 
}) => {
  return (
    <div className="fixed inset-y-0 right-0 w-1/2 bg-white shadow-xl transform transition-transform duration-300 z-50 overflow-hidden">
      <div className="h-full overflow-y-auto">
        <div className="p-8">
          <div className="flex justify-between items-start mb-8">
            <h2 className="text-2xl font-bold">Thông tin chi tiết</h2>
            <button
              onClick={() => setShowModal(false)}
              className="text-gray-500 hover:text-gray-700"
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
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="space-y-8 max-w-2xl mx-auto">
            {/* Thông tin cơ bản */}
            <div className="flex items-center gap-6">
              <div className="relative group">
                <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-white border-4 border-[#14a800] shadow-sm overflow-hidden transform group-hover:scale-105 transition-all duration-300">
                  {selectedProposal.freelancer.avatar ? (
                    <img
                      src={`http://localhost:3000/${selectedProposal.freelancer.avatar.replace(
                        /\\/g,
                        "/"
                      )}`}
                      alt={selectedProposal.freelancer.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.style.display = "none";
                        e.target.parentElement.innerHTML =
                          '<svg class="w-full h-full text-gray-300" fill="currentColor" viewBox="0 0 24 24"><path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" /></svg>';
                      }}
                    />
                  ) : (
                    <svg
                      className="w-full h-full text-gray-300"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  )}
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold">
                  {selectedProposal.freelancer.fname}
                </h3>
                <p className="text-gray-600">
                  {selectedProposal.freelancer.location}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex items-center">
                    <svg
                      className="w-4 h-4 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="ml-1 text-sm font-medium">
                      {selectedProposal.freelancer.rating || 0}
                    </span>
                  </div>
                  <span className="text-gray-400">•</span>
                  <span className="text-sm text-gray-600">
                    {selectedProposal.freelancer.completedProjects || 0} dự án hoàn thành
                  </span>
                </div>
              </div>
            </div>

            {/* Thông tin liên hệ */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-semibold mb-3">Thông tin liên hệ</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <svg
                    className="w-4 h-4 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <span className="text-sm">
                    {selectedProposal.freelancer.email}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <svg
                    className="w-4 h-4 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  <span className="text-sm">
                    {selectedProposal.freelancer.phone}
                  </span>
                </div>
              </div>
            </div>

            {/* Giới thiệu */}
            <div>
              <h4 className="font-semibold mb-2">Giới thiệu</h4>
              <p className="text-gray-700 whitespace-pre-line">
                {selectedProposal.freelancer.bio}
              </p>
            </div>

            {/* Kỹ năng */}
            <div>
              <h4 className="font-semibold mb-2">Kỹ năng</h4>
              <div className="flex flex-wrap gap-2">
                {selectedProposal.freelancer.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Kinh nghiệm */}
            <div>
              <h4 className="font-semibold mb-2">Kinh nghiệm</h4>
              <p className="text-gray-700 whitespace-pre-line">
                {selectedProposal.freelancer.experience}
              </p>
            </div>

            {/* Học vấn */}
            <div>
              <h4 className="font-semibold mb-2">Học vấn</h4>
              <div className="space-y-4">
                {selectedProposal.freelancer.education.map((edu, index) => (
                  <div
                    key={index}
                    className="border-l-2 border-gray-200 pl-4"
                  >
                    <h5 className="font-medium">{edu.school}</h5>
                    <p className="text-sm text-gray-600">{edu.degree}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(edu.startDate).toLocaleDateString("vi-VN")}{" "}
                      -
                      {edu.endDate
                        ? new Date(edu.endDate).toLocaleDateString("vi-VN")
                        : "Hiện tại"}
                    </p>
                    {edu.description && (
                      <p className="text-sm text-gray-700 mt-1">
                        {edu.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Đề xuất - Chỉ hiển thị khi xem từ tab proposals */}
            {selectedProposal.source === "proposals" && (
              <div className="bg-green-50 rounded-lg p-4">
                <h4 className="font-semibold mb-2">
                  Đề xuất cho công việc này
                </h4>
                <p className="text-gray-700 whitespace-pre-line mb-3">
                  {selectedProposal.proposalText}
                </p>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-600">Giá thầu</p>
                    <p className="text-xl font-semibold text-green-600">
                      {selectedProposal.bidAmount.toLocaleString()} USD
                    </p>
                  </div>
                  <div className="text-sm text-gray-500">
                    Nộp đơn:{" "}
                    {new Date(selectedProposal.appliedAt).toLocaleDateString(
                      "vi-VN"
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Nút hành động */}
            <div className="flex space-x-3 pt-4 border-t">
              <button className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
                Nhắn tin
              </button>
              {selectedProposal.source === "proposals" && selectedProposal.status === "pending" && (
                <>
                  <button
                    onClick={() =>
                      handleProposalAction(selectedProposal.id, "accepted")
                    }
                    className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                  >
                    Chấp nhận
                  </button>
                  <button
                    onClick={() =>
                      handleProposalAction(selectedProposal.id, "rejected")
                    }
                    className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                  >
                    Từ chối
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FreelancerDetailModal; 