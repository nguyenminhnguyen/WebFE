import React, { useState, useEffect } from "react";
import {
  FaSearch,
  FaFilter,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import ProjectDetailModal from "./ProjectDetailModal";
import ConfirmationModal from "./ConfirmationModal";
import JobCard from "./JobCard";
import ApplyModal from "./ApplyModal";
import FilterSidebar from "./FilterSidebar";
import { getFreelancerJobs, postApplyJob } from "../../api/freelancer";
import { useAuth } from "../../context/AuthContext";

const ProjectsList = () => {
  const { freelancerId } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalJobs, setTotalJobs] = useState(0);
  const [jobsPerPage] = useState(10); // Số công việc hiển thị trên mỗi trang, phù hợp với backend
  const [applyingJob, setApplyingJob] = useState(null);
  const [confirmationModal, setConfirmationModal] = useState({
    isOpen: false,
    type: "",
    title: "",
    message: "",
    onConfirm: null,
  });

  // Filter states
  const [filters, setFilters] = useState({
    location: "",
    salary: "",
    experienceLevel: "",
    duration: "",
    sort: "newest",
  });

  // Filter options derived from jobs data
  const [filterOptions, setFilterOptions] = useState({
    locations: [],
    salaryRanges: [],
    experienceLevels: [],
    durations: [],
  });

  // Apply modal state
  const [applyModal, setApplyModal] = useState({
    isOpen: false,
    jobId: null,
    proposalText: "",
    bidAmount: "",
  });

  // Fetch jobs from API
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const response = await getFreelancerJobs({
          page: currentPage,
          limit: jobsPerPage,
          search: searchQuery || undefined,
          location: filters.location || undefined,
          salary: filters.salary || undefined,
          experienceLevel: filters.experienceLevel || undefined,
          duration: filters.duration || undefined,
          sort: filters.sort || "newest",
        });

        console.log("API Response:", response);
        console.log("Jobs Data:", response.data.jobs);
        console.log("Pagination Info:", response.data.pagination);

        const jobsData = response.data.jobs || [];
        console.log("jobsData", jobsData);
        setJobs(jobsData);

        // Cập nhật thông tin phân trang từ API
        const paginationData = response.data.pagination;
        setTotalPages(paginationData.totalPages);
        setTotalJobs(paginationData.total);

        // Nếu trang hiện tại lớn hơn tổng số trang, quay về trang cuối cùng
        if (currentPage > paginationData.totalPages) {
          setCurrentPage(paginationData.totalPages);
        }

        // Extract filter options from jobs data
        const locations = [...new Set(jobsData.map((job) => job.location))];
        const experienceLevels = [
          ...new Set(jobsData.map((job) => job.experienceLevel)),
        ];
        const durations = [
          ...new Set(jobsData.map((job) => job.timeEstimation)),
        ];

        setFilterOptions({
          locations,
          experienceLevels,
          durations,
        });

        setError(null);
      } catch (err) {
        setError("Không thể tải danh sách công việc");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [currentPage, filters, searchQuery, jobsPerPage]);

  // Tính toán số thứ tự của công việc
  const getJobNumber = (index) => {
    return (currentPage - 1) * jobsPerPage + index + 1;
  };

  const handleJobClick = (job) => {
    setSelectedJob(job);
  };

  const handleCloseModal = () => {
    setSelectedJob(null);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
    setCurrentPage(1); // Reset to first page when filters change
  };

  const clearFilters = () => {
    setFilters({
      location: "",
      salary: "",
      experienceLevel: "",
      duration: "",
      sort: "newest",
    });
    setSearchQuery("");
    setCurrentPage(1);
  };

  const formatDate = (dateString) => {
    // Implement date formatting logic here
    return new Date(dateString).toLocaleDateString();
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
    console.log("Freelancer ID:", freelancerId);
    console.log("Job ID:", jobId);

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
      console.log("No freelancerId found");
      setConfirmationModal({
        isOpen: true,
        type: "error",
        title: "Lỗi ứng tuyển",
        message: "Vui lòng đăng nhập để ứng tuyển",
        onConfirm: null,
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
      console.log("API response:", response);

      if (
        response.status === 201 &&
        response.statusText === "Created" &&
        response.data.message === "Application submitted successfully!"
      ) {
        setConfirmationModal({
          isOpen: true,
          type: "success",
          title: "Ứng tuyển thành công",
          message: "Bạn đã ứng tuyển thành công vào công việc này.",
          onConfirm: null,
        });
        // Update the job's applied status in the jobs list
        setJobs((prevJobs) =>
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Search and Filter Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900">Tìm việc làm</h1>
              <p className="mt-1 text-sm text-gray-500">
                Tìm kiếm và ứng tuyển các công việc phù hợp với kỹ năng của bạn
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Tìm kiếm công việc..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#14a800] focus:border-transparent"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <FaSearch className="h-5 w-5 text-gray-400" />
                </div>
              </div>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium flex items-center space-x-2 hover:bg-gray-50"
              >
                <FaFilter className="h-4 w-4" />
                <span>Bộ lọc</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          {showFilters && (
            <FilterSidebar
              filters={filters}
              filterOptions={filterOptions}
              handleFilterChange={handleFilterChange}
              clearFilters={clearFilters}
            />
          )}

          {/* Main Content */}
          <div className="flex-1">
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Tổng số công việc
                </h3>
                <p className="text-3xl font-bold text-[#14a800]">
                  {totalJobs.toLocaleString()}
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Đã ứng tuyển
                </h3>
                <p className="text-3xl font-bold text-[#14a800]">
                  {jobs.reduce((acc, job) => acc + job.appliedCount, 0)}
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Lương trung bình
                </h3>
                <p className="text-3xl font-bold text-[#14a800]">
                  $
                  {Math.round(
                    jobs.reduce((acc, job) => acc + job.salary, 0) /
                      (jobs.length || 1)
                  ).toLocaleString()}
                </p>
              </div>
            </div>

            {/* Jobs List */}
            <div className="space-y-4">
              {loading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#14a800] mx-auto"></div>
                  <p className="mt-4 text-gray-500">Đang tải công việc...</p>
                </div>
              ) : jobs.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500">
                    Không tìm thấy công việc phù hợp.
                  </p>
                </div>
              ) : (
                <>
                <div className="grid grid-cols-1 gap-4">
                    {jobs.map((job, index) => (
                      <JobCard
                      key={job._id}
                        job={job}
                        index={index}
                        currentPage={currentPage}
                        jobsPerPage={jobsPerPage}
                        onViewDetails={handleJobClick}
                      />
                          ))}
                        </div>
                  {!loading && jobs.length > 0 && totalPages > 1 && (
                    <div className="mt-8 flex items-center justify-between">
                      <div className="text-sm text-gray-500">
                        Hiển thị {jobs.length} công việc trên trang{" "}
                        {currentPage} / {totalPages}
                            </div>
                      <div className="flex items-center space-x-2">
                        {currentPage > 1 && (
                          <button
                            onClick={() => setCurrentPage((prev) => prev - 1)}
                            className="px-3 py-1.5 rounded border border-gray-300 text-gray-600 hover:bg-gray-50"
                          >
                            <FaChevronLeft className="h-4 w-4" />
                          </button>
                        )}

                        {Array.from({ length: totalPages }, (_, i) => i + 1)
                          .filter(
                            (page) =>
                      page === 1 ||
                      page === totalPages ||
                              (page >= currentPage - 1 &&
                                page <= currentPage + 1)
                          )
                          .map((page, index, array) => {
                            if (index > 0 && array[index - 1] !== page - 1) {
                              return [
                                <span
                                  key={`ellipsis-${page}`}
                                  className="px-3 py-1.5 text-gray-500"
                                >
                                  ...
                                </span>,
                                <button
                                  key={page}
                                  onClick={() => setCurrentPage(page)}
                                  className={`px-3 py-1.5 rounded border ${
                                    currentPage === page
                                      ? "border-[#14a800] bg-[#14a800] text-white"
                                      : "border-gray-300 text-gray-600 hover:bg-gray-50"
                                  }`}
                                >
                                  {page}
                                </button>,
                              ];
                            }
                      return (
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page)}
                                className={`px-3 py-1.5 rounded border ${
                            currentPage === page
                                    ? "border-[#14a800] bg-[#14a800] text-white"
                                    : "border-gray-300 text-gray-600 hover:bg-gray-50"
                          }`}
                        >
                          {page}
                        </button>
                      );
                          })}

                        {currentPage < totalPages && (
                <button
                            onClick={() => setCurrentPage((prev) => prev + 1)}
                            className="px-3 py-1.5 rounded border border-gray-300 text-gray-600 hover:bg-gray-50"
                >
                  <FaChevronRight className="h-4 w-4" />
                </button>
                        )}
                      </div>
              </div>
            )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>

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

export default ProjectsList;
