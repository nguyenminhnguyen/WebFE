import React, { useState, useEffect } from "react";
import { getRecommendedJobs, postApplyJob } from "../../api/freelancer";
import JobCard from "./JobCard";
import ProjectDetailModal from "./ProjectDetailModal";
import ApplyModal from "./ApplyModal";
import ConfirmationModal from "./ConfirmationModal";

const RecommendedJobs = () => {
  const [recommendedJobs, setRecommendedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [jobsPerPage] = useState(10);
  const [selectedJob, setSelectedJob] = useState(null);
  const [applyingJob, setApplyingJob] = useState(null);
  const [freelancerId, setFreelancerId] = useState(null);
  const [confirmationModal, setConfirmationModal] = useState({
    isOpen: false,
    type: "",
    title: "",
    message: "",
    onConfirm: null,
  });
  const [applyModal, setApplyModal] = useState({
    isOpen: false,
    jobId: null,
    proposalText: "",
    bidAmount: "",
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user._id) {
      setFreelancerId(user._id);
    }
  }, []);

  useEffect(() => {
    const fetchRecommendedJobs = async () => {
      try {
        setLoading(true);
        const response = await getRecommendedJobs();
        console.log("API Response:", response.data.data); // Debug log

        const processedJobs = (response.data.data || []).map((job) => {
          console.log("Processing job:", job); // Debug log
          return {
            ...job,
            employer: job.employer || { companyName: "N/A" },
            minSalary: job.minSalary || job.salary?.min || 0,
            maxSalary: job.maxSalary || job.salary?.max || 0,
            location: job.location || "N/A",
            skills: Array.isArray(job.skills)
              ? job.skills
              : typeof job.skills === "string"
              ? job.skills.split(",").map((s) => s.trim())
              : [],
            description: job.description || "Không có mô tả",
            experienceLevel: job.experienceLevel || "Không yêu cầu",
            timeEstimation: job.timeEstimation || "Không xác định",
            hasApplied: job.hasApplied || false,
            appliedCount: job.appliedCount || 0,
            createdAt: job.createdAt || new Date().toISOString(),
            updatedAt: job.updatedAt || new Date().toISOString(),
          };
        });

        console.log("Processed Jobs:", processedJobs); // Debug log
        setRecommendedJobs(processedJobs);
        setError(null);
      } catch (err) {
        setError(err.message || "Không thể tải danh sách công việc đề xuất");
        console.error("Error fetching recommended jobs:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendedJobs();
  }, []);

  const handleJobClick = (job) => {
    setSelectedJob(job);
  };

  const handleCloseModal = () => {
    setSelectedJob(null);
  };

  const handleApplyClick = (jobId) => {
    setApplyModal({
      isOpen: true,
      jobId,
      proposalText: "",
      bidAmount: "",
    });
  };

  const handleApplySubmit = async () => {
    if (!applyModal.proposalText.trim()) {
      setConfirmationModal({
        isOpen: true,
        type: "error",
        title: "Lỗi ứng tuyển",
        message: "Vui lòng nhập nội dung đề xuất",
        onConfirm: null,
      });
      return;
    }

    if (
      !applyModal.bidAmount ||
      isNaN(applyModal.bidAmount) ||
      applyModal.bidAmount <= 0
    ) {
      setConfirmationModal({
        isOpen: true,
        type: "error",
        title: "Lỗi ứng tuyển",
        message: "Vui lòng nhập số tiền đề xuất hợp lệ",
        onConfirm: null,
      });
      return;
    }

    await handleApplyJob(
      applyModal.jobId,
      applyModal.proposalText,
      Number(applyModal.bidAmount)
    );
    setApplyModal({
      isOpen: false,
      jobId: null,
      proposalText: "",
      bidAmount: "",
    });
  };

  const handleApplyJob = async (jobId, proposalText, bidAmount) => {
    if (!jobId) {
      setConfirmationModal({
        isOpen: true,
        type: "error",
        title: "Lỗi ứng tuyển",
        message: "Không tìm thấy thông tin công việc",
        onConfirm: null,
      });
      return;
    }

    if (!freelancerId) {
      setConfirmationModal({
        isOpen: true,
        type: "error",
        title: "Lỗi ứng tuyển",
        message: "Vui lòng đăng nhập để ứng tuyển",
        onConfirm: () => {
          window.location.href = "/login";
        },
      });
      return;
    }

    try {
      setApplyingJob(jobId);
      const response = await postApplyJob({
        freelancerId,
        jobId,
        proposalText,
        bidAmount,
      });

      if (
        response.status === 201 &&
        response.statusText === "Created" &&
        response.data.message === "Application submitted successfully"
      ) {
        setConfirmationModal({
          isOpen: true,
          type: "success",
          title: "Ứng tuyển thành công",
          message: "Bạn đã ứng tuyển thành công vào công việc này.",
          onConfirm: null,
        });
        // Update the job's applied status in the jobs list
        setRecommendedJobs((prevJobs) =>
          prevJobs.map((job) =>
            job._id === jobId
              ? {
                  ...job,
                  hasApplied: true,
                  appliedCount: (job.appliedCount || 0) + 1,
                }
              : job
          )
        );
        // Update the selected job in modal if it's the same job
        if (selectedJob && selectedJob._id === jobId) {
          setSelectedJob((prev) => ({
            ...prev,
            hasApplied: true,
            appliedCount: (prev.appliedCount || 0) + 1,
          }));
        }
      } else {
        setConfirmationModal({
          isOpen: true,
          type: "error",
          title: "Lỗi ứng tuyển",
          message:
            response.data.message ||
            "Có lỗi xảy ra khi ứng tuyển. Vui lòng thử lại sau.",
          onConfirm: null,
        });
      }
    } catch (error) {
      console.error("Error applying to job:", error);
      let errorMessage = "Có lỗi xảy ra khi ứng tuyển. Vui lòng thử lại sau.";

      if (
        error.response?.status === 404 &&
        error.response?.data?.message === "Job not found"
      ) {
        errorMessage = "Không tìm thấy công việc này.";
      } else if (
        error.response?.status === 400 &&
        error.response?.data?.message === "You have already applied to this job"
      ) {
        errorMessage = "Bạn đã ứng tuyển vào công việc này rồi.";
      }

      setConfirmationModal({
        isOpen: true,
        type: "error",
        title: "Lỗi ứng tuyển",
        message: errorMessage,
        onConfirm: null,
      });
    } finally {
      setApplyingJob(null);
    }
  };

  const closeConfirmationModal = () => {
    setConfirmationModal({
      isOpen: false,
      type: "",
      title: "",
      message: "",
      onConfirm: null,
    });
  };

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#14a800] mx-auto"></div>
        <p className="mt-4 text-gray-500">Đang tải công việc đề xuất bằng AI...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold mb-6">Công việc AI đề xuất cho bạn</h2>

      {recommendedJobs.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">
            Chưa có công việc nào được đề xuất cho bạn.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {recommendedJobs.map((job, index) => (
            <JobCard
              key={job._id || `job-${index}`}
              job={job}
              index={index}
              currentPage={currentPage}
              jobsPerPage={jobsPerPage}
              onViewDetails={handleJobClick}
              onApply={() => handleApplyClick(job._id)}
              isApplying={applyingJob === job._id}
            />
          ))}
        </div>
      )}

      {selectedJob && (
        <ProjectDetailModal
          job={selectedJob}
          onClose={handleCloseModal}
          onApply={() => handleApplyClick(selectedJob._id)}
          isApplying={applyingJob === selectedJob._id}
        />
      )}

      <ApplyModal
        isOpen={applyModal.isOpen}
        onClose={() =>
          setApplyModal({
            isOpen: false,
            jobId: null,
            proposalText: "",
            bidAmount: "",
          })
        }
        onSubmit={handleApplySubmit}
        isApplying={applyingJob === applyModal.jobId}
        proposalText={applyModal.proposalText}
        setProposalText={(text) =>
          setApplyModal((prev) => ({ ...prev, proposalText: text }))
        }
        bidAmount={applyModal.bidAmount}
        setBidAmount={(amount) =>
          setApplyModal((prev) => ({ ...prev, bidAmount: amount }))
        }
      />

      <ConfirmationModal
        isOpen={confirmationModal.isOpen}
        onClose={closeConfirmationModal}
        type={confirmationModal.type}
        title={confirmationModal.title}
        message={confirmationModal.message}
        onConfirm={confirmationModal.onConfirm}
      />
    </div>
  );
};

export default RecommendedJobs;
