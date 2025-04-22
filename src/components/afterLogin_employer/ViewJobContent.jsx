import React from "react";
import { useNavigate } from "react-router-dom";

const ViewJobContent = ({ job, id }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-start mb-6">
        <h1 className="text-2xl font-bold">{job.title}</h1>
        <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${
            job.status === "Open"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {job.status === "Open" ? "Đang mở" : "Đã đóng"}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <p className="text-gray-600">Mức lương:</p>
          <p className="font-semibold">
            {job.minSalary.toLocaleString()} - {job.maxSalary.toLocaleString()}{" "}
            VNĐ
          </p>
        </div>
        <div>
          <p className="text-gray-600">Địa điểm ưu tiên:</p>
          <p className="font-semibold">{job.location}</p>
        </div>
        <div>
          <p className="text-gray-600">Thời gian ước tính:</p>
          <p className="font-semibold">{job.timeEstimation}</p>
        </div>
        <div>
          <p className="text-gray-600">Trình độ kinh nghiệm:</p>
          <p className="font-semibold">{job.experienceLevel}</p>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Mô tả công việc</h2>
        <p className="text-gray-700 whitespace-pre-line">{job.description}</p>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Kỹ năng yêu cầu</h2>
        <div className="flex flex-wrap gap-2">
          {job.skills.map((skill, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      <div className="text-sm text-gray-500 mb-6">
        <p>Ngày tạo: {new Date(job.createdAt).toLocaleDateString("vi-VN")}</p>
        <p>
          Ngày cập nhật: {new Date(job.updatedAt).toLocaleDateString("vi-VN")}
        </p>
      </div>

      <div className="flex justify-end space-x-4">
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300"
        >
          Quay lại
        </button>
        <button
          onClick={() => navigate(`/employer/jobs/${id}/edit`)}
          className="px-4 py-2 bg-green-600 hover:bg-green-500 text-white rounded-xl"
        >
          Chỉnh sửa
        </button>
      </div>
    </div>
  );
};

export default ViewJobContent; 