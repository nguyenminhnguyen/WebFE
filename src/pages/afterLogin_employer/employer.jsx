import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import JobListSection from "../../components/afterLogin_employer/JobList";
import axios from "axios";

export default function Employer() {
  const navigate = useNavigate();
  const [jobList, setJobList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token || role !== "employer") {
      console.warn("Không tìm thấy token hoặc role không hợp lệ");
      navigate("/login");
      return;
    }

    const fetchJobs = async () => {
      try {
        const response = await axios.get("https://findwork-backend.onrender.com/api/jobs/employerjob", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        setJobList(response.data);
      } catch (err) {
        console.error("Lỗi khi lấy danh sách công việc:", err);
        setError(err.response?.data?.message || "Có lỗi xảy ra khi tải danh sách công việc");
        if (err.response?.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("role");
          navigate("/login");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [navigate]);

  return (
    <>
      <div className="flex justify-between items-center w-full mt-10">
        <h2 className="text-2xl font-semibold">Xin chào, User</h2>
        <button
          onClick={() => navigate("/employer/jobpost")}
          className="bg-green-600 hover:bg-green-500 rounded-xl p-2 text-white"
        >
          Đăng công việc
        </button>
      </div>

      {error && (
        <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      <JobListSection loading={loading} jobList={jobList} />
    </>
  );
}