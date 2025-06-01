import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ViewJobContent from "../../components/afterLogin_employer/ViewJobContent";
import InviteFreelancerContent from "../../components/afterLogin_employer/InviteFreelancerContent";
import ViewProposalsContent from "../../components/afterLogin_employer/ViewProposalsContent";
import HiredFreelancersContent from "../../components/afterLogin_employer/HiredFreelancersContent";
import FreelancerDetailModal from "../../components/afterLogin_employer/FreelancerDetailModal";
import JobDetailTabs from "../../components/afterLogin_employer/JobDetailTabs";

const JobDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("view"); // Thêm state để quản lý tab
  const [proposals, setProposals] = useState([]);
  const [loadingProposals, setLoadingProposals] = useState(false);
  
  // Changed state name for clarity and broader use
  const [selectedItemForModal, setSelectedItemForModal] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log(id);
    fetch(`http://localhost:3000/api/jobs/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Không thể tải dữ liệu công việc");
        return res.json();
      })
      .then((data) => {
        if (data.status === "Success") {
          setJob(data.data);
        } else {
          throw new Error(data.message || "Không thể tải dữ liệu công việc");
        }
      })
      .catch((err) => {
        console.error("Lỗi khi lấy job:", err);
        setJob(null);
      })
      .finally(() => setLoading(false));
  }, [id]);

  // Thêm useEffect để lấy danh sách proposals
  useEffect(() => {
    const fetchProposals = async () => {
      if (activeTab === "proposals") {
        setLoadingProposals(true);
        try {
          const token = localStorage.getItem("token");
          const response = await fetch(
            `http://localhost:3000/api/jobs/${id}/proposal`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (!response.ok) throw new Error("Không thể tải danh sách yêu cầu");

          const data = await response.json();
          if (data.status === "Success") {
            // Cập nhật lại cách lấy dữ liệu proposals
            setProposals(
              Array.isArray(data.data.applications)
                ? data.data.applications
                : []
            );
            console.log("Proposals data:", data.data.applications); // Log để kiểm tra dữ liệu
          }
        } catch (err) {
          console.error("Lỗi khi lấy proposals:", err);
          setProposals([]);
        } finally {
          setLoadingProposals(false);
        }
      }
    };

    fetchProposals();
  }, [id, activeTab]);

  // Refetch lại job mỗi khi chuyển sang tab proposals để lấy trạng thái mới nhất (pay, v.v.)
  useEffect(() => {
    if (activeTab === "proposals") {
      const token = localStorage.getItem("token");
      fetch(`http://localhost:3000/api/jobs/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          if (!res.ok) throw new Error("Không thể tải dữ liệu công việc");
          return res.json();
        })
        .then((data) => {
          if (data.status === "Success") {
            setJob(data.data);
            console.log("Job data (tab proposals):", data.data);
          }
        })
        .catch((err) => {
          console.error("Lỗi khi refetch job:", err);
        });
    }
  }, [activeTab, id]);

  if (loading) return <p className="mt-4">Đang tải dữ liệu...</p>;

  if (job === null || job === undefined) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <h2 className="text-2xl font-bold text-red-500 mb-4">
            Không tìm thấy công việc
          </h2>
          <p className="text-gray-600 mb-4">
            Công việc bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.
          </p>
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
          >
            Quay lại
          </button>
        </div>
      </div>
    );
  }

  const handleProposalAction = async (proposalId, action) => {
    console.log("handleProposalAction called with:", { proposalId, action });
    try {
      if (!proposalId) {
        console.error("No proposalId provided");
        throw new Error("Không tìm thấy ID của proposal");
      }

      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Không tìm thấy token xác thực");
      }
      
      if (action === "rejected") {
        // Gọi API reject proposal
        console.log("Calling reject API for proposal:", proposalId);
        const response = await fetch(
          `http://localhost:3000/api/jobs/proposals/${proposalId}/reject`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            }
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          console.error("Reject API error:", errorData);
          throw new Error(errorData.message || "Không thể từ chối proposal");
        }

        const data = await response.json();
        console.log("Reject API response:", data);
        if (data.status === "Success") {
          // Xóa proposal khỏi danh sách
          setProposals((prev) => prev.filter((p) => p.id !== proposalId));
          setShowModal(false); // Đóng modal nếu đang mở
        }
      } else {
        // Xử lý chấp nhận proposal
        console.log("Calling accept API for proposal:", proposalId);
        const response = await fetch(
          `http://localhost:3000/api/jobs/proposals/${proposalId}/accept`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ status: action }),
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          console.error("Accept API error:", errorData);
          throw new Error(errorData.message || "Không thể cập nhật trạng thái");
        }

        const data = await response.json();
        console.log("Accept API response:", data);
        if (data.status === "Success") {
          setProposals((prev) =>
            prev.map((p) => (p.id === proposalId ? { ...p, status: action } : p))
          );
        }
      }
    } catch (err) {
      console.error("Lỗi khi cập nhật trạng thái:", err);
      alert(err.message || "Có lỗi xảy ra khi cập nhật trạng thái");
    }
  };

  const handleCloseModal = () => {
      setShowModal(false);
      setSelectedItemForModal(null);
  };

  // Placeholder for send message function (will be passed to modal)
  const handleSendMessage = (freelancer) => {
      if (freelancer) {
          console.log('Sending message to:', freelancer.fname);
          // TODO: Implement actual send message logic
          alert(`Nhắn tin cho ${freelancer.fname || 'freelancer này'} (Chức năng đang được phát triển)`);
          handleCloseModal();
      }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Tab navigation */}
      <JobDetailTabs activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Tab content */}
      {activeTab === "view" && <ViewJobContent job={job} id={id} />}
      
      {/* Pass state setters to InviteFreelancerContent */}
      {activeTab === "invite" && (
         <InviteFreelancerContent 
           jobId={id} 
           setSelectedFreelancer={setSelectedItemForModal}
           setShowModal={setShowModal}
           jobData={job}
         />
      )}

      {activeTab === "proposals" && (
        <ViewProposalsContent 
          proposals={proposals}
          loadingProposals={loadingProposals}
          setSelectedProposal={setSelectedItemForModal} // Use the generic setter
          setShowModal={setShowModal} // Use the generic setter
          handleProposalAction={handleProposalAction}
          jobId={id}
          job={job}
        />
      )}
      {activeTab === "hired" && (
        <HiredFreelancersContent 
          proposals={proposals} // Assuming hired freelancers are also in the proposals data with a specific status
          setSelectedProposal={setSelectedItemForModal} // Use the generic setter
          setShowModal={setShowModal} // Use the generic setter
          job={job}
        />
      )}

      {/* Modal chi tiết freelancer/proposal */}
      {showModal && selectedItemForModal && (
        <FreelancerDetailModal 
          item={selectedItemForModal}
          setShowModal={setShowModal}
          handleProposalAction={handleProposalAction}
          handleSendMessage={handleSendMessage}
          jobId={id}
        />
      )}
    </div>
  );
};

export default JobDetail;
