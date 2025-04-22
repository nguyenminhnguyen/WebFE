import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import JobListSection from "../../components/afterLogin_employer/JobList";
export default function Employer() {
  const navigate = useNavigate();
  const [jobList, setJobList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.warn("Không tìm thấy accessToken trong localStorage");
      setLoading(false);
      return;
    }

    fetch("http://localhost:3000/api/jobs/employerjob", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Lỗi khi fetch jobs");
        return res.json();
      })
      .then((data) => setJobList(data))
      .catch((err) => {
        console.error("Lỗi khi lấy danh sách công việc:", err);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <div className="flex justify-between items-center w-full mt-10">
        <h2 className="text-2xl font-semibold">Xin chào, User</h2>
        <button
          onClick={() => navigate("/employer/JobPost")}
          className="bg-green-600 hover:bg-green-500 rounded-xl p-2 text-white"
        >
          Đăng công việc
        </button>
      </div>

      <JobListSection loading={loading} jobList={jobList} />
    </>
  );
}