import React from "react";

// Import necessary icons
import { FaUser, FaMapMarkerAlt, FaStar } from "react-icons/fa";
import { createPaymentOrder } from "../../services/paymentService";

const FreelancerDetailModal = ({
  item, // Changed prop name to a generic item
  setShowModal,
  handleProposalAction, // Keep for proposal actions
  handleSendMessage, // Added handleSendMessage prop
  jobId // Add jobId prop
}) => {
  // Determine if the item is a proposal or a direct freelancer object
  const isProposal = item && item.proposalText !== undefined; // Check for a unique proposal field
  const freelancer = isProposal ? item.freelancer : item; // Get the freelancer data

  if (!item || !freelancer) {
    return null; // Don't render if no item or freelancer data
  }

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      setShowModal(false);
    }
  };

  // Add handleAcceptAndPay function
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

  return (
    <>
      {/* Dark overlay */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={handleOverlayClick}
      />
      {/* Modal Container */}
      <div 
        className="fixed inset-y-0 right-0 w-full md:w-1/2 lg:w-1/2 bg-white shadow-xl transform transition-transform duration-300 z-50 overflow-hidden"
      >
        <div className="h-full overflow-y-auto">
          <div className="p-8">
            {/* Modal Header */}
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

            {/* Modal Body - Display Freelancer Details */}
            <div className="space-y-8 max-w-2xl mx-auto">
              {/* Thông tin cơ bản */}
              <div className="flex items-center gap-6">
                {/* Avatar */}
                <div className="relative group">
                  <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-white border-4 border-[#14a800] shadow-sm overflow-hidden flex-shrink-0">
                    {freelancer.avatar ? (
                      <img
                        src={`http://localhost:3000/${freelancer.avatar.replace(
                          /\\/g,
                          "/"
                        )}`}
                        alt={freelancer.fname || 'Freelancer Avatar'}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.style.display = "none";
                           // Assuming a fallback icon div exists or can be created here
                           const fallbackIcon = e.target.parentElement.querySelector('svg'); // Assuming SVG is the fallback
                           if(fallbackIcon) fallbackIcon.style.display = 'block';
                        }}
                      />
                    ) : (
                      // Fallback Icon
                      <FaUser className="w-full h-full text-gray-300 p-4" /> // Added padding
                    )}
                  </div>
                </div>
                {/* Basic Info Text */}
                <div>
                  <h3 className="text-xl font-semibold">
                    {freelancer.fname || 'Chưa có tên'}
                  </h3>
                   {/* Location */}
                  <p className="text-gray-600 flex items-center gap-1 mt-1">
                     {freelancer.location && <FaMapMarkerAlt className="text-gray-500" />}
                    {freelancer.location || 'Chưa có địa chỉ'}
                  </p>
                  {/* Rating and Projects Done - Only for proposals/existing data */}
                   {/* Re-checking this as per original structure - seems to be part of basic info */}
                   {/* If it's available in freelancer data from invite, display it too */}
                   {/* Assuming project_done and rating are available in the freelancer object itself if coming from invite tab */} 
                  {(freelancer.rating !== undefined || freelancer.completedProjects !== undefined) && ( // Check if data exists
                      <div className="flex items-center gap-2 mt-1 text-sm text-gray-600">
                          {freelancer.rating !== undefined && ( // Check for rating
                             <div className="flex items-center">
                                <FaStar className="w-4 h-4 text-yellow-400" />
                                <span className="ml-1 font-medium">
                                   {freelancer.rating || 0}
                                </span>
                             </div>
                          )}
                          {freelancer.rating !== undefined && freelancer.completedProjects !== undefined && (
                               <span className="text-gray-400">•</span>
                          )}
                          {freelancer.completedProjects !== undefined && ( // Check for completed projects
                              <span className="flex items-center gap-1">
                                  <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                                  {freelancer.project_done || 0} dự án hoàn thành
                              </span>
                          )}
                      </div>
                  )}
                </div>
              </div>

              {/* Thông tin liên hệ - Re-added as per original structure */}
              {(freelancer.email || freelancer.phone) && ( // Only show if email or phone exists
                   <div className="bg-gray-50 rounded-lg p-4">
                       <h4 className="font-semibold mb-3">Thông tin liên hệ</h4>
                       <div className="space-y-2">
                           {freelancer.email && (
                               <div className="flex items-center gap-2">
                                   <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                                   <span className="text-sm">{freelancer.email}</span>
                               </div>
                           )}
                           {freelancer.phone && (
                                <div className="flex items-center gap-2">
                                   <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                                   <span className="text-sm">{freelancer.phone}</span>
                               </div>
                           )}
                       </div>
                   </div>
              )}

              {/* Giới thiệu */}
              {freelancer.bio && ( // Only show if bio exists
                  <div>
                     <h4 className="font-semibold mb-2">Giới thiệu</h4>
                     <p className="text-gray-700 whitespace-pre-line">
                        {freelancer.bio}
                     </p>
                  </div>
              )}

              {/* Kỹ năng */}
              {(freelancer.skills && freelancer.skills.length > 0) && ( // Only show if skills exist
                  <div>
                     <h4 className="font-semibold mb-2">Kỹ năng</h4>
                     <div className="flex flex-wrap gap-2">
                        {(freelancer.skills || []).map((skill, index) => (
                           <span
                             key={index}
                             className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-sm"
                           >
                             {skill}
                           </span>
                         ))}
                     </div>
                  </div>
              )}

              {/* Kinh nghiệm */}
              {freelancer.experience && ( // Only show if experience exists
                  <div>
                     <h4 className="font-semibold mb-2">Kinh nghiệm</h4>
                     <p className="text-gray-700 whitespace-pre-line">
                        {freelancer.experience}
                     </p>
                  </div>
              )}

              {/* Học vấn */}
              {(freelancer.education && freelancer.education.length > 0) && ( // Only show if education exists
                  <div>
                     <h4 className="font-semibold mb-2">Học vấn</h4>
                     <div className="space-y-4">
                        {(freelancer.education || []).map((edu, index) => (
                           <div
                             key={index}
                             className="border-l-2 border-gray-200 pl-4"
                           >
                             <h5 className="font-medium">{edu.school || 'Chưa có thông tin trường'}</h5>
                             <p className="text-sm text-gray-600">{edu.degree || 'Chưa có thông tin bằng cấp'}</p>
                             <p className="text-sm text-gray-500">
                               {(edu.startDate ? new Date(edu.startDate).toLocaleDateString("vi-VN") : 'Không rõ')}{" "}
                               -
                               {(edu.endDate
                                 ? new Date(edu.endDate).toLocaleDateString("vi-VN")
                                 : "Hiện tại")}
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
              )}

              {/* Đề xuất - Chỉ hiển thị khi item là proposal */}
              {isProposal && (
                <div className="bg-green-50 rounded-lg p-4">
                  <h4 className="font-semibold mb-2">
                    Đề xuất cho công việc này
                  </h4>
                  <p className="text-gray-700 whitespace-pre-line mb-3">
                    {item.proposalText}
                  </p>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-gray-600">Giá thầu</p>
                      <p className="text-xl font-semibold text-green-600">
                        {item.bidAmount?.toLocaleString() || 0} USD
                      </p>
                    </div>
                    <div className="text-sm text-gray-500">
                      Nộp đơn:{" "}
                      {item.appliedAt
                        ? new Date(item.appliedAt).toLocaleDateString("vi-VN")
                        : 'Không rõ ngày'}
                    </div>
                  </div>
                </div>
              )}

              {/* Nút hành động */}
              <div className="flex space-x-3 pt-4 border-t">
                {/* Nhắn tin button - Always show for freelancers/proposals */}
                  {/* You might want to conditionally show this based on whether communication is established */}
                  {/* For now, showing for both if item exists */}
                 <button 
                    className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                    onClick={() => handleSendMessage(freelancer)}
                 >
                    Nhắn tin
                 </button>

                {/* Proposal Action Buttons - Only show if item is a proposal and status is pending */}
                {isProposal && item.status === "pending" && (
                  <>
                    <button
                      onClick={() => handleAcceptAndPay(item._id)}
                      className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                    >
                      Chấp nhận và thanh toán
                    </button>
                    <button
                      onClick={() => handleProposalAction(item._id, "rejected")}
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
    </>
  );
};

export default FreelancerDetailModal; 