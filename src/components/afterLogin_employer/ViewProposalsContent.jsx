import React from "react";
import { createPaymentOrder } from "../../services/paymentService";

const ViewProposalsContent = ({ 
  proposals, 
  loadingProposals, 
  setSelectedProposal, 
  setShowModal, 
  handleProposalAction,
  jobId,
  job
}) => {
  const handleAcceptAndPay = async (proposalId) => {
    try {
      if (!jobId || jobId === 'undefined') {
        alert('Không tìm thấy jobId. Vui lòng tải lại trang hoặc liên hệ quản trị viên.');
        return;
      }
      console.log("jobId gửi lên create-order:", jobId);
      // Lưu proposalId vào localStorage để backend có thể sử dụng khi capture
      localStorage.setItem('pendingAcceptProposalId', proposalId);
      // Tạo order PayPal
      const orderData = await createPaymentOrder(jobId);
      if (orderData.status === "Success") {
        window.location.href = orderData.data.approvalUrl;
      } else {
        throw new Error(orderData.message || "Không thể tạo đơn hàng PayPal");
      }
    } catch (error) {
      console.error("Lỗi khi xử lý thanh toán:", error);
      alert(error.message || "Có lỗi xảy ra khi xử lý thanh toán");
    }
  };

  const handlePayOnly = async () => {
    try {
      if (!jobId || jobId === 'undefined') {
        alert('Không tìm thấy jobId. Vui lòng tải lại trang hoặc liên hệ quản trị viên.');
        return;
      }
      const orderData = await createPaymentOrder(jobId);
      if (orderData.status === "Success") {
        window.location.href = orderData.data.approvalUrl;
      } else {
        throw new Error(orderData.message || "Không thể tạo đơn hàng PayPal");
      }
    } catch (error) {
      alert(error.message || "Có lỗi xảy ra khi xử lý thanh toán");
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md relative">
      <h2 className="text-xl font-bold mt-12 ml-5 mb-6">Yêu cầu ứng tuyển</h2>
      {loadingProposals ? (
        <p className="text-center">Đang tải danh sách yêu cầu...</p>
      ) : !Array.isArray(proposals) || proposals.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 px-4">
          <svg className="w-16 h-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Chưa có yêu cầu ứng tuyển nào</h3>
          <p className="text-gray-500 text-center max-w-md">
            Hiện tại chưa có freelancer nào ứng tuyển vào công việc này. Hãy kiên nhẫn chờ đợi hoặc bạn có thể chia sẻ công việc này để thu hút nhiều ứng viên hơn.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {(() => {
            const filteredProposals = proposals.filter(proposal => 
              !(job && job.pay) && proposal.status !== "accepted"
            );
            
            if (filteredProposals.length === 0) {
              return (
                <div className="flex flex-col items-center justify-center py-12 px-4">
                  <svg className="w-16 h-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Chưa có yêu cầu ứng tuyển nào</h3>
                  <p className="text-gray-500 text-center max-w-md">
                    Hiện tại chưa có freelancer nào ứng tuyển vào công việc này.
                  </p>
                </div>
              );
            }

            return filteredProposals.map((proposal) => (
              <div
                key={proposal._id}
                className="border rounded-lg p-4 hover:bg-gray-100 transition-colors cursor-pointer"
                onClick={() => {
                  console.log("Proposal ID before setting:", proposal._id);
                  setSelectedProposal({
                    ...proposal,
                    source: 'proposals',
                    id: proposal._id,
                    _id: proposal._id
                  });
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
                            : job && job.pay
                            ? "bg-blue-100 text-blue-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {proposal.status === "pending"
                          ? "Đang chờ"
                          : proposal.status === "accepted" && !(job && job.pay)
                          ? "Đã chấp nhận"
                          : job && job.pay
                          ? "Đã thanh toán"
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
                              handleAcceptAndPay(proposal.id);
                            }}
                            className="px-3 py-1 text-sm font-medium bg-green-600 text-white rounded-full hover:bg-green-700"
                          >
                            Chấp nhận và thanh toán
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              console.log("Rejecting proposal:", proposal);
                              handleProposalAction(proposal.id, "rejected");
                            }}
                            className="px-3 py-1 text-sm bg-red-600 text-white rounded-full hover:bg-red-700"
                          >
                            Từ chối
                          </button>
                        </>
                      )}
                      {proposal.status === "accepted" && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handlePayOnly();
                          }}
                          className="px-3 py-1 text-sm font-medium bg-blue-600 text-white rounded-full hover:bg-blue-700"
                        >
                          Thanh toán
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ));
          })()}
        </div>
      )}
    </div>
  );
};

export default ViewProposalsContent; 