import React from "react";

const ViewProposalsContent = ({ 
  proposals, 
  loadingProposals, 
  setSelectedProposal, 
  setShowModal, 
  handleProposalAction 
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md relative">
      <h2 className="text-xl font-bold mt-12 ml-5 mb-6">Yêu cầu ứng tuyển</h2>
      {loadingProposals ? (
        <p className="text-center">Đang tải danh sách yêu cầu...</p>
      ) : !Array.isArray(proposals) || proposals.length === 0 ? (
        <p className="text-gray-600 text-center">
          Chưa có yêu cầu ứng tuyển nào
        </p>
      ) : (
        <div className="space-y-4">
          {proposals.map((proposal) => (
            <div
              key={proposal._id}
              className="border rounded-lg p-4 hover:bg-gray-100 transition-colors cursor-pointer"
              onClick={() => {
                setSelectedProposal({...proposal, source: 'proposals'});
                setShowModal(true);
              }}
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
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        proposal.status === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : proposal.status === "accepted"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {proposal.status === "pending"
                        ? "Đang chờ"
                        : proposal.status === "accepted"
                        ? "Đã chấp nhận"
                        : "Đã từ chối"}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 mt-2 line-clamp-2">
                    {proposal.proposalText}
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
                      onClick={(e) => {
                        e.stopPropagation();
                        // Xử lý logic gửi tin nhắn
                      }}
                      className="px-3 py-1 text-sm font-medium border-2 border-green-700 text-green-700 rounded-full hover:bg-gray-50"
                    >
                      Nhắn tin
                    </button>
                    {proposal.status === "pending" && (
                      <>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleProposalAction(proposal.id, "accepted");
                          }}
                          className="px-3 py-1 text-sm font-medium bg-green-600 text-white rounded-full hover:bg-green-700"
                        >
                          Chấp nhận
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleProposalAction(proposal.id, "rejected");
                          }}
                          className="px-3 py-1 text-sm bg-red-600 text-white rounded-full hover:bg-red-700"
                        >
                          Từ chối
                        </button>
                      </>
                    )}
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

export default ViewProposalsContent; 