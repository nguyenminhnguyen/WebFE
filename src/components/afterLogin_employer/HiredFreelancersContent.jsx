import React from "react";

const HiredFreelancersContent = ({ proposals, setSelectedProposal, setShowModal, job }) => {
  // Lọc các proposal đã được chấp nhận
  const acceptedProposals = proposals.filter(p => p.status === "accepted");

  return (
    <div className="bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mt-12 ml-5 mb-6">Freelancer đã thuê</h2>
      {acceptedProposals.length === 0 ? (
        <p className="text-gray-600 text-center">Chưa có freelancer nào được thuê</p>
      ) : (
        <div className="space-y-4">
          {acceptedProposals.map((proposal) => (
            <div
              key={proposal.id}
              className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-start gap-4">
                <div className="w-20 h-20 rounded-full bg-white border-2 border-[#14a800] shadow-sm overflow-hidden">
                  {proposal.freelancer.avatar ? (
                    <img
                      src={`http://localhost:3000/${proposal.freelancer.avatar.replace(
                        /\\/g,
                        "/"
                      )}`}
                      alt={proposal.freelancer.name}
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
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold">
                        {proposal.freelancer.fname}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {proposal.freelancer.location || "Không có địa chỉ"}
                      </p>
                    </div>
                    <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                      Đã chấp nhận
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 mt-2 line-clamp-2">
                  {proposal.proposalText || "Chưa có đề xuất"}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {proposal.freelancer.skills
                      .slice(0, 3)
                      .map((skill, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-green-100 text-gray-600 rounded-full text-sm"
                        >
                          {skill}
                        </span>
                      ))}
                    {proposal.freelancer.skills.length > 3 && (
                      <span className="text-xs text-gray-500">
                        +{proposal.freelancer.skills.length - 3}
                      </span>
                    )}
                  </div>
                  <div className="flex justify-end space-x-2 mt-3">
                    <button
                      onClick={() => {
                        setSelectedProposal({...proposal, source: 'hired'});
                        setShowModal(true);
                      }}
                      className="px-3 py-1 text-sm font-medium border-2 border-green-700 text-green-700 rounded-full hover:bg-gray-50"
                    >
                      Xem chi tiết
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        // Xử lý logic gửi tin nhắn
                      }}
                      className="px-3 py-1 text-sm font-medium bg-green-600 text-white rounded-full hover:bg-green-700"
                    >
                      Nhắn tin
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HiredFreelancersContent; 