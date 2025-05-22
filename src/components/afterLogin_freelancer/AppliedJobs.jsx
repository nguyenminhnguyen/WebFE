import React, { useState, useEffect } from "react";
import {
  FaMapMarkerAlt,
  FaClock,
  FaUserFriends,
  FaBuilding,
} from "react-icons/fa";
import api from "../../api/config";

const AppliedJobs = () => {
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAppliedJobs();
  }, []);

  const fetchAppliedJobs = async () => {
    try {
      setLoading(true);
      const response = await api.get("/freelancer/applied");
      console.log("response", response);
      setAppliedJobs(response.data.data);
      setError(null);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Có lỗi xảy ra khi tải danh sách công việc đã ứng tuyển"
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#14a800]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">
        Danh sách công việc đã ứng tuyển
      </h1>

      <div className="grid gap-6">
        {appliedJobs.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">
              Bạn chưa ứng tuyển vào công việc nào.
            </p>
          </div>
        ) : (
          appliedJobs.map((application) => (
            <div
              key={application._id}
              className="bg-white rounded-lg shadow p-6"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-xl font-semibold">
                    {application.jobId.title}
                  </h2>
                  <div className="mt-2 flex items-center space-x-4 text-sm text-gray-500">
                    <span className="flex items-center">
                      <FaMapMarkerAlt className="w-4 h-4 mr-1" />
                      {application.jobId.location}
                    </span>
                    <span className="flex items-center">
                      <FaClock className="w-4 h-4 mr-1" />
                      {new Date(application.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <div>
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      application.status === "pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : application.status === "accepted"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {application.status === "pending"
                      ? "Đang chờ"
                      : application.status === "accepted"
                      ? "Đã chấp nhận"
                      : "Đã từ chối"}
                  </span>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-gray-700 mb-2">
                  {application.jobId.description}
                </p>
                <p className="text-gray-600 text-sm">
                  <span className="font-semibold">Đề xuất của bạn: </span>
                  {application.proposalText}
                </p>
                <p className="text-gray-600 text-sm">
                  <span className="font-semibold">Giá đề xuất: </span>$
                  {application.bidAmount}
                </p>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {application.jobId.skills?.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 text-sm text-[#14a800] bg-[#14a800]/10 rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center text-sm text-gray-500">
                    <FaBuilding className="w-4 h-4 mr-1" />
                    {application.jobId.employerId?.companyName}
                  </div>
                </div>
                <div className="text-right">
                  <span className="inline-block px-3 py-1 text-sm font-semibold text-[#14a800] bg-[#14a800]/10 rounded-full">
                    ${application.jobId.minSalary?.toLocaleString()} - $
                    {application.jobId.maxSalary?.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AppliedJobs;
