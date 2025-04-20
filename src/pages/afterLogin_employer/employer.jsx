import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function Employer() {
  const navigate = useNavigate();
  // Giả lập danh sách công việc (sẽ thay bằng API sau này)
  const [jobList, setJobList] = useState([]); // Mặc định chưa có công việc
  return (
    <>
      <div className="flex justify-between items-center w-full mt-10">
        <h2 className="text-2xl font-semibold ">Xin chào, User</h2>
        <button
          onClick={() => navigate("/employer/JobPost")}
          className="bg-green-600 hover:bg-green-500 rounded-xl p-2 text-white"
        >
          Đăng công việc
        </button>
      </div>
    </>
  );
}