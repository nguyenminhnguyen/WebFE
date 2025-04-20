import api from "./config";

const getFreelancerProfile = async (freelancerId) => {
  try {
    const response = await api.get("/freelancer/getprofile", {
      params: { freelancerId }, // Truyền freelancerId qua query parameters
    });
    return response.data;
  } catch (error) {
    console.error("Error details:", error.response?.data || error.message);
    throw error;
  }
};

const getFreelancerJobs = async (params) => {
  try {
    // Chuyển đổi params để phù hợp với API mới
    const queryParams = {
      page: params.page || 1,
      limit: params.limit || 10,
      search: params.search,
      location: params.location,
      minSalary: params.salary?.split("-")[0],
      maxSalary: params.salary?.split("-")[1],
      experienceLevel: params.experienceLevel,
      timeEstimation: params.duration,
      skills: params.skills,
      sort: params.sort || "newest",
    };

    console.log("Sending request to /jobs with params:", queryParams);
    const response = await api.get("/jobs", { params: queryParams });

    if (response.data.status === "Error") {
      throw new Error(response.data.message || "Failed to get jobs");
    }

    return response;
  } catch (error) {
    console.error("Error fetching jobs:", error);
    if (error.response) {
      throw new Error(error.response.data.message || "Failed to get jobs");
    } else {
      throw new Error(error.message || "Failed to get jobs");
    }
  }
};
const postApplyJob = async ({ jobId, proposalText, bidAmount }) => {
  // Log dữ liệu trước khi gửi đi để kiểm tra
  console.log("Dữ liệu gửi đi:", { jobId, proposalText, bidAmount });

  try {
    const response = await api.post(`/jobs/${jobId}/apply`, {
      proposalText,
      bidAmount,
    });

    if (response.data.status === "Success") {
      return response;
    } else {
      throw new Error(response.data.message || "Failed to apply for job");
    }
  } catch (error) {
    console.error("Error applying for job:", error);
    if (error.response) {
      // Nếu có response từ server
      throw new Error(error.response.data.message || "Failed to apply for job");
    } else {
      // Nếu lỗi network hoặc lỗi khác
      throw new Error(error.message || "Failed to apply for job");
    }
  }
};

export { getFreelancerProfile, getFreelancerJobs, postApplyJob };
